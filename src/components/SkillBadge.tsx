import { motion } from "motion/react";
import { ReactNode } from "react";

interface SkillBadgeProps {
  name: string;
  category: 'tech' | 'trading';
  icon?: ReactNode;
  key?: string;
}

export default function SkillBadge({ name, category, icon }: SkillBadgeProps) {
  const isTech = category === 'tech';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`px-4 py-3 rounded-xl border text-sm font-medium flex items-center gap-3 transition-all
        ${isTech 
          ? 'bg-cyber-blue/5 border-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/40' 
          : 'bg-cyber-pink/5 border-cyber-pink/20 text-cyber-pink hover:bg-cyber-pink/10 hover:border-cyber-pink/40'
        }`}
    >
      <div className={`${isTech ? 'text-cyber-blue' : 'text-cyber-pink'}`}>
        {icon || <div className={`w-1.5 h-1.5 rounded-full ${isTech ? 'bg-cyber-blue' : 'bg-cyber-pink'} animate-pulse`} />}
      </div>
      {name}
    </motion.div>
  );
}
