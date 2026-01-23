
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Layout as LayoutIcon, 
  Cpu,
  ArrowRight,
  Zap,
  Sun,
  Moon,
  Code2,
  BarChart3,
  Layers,
  Terminal,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Quote,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  X,
  Mail,
  MessageSquare,
  Menu,
  Wallet,
  Calculator
} from 'lucide-react';
import AdvancedBackground from './components/AdvancedBackground';

const PROJECTS = [
  {
    id: 5,
    title: "WEALTH WAY",
    category: "FinTech & AI",
    description: "نظام مالي متكامل لإدارة الثروات الشخصية، يتميز بتحليلات ذكية مدعومة بالذكاء الاصطناعي، تتبع دقيق للميزانيات، وإدارة الأهداف المالية لتحقيق الاستقرار الحقيقي.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    tags: ["AI Analysis", "Financial OS", "React Native"],
    link: "https://github.com/alomd"
  },
  {
    id: 6,
    title: "BUILD CALC",
    category: "Engineering Tech",
    description: "أداة هندسية احترافية لحساب تكاليف وكميات مواد البناء بدقة فائقة. تتضمن نظام ذكاء اصطناعي لتعديل الأسعار حسب المنطقة، وتصدير تقارير PDF، وسجل كامل للعمليات الحسابية.",
    image: "https://images.unsplash.com/photo-1503387762-592dea58dd41?auto=format&fit=crop&q=80&w=800",
    tags: ["Engineering", "AI Pricing", "PDF Reports"],
    link: "https://github.com/alomd"
  }
];

const SOCIAL_LINKS = [
  { 
    icon: <Linkedin size={20} />, 
    href: "https://www.linkedin.com/in/al-aomda-1-0854b8261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
    label: "LinkedIn" 
  },
  { 
    icon: <Github size={20} />, 
    href: "https://github.com/alomd", 
    label: "GitHub" 
  },
  { 
    icon: <Twitter size={20} />, 
    href: "https://x.com/iAHNDJVAEUSEH2E", 
    label: "Twitter" 
  },
  { 
    icon: <Instagram size={20} />, 
    href: "https://www.instagram.com/3omda_46?igsh=NWw1ZTQ3aHNsNThz", 
    label: "Instagram" 
  }
];

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const CONTACT_EMAIL = "alomdaapoaref@gmail.com";
  const CONTACT_WHATSAPP = "01144453259";
  const WHATSAPP_URL = `https://wa.me/201144453259`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const themeClasses = isDark ? "bg-[#02040a] text-slate-50" : "bg-[#fcfdfe] text-slate-900";

  const navLinks = [
    { name: 'الرئيسية', id: 'الرئيسية' },
    { name: 'المشاريع', id: 'المشاريع' },
    { name: 'الخدمات', id: 'الخدمات' },
    { name: 'الفلسفة', id: 'فلسفة-الشركة' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-1000 selection:bg-blue-500/30 overflow-x-hidden ${themeClasses}`} dir="rtl">
      <AdvancedBackground isDark={isDark} />

      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? (isDark ? 'bg-black/80 border-white/5' : 'bg-white/80 border-slate-200') + ' backdrop-blur-luxury py-3 md:py-4 border-b shadow-2xl' : 'bg-transparent py-6 md:py-10'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className={`absolute inset-0 blur-2xl opacity-20 group-hover:opacity-70 transition-opacity ${isDark ? 'bg-white' : 'bg-black'}`} />
              <div className={`relative w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-[15deg] transition-all duration-500 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <Zap size={20} fill="currentColor" className="md:hidden" />
                <Zap size={28} fill="currentColor" className="hidden md:block" />
              </div>
            </div>
            <span className="text-2xl md:text-5xl font-black tracking-[-0.05em] uppercase italic leading-none transition-colors duration-500">CODX</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[14px] font-extrabold uppercase tracking-[0.2em]">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className={`${isDark ? 'text-slate-400' : 'text-slate-500'} hover:text-white dark:hover:text-white transition-all relative group`}
              >
                {item.name}
                <span className={`absolute -bottom-2 right-0 w-0 h-[3px] group-hover:w-full transition-all duration-500 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-500 ${isDark ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-black hover:bg-slate-200'}`}
              aria-label="تبديل المظهر"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className={`hidden sm:block px-6 md:px-12 py-3 md:py-5 rounded-xl md:rounded-2xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-2xl text-[12px] md:text-[15px] uppercase tracking-widest ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              ابدأ مع CODX
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-xl border ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-black/5 text-black'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-8 space-y-12 animate-fade-in">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 left-8 text-white p-2">
            <X size={32} />
          </button>
          {navLinks.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="text-4xl font-black italic tracking-tighter text-white hover:opacity-70 transition-all"
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
            className="w-full py-6 rounded-3xl bg-white text-black font-black text-2xl shadow-2xl"
          >
            ابدأ رحلتك الآن
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section id="الرئيسية" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 overflow-hidden px-4">
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
            <div className={`inline-flex items-center gap-2 md:gap-4 px-6 md:px-10 py-3 md:py-4 rounded-full border text-[10px] md:text-[14px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase animate-hero-reveal shadow-xl ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}>
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse shadow-xl ${isDark ? 'bg-white shadow-white/50' : 'bg-black shadow-black/50'}`} />
              CODX Lab | مختبر التميز الرقمي
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[1.2] md:leading-[1.1] tracking-tight animate-hero-reveal">
              نَصنعُ <span className={`inline-block mx-1 md:mx-2 italic ${isDark ? 'text-white underline decoration-slate-700' : 'text-black underline decoration-slate-300'}`}>الأَثرَ</span> الرقمي.
            </h1>
            
            <p className={`text-lg sm:text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed animate-hero-reveal delay-500 font-medium tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              نحول الأفكار المعقدة إلى منتجات برمجية عالمية المستوى، تجمع بين الدقة الهندسية والجمال التصميمي الفائق.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 pt-4 md:pt-6 animate-hero-reveal delay-700">
              <button 
                onClick={() => setShowContactModal(true)}
                className={`group px-8 md:px-14 py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-2xl flex items-center justify-center gap-4 md:gap-6 transition-all shadow-xl hover:-translate-y-2 ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}
              >
                تواصل معنا <ArrowRight size={24} className="rotate-180 group-hover:-translate-x-2 transition-transform duration-500 md:block hidden" />
              </button>
              <button 
                onClick={() => scrollToSection('المشاريع')}
                className={`px-8 md:px-14 py-5 md:py-7 border rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-2xl transition-all hover:-translate-y-2 backdrop-blur-md ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-black/5 border-black/10 hover:bg-black/10 text-black shadow-xl'}`}
              >
                تصفح المشاريع
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-10 md:opacity-20">
          <Code2 className={`absolute top-[15%] left-[5%] animate-float`} size={80} />
          <Layers className={`absolute bottom-[20%] right-[5%] animate-float animation-delay-2000`} size={70} />
          <BarChart3 className={`absolute top-[40%] right-[10%] animate-float animation-delay-4000`} size={60} />
          <Terminal className={`absolute bottom-[10%] left-[10%] animate-float animation-delay-2000`} size={65} />
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="المشاريع" className="py-24 md:py-72 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-8 max-w-4xl">
              <h2 className="text-5xl md:text-[11rem] font-black tracking-tighter leading-none italic uppercase">
                معرض <br /><span>الإنجازات</span>
              </h2>
              <div className={`w-32 md:w-64 h-2 md:h-4 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
              <p className={`text-xl md:text-5xl font-semibold leading-snug tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                تحف فنية رقمية تتحدث لغة الغد بكل فخر وتميز.
              </p>
            </div>
            <div className="flex gap-4 md:gap-6 self-end">
               <button 
                onClick={prevProject}
                className={`w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/10'}`}
                aria-label="المشروع السابق"
               >
                 <ChevronRight size={28} className="md:w-12 md:h-12" />
               </button>
               <button 
                onClick={nextProject}
                className={`w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}
                aria-label="المشروع التالي"
               >
                 <ChevronLeft size={28} className="md:w-12 md:h-12" />
               </button>
            </div>
          </div>

          <div className="relative min-h-[650px] md:min-h-[850px] overflow-hidden">
            {PROJECTS.map((project, idx) => (
              <div 
                key={project.id} 
                className={`absolute inset-0 transition-all duration-1000 transform ${idx === currentProjectIndex ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`}
              >
                <div className="grid lg:grid-cols-2 gap-8 md:gap-20 h-full items-center">
                   <div className={`relative aspect-video lg:aspect-[16/10] rounded-3xl md:rounded-[5rem] overflow-hidden border-2 transition-all duration-1000 group ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-black/5 bg-white shadow-2xl'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-6 md:bottom-16 right-6 md:right-16 left-6 md:left-16 space-y-2 md:space-y-6">
                       <span className={`inline-block px-4 md:px-8 py-1.5 md:py-3 rounded-full text-xs md:text-base font-black uppercase tracking-widest shadow-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>{project.category}</span>
                       <h3 className="text-3xl md:text-8xl font-black text-white tracking-tighter flex items-center gap-4">
                         {project.title === "WEALTH WAY" ? <Wallet className="text-white md:w-16 md:h-16" /> : <Calculator className="text-white md:w-16 md:h-16" />}
                         {project.title}
                       </h3>
                    </div>

                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 bg-black/40"
                    >
                      <div className="p-6 md:p-10 bg-white text-black rounded-full shadow-2xl">
                        <ExternalLink size={32} className="md:w-12 md:h-12" />
                      </div>
                    </a>
                  </div>

                  <div className="space-y-6 md:space-y-12 px-2 md:px-8">
                    <p className={`text-2xl md:text-5xl font-semibold leading-relaxed tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-5">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-3xl text-sm md:text-xl font-black border-2 ${isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-black/10 bg-black/5 text-slate-700'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => window.open(project.link, '_blank')}
                      className={`inline-flex items-center gap-2 md:gap-4 text-xl md:text-3xl font-black transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                    >
                      عرض دراسة الحالة <ArrowRight size={24} className="rotate-180 md:w-8 md:h-8" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="الخدمات" className="py-24 md:py-48 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 md:mb-40 space-y-6 md:space-y-12">
            <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter leading-none italic uppercase">
              فلسفة <span>CODX</span>
            </h2>
            <div className={`w-32 md:w-64 h-2 md:h-4 mx-auto rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
            <p className={`max-w-6xl mx-auto text-xl md:text-5xl font-bold leading-relaxed tracking-tight ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              نصيغ تجارب رقمية سيادية تعيد تعريف معايير السوق العالمية.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-20">
            {[
              { 
                title: "تطوير النخبة", 
                icon: <Smartphone className="w-12 h-12 md:w-20 md:h-20" strokeWidth={1} />, 
                desc: "تطبيقات بأداء فائق وتصميم يعتمد على سيكولوجية المستخدم لضمان الولاء الكامل.", 
                color: isDark ? "text-white" : "text-black"
              },
              { 
                title: "التصميم الفلسفي", 
                icon: <LayoutIcon className="w-12 h-12 md:w-20 md:h-20" strokeWidth={1} />, 
                desc: "واجهات مستخدم تدمج الفن بالتكنولوجيا، لخلق رحلة رقمية لا تُنسى ومثيرة للمشاعر.", 
                color: isDark ? "text-white" : "text-black"
              },
              { 
                title: "الذكاء السيادي", 
                icon: <Cpu className="w-12 h-12 md:w-20 md:h-20" strokeWidth={1} />, 
                desc: "بناء نماذج ذكاء اصطناعي وأتمتة تمنح شركتكم التفوق الرقمي المطلق في أعقد الأسواق.", 
                color: isDark ? "text-white" : "text-black"
              }
            ].map((service, index) => (
              <div key={index} className={`group p-10 md:p-24 border-2 rounded-[3rem] md:rounded-[6rem] transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-4 md:hover:-translate-y-10 ${isDark ? 'bg-slate-900/30 border-white/5 hover:bg-slate-800/40 hover:border-white/30' : 'bg-white border-slate-100 hover:border-black/30 shadow-2xl'}`}>
                <div className={`mb-8 md:mb-16 p-6 md:p-14 rounded-2xl md:rounded-[4rem] transition-all duration-700 group-hover:scale-110 md:group-hover:rotate-12 ${isDark ? 'bg-white/5' : 'bg-slate-50'} ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className={`text-3xl md:text-5xl font-black mb-6 md:mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={`leading-relaxed text-lg md:text-3xl font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{service.desc}</p>
                <div className={`absolute bottom-0 left-0 w-full h-2 md:h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark ? 'bg-white' : 'bg-black'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section id="فلسفة-الشركة" className="py-24 md:py-48 relative">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <div className={`max-w-6xl mx-auto p-10 md:p-24 rounded-[3rem] md:rounded-[6rem] border-2 transition-all duration-1000 ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-3xl' : 'bg-black/5 border-black/10 shadow-xl'}`}>
             <Quote size={60} className={`mx-auto mb-10 md:mb-16 opacity-30 md:w-24 md:h-24 ${isDark ? 'text-white' : 'text-black'}`} />
             <p className={`text-2xl md:text-7xl font-bold leading-[1.6] md:leading-[1.5] mb-12 md:mb-20 italic tracking-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
               "نحن في CODX نؤمن بأن البرمجيات ليست مجرد أسطر برمجية جافة، بل هي الفن الوحيد الذي يمكننا العيش بداخله."
             </p>
             <div className={`font-black text-xl md:text-4xl tracking-[0.2em] md:tracking-[0.5em] uppercase ${isDark ? 'text-white' : 'text-black'}`}>
               رؤيتنا <br className="md:hidden" />
               <span className="text-sm md:text-2xl opacity-60 tracking-widest">- CODX MISSION -</span>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-24 md:py-48 border-t transition-all ${isDark ? 'border-white/5 bg-[#010208] text-slate-600' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
        <div className="container mx-auto px-4 md:px-6 text-center space-y-12 md:space-y-16">
          <div className="flex items-center justify-center gap-4 md:gap-8 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <Zap size={32} fill="currentColor" className="md:w-12 md:h-12" />
             </div>
             <span className={`text-5xl md:text-8xl font-black tracking-tighter uppercase italic transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>CODX</span>
          </div>
          
          <div className="flex justify-center gap-4 md:gap-10">
            {SOCIAL_LINKS.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-500 transform hover:scale-110 ${isDark ? 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/30' : 'border-slate-200 bg-white text-slate-600 hover:text-black hover:border-black shadow-lg'}`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className={`font-black text-2xl md:text-5xl max-w-2xl mx-auto leading-relaxed uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>Innovation Lab</p>
            <p className="opacity-50 text-sm md:text-2xl font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase">صناعة المستقبل البرمجي السيادي</p>
          </div>

          <div className="pt-12 md:pt-24 opacity-30 text-[10px] md:text-base tracking-[0.3em] md:tracking-[0.6em] uppercase font-black">
            © {new Date().getFullYear()} CODX | ARCHITECTING THE FUTURE
          </div>
        </div>
      </footer>

      {/* Luxury Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
          <div className={`relative w-full max-w-4xl p-8 md:p-16 rounded-3xl md:rounded-[4rem] border-2 shadow-2xl animate-hero-reveal my-auto ${isDark ? 'bg-slate-900 border-white/5 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-6 right-6 md:top-10 md:left-10 p-2 hover:rotate-90 transition-all duration-500"
              aria-label="إغلاق"
            >
              <X size={32} className="md:w-10 md:h-10" />
            </button>
            
            <div className="text-center space-y-8 md:space-y-12">
               <div className="space-y-4 md:space-y-6">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">اتصل <span>بالنخبة</span></h2>
                 <p className="text-lg md:text-2xl opacity-60">نحن هنا لتحويل رؤيتك إلى واقع برمجي ملموس.</p>
               </div>

               <div className="grid md:grid-cols-2 gap-4 md:gap-10">
                 <a 
                   href={`mailto:${CONTACT_EMAIL}`}
                   className={`flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 transition-all hover:scale-105 ${isDark ? 'border-white/5 bg-white/5 hover:border-white/30' : 'border-slate-100 bg-slate-50 hover:border-black/30'}`}
                 >
                    <Mail size={32} className={`md:w-10 md:h-10 ${isDark ? 'text-white' : 'text-black'}`} />
                    <div className="text-right">
                      <p className="text-[10px] md:text-sm opacity-50 font-bold uppercase tracking-widest">Email Us</p>
                      <p className="text-sm md:text-2xl font-black truncate max-w-[150px] md:max-w-none">{CONTACT_EMAIL}</p>
                    </div>
                 </a>
                 <a 
                   href={WHATSAPP_URL}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 transition-all hover:scale-105 ${isDark ? 'border-white/5 bg-white/5 hover:border-white/30' : 'border-slate-100 bg-slate-50 hover:border-black/30'}`}
                 >
                    <MessageSquare size={32} className={`md:w-10 md:h-10 ${isDark ? 'text-white' : 'text-black'}`} />
                    <div className="text-right">
                      <p className="text-[10px] md:text-sm opacity-50 font-bold uppercase tracking-widest">WhatsApp</p>
                      <p className="text-sm md:text-2xl font-black">{CONTACT_WHATSAPP}</p>
                    </div>
                 </a>
               </div>

               <div className="pt-4 md:pt-10">
                 <button 
                   onClick={() => window.open(`mailto:${CONTACT_EMAIL}`)}
                   className={`w-full py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] text-xl md:text-3xl font-black transition-all shadow-xl ${isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}
                 >
                   أرسل استفسارك الآن
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default App;
