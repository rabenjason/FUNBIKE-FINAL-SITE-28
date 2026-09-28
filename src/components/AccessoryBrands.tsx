import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faGears, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export type AccessoryBrandKey = "piece" | "tld" | "gaerne" | "mt";

export type AccessoryBrand = {
  key: AccessoryBrandKey;
  name: string;
  logo?: string;
  icon?: IconDefinition;
  alt: string;
};

export const ACCESSORY_BRANDS: AccessoryBrand[] = [
  { key: "piece", name: "Pièces d'origine", icon: faGears, alt: "Pièces moto d'origine" },
  {
    key: "tld",
    name: "Troy Lee Designs",
    logo: "https://funbike.mg/wp-content/uploads/2026/02/sticker-troy-lee-designs-shield-logo-rouge-16cm.png",
    alt: "Logo Troy Lee Designs",
  },
  { key: "gaerne", name: "Gaerne", logo: "https://funbike.mg/wp-content/uploads/2026/02/gaerne-logo.jpg", alt: "Logo Gaerne" },
  { key: "mt", name: "MT Helmets", logo: "https://funbike.mg/wp-content/uploads/2026/02/mt.png", alt: "Logo MT Helmets" },
];

/** Brand mark without any box: icon, or logo with its white background blended away. */
export function BrandVisual({ brand, className = "h-7 max-w-[60px]" }: { brand: AccessoryBrand; className?: string }) {
  if (brand.icon) {
    return (
      <span className="grid h-7 w-8 shrink-0 place-items-center text-sm text-[#98741b] dark:text-[#ffd100]" aria-hidden="true">
        <FontAwesomeIcon icon={brand.icon} />
      </span>
    );
  }
  return <img src={brand.logo} alt={brand.alt} className={"partner-logo w-auto shrink-0 object-contain " + className} />;
}

export function AccessoryBrandSelector({
  active,
  onSelect,
}: {
  active: AccessoryBrandKey;
  onSelect: (brand: AccessoryBrandKey) => void;
}) {
  return (
    <div className="flex overflow-x-auto border-b border-black/15 dark:border-white/15">
      {ACCESSORY_BRANDS.map((brand) => {
        const selected = active === brand.key;
        return (
          <button
            key={brand.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(brand.key)}
            className={
              "relative flex min-w-max items-center gap-2.5 px-3 py-3 text-left transition sm:px-5 " +
              (selected ? "bg-[#ffd100]/15" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]")
            }
          >
            <BrandVisual brand={brand} />
            <span
              className={
                "block truncate text-xs font-bold " +
                (selected ? "text-[#171816] dark:text-[#f2f0ea]" : "text-black/50 dark:text-white/50")
              }
            >
              {brand.name}
            </span>
            {selected && (
              <motion.span
                layoutId="accessory-brand-active"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ffd100]"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function AccessoryBrandQuickLinks({ onSelect }: { onSelect: (brand: AccessoryBrandKey) => void }) {
  return (
    <div className="grid grid-cols-2 border-y border-black/15 sm:flex sm:flex-wrap dark:border-white/15">
      {ACCESSORY_BRANDS.map((brand) => (
        <motion.button
          key={brand.key}
          type="button"
          onClick={() => onSelect(brand.key)}
          whileHover={{ x: 3 }}
          className="group flex items-center gap-2 border-b border-r border-black/10 px-2 py-2.5 text-left transition hover:bg-white/50 even:border-r-0 sm:border-b-0 sm:px-4 sm:even:border-r sm:last:border-r-0 dark:border-white/10 dark:hover:bg-white/[0.04]"
        >
          <BrandVisual brand={brand} className="h-6 max-w-[52px]" />
          <span className="flex-1 whitespace-nowrap text-[10px] font-bold text-black/65 dark:text-white/65">{brand.name}</span>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-[10px] text-black/35 transition group-hover:text-[#98741b] dark:text-white/35 dark:group-hover:text-[#ffd100]"
          />
        </motion.button>
      ))}
    </div>
  );
}
