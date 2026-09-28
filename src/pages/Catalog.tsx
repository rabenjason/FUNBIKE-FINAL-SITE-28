import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BIKES, PARTS, TLD } from "../data";
import { PageHeader, Section } from "../components/Layout";
import { BikeCard, PartCard } from "../components/Cards";
import { BikeCardSkeleton, PartCardSkeleton } from "../components/Skeletons";
import Pagination from "../components/Pagination";
import { useBriefLoading } from "../hooks/useBriefLoading";
import { ACCESSORY_BRANDS, AccessoryBrandSelector, BrandVisual, type AccessoryBrandKey } from "../components/AccessoryBrands";

const FAMILIES = ["Tous", "Off-road", "Urbain", "3 roues"] as const;
const BIKES_PER_PAGE = 6;
const PARTS_PER_PAGE = 8;

function scrollToRef(ref: React.RefObject<HTMLDivElement | null>) {
  const el = ref.current;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Catalogue({ go, motosOnly = false }: { go: (p: string, id?: string) => void; motosOnly?: boolean }) {
  const [family, setFamily] = useState<string>("Tous");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () =>
      BIKES.filter(
        (b) =>
          (family === "Tous" || b.family === family) &&
          (b.name + " " + b.brand).toLowerCase().includes(query.toLowerCase()),
      ),
    [family, query],
  );

  const totalPages = Math.max(1, Math.ceil(list.length / BIKES_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = list.slice((safePage - 1) * BIKES_PER_PAGE, safePage * BIKES_PER_PAGE);
  const loading = useBriefLoading(`${family}-${safePage}`);

  function changePage(next: number) {
    setPage(next);
    scrollToRef(gridRef);
  }

  return (
    <div>
      <PageHeader
        title={motosOnly ? "Catalogue Motos" : "Tout le Catalogue"}
        subtitle={motosOnly ? "Performance, Aventure et Mobilité Urbaine." : "Découvrez nos motos, pièces et équipements officiels."}
      />

      <Section
        title="Véhicules"
        subtitle={`${list.length} modèle(s) disponible(s) · page ${safePage} sur ${totalPages}`}
        number="01 / Motos"
      >
        <div
          ref={gridRef}
          className="mb-7 flex flex-col gap-4 border-b border-black/15 pb-3 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {FAMILIES.map((x) => (
              <button
                key={x}
                onClick={() => {
                  setFamily(x);
                  setPage(1);
                }}
                aria-pressed={family === x}
                className={
                  "relative py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition " +
                  (family === x ? "text-[#171816] dark:text-white" : "text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white")
                }
              >
                {x}
                {family === x && (
                  <motion.span layoutId="family-filter" className="absolute inset-x-0 -bottom-[13px] h-[2px] bg-[#ffd100]" />
                )}
              </button>
            ))}
          </div>
          <label className="flex w-full max-w-sm items-center gap-2 border-b border-black/20 pb-2 text-black/40 focus-within:border-[#a27b17] dark:border-white/20 dark:focus-within:border-[#ffd100]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Rechercher un modèle"
              aria-label="Rechercher un modèle"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#171816] outline-none placeholder:text-black/40 dark:text-[#f2f0ea] dark:placeholder:text-white/40"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {loading
            ? Array.from({ length: Math.max(visible.length, 3) }, (_, i) => <BikeCardSkeleton key={i} />)
            : visible.map((b) => <BikeCard key={b.id} bike={b} go={go} />)}
        </div>
        {!loading && list.length === 0 && (
          <p className="py-12 text-center text-sm text-black/50 dark:text-white/50">Aucun modèle ne correspond à votre recherche.</p>
        )}

        <Pagination id={motosOnly ? "motos" : "catalogue"} page={safePage} total={totalPages} onChange={changePage} />
      </Section>

      {!motosOnly && (
        <>
          <Section title="Pièces moto" subtitle="Pièces d'origine, freinage et consommables." number="02 / Atelier">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {PARTS.map((p) => (
                <PartCard key={p.id} part={p} />
              ))}
            </div>
          </Section>
          <Section title="Équipements pilote" subtitle="Casques & tenues de marques sélectionnées." number="03 / Équipement">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
              {TLD.slice(0, 5).map((p) => (
                <PartCard key={p.id} part={p} />
              ))}
            </div>
            <button
              onClick={() => go("pieces", "tld")}
              className="mt-8 border-b border-[#171816] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171816] transition hover:border-[#98741b] hover:text-[#98741b] dark:border-[#f2f0ea] dark:text-[#f2f0ea] dark:hover:text-[#ffd100]"
            >
              Voir toute la collection
            </button>
          </Section>
        </>
      )}
    </div>
  );
}

const PARTNER_DETAILS: Record<"gaerne" | "mt", { title: string; text: string; lines: string[] }> = {
  gaerne: {
    title: "Bottes & chaussures moto Gaerne",
    text: "Indiquez votre pratique et votre pointure : l'équipe Funbike vous renseigne sur les références, tailles et disponibilités de la gamme Gaerne.",
    lines: ["Bottes tout-terrain", "Chaussures moto", "Conseil de pointure"],
  },
  mt: {
    title: "Casques moto MT Helmets",
    text: "Pour choisir un casque adapté à votre usage, contactez Funbike. Nous vous confirmons les modèles, tailles, coloris et tarifs disponibles.",
    lines: ["Casques route", "Casques tout-terrain", "Conseil de taille"],
  },
};

function PartnerBrandPanel({ brand, go }: { brand: "gaerne" | "mt"; go: (page: string, id?: string) => void }) {
  const brandInfo = ACCESSORY_BRANDS.find((item) => item.key === brand)!;
  const details = PARTNER_DETAILS[brand];

  return (
    <div className="glass-panel grid gap-6 p-6 sm:p-8 md:grid-cols-[0.6fr_1.4fr] md:gap-12">
      <div className="flex min-h-32 items-center justify-center">
        <BrandVisual brand={brandInfo} className="h-16 max-w-[200px]" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98741b] dark:text-[#ffd100]">Marque partenaire Funbike</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-[#171816] dark:text-[#f2f0ea]">{details.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55 dark:text-white/55">{details.text}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {details.lines.map((line) => (
            <span key={line} className="inline-flex items-center gap-2 text-xs font-semibold text-black/65 dark:text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffd100]" />
              {line}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/15 pt-5 dark:border-white/15">
          <button
            onClick={() => go("contact")}
            className="bg-[#ffd100] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#171816] transition hover:bg-[#ffe36b]"
          >
            Demander les disponibilités
          </button>
          <span className="text-xs text-black/45 dark:text-white/45">Modèles et tarifs confirmés par notre équipe.</span>
        </div>
      </div>
    </div>
  );
}

export function Pieces({ go, initialBrand }: { go: (page: string, id?: string) => void; initialBrand?: string }) {
  const validBrand = ACCESSORY_BRANDS.some((brand) => brand.key === initialBrand);
  const [tab, setTab] = useState<AccessoryBrandKey>(validBrand ? (initialBrand as AccessoryBrandKey) : "piece");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const items = tab === "piece" ? PARTS : tab === "tld" ? TLD : [];
  const totalPages = Math.max(1, Math.ceil(items.length / PARTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = items.slice((safePage - 1) * PARTS_PER_PAGE, safePage * PARTS_PER_PAGE);
  const loading = useBriefLoading(`${tab}-${safePage}`);

  const heading =
    tab === "piece"
      ? {
          title: "Pièces moto d'origine",
          text: "Consommables, freinage et pièces mécaniques. Contactez-nous pour confirmer la compatibilité avec votre moto.",
        }
      : {
          title: "Troy Lee Designs",
          text: "Parcourez la collection pilote, puis contactez Funbike pour vérifier les tailles et coloris disponibles.",
        };

  return (
    <div>
      <PageHeader title="Pièces & Accessoires" subtitle="Équipements de pointe et pièces d'origine." />
      <Section
        title="Choisir une marque"
        subtitle="Touchez une marque pour afficher sa gamme et les informations utiles."
        number="01 / Atelier"
      >
        <div ref={gridRef}>
          <AccessoryBrandSelector
            active={tab}
            onSelect={(key) => {
              setTab(key);
              setPage(1);
            }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-8"
          >
            {tab === "gaerne" || tab === "mt" ? (
              <PartnerBrandPanel brand={tab} go={go} />
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-[#171816] dark:text-[#f2f0ea]">{heading.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-black/55 dark:text-white/55">{heading.text}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                    {items.length} références · page {safePage}/{totalPages}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {loading
                    ? Array.from({ length: visible.length }, (_, i) => <PartCardSkeleton key={i} />)
                    : visible.map((part) => <PartCard key={part.id} part={part} />)}
                </div>
                <Pagination
                  id={`pieces-${tab}`}
                  page={safePage}
                  total={totalPages}
                  onChange={(next) => {
                    setPage(next);
                    scrollToRef(gridRef);
                  }}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </div>
  );
}
