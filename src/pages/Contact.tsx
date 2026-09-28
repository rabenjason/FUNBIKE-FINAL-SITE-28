import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "../components/Layout";

const CONTACT_INFO = [
  { icon: faLocationDot, label: "Showroom & atelier", value: "Antananarivo, Madagascar" },
  { icon: faClock, label: "Horaires", value: "Lun - sam · 8h00 - 17h30" },
  { icon: faPhone, label: "Téléphone", value: "+261 34 00 000 00", href: "tel:+261340000000" },
  { icon: faEnvelope, label: "Email", value: "contact@funbike.mg", href: "mailto:contact@funbike.mg" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-white dark:bg-[#141513]">
      <PageHeader title="On prend la route ?" subtitle="Une question, un essai ou un devis ? L'équipe Funbike vous répond et vous aide à trouver la bonne configuration." />

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 sm:px-7 sm:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-10">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="fluid-eyebrow font-bold uppercase text-[#98741b] dark:text-[#ffd100]">Funbike / Madagascar</p>
          <h2 className="fluid-h2 mt-3 max-w-sm font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
            Le meilleur conseil commence par une conversation.
          </h2>
          <div className="mt-8 border-t border-black/15 dark:border-white/15">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-black/15 py-4 dark:border-white/15">
                <FontAwesomeIcon icon={item.icon} className="mt-1 text-xs text-[#98741b] dark:text-[#ffd100]" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/45 dark:text-white/45">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="mt-1 inline-block text-sm font-medium text-[#171816] hover:text-[#98741b] dark:text-[#f2f0ea] dark:hover:text-[#ffd100]">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-[#171816] dark:text-[#f2f0ea]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-black/50 dark:text-white/50">
            Besoin d'une réponse rapide ? Ouvrez la bulle de discussion en bas à droite pour parler avec Piston.
          </p>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="glass-panel border-t border-black/20 p-5 dark:border-white/20 sm:p-8"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="fluid-eyebrow font-bold uppercase text-[#98741b] dark:text-[#ffd100]">Demande de contact</p>
              <h2 className="fluid-h3 mt-2 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">Parlez-nous de votre projet.</h2>
            </div>
            <span className="hidden font-display text-xs text-black/35 sm:block dark:text-white/35">01 / 04</span>
          </div>

          <div className="grid gap-x-6 sm:grid-cols-2">
            {["Nom complet", "Téléphone"].map((label) => (
              <label key={label} className="mb-5 block">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/50 dark:text-white/50">{label}</span>
                <input required name={label === "Téléphone" ? "phone" : "name"} className="mt-1.5 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#171816] outline-none transition placeholder:text-black/30 focus:border-[#98741b] dark:border-white/20 dark:text-[#f2f0ea] dark:placeholder:text-white/30 dark:focus:border-[#ffd100]" />
              </label>
            ))}
          </div>
          <label className="mb-5 block">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Email</span>
            <input type="email" required name="email" className="mt-1.5 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#171816] outline-none transition focus:border-[#98741b] dark:border-white/20 dark:text-[#f2f0ea] dark:focus:border-[#ffd100]" />
          </label>
          <label className="block">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Votre message</span>
            <textarea required name="message" rows={4} className="mt-1.5 w-full resize-y border-b border-black/20 bg-transparent py-2 text-sm text-[#171816] outline-none transition focus:border-[#98741b] dark:border-white/20 dark:text-[#f2f0ea] dark:focus:border-[#ffd100]" />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-3 bg-[#ffd100] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#171816] transition hover:bg-[#ffe36b]">
              Envoyer la demande <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-emerald-700 dark:text-emerald-400"
                >
                  Merci, votre demande est prête. Nous vous recontacterons rapidement.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-black/40 dark:text-white/40">
            Le formulaire affiche une confirmation locale. Pour recevoir réellement les demandes, il faudra le connecter à une adresse ou à un service de formulaire.
          </p>
        </motion.form>
      </div>
    </div>
  );
}