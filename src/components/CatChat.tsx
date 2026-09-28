import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

type Msg = { from: "cat" | "me"; text: string };

const QUICK = ["Motos Sherco", "Prix d'un TVS", "Pièces moto", "Adresse & horaires"];

function reply(q: string): string {
  const text = q.toLowerCase();
  if (text.includes("sherco") || text.includes("moto") || text.includes("enduro"))
    return "Nous avons la SEF 250 et 300 Factory 2026, la XX 125 et l'Enduro 450. Consulte le catalogue motos pour les fiches.";
  if (text.includes("prix") || text.includes("tarif") || text.includes("devis"))
    return "Les tarifs dépendent du modèle et du stock. Envoie-nous une demande de devis et l'équipe te répondra.";
  if (text.includes("pièce") || text.includes("piece") || text.includes("accessoire"))
    return "Pièces d'origine, Gaerne, MT Helmets et Troy Lee Designs sont présentés dans Pièces & Accessoires.";
  if (text.includes("casque") || text.includes("tenue") || text.includes("troy"))
    return "Les casques et équipements Troy Lee Designs sont disponibles selon tailles et coloris. Contacte-nous pour vérifier le stock.";
  if (text.includes("où") || text.includes("adresse") || text.includes("trouver") || text.includes("horaire"))
    return "Funbike vous accueille à Antananarivo du lundi au samedi, de 8h à 17h30.";
  if (text.includes("tuktuk") || text.includes("3 roues"))
    return "Le TVS King Tuktuk est présenté au catalogue. Contacte l'équipe pour connaître la disponibilité.";
  if (text.includes("bonjour") || text.includes("salut") || text.includes("hello"))
    return "Bonjour ! Je suis Piston, l'assistant Funbike. Quel modèle t'intéresse ?";
  return "Je transmets ta question à l'équipe Funbike. Tu peux aussi nous écrire via la page Contact.";
}

export default function CatChat({ hiddenOnMobile = false }: { hiddenOnMobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "cat", text: "Miaou ! Je suis Piston, l'assistant Funbike. Une question sur nos motos ou équipements ?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTeaser(false), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  function send(message: string) {
    const value = message.trim();
    if (!value) return;
    setMessages((current) => [...current, { from: "me", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [...current, { from: "cat", text: reply(value) }]);
    }, 650);
  }

  return (
    <div
      className={
        "fixed bottom-28 right-3 z-50 flex-col items-end gap-2.5 sm:bottom-6 sm:right-6 " +
        (hiddenOnMobile ? "hidden sm:flex" : "flex")
      }
    >
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Discussion avec Piston"
            className="glass-panel w-[min(calc(100vw-32px),360px)] overflow-hidden shadow-[0_18px_65px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
              <div className="grid h-9 w-9 place-items-center bg-[#ffd100]">
                <CatFace className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-[#171816] dark:text-[#f2f0ea]">Piston</p>
                <p className="flex items-center gap-1.5 text-[10px] text-black/50 dark:text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Assistant Funbike
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="ml-auto grid h-8 w-8 place-items-center text-sm text-black/50 transition hover:text-black dark:text-white/50 dark:hover:text-white"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="h-64 space-y-3 overflow-y-auto px-3 py-4 sm:h-72">
              {messages.map((message, index) => (
                <motion.div
                  key={`${index}-${message.from}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={message.from === "me" ? "flex justify-end" : "flex items-start gap-2"}
                >
                  {message.from === "cat" && <CatFace className="mt-1 h-5 w-5 shrink-0" />}
                  <div
                    className={
                      "max-w-[84%] px-3 py-2 text-xs leading-5 " +
                      (message.from === "me"
                        ? "bg-[#171816] text-white dark:bg-[#ffd100] dark:text-[#171816]"
                        : "bg-white text-[#171816] dark:bg-[#292a25] dark:text-[#f2f0ea]")
                    }
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <CatFace className="h-5 w-5" />
                  <div className="flex gap-1.5 bg-white px-3 py-2.5 dark:bg-[#292a25]">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: dot * 0.12 }}
                        className="h-1.5 w-1.5 rounded-full bg-[#bd941e]"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-black/10 px-3 py-2 dark:border-white/10">
              {QUICK.map((question) => (
                <button
                  key={question}
                  onClick={() => send(question)}
                  className="shrink-0 border border-black/15 px-2.5 py-1.5 text-[10px] font-medium text-black/65 transition hover:border-[#d2a51f] hover:text-black dark:border-white/15 dark:text-white/65 dark:hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-black/10 p-3 dark:border-white/10"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Écrire un message"
                className="min-w-0 flex-1 border-b border-black/20 bg-transparent px-1 py-2 text-xs outline-none placeholder:text-black/35 focus:border-[#98741b] dark:border-white/20 dark:text-white dark:placeholder:text-white/35"
              />
              <button
                type="submit"
                aria-label="Envoyer le message"
                className="grid h-9 w-9 place-items-center bg-[#ffd100] text-xs text-[#171816] transition hover:bg-[#f2d77f]"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && teaser && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="max-w-[13rem] border border-black/15 bg-[#f2f0ea] px-3 py-2 text-xs text-[#171816] shadow-lg dark:border-white/15 dark:bg-[#1c1d19] dark:text-white"
          >
            Miaou ! Un conseil pour votre prochaine sortie ?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setOpen((value) => !value);
          setTeaser(false);
        }}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        animate={open ? undefined : { y: [0, -4, 0] }}
        transition={open ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-12 w-12 place-items-center rounded-full bg-[#ffd100] shadow-[0_8px_28px_rgba(0,0,0,0.24)] sm:h-14 sm:w-14 sm:rounded-none"
      >
        {!open && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.45], opacity: [0.35, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-[#ffd100] sm:rounded-none"
          />
        )}
        {open ? <FontAwesomeIcon icon={faXmark} className="relative text-lg text-[#171816]" /> : <CatFace className="relative h-9 w-9 sm:h-10 sm:w-10" animated />}
      </motion.button>
    </div>
  );
}

export function CatFace({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {animated && (
        <path
          d="M50 44c8 2 10 8 6 12"
          className="animate-fb-tail"
          fill="none"
          stroke="#27272a"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      <g className={animated ? "animate-fb-ear" : ""}>
        <path d="M14 22L16 8l13 8z" fill="#27272a" />
        <path d="M50 22L48 8l-13 8z" fill="#27272a" />
      </g>
      <ellipse cx="32" cy="34" rx="22" ry="19" fill="#27272a" />
      <ellipse cx="32" cy="39" rx="13" ry="10" fill="#fde68a" />
      <g className={animated ? "animate-fb-blink" : ""}>
        <ellipse cx="24" cy="30" rx="3.4" ry="4.2" fill="#ffd100" />
        <ellipse cx="40" cy="30" rx="3.4" ry="4.2" fill="#ffd100" />
        <ellipse cx="24" cy="30" rx="1.3" ry="3.2" fill="#27272a" />
        <ellipse cx="40" cy="30" rx="1.3" ry="3.2" fill="#27272a" />
      </g>
      <path d="M32 37l-2.6-2.4h5.2z" fill="#27272a" />
      <path d="M32 38c0 2.6-2.6 2.6-3.6 1M32 38c0 2.6 2.6 2.6 3.6 1" stroke="#27272a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <g stroke="#27272a" strokeWidth="1.4" strokeLinecap="round">
        <path d="M19 37H9M19 41l-9 3M45 37h10M45 41l9 3" />
      </g>
    </svg>
  );
}