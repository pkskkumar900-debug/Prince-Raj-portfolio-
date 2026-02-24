import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Cpu, 
  TrendingUp, 
  Zap, 
  Mail, 
  Globe, 
  MapPin, 
  ChevronRight, 
  Bot, 
  BarChart3, 
  Settings, 
  Target,
  Award,
  ExternalLink,
  GraduationCap,
  Code,
  Terminal,
  Webhook,
  MessageSquareCode,
  Layout,
  LineChart,
  CandlestickChart,
  ShieldAlert,
  Compass,
  Users,
  FileText,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Phone,
  MessageCircle,
  Menu,
  Github
} from "lucide-react";
import CyberBackground from "./components/CyberBackground";
import Section from "./components/Section";
import SkillBadge from "./components/SkillBadge";

export default function App() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const technicalSkills = [
    { name: "Python", icon: <Terminal className="w-4 h-4" /> },
    { name: "AI / Machine Learning", icon: <Cpu className="w-4 h-4" /> },
    { name: "API Integration", icon: <Webhook className="w-4 h-4" /> },
    { name: "Automation Systems", icon: <Zap className="w-4 h-4" /> },
    { name: "Prompt Engineering", icon: <MessageSquareCode className="w-4 h-4" /> },
    { name: "Web Development", icon: <Layout className="w-4 h-4" /> }
  ];

  const tradingSkills = [
    { name: "Technical Analysis", icon: <LineChart className="w-4 h-4" /> },
    { name: "Price Action", icon: <CandlestickChart className="w-4 h-4" /> },
    { name: "Risk Management", icon: <ShieldAlert className="w-4 h-4" /> },
    { name: "Strategy Building", icon: <Compass className="w-4 h-4" /> },
    { name: "Market Psychology", icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="relative min-h-screen">
      <CyberBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-cyber-dark/80 backdrop-blur-xl border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter text-glow z-50"
        >
          PRINCE<span className="text-cyber-blue">.AI</span>
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-sm font-medium text-white/60">
          {["About", "Skills", "Academic", "What I Do", "Projects", "Vision", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-cyber-blue transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        <div className="hidden lg:block">
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-cyber-blue text-cyber-dark font-bold rounded-full text-sm hover:bg-white transition-colors btn-glow"
          >
            LET'S TALK
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 top-[72px] bg-cyber-dark/95 backdrop-blur-xl z-40 flex flex-col items-center pt-10 border-b border-white/10 lg:hidden"
            >
              <div className="flex flex-col gap-6 text-center text-lg font-medium text-white/80 w-full px-6">
                {["About", "Skills", "Academic", "What I Do", "Projects", "Vision", "Contact"].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-cyber-blue transition-colors py-2 border-b border-white/5 w-full"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-8 py-3 bg-cyber-blue text-cyber-dark font-bold rounded-full text-sm hover:bg-white transition-colors w-full btn-glow"
                >
                  LET'S TALK
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-blue"></span>
            </span>
            Available for new projects
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
            🚀 Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-pink">Prince.</span><br />
            Building the future with AI.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-10">
            Building intelligent systems, trading algorithms, and automation frameworks to simplify real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="px-8 py-4 bg-cyber-blue text-cyber-dark font-black rounded-xl flex items-center justify-center gap-2 group w-full sm:w-auto btn-glow"
            >
              VIEW PROJECTS
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#skills"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex justify-center items-center w-full sm:w-auto"
            >
              MY STRATEGIES
            </a>
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <Section id="about">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-cyber-blue">01.</span> ABOUT ME
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Hi, I'm <span className="text-white font-semibold">Prince Raj</span>. I bridge the gap between Artificial Intelligence and Financial Markets.
              </p>
              <p>
                As an AI Developer and Professional Trader, I build agentic automation tools, intelligent personal assistants, and data-driven trading strategies. Currently advancing my expertise through a <span className="text-cyber-blue font-mono">BS in CSDA</span>, my mission is to develop real-world tech solutions that save time, automate decisions, and generate measurable impact.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 max-w-md mx-auto w-full">
            <div className="aspect-square glass-card p-8 flex flex-col justify-center items-center text-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-cyber-pink/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <Bot className="w-20 h-20 text-cyber-blue mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">The Vision</h3>
              <p className="text-white/60">
                Merging technology and finance into a self-sustaining intelligent ecosystem.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-cyber-blue/30 z-30" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cyber-pink/30 z-30" />
          </div>
        </motion.div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="bg-white/[0.02] border-y border-white/5">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          <span className="text-cyber-pink">02.</span> CORE EXPERTISE
        </motion.h2>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="glass-card p-8 card-pulse relative overflow-hidden group border-cyber-blue/30 hover:border-cyber-blue/60 transition-colors"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-blue/20 rounded-full blur-3xl group-hover:bg-cyber-blue/40 transition-all duration-500 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyber-blue/50 rounded-full blur-md animate-pulse" />
                  <Cpu className="text-cyber-blue w-6 h-6 relative z-10" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-cyber-blue transition-colors">Technical Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {technicalSkills.map(skill => (
                  <SkillBadge key={skill.name} name={skill.name} category="tech" icon={skill.icon} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="glass-card p-8 card-pulse relative overflow-hidden group border-cyber-pink/30 hover:border-cyber-pink/60 transition-colors"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-pink/20 rounded-full blur-3xl group-hover:bg-cyber-pink/40 transition-all duration-500 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-bl from-cyber-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyber-pink/50 rounded-full blur-md animate-pulse" />
                  <TrendingUp className="text-cyber-pink w-6 h-6 relative z-10" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-cyber-pink transition-colors">Trading & Finance</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {tradingSkills.map(skill => (
                  <SkillBadge key={skill.name} name={skill.name} category="trading" icon={skill.icon} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Academic Credentials Section */}
      <Section id="academic">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12"
        >
          <span className="text-cyber-blue">03.</span> ACADEMIC EXCELLENCE
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 glass-card p-8 border-cyber-blue/30 bg-gradient-to-br from-cyber-dark to-cyber-blue/5 shadow-[0_0_30px_rgba(0,242,255,0.1)] card-pulse relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-cyber-blue w-8 h-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">BS in Computer Science & Data Analytics</h4>
                  <div className="inline-block px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-md">
                    <p className="text-cyber-blue font-mono text-sm font-bold tracking-widest">IIT PATNA</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mt-4">
                  Advancing expertise in data science, algorithmic trading, and AI systems through the prestigious and rigorous curriculum at the Indian Institute of Technology Patna.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Certificates Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {[
              { title: "Networks and Network Security", issuer: "Google", date: "Jan 2026", link: "https://coursera.org/verify/4OYZNCAMLVNB" },
              { title: "Machine Learning with Python", issuer: "IBM", date: "Dec 2025", link: "https://coursera.org/verify/XMWSP1OIM1R2" },
              { title: "Develop Generative AI Applications", issuer: "IBM", date: "Dec 2025", link: "https://coursera.org/verify/YMFCRD9D750W" },
              { title: "AWS AI Practitioner", issuer: "Amazon Web Services", date: "Dec 2025", link: "https://coursera.org/verify/HG4W9BZK9BLI" },
              { title: "What is Data Science?", issuer: "IBM", date: "Dec 2025", link: "https://coursera.org/verify/IYDVJJFA8KXC" },
              { title: "Intro to Large Language Models", issuer: "Google Cloud", date: "Dec 2025", link: "https://coursera.org/verify/0LBYP4FDCQT4" },
              { title: "Python for Data Science & AI", issuer: "IBM", date: "Nov 2025", link: "https://coursera.org/verify/TE0ACYVR0G0G" },
              { title: "Introduction to Generative AI", issuer: "Google Cloud", date: "Oct 2025", link: "https://coursera.org/verify/WYBIO9D7RH8Z" },
            ].map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 hover:bg-white/10 transition-all group border-white/5 hover:border-cyber-pink/30 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <Award className="w-5 h-5 text-cyber-pink group-hover:scale-110 transition-transform" />
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-cyber-blue transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-cyber-blue transition-colors">{cert.title}</h4>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{cert.issuer}</span>
                    <span className="text-[10px] font-mono text-cyber-blue/60">{cert.date}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* What I Do Section */}
      <Section id="what-i-do">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16"
        >
          <span className="text-cyber-blue">04.</span> WHAT I DO
        </motion.h2>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Bot className="w-10 h-10" />,
              title: "AI Development",
              desc: "Building smart assistants, automation tools, and intelligent systems.",
              color: "text-cyber-blue"
            },
            {
              icon: <BarChart3 className="w-10 h-10" />,
              title: "Trading",
              desc: "Designing strategies and analyzing markets professionally.",
              color: "text-cyber-pink"
            },
            {
              icon: <Settings className="w-10 h-10" />,
              title: "Automation",
              desc: "Creating systems that save time and scale operations.",
              color: "text-emerald-400"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 group cursor-default card-pulse relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`${item.color} mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
              <p className="text-white/50 leading-relaxed relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16"
        >
          <span className="text-cyber-pink">05.</span> FEATURED PROJECTS
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-1 border-cyber-blue/20 overflow-hidden group flex flex-col"
          >
            <div className="h-48 overflow-hidden relative rounded-t-xl">
              <div className="absolute inset-0 bg-cyber-blue/20 mix-blend-overlay z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?fit=crop&w=800&h=400" 
                alt="PrinAi Glass Prototype" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col relative z-20 -mt-12">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-cyber-dark/80 backdrop-blur-md border border-cyber-blue/20 shadow-lg">
                  <Globe className="w-8 h-8 text-cyber-blue" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-[10px] font-bold tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(0,242,255,0.3)] backdrop-blur-md mt-2">
                  IN DEVELOPMENT STAGE
                </span>
              </div>
              
              <h3 className="text-3xl font-black mb-4 tracking-tighter group-hover:text-cyber-blue transition-colors">
                PROJECT <span className="text-glow">PRINAI GLASS</span>
              </h3>
              
              <p className="text-white/60 mb-8 flex-1">
                A revolutionary wearable AI assistant designed to provide real-time data overlays and intelligent insights directly to your field of view.
              </p>

              <button 
                onClick={() => { setIsPdfOpen(true); setZoomLevel(1); }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-cyber-blue/10 hover:border-cyber-blue/30 transition-all group/card w-full text-left"
              >
                <div className="p-2 rounded-lg bg-cyber-pink/20">
                  <FileText className="w-6 h-6 text-cyber-pink" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Project Documentation.pdf</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Click to view details</p>
                </div>
                <Maximize2 className="w-4 h-4 ml-auto text-white/20 group-hover/card:text-cyber-blue" />
              </button>
            </div>
          </motion.div>

          <div className="grid gap-8">
            <div className="glass-card p-8 border-white/5 opacity-50 grayscale">
              <h3 className="text-xl font-bold mb-2">More Projects Coming Soon</h3>
              <p className="text-sm text-white/40">The lab is currently active. Stay tuned for more agentic automation tools.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision Statement */}
      <Section id="vision" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-blue/5 blur-[100px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <Target className="w-16 h-16 text-cyber-blue mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            "My goal is to build intelligent technology that works like a <span className="text-cyber-blue">personal assistant</span> for everyone."
          </h2>
          <p className="text-xl text-white/60 italic">
            — Helping businesses, traders, and students grow faster using AI.
          </p>
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-8 md:p-12 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
            <Zap className="w-64 h-64 text-cyber-blue" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">LET'S BUILD THE FUTURE.</h2>
              <p className="text-white/60 text-lg mb-10">
                Have a project in mind or want to discuss trading strategies? Drop me a message.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:developer@imprince.me" className="flex items-center gap-4 text-lg md:text-xl hover:text-cyber-blue transition-colors group break-all">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-blue/20">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  developer@imprince.me
                </a>
                <a href="tel:+918252995548" className="flex items-center gap-4 text-lg md:text-xl hover:text-cyber-blue transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-blue/20">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  +91 8252995548
                </a>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  Indian
                </div>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center">
                    <Globe className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  Website: Coming Soon
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://wa.me/918252995548" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 bg-cyber-dark border border-[#25D366]/50 text-[#25D366] font-bold rounded-xl hover:bg-[#25D366]/10 transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] w-full sm:w-auto text-sm md:text-base relative overflow-hidden group whatsapp-pulse"
                >
                  <div className="absolute inset-0 bg-[#25D366]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="relative z-10">CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-white/30 text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="mailto:developer@imprince.me" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 hover:bg-cyber-blue/20 transition-all border border-white/10 hover:border-cyber-blue/50 group shadow-[0_0_15px_rgba(0,242,255,0)] hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] animate-pulse" title="developer@imprince.me">
              <Mail className="w-6 h-6 text-white/80 group-hover:text-cyber-blue group-hover:animate-bounce" />
            </a>
            <a href="https://github.com/pkskkumar900-debug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 hover:bg-cyber-pink/20 transition-all border border-white/10 hover:border-cyber-pink/50 group shadow-[0_0_15px_rgba(255,0,255,0)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] animate-pulse" title="GitHub Profile">
              <Github className="w-6 h-6 text-white/80 group-hover:text-cyber-pink group-hover:animate-bounce" />
            </a>
          </div>
          <p className="font-mono tracking-widest uppercase text-xs opacity-50">© 2026 PRINCE RAJ. ALL RIGHTS RESERVED. BUILT WITH AI & PASSION.</p>
        </div>
      </footer>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isPdfOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-cyber-dark/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full glass-card border-cyber-blue/30 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.1)]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <FileText className="text-cyber-pink w-5 h-5" />
                  <span className="font-display font-bold text-sm tracking-widest uppercase">Project Documentation.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-white/60 w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white mr-4"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-white/10 mr-2"></div>
                  <button 
                    onClick={() => setIsPdfOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content - PDF Document */}
              <div className="flex-1 bg-cyber-gray/50 overflow-y-auto p-8 md:p-12">
                <div 
                  className="max-w-4xl mx-auto space-y-12 text-white/80 transition-transform duration-200 ease-out"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                >
                  {/* Document Header */}
                  <div className="text-center space-y-4 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-pink">PrinAi Glass</h1>
                    <p className="text-cyber-blue font-mono uppercase tracking-widest text-sm">Detailed Project Documentation</p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-white/50 mt-4">
                      <span className="px-2 py-1 bg-white/5 rounded">Version: 1.0 (Alpha Prototype)</span>
                      <span className="px-2 py-1 bg-white/5 rounded">Owner: NexacoreAi</span>
                      <span className="px-2 py-1 bg-white/5 rounded">Codename: Visionary</span>
                    </div>
                  </div>

                  {/* 1. Executive Summary */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-l-4 border-cyber-blue pl-4 text-white">1. Executive Summary</h3>
                    <p className="leading-relaxed">
                      PrinAi Glass is an advanced AI-powered wearable assistant engineered to be mounted on a standard spectacle frame. It combines computer vision, speech intelligence, and large language models to create a real-time intelligent assistant. The system is designed to function as a cognitive extension of the user—acting as a 'Second Brain' that perceives, analyzes, and responds to the surrounding environment via audio feedback.
                    </p>
                  </div>

                  {/* 2. Core Features */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-l-4 border-cyber-pink pl-4 text-white">2. Core Features</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: "Visual Intelligence", desc: "Real-time object detection, scene understanding, and OCR for reading printed text." },
                        { title: "Voice Interaction", desc: "Fully hands-free interaction using a wake-word or physical trigger for natural language commands." },
                        { title: "Context Awareness", desc: "Combines visual input with spoken queries to deliver situationally relevant responses." },
                        { title: "Split-Architecture", desc: "Novel Split-Unit design prioritizing comfort and thermal safety." },
                        { title: "Vision Unit (Frames)", desc: "ESP32S3 Sense, camera, microphone, and micro-speaker mounted on spectacle temple." },
                        { title: "Power Unit (Locket)", desc: "Battery, TP4056 charging circuitry, and power switch housed in external wearable module." },
                        { title: "Trader Assistant", desc: "(Future Scope): Visual market analysis of charts, tickers, and dashboards with audio summaries." }
                      ].map((feature, i) => (
                        <li key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <strong className="text-cyber-blue block mb-1">{feature.title}</strong>
                          <span className="text-sm">{feature.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Schematic Preview */}
                  <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative group overflow-hidden p-8">
                    <div className="absolute inset-0 bg-cyber-blue/5 animate-pulse" />
                    <Bot className="w-16 h-16 text-cyber-blue/40 mb-4" />
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-center relative z-10 w-full justify-center">
                      <div className="border border-cyber-blue/30 bg-cyber-dark/50 p-4 rounded-xl backdrop-blur-sm">
                        <h4 className="font-bold text-cyber-blue mb-2">Vision Frame</h4>
                        <ul className="text-xs text-white/60 space-y-1 text-left">
                          <li>• ESP32S3 Sense</li>
                          <li>• Camera Module</li>
                          <li>• Microphone</li>
                          <li>• Speaker</li>
                        </ul>
                      </div>
                      <div className="border border-cyber-pink/30 bg-cyber-dark/50 p-4 rounded-xl backdrop-blur-sm">
                        <h4 className="font-bold text-cyber-pink mb-2">Locket Power Unit</h4>
                        <ul className="text-xs text-white/60 space-y-1 text-left">
                          <li>• Battery & Control Unit</li>
                          <li>• TP4056 Charging</li>
                          <li>• LED Indicator</li>
                        </ul>
                      </div>
                    </div>
                    <p className="absolute bottom-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Split Architecture Concept</p>
                  </div>

                  {/* 3. System Architecture & 4. Hardware */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold border-l-4 border-cyber-blue pl-4 text-white">3. Architecture</h3>
                      <div className="space-y-4 text-sm">
                        <div className="bg-white/5 p-4 rounded-xl">
                          <h4 className="font-bold text-cyber-blue mb-2">Hardware Layer (Client)</h4>
                          <ul className="space-y-2">
                            <li><span className="text-white">Controller:</span> ESP32S3 Sense</li>
                            <li><span className="text-white">Sensors:</span> Camera, Digital Mic</li>
                            <li><span className="text-white">Output:</span> I2S Audio Amp, Micro Speaker</li>
                            <li><span className="text-white">Power:</span> External Li-Po Battery</li>
                          </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl">
                          <h4 className="font-bold text-cyber-pink mb-2">Software Layer (Server)</h4>
                          <ul className="space-y-2">
                            <li><span className="text-white">Input:</span> Whisper AI, YOLO / GPT-4o Vision</li>
                            <li><span className="text-white">Logic:</span> Llama 3 / GPT</li>
                            <li><span className="text-white">Output:</span> Text-to-Speech Engine</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold border-l-4 border-cyber-pink pl-4 text-white">4. Hardware BOM</h3>
                      <ul className="space-y-3 text-sm bg-white/5 p-4 rounded-xl border border-white/10">
                        <li>• <strong className="text-white">Microcontroller:</strong> Seeed Studio XIAO ESP32S3 Sense</li>
                        <li>• <strong className="text-white">Audio Amplifier:</strong> MAX98357A (Class-D I2S)</li>
                        <li>• <strong className="text-white">Speaker:</strong> Micro Oval Speaker (8Ω, 1W)</li>
                        <li>• <strong className="text-white">Battery:</strong> 3.7V Li-Po (1000mAh+)</li>
                        <li>• <strong className="text-white">Charging:</strong> TP4056 USB Type-C board</li>
                        <li>• <strong className="text-white">Switch & Wiring:</strong> SPDT slide switch, 2-core cable</li>
                      </ul>
                    </div>
                  </div>

                  {/* 5. Team & 7. Safety */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold border-l-4 border-cyber-blue pl-4 text-white">5. Team Roles</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-cyber-blue block">Prince Raj</strong>
                          Founder & AI Lead (Backend, AI integration)
                        </li>
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-white block">Mangaldeep</strong>
                          Firmware Lead (ESP32, audio, latency)
                        </li>
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-white block">Neha Bharti</strong>
                          Hardware Lead (Circuit, safety, thermal)
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold border-l-4 border-cyber-pink pl-4 text-white">7. Safety Protocols</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-cyber-pink block">Battery Safety</strong>
                          External Power Unit eliminates chemical risks near eyes.
                        </li>
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-cyber-pink block">Thermal Management</strong>
                          Battery separation reduces heat on the frame.
                        </li>
                        <li className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <strong className="text-cyber-pink block">Electrical Insulation</strong>
                          Proper insulation of cables and contacts.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 6. Roadmap */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold border-l-4 border-cyber-blue pl-4 text-white">6. Development Roadmap</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { phase: "Month 1", title: "Proof of Concept", desc: "Breadboard setup, basic audio output, image capture, server communication." },
                        { phase: "Month 2", title: "Intelligence Integration", desc: "Full AI pipeline deployment and conversational testing." },
                        { phase: "Month 3", title: "Wearable Assembly", desc: "Physical glass mount and Power Unit enclosure." }
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="font-mono text-cyber-blue text-xs mb-2">{item.phase}</div>
                          <div className="font-bold text-white mb-2">{item.title}</div>
                          <div className="text-sm text-white/60">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center pt-8 border-t border-white/10 text-xs font-mono text-white/40">
                    <p>Generated by Prince Raj | © 2026 NexacoreAi - CONFIDENTIAL</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
                <button 
                  onClick={() => setIsPdfOpen(false)}
                  className="px-6 py-2 bg-cyber-blue text-cyber-dark font-bold rounded-lg text-xs hover:bg-white transition-colors"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
