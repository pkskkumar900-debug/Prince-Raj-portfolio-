import { motion } from "motion/react";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-cyber-dark" style={{ perspective: '1000px' }}>
      {/* 3D Animated Floor Grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute w-[200vw] h-[200vh] cyber-grid opacity-30 animate-grid-3d"
          style={{
            transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)',
            transformOrigin: 'top center'
          }}
        />
      </div>

      {/* 3D Animated Ceiling Grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute w-[200vw] h-[200vh] cyber-grid opacity-10 animate-grid-3d"
          style={{
            transform: 'rotateX(-60deg) translateY(100px) translateZ(-200px)',
            transformOrigin: 'bottom center'
          }}
        />
      </div>
      
      {/* Perspective Overlay for 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_80%)] opacity-90" />

      {/* Animated Orbs */}
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
        className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px]"
      />
      
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
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyber-pink/5 rounded-full blur-[150px]"
      />

      {/* Scanning Line */}
      <motion.div
        animate={{
          top: ["-10%", "110%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent z-10"
      />
    </div>
  );
}
