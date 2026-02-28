import { useEffect, useRef } from 'react';

export default function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let clientMouse = { x: width / 2, y: height / 2 };
    let mouse = { x: width / 2 + window.scrollX, y: height / 2 + window.scrollY };
    let pos = { x: width / 2 + window.scrollX, y: height / 2 + window.scrollY };
    let isMouseDown = false;
    
    // Interaction state for trail
    let isHovering = false;
    let isTyping = false;
    let typingTimeout: NodeJS.Timeout;
    const trail: { x: number, y: number }[] = [];
    const MAX_TRAIL_LENGTH = 20;
    
    // Idle animation state
    let lastActivityTime = Date.now();
    let isIdle = false;
    let idleTarget = { x: width / 2 + window.scrollX, y: height / 2 + window.scrollY };
    let idleAngle = Math.random() * Math.PI * 2;

    const resetIdle = () => {
      lastActivityTime = Date.now();
      isIdle = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      clientMouse.x = e.clientX;
      clientMouse.y = e.clientY;
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
      resetIdle();
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      resetIdle();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      resetIdle();
    };

    const handleScroll = () => {
      mouse.x = clientMouse.x + window.scrollX;
      mouse.y = clientMouse.y + window.scrollY;
      resetIdle();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const handleKeyDown = () => {
      isTyping = true;
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        isTyping = false;
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('keydown', handleKeyDown);

    // Spider configuration
    const numLegs = 8;
    const legs = Array.from({ length: numLegs }).map((_, i) => {
      const isLeft = i < 4;
      const index = i % 4;
      
      const baseAngle = isLeft ? -Math.PI / 2 : Math.PI / 2;
      const spread = (index - 1.5) * 0.5; 
      const angleOffset = baseAngle + spread;
      const distance = 35 + Math.abs(index - 1.5) * 10; 

      return {
        x: pos.x,
        y: pos.y,
        idealX: pos.x,
        idealY: pos.y,
        angleOffset,
        distance,
        stepping: false,
        stepProgress: 0,
        oldX: pos.x,
        oldY: pos.y,
        baseAngle
      };
    });

    let animationFrameId: number;
    let currentAngle = Math.PI / 2;
    let currentDistMult = 1;
    let bodyVx = 0;
    let bodyVy = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(-window.scrollX, -window.scrollY);

      // Update and draw trail
      trail.unshift({ x: pos.x, y: pos.y });
      if (trail.length > MAX_TRAIL_LENGTH) {
        trail.pop();
      }

      if (trail.length > 1) {
        const isActive = isHovering || isTyping || isMouseDown;
        const baseColor = isActive ? '244, 114, 182' : '56, 189, 248'; // Pink when active, Blue when normal
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];
          const progress = i / trail.length;
          const opacity = (1 - progress) * (isActive ? 0.6 : 0.3);
          const lineWidth = (1 - progress) * (isActive ? 8 : 4);
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }

      const now = Date.now();
      let currentTarget = { x: mouse.x, y: mouse.y };

      // Idle wandering logic
      if (now - lastActivityTime > 3000) {
        if (!isIdle) {
          isIdle = true;
          idleTarget = { x: pos.x, y: pos.y };
        }
        
        // Smoothly change wandering direction
        idleAngle += (Math.random() - 0.5) * 0.2;
        const wanderSpeed = 1.5;
        idleTarget.x += Math.cos(idleAngle) * wanderSpeed;
        idleTarget.y += Math.sin(idleAngle) * wanderSpeed;

        // Keep within screen bounds with a soft margin
        const margin = 100;
        const minX = window.scrollX + margin;
        const maxX = window.scrollX + width - margin;
        const minY = window.scrollY + margin;
        const maxY = window.scrollY + height - margin;

        if (idleTarget.x < minX) { idleTarget.x += (minX - idleTarget.x) * 0.1; idleAngle = 0; }
        if (idleTarget.x > maxX) { idleTarget.x -= (idleTarget.x - maxX) * 0.1; idleAngle = Math.PI; }
        if (idleTarget.y < minY) { idleTarget.y += (minY - idleTarget.y) * 0.1; idleAngle = Math.PI / 2; }
        if (idleTarget.y > maxY) { idleTarget.y -= (idleTarget.y - maxY) * 0.1; idleAngle = -Math.PI / 2; }

        currentTarget = idleTarget;
      }

      // Smoothly adjust distance multiplier for click reaction (crouch)
      const targetDistMult = isMouseDown ? 0.5 : 1;
      currentDistMult += (targetDistMult - currentDistMult) * 0.2;

      // Calculate velocity for predictive stepping
      const dx = currentTarget.x - pos.x;
      const dy = currentTarget.y - pos.y;
      
      // Spring physics for organic body movement
      const springStrength = isMouseDown ? 0.08 : (isIdle ? 0.005 : 0.04);
      const friction = isMouseDown ? 0.7 : (isIdle ? 0.9 : 0.8);
      
      bodyVx += dx * springStrength;
      bodyVy += dy * springStrength;
      
      bodyVx *= friction;
      bodyVy *= friction;
      
      // Ease body to target
      pos.x += bodyVx;
      pos.y += bodyVy;

      // Calculate movement angle for body rotation
      const distToTarget = Math.hypot(dx, dy);
      if (distToTarget > 1) {
        // Smooth angle rotation towards the target (cursor)
        const targetAngle = Math.atan2(dy, dx);
        // Handle angle wrap-around
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        currentAngle += angleDiff * 0.15;
      }
      
      const speed = Math.hypot(bodyVx, bodyVy);

      // Draw legs
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      legs.forEach((leg) => {
        // Calculate ideal foot position with click reaction AND predictive velocity
        // Predict where the body will be to make legs reach out naturally
        const predictX = bodyVx * 3.5;
        const predictY = bodyVy * 3.5;
        
        leg.idealX = pos.x + Math.cos(currentAngle + leg.angleOffset) * (leg.distance * currentDistMult) + predictX;
        leg.idealY = pos.y + Math.sin(currentAngle + leg.angleOffset) * (leg.distance * currentDistMult) + predictY;

        const distToIdeal = Math.hypot(leg.idealX - leg.x, leg.idealY - leg.y);

        // Step logic
        if (distToIdeal > 25 * currentDistMult && !leg.stepping) {
          // Allow more legs to step simultaneously if moving fast or jumping
          const maxStepping = isMouseDown || speed > 5 ? 6 : 4;
          const steppingCount = legs.filter(l => l.stepping).length;
          
          if (steppingCount < maxStepping) { 
            leg.stepping = true;
            leg.stepProgress = 0;
            leg.oldX = leg.x;
            leg.oldY = leg.y;
          }
        }

        if (leg.stepping) {
          // Smoother, slightly slower stepping for better animation
          leg.stepProgress += isMouseDown ? 0.15 : 0.1; 
          if (leg.stepProgress >= 1) {
            leg.stepping = false;
            leg.stepProgress = 1;
          }
          
          // Easing function: easeOutQuart for a more organic, snappy start and soft landing
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
          const easedProgress = easeOutQuart(leg.stepProgress);
          
          // Interpolate position with an asymmetrical lift (peaks earlier in the step)
          const liftProgress = Math.sin(Math.pow(leg.stepProgress, 0.6) * Math.PI);
          // Higher lift when jumping
          const maxLift = isMouseDown ? 35 : 22;
          const lift = liftProgress * maxLift;
          
          leg.x = leg.oldX + (leg.idealX - leg.oldX) * easedProgress;
          leg.y = leg.oldY + (leg.idealY - leg.oldY) * easedProgress - lift;
        }
      });

      // 1. Draw Leg Shadows (Optimized without filter: blur)
      ctx.beginPath();
      legs.forEach((leg) => {
        ctx.moveTo(pos.x + 10, pos.y + 15);
        const midX = (pos.x + leg.x) / 2;
        const midY = (pos.y + leg.y) / 2;
        const bendAngle = currentAngle + leg.baseAngle;
        const jointX = midX + Math.cos(bendAngle) * (20 * currentDistMult);
        const jointY = midY + Math.sin(bendAngle) * (20 * currentDistMult);
        ctx.quadraticCurveTo(jointX + 10, jointY + 15, leg.x + 10, leg.y + 15);
      });
      // Layer 1 of shadow (wider, lighter)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 8;
      ctx.stroke();
      // Layer 2 of shadow (narrower, darker)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // 2. Draw Legs (Dark Base for 3D depth)
      ctx.beginPath();
      legs.forEach((leg) => {
        ctx.moveTo(pos.x, pos.y);
        const midX = (pos.x + leg.x) / 2;
        const midY = (pos.y + leg.y) / 2;
        const bendAngle = currentAngle + leg.baseAngle;
        const jointX = midX + Math.cos(bendAngle) * (20 * currentDistMult);
        const jointY = midY + Math.sin(bendAngle) * (20 * currentDistMult);
        ctx.quadraticCurveTo(jointX, jointY, leg.x, leg.y);
      });
      ctx.strokeStyle = '#0a0a0a';
      ctx.lineWidth = isMouseDown ? 4 : 3;
      ctx.stroke();

      // 3. Draw Legs (Neon Highlight - Optimized Glow)
      ctx.beginPath();
      legs.forEach((leg) => {
        ctx.moveTo(pos.x, pos.y);
        const midX = (pos.x + leg.x) / 2;
        const midY = (pos.y + leg.y) / 2;
        const bendAngle = currentAngle + leg.baseAngle;
        const jointX = midX + Math.cos(bendAngle) * (20 * currentDistMult);
        const jointY = midY + Math.sin(bendAngle) * (20 * currentDistMult);
        ctx.quadraticCurveTo(jointX, jointY, leg.x, leg.y);
      });
      
      // Outer glow layer (replaces expensive shadowBlur)
      ctx.strokeStyle = isMouseDown ? 'rgba(129, 140, 248, 0.3)' : 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = isMouseDown ? 6 : 4;
      ctx.stroke();
      
      // Inner core layer
      ctx.strokeStyle = isMouseDown ? 'rgba(129, 140, 248, 0.9)' : 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = isMouseDown ? 2 : 1;
      ctx.stroke();

      // 4. Draw Joints/Feet
      legs.forEach((leg) => {
        // Foot
        ctx.beginPath();
        ctx.arc(leg.x, leg.y, isMouseDown ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isMouseDown ? 'rgba(56, 189, 248, 1)' : 'rgba(129, 140, 248, 0.8)';
        ctx.fill();
        
        // Joint (Knee)
        const midX = (pos.x + leg.x) / 2;
        const midY = (pos.y + leg.y) / 2;
        const bendAngle = currentAngle + leg.baseAngle;
        const jointX = midX + Math.cos(bendAngle) * (20 * currentDistMult);
        const jointY = midY + Math.sin(bendAngle) * (20 * currentDistMult);
        
        ctx.beginPath();
        ctx.arc(jointX, jointY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      // 5. Draw Body Shadow (Optimized without filter)
      const bodyScale = isMouseDown ? 0.8 : 1;
      ctx.beginPath();
      // Draw a slightly larger ellipse with a radial gradient to simulate blur
      ctx.ellipse(pos.x + 10, pos.y + 15, 14 * bodyScale, 18 * bodyScale, currentAngle, 0, Math.PI * 2);
      const shadowGrad = ctx.createRadialGradient(
        pos.x + 10, pos.y + 15, 0,
        pos.x + 10, pos.y + 15, 18 * bodyScale
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // 6. Draw Main Body (3D Gradient)
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, 8 * bodyScale, 12 * bodyScale, currentAngle, 0, Math.PI * 2);
      const bodyGrad = ctx.createRadialGradient(
        pos.x - 3 * bodyScale, pos.y - 3 * bodyScale, 0,
        pos.x, pos.y, 12 * bodyScale
      );
      bodyGrad.addColorStop(0, '#333');
      bodyGrad.addColorStop(0.5, '#111');
      bodyGrad.addColorStop(1, '#000');
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      
      ctx.strokeStyle = isMouseDown ? 'rgba(129, 140, 248, 0.8)' : 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 7. Draw Head (3D Gradient & Glow - Optimized)
      const headX = pos.x + Math.cos(currentAngle) * (8 * bodyScale);
      const headY = pos.y + Math.sin(currentAngle) * (8 * bodyScale);
      
      // Draw outer glow (replaces shadowBlur)
      ctx.beginPath();
      const glowRadius = (isMouseDown ? 12 : 8) * bodyScale;
      ctx.arc(headX, headY, glowRadius, 0, Math.PI * 2);
      const glowGrad = ctx.createRadialGradient(
        headX, headY, 4.5 * bodyScale,
        headX, headY, glowRadius
      );
      const glowColor = isMouseDown ? '244, 114, 182' : '56, 189, 248';
      glowGrad.addColorStop(0, `rgba(${glowColor}, 0.6)`);
      glowGrad.addColorStop(1, `rgba(${glowColor}, 0)`);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Draw solid head
      ctx.beginPath();
      ctx.arc(headX, headY, 4.5 * bodyScale, 0, Math.PI * 2);
      
      const headGrad = ctx.createRadialGradient(
        headX - 1.5 * bodyScale, headY - 1.5 * bodyScale, 0,
        headX, headY, 4.5 * bodyScale
      );
      // Vibrant 3D gradient
      headGrad.addColorStop(0, '#ffffff');
      headGrad.addColorStop(0.4, isMouseDown ? '#f472b6' : '#38bdf8');
      headGrad.addColorStop(1, isMouseDown ? '#831843' : '#0c4a6e');
      
      ctx.fillStyle = headGrad;
      ctx.fill();

      // 8. Draw Eyes (Extra detail - Optimized)
      const eyeOffsetAngle = Math.PI / 3.5;
      const eyeDist = 2.5 * bodyScale;
      
      // Draw eye glow
      ctx.beginPath();
      ctx.arc(
        headX + Math.cos(currentAngle - eyeOffsetAngle) * eyeDist, 
        headY + Math.sin(currentAngle - eyeOffsetAngle) * eyeDist, 
        2.5 * bodyScale, 0, Math.PI * 2
      );
      ctx.arc(
        headX + Math.cos(currentAngle + eyeOffsetAngle) * eyeDist, 
        headY + Math.sin(currentAngle + eyeOffsetAngle) * eyeDist, 
        2.5 * bodyScale, 0, Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      
      // Draw solid eyes
      ctx.fillStyle = '#ffffff';
      
      // Left eye
      ctx.beginPath();
      ctx.arc(
        headX + Math.cos(currentAngle - eyeOffsetAngle) * eyeDist, 
        headY + Math.sin(currentAngle - eyeOffsetAngle) * eyeDist, 
        1 * bodyScale, 0, Math.PI * 2
      );
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.arc(
        headX + Math.cos(currentAngle + eyeOffsetAngle) * eyeDist, 
        headY + Math.sin(currentAngle + eyeOffsetAngle) * eyeDist, 
        1 * bodyScale, 0, Math.PI * 2
      );
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(typingTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
}
