import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faGears,
  faHelmetSafety,
  faLocationDot,
  faMotorcycle,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { BIKES, BRANDS, CATEGORIES, PARTS, TLD } from "../data";
import SmartImage from "../components/SmartImage";
import { Section } from "../components/Layout";
import { BikeCard, PartCard } from "../components/Cards";
import { AccessoryBrandQuickLinks } from "../components/AccessoryBrands";
import NewArrivals from "../components/NewArrivals";
import ShercoBanner from "../components/ShercoBanner";

const FEATURED = [
  {
    id: "sherco-sef-250-factory-2026",
    short: "SEF 250 Factory",
    brand: "Sherco",
    tag: "Enduro / Factory",
    image: "https://funbike.mg/wp-content/uploads/2026/02/01-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
    alt: "Sherco SEF 250 Factory 2026 en action",
  },
  {
    id: "sherco-sef-300-factory-2026",
    short: "SEF 300 Factory",
    brand: "Sherco",
    tag: "Enduro / Factory",
    image: "https://funbike.mg/wp-content/uploads/2026/02/01-300-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
    alt: "Sherco SEF 300 Factory 2026 en action",
  },
  {
    id: "xx-125-2026",
    short: "XX 125 Off-Road",
    brand: "Fantic",
    tag: "Cross / 125 cc",
    image: "https://funbike.mg/wp-content/uploads/2026/02/7b566adac57a4b5dbfd74d4f768e6fdb.jpg",
    alt: "Fantic XX 125 2026 sur piste",
  },
];

const CATEGORY_ICONS = [faMotorcycle, faHelmetSafety, faGears, faShirt];

export default function Home({ go }: { go: (p: string, id?: string) => void }) {
  const [activeHero, setActiveHero] = useState(0);
  const current = FEATURED[activeHero];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((index) => (index + 1) % FEATURED.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden bg-white text-[#171816] dark:bg-[#141513] dark:text-[#f2f0ea]">
      {/* Full-bleed photo, original brand mark and a single frosted-glass plane */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#22231f] sm:min-h-[720px] lg:min-h-[min(820px,calc(100svh-68px))]">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.alt}
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.7 }, scale: { duration: 7, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover object-[61%_center]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/52 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
        <div className="hero-glass-sheet" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-between px-5 pb-6 pt-10 sm:min-h-[720px] sm:px-7 sm:pb-9 sm:pt-16 lg:min-h-[min(820px,calc(100svh-68px))] lg:px-10 lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full max-w-[820px]"
          >
            <p className="fluid-eyebrow flex items-center gap-2 font-bold uppercase leading-snug text-white/75">
              <FontAwesomeIcon icon={faLocationDot} className="shrink-0 text-[#ffd100]" />
              <span>Madagascar / Motos, équipement, liberté</span>
            </p>
            <h1 className="fluid-hero mt-4 max-w-xl text-balance font-display font-semibold text-white sm:mt-7">
              Le terrain est
              <br className="hidden sm:inline" /> votre point de départ.
            </h1>
            <p className="fluid-body mt-3.5 max-w-md text-pretty text-white/80 sm:mt-4">
              Sherco, Fantic et TVS. Des motos faites pour aller plus loin, des pièces et de l'équipement pour suivre.
            </p>

            {/* Mobile: full-width stacked buttons with 48px touch targets */}
            <div className="mt-6 grid w-full grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
              <button
                onClick={() => go("catalogue")}
                className="fluid-btn inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#ffd100] px-5 py-3 text-center font-bold uppercase text-[#171816] transition active:scale-[0.98] hover:bg-white sm:min-h-11 sm:w-auto"
              >
                Explorer le catalogue <FontAwesomeIcon icon={faArrowRight} className="shrink-0" />
              </button>
              <button
                onClick={() => go("product", current.id)}
                className="glass-panel fluid-btn inline-flex min-h-12 w-full items-center justify-center gap-3 border-white/40 bg-white/10 px-5 py-3 text-center font-bold uppercase text-white transition active:scale-[0.98] hover:border-[#ffd100] hover:text-[#ffd100] sm:min-h-11 sm:w-auto"
              >
                <span className="truncate">{current.short}</span>
                <FontAwesomeIcon icon={faArrowRight} className="shrink-0" />
              </button>
            </div>
          </motion.div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/30 pt-3.5 sm:mt-0 sm:items-end sm:gap-4 sm:pt-5">
            <div className="min-w-0 text-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id + "caption"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#ffd100]">À la une / {current.brand}</p>
                  <p className="mt-0.5 truncate font-display text-sm font-semibold sm:mt-1 sm:text-base">
                    {current.short} · 2026
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <span className="font-display text-[11px] font-semibold text-white/70 sm:mr-1 sm:text-xs">
                0{activeHero + 1}
              </span>
              <div className="flex items-center" aria-label="Choisir le modèle mis en avant">
                {FEATURED.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHero(index)}
                    aria-label={`Afficher ${item.short}`}
                    aria-pressed={activeHero === index}
                    className="group grid h-11 w-8 place-items-center px-1.5 sm:h-9"
                  >
                    <span className="block h-[3px] w-full bg-white/45 transition-all group-aria-pressed:bg-[#ffd100]" />
                  </button>
                ))}
              </div>
              <span className="font-display text-[11px] font-semibold text-white/50 sm:text-xs">03</span>
            </div>
          </div>
        </div>
      </section>

      <NewArrivals go={go} />

      {/* Category index: compact links instead of large category tiles */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="grid gap-5 border-t border-black/15 pt-4 dark:border-white/15 sm:grid-cols-[0.75fr_1.25fr] sm:gap-8">
          <div>
            <p className="fluid-eyebrow mb-2 font-bold uppercase text-[#98741b] dark:text-[#ffd100]">
              Choisir son univers
            </p>
            <h2 className="fluid-h2 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
              Pas de mauvaise direction.
            </h2>
          </div>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category.title}
                onClick={() => go(category.to, category.brand)}
                whileHover={{ x: 4 }}
                className="group flex min-h-14 items-center gap-3 border-b border-black/10 px-2 py-3 text-left transition hover:bg-white/65 hover:backdrop-blur-xl dark:border-white/15 dark:hover:bg-white/[0.035]"
              >
                <span className="w-7 font-display text-[10px] text-black/40 dark:text-white/40">0{index + 1}</span>
                <SmartImage src={category.src} alt="" className="h-10 w-12 shrink-0 bg-white/80 dark:bg-white/10" imgClassName="object-contain p-0.5" />
                <FontAwesomeIcon icon={CATEGORY_ICONS[index]} className="w-4 text-[12px] text-[#98741b] dark:text-[#ffd100]" />
                <span className="flex-1 font-display text-sm font-semibold text-[#171816] dark:text-[#f2f0ea]">{category.title}</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-black/40 transition group-hover:translate-x-1 group-hover:text-[#98741b] dark:text-white/40 dark:group-hover:text-[#ffd100]" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ShercoBanner go={go} />

      <Section
        title="À chaque terrain, sa machine."
        subtitle="Une sélection de modèles disponibles chez Funbike."
        number="01 / Motos"
      >
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {FEATURED.map((featured) => {
            const model = BIKES.find((item) => item.id === featured.id);
            return model ? <BikeCard key={model.id} bike={model} go={go} /> : null;
          })}
        </div>
        <button
          onClick={() => go("motos")}
          className="mt-8 inline-flex items-center gap-2 border-b border-[#171816] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171816] transition hover:border-[#98741b] hover:text-[#98741b] dark:border-[#f2f0ea] dark:text-[#f2f0ea] dark:hover:text-[#ffd100]"
        >
          Toutes les motos <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Section>

      <section className="border-y border-[#e8d574]/50 bg-[#fff9df]/65 backdrop-blur-2xl dark:border-white/10 dark:bg-[#1c1d19]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-t border-black/15 pt-4 dark:border-white/15">
            <div>
              <p className="fluid-eyebrow mb-2 font-bold uppercase text-[#98741b] dark:text-[#ffd100]">Atelier / Essentiels</p>
              <h2 className="fluid-h2 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
                Prêt pour la suite.
              </h2>
            </div>
            <p className="fluid-body max-w-sm text-black/55 dark:text-white/55">
              Les pièces et marques qui accompagnent votre moto, du premier départ à la prochaine révision.
            </p>
          </div>

          <div className="mb-6">
            <AccessoryBrandQuickLinks onSelect={(brand) => go("pieces", brand)} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6">
            {[...PARTS.slice(0, 2), ...TLD.slice(0, 2)].map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
          <button
            onClick={() => go("pieces")}
          className="mt-8 inline-flex items-center gap-2 border-b border-[#171816] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171816] transition hover:border-[#98741b] hover:text-[#98741b] dark:border-[#f2f0ea] dark:text-[#f2f0ea] dark:hover:text-[#ffd100]"
          >
            Voir tous les équipements <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </section>

      <section className="glass-header overflow-hidden border-y border-white/70 py-10 dark:border-white/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
          <div className="mb-5 flex items-center justify-between border-t border-black/15 pt-3 dark:border-white/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">Nos partenaires</p>
            <span className="text-[9px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">Des marques qui roulent avec nous</span>
          </div>
          <div className="group/marquee relative overflow-hidden">
            {/* Fade edges so logos slide in and out smoothly */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 dark:from-[#141513]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 dark:from-[#141513]"
            />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              className="flex w-max items-center gap-10 pr-10 group-hover/marquee:[animation-play-state:paused] sm:gap-16 sm:pr-16"
              style={{ willChange: "transform" }}
              whileHover={{ transition: { duration: 0 } }}
            >
              {[...BRANDS, ...BRANDS].map((brand, index) => (
                <motion.img
                  key={`${brand.name}-${index}`}
                  src={brand.src}
                  alt={`Logo ${brand.name}`}
                  loading="lazy"
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="partner-logo h-8 w-auto max-w-24 shrink-0 object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-10 sm:max-w-32"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}