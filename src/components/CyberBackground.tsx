import { motion } from "motion/react";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-cyber-dark/50 to-cyber-dark" />

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
