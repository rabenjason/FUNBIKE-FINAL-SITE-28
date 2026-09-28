import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import type { Bike, Part } from "../data";
import SmartImage from "./SmartImage";

export function BikeCard({ bike, go }: { bike: Bike; go: (p: string, id?: string) => void }) {
  const gallery = bike.gallery ?? [bike.image];
  const [active, setActive] = useState(0);

  const badge =
    "inline-flex items-center border border-white/25 bg-black/35 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group flex min-w-0 flex-col overflow-hidden border border-white/10 bg-[#171815] text-left shadow-[0_14px_40px_rgba(0,0,0,0.25)] transition-colors hover:border-[#ffd100]/70"
    >
      {/* MEDIA — studio stage, full bike always visible */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#2a2b27] via-[#1d1e1a] to-[#101110]">
        <button
          type="button"
          onClick={() => go("product", bike.id)}
          aria-label={`Découvrir ${bike.name}`}
          className="absolute inset-0 block"
        >
          <SmartImage
            src={gallery[active]}
            alt={bike.alt}
            className="absolute inset-0"
            imgClassName="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04] sm:p-5"
          />
        </button>

        <span className={badge + " pointer-events-none absolute left-3 top-3"}>{bike.brand}</span>
        <span className={badge + " pointer-events-none absolute right-3 top-3"}>{bike.family}</span>

        {bike.tag && (
          <span className="pointer-events-none absolute left-3 top-11 bg-[#ffd100] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#171816]">
            {bike.tag}
          </span>
        )}

        {gallery.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Voir la photo ${index + 1}`}
                aria-current={active === index}
                className="grid h-5 place-items-center px-0.5"
              >
                <span
                  className={
                    "block h-[3px] transition-all " +
                    (active === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/70")
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col border-t border-white/10 p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
          {bike.brand} · {bike.family}
        </p>

        <h3 className="mt-2 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white">
          {bike.name}
        </h3>

        <p className="fluid-body mt-2.5 line-clamp-2 text-white/55">{bike.desc}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => go("product", bike.id)}
            className="fluid-btn inline-flex min-h-10 items-center gap-2.5 border border-white/30 px-4 py-2.5 font-bold uppercase text-white transition hover:border-[#ffd100] hover:bg-[#ffd100] hover:text-[#171816]"
          >
            Découvrir
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
          </motion.button>

          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[#ffd100]">
            {bike.price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function PartCard({ part }: { part: Part }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="group min-w-0 border-t border-black/20 pt-3 dark:border-white/20"
    >
      <SmartImage
        src={part.image}
        alt={part.name}
        className="aspect-square bg-white dark:bg-white/95"
        imgClassName="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pt-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#98741b] dark:text-[#ffd100]">
          {part.kind === "tld" ? "Troy Lee Designs" : "Pièce d'origine"}
        </p>
        <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#171816] dark:text-[#f2f0ea]">{part.name}</h3>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.1em] text-black/45 dark:text-white/45">{part.price}</p>
      </div>
    </motion.article>
  );
}
