import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import { BIKES } from "../data";
import { Section } from "../components/Layout";
import { BikeCard } from "../components/Cards";
import SmartImage from "../components/SmartImage";

export default function Product({ id, go }: { id?: string; go: (p: string, i?: string) => void }) {
  const bike = BIKES.find((item) => item.id === id) ?? BIKES[0];
  const gallery = bike.gallery ?? [bike.image];
  const [active, setActive] = useState(0);
  const related = BIKES.filter((item) => item.id !== bike.id && item.family === bike.family).slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#141513]">
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-7 lg:px-10">
        <button
          onClick={() => go("catalogue")}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/50 transition hover:text-[#98741b] dark:text-white/50 dark:hover:text-[#ffd100]"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Retour au catalogue
        </button>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-7 px-4 py-6 sm:px-7 sm:py-9 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-7">
          <div className="glass-panel relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-white to-[#f5f4ef] p-2 dark:from-[#262722] dark:to-[#1b1c18]">
            <SmartImage
              src={gallery[active]}
              alt={bike.alt}
              eager
              className="absolute inset-2"
              imgClassName="object-contain p-2"
            />
            <span className="absolute bottom-5 left-5 border border-white/60 bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#171816] shadow-sm backdrop-blur-xl">
              {bike.brand} / {bike.family}
            </span>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActive(index)}
                  aria-label={`Voir la photo ${index + 1}`}
                  aria-pressed={active === index}
                  className={"shrink-0 border-b-2 bg-white/70 p-1 transition dark:bg-[#22231f] " + (active === index ? "border-[#ffd100] opacity-100" : "border-transparent opacity-60 hover:opacity-100")}
                >
                  <SmartImage src={image} alt={`${bike.name}, vue ${index + 1}`} className="h-14 w-20 sm:h-16 sm:w-24" imgClassName="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-5 lg:py-4"
        >
          <p className="fluid-eyebrow font-bold uppercase text-[#98741b] dark:text-[#ffd100]">
            {bike.brand} / {bike.family} {bike.tag ? `/ ${bike.tag}` : ""}
          </p>
          <h1 className="fluid-h1 mt-3 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
            {bike.name}
          </h1>
          <p className="fluid-body mt-4 max-w-xl text-black/60 dark:text-white/60">{bike.desc}</p>

          <dl className="mt-7 border-t border-black/15 dark:border-white/15">
            {bike.specs.map((spec, index) => (
              <div key={spec.label} className="grid grid-cols-[2.2rem_1fr_1.2fr] items-center gap-2 border-b border-black/15 py-3 dark:border-white/15">
                <span className="font-display text-[10px] text-black/35 dark:text-white/35">0{index + 1}</span>
                <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/50 dark:text-white/50">{spec.label}</dt>
                <dd className="text-right text-xs font-semibold text-[#171816] dark:text-[#f2f0ea]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-5 dark:border-white/15">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/45 dark:text-white/45">Prix & disponibilité</p>
              <p className="mt-1 font-display text-xl font-semibold text-[#171816] dark:text-[#f2f0ea]">{bike.price}</p>
            </div>
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center gap-3 bg-[#ffd100] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#171816] transition hover:bg-[#ffe36b]"
            >
              Demander un devis <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[10px] text-black/45 dark:text-white/45">
            <FontAwesomeIcon icon={faCheck} className="text-[#98741b] dark:text-[#ffd100]" />
            Équipe Funbike à votre écoute pour les détails du modèle.
          </p>
          <button onClick={() => go("contact")} className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-black/55 hover:text-[#98741b] dark:text-white/55 dark:hover:text-[#ffd100]">
            <FontAwesomeIcon icon={faPhone} /> Contacter l'équipe
          </button>
        </motion.div>
      </div>

      {related.length > 0 && (
        <Section title="Dans le même esprit" subtitle="D'autres modèles à découvrir." number="À explorer / 02">
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {related.map((item) => <BikeCard key={item.id} bike={item} go={go} />)}
          </div>
        </Section>
      )}
    </div>
  );
}