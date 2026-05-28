import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ArrowRight, 
  Menu, 
  X, 
  Calendar, 
  User, 
  Scissors, 
  ShoppingBag, 
  Sparkles, 
  Smartphone, 
  Check, 
  Trash2, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Award,
  Search,
  Filter,
  Volume2
} from 'lucide-react'

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState('barberflow');
  const [cosaNostraView, setCosaNostraView] = useState('home');
  
  // Refs para animações GSAP
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const ctaRef = useRef(null);
  const navbarRef = useRef(null);
  const cardsRef = useRef(null);
  const philosophyRef = useRef(null);
  const protocolRef = useRef(null);


  // Efeito de rolagem na Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        navbarRef.current?.classList.add('bg-primary/80', 'backdrop-blur-xl', 'border-marfim/10', 'py-4');
        navbarRef.current?.classList.remove('bg-transparent', 'py-6', 'border-transparent');
      } else {
        navbarRef.current?.classList.add('bg-transparent', 'py-6', 'border-transparent');
        navbarRef.current?.classList.remove('bg-primary/80', 'backdrop-blur-xl', 'border-marfim/10', 'py-4');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animações de Entrada
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animação Hero
      const tl = gsap.timeline();
      tl.fromTo(title1Ref.current, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(title2Ref.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(ctaRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // ScrollTrigger para Filosofia
      gsap.fromTo(".split-text", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#filosofia",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // ScrollTrigger para o Efeito Stacking do Protocolo
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.4,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            }
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // --- COMPONENT STATE LOGICS ---

  // CARD 1: Diagnostic Shuffler
  const [shufflerItems, setShufflerItems] = useState([
    { id: 1, label: 'Layout Fluido 1:1', desc: 'Design cirúrgico focado no pixel', badge: 'ESTRUTURA' },
    { id: 2, label: 'Transição Orgânica', desc: 'Curvas de mola e física nas animações', badge: 'DINÂMICA' },
    { id: 3, label: 'Tipografia Heroica', desc: 'Contraste massivo entre sans e serifa italic', badge: 'ESTRELA' },
  ]);
  useEffect(() => {
    const timer = setInterval(() => {
      setShufflerItems(prev => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // CARD 2: Telemetry Typewriter
  const [typewriterText, setTypewriterText] = useState('');
  const logs = [
    '[SYSTEM] Init VLAEG Protocol...',
    '[GSAP] ScrollTrigger context registered',
    '[AESTHETIC] active: Midnight Luxe',
    '[UI] Loaded BarberFlow Booking step_1',
    '[UI] Loaded Cosa Nostra Catalog - 24 items',
    '[UI] Loaded ML Estetica - 8 procedures',
    '[SYSTEM] Performance status: OPTIMAL',
  ];
  useEffect(() => {
    let currentLogIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let delay = 100;

    const tick = () => {
      const currentLog = logs[currentLogIndex];
      if (!isDeleting) {
        setTypewriterText(currentLog.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        if (currentCharIndex === currentLog.length) {
          isDeleting = true;
          delay = 2000; // Pause at end
        } else {
          delay = 40 + Math.random() * 40;
        }
      } else {
        setTypewriterText(currentLog.slice(0, currentCharIndex - 1));
        currentCharIndex--;
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentLogIndex = (currentLogIndex + 1) % logs.length;
          delay = 500; // Pause before next
        } else {
          delay = 20;
        }
      }
      setTimeout(tick, delay);
    };

    const timeout = setTimeout(tick, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // CARD 3: Cursor Protocol Scheduler
  const [activeDay, setActiveDay] = useState(2); // Inicia na Terça (T)
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 40 });
  const [cursorClicked, setCursorClicked] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const cycle = async () => {
      // Mover para dia W (índice 3)
      setCursorPos({ x: 130, y: 42 });
      await new Promise(r => setTimeout(r, 1200));
      setCursorClicked(true);
      setActiveDay(3);
      await new Promise(r => setTimeout(r, 200));
      setCursorClicked(false);
      
      // Mover para o botão Salvar
      await new Promise(r => setTimeout(r, 400));
      setCursorPos({ x: 200, y: 110 });
      await new Promise(r => setTimeout(r, 800));
      setCursorClicked(true);
      setBtnActive(true);
      await new Promise(r => setTimeout(r, 250));
      setCursorClicked(false);
      
      // Resetar ciclo
      await new Promise(r => setTimeout(r, 1500));
      setBtnActive(false);
      setActiveDay(2);
      setCursorPos({ x: 30, y: 40 });
    };

    const interval = setInterval(cycle, 5000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  // --- STATE FOR SHOWROOM APPLICATIONS ---
  const [toastMsg, setToastMsg] = useState(null);
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // State BarberFlow Booking
  const [booking, setBooking] = useState({
    step: 1,
    service: null,
    barber: null,
    date: null,
    time: null,
    confirmed: false
  });

  // State Cosa Nostra Shop
  const [cart, setCart] = useState({
    items: [],
    total: 0.0
  });
  const [shopFilter, setShopFilter] = useState('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // State ML Estética
  const [mlActiveService, setMlActiveService] = useState('limpeza');

  // --- MOCK DATABASE ---
  const barberServices = [
    { id: 'corte', name: 'Corte Clássico', price: 45.0, duration: '40 min' },
    { id: 'barba', name: 'Barboterapia', price: 35.0, duration: '30 min' },
    { id: 'combo', name: 'Combo Premium (Corte + Barba)', price: 70.0, duration: '70 min' }
  ];

  const barbers = [
    { id: 'enzo', name: 'Enzo Vincenzo', rating: '4.9', avatar: '🧔' },
    { id: 'thiago', name: 'Thiago Neves', rating: '4.8', avatar: '👨🏻‍🦰' },
    { id: 'vincenzo', name: 'Vincenzo Scarpa', rating: '5.0', avatar: '👴🏻' }
  ];

  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  const shopProducts = [
    { id: 'calca-baggy', name: 'Calça Baggy Preta Estonada', price: 129.90, category: 'Roupas', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80', badge: 'NEW DROP' },
    { id: 'cam-cortez', name: 'Camiseta Cortez Brasil', price: 79.90, category: 'Roupas', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80', badge: 'OUTDOOR' },
    { id: 'cam-essentials', name: 'Camiseta Essentials "Fear of God"', price: 129.00, category: 'Roupas', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80', badge: 'SPECIAL' },
    { id: 'short-tactel', name: 'Short Tactel NK - Preto', price: 64.90, category: 'Roupas', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80', badge: 'APPAREL' },
    { id: 'tenis-mob', name: 'Tênis Mob Streetwear', price: 299.90, category: 'Calçados', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=80', badge: 'LIMITED' },
    { id: 'bone-underground', name: 'Boné Underground Club', price: 49.90, category: 'Acessórios', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80', badge: 'DROP' }
  ];

  const mlServices = {
    limpeza: {
      title: 'Limpeza de Pele Profunda',
      desc: 'Remoção cirúrgica de impurezas com vapor de ozônio, extração manual detalhada e máscara calmante adaptada para restaurar a saúde natural da epiderme.',
      duration: '90 min',
      price: 'R$ 180,00',
      testimonial: { text: "Fiz minha limpeza de pele e amei! O ambiente é super calmo e acolhedor. Me senti em um spa de verdade.", client: "Beatriz Oliveira" }
    },
    drenagem: {
      title: 'Drenagem Linfática Corporal',
      desc: 'Técnica manual altamente especializada para redução de edemas, estimulação do sistema linfático, desintoxicação corporal e combate à retenção de líquidos pós-operatórios.',
      duration: '60 min',
      price: 'R$ 150,00',
      testimonial: { text: "Melhor drenagem que já fiz na vida. Tive um alívio imediato no inchaço das pernas. A Maria é extremamente técnica.", client: "Fernanda Costa" }
    },
    microagulhamento: {
      title: 'Microagulhamento de Precisão',
      desc: 'Indução percutânea de colágeno para suavização de cicatrizes de acne, marcas de expressão e rejuvenescimento profundo através de drug delivery estéril.',
      duration: '75 min',
      price: 'R$ 350,00',
      testimonial: { text: "O atendimento da Maria Luisa é impecável. Ela explica cada passo e o resultado na pele foi visível na primeira semana.", client: "Ana Paula Silva" }
    },
    lipedema: {
      title: 'Tratamento Especializado de Lipedema',
      desc: 'Protocolo clínico personalizado com terapia manual voltada para a diminuição da dor física, ativação circulatória profunda e alívio das pressões nas áreas afetadas.',
      duration: '80 min',
      price: 'Sob Consulta',
      testimonial: { text: "A Maria Luisa entende de verdade de Lipedema. Senti uma leveza que há anos não experimentava nas pernas.", client: "Juliana Mendes" }
    }
  };

  // --- ACTIONS ---
  
  // BarberFlow Booking
  const handleBarberService = (srv) => {
    setBooking(prev => ({ ...prev, service: srv, step: 2 }));
  };
  const handleBarberSelect = (barb) => {
    setBooking(prev => ({ ...prev, barber: barb, step: 3 }));
  };
  const handleBarberDateTime = (date, time) => {
    setBooking(prev => ({ ...prev, date, time, step: 4, confirmed: true }));
    triggerToast("Agendamento BarberFlow realizado com sucesso!");
  };
  const resetBarberBooking = () => {
    setBooking({ step: 1, service: null, barber: null, date: null, time: null, confirmed: false });
  };

  // Cosa Nostra Shop
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.items.find(item => item.id === product.id);
      let updatedItems = [];
      if (exist) {
        updatedItems = prev.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prev.items, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }
      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { items: updatedItems, total: newTotal };
    });
    triggerToast(`${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updatedItems = prev.items.filter(item => item.id !== id);
      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { items: updatedItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    setIsCartOpen(false);
    triggerToast("Compra simulada finalizada!");
  };

  return (
    <div className="relative min-h-screen font-sans bg-primary text-marfim overflow-hidden selection:bg-accent selection:text-primary">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-[10000] bg-accent text-primary px-6 py-4 rounded-xl font-mono text-sm font-bold shadow-2xl flex items-center gap-3 animate-fade-in border border-marfim/20">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* NAVBAR: A Ilha Flutuante */}
      <nav 
        ref={navbarRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-500 py-6 border-b border-transparent bg-transparent mt-4 rounded-full flex items-center justify-between px-8"
      >
        <div className="flex items-center gap-2">
          <span className="font-serif italic font-bold text-xl tracking-wide text-accent">JOÃO LUCAS</span>
        </div>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          <a href="#inicio" className="hover:text-accent transition-colors lift">INÍCIO</a>
          <a href="#features" className="hover:text-accent transition-colors lift">RECURSOS</a>
          <a href="#projetos" className="hover:text-accent transition-colors lift">PROJETOS</a>
          <a href="#filosofia" className="hover:text-accent transition-colors lift">MANIFESTO</a>
          <a href="#protocolo" className="hover:text-accent transition-colors lift">MÉTODO</a>
        </div>

        <div>
          <a 
            href="#projetos" 
            className="magnetic hidden md:inline-flex items-center gap-2 bg-accent hover:bg-marfim text-primary px-6 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 shadow-md"
          >
            <span>Ver Projetos</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile menu trigger */}
          <button 
            className="md:hidden text-marfim hover:text-accent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 font-serif text-3xl">
          <a 
            href="#inicio" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent transition-colors"
          >
            Início
          </a>
          <a 
            href="#features" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent transition-colors"
          >
            Recursos
          </a>
          <a 
            href="#projetos" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent transition-colors"
          >
            Projetos
          </a>
          <a 
            href="#filosofia" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent transition-colors"
          >
            Manifesto
          </a>
          <a 
            href="#protocolo" 
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent transition-colors"
          >
            Método
          </a>
        </div>
      )}

      {/* HERO SECTION: A Cena de Abertura */}
      <section 
        id="inicio"
        ref={heroRef}
        className="relative w-full h-[100dvh] flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-16 lg:px-24 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, #070709 15%, rgba(7, 7, 9, 0.4) 60%, rgba(7, 7, 9, 0.95) 100%), url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        {/* Glows de Luz Animados */}
        <div className="glow-green w-[500px] h-[500px] absolute top-0 left-0 -ml-32 -mt-32 opacity-40 z-0 pointer-events-none animate-float-2" />
        <div className="glow-purple w-[600px] h-[600px] absolute bottom-0 right-0 -mr-48 -mb-48 opacity-50 z-0 pointer-events-none animate-float-1" />
        
        {/* Linhas Orbitais Geométricas Animadas */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <g className="animate-rotate-slow" style={{ transformOrigin: '75% 75%' }}>
            <ellipse cx="75%" cy="75%" rx="600" ry="300" stroke="#7B61FF" strokeWidth="0.5" fill="none" transform="rotate(-20 75% 75%)" strokeDasharray="8 8" />
            <ellipse cx="75%" cy="75%" rx="800" ry="400" stroke="#00E5A3" strokeWidth="0.25" fill="none" transform="rotate(-20 75% 75%)" />
          </g>
        </svg>

        <div className="max-w-4xl z-10 flex flex-col gap-6 text-left">
          <div className="font-mono text-xs text-accent tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>PORTFÓLIO DE SISTEMAS HIGH-END</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-none text-marfim">
            <span ref={title1Ref} className="block overflow-hidden">
              Dê vida ao
            </span>
            <span ref={title2Ref} className="block font-serif italic bg-gradient-to-r from-accent to-accentGreen bg-clip-text text-transparent mt-2">
              seu projeto!
            </span>
          </h1>


          <div ref={ctaRef} className="mt-4 flex flex-wrap gap-4">
            <a 
              href="#projetos" 
              className="magnetic bg-accent hover:bg-accentGreen text-white font-mono text-xs font-bold px-8 py-4 rounded-full transition-colors flex items-center gap-3 shadow-lg shadow-accent/25"
            >
              <span>Explorar Projetos</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#protocolo" 
              className="magnetic border border-white/10 hover:border-accent hover:text-accent font-mono text-xs font-bold px-8 py-4 rounded-full transition-all bg-surface/30 backdrop-blur-sm"
            >
              Conhecer Meu Método
            </a>
          </div>

          {/* Rodapé de Tecnologias Core (Inspirado na Referência 3) */}
          <div className="mt-12 pt-6 border-t border-white/5 w-full max-w-lg z-10 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-accent/50 tracking-[0.2em] uppercase">TECNOLOGIAS CORE DE DESENVOLVIMENTO</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-marfim/50 font-mono text-[10px]">
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-accent rounded-full animate-pulse" />REACT 19</span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-white/40 rounded-full" />TAILWIND CSS</span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-white/40 rounded-full" />GSAP ANIMATIONS</span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-white/40 rounded-full" />NODE.JS</span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-white/40 rounded-full" />VITE</span>
            </div>
          </div>
        </div>

        {/* Decoração Estética */}
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-1 font-mono text-[10px] text-marfim/30 text-right">
          <span>LATITUDE: 23° 33' 1" S</span>
          <span>LONGITUDE: 46° 38' 2" W</span>
          <span>CLIENTSIDE REACT 19 / GSAP 3</span>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL DE PROJETOS */}
      <section id="projetos" className="py-24 bg-primary relative border-y border-white/5 overflow-hidden">
        {/* Título decorativo gigante vazado no fundo (Inspirado na Referência 2) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] font-serif italic text-outline select-none opacity-[0.012] pointer-events-none tracking-widest leading-none z-0">
          PROJETOS
        </div>

        {/* Fundo Decorativo */}
        <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">INTERACTION HUB</span>
            <h2 className="text-3xl md:text-6xl font-serif italic text-marfim mt-2">Meus Projetos</h2>
            <p className="text-marfim/50 text-xs md:text-sm font-sans mt-3">
              Alterne entre os projetos reais que desenvolvi e navegue pelas composições 1:1 pixel-perfect.
            </p>
          </div>

          {/* Navegação do Showroom */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveProject('barberflow')}
              className={`px-6 py-3 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                activeProject === 'barberflow' 
                  ? 'border-amber-500/80 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                  : 'bg-surface/60 hover:bg-white/5 border-white/5 text-marfim/60'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>BARBERFLOW</span>
            </button>
            <button 
              onClick={() => setActiveProject('cosanostra')}
              className={`px-6 py-3 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                activeProject === 'cosanostra' 
                  ? 'border-red-500/80 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                  : 'bg-surface/60 hover:bg-white/5 border-white/5 text-marfim/60'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>COSA NOSTRA SHOP</span>
            </button>
            <button 
              onClick={() => setActiveProject('mlestetica')}
              className={`px-6 py-3 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                activeProject === 'mlestetica' 
                  ? 'border-fuchsia-500/80 bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.15)]' 
                  : 'bg-surface/60 hover:bg-white/5 border-white/5 text-marfim/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>MARIA LUISA ESTÉTICA</span>
            </button>
          </div>

          {/* MOCKUP DO NAVEGADOR DO SHOWROOM */}
          <div className="w-full bg-[#0E0E15]/90 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col backdrop-blur-xl relative z-10">
            
            {/* Barra do Navegador */}
            <div className="px-6 py-4 bg-[#070709]/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-[#070709] text-marfim/45 text-[10px] font-mono px-6 py-1.5 rounded-full border border-white/5 w-[50%] max-w-md truncate">
                https://{activeProject === 'barberflow' ? 'barberflow' : activeProject === 'cosanostra' ? 'cosanostra.shop' : 'mlestetica.com'}.studio
              </div>
              <div className="w-8" />
            </div>

            {/* Área de Conteúdo do Navegador (Alternado pelo Estado) */}
            <div className="min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row relative">

              {/* LATERAIS DESCRITIVAS */}
              <div className="w-full md:w-[35%] bg-[#09090E]/90 p-8 border-r border-white/5 flex flex-col justify-between text-left gap-8 backdrop-blur-xl">
                
                <div>
                  {activeProject === 'barberflow' && (
                    <div className="flex flex-col gap-4">
                      <span className="font-mono text-[10px] text-amber-500 font-bold tracking-widest">SISTEMA SAS DE AGENDAMENTO</span>
                      <h3 className="text-3xl font-serif italic text-marfim">BarberFlow</h3>
                      <p className="text-xs text-marfim/60 leading-relaxed">
                        Uma plataforma premium de automação de horários e gestão administrativa para barbearias de alto padrão visual. A interface do cliente final permite agendar em apenas 4 passos simples.
                      </p>
                      
                      <div className="space-y-2 mt-4 font-mono text-[11px] text-marfim/50">
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Categoria:</span>
                          <span className="text-marfim">SaaS / Automação</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Mensalidade:</span>
                          <span className="text-amber-500 font-bold">R$ 95,50/mês</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Integrações:</span>
                          <span className="text-marfim">WhatsApp API, Stripe</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject === 'cosanostra' && (
                    <div className="flex flex-col gap-4">
                      <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest">E-COMMERCE DE STREETWEAR</span>
                      <h3 className="text-3xl font-serif italic text-marfim">Cosa Nostra</h3>
                      <p className="text-xs text-marfim/60 leading-relaxed">
                        Loja conceitual de streetwear com estética urbana e brutalista. Apresenta um catálogo dinâmico de lançamentos exclusivos, suporte a filtros e carrinho de compras funcional.
                      </p>

                      <div className="space-y-2 mt-4 font-mono text-[11px] text-marfim/50">
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Categoria:</span>
                          <span className="text-marfim">E-commerce / Moda</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Estilo Visual:</span>
                          <span className="text-red-500 font-bold">Brutalista / Urbano</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Performance:</span>
                          <span className="text-marfim">99+ Google Lighthouse</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject === 'mlestetica' && (
                    <div className="flex flex-col gap-4">
                      <span className="font-mono text-[10px] text-fuchsia-400 font-bold tracking-widest">ESTÉTICA CLÍNICA PREMIUM</span>
                      <h3 className="text-3xl font-serif italic text-marfim">ML Estética</h3>
                      <p className="text-xs text-marfim/60 leading-relaxed">
                        Design minimalista focado em luxo e bem-estar para a clínica da Maria Luisa. Oferece abas deslizantes de procedimentos, tratamentos focados em lipedema e feedbacks reais.
                      </p>

                      <div className="space-y-2 mt-4 font-mono text-[11px] text-marfim/50">
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Categoria:</span>
                          <span className="text-marfim">Landing Page Boutique</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Cores Clínicas:</span>
                          <span className="text-fuchsia-400 font-bold">Pastel, Roxo & Champagne</span>
                        </div>
                        <div className="flex justify-between border-b border-marfim/5 pb-1">
                          <span>Proposta:</span>
                          <span className="text-marfim">Beleza natural e individual</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {activeProject === 'barberflow' && <Scissors className="w-5 h-5" />}
                    {activeProject === 'cosanostra' && <ShoppingBag className="w-5 h-5" />}
                    {activeProject === 'mlestetica' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="text-left font-mono text-[10px]">
                    <div className="text-marfim font-bold">JOÃO LUCAS / VERIFIED ENGINE</div>
                    <div className="text-marfim/40">100% Interativo</div>
                  </div>
                </div>

              </div>

              {/* NÚCLEO INTERATIVO (O WIDGET QUE EXIBE O LAYOUT REAL DO PROJETO EM PDF) */}
              <div className="flex-1 bg-[#09090E] min-h-[600px] flex flex-col relative overflow-hidden border-l border-white/5">
                {activeProject === 'barberflow' && (
                  <div className="relative w-full h-full min-h-[600px]">
                    <iframe 
                      src="pdf/barberflow.pdf#toolbar=0&navpanes=0" 
                      className="w-full h-full min-h-[600px] border-0"
                      title="BarberFlow Real Composition"
                    />
                    <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
                  </div>
                )}

                {activeProject === 'cosanostra' && (
                  <div className="w-full h-full flex flex-col flex-1 relative">
                    {/* Abas Internas da Cosa Nostra */}
                    <div className="bg-[#0A0A0E] px-4 py-2 border-b border-marfim/5 flex gap-2 relative z-40">
                      <button 
                        onClick={() => setCosaNostraView('home')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
                          cosaNostraView === 'home' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-surface hover:bg-marfim/5 text-marfim/50 border border-marfim/5'
                        }`}
                      >
                        PÁGINA PRINCIPAL
                      </button>
                      <button 
                        onClick={() => setCosaNostraView('vendas')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
                          cosaNostraView === 'vendas' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-surface hover:bg-marfim/5 text-marfim/50 border border-marfim/5'
                        }`}
                      >
                        CATÁLOGO DE VENDAS
                      </button>
                    </div>
                    <div className="relative flex-1 min-h-[550px]">
                      <iframe 
                        src={`pdf/${cosaNostraView === 'home' ? 'cosanostra.pdf' : 'cosanostra-vendas.pdf'}#toolbar=0&navpanes=0`} 
                        className="w-full h-full min-h-[550px] border-0"
                        title="Cosa Nostra Real Composition"
                      />
                      <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
                    </div>
                  </div>
                )}

                {activeProject === 'mlestetica' && (
                  <div className="relative w-full h-full min-h-[600px]">
                    <iframe 
                      src="pdf/mlestetica.pdf#toolbar=0&navpanes=0" 
                      className="w-full h-full min-h-[600px] border-0"
                      title="ML Estética Real Composition"
                    />
                    <div className="absolute inset-0 z-30 bg-transparent pointer-events-auto" />
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FEATURES: Artefatos Funcionais Interativos */}
      <section id="features" className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full relative overflow-hidden">
        {/* Título decorativo gigante vazado no fundo (Inspirado na Referência 2) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] font-serif italic text-outline select-none opacity-[0.012] pointer-events-none tracking-widest leading-none z-0">
          RECURSOS
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 relative z-10">
          <div className="text-left">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">PROPOSTAS DE VALOR</span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-marfim mt-2">Arquitetura Sensorial & Código</h2>
          </div>
        </div>

        {/* Grid de 3 Cards Interativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1: Diagnostic Shuffler */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between h-[380px] hover:border-accent/30 transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-accent/60 tracking-wider">AESTHETIC DEPT.</span>
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            </div>

            {/* Simulação física de Shuffler */}
            <div className="relative h-44 w-full flex items-center justify-center">
              {shufflerItems.map((item, idx) => {
                // Cálculo de profundidade visual
                let zIndex = 3 - idx;
                let scale = 1 - idx * 0.08;
                let translateY = idx * 24;
                let opacity = 1 - idx * 0.25;

                return (
                  <div
                    key={item.id}
                    className="absolute w-[90%] p-4 rounded-2xl glass-accent flex flex-col justify-between text-left transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[9px] text-accent font-bold tracking-wider">{item.badge}</span>
                      <span className="text-[10px] text-marfim/30 font-mono">0{item.id}</span>
                    </div>
                    <span className="font-sans font-bold text-xs text-marfim">{item.label}</span>
                    <span className="font-sans text-[10px] text-marfim/50 mt-1">{item.desc}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-left mt-4 z-10 bg-primary/20 backdrop-blur-sm">
              <h3 className="font-sans font-bold text-md text-marfim">Design 1:1 Pixel-Perfect</h3>
              <p className="text-xs text-marfim/50 mt-1">Design de luxo onde cada elemento segue proporções exatas.</p>
            </div>
          </div>

          {/* CARD 2: Telemetry Typewriter */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between h-[380px] hover:border-accent/30 transition-all group overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-accent/60 tracking-wider">ANIMATION CONTROLLER</span>
              <div className="flex items-center gap-2 bg-accent/10 px-2 py-0.5 rounded-full border border-accent/25">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[8px] text-accent tracking-wider font-bold">LIVE FEED</span>
              </div>
            </div>

            {/* Simulação do Terminal */}
            <div className="bg-[#08080C] border border-marfim/10 rounded-2xl p-4 h-44 font-mono text-left text-[11px] text-[#A29FA6] overflow-y-hidden flex flex-col justify-end gap-1">
              <div className="text-marfim/30">LOG TERMINAL RE-ANIMATION:</div>
              <div className="text-accent/80 font-bold">&gt; {typewriterText}<span className="inline-block w-1.5 h-3 bg-accent ml-0.5 animate-pulse" /></div>
              <div className="text-[9px] text-marfim/20 mt-4 border-t border-marfim/5 pt-1">
                EASING: cubic-bezier(0.25, 0.46, 0.45, 0.94)
              </div>
            </div>

            <div className="text-left mt-4">
              <h3 className="font-sans font-bold text-md text-marfim">Micro-interações de Elite</h3>
              <p className="text-xs text-marfim/50 mt-1">Efeitos magnéticos e transições físicas criadas com GSAP.</p>
            </div>
          </div>

          {/* CARD 3: Cursor Protocol Scheduler */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between h-[380px] hover:border-accent/30 transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-accent/60 tracking-wider">LIVE DEMO DO PROJETO</span>
              <span className="font-mono text-[10px] text-marfim/30">UTC-3</span>
            </div>

            {/* Calendário com Cursor Simulado */}
            <div className="relative border border-marfim/10 rounded-2xl p-4 h-44 bg-[#08080C] overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="font-mono text-[9px] text-marfim/30 mb-1">{day}</span>
                    <div 
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono transition-all duration-300 ${
                        activeDay === idx 
                          ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20 scale-110' 
                          : 'bg-marfim/5 text-marfim/60'
                      }`}
                    >
                      {24 + idx}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de simulação */}
              <div className="flex justify-between items-center mt-2 border-t border-marfim/5 pt-2">
                <span className="font-mono text-[8px] text-marfim/40">VLAEG SCHEDULE ENGINE</span>
                <div 
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
                    btnActive 
                      ? 'bg-accent text-primary scale-95 shadow-md shadow-accent/20' 
                      : 'bg-marfim/10 text-marfim/70 border border-marfim/10'
                  }`}
                >
                  Salvar
                </div>
              </div>

              {/* Cursor SVG Simulado */}
              <svg 
                className="absolute pointer-events-none transition-all duration-700 ease-out z-50 drop-shadow-md"
                style={{
                  left: `${cursorPos.x}px`,
                  top: `${cursorPos.y}px`,
                  transform: cursorClicked ? 'scale(0.85)' : 'scale(1)'
                }}
                width="14" 
                height="19" 
                viewBox="0 0 14 19" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0V18.5L5.2 13.3H12.2L0 0Z" fill={cursorClicked ? '#C9A84C' : '#FAF8F5'} />
              </svg>
            </div>

            <div className="text-left mt-4">
              <h3 className="font-sans font-bold text-md text-marfim">Projetos Dinâmicos</h3>
              <p className="text-xs text-marfim/50 mt-1">Widgets e sistemas de alta fidelidade 100% integrados.</p>
            </div>
          </div>

        </div>
      </section>

      {/* MANIFESTO / PHILOSOPHY: O Manifesto */}
      <section 
        id="filosofia" 
        className="py-28 bg-[#070709] text-left relative overflow-hidden border-y border-white/5"
      >
        {/* Esfera Planetária Eclipsada no Fundo (Inspirado na Referência 3 - Sparked) */}
        <div className="absolute -right-64 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#070709] border border-white/5 shadow-[-30px_0_90px_rgba(123,97,255,0.08)] pointer-events-none z-0" />
        <div className="glow-purple w-[500px] h-[500px] absolute -right-48 top-1/2 -translate-y-1/2 z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full relative z-10">
          <span className="font-mono text-xs text-accent tracking-[0.2em] block mb-8">MEU MANIFESTO</span>
          
          <div className="flex flex-col gap-12 max-w-6xl">
            <div className="split-text text-marfim/40 font-mono text-sm leading-relaxed tracking-wider max-w-2xl" style={{ wordSpacing: '0.08em' }}>
              A maioria das agências e freelancers foca em: <span className="text-marfim">templates genéricos, CMS engessados e soluções repetitivas injetadas por IA.</span>
            </div>

            <div className="split-text text-3xl sm:text-5xl md:text-6xl font-serif text-marfim tracking-normal leading-relaxed" style={{ wordSpacing: '0.12em' }}>
              Eu foco em: <span className="font-serif italic text-accent">instrumentos digitais personalizados</span>, onde cada rolagem é intencional, cada transição tem peso e o código é uma obra de arte viva.
            </div>
          </div>
        </div>
      </section>

      {/* STICKY STACKING PROTOCOL: O Método */}
      <section id="protocolo" className="py-24 bg-primary relative overflow-hidden border-t border-white/5">
        {/* Título decorativo gigante vazado no fundo (Inspirado na Referência 2) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[18rem] font-serif italic text-outline select-none opacity-[0.01] pointer-events-none tracking-widest leading-none z-0">
          METODO
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full text-left relative z-10">
          
          <div className="mb-16">
            <span className="font-mono text-xs text-accent tracking-widest">MINHA METODOLOGIA</span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-marfim mt-2">O Protocolo</h2>
          </div>

          {/* Cards de Empilhamento */}
          <div className="space-y-24">
            
            {/* CARD 1 */}
            <div className="protocol-card sticky top-24 min-h-[500px] w-full rounded-[3rem] glass p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0E0E15]/95 border border-white/5 hover:border-accent/30 shadow-2xl backdrop-blur-xl">
              <div className="flex-1 space-y-4 max-w-lg text-left">
                <span className="font-mono text-xs text-accent font-bold tracking-wider">PASSO 01</span>
                <h3 className="text-3xl font-serif italic text-marfim">A Concepção Cinematográfica</h3>
                <p className="text-sm text-marfim/60 leading-relaxed font-light">
                  Analiso a identidade profunda da sua marca para conceber uma atmosfera digital sob medida. Meus layouts utilizam tipografias refinadas e paletas cromáticas harmônicas para gerar uma primeira impressão impactante.
                </p>
              </div>

              {/* Animação Geométrica Rotativa */}
              <div className="w-56 h-56 flex items-center justify-center relative">
                <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#7B61FF" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="#00E5A3" strokeWidth="0.25" fill="none" opacity="0.3" />
                  <rect x="35" y="35" width="30" height="30" stroke="#7B61FF" strokeWidth="0.5" fill="none" />
                  <rect x="35" y="35" width="30" height="30" stroke="#00E5A3" strokeWidth="0.25" fill="none" transform="rotate(45 50 50)" opacity="0.5" />
                </svg>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="protocol-card sticky top-28 min-h-[500px] w-full rounded-[3rem] glass p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0E0E15]/95 border border-white/5 hover:border-accentGreen/30 shadow-2xl backdrop-blur-xl">
              <div className="flex-1 space-y-4 max-w-lg text-left">
                <span className="font-mono text-xs text-accentGreen font-bold tracking-wider">PASSO 02</span>
                <h3 className="text-3xl font-serif italic text-marfim">Engenharia Milimétrica</h3>
                <p className="text-sm text-marfim/60 leading-relaxed font-light">
                  Implemento micro-animações magnéticas e interfaces fluidas de software rodando em client-side React. Com o poder do GSAP ScrollTrigger, a navegação do usuário se transforma em um fluxo harmônico e responsivo.
                </p>
              </div>

              {/* Linha Laser de Escaneamento */}
              <div className="w-64 h-40 bg-[#070709] rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-4 shadow-[inset_0_0_20px_rgba(0,229,163,0.05)]">
                <div className="grid grid-cols-8 gap-y-4 gap-x-2 relative z-10 my-auto">
                  {Array.from({ length: 4 }).map((_, rowIndex) => 
                    Array.from({ length: 8 }).map((_, colIndex) => {
                      const pointId = rowIndex * 8 + colIndex;
                      const delay = rowIndex * 0.5; // Escalonado com o laser (0s, 0.5s, 1s, 1.5s)
                      return (
                        <div 
                          key={pointId} 
                          className="w-1.5 h-1.5 rounded-full bg-accentGreen/10 animate-scan-point"
                          style={{
                            animationDelay: `${delay}s`
                          }}
                        />
                      );
                    })
                  )}
                </div>
                {/* Linha laser de scan animada */}
                <div className="absolute left-0 w-full h-[2px] bg-accentGreen shadow-[0_0_15px_rgba(0,229,163,0.9)] animate-scan-laser z-20 pointer-events-none" />
                <div className="font-mono text-[8px] text-marfim/30 text-right mt-auto">SCANNING ACTIVE...</div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="protocol-card sticky top-32 min-h-[500px] w-full rounded-[3rem] glass p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0E0E15]/95 border border-white/5 hover:border-accent/30 shadow-2xl backdrop-blur-xl">
              <div className="flex-1 space-y-4 max-w-lg text-left">
                <span className="font-mono text-xs text-accent font-bold tracking-wider">PASSO 03</span>
                <h3 className="text-3xl font-serif italic text-marfim">Projetos Vivos</h3>
                <p className="text-sm text-marfim/60 leading-relaxed font-light">
                  Os sistemas desenvolvidos não são estáticos; crio playgrounds e projetos acoplados para demonstrar imediatamente o valor e as interações do seu produto aos visitantes, gerando conversões imediatas.
                </p>
              </div>

              {/* Sinal EKG Pulsante */}
              <div className="w-64 h-32 bg-[#070709] rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center p-4">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <path 
                    d="M0,50 L40,50 L50,20 L60,80 L70,50 L100,50 L110,10 L120,90 L130,50 L200,50" 
                    fill="none" 
                    stroke="#7B61FF" 
                    strokeWidth="2"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    className="animate-[dash_4s_linear_infinite]"
                    style={{
                      strokeDasharray: '400',
                      strokeDashoffset: '400'
                    }}
                  />
                </svg>
                {/* CSS Inline necessário para animação keyframe do stroke */}
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEMBERSHIP: Contato & Começar */}
      <section className="py-24 max-w-6xl mx-auto px-6 w-full text-center relative overflow-hidden">
        <div className="glow-purple w-[400px] h-[400px] absolute -left-12 top-1/2 -translate-y-1/2 opacity-30 z-0 pointer-events-none" />
        <div className="glow-green w-[400px] h-[400px] absolute -right-12 top-1/2 -translate-y-1/2 opacity-20 z-0 pointer-events-none" />

        <div className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-surface to-primary border border-white/10 z-10">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">CONTATO DIRETO</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-marfim tracking-tight">
              Pronto para construir o seu <span className="text-accent">instrumento digital</span>?
            </h2>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="https://wa.me/5518988256932?text=Olá%20João%20Lucas,%20gostaria%20de%20conversar%20sobre%20um%20projeto!"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic bg-accent hover:bg-accentGreen text-white font-mono text-xs font-bold px-8 py-4 rounded-full transition-colors flex items-center gap-3 shadow-lg shadow-accent/25"
              >
                <span>Entre em Contato</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#projetos" 
                className="font-mono text-xs hover:text-accent border-b border-white/20 hover:border-accent pb-1 transition-all"
              >
                Ver Projetos Novamente
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary border-t border-white/5 pt-16 pb-12 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-xl text-accent">JOÃO LUCAS</span>
            </div>
            <p className="text-xs text-marfim/45 leading-relaxed font-light">
              Engenharia digital de alta fidelidade baseada no protocolo. Desenvolvendo produtos e experiências web cinematográficas.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold text-marfim uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2 text-xs text-marfim/50 font-light">
              <li><a href="#inicio" className="hover:text-accent transition-colors">Início</a></li>
              <li><a href="#features" className="hover:text-accent transition-colors">Recursos</a></li>
              <li><a href="#projetos" className="hover:text-accent transition-colors">Projetos</a></li>
              <li><a href="#filosofia" className="hover:text-accent transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold text-marfim uppercase tracking-wider mb-4">Metodologia</h4>
            <ul className="space-y-2 text-xs text-marfim/50 font-light">
              <li><a href="#protocolo" className="hover:text-accent transition-colors">Protocolo</a></li>
              <li><a href="#features" className="hover:text-accent transition-colors">Design 1:1 Pixel-Perfect</a></li>
              <li><a href="#projetos" className="hover:text-accent transition-colors">Simuladores Interativos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold text-marfim uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-2 text-xs text-marfim/50 font-light">
              <li><span className="text-marfim">Email:</span> Jolucascsouza@gmail.com</li>
              <li><span className="text-marfim">Local:</span> São Paulo, Brasil</li>
              <li><span className="text-marfim">Status:</span> Disponível para novos projetos</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-marfim/30">
          
          <div className="flex items-center gap-6">
            <span>© 2026 João Lucas. Todos os direitos reservados.</span>
            <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-accent transition-colors">Privacidade</a>
          </div>

          <div className="flex items-center gap-2 bg-[#0A0A0F] border border-white/5 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-accentGreen rounded-full animate-pulse" />
            <span className="text-marfim/70 tracking-wider">SYSTEM OPERATIONAL V1.0</span>
          </div>

        </div>
      </footer>

    </div>
  )
}
