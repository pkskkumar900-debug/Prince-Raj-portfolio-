import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function CyberBackground() {
  const { scrollY } = useScroll();
  
  // Smooth scroll values for parallax
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  // Different parallax speeds
  const yGrid = useTransform(smoothScrollY, [0, 2000], [0, 300]);
  const yOrb1 = useTransform(smoothScrollY, [0, 2000], [0, -400]);
  const yOrb2 = useTransform(smoothScrollY, [0, 2000], [0, -200]);
  const yParticlesFast = useTransform(smoothScrollY, [0, 2000], [0, -600]);
  const yParticlesSlow = useTransform(smoothScrollY, [0, 2000], [0, -150]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate random bubbles
  const bubbles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: `${Math.random() * 100}%`,
    animationDuration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: `particle-${i}`,
    size: Math.random() * 4 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.1,
    isFast: Math.random() > 0.5,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black" style={{ perspective: '1000px' }}>
      
      {/* Floating Particles with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: yParticlesFast }}
      >
        {particles.filter(p => p.isFast).map(p => (
          <div 
            key={p.id}
            className="absolute rounded-full bg-cyber-blue"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px rgba(56,189,248,0.8)`
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="absolute inset-0"
        style={{ y: yParticlesSlow }}
      >
        {particles.filter(p => !p.isFast).map(p => (
          <div 
            key={p.id}
            className="absolute rounded-full bg-cyber-pink"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px rgba(129,140,248,0.8)`
            }}
          />
        ))}
      </motion.div>

      {/* Interactive 3D Animated Floor Grid */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <motion.div 
          className="absolute w-[200vw] h-[200vh] cyber-grid opacity-40 animate-grid-3d"
          style={{
            transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)',
            transformOrigin: 'top center',
            y: yGrid,
          }}
        />
      </motion.div>

      {/* Interactive 3D Animated Ceiling Grid */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
      >
        <motion.div 
          className="absolute w-[200vw] h-[200vh] cyber-grid opacity-20 animate-grid-3d"
          style={{
            transform: 'rotateX(-60deg) translateY(100px) translateZ(-200px)',
            transformOrigin: 'bottom center',
            y: yGrid,
          }}
        />
      </motion.div>
      
      {/* Perspective Overlay for 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_80%)] opacity-90" />

      {/* Neon Glowing Water Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-[-100px] rounded-full border border-cyber-blue/50 bg-cyber-blue/10 backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.6),inset_0_0_10px_rgba(56,189,248,0.4)]"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: bubble.animationDuration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated Orbs with Parallax */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px]"
        />
      </motion.div>
      
      <motion.div
        style={{ y: yOrb2 }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyber-pink/10 rounded-full blur-[150px]"
        />
      </motion.div>
    </div>
  );
}
