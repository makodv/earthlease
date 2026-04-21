import type { OfferCategorySlug } from "@/lib/offerCategory";
import type { Locale } from "./nav";

export type CategoryContentBlock =
  | { kind: "notice"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

type CategoryEntry = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  blocks: CategoryContentBlock[];
};

/** FR matériel : pédagogie chantier + gamme KRENDL (repères sectoriels et fabricant). */
const frMaterielBlocks: CategoryContentBlock[] = [
  {
    kind: "notice",
    text: "EarthLease est une offre de location professionnelle (minimum 1 mois, sur devis). Les blocs ci-dessous s’appuient sur des sources publiques d’inspiration pour le vocabulaire chantier — Krendl France (https://krendl.fr/), Kiloutou rubrique souffleuses d’isolant (https://www.kiloutou.fr/c/souffleuse-isolant/), Belliard Matériaux machine à souffler (https://belliard-materiaux.fr/machine-a-souffler/) et la logique d’orientation client d’une agence type Loxam City Nation (https://agence.loxam.fr/986-loxam-city-nation) — sans affiliation commerciale.",
  },
  {
    kind: "h2",
    text: "À quoi sert une souffleuse d’isolant ?",
  },
  {
    kind: "p",
    text: "Comme le rappellent les spécialistes de la location d’outillage, une souffleuse d’isolant (souvent appelée machine à insuffler ou cardeuse) sert à projeter des matériaux isolants dans des espaces confinés — combles, cloisons, planchers — en combinant soufflage et agitation mécanique pour une répartition homogène. C’est un levier courant pour la rénovation et l’efficacité énergétique sur chantier.",
  },
  {
    kind: "h2",
    text: "Familles de machines KRENDL (repères catalogue type)",
  },
  {
    kind: "p",
    text: "La gamme KRENDL usuelle s’articule autour des références suivantes — nous les reprenons comme repères de devis (disponibilité et finition validées avec vous) :",
  },
  {
    kind: "ul",
    items: [
      "KRENDL 575 — 1 turbine — machine à souffler / cardeuse",
      "KRENDL 425 — 1 turbine",
      "KRENDL 575 — 2 turbines",
      "KRENDL 2300 — 2 turbines",
      "Aspirateur à isolant KRENDL GV230 — extracteur de fibres (à étudier en complément sur devis)",
    ],
  },
  {
    kind: "h3",
    text: "Sécurité, EPI et logistique chantier",
  },
  {
    kind: "p",
    text: "Sur le modèle des distributeurs matériaux qui louent des machines à souffler : prévoir les équipements de protection individuelle adaptés (gants, lunettes, masques, casque antibruit, etc.), vérifier l’accès au poste de travail et le véhicule de convoi (fourgon ou remorque selon poids et dimensions du kit). Longueur de tuyaux et consommables font partie des points à caler au devis.",
  },
  {
    kind: "h2",
    text: "Neuf ou occasion : quelle logique ?",
  },
  {
    kind: "p",
    text: "Neuf ou reconditionné : le neuf met l’accent sur des chaînes de soufflage récentes et une montée en cadence maîtrisée ; le reconditionné vise un rapport qualité-prix fort, avec contrôles et préparation avant mise en route. Chez EarthLease, la location permet de tester ou de couvrir un pic d’activité sans investissement immobilier.",
  },
  {
    kind: "h2",
    text: "Cardeuses souffleuses (neuve & occasion) — détail technique",
  },
  {
    kind: "p",
    text: "EarthLease propose la location de cardeuses souffleuses pour l’ouate de cellulose et les laines minérales. Nous dimensionnons machine, accessoires et durée avec vous sur devis, pour un rapport performance / coût adapté à votre chantier.",
  },
  {
    kind: "p",
    text: "Nous fournissons également les accessoires pour cardeuse et souffleuse toutes marques.",
  },
  {
    kind: "p",
    text: "Nouveau ! Vous avez désormais la possibilité de louer une cardeuse pour vous dépanner ou tester nos machines, à la semaine ou au mois. Une solution pratique, économique et flexible pour répondre à vos besoins ponctuels ou découvrir notre matériel avant achat !",
  },
  {
    kind: "h3",
    text: "Machine KRENDL",
  },
  {
    kind: "ul",
    items: [
      "MACHINES d’isolation pour le soufflage de la OUATE et des isolants en vrac ainsi que tous leurs accessoires.",
      "En partenariat avec le constructeur américain KRENDL, nous vous proposons leurs machines d’isolation d’excellente qualité pour souffler et injecter la ouate de cellulose et tous les isolants en vrac.",
      "Toutes nos machines d’isolation bénéficient des garanties constructeur et du SAV rapide en France. L’entretien régulier est également possible.",
      "Nous pouvons vous fournir rapidement des pièces détachées pour machines KRENDL et autres marques et de nombreux accessoires : tuyaux, buses, raccords, réducteurs, filtres, turbines, pales, etc.",
    ],
  },
  {
    kind: "h3",
    text: "Nos cardeuses d’occasion",
  },
  {
    kind: "ul",
    items: [
      "3 Krendl 475 nouveau modèle 45m de tuyaux et télécommande filaire à 6990€ HT franco reconditionnée et garantie.",
      "Krendl 575 2 turbines reconditionnées et garanties avec 45m de tuyaux et télécommande filaire + télécommande sans fil à 9090€ HT. La Krendl 575 double turbine assure le niveau de production le plus élevé dans sa catégorie, et ce pour tout type d’isolant : ouate de cellulose, laine de verre, laine de roche, fibre de bois, liège en granulés.",
      "Plusieurs Krendl 575 1 turbine reconditionnées et garanties avec 45m de tuyaux et télécommande filaire + télécommande sans fil à 7490€ HT.",
    ],
  },
  {
    kind: "p",
    text: "Toutes nos machines d’isolation bénéficient des garanties constructeur et du SAV rapide en France. L’entretien régulier est également possible.",
  },
  {
    kind: "p",
    text: "Toutes nos occasions sont reconditionnées et garanties 2 ans. Les pieces d’usure sont changées, l’entretien est réalisé, les tuyaux son neufs, la peinture est refaite, machine en parfait état de marche pour longtemps.",
  },
  {
    kind: "h2",
    text: "Des cardeuses souffleuses de grandes marques, au meilleur prix, en direct du fabricant Krendl",
  },
  {
    kind: "h3",
    text: "KRENDL 425 — Cardeuses KRENDL 425",
  },
  {
    kind: "ul",
    items: [
      "Machine puissante, légère, économique.",
      "Idéale pour la location, entretien minimum pour soufflage et insufflation de la ouate et des laines minérales",
      "Même moteur puissant que la 575",
      "Débit laine de verre 91 kg /heure",
      "Ouate de cellulose 499 kg/h",
      "Poids 97 kg",
      "Démontable pour transport",
    ],
  },
  {
    kind: "h3",
    text: "KRENDL 575 – 1 ou 2 turbines — Cardeuses KRENDL 575 2 turbines",
  },
  {
    kind: "p",
    text: "La rolls des cardeuses transportables",
  },
  {
    kind: "ul",
    items: [
      "Très puissante et rapide pour soufflage et insufflation de ouate de cellulose et laines minérales",
      "Débit pour ouate de cellulose : 1179 – 1270 kg / h",
      "Débit pour fibre de verre : 363 – 454 kg / h",
      "Chargement facilité par un système à basculement",
      "Cardeuse la plus légère dans sa catégorie",
      "Télécommande filaire et sans fil",
    ],
  },
  {
    kind: "ul",
    items: [
      "La Krendl 575 double turbine assure le niveau de production le plus élevé dans sa catégorie, et ce pour tout type d’isolant : ouate de cellulose, laine de verre, laine de roche, fibre de bois, liège en granulés..",
      "Conçue pour les professionnels, cette cardeuse-souffleuse se démarque de la concurrence par ses performances et sa longévité, la Krendl 575 possède 2 turbines et est sur roues avec poignée et système à basculement pour faciliter le chargement.",
      "La krendl 575 2 turbines vous permettra plusieurs applications, le soufflage bien évidemment mais aussi l’insufflation en murs et rampants et aussi la projection humide en ouate de cellulose.",
      "Cardeuse la plus compacte de sa catégorie.",
      "Panneau de commande électrique simple d’utilisation.",
      "Écran de protection en plexiglass transparent pour faciliter le contrôle et l’entretien.",
      "Compartiment à outils intégré.",
      "Kit comprenant 45 mètres de tuyaux en 76mm, une télécommande filaire et une télécommande sans-fil, garantie 2 ans.",
    ],
  },
  {
    kind: "h3",
    text: "KRENDL 2300 – 2 turbines — Cardeuses KRENDL 2300 – 2 turbines",
  },
  {
    kind: "ul",
    items: [
      "Débit pour ouate de cellulose : 1360 kg / h",
      "Débit pour fibre de verre : 454 kg / h",
    ],
  },
  {
    kind: "p",
    text: "D’autres modèles plus puissants sont aussi disponibles, n’hésitez pas à nous contacter pour en savoir plus. Nous pouvons organiser, pour ceux qui investissent dans une machine KRENDL, une formation gratuite chez vous avec l’accompagnement EarthLease™ sur vos isolants en vrac.",
  },
];

const enMaterielBlocks: CategoryContentBlock[] = [
  {
    kind: "notice",
    text: "EarthLease is a professional rental offer (minimum one month, on quotation). Content below draws on public pages for tone and education — Krendl France (https://krendl.fr/), Kiloutou insulation blowers (https://www.kiloutou.fr/c/souffleuse-isolant/), Belliard Matériaux (https://belliard-materiaux.fr/machine-a-souffler/) and agency-style guidance similar to Loxam City Nation (https://agence.loxam.fr/986-loxam-city-nation). No commercial affiliation.",
  },
  {
    kind: "h2",
    text: "What is an insulation blower?",
  },
  {
    kind: "p",
    text: "Insulation blowers (also called dense-pack / blowing rigs) project loose-fill insulation into confined spaces — lofts, partitions, floors — combining airflow and mechanical agitation for even coverage. They are widely used in renovation and energy-efficiency jobs.",
  },
  {
    kind: "h2",
    text: "KRENDL model families (reference list)",
  },
  {
    kind: "ul",
    items: [
      "KRENDL 575 — 1 turbine — blowing machine / blower",
      "KRENDL 425 — 1 turbine",
      "KRENDL 575 — 2 turbines",
      "KRENDL 2300 — 2 turbines",
      "KRENDL GV230 insulation vacuum — fibre extractor (optional add-on on quote)",
    ],
  },
  {
    kind: "h3",
    text: "Site safety, PPE and logistics",
  },
  {
    kind: "p",
    text: "Following good practice from equipment-hire pages: use suitable PPE (gloves, goggles, masks, hearing protection), check site access and transport (van or trailer depending on weight/size). Hose runs and consumables are agreed on the quote.",
  },
  {
    kind: "h2",
    text: "New vs refurbished — how we talk about it",
  },
  {
    kind: "p",
    text: "In line with distributor messaging: new units stress up-to-date blowing trains and controlled throughput; refurbished stock targets value with inspection and preparation. Rental with EarthLease covers peaks or trials without capital outlay.",
  },
  {
    kind: "h2",
    text: "KRENDL blowing machines (new & used) — technical detail",
  },
  {
    kind: "p",
    text: "Insulation blowing machines for blown cellulose and mineral wools. EarthLease focuses on rental of KRENDL-class equipment, with quotes tailored to your site.",
  },
  {
    kind: "h3",
    text: "KRENDL machine line",
  },
  {
    kind: "ul",
    items: [
      "Insulation machines for blowing cellulose wool and loose-fill insulants, with accessories.",
      "Partnership with US manufacturer KRENDL: machines to blow and inject cellulose and all loose-fill types.",
      "Manufacturer warranty and fast after-sales in France; regular servicing possible.",
      "Spare parts and accessories: hoses, nozzles, fittings, reducers, filters, turbines, paddles, etc.",
    ],
  },
  {
    kind: "h3",
    text: "KRENDL 425 — compact range",
  },
  {
    kind: "ul",
    items: [
      "Powerful, light, economical; ideal for rental with minimal upkeep for blowing and dense-packing wool and mineral wool.",
      "Same powerful motor as the 575.",
      "Glass wool output 91 kg/h; cellulose 499 kg/h; weight 97 kg; splits for transport.",
    ],
  },
  {
    kind: "h3",
    text: "KRENDL 575 — 1 or 2 turbines",
  },
  {
    kind: "ul",
    items: [
      "High-output portable blowing: cellulose 1179–1270 kg/h; glass wool fibre 363–454 kg/h.",
      "Tilting load system; wired + wireless remote; tool compartment; 45 m hose kit in 76 mm; 2-year warranty on kit (typical KRENDL configuration).",
      "575 twin-turbine: top throughput in class for cellulose, glass wool, rock wool, wood fibre, granulated cork; dense-pack walls and roof slopes; wet spray cellulose applications.",
    ],
  },
  {
    kind: "h3",
    text: "KRENDL 2300 — twin turbine",
  },
  {
    kind: "ul",
    items: [
      "Cellulose output 1360 kg/h; glass wool fibre 454 kg/h (typical published KRENDL throughput figures).",
      "More powerful variants available on request; optional on-site training with EarthLease™ for loose-fill installation.",
    ],
  },
  {
    kind: "p",
    text: "Reconditioned machines on the market are often sold with a multi-year warranty; EarthLease rental stock and pricing are confirmed individually on quotation.",
  },
];

export const categoryPagesTranslations: Record<Locale, Record<OfferCategorySlug, CategoryEntry>> = {
  fr: {
    materiel: {
      metaTitle: "Location cardeuses souffleuses KRENDL | EarthLease",
      metaDescription:
        "Souffleuses d’isolant, gamme KRENDL (425, 575, 2300, GV230), repères sectoriels. Location min. 1 mois, devis EarthLease.",
      title: "Matériel — cardeuses souffleuses KRENDL",
      blocks: frMaterielBlocks,
    },
    utilitaires: {
      metaTitle: "Location utilitaires | EarthLease",
      metaDescription:
        "Fourgons professionnels : volumes de charge, empattements et motorisations selon stock. Minimum 1 mois, sur devis.",
      title: "Véhicules utilitaires",
      blocks: [
        {
          kind: "p",
          text: "EarthLease met à disposition des fourgons pour livraisons, équipes terrain ou renfort de flotte courte durée. Pas de catalogue filtrable : nous validons cabine (ex. cab approfondie), longueur L2/L3/L4, hauteur H1/H2 et charge utile avec vous au devis.",
        },
        {
          kind: "p",
          text: "Sur le modèle d’une agence location BTP (type Loxam : accueil, orientation vers la bonne formule courte ou longue durée), nous restons focalisés sur le fourgon ; pour d’autres familles d’équipement (nacelle, groupe, compactage…), nous pouvons vous orienter vers des spécialistes en parallèle de votre devis utilitaire.",
        },
        {
          kind: "h3",
          text: "Ce que nous dimensionnons avec vous",
        },
        {
          kind: "ul",
          items: [
            "Volume et hauteur intérieure (chargement palettes, rayonnages mobiles).",
            "Motorisation et boîte (manuelle / automatique) selon disponibilité.",
            "Options type hayon, portes latérales, cloison — selon parc.",
            "Durée et kilométrage inclus dans la formule de location.",
          ],
        },
        {
          kind: "p",
          text: "Les fiches et visuels sur le site sont indicatifs ; la référence exacte est confirmée par un commercial.",
        },
      ],
    },
    tourisme: {
      metaTitle: "Location tourisme électrique & hybride | EarthLease",
      metaDescription:
        "Citadines, berlines et SUV : motorisations électriques ou hybrides uniquement. Minimum 1 mois, sur devis.",
      title: "Voitures tourisme — électrique & hybride",
      blocks: [
        {
          kind: "p",
          text: "Pour tout véhicule tourisme (hors utilitaire), EarthLease ne propose que des motorisations électriques ou hybrides (rechargeable ou hybride classique selon stock).",
        },
        {
          kind: "p",
          text: "Dans l’esprit des offres « hybrides & électriques » pour professionnels (ex. Clicar VTC : https://clicar.fr/vtc) et des fiches détaillées mandataires (kilométrage, finition, motorisation comme sur https://www.auto-ies.com/ ou https://www.aramisauto.com/achat/), nous construisons une proposition claire : usage urbain ou longue distance, nombre de places, niveau d’équipement — le tout validé au devis, sans stock catalogue temps réel sur le site.",
        },
        {
          kind: "h3",
          text: "Préciser dans le devis",
        },
        {
          kind: "ul",
          items: [
            "Type d’hybride souhaité (rechargeable / non rechargeable) ou 100 % électrique.",
            "Catégorie véhicule (citadine, berline, SUV) et nombre de places.",
            "Durée de location et kilométrage estimé.",
          ],
        },
        {
          kind: "p",
          text: "Les photos et exemples sur le site ne constituent pas un stock temps réel ; l’offre est ajustée avec vous.",
        },
      ],
    },
    "deux-roues": {
      metaTitle: "Location deux-roues | EarthLease",
      metaDescription:
        "Vélos, trottinettes ou cargo : liste modèles à préciser au devis. Minimum 1 mois.",
      title: "Deux-roues",
      blocks: [
        {
          kind: "p",
          text: "Gamme deux-roues en construction sur le site : vélos, trottinettes électriques ou solutions cargo. Décrivez l’usage (urbain, livraison, équipe) et la autonomie souhaitée dans le formulaire de devis.",
        },
        {
          kind: "p",
          text: "Pour les flottes ou usages intensifs, on peut s’inspirer des formules « tout compris » vues chez des loueurs spécialisés (kilométrage, entretien, assurance selon contrat) : chez EarthLease la mensualité et les services inclus sont toujours explicités au devis, avec un minimum d’un mois.",
        },
        {
          kind: "h3",
          text: "Éléments utiles au devis",
        },
        {
          kind: "ul",
          items: [
            "Type de véhicule (VAE, cargo longtail, triporteur, trottinette).",
            "Charge utile ou enfants à transporter le cas échéant.",
            "Accessoires : sacoche, antivol, casque — selon disponibilité.",
          ],
        },
        {
          kind: "p",
          text: "La liste des références sera publiée ici ; en attendant, le commercial vous répond avec une proposition chiffrée.",
        },
      ],
    },
  },
  en: {
    materiel: {
      metaTitle: "KRENDL blowing machine rental | EarthLease",
      metaDescription:
        "KRENDL 425, 575 (single or twin turbine), 2300 — technical summary from public manufacturer references. Minimum 1 month on quote.",
      title: "Equipment — KRENDL blowing machines",
      blocks: enMaterielBlocks,
    },
    utilitaires: {
      metaTitle: "Commercial van rental | EarthLease",
      metaDescription:
        "Panel vans for deliveries and crews. Wheelbase, roof height and payload confirmed on quote. Minimum 1 month.",
      title: "Commercial vans",
      blocks: [
        {
          kind: "p",
          text: "EarthLease supplies vans for deliveries, field teams or short-term fleet cover. There is no filterable catalogue: we confirm cab type (e.g. deep cab), L2/L3/L4 length, H1/H2 height and payload with you on the quote.",
        },
        {
          kind: "p",
          text: "Like a professional hire branch (see e.g. Loxam City Nation at https://agence.loxam.fr/986-loxam-city-nation), we focus on matching duration and payload to your job. For other equipment families (access, power, compaction), we can point you to specialist partners alongside the van quote.",
        },
        {
          kind: "h3",
          text: "What we align on the quote",
        },
        {
          kind: "ul",
          items: [
            "Cargo volume and interior height (pallets, racking).",
            "Powertrain and gearbox (manual / automatic) subject to stock.",
            "Options such as tail lift, side doors, partition — subject to fleet.",
            "Rental term and mileage included in the plan.",
          ],
        },
        {
          kind: "p",
          text: "Detail pages and visuals are indicative; the exact unit is confirmed by our sales team.",
        },
      ],
    },
    tourisme: {
      metaTitle: "Electric & hybrid passenger car rental | EarthLease",
      metaDescription:
        "City cars, saloons and SUVs: electric or hybrid only. Minimum 1 month on quote.",
      title: "Passenger cars — electric & hybrid",
      blocks: [
        {
          kind: "p",
          text: "For passenger cars (non-van), EarthLease only offers electric or hybrid powertrains (plug-in or non-plug-in hybrid depending on stock).",
        },
        {
          kind: "p",
          text: "We aim for the clarity of modern EV/hybrid listings (e.g. Clicar-style hybrid & electric fleet pages, or detailed sheets on broker sites such as https://www.auto-ies.com/ and https://www.aramisauto.com/achat/): usage, seats, trim and mileage are confirmed on quotation; website photos are illustrative.",
        },
        {
          kind: "h3",
          text: "Please state on the quote",
        },
        {
          kind: "ul",
          items: [
            "Hybrid type (plug-in / non-plug-in) or full battery electric.",
            "Vehicle style (city car, saloon, SUV) and seat count.",
            "Rental duration and expected mileage.",
          ],
        },
        {
          kind: "p",
          text: "Photos and examples on the site are not live stock; the offer is refined with you.",
        },
      ],
    },
    "deux-roues": {
      metaTitle: "Two-wheeler rental | EarthLease",
      metaDescription:
        "Bikes, e-scooters or cargo builds — model list to be agreed on quote. Minimum 1 month.",
      title: "Two-wheelers",
      blocks: [
        {
          kind: "p",
          text: "Our two-wheeler range is still being published: bikes, e-scooters or cargo solutions. Describe the use case (urban, delivery, crew) and desired range in the quote form.",
        },
        {
          kind: "p",
          text: "For fleets, all-in style packages (mileage, maintenance, insurance) can be discussed like specialist operators; EarthLease spells out what is included from the first month upwards.",
        },
        {
          kind: "h3",
          text: "Useful details for a quote",
        },
        {
          kind: "ul",
          items: [
            "Vehicle type (e-bike, longtail cargo, trike, e-scooter).",
            "Payload or child-carrying needs if any.",
            "Accessories: bags, lock, helmet — subject to availability.",
          ],
        },
        {
          kind: "p",
          text: "A model list will appear here; until then, our team replies with a priced proposal.",
        },
      ],
    },
  },
};
