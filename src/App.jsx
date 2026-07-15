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
import { LanguageProvider, useLanguage, languageMeta } from "./i18n";

/**
 * Revoluk Solution's — Institutional Landing Page
 * Design language: expo.dev inspired dark mode
 * Trilíngue (PT/EN/IT) com detecção automática por geolocalização (src/i18n.js)
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
// Seletor de idioma
// ---------------------------------------------------------------------------
function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();
  const codes = Object.keys(languageMeta);

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-zinc-800/70 bg-zinc-900/40 p-0.5 ${
        compact ? "" : ""
      }`}
    >
      {codes.map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={languageMeta[code].name}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            lang === code
              ? "bg-zinc-50 text-zinc-950"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          {languageMeta[code].label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.produtos, href: "#produtos" },
    { label: t.nav.servicos, href: "#servicos" },
    { label: t.nav.historia, href: "#historia" },
    { label: t.nav.contato, href: "#contato" },
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

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2 hover:bg-white transition-colors"
          >
            {t.nav.cta}
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
          <LanguageSwitcher />
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2.5 mt-1"
          >
            {t.nav.cta}
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
  const { t } = useLanguage();

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
        <Reveal delay={80}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-50 leading-[1.08]">
            {t.hero.title1}
            <br className="hidden sm:block" /> {t.hero.title2}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#produtos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-6 py-3 hover:bg-sky-300 hover:shadow-[0_0_24px_rgba(125,211,252,0.4)] transition-all"
            >
              {t.hero.btnPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#historia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 text-zinc-200 text-sm font-medium px-6 py-3 hover:border-zinc-500 hover:bg-zinc-900/40 transition-all"
            >
              {t.hero.btnSecondary}
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
  const { t } = useLanguage();
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
        {t.mosaic.logoTitle}
      </h3>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs">
        {t.mosaic.logoSubtitle}
      </p>

      <a
        href="#produtos"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-4 py-2 hover:bg-sky-300 transition-colors"
      >
        <Globe className="h-4 w-4" />
        {t.mosaic.logoLink}
      </a>
    </div>
  );
}

function MosaicDashboardCard() {
  const { t } = useLanguage();
  const bars = [40, 70, 55, 90, 65, 100, 75];
  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5 sm:p-6 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300">
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-sky-300" />
            {t.mosaic.dashboardLabel}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">
            {t.mosaic.dashboardBadge}
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
        <span className="text-zinc-200 font-medium">
          {t.mosaic.dashboardCaptionStrong}
        </span>
        {t.mosaic.dashboardCaption}
      </p>
    </div>
  );
}

function MosaicIconsCard() {
  const { t } = useLanguage();
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
        {t.mosaic.iconsTitle}
      </p>
      <p className="mt-1.5 text-xs text-zinc-500 text-center max-w-[220px]">
        {t.mosaic.iconsSubtitle}
      </p>
    </div>
  );
}

function MosaicBannerCard() {
  const { t } = useLanguage();
  return (
    <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-8 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 lg:col-span-2">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-orange-500/10 revoluk-shimmer" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-lg sm:text-xl font-medium text-zinc-50 text-center sm:text-left">
          {t.mosaic.bannerText}{" "}
          <span className="text-sky-300">{t.mosaic.bannerHighlight}</span>
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
  const { t } = useLanguage();
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
        {t.products.saibaMais}
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

function Produtos() {
  const { t } = useLanguage();
  return (
    <section id="produtos" className="px-5 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              {t.products.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              {t.products.title}
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal delay={0}>
            <ProductCard
              icon={Wallet}
              tag={t.products.card1.tag}
              title={t.products.card1.title}
              description={t.products.card1.description}
              accent="bg-sky-500/20"
            />
          </Reveal>
          <Reveal delay={80}>
            <ProductCard
              icon={Plane}
              tag={t.products.card2.tag}
              title={t.products.card2.title}
              description={t.products.card2.description}
              accent="bg-indigo-500/20"
            />
          </Reveal>
          <Reveal delay={160}>
            <ProductCard
              icon={MonitorSmartphone}
              tag={t.products.card3.tag}
              title={t.products.card3.title}
              description={t.products.card3.description}
              accent="bg-emerald-500/20"
            />
          </Reveal>
          <Reveal delay={240}>
            <ProductCard
              icon={Factory}
              tag={t.products.card4.tag}
              title={t.products.card4.title}
              description={t.products.card4.description}
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
  const { t } = useLanguage();
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
          {t.services.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Reveal>
  );
}

function Servicos() {
  const { t } = useLanguage();
  return (
    <section id="servicos" className="px-5 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              {t.services.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ServiceBlock
            icon={Code}
            eyebrow={t.services.block1.eyebrow}
            title={t.services.block1.title}
            description={t.services.block1.description}
            bullets={t.services.block1.bullets}
            accent="bg-sky-500/20"
            iconRing="border-sky-400/30"
            delay={0}
          />
          <ServiceBlock
            icon={Brain}
            eyebrow={t.services.block2.eyebrow}
            title={t.services.block2.title}
            description={t.services.block2.description}
            bullets={t.services.block2.bullets}
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
  const { t } = useLanguage();
  const milestones = t.history.milestones;

  return (
    <section id="historia" className="px-5 sm:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-sky-400/80 font-medium">
              {t.history.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              {t.history.title}
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
  const { t } = useLanguage();
  return (
    <section id="contato" className="px-5 sm:px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl border border-zinc-800/50 bg-zinc-900/30 px-6 sm:px-16 py-16 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[110px] rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto leading-relaxed">
              {t.contact.subtitle}
            </p>
            <a
              href="mailto:contato@revoluksolutions.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium px-6 py-3 hover:bg-sky-300 hover:shadow-[0_0_24px_rgba(125,211,252,0.4)] transition-all"
            >
              {t.contact.cta}
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
  const { t } = useLanguage();
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
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {t.footer.addr1}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {t.footer.addr2}
          </div>
        </div>

        <div className="text-xs text-zinc-600">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
function RevolukLandingPage() {
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

export default function App() {
  return (
    <LanguageProvider>
      <RevolukLandingPage />
    </LanguageProvider>
  );
}
