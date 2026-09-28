export const LOGO = "https://funbike.mg/wp-content/themes/funbike/images/logo-funbike.png";

export type Brand = { name: string; src: string };

export const BRANDS: Brand[] = [
  { name: "TVS", src: "https://funbike.mg/wp-content/uploads/2026/02/tvs-logo.png" },
  { name: "Fantic", src: "https://funbike.mg/wp-content/themes/funbike/images/fantic.png" },
  { name: "Sherco", src: "https://funbike.mg/wp-content/uploads/2026/02/sherco.png" },
  { name: "Bihr", src: "https://funbike.mg/wp-content/uploads/2026/02/bihr-logo.jpg" },
  { name: "Trace", src: "https://funbike.mg/wp-content/uploads/2026/02/Trace-1.png" },
  { name: "Gaerne", src: "https://funbike.mg/wp-content/uploads/2026/02/gaerne-logo.jpg" },
  { name: "Galfer", src: "https://funbike.mg/wp-content/uploads/2026/02/Galfer-logo.png" },
  { name: "MT Helmets", src: "https://funbike.mg/wp-content/uploads/2026/02/mt.png" },
  {
    name: "Troy Lee Designs",
    src: "https://funbike.mg/wp-content/uploads/2026/02/sticker-troy-lee-designs-shield-logo-rouge-16cm.png",
  },
];

export type Category = { title: string; desc: string; src: string; to: string; brand?: string };

export const CATEGORIES: Category[] = [
  {
    title: "Motos TVS & Urbain",
    desc: "Mobilité quotidienne, robuste et économique.",
    src: "https://funbike.mg/wp-content/themes/funbike/images/raider.png",
    to: "motos",
  },
  {
    title: "Casques & Protections",
    desc: "Sécurité homologuée, confort longue distance.",
    src: "https://funbike.mg/wp-content/themes/funbike/images/tld-casque.png",
    to: "pieces",
    brand: "tld",
  },
  {
    title: "Pièces détachées",
    desc: "Pièces d'origine et consommables.",
    src: "https://funbike.mg/wp-content/themes/funbike/images/piece.jpg",
    to: "pieces",
  },
  {
    title: "Tenues & Équipements",
    desc: "Équipements pilote Troy Lee Designs.",
    src: "https://funbike.mg/wp-content/themes/funbike/images/tenu.jpg",
    to: "pieces",
    brand: "tld",
  },
];

export type Bike = {
  id: string;
  name: string;
  brand: string;
  family: "Off-road" | "Urbain" | "3 roues";
  price: string;
  tag?: string;
  alt: string;
  image: string;
  gallery?: string[];
  specs: { label: string; value: string }[];
  desc: string;
};

export const BIKES: Bike[] = [
  {
    id: "sherco-sef-250-factory-2026",
    name: "Sherco SEF 250 Factory 2026",
    brand: "Sherco",
    family: "Off-road",
    price: "Sur devis",
    tag: "Nouveauté 2026",
    alt: "Sherco 250 SEF Factory 2026 – vue latérale",
    image:
      "https://funbike.mg/wp-content/uploads/2026/02/01-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
    gallery: [
      "https://funbike.mg/wp-content/uploads/2026/02/01-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
      "https://funbike.mg/wp-content/uploads/2026/02/08-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
      "https://funbike.mg/wp-content/uploads/2026/02/07-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
      "https://funbike.mg/wp-content/uploads/2026/02/06-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
      "https://funbike.mg/wp-content/uploads/2026/02/05-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
    ],
    specs: [
      { label: "Cylindrée", value: "250 cc – 4 temps" },
      { label: "Refroidissement", value: "Liquide" },
      { label: "Suspension", value: "KYB Factory" },
      { label: "Freins", value: "Galfer / Brembo" },
      { label: "Poids", value: "≈ 105 kg" },
    ],
    desc:
      "La référence enduro Sherco en finition Factory : châssis affûté, suspensions KYB haut de gamme et moteur 250 cc au couple généreux. Une machine de compétition prête à dévorer les pistes de Madagascar.",
  },
  {
    id: "sherco-sef-300-factory-2026",
    name: "Sherco SEF 300 Factory 2026",
    brand: "Sherco",
    family: "Off-road",
    price: "Sur devis",
    tag: "Nouveauté 2026",
    alt: "Sherco 300 SEF Factory 2026 – vue latérale",
    image:
      "https://funbike.mg/wp-content/uploads/2026/02/01-300-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg",
    specs: [
      { label: "Cylindrée", value: "300 cc – 4 temps" },
      { label: "Refroidissement", value: "Liquide" },
      { label: "Suspension", value: "KYB Factory" },
      { label: "Cartographies", value: "2 mappings" },
      { label: "Poids", value: "≈ 107 kg" },
    ],
    desc:
      "Plus de couple, plus de traction : la SEF 300 Factory est taillée pour l'enduro extrême et les longues liaisons hors-piste.",
  },
  {
    id: "xx-125-2026",
    name: "XX 125 2026",
    brand: "Fantic",
    family: "Off-road",
    price: "Sur devis",
    tag: "Best-seller",
    alt: "XX 125 2026 – moto off-road",
    image: "https://funbike.mg/wp-content/uploads/2026/02/7b566adac57a4b5dbfd74d4f768e6fdb.jpg",
    specs: [
      { label: "Cylindrée", value: "125 cc – 2 temps" },
      { label: "Démarrage", value: "Électrique" },
      { label: "Châssis", value: "Double berceau acier" },
      { label: "Usage", value: "Cross / Enduro" },
    ],
    desc:
      "Légère, vive et facile à prendre en main : la XX 125 est la porte d'entrée idéale vers le tout-terrain sportif.",
  },
  {
    id: "offroad-450",
    name: "Enduro 450 Factory",
    brand: "Sherco",
    family: "Off-road",
    price: "Sur devis",
    alt: "Moto enduro 450 cc",
    image: "https://funbike.mg/wp-content/uploads/2026/02/450.jpg",
    specs: [
      { label: "Cylindrée", value: "450 cc" },
      { label: "Usage", value: "Rallye / Enduro" },
      { label: "Réservoir", value: "9,7 L" },
    ],
    desc: "Le gros cube tout-terrain pour les raids et les pilotes expérimentés.",
  },
  {
    id: "offroad-trail",
    name: "Trail Adventure",
    brand: "Fantic",
    family: "Off-road",
    price: "Sur devis",
    alt: "Moto trail aventure",
    image: "https://funbike.mg/wp-content/uploads/2026/02/845c5d0ddcdd409eabc272f6c042e305.jpg",
    specs: [
      { label: "Usage", value: "Trail / Aventure" },
      { label: "Roues", value: "21\" / 18\"" },
    ],
    desc: "Polyvalence route et piste, pour partir loin sans compromis.",
  },
  {
    id: "tvs-hlx-plus",
    name: "TVS HLX Plus",
    brand: "TVS",
    family: "Urbain",
    price: "Sur devis",
    alt: "TVS HLX Plus noire – vue latérale",
    image: "https://funbike.mg/wp-content/uploads/2026/02/hlx-plus-black.jpg",
    specs: [
      { label: "Cylindrée", value: "150 cc" },
      { label: "Charge utile", value: "Renforcée" },
      { label: "Consommation", value: "≈ 2 L / 100 km" },
    ],
    desc: "La monture utilitaire par excellence : increvable, économique, parfaite pour les routes exigeantes.",
  },
  {
    id: "tvs-bleu",
    name: "TVS Sport Series",
    brand: "TVS",
    family: "Urbain",
    price: "Sur devis",
    tag: "3 coloris",
    alt: "TVS bleue – vue latérale",
    image: "https://funbike.mg/wp-content/uploads/2026/02/blue-1.png",
    gallery: [
      "https://funbike.mg/wp-content/uploads/2026/02/blue-1.png",
      "https://funbike.mg/wp-content/uploads/2026/02/1.png",
      "https://funbike.mg/wp-content/uploads/2026/02/black-1.png",
    ],
    specs: [
      { label: "Cylindrée", value: "110 cc" },
      { label: "Boîte", value: "4 rapports" },
      { label: "Coloris", value: "Bleu / Gris / Noir" },
    ],
    desc:
      "Un style moderne et un moteur sobre : la Sport Series se décline en plusieurs coloris pour la ville comme pour les trajets quotidiens.",
  },
  {
    id: "tvs-200-4v",
    name: "TVS Apache 200 4V",
    brand: "TVS",
    family: "Urbain",
    price: "Sur devis",
    alt: "TVS 200 4V – bannière",
    image: "https://funbike.mg/wp-content/uploads/2026/02/Banner_200_4V.png",
    specs: [
      { label: "Cylindrée", value: "200 cc – 4 soupapes" },
      { label: "Freinage", value: "ABS" },
      { label: "Mode", value: "Sport / Urbain / Pluie" },
    ],
    desc: "La sportive urbaine de TVS : nerveuse, équipée ABS et d'un tableau de bord connecté.",
  },
  {
    id: "tvs-red",
    name: "TVS Raider Rouge",
    brand: "TVS",
    family: "Urbain",
    price: "Sur devis",
    alt: "TVS rouge – vue latérale",
    image: "https://funbike.mg/wp-content/uploads/2026/02/red.png",
    specs: [
      { label: "Cylindrée", value: "125 cc" },
      { label: "Écran", value: "LCD / TFT" },
    ],
    desc: "Design agressif et consommation maîtrisée pour les jeunes conducteurs.",
  },
  {
    id: "tvs-125-hlx-5g",
    name: "TVS 125 HLX 5G",
    brand: "TVS",
    family: "Urbain",
    price: "Sur devis",
    alt: "TVS 125 HLX 5G – vue latérale",
    image: "https://funbike.mg/wp-content/uploads/2026/02/125hlx-5g.png",
    specs: [
      { label: "Cylindrée", value: "125 cc" },
      { label: "Boîte", value: "5 rapports" },
      { label: "Usage", value: "Mixte ville / brousse" },
    ],
    desc: "Cinq rapports et une fiabilité éprouvée pour rouler partout, tous les jours.",
  },
  {
    id: "tuktuk",
    name: "TVS King Tuktuk",
    brand: "TVS",
    family: "3 roues",
    price: "Sur devis",
    alt: "Tuktuk TVS 3 roues",
    image: "https://funbike.mg/wp-content/uploads/2026/02/tuktuk.png",
    specs: [
      { label: "Places", value: "3 + 1" },
      { label: "Motorisation", value: "Essence / Diesel" },
      { label: "Usage", value: "Transport urbain" },
    ],
    desc: "Le 3 roues de référence pour le transport de personnes et de marchandises en ville.",
  },
  {
    id: "concept-urbain",
    name: "Édition Spéciale Funbike",
    brand: "Funbike",
    family: "Urbain",
    price: "Sur devis",
    alt: "Visuel moto édition spéciale Funbike",
    image:
      "https://funbike.mg/wp-content/uploads/2026/02/Gemini_Generated_Image_mmvxscmmvxscmmvx.png",
    specs: [{ label: "Série", value: "Limitée" }],
    desc: "Une série personnalisée par nos ateliers Funbike.",
  },
];

export type Part = { id: string; name: string; price: string; image: string; kind: "piece" | "tld" };

export const PARTS: Part[] = [
  {
    id: "p1",
    name: "Plaquettes de frein haute performance",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/837892549/740931563/square.jpg?1755178217",
  },
  {
    id: "p2",
    name: "Kit filtration & entretien",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/836248611/740931526/square.jpg?1755178209",
  },
  {
    id: "p3",
    name: "Disque de frein Galfer Wave",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/991698882/813387400/square.png?1771518029",
  },
  {
    id: "p4",
    name: "Consommables moteur d'origine",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/994718071/815908743/square.jpg?1772478723",
  },
  {
    id: "p5",
    name: "Kit chaîne renforcé",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/984148506/813386371/square.jpg?1771517753",
  },
  {
    id: "p6",
    name: "Pièce mécanique d'origine",
    price: "Sur devis",
    kind: "piece",
    image:
      "https://cdn-yotpo-images-production.yotpo.com/Product/561407269/468114750/square.jpg?1695292535",
  },
];

export const TLD: Part[] = [
  {
    id: "t1",
    name: "GP Pro Pulse – Black",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D2_GPPRO_PULSE_BLACK_01.jpg?v=1785777688&width=533",
  },
  {
    id: "t2",
    name: "GP Pro Slides – Gray",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D2_GPPRO_SLIDES_GRAY_01.jpg?v=1785777680&width=533",
  },
  {
    id: "t3",
    name: "GP Pro Slides – White/Blue",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D2_GPPRO_SLIDES_WHITE-BLUE_01.jpg?v=1785777567&width=533",
  },
  {
    id: "t4",
    name: "GP Pro Segment – Black",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D1_GPRO_SEGMENT_BLACK_01.jpg?v=1772821835&width=533",
  },
  {
    id: "t5",
    name: "GP Pro Segment – Red",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D1_GPRO_SEGMENT_RED_01.jpg?v=1772821827&width=533",
  },
  {
    id: "t6",
    name: "GP Pro Segment – Blue",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D1_GPRO_SEGMENT_BLUE_02.jpg?v=1773162422&width=533",
  },
  {
    id: "t7",
    name: "GP Pro Mono – Pumice",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M26D1_GPRO_MONO_PUMICE_02.jpg?v=1772821833&width=533",
  },
  {
    id: "t8",
    name: "GP Pro Fifty50 – White/Red",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/tld_m25d1_gpro_fifty50_whtred_02.jpg?v=1741872477&width=533",
  },
  {
    id: "t9",
    name: "GP Pro Crossover – Navy/Red",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M25D2_GPRO_CROSSOVER_NAVYRED_02_3ea31708-ad89-477c-aece-9ad1da19469b.jpg?v=1756291038&width=533",
  },
  {
    id: "t10",
    name: "GP Pro Trooper – Black/Caper",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/tld_m25d1_gpro_trooper_blkcaper_01.jpg?v=1747143175&width=533",
  },
  {
    id: "t11",
    name: "GP Pro Crossover – Gray/Yellow",
    price: "Sur devis",
    kind: "tld",
    image:
      "https://troyleedesigns.eu/cdn/shop/files/TLD_M25D2_GPRO_CROSSOVER_GRAYFLOYELLOW_01.jpg?v=1756290885&width=533",
  },
];
