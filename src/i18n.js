import { createContext, useContext, useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Dicionário de traduções — Português, Inglês, Italiano
// ---------------------------------------------------------------------------
export const translations = {
  pt: {
    nav: {
      produtos: "Produtos",
      servicos: "Serviços",
      historia: "História",
      contato: "Contato",
      cta: "Fale Conosco",
    },
    hero: {
      badge: "Sede em Niterói, RJ & Milão, IT",
      title1: "A Revolução Inteligente",
      title2: "para o seu Negócio.",
      subtitle:
        "Da gestão financeira autônoma à automação industrial no chão de fábrica. Soluções de software que transformam ideias em eficiência global.",
      btnPrimary: "Explorar Soluções",
      btnSecondary: "Nossa História",
    },
    mosaic: {
      logoTitle: "O Ecossistema Revoluk",
      logoSubtitle:
        "15+ anos evoluindo. Impulsionando negócios em 2 continentes.",
      logoLink: "revoluksolutions.com",
      dashboardLabel: "Orizon · Previsibilidade",
      dashboardBadge: "+18,4%",
      dashboardCaptionStrong: "100% dos processos",
      dashboardCaption:
        " de gestão financeira e roteirização em um único painel.",
      iconsTitle: "Todo produto nativo, sem gambiarra",
      iconsSubtitle:
        "Finanças, viagens, autoatendimento e chão de fábrica, sob a mesma arquitetura.",
      bannerText: "Impulsionando negócios com",
      bannerHighlight: "automação inteligente",
    },
    products: {
      eyebrow: "Plataformas SaaS",
      title: "Produtos que movem negócios",
      subtitle:
        "Um portfólio de plataformas prontas para escalar operações financeiras, comerciais e industriais em qualquer lugar do mundo.",
      saibaMais: "Saiba mais",
      card1: {
        tag: "Finanças",
        title: "Revoluk Orizon",
        description:
          "Um dos melhores aplicativos de gestão financeira do mundo, com foco em previsibilidade e controle total do seu fluxo de caixa.",
      },
      card2: {
        tag: "Viagens · IA",
        title: "Orizon Trips",
        description:
          "Plataforma de roteiros de viagem com agentes de IA que projetam experiências globais de forma eficiente e personalizada.",
      },
      card3: {
        tag: "White-label",
        title: "Revoluk MyKiosk",
        description:
          "Plataforma white-label para empresas criarem seus próprios sistemas robustos de autoatendimento e suporte ao cliente.",
      },
      card4: {
        tag: "Indústria 4.0",
        title: "Revoluk MES",
        description:
          "Software completo de gestão de fábrica. Baixo custo de implementação, mitigação de falhas em sistemas automatizados de logística e etiquetagem, foco total na produção.",
      },
    },
    services: {
      eyebrow: "Nosso Carro-Chefe",
      title: "Serviços & Consultoria",
      subtitle:
        "Hoje, o coração da Revoluk é a consultoria tech de ponta a ponta — do software sob medida à implementação real de Inteligência Artificial no dia a dia da sua operação.",
      cta: "Conversar com um especialista",
      block1: {
        eyebrow: "Desenvolvimento Sob Medida",
        title:
          "Você traz a necessidade, a Revoluk transforma suas ideias em realidade.",
        description:
          "Consultoria e criação de aplicativos mobile e softwares web com foco absoluto em eficiência e produtividade.",
        bullets: [
          "Apps mobile iOS e Android nativos ou híbridos",
          "Plataformas web e sistemas internos sob medida",
          "Do discovery ao deploy, com o seu time",
        ],
      },
      block2: {
        eyebrow: "Consultoria e Implementação de IA",
        title:
          "Transformamos o potencial da Inteligência Artificial em resultados tangíveis.",
        description:
          "Integração de agentes autônomos e soluções baseadas em IA sob medida para otimizar fluxos de trabalho gerenciais, financeiros e operacionais.",
        bullets: [
          "Agentes de IA autônomos aplicados ao seu processo",
          "Automação de fluxos gerenciais e financeiros",
          "Integração com os sistemas que você já usa",
        ],
      },
    },
    history: {
      eyebrow: "Nossa Jornada",
      title: "Nossa História",
      milestones: [
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
      ],
    },
    contact: {
      title: "Pronto para revolucionar sua operação?",
      subtitle:
        "Fale com nosso time e descubra qual solução Revoluk se encaixa no seu negócio.",
      cta: "Fale Conosco",
    },
    footer: {
      tagline:
        "Holding de soluções em software, automação e consultoria empresarial. Da gestão financeira à automação industrial.",
      addr1: "Milão, Itália — Sede Global",
      addr2: "Niterói, RJ — Brasil",
      copyright: "© 2026 Revoluk Solution's. Todos os direitos reservados.",
    },
  },

  en: {
    nav: {
      produtos: "Products",
      servicos: "Services",
      historia: "History",
      contato: "Contact",
      cta: "Get in Touch",
    },
    hero: {
      badge: "Headquartered in Niterói, Brazil & Milan, Italy",
      title1: "The Intelligent Revolution",
      title2: "for your Business.",
      subtitle:
        "From autonomous financial management to industrial automation on the factory floor. Software solutions that turn ideas into global efficiency.",
      btnPrimary: "Explore Solutions",
      btnSecondary: "Our Story",
    },
    mosaic: {
      logoTitle: "The Revoluk Ecosystem",
      logoSubtitle: "15+ years evolving. Powering businesses on 2 continents.",
      logoLink: "revoluksolutions.com",
      dashboardLabel: "Orizon · Predictability",
      dashboardBadge: "+18.4%",
      dashboardCaptionStrong: "100% of your",
      dashboardCaption:
        " financial management and trip planning processes in a single dashboard.",
      iconsTitle: "Every product native, no shortcuts",
      iconsSubtitle:
        "Finance, travel, self-service and shop floor, all on the same architecture.",
      bannerText: "Powering businesses with",
      bannerHighlight: "intelligent automation",
    },
    products: {
      eyebrow: "SaaS Platforms",
      title: "Products that move businesses",
      subtitle:
        "A portfolio of platforms ready to scale financial, commercial and industrial operations anywhere in the world.",
      saibaMais: "Learn more",
      card1: {
        tag: "Finance",
        title: "Revoluk Orizon",
        description:
          "One of the best financial management apps in the world, focused on predictability and total control over your cash flow.",
      },
      card2: {
        tag: "Travel · AI",
        title: "Orizon Trips",
        description:
          "A travel itinerary platform powered by AI agents that design global experiences efficiently and with a personal touch.",
      },
      card3: {
        tag: "White-label",
        title: "Revoluk MyKiosk",
        description:
          "A white-label platform for companies to build their own robust self-service and support kiosk systems.",
      },
      card4: {
        tag: "Industry 4.0",
        title: "Revoluk MES",
        description:
          "A complete factory management software. Low implementation cost, mitigates failures in automated logistics and labeling systems, and keeps the full focus on production.",
      },
    },
    services: {
      eyebrow: "Our Flagship",
      title: "Services & Consulting",
      subtitle:
        "Today, the heart of Revoluk is end-to-end tech consulting — from bespoke software to real-world AI implementation in your day-to-day operations.",
      cta: "Talk to a specialist",
      block1: {
        eyebrow: "Custom Development",
        title:
          "You bring the need, Revoluk turns your ideas into reality.",
        description:
          "Consulting and development of mobile apps and web software with an absolute focus on efficiency and productivity.",
        bullets: [
          "Native or hybrid iOS and Android mobile apps",
          "Custom web platforms and internal systems",
          "From discovery to deployment, alongside your team",
        ],
      },
      block2: {
        eyebrow: "AI Consulting & Implementation",
        title:
          "We turn the potential of Artificial Intelligence into tangible results.",
        description:
          "Integration of autonomous agents and tailored AI-based solutions to optimize managerial, financial and operational workflows.",
        bullets: [
          "Autonomous AI agents applied to your process",
          "Automation of managerial and financial workflows",
          "Integration with the systems you already use",
        ],
      },
    },
    history: {
      eyebrow: "Our Journey",
      title: "Our Story",
      milestones: [
        {
          year: "2010",
          title: "Founding",
          description:
            "Revoluk is born delivering smart business consulting and solutions sourced from every corner of the planet.",
        },
        {
          year: "2013",
          title: "Business Management",
          description:
            "Rollout of business management software (ERPs) begins, earning recognition for its simple, no-nonsense implementation.",
        },
        {
          year: "2015",
          title: "Mobile First",
          description:
            "Mobile app development begins, delivering personalization and customer loyalty to businesses across Brazil.",
        },
        {
          year: "2018",
          title: "HQ in Niterói",
          description:
            "Headquarters moves to Niterói, Brazil. Major partnerships begin for IT modernization and commercial and industrial automation.",
        },
        {
          year: "2022",
          title: "The Big Leap",
          description:
            "Headquartered in Milan, Italy, quickly becoming a European reference in industrial automation and management processes.",
        },
      ],
    },
    contact: {
      title: "Ready to revolutionize your operation?",
      subtitle:
        "Talk to our team and discover which Revoluk solution fits your business.",
      cta: "Get in Touch",
    },
    footer: {
      tagline:
        "A holding company for software, automation and business consulting solutions. From financial management to industrial automation.",
      addr1: "Milan, Italy — Global HQ",
      addr2: "Niterói, Brazil",
      copyright: "© 2026 Revoluk Solution's. All rights reserved.",
    },
  },

  it: {
    nav: {
      produtos: "Prodotti",
      servicos: "Servizi",
      historia: "Storia",
      contato: "Contatti",
      cta: "Contattaci",
    },
    hero: {
      badge: "Sede a Niterói, Brasile & Milano, Italia",
      title1: "La Rivoluzione Intelligente",
      title2: "per la tua Azienda.",
      subtitle:
        "Dalla gestione finanziaria autonoma all'automazione industriale in fabbrica. Soluzioni software che trasformano le idee in efficienza globale.",
      btnPrimary: "Scopri le Soluzioni",
      btnSecondary: "La Nostra Storia",
    },
    mosaic: {
      logoTitle: "L'Ecosistema Revoluk",
      logoSubtitle:
        "15+ anni di evoluzione. Al servizio di aziende in 2 continenti.",
      logoLink: "revoluksolutions.com",
      dashboardLabel: "Orizon · Prevedibilità",
      dashboardBadge: "+18,4%",
      dashboardCaptionStrong: "Il 100% dei processi",
      dashboardCaption:
        " di gestione finanziaria e pianificazione viaggi in un'unica dashboard.",
      iconsTitle: "Ogni prodotto nativo, senza compromessi",
      iconsSubtitle:
        "Finanza, viaggi, self-service e produzione, sotto la stessa architettura.",
      bannerText: "Al servizio delle aziende con",
      bannerHighlight: "automazione intelligente",
    },
    products: {
      eyebrow: "Piattaforme SaaS",
      title: "Prodotti che fanno muovere le aziende",
      subtitle:
        "Un portfolio di piattaforme pronte a scalare le operazioni finanziarie, commerciali e industriali in qualsiasi parte del mondo.",
      saibaMais: "Scopri di più",
      card1: {
        tag: "Finanza",
        title: "Revoluk Orizon",
        description:
          "Una delle migliori app di gestione finanziaria al mondo, focalizzata sulla prevedibilità e sul controllo totale del flusso di cassa.",
      },
      card2: {
        tag: "Viaggi · IA",
        title: "Orizon Trips",
        description:
          "Piattaforma di itinerari di viaggio con agenti IA che progettano esperienze globali in modo efficiente e personalizzato.",
      },
      card3: {
        tag: "White-label",
        title: "Revoluk MyKiosk",
        description:
          "Piattaforma white-label che permette alle aziende di creare i propri sistemi robusti di self-service e assistenza clienti.",
      },
      card4: {
        tag: "Industria 4.0",
        title: "Revoluk MES",
        description:
          "Software completo di gestione della fabbrica. Basso costo di implementazione, mitigazione dei guasti nei sistemi automatizzati di logistica ed etichettatura, focus totale sulla produzione.",
      },
    },
    services: {
      eyebrow: "Il Nostro Core Business",
      title: "Servizi & Consulenza",
      subtitle:
        "Oggi, il cuore di Revoluk è la consulenza tech end-to-end — dal software su misura all'implementazione concreta dell'Intelligenza Artificiale nella gestione quotidiana della tua attività.",
      cta: "Parla con uno specialista",
      block1: {
        eyebrow: "Sviluppo su Misura",
        title:
          "Tu porti l'esigenza, Revoluk trasforma le tue idee in realtà.",
        description:
          "Consulenza e sviluppo di app mobile e software web con un focus assoluto su efficienza e produttività.",
        bullets: [
          "App mobile native o ibride per iOS e Android",
          "Piattaforme web e sistemi interni su misura",
          "Dalla discovery al deploy, insieme al tuo team",
        ],
      },
      block2: {
        eyebrow: "Consulenza e Implementazione IA",
        title:
          "Trasformiamo il potenziale dell'Intelligenza Artificiale in risultati concreti.",
        description:
          "Integrazione di agenti autonomi e soluzioni basate su IA su misura per ottimizzare i flussi di lavoro gestionali, finanziari e operativi.",
        bullets: [
          "Agenti IA autonomi applicati al tuo processo",
          "Automazione dei flussi gestionali e finanziari",
          "Integrazione con i sistemi che già utilizzi",
        ],
      },
    },
    history: {
      eyebrow: "Il Nostro Percorso",
      title: "La Nostra Storia",
      milestones: [
        {
          year: "2010",
          title: "Nascita",
          description:
            "Revoluk nasce offrendo consulenza aziendale intelligente e soluzioni importate da ogni angolo del pianeta.",
        },
        {
          year: "2013",
          title: "Gestione aziendale",
          description:
            "Inizia l'implementazione di software gestionali (ERP), guadagnando notorietà per il formato semplice e diretto di implementazione.",
        },
        {
          year: "2015",
          title: "Mobile first",
          description:
            "Inizia lo sviluppo di app mobile, offrendo personalizzazione e fidelizzazione dei clienti alle aziende in tutto il Brasile.",
        },
        {
          year: "2018",
          title: "Sede a Niterói",
          description:
            "La sede si trasferisce a Niterói (RJ). Iniziano grandi partnership per la remodernizzazione informatica e l'automazione commerciale e industriale.",
        },
        {
          year: "2022",
          title: "Il grande passo",
          description:
            "Sede a Milano, Italia, affermandosi rapidamente come punto di riferimento europeo nell'automazione industriale e nei processi gestionali.",
        },
      ],
    },
    contact: {
      title: "Pronto a rivoluzionare la tua attività?",
      subtitle:
        "Parla con il nostro team e scopri quale soluzione Revoluk è adatta alla tua azienda.",
      cta: "Contattaci",
    },
    footer: {
      tagline:
        "Holding di soluzioni software, automazione e consulenza aziendale. Dalla gestione finanziaria all'automazione industriale.",
      addr1: "Milano, Italia — Sede Globale",
      addr2: "Niterói, Brasile",
      copyright: "© 2026 Revoluk Solution's. Tutti i diritti riservati.",
    },
  },
};

export const languageMeta = {
  pt: { label: "PT", name: "Português" },
  en: { label: "EN", name: "English" },
  it: { label: "IT", name: "Italiano" },
};

// ---------------------------------------------------------------------------
// Mapeamento de países -> idioma
// ---------------------------------------------------------------------------
const COUNTRY_TO_LANG = {
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  IT: "it",
  SM: "it",
  VA: "it",
};

const STORAGE_KEY = "revoluk-lang";

function detectFromNavigator() {
  const nav = typeof navigator !== "undefined" ? navigator.language : "en";
  const code = (nav || "en").slice(0, 2).toLowerCase();
  if (code === "pt") return "pt";
  if (code === "it") return "it";
  return "en";
}

async function detectFromGeolocation() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error("geo lookup failed");
    const data = await res.json();
    const country = data && data.country_code;
    if (country && COUNTRY_TO_LANG[country]) {
      return COUNTRY_TO_LANG[country];
    }
    return detectFromNavigator();
  } catch (err) {
    return detectFromNavigator();
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "pt";
    return window.localStorage.getItem(STORAGE_KEY) || "pt";
  });
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) return; // usuário já escolheu manualmente antes

    setDetecting(true);
    detectFromGeolocation().then((detected) => {
      setLangState(detected);
      setDetecting(false);
    });
  }, []);

  const setLang = (next) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const t = translations[lang] || translations.pt;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, detecting }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
