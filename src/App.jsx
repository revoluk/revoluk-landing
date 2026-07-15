import React, { useState, useEffect, useRef, useId } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Wallet,
  Plane,
  MonitorSmartphone,
  Factory,
  Code,
  Brain,
  MapPin,
  ChevronRight,
  Github,
  Globe,
  MessageSquare,
  LayoutGrid,
  BarChart3,
  Bot,
  Cpu,
} from "lucide-react";

/**
 * Revoluk Solution's — Institutional Landing Page
 * Design language: expo.dev inspired dark mode
 * Single-file, self-contained React component (Tailwind CSS + lucide-react)
 */

// ---------------------------------------------------------------------------
// Small reveal-on-scroll hook (keeps things dependency-free, no framer-motion
// required — pure CSS transitions triggered by IntersectionObserver).
// ---------------------------------------------------------------------------
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marca Revoluk — mark geométrica que representa a trajetória da empresa
// (degraus ascendentes = linha do tempo 2010→2022, Brasil→Itália) com um
// núcleo em destaque representando o carro-chefe atual: consultoria e IA.
// ---------------------------------------------------------------------------
function RevolukMark({ size = 28, glow = true }) {
  const gid = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Revoluk Solution's"
    >
      <defs>
        <linearGradient id={`${gid}-hex`} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id={`${gid}-path`} x1="14" y1="46" x2="50" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id={`${gid}-node`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </radialGradient>
      </defs>

      {/* contorno hexagonal — módulo/chip, representando tecnologia */}
      <path
        d="M32 5 L55 18.5 V45.5 L32 59 L9 45.5 V18.5 Z"
        stroke={`url(#${gid}-hex)`}
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
      />

      {/* degraus ascendentes — cronologia da empresa (2010 → 2022) */}
      <path
        d="M14 46 H26 V34 H38 V22 H47"
        stroke={`url(#${gid}-path)`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* marcos da linha do tempo */}
      <circle cx="14" cy="46" r="2.2" fill="#e2e8f0" opacity="0.85" />
      <circle cx="26" cy="34" r="2.2" fill="#e2e8f0" opacity="0.85" />
      <circle cx="38" cy="22" r="2.2" fill="#e2e8f0" opacity="0.85" />

      {/* nó de destaque — o carro-chefe atual: consultoria & IA */}
      {glow && (
        <circle cx="47" cy="22" r="7.5" fill={`url(#${gid}-node)`} opacity="0.25" />
      )}
      <circle cx="47" cy="22" r="4.2" fill={`url(#${gid}-node)`} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Produtos", href: "#produtos" },
    { label: "Serviços", href: "#servicos" },
    { label: "História", href: "#historia" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <RevolukMark size={30} />
          <span className="text-zinc-50 font-semibold tracking-tight text-[15px]">
            Revoluk
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2 hover:bg-white transition-colors"
          >
            Fale Conosco
          </a>
        </div>

        <button
          className="md:hidden text-zinc-300"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 px-5 pb-5 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2.5 mt-1"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section
      id="top"
      className="relative pt-40 pb-28 px-5 sm:px-8 overflow-hidden"
    >
      {/* subtle background glow, expo.dev style */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800/70 bg-zinc-900/40 px-3.5 py-1.5 text-xs text-zinc-400 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            Sede em Niterói, RJ &amp; Milão, IT
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-50 leading-[1.08]">
            A Revolução Inteligente
            <br className="hidden sm:block" /> para o seu Negócio.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Da gestão financeira autônoma à automação industrial no chão de
            fábrica. Soluções de software que transformam ideias em
            eficiência global.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#produtos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-6 py-3 hover:bg-sky-300 hover:shadow-[0_0_24px_rgba(125,211,252,0.4)] transition-all"
            >
              Explorar Soluções
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#historia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 text-zinc-200 text-sm font-medium px-6 py-3 hover:border-zinc-500 hover:bg-zinc-900/40 transition-all"
            >
              Nossa História
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Mosaico animado — bento inspirado no expo.dev
// ---------------------------------------------------------------------------
function MosaicoStyles() {
  return (
    <style>{`
      @keyframes revoluk-float {
        0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
        50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
      }
      @keyframes revoluk-spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes revoluk-pulse-glow {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 1; }
      }
      @keyframes revoluk-shimmer {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      @keyframes revoluk-bar {
        0%, 100% { transform: scaleY(0.4); }
        50% { transform: scaleY(1); }
      }
      .revoluk-float { animation: revoluk-float 5s ease-in-out infinite; }
      .revoluk-spin-slow { animation: revoluk-spin-slow 14s linear infinite; }
      .revoluk-pulse-glow { animation: revoluk-pulse-glow 3.2s ease-in-out infinite; }
      .revoluk-shimmer {
        background-size: 200% 100%;
        animation: revoluk-shimmer 6s linear infinite;
      }
      .revoluk-bar { animation: revoluk-bar 2.4s ease-in-out infinite; transform-origin: bottom; }
    `}</style>
  );
}

function MosaicLogoCard() {
  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 sm:p-10 flex flex-col items-center justify-center text-center overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 lg:row-span-2">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 bg-sky-500/10 blur-[90px] rounded-full revoluk-pulse-glow" />

      <div className="relative h-20 w-20 sm:h-24 sm:w-24 mb-6">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-400 to-sky-300 blur-xl opacity-30 group-hover:opacity-50 transition-opacity revoluk-float" />
        <div className="relative h-full w-full rounded-2xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-center shadow-[0_0_40px_rgba(125,211,252,0.2)] revoluk-float">
          <RevolukMark size={52} />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight">
        O Ecossistema Revoluk
      </h3>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs">
        15+ anos evoluindo. Impulsionando negócios em 2 continentes.
      </p>

      <a
        href="#produtos"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2 hover:bg-sky-300 transition-colors"
      >
        <Globe className="h-4 w-4" />
        revoluksolutions.com
      </a>
    </div>
  );
}

function MosaicDashboardCard() {
  const bars = [40, 70, 55, 90, 65, 100, 75];
  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5 sm:p-6 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300">
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-sky-300" />
            Orizon · Previsibilidade
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">
            +18,4%
          </span>
        </div>
        <div className="flex items-end gap-2 h-20">
          {bars.map((h, i) => (
            <div
              key={i}
              className="revoluk-bar flex-1 rounded-t-sm bg-gradient-to-t from-sky-500/70 to-indigo-400/70"
              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[LayoutGrid, Globe, MessageSquare].map((Icon, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800/60 bg-zinc-950/50 py-2.5 flex items-center justify-center text-zinc-400"
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
        <span className="text-zinc-200 font-medium">100% dos processos</span>{" "}
        de gestão financeira e roteirização em um único painel.
      </p>
    </div>
  );
}

function MosaicIconsCard() {
  const icons = [
    { Icon: Wallet, color: "from-sky-400 to-sky-600", r: "-10deg" },
    { Icon: Plane, color: "from-indigo-400 to-indigo-600", r: "6deg" },
    { Icon: MonitorSmartphone, color: "from-emerald-400 to-emerald-600", r: "-4deg" },
    { Icon: Factory, color: "from-orange-400 to-orange-600", r: "12deg" },
  ];

  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-8 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center gap-3 sm:gap-4 mb-6">
        {icons.map(({ Icon, color, r }, i) => (
          <div
            key={i}
            className={`revoluk-float h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
            style={{
              "--r": r,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${r})`,
            }}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.75} />
          </div>
        ))}
      </div>
      <p className="text-sm font-medium text-zinc-50 text-center">
        Todo produto nativo, sem gambiarra
      </p>
      <p className="mt-1.5 text-xs text-zinc-500 text-center max-w-[220px]">
        Finanças, viagens, autoatendimento e chão de fábrica, sob a mesma
        arquitetura.
      </p>
    </div>
  );
}

function MosaicBannerCard() {
  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-8 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 lg:col-span-2">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-orange-500/10 revoluk-shimmer" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-lg sm:text-xl font-medium text-zinc-50 text-center sm:text-left">
          Impulsionando negócios com{" "}
          <span className="text-sky-300">automação inteligente</span>
        </p>

        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center rotate-[-6deg] revoluk-float">
            <Bot className="h-6 w-6 text-sky-300" strokeWidth={1.75} />
          </div>
          <div className="h-14 w-14 rounded-2xl bg-zinc-950 border border-sky-400/30 flex items-center justify-center rotate-[6deg] shadow-[0_0_20px_rgba(56,189,248,0.25)] revoluk-float" style={{ animationDelay: "0.4s" }}>
            <Cpu className="h-6 w-6 text-white" strokeWidth={1.75} />
          </div>
          <div className="h-14 w-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center rotate-[4deg] revoluk-float" style={{ animationDelay: "0.8s" }}>
            <Github className="h-6 w-6 text-zinc-300" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Mosaico() {
  return (
    <section className="px-5 sm:px-8 py-6">
      <MosaicoStyles />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Reveal delay={0} className="lg:row-span-2">
            <MosaicLogoCard />
          </Reveal>
          <Reveal delay={80}>
            <MosaicDashboardCard />
          </Reveal>
          <Reveal delay={160}>
            <MosaicIconsCard />
          </Reveal>
          <Reveal delay={240} className="lg:col-span-2">
            <MosaicBannerCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Produtos — Bento Grid
// ---------------------------------------------------------------------------
function ProductCard({ icon: Icon, title, tag, description, className = "", accent }) {
  return (
    <div
      className={`group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 ${className}`}
    >
      <div
        className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accent}`}
      />
      <div className="relative flex items-start justify-between">
        <div className="h-10 w-10 rounded-lg bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center group-hover:border-sky-400/40 transition-colors">
          <Icon className="h-5 w-5 text-zinc-200" strokeWidth={1.75} />
        </div>
        {tag && (
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded-full px-2 py-1">
            {tag}
          </span>
        )}
      </div>
      <h3 className="relative mt-5 text-lg font-medium text-zinc-50">
        {title}
      </h3>
      <p className="relative mt-2 text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>
      <div className="relative mt-5 flex items-center gap-1 text-sm text-zinc-500 group-hover:text-sky-300 transition-colors">
        Saiba mais
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

function Produtos() {
  return (
    <section id="produtos" className="px-5 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              Plataformas SaaS
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              Produtos que movem negócios
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Um portfólio de plataformas prontas para escalar operações
              financeiras, comerciais e industriais em qualquer lugar do
              mundo.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal delay={0}>
            <ProductCard
              icon={Wallet}
              tag="Finanças"
              title="Revoluk Orizon"
              description="Um dos melhores aplicativos de gestão financeira do mundo, com foco em previsibilidade e controle total do seu fluxo de caixa."
              accent="bg-sky-500/20"
            />
          </Reveal>
          <Reveal delay={80}>
            <ProductCard
              icon={Plane}
              tag="Viagens · IA"
              title="Orizon Trips"
              description="Plataforma de roteiros de viagem com agentes de IA que projetam experiências globais de forma eficiente e personalizada."
              accent="bg-indigo-500/20"
            />
          </Reveal>
          <Reveal delay={160}>
            <ProductCard
              icon={MonitorSmartphone}
              tag="White-label"
              title="Revoluk MyKiosk"
              description="Plataforma white-label para empresas criarem seus próprios sistemas robustos de autoatendimento e suporte ao cliente."
              accent="bg-emerald-500/20"
            />
          </Reveal>
          <Reveal delay={240}>
            <ProductCard
              icon={Factory}
              tag="Indústria 4.0"
              title="Revoluk MES"
              description="Software completo de gestão de fábrica. Baixo custo de implementação, mitigação de falhas em sistemas automatizados de logística e etiquetagem, foco total na produção."
              accent="bg-orange-500/20"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Serviços — Consultoria Tech & IA (carro-chefe)
// ---------------------------------------------------------------------------
function ServiceBlock({
  icon: Icon,
  eyebrow,
  title,
  description,
  bullets,
  accent,
  iconRing,
  delay,
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative h-full rounded-3xl border border-zinc-800/50 bg-zinc-900/30 p-8 sm:p-10 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col">
        <div
          className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accent}`}
        />

        <div className="relative flex items-center gap-3.5">
          <div
            className={`h-12 w-12 rounded-xl bg-zinc-950/60 border ${iconRing} flex items-center justify-center`}
          >
            <Icon className="h-6 w-6 text-zinc-50" strokeWidth={1.6} />
          </div>
          <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
            {eyebrow}
          </span>
        </div>

        <h3 className="relative mt-6 text-2xl sm:text-[26px] font-semibold text-zinc-50 tracking-tight leading-snug">
          {title}
        </h3>

        <p className="relative mt-4 text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
          {description}
        </p>

        <ul className="relative mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-400">
              <ChevronRight className="h-4 w-4 mt-0.5 text-sky-400 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="relative mt-auto pt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-50 group-hover:text-sky-300 transition-colors"
        >
          Conversar com um especialista
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Reveal>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="px-5 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              Nosso Carro-Chefe
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              Serviços &amp; Consultoria
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Hoje, o coração da Revoluk é a consultoria tech de ponta a
              ponta — do software sob medida à implementação real de
              Inteligência Artificial no dia a dia da sua operação.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ServiceBlock
            icon={Code}
            eyebrow="Desenvolvimento Sob Medida"
            title="Você traz a necessidade, a Revoluk transforma suas ideias em realidade."
            description="Consultoria e criação de aplicativos mobile e softwares web com foco absoluto em eficiência e produtividade."
            bullets={[
              "Apps mobile iOS e Android nativos ou híbridos",
              "Plataformas web e sistemas internos sob medida",
              "Do discovery ao deploy, com o seu time",
            ]}
            accent="bg-sky-500/20"
            iconRing="border-sky-400/30"
            delay={0}
          />
          <ServiceBlock
            icon={Brain}
            eyebrow="Consultoria e Implementação de IA"
            title="Transformamos o potencial da Inteligência Artificial em resultados tangíveis."
            description="Integração de agentes autônomos e soluções baseadas em IA sob medida para otimizar fluxos de trabalho gerenciais, financeiros e operacionais."
            bullets={[
              "Agentes de IA autônomos aplicados ao seu processo",
              "Automação de fluxos gerenciais e financeiros",
              "Integração com os sistemas que você já usa",
            ]}
            accent="bg-indigo-500/20"
            iconRing="border-indigo-400/30"
            delay={100}
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// História — timeline
// ---------------------------------------------------------------------------
function Historia() {
  const milestones = [
    {
      year: "2010",
      title: "Nascimento",
      description:
        "A Revoluk nasce entregando consultoria empresarial inteligente e soluções importadas de todos os cantos do planeta.",
    },
    {
      year: "2013",
      title: "Gestão empresarial",
      description:
        "Início da implementação de softwares de gestão (ERPs), ganhando notoriedade pelo formato simples e objetivo de implantação.",
    },
    {
      year: "2015",
      title: "Mobile first",
      description:
        "Início do desenvolvimento de apps mobile, entregando personalização e fidelização de clientes a negócios em todo o Brasil.",
    },
    {
      year: "2018",
      title: "Sede em Niterói",
      description:
        "Sede transferida para Niterói (RJ). Início de grandes parcerias para remodernização informática e automação comercial e industrial.",
    },
    {
      year: "2022",
      title: "O grande passo",
      description:
        "Sede em Milão, Itália, consolidando-se como referência europeia em automação industrial e processos gerenciais.",
    },
  ];

  return (
    <section id="historia" className="px-5 sm:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              Nossa Jornada
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              Nossa História
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-800 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 90}>
                <div
                  className={`relative flex items-start sm:items-center gap-6 sm:gap-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <span className="absolute left-0 sm:left-1/2 top-1.5 sm:top-1/2 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] sm:-translate-x-1/2 sm:-translate-y-1/2 ring-4 ring-zinc-950" />

                  <div
                    className={`pl-10 sm:pl-0 sm:w-1/2 ${
                      i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                    }`}
                  >
                    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all">
                      <span className="text-sm font-mono text-sky-300">
                        {m.year}
                      </span>
                      <h4 className="mt-1 text-base font-medium text-zinc-50">
                        {m.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA / Contato
// ---------------------------------------------------------------------------
function Contato() {
  return (
    <section id="contato" className="px-5 sm:px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl border border-zinc-800/50 bg-zinc-900/30 px-6 sm:px-16 py-16 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[110px] rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              Pronto para revolucionar sua operação?
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Fale com nosso time e descubra qual solução Revoluk se encaixa
              no seu negócio.
            </p>
            <a
              href="mailto:contato@revoluksolutions.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-6 py-3 hover:bg-sky-300 hover:shadow-[0_0_24px_rgba(125,211,252,0.4)] transition-all"
            >
              Fale Conosco
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 px-5 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <RevolukMark size={24} glow={false} />
            <span className="text-zinc-50 font-semibold text-sm">
              Revoluk Solution's
            </span>
          </div>
          <p className="mt-3 text-xs text-zinc-500 max-w-xs leading-relaxed">
            Holding de soluções em software, automação e consultoria
            empresarial. Da gestão financeira à automação industrial.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            Milão, Itália — Sede Global
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            Niterói, RJ — Brasil
          </div>
        </div>

        <div className="text-xs text-zinc-600">
          © 2026 Revoluk Solution's. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function RevolukLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 antialiased selection:bg-sky-400/20 selection:text-sky-100">
      <Header />
      <main>
        <Hero />
        <Mosaico />
        <Produtos />
        <Servicos />
        <Historia />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
