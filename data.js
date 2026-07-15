// ============================================================
//  SUSHI NETA — Données de l'encyclopédie
// ------------------------------------------------------------
//  Pour ajouter une espèce : copier un bloc { ... }, et placer
//  les images dans  images/poissons/<id>.jpg  et
//  images/nigiris/<id>.jpg  (le champ "id" sert de nom de fichier).
//  Si une image manque, le site affiche automatiquement le kanji.
// ============================================================

const CATEGORIES = {
  thon:        "Thons & poissons rouges",
  saumon:      "Saumons & truites",
  gras:        "Poissons à chair grasse",
  hikarimono:  "Hikarimono (poissons brillants)",
  shiromi:     "Shiromi (poissons blancs)",
  anguille:    "Anguilles",
  crustace:    "Crustacés",
  coquillage:  "Coquillages",
  cephalopode: "Céphalopodes",
  oeufs:       "Œufs & oursin",
  maki:        "Maki classiques",
  autre:       "Autres"
};

const NETA = [

  // ---------- THONS & POISSONS ROUGES ----------
  {
    id: "maguro", kanji: "鮪", romaji: "Maguro (akami)",
    fr: "Thon rouge (chair maigre)", en: "Bluefin tuna (lean)",
    cat: "thon",
    gout: "La partie maigre du thon rouge, d'un rouge rubis profond. Saveur franche et légèrement ferreuse, presque carnée, avec une acidité délicate. Texture dense, lisse et fondante, c'est le neta de référence dans tout sushi-ya.",
    regions: ["Ōma (Aomori) — le thon le plus prisé du Japon, pêché à la ligne", "Détroit de Tsugaru et côte de Sanriku", "Méditerranée et golfe de Gascogne", "Atlantique nord (Boston, Irlande)"]
  },
  {
    id: "chutoro", kanji: "中トロ", romaji: "Chūtoro",
    fr: "Thon mi-gras", en: "Medium fatty tuna",
    cat: "thon",
    gout: "Prélevé entre le dos et le ventre du thon, le chūtoro marie la profondeur de l'akami et le gras de l'ōtoro. Équilibre remarquable entre saveur de viande rouge et douceur beurrée ; beaucoup d'amateurs le considèrent comme la coupe idéale.",
    regions: ["Ōma et détroit de Tsugaru (Aomori)", "Katsuura (Wakayama)", "Thons d'Atlantique et de Méditerranée"]
  },
  {
    id: "otoro", kanji: "大トロ", romaji: "Ōtoro",
    fr: "Thon très gras (ventre)", en: "Fatty tuna belly",
    cat: "thon",
    gout: "La partie la plus grasse du ventre, marbrée comme un bœuf wagyu. Fond littéralement sur la langue en libérant une richesse beurrée et umami, presque sucrée. Une bouchée opulente, à réserver en fin de repas pour ne pas saturer le palais.",
    regions: ["Thons hivernaux d'Ōma (Aomori)", "Toi (Hokkaidō)", "Méditerranée (Espagne, Malte) — thons d'engraissement"]
  },
  {
    id: "katsuo", kanji: "鰹", romaji: "Katsuo",
    fr: "Bonite à ventre rayé", en: "Skipjack tuna",
    cat: "thon",
    gout: "Chair rouge sombre au goût prononcé, plus rustique que le thon. Servie traditionnellement en tataki (saisie à la flamme de paille) avec gingembre, ail et ciboule qui équilibrent son caractère. Deux saisons : la bonite de printemps, légère, et celle d'automne, grasse et profonde.",
    regions: ["Kōchi (Shikoku) — capitale historique du katsuo", "Kyūshū et Sanriku selon la migration", "Pacifique ouest tropical"]
  },
  {
    id: "sake", kanji: "鮭", romaji: "Sāmon / Sake",
    fr: "Saumon", en: "Salmon",
    cat: "saumon",
    gout: "Chair orange, grasse, douce et fondante, sans amertume : la porte d'entrée idéale dans l'univers du sushi. Le saumon servi cru est presque toujours d'élevage, sélectionné pour sa richesse en gras. Délicieux aussi légèrement snacké au chalumeau (aburi).",
    regions: ["Norvège — le principal fournisseur des sushi-ya", "Chili et Écosse (élevage)", "Hokkaidō — saumons sauvages du Pacifique (plutôt cuits ou marinés)"]
  },

  {
    id: "mebachi", kanji: "目鉢", romaji: "Mebachi maguro",
    fr: "Thon obèse", en: "Bigeye tuna",
    cat: "thon",
    gout: "Le thon « aux gros yeux », le plus consommé au Japon au quotidien : chair d'un rouge franc, équilibrée, à l'acidité nette et à l'umami solide, moins grasse que le thon rouge. C'est très souvent lui derrière le « maguro » des poissonneries et des bons kaiten-zushi.",
    regions: ["Ports de Misaki (Kanagawa) et Kesennuma (Miyagi)", "Pacifique et océan Indien (pêche palangrière)", "Meilleur en automne-hiver"]
  },
  {
    id: "kihada", kanji: "黄肌", romaji: "Kihada maguro",
    fr: "Albacore (thon jaune)", en: "Yellowfin tuna",
    cat: "thon",
    gout: "Chair rosée claire, ferme et maigre, au goût léger et propre, moins profond que le thon rouge. Thon des mers chaudes, très populaire dans l'ouest du Japon où l'on apprécie justement sa fraîcheur sans gras.",
    regions: ["Kyūshū et mer de Chine orientale", "Pacifique tropical et océan Indien", "Très apprécié dans le Kansai"]
  },
  {
    id: "bincho", kanji: "鬢長", romaji: "Binchō maguro",
    fr: "Thon blanc (germon)", en: "Albacore",
    cat: "thon",
    gout: "Le thon blanc à longues nageoires : chair rose pâle, tendre, au gras léger et doux. Longtemps réservé à la conserve, il s'est imposé dans les kaiten-zushi, notamment en version « bintoro » bien grasse et fondante.",
    regions: ["Pacifique au large de Sanriku et Kesennuma (Miyagi)", "Yaizu (Shizuoka)", "Pêche à la ligne de l'été à l'automne"]
  },
  {
    id: "mekajiki", kanji: "眼梶木", romaji: "Mekajiki",
    fr: "Espadon", en: "Swordfish",
    cat: "thon",
    gout: "Chair rose ivoire, dense et grasse, presque beurrée, au goût doux. Longtemps cantonné à la cuisson, l'espadon s'invite en sushi dans ses régions de pêche, parfois en aburi, où son gras évoque un toro abordable.",
    regions: ["Kesennuma (Miyagi) — premier port d'espadon du Japon", "Pacifique nord-ouest", "Meilleur en hiver"]
  },

  {
    id: "mejimaguro", kanji: "メジ鮪", romaji: "Meji maguro",
    fr: "Jeune thon rouge du Pacifique", en: "Juvenile Pacific bluefin tuna",
    cat: "thon",
    gout: "Le thon rouge avant l'âge adulte : chair tendre et délicate, bien moins grasse, d'une fraîcheur légère presque herbacée. Un avant-goût élégant du grand maguro, apprécié en début de saison.",
    regions: ["Baie de Sagami et péninsule d'Izu", "Ports du Pacifique (Shizuoka)", "Été-automne"]
  },
  {
    id: "minamimaguro", kanji: "南鮪", romaji: "Minami maguro",
    fr: "Thon rouge du sud", en: "Southern bluefin tuna",
    cat: "thon",
    gout: "Le troisième grand thon rouge : chair d'un rouge intense, acidulée et profonde, au toro abondant. C'est le chouchou historique des sushi-ya du Kansai, qui le préfèrent parfois au kuro maguro.",
    regions: ["Océan Austral (Australie, Nouvelle-Zélande)", "Engraissement à Port Lincoln (Australie)", "Très prisé à Ōsaka"]
  },
  {
    id: "makajiki", kanji: "真梶木", romaji: "Makajiki",
    fr: "Marlin rayé", en: "Striped marlin",
    cat: "thon",
    gout: "Plus fin que l'espadon : chair rosé-orangé, ferme et élégante, au gras discret, que les connaisseurs du Tōhoku placent très haut en hiver. Un neta de région injustement méconnu.",
    regions: ["Kesennuma et Sanriku (Miyagi)", "Pacifique nord-ouest", "Meilleur en hiver"]
  },
  {
    id: "suma", kanji: "スマ", romaji: "Suma",
    fr: "Thonine orientale", en: "Kawakawa (mackerel tuna)",
    cat: "thon",
    gout: "Petit thon rare des mers chaudes, surnommé « le thon entier toro » en élevage tant son gras est réparti : chair dense, riche, entre bonite et thon rouge. Une étoile montante de l'aquaculture japonaise.",
    regions: ["Élevages d'Ehime et Wakayama", "Mers chaudes du sud du Japon", "Automne-hiver"]
  },
  {
    id: "hirasoda", kanji: "平宗太", romaji: "Hirasōda",
    fr: "Auxide (thonine frégate)", en: "Frigate tuna",
    cat: "thon",
    gout: "Cousine rustique de la bonite, à consommer d'une fraîcheur absolue : chair rouge sombre au goût puissant et ferreux, adorée des amateurs de sensations franches. Un neta d'automne des côtes du Pacifique.",
    regions: ["Péninsule d'Izu et baie de Sagami", "Kōchi (Shikoku)", "Automne"]
  },
  {
    id: "hagatsuo", kanji: "歯鰹", romaji: "Hagatsuo",
    fr: "Bonite à dos rayé", en: "Striped bonito",
    cat: "thon",
    gout: "Plus fine et plus douce que le katsuo : chair claire, tendre, au gras léger et au parfum élégant, souvent servie peau snackée. Les initiés la guettent à l'automne.",
    regions: ["Baie de Suruga (Shizuoka)", "Kyūshū", "Automne"]
  },
  {
    id: "kamatoro", kanji: "カマトロ", romaji: "Kamatoro",
    fr: "Toro du collier", en: "Collar fatty tuna",
    cat: "thon",
    gout: "La partie la plus persillée du thon, cachée derrière les ouïes — deux morceaux par poisson seulement. Encore plus marbrée que l'ōtoro, elle fond instantanément en libérant une richesse presque excessive. Le sommet de la démesure.",
    regions: ["Issue des grands thons d'Ōma et de Méditerranée", "Rarissime : demandez au chef"]
  },

  // ---------- SAUMONS & TRUITES ----------
  {
    id: "masunosuke", kanji: "鱒の介", romaji: "Masunosuke",
    fr: "Saumon royal (chinook)", en: "King salmon",
    cat: "saumon",
    gout: "Le plus grand et le plus gras des saumons du Pacifique : chair opulente, fondante, d'une richesse beurrée majestueuse. Rare au Japon, où sa capture est un événement.",
    regions: ["Hokkaidō et Sanriku (prises rares)", "Alaska", "Élevage en Nouvelle-Zélande"]
  },
  {
    id: "tokishirazu", kanji: "時知らず", romaji: "Tokishirazu",
    fr: "Kéta hors-saison", en: "Off-season chum salmon",
    cat: "saumon",
    gout: "Le kéta « qui ignore sa saison » : pêché au printemps-été, loin de la ponte, il a gardé tout son gras — chair juteuse, fine et riche, incomparablement supérieure au kéta d'automne.",
    regions: ["Nemuro et Kushiro (Hokkaidō)", "Mai à juillet"]
  },
  {
    id: "keiji", kanji: "鮭児", romaji: "Keiji",
    fr: "Keiji (kéta juvénile)", en: "Young chum salmon (keiji)",
    cat: "saumon",
    gout: "Le saumon mythique : un kéta immature sur dix mille, au gras extraordinaire diffusé dans toute la chair, fondant à l'extrême. Prix astronomiques et files d'attente à chaque automne.",
    regions: ["Shiretoko et Abashiri (Hokkaidō)", "Automne — pêche minuscule"]
  },
  {
    id: "ginzake", kanji: "銀鮭", romaji: "Ginzake",
    fr: "Saumon argenté (coho)", en: "Coho salmon",
    cat: "saumon",
    gout: "Le saumon d'élevage de Miyagi : chair orange équilibrée, plus légère et plus fraîche que l'atlantique, au gras net. Fierté aquacole du Sanriku.",
    regions: ["Baies du Sanriku (Miyagi) — élevage", "Chili (importation)"]
  },
  {
    id: "benizake", kanji: "紅鮭", romaji: "Benizake",
    fr: "Saumon rouge (sockeye)", en: "Sockeye salmon",
    cat: "saumon",
    gout: "Chair d'un rouge écarlate, dense et musclée, au goût de saumon le plus prononcé de tous. Sauvage, donc servi cru uniquement après congélation ; souvent légèrement salé ou fumé.",
    regions: ["Alaska et Colombie-Britannique", "Russie (Kamtchatka)", "Prises rares à Hokkaidō"]
  },
  {
    id: "sakuramasu", kanji: "桜鱒", romaji: "Sakuramasu",
    fr: "Saumon masou (sakura)", en: "Cherry salmon",
    cat: "saumon",
    gout: "Le saumon des cerisiers, remonté au printemps : chair rose tendre, extraordinairement fine et grasse, considérée par beaucoup comme la plus raffinée des salmonidés. Star du masu-zushi de Toyama.",
    regions: ["Mer du Japon (Aomori, Yamagata)", "Toyama — tradition du masu-zushi", "Printemps"]
  },
  {
    id: "nijimasu", kanji: "虹鱒", romaji: "Nijimasu",
    fr: "Truite arc-en-ciel", en: "Rainbow trout",
    cat: "saumon",
    gout: "La truite d'élevage à la chair orange douce et tendre, souvent commercialisée en « trout salmon » marin. Standard honnête des kaiten-zushi, avec de belles versions premium locales.",
    regions: ["Élevages de Shizuoka et Nagano", "Élevages marins du Chili"]
  },
  {
    id: "steelhead", kanji: "スチールヘッド", romaji: "Steelhead",
    fr: "Truite arc-en-ciel de mer", en: "Steelhead trout",
    cat: "saumon",
    gout: "La forme marine de la truite arc-en-ciel, élevée en mer : chair orange soutenu, grasse et souple, très proche du saumon atlantique avec une pointe de fraîcheur en plus.",
    regions: ["Élevages marins du Chili", "Norvège et Danemark"]
  },
  {
    id: "himemasu", kanji: "姫鱒", romaji: "Himemasu",
    fr: "Kokani (sockeye lacustre)", en: "Kokanee salmon",
    cat: "saumon",
    gout: "La « princesse truite » : forme lacustre du saumon rouge, petite chair vermillon délicate, fine et discrètement grasse. Une gourmandise d'été des lacs du nord.",
    regions: ["Lac Shikotsu (Hokkaidō)", "Lac Towada (Aomori)", "Été"]
  },
  {
    id: "biwamasu", kanji: "琵琶鱒", romaji: "Biwamasu",
    fr: "Truite du lac Biwa", en: "Biwa trout",
    cat: "saumon",
    gout: "Endémique du plus grand lac du Japon : chair saumonée fondante, subtilement grasse et sans aucune lourdeur. Un trésor local de Shiga que l'on goûte rarement ailleurs.",
    regions: ["Lac Biwa (Shiga) — espèce endémique", "Été"]
  },

  // ---------- POISSONS À CHAIR GRASSE ----------
  {
    id: "hamachi", kanji: "魬", romaji: "Hamachi",
    fr: "Sériole jeune (élevage)", en: "Young yellowtail",
    cat: "gras",
    gout: "Sériole d'élevage récoltée jeune : chair ivoire rosé, grasse, souple et fondante, au goût doux légèrement lacté. Sa richesse constante toute l'année en fait l'un des neta les plus populaires hors du Japon.",
    regions: ["Kagoshima et Ehime — grandes zones d'aquaculture", "Mer intérieure de Seto", "Kyūshū"]
  },
  {
    id: "buri", kanji: "鰤", romaji: "Buri",
    fr: "Sériole du Japon (adulte)", en: "Adult yellowtail",
    cat: "gras",
    gout: "La même espèce que le hamachi, mais sauvage et adulte. En hiver, le « kan-buri » engraisse pour la migration : chair puissante, très grasse, au goût profond et légèrement fumé. Un incontournable de la saison froide au Japon.",
    regions: ["Himi (Toyama) — le kan-buri le plus réputé", "Sado (Niigata) et mer du Japon", "Hokuriku en hiver"]
  },
  {
    id: "kanpachi", kanji: "間八", romaji: "Kanpachi",
    fr: "Sériole couronnée", en: "Greater amberjack",
    cat: "gras",
    gout: "Cousine plus élégante du hamachi : chair translucide, plus ferme et croquante, moins grasse, avec une saveur nette et raffinée. Son équilibre entre texture et douceur en fait un favori des connaisseurs en été.",
    regions: ["Kagoshima — première zone de production", "Kyūshū et Shikoku", "Izu et Ogasawara pour le sauvage"]
  },
  {
    id: "shimaaji", kanji: "縞鯵", romaji: "Shima-aji",
    fr: "Carangue dentue", en: "Striped jack / White trevally",
    cat: "gras",
    gout: "Considéré comme le sommet des poissons « aji » : chair nacrée aux reflets rosés, ferme et croquante, gras élégant et umami intense. Le sauvage de grande taille atteint des prix considérables dans les grands comptoirs de Tokyo.",
    regions: ["Îles d'Izu et Ogasawara (sauvage)", "Kyūshū (élevage de qualité)", "Mer intérieure de Seto"]
  },

  {
    id: "hiramasa", kanji: "平政", romaji: "Hiramasa",
    fr: "Sériole chicard", en: "Yellowtail amberjack",
    cat: "gras",
    gout: "La plus élégante des trois grandes sérioles : chair claire, ferme et croquante, moins grasse que le buri, d'une netteté remarquable. Poisson d'été rapide et musclé, apprécié des connaisseurs pour sa mâche.",
    regions: ["Kyūshū (Nagasaki, Kagoshima)", "Mer du Japon", "Pleine saison en été"]
  },

  // ---------- HIKARIMONO ----------
  {
    id: "saba", kanji: "鯖", romaji: "Saba",
    fr: "Maquereau", en: "Mackerel",
    cat: "hikarimono",
    gout: "Poisson bleu par excellence : chair grasse, juteuse, au goût iodé affirmé. Très périssable, il est presque toujours travaillé (salé puis vinaigré) avant d'être servi. Les maquereaux d'automne et d'hiver, gorgés de gras, sont les meilleurs.",
    regions: ["Seki (Ōita) — le légendaire seki-saba pêché à la ligne", "Matsuwa (Kanagawa)", "Norvège — maquereaux gras d'importation"]
  },
  {
    id: "shimesaba", kanji: "締め鯖", romaji: "Shime-saba",
    fr: "Maquereau mariné au vinaigre", en: "Vinegar-cured mackerel",
    cat: "hikarimono",
    gout: "Maquereau salé puis mariné au vinaigre de riz : la chair blanchit en surface, se raffermit et gagne une acidité élégante qui dompte le gras. L'équilibre sel-vinaigre est une signature de chaque chef. Sublime avec un trait de gingembre.",
    regions: ["Préparation traditionnelle d'Edo (Tokyo)", "Kansai — version pressée en battera", "Maquereaux de Seki (Ōita) et de Norvège"]
  },
  {
    id: "aji", kanji: "鯵", romaji: "Aji",
    fr: "Chinchard", en: "Horse mackerel",
    cat: "hikarimono",
    gout: "Plus léger que le maquereau : chair claire, fine et souple, au gras discret et à l'umami net. Servi avec ciboule et gingembre râpé qui soulignent sa fraîcheur marine. L'un des hikarimono les plus accessibles pour débuter.",
    regions: ["Nagasaki et Kyūshū — premières zones de pêche", "Misaki (Kanagawa)", "Mer intérieure de Seto ; meilleur en été"]
  },
  {
    id: "iwashi", kanji: "鰯", romaji: "Iwashi",
    fr: "Sardine", en: "Sardine",
    cat: "hikarimono",
    gout: "Chair argentée très grasse, fondante, presque crémeuse quand elle est de saison, avec un goût iodé prononcé. Extrêmement fragile, elle n'est servie crue que d'une fraîcheur irréprochable — un luxe discret des bons comptoirs en été.",
    regions: ["Kujūkuri (Chiba) — sardines réputées", "Baie de Tokyo et Pacifique", "Hokkaidō en été"]
  },
  {
    id: "sanma", kanji: "秋刀魚", romaji: "Sanma",
    fr: "Balaou du Pacifique", en: "Pacific saury",
    cat: "hikarimono",
    gout: "Le « poisson-sabre d'automne » : chair grasse et brillante au goût franc, légèrement amer, qui évoque immédiatement l'automne japonais. Cru en sushi lorsqu'il est très frais, avec gingembre et ciboule, il offre une richesse comparable à la sardine avec plus de caractère.",
    regions: ["Hokkaidō (Nemuro) — premiers arrivages d'août", "Côte de Sanriku en automne", "Pacifique nord-ouest"]
  },
  {
    id: "kohada", kanji: "小鰭", romaji: "Kohada",
    fr: "Alose tachetée (jeune)", en: "Gizzard shad",
    cat: "hikarimono",
    gout: "Le neta emblématique du sushi d'Edo : petit poisson argenté salé et vinaigré, à la chair ferme et au goût iodé-acidulé complexe. Sa préparation, très technique, est réputée révéler le niveau d'un chef. Une bouchée d'anthologie pour les amateurs.",
    regions: ["Baie de Tokyo — tradition edomae", "Kyūshū (Saga, Kumamoto)", "Mer intérieure de Seto"]
  },
  {
    id: "sayori", kanji: "細魚", romaji: "Sayori",
    fr: "Demi-bec du Japon", en: "Japanese halfbeak",
    cat: "hikarimono",
    gout: "Poisson fin et effilé comme une aiguille d'argent : chair translucide, délicate et élégante, à la saveur subtilement sucrée avec une pointe d'amertume raffinée. Un neta de printemps très apprécié pour sa beauté visuelle.",
    regions: ["Mer intérieure de Seto", "Baie d'Ishikari (Hokkaidō)", "Chiba et baie de Tokyo au printemps"]
  },

  {
    id: "kisu", kanji: "鱚", romaji: "Kisu",
    fr: "Sillago du Japon", en: "Japanese whiting",
    cat: "hikarimono",
    gout: "Petit poisson côtier élégant, star de la tempura, que la tradition edomae traite aussi en sushi, souvent légèrement vinaigré ou kobujime (mûri entre deux feuilles de kombu). Chair blanche fine, délicate, subtilement sucrée.",
    regions: ["Baie de Tokyo — tradition edomae", "Mer intérieure de Seto", "Pleine saison en été"]
  },
  {
    id: "nishin", kanji: "鰊", romaji: "Nishin",
    fr: "Hareng du Pacifique", en: "Pacific herring",
    cat: "hikarimono",
    gout: "Gras et iodé, à la chair fondante presque beurrée, traditionnellement travaillé au vinaigre comme ses cousins hikarimono. Poisson emblématique de l'histoire d'Hokkaidō — et c'est lui qui donne le kazunoko.",
    regions: ["Hokkaidō (Otaru, Rumoi) — la grande tradition du hareng", "Mer d'Okhotsk", "Printemps (hareng de ponte)"]
  },
  {
    id: "shirasu", kanji: "しらす", romaji: "Shirasu",
    fr: "Blanchaille (alevins de sardine)", en: "Whitebait",
    cat: "hikarimono",
    gout: "Les alevins de sardine, servis en gunkan : crus, ils sont translucides, glissants et subtilement amers ; blanchis (kama-age), ils deviennent blancs, moelleux et doux. Une spécialité des côtes de Shōnan, à déguster d'une fraîcheur absolue.",
    regions: ["Enoshima et côte de Shōnan (Kanagawa)", "Baie de Suruga (Shizuoka)", "Printemps et automne"]
  },

  {
    id: "kasugo", kanji: "春子", romaji: "Kasugo",
    fr: "Jeune daurade (kasugo)", en: "Young sea bream",
    cat: "hikarimono",
    gout: "Bébé daurade traité comme un hikarimono — légèrement salé puis vinaigré : chair rose nacré, tendre et délicate, d'un raffinement printanier. Sa peau rosée en fait l'un des plus beaux nigiri.",
    regions: ["Baie de Sagami", "Mer intérieure de Seto", "Printemps"]
  },
  {
    id: "shinko", kanji: "新子", romaji: "Shinko",
    fr: "Alevin de konoshiro", en: "Juvenile gizzard shad",
    cat: "hikarimono",
    gout: "L'événement de l'été edomae : l'alevin du konoshiro, si petit qu'il en faut plusieurs par nigiri, préparé au sel et au vinaigre avec une précision d'orfèvre. Les premiers arrivages de juillet atteignent des prix fous.",
    regions: ["Maisaka (Shizuoka) — premiers arrivages", "Baie de Tokyo", "Kyūshū (Saga) ; juillet-août"]
  },
  {
    id: "tobiuo", kanji: "飛魚", romaji: "Tobiuo",
    fr: "Poisson volant", en: "Flying fish",
    cat: "hikarimono",
    gout: "Chair claire, ferme et très maigre, au goût net et légèrement sucré — un hikarimono tout en fraîcheur estivale. Ses œufs sont le fameux tobiko.",
    regions: ["Kyūshū (Nagasaki)", "Îles d'Izu et Hachijō-jima", "Été"]
  },
  {
    id: "gomasaba", kanji: "胡麻鯖", romaji: "Gomasaba",
    fr: "Maquereau tacheté", en: "Spotted mackerel",
    cat: "hikarimono",
    gout: "Le maquereau de l'été, moins gras que le masaba d'hiver : chair plus légère, nette, agréablement iodée. À ne pas confondre avec le plat « goma saba » de Fukuoka — qui s'en régale aussi.",
    regions: ["Kyūshū", "Pacifique (Izu, Bōsō)", "Été"]
  },
  {
    id: "hatahata", kanji: "鰰", romaji: "Hatahata",
    fr: "Poisson-sable du Japon", en: "Sailfin sandfish",
    cat: "hikarimono",
    gout: "Le poisson emblème d'Akita : petit, sans écailles, à la chair blanche grasse et fondante. En sushi, souvent légèrement mariné ou grillé — une douceur des mers froides.",
    regions: ["Akita — poisson emblème de la préfecture", "Mer du Japon (Tottori)", "Hiver"]
  },
  {
    id: "mamakari", kanji: "飯借", romaji: "Mamakari",
    fr: "Sardinelle japonaise (sappa)", en: "Japanese scaled sardine",
    cat: "hikarimono",
    gout: "La spécialité vinaigrée d'Okayama : si bonne, dit la légende, qu'on va « emprunter du riz » (mama-kari) chez le voisin pour finir le plat. Petite chair argentée, acidulée et franche.",
    regions: ["Mer intérieure de Seto (Okayama)", "Été-automne"]
  },
  {
    id: "shishamo", kanji: "柳葉魚", romaji: "Shishamo",
    fr: "Éperlan shishamo", en: "Shishamo smelt",
    cat: "hikarimono",
    gout: "Le vrai shishamo — endémique d'Hokkaidō, à ne pas confondre avec le capelan d'importation des izakaya : en pleine saison, il se déguste en sushi, chair délicate et douce au parfum subtil.",
    regions: ["Mukawa (Hokkaidō) — la référence", "Automne (courte saison)"]
  },
  {
    id: "kibinago", kanji: "黍魚子", romaji: "Kibinago",
    fr: "Hareng gracile", en: "Silver-stripe round herring",
    cat: "hikarimono",
    gout: "Tout petit poisson du sud à la rayure argentée, ouvert en filets papillon à la main : chair fraîche et délicate, traditionnellement trempée dans le sumiso (miso vinaigré) plutôt que le soja.",
    regions: ["Kagoshima — plat emblématique", "Kyūshū et Gotō (Nagasaki)", "Printemps"]
  },

  // ---------- SHIROMI ----------
  {
    id: "tai", kanji: "鯛", romaji: "Tai / Madai",
    fr: "Dorade japonaise", en: "Red sea bream",
    cat: "shiromi",
    gout: "Le roi des poissons blancs au Japon, symbole de fête. Chair rosée translucide, ferme et élastique, au goût délicat, doux et légèrement sucré, avec un umami qui s'épanouit après quelques jours de maturation. Souvent servi avec la peau ébouillantée (matsukawa).",
    regions: ["Naruto (Tokushima) — dorades des tourbillons", "Akashi (Hyōgo)", "Ehime — première région d'élevage", "Meilleur au printemps (sakura-dai)"]
  },
  {
    id: "hirame", kanji: "平目", romaji: "Hirame",
    fr: "Cardeau hirame (flet japonais)", en: "Olive flounder",
    cat: "shiromi",
    gout: "Le poisson plat noble de l'hiver : chair blanche translucide, ferme et fine, au goût très pur, presque austère, qui révèle toute sa profondeur avec quelques jours de maturation. Souvent servi avec ponzu et momiji-oroshi plutôt qu'avec soja.",
    regions: ["Aomori — première zone de pêche", "Jōban (Fukushima, Ibaraki)", "Mer du Japon ; pleine saison en hiver (kan-birame)"]
  },
  {
    id: "engawa", kanji: "縁側", romaji: "Engawa",
    fr: "Muscle de nageoire de flet", en: "Flounder fin muscle",
    cat: "shiromi",
    gout: "Le muscle qui actionne la nageoire du hirame : rare (quatre petites bandes par poisson), croquant, gras et intensément savoureux. Son contraste entre texture ferme et richesse fondante en fait un des morceaux les plus recherchés. Superbe légèrement passé au chalumeau.",
    regions: ["Issu des hirame d'Aomori et de Jōban", "Version abordable : flétan du Groenland (Atlantique nord)"]
  },
  {
    id: "karei", kanji: "鰈", romaji: "Karei",
    fr: "Limande / plie du Japon", en: "Righteye flounder",
    cat: "shiromi",
    gout: "Cousin estival du hirame : chair blanche fine, ferme et rebondissante, au goût léger et élégant. Le shiroshita-karei d'Ōita, pêché dans des eaux mêlées de sources sous-marines, est considéré comme le sommet de l'espèce.",
    regions: ["Hiji (Ōita) — le fameux shiroshita-karei", "Ōhara (Chiba)", "Mer du Japon et Hokkaidō ; meilleur en été"]
  },
  {
    id: "suzuki", kanji: "鱸", romaji: "Suzuki",
    fr: "Bar japonais", en: "Japanese sea bass",
    cat: "shiromi",
    gout: "Le poisson blanc de l'été : chair claire, souple et juteuse, au parfum frais légèrement herbacé. Traditionnellement servi en arai (tranches raffermies à l'eau glacée) qui accentue son croquant. Un shiromi lumineux et désaltérant.",
    regions: ["Baie de Tokyo — tradition edomae", "Mer intérieure de Seto (Akashi)", "Estuaires de tout l'archipel ; pleine saison en été"]
  },
  {
    id: "kinmedai", kanji: "金目鯛", romaji: "Kinmedai",
    fr: "Béryx long (dorade œil d'or)", en: "Splendid alfonsino",
    cat: "shiromi",
    gout: "Poisson des profondeurs à la robe écarlate et à l'œil doré : chair blanc rosé, moelleuse et grasse, d'une douceur voluptueuse. Souvent servi avec la peau snackée au chalumeau qui libère un gras parfumé irrésistible.",
    regions: ["Shimoda et péninsule d'Izu (Shizuoka)", "Chōshi (Chiba)", "Fosses du Pacifique au large de Kantō ; meilleur en hiver"]
  },
  {
    id: "nodoguro", kanji: "喉黒", romaji: "Nodoguro / Akamutsu",
    fr: "Bar à gorge noire", en: "Blackthroat seaperch",
    cat: "shiromi",
    gout: "Surnommé le « toro des poissons blancs » : chair d'une richesse en gras exceptionnelle, fondante et sucrée, à l'umami profond. Poisson de luxe de la mer du Japon, souvent servi aburi pour faire perler son gras. Une bouchée mémorable.",
    regions: ["Shimane et Yamaguchi — mer du Japon", "Ishikawa et Niigata", "Meilleur de l'automne à l'hiver"]
  },
  {
    id: "isaki", kanji: "伊佐木", romaji: "Isaki",
    fr: "Grondeur japonais", en: "Chicken grunt",
    cat: "shiromi",
    gout: "Poisson blanc du début d'été, au gras étonnamment généreux pour un shiromi : chair blanc rosé, souple et juteuse, au goût doux et rond. Les spécimens de mai-juin, avant la ponte, sont surnommés « isaki de la pluie des prunes ».",
    regions: ["Mer intérieure de Seto", "Kyūshū (Nagasaki)", "Péninsules d'Izu et de Bōsō ; pleine saison en été"]
  },
  {
    id: "fugu", kanji: "河豚", romaji: "Fugu",
    fr: "Poisson-globe", en: "Pufferfish",
    cat: "shiromi",
    gout: "Le plus célèbre des poissons à licence : chair translucide, très ferme et élastique, au goût d'une pureté extrême, presque minérale. En sushi, souvent accompagné de ponzu et ciboule. Sa préparation est strictement réservée à des chefs certifiés en raison de la toxine de ses viscères.",
    regions: ["Shimonoseki (Yamaguchi) — capitale du fugu", "Mer intérieure de Seto", "Élevage à Nagasaki et Kumamoto ; saison hivernale"]
  },

  {
    id: "sawara", kanji: "鰆", romaji: "Sawara",
    fr: "Thazard oriental", en: "Japanese Spanish mackerel",
    cat: "shiromi",
    gout: "Son kanji dit « poisson du printemps », mais c'est en hiver qu'il est le plus gras. Chair claire et tendre, presque fondante, à mi-chemin entre poisson blanc et poisson bleu. Fragile, il est souvent servi légèrement mariné ou aburi, la peau snackée révélant un gras raffiné.",
    regions: ["Mer intérieure de Seto (Okayama) — grande tradition du sawara", "Baie de Toyama et mer du Japon (kan-zawara d'hiver)", "Kyūshū"]
  },
  {
    id: "kamasu", kanji: "魳", romaji: "Kamasu",
    fr: "Bécune japonaise", en: "Japanese barracuda",
    cat: "shiromi",
    gout: "La bécune d'automne : délicate et un peu aqueuse à cru, sa chair blanche se transfigure en aburi — la peau grillée libère un parfum irrésistible et la chair devient moelleuse et parfumée. Un neta de saison discret mais mémorable.",
    regions: ["Baie de Sagami et péninsule d'Izu", "Kyūshū (Nagasaki)", "Pleine saison en automne"]
  },
  {
    id: "tachiuo", kanji: "太刀魚", romaji: "Tachiuo",
    fr: "Poisson-sabre", en: "Largehead hairtail",
    cat: "shiromi",
    gout: "Le « poisson grand sabre » à la robe d'argent poli, sans écailles : chair blanche, tendre et grasse, d'une douceur surprenante. Superbe en aburi, quand la flamme fait perler le gras sous la peau argentée.",
    regions: ["Wakayama (Arida) et mer intérieure de Seto", "Ehime et Ōita", "Été-automne"]
  },
  {
    id: "kue", kanji: "九絵", romaji: "Kue",
    fr: "Mérou japonais (kué)", en: "Longtooth grouper",
    cat: "shiromi",
    gout: "Le mérou légendaire du sud du Japon — on dit qu'après avoir goûté au kue, on ne peut plus manger d'autre poisson. Chair blanche épaisse, ferme et riche en collagène, à l'umami profond qui s'épanouit avec quelques jours de maturation. Un luxe hivernal rare en sushi.",
    regions: ["Kyūshū (Nagasaki, îles Gotō)", "Wakayama et Shikoku", "Pleine saison en hiver"]
  },
  {
    id: "kuromutsu", kanji: "黒鯥", romaji: "Kuromutsu",
    fr: "Mutsu noir", en: "Gnomefish",
    cat: "shiromi",
    gout: "Cousin sombre du nodoguro : poisson des profondeurs à la chair blanche translucide, grasse et sucrée, d'une rondeur voluptueuse. Moins célèbre que son cousin « à gorge noire », il offre une expérience comparable à prix plus doux.",
    regions: ["Chōshi (Chiba) et fosses du Pacifique", "Izu et baie de Sagami", "Automne-hiver"]
  },
  {
    id: "shirauo", kanji: "白魚", romaji: "Shirauo",
    fr: "Poisson des glaces", en: "Icefish",
    cat: "shiromi",
    gout: "Petit poisson translucide du printemps, servi en gunkan ou posé en fagot nacré : texture soyeuse, saveur délicate et douce-amère qui évoque la saison nouvelle. Un neta d'Edo historique — on le pêchait jadis dans la baie de Tokyo même.",
    regions: ["Lac Ogawara (Aomori)", "Mer d'Ariake (Kyūshū)", "Baie de Tokyo historiquement ; printemps"]
  },

  {
    id: "amadai", kanji: "甘鯛", romaji: "Amadai",
    fr: "Amadaï (tile rouge)", en: "Tilefish",
    cat: "shiromi",
    gout: "La « daurade sucrée » chère à Kyōto (guji) : chair moelleuse, humide et douce, souvent raffermie au sel ou kobujime. La variété blanche (shirakawa) est la plus précieuse. Écailles croustillantes en version matsukasa.",
    regions: ["Baie de Wakasa (Fukui) — le guji de Kyōto", "Izu et Sagami", "Automne-hiver"]
  },
  {
    id: "kawahagi", kanji: "皮剥", romaji: "Kawahagi",
    fr: "Poisson-lime (kawahagi)", en: "Thread-sail filefish",
    cat: "shiromi",
    gout: "Chair blanche ferme et cristalline, sublimée par son foie crémeux posé sur le nigiri — le « foie gras de la mer » d'automne-hiver. Son cousin umazurahagi offre une version plus abordable.",
    regions: ["Baie de Tokyo", "Mer intérieure de Seto", "Automne-hiver (foie au sommet)"]
  },
  {
    id: "madara", kanji: "真鱈", romaji: "Madara",
    fr: "Morue du Pacifique", en: "Pacific cod",
    cat: "shiromi",
    gout: "Chair blanche floconneuse et douce, souvent kobujime pour la raffermir. C'est surtout le père du shirako d'hiver — sa laitance légendaire.",
    regions: ["Hokkaidō", "Sanriku (Miyagi, Iwate)", "Hiver"]
  },
  {
    id: "ara", kanji: "アラ", romaji: "Ara",
    fr: "Ara (mérou des profondeurs)", en: "Sawedged perch",
    cat: "shiromi",
    gout: "Poisson blanc rarissime et cher, au collagène abondant et à l'umami puissant qui s'épanouit en maturation. À ne pas confondre avec le kue, que Fukuoka appelle aussi « ara ».",
    regions: ["Mer du Japon (Niigata, Sado)", "Kyūshū", "Hiver"]
  },
  {
    id: "magochi", kanji: "真鯒", romaji: "Magochi",
    fr: "Platycéphale du Japon", en: "Bartail flathead",
    cat: "shiromi",
    gout: "Le fugu de l'été, dit-on : chair translucide, ferme et élastique, d'une pureté désaltérante, souvent servie arai (raffermie à l'eau glacée). Un shiromi de canicule.",
    regions: ["Baie de Tokyo", "Mer intérieure de Seto", "Plein été"]
  },
  {
    id: "mahata", kanji: "真羽太", romaji: "Mahata",
    fr: "Mérou bagnard", en: "Sevenband grouper",
    cat: "shiromi",
    gout: "Mérou noble à la chair ferme et gélatineuse, à l'umami long et profond. Les élevages du sud en ont fait un luxe plus accessible que le kue.",
    regions: ["Kyūshū (élevage de qualité)", "Izu et Kii", "Hiver"]
  },
  {
    id: "hobo", kanji: "魴鮄", romaji: "Hōbō",
    fr: "Grondin japonais", en: "Red gurnard",
    cat: "shiromi",
    gout: "Sous sa carapace épineuse et ses nageoires bleu électrique, une chair blanche ferme, fine et sucrée, qui gagne à quelques jours de repos. Un shiromi d'hiver élégant.",
    regions: ["Baie de Sagami", "Mer intérieure de Seto", "Hiver-printemps"]
  },
  {
    id: "oniokoze", kanji: "鬼虎魚", romaji: "Oniokoze",
    fr: "Poisson-pierre japonais", en: "Devil stinger",
    cat: "shiromi",
    gout: "Terrifiant et venimeux à l'extérieur, exquis à l'intérieur : chair blanche ferme et limpide digne du fugu, servie en tranches fines. L'été de la mer intérieure.",
    regions: ["Mer intérieure de Seto", "Kyūshū", "Été"]
  },
  {
    id: "ainame", kanji: "鮎並", romaji: "Ainame",
    fr: "Greenling japonais", en: "Fat greenling",
    cat: "shiromi",
    gout: "Poisson de roche à la chair blanche grasse et tendre, à l'umami rond, souvent kobujime. Un discret régal d'été des côtes rocheuses.",
    regions: ["Sanriku et Jōban", "Mer intérieure de Seto", "Été"]
  },
  {
    id: "ishidai", kanji: "石鯛", romaji: "Ishidai",
    fr: "Daurade rayée (ishidai)", en: "Striped beakfish",
    cat: "shiromi",
    gout: "Le roi des rochers, graal des pêcheurs sportifs : chair dense, parfumée, à l'arôme iodé raffiné et à la mâche noble. Un sashimi-sushi de prestige estival.",
    regions: ["Côtes rocheuses d'Izu et de Bōsō", "Kyūshū", "Été"]
  },
  {
    id: "mejina", kanji: "眼仁奈", romaji: "Mejina",
    fr: "Mejina (calicagère noire)", en: "Largescale blackfish",
    cat: "shiromi",
    gout: "Poisson sombre des rochers dont la chair, en plein hiver (kan-mejina), devient claire, ferme et étonnamment propre. Un secret de comptoirs côtiers.",
    regions: ["Côtes rocheuses du Pacifique (Izu)", "Kyūshū", "Hiver"]
  },
  {
    id: "mebaru", kanji: "眼張", romaji: "Mebaru",
    fr: "Sébaste japonais", en: "Japanese rockfish",
    cat: "shiromi",
    gout: "Le « poisson qui annonce le printemps » : chair blanche tendre, douce et légère, aux grands yeux caractéristiques. Une fraîcheur de saison nouvelle.",
    regions: ["Baies rocheuses de tout l'archipel", "Mer intérieure de Seto", "Printemps"]
  },
  {
    id: "managatsuo", kanji: "真魚鰹", romaji: "Managatsuo",
    fr: "Castagnole japonaise", en: "Silver pomfret",
    cat: "shiromi",
    gout: "Chair ivoire moelleuse et grasse, au goût fin, que le Kansai vénère (souvent en miso-zuke). En sushi, une douceur soyeuse rare dans l'est du Japon.",
    regions: ["Mer intérieure de Seto", "Kyūshū", "Été-automne"]
  },
  {
    id: "hirasuzuki", kanji: "平鱸", romaji: "Hirasuzuki",
    fr: "Bar à nageoires noires", en: "Blackfin sea bass",
    cat: "shiromi",
    gout: "Le cousin sauvage du suzuki, qui chasse dans l'écume des rochers battus : chair plus grasse, plus profonde, sans l'odeur d'estuaire. Un bar de caractère hivernal.",
    regions: ["Côtes battues de Kyūshū", "Izu et Bōsō", "Hiver"]
  },
  {
    id: "kasago", kanji: "笠子", romaji: "Kasago",
    fr: "Rascasse japonaise", en: "Marbled rockfish",
    cat: "shiromi",
    gout: "Petit poisson de roche à grosse tête : chair blanche ferme, sucrée et nette. Modeste mais délicieux, l'archétype du shiromi de pêcheur.",
    regions: ["Côtes rocheuses de tout l'archipel", "Hiver-printemps"]
  },
  {
    id: "ayu", kanji: "鮎", romaji: "Ayu",
    fr: "Ayu (poisson des rivières)", en: "Sweetfish",
    cat: "shiromi",
    gout: "L'exception d'eau douce : le poisson-parfum des rivières claires, au goût unique évoquant concombre et melon. En sushi, surtout en sugata-zushi (entier) ou légèrement vinaigré, dans ses régions.",
    regions: ["Rivières de Gifu (Nagara)", "Shimanto (Kōchi)", "Été"]
  },
  {
    id: "matodai", kanji: "的鯛", romaji: "Matōdai",
    fr: "Saint-pierre", en: "John Dory",
    cat: "shiromi",
    gout: "La « cible » sombre sur son flanc lui donne son nom : chair blanche fine, souple et élégante, à l'umami discret mais persistant. Aussi bon au Japon qu'en Europe.",
    regions: ["Baie de Sagami", "Mer du Japon", "Hiver"]
  },
  {
    id: "itoyoridai", kanji: "糸縒鯛", romaji: "Itoyoridai",
    fr: "Cohana dorée (itoyori)", en: "Golden threadfin bream",
    cat: "shiromi",
    gout: "Filaments d'or aux nageoires et chair rose pâle, tendre et douce : un shiromi gracieux que le Kansai et Kyūshū apprécient de longue date.",
    regions: ["Mer intérieure de Seto", "Kyūshū (Nagasaki)", "Automne-hiver"]
  },
  {
    id: "hakkaku", kanji: "八角", romaji: "Hakkaku",
    fr: "Poacher à voile (hakkaku)", en: "Sailfin poacher",
    cat: "shiromi",
    gout: "L'« octogone » anguleux d'Hokkaidō, cuirassé comme un dragon : sous la carapace, une chair étonnamment grasse et douce, magnifique en aburi.",
    regions: ["Hokkaidō (Ishikari, Rumoi)", "Hiver"]
  },
  {
    id: "ibodai", kanji: "疣鯛", romaji: "Ibodai",
    fr: "Poisson-beurre japonais (ibodai)", en: "Japanese butterfish",
    cat: "shiromi",
    gout: "Chair moelleuse, grasse et douce comme son surnom le promet. Un petit poisson d'été-automne discret, fondant, apprécié des connaisseurs.",
    regions: ["Baie de Sagami", "Kyūshū", "Été-automne"]
  },
  {
    id: "kidai", kanji: "黄鯛", romaji: "Kidai",
    fr: "Dorade jaune", en: "Yellowback sea bream",
    cat: "shiromi",
    gout: "Petite daurade aux reflets d'or, à la chair fine et douce, souvent choisie pour préparer le kasugo. Une élégance abordable de la mer du Japon.",
    regions: ["Mer du Japon (San'in)", "Nagasaki (Kyūshū)", "Printemps et automne"]
  },
  {
    id: "mutsu", kanji: "鯥", romaji: "Mutsu",
    fr: "Mutsu", en: "Gnomefish",
    cat: "shiromi",
    gout: "Le frère du kuromutsu : poisson des profondeurs à la chair blanche grasse et sucrée, fondante, dont les juvéniles hantent les baies. L'hiver le rend somptueux.",
    regions: ["Chōshi (Chiba)", "Izu et fosses du Pacifique", "Automne-hiver"]
  },
  {
    id: "ishigarei", kanji: "石鰈", romaji: "Ishigarei",
    fr: "Plie pierre", en: "Stone flounder",
    cat: "shiromi",
    gout: "Reconnaissable à ses plaques osseuses : chair translucide, ferme et pure, souvent servie arai en été. Un poisson plat de canicule, désaltérant.",
    regions: ["Baie de Tokyo", "Baie de Sendai", "Été"]
  },
  {
    id: "akayagara", kanji: "赤矢柄", romaji: "Akayagara",
    fr: "Cornette rouge", en: "Red cornetfish",
    cat: "shiromi",
    gout: "Poisson-flûte interminable et écarlate, au rendement minuscule : chair blanche d'une finesse et d'une sucrosité surprenantes. Un luxe d'hiver que peu de comptoirs proposent.",
    regions: ["Baie de Sagami", "Kyūshū", "Hiver"]
  },
  {
    id: "ohyo", kanji: "大鮃", romaji: "Ohyō",
    fr: "Flétan du Pacifique", en: "Pacific halibut",
    cat: "shiromi",
    gout: "Le géant des poissons plats des mers froides : chair blanche maigre, propre et souple. C'est souvent lui derrière l'« engawa » généreux des kaiten-zushi.",
    regions: ["Hokkaidō", "Mer de Béring et Alaska"]
  },
  {
    id: "akodai", kanji: "アコウダイ", romaji: "Akōdai",
    fr: "Sébaste rouge (akou)", en: "Matsubara's red rockfish",
    cat: "shiromi",
    gout: "Rouge écarlate remonté des grandes profondeurs : chair blanche grasse, moelleuse et douce, qui fond doucement. Un neta d'hiver de la baie de Sagami.",
    regions: ["Fosses de Sagami et de Suruga", "Hiver"]
  },
  {
    id: "medai", kanji: "目鯛", romaji: "Medai",
    fr: "Poisson-beurre medai", en: "Japanese butterfish (medai)",
    cat: "shiromi",
    gout: "Grands yeux et chair moelleuse, légèrement grasse et douce, sans aspérité. Un shiromi rond et consensuel, à son meilleur en hiver.",
    regions: ["Îles d'Izu", "Mer du Japon (Sado)", "Hiver"]
  },
  {
    id: "kichiji", kanji: "喜知次", romaji: "Kichiji",
    fr: "Kinki (sébastolobe)", en: "Broadbanded thornyhead",
    cat: "shiromi",
    gout: "Le trésor écarlate d'Hokkaidō, dit kinki : gras exceptionnel, chair fondante et suave, souvent aburi pour faire chanter sa peau rouge. Cher, rare, inoubliable.",
    regions: ["Rausu et Abashiri (Hokkaidō)", "Hiver"]
  },
  {
    id: "fuedai", kanji: "笛鯛", romaji: "Fuedai",
    fr: "Vivaneau étoilé", en: "Star snapper",
    cat: "shiromi",
    gout: "Le vivaneau du sud à l'étoile blanche : chair claire, douce et nette, considérée comme l'un des meilleurs poissons d'été de Kyūshū.",
    regions: ["Nagasaki et Gotō", "Okinawa", "Été"]
  },
  {
    id: "kijihata", kanji: "雉羽太", romaji: "Kijihata",
    fr: "Mérou à points rouges (akou)", en: "Redspotted grouper",
    cat: "shiromi",
    gout: "L'« akou » du Kansai : petit mérou gélatineux, à l'umami profond et à la chair élastique, devenu un luxe estival de la mer intérieure.",
    regions: ["Mer intérieure de Seto (Akashi)", "San'in", "Été"]
  },
  {
    id: "takabe", kanji: "タカベ", romaji: "Takabe",
    fr: "Takabe", en: "Yellowstriped butterfish",
    cat: "shiromi",
    gout: "Petit poisson des îles d'Izu à la rayure jaune vif : chair grasse et sucrée qui rappelle l'été des ports insulaires. Rare hors de sa région.",
    regions: ["Îles d'Izu", "Bōsō (Chiba)", "Été"]
  },
  {
    id: "mehikari", kanji: "目光", romaji: "Mehikari",
    fr: "Grand-œil vert (mehikari)", en: "Greeneyes",
    cat: "shiromi",
    gout: "Petits yeux verts luminescents des profondeurs : chair blanche grasse, fondante, presque crémeuse. Fierté d'Iwaki, plus souvent frit — mais superbe en sushi très frais.",
    regions: ["Iwaki (Fukushima) — poisson symbole", "Miyazaki", "Hiver"]
  },
  {
    id: "higedara", kanji: "髭鱈", romaji: "Higedara",
    fr: "Morue barbue", en: "Threadfin hakeling",
    cat: "shiromi",
    gout: "Morue des profondeurs à barbillon : chair blanche humide, tendre et douce, discrète et réconfortante. Un neta de niche des ports du nord.",
    regions: ["Tōhoku (Sanriku)", "Hokkaidō", "Hiver"]
  },
  {
    id: "hamadai", kanji: "浜鯛", romaji: "Hamadai",
    fr: "Vivaneau flamme (onaga)", en: "Flame snapper",
    cat: "shiromi",
    gout: "L'onaga d'Okinawa, vivaneau rouge des grandes profondeurs à la longue queue : chair élégante, légèrement grasse, d'une classe folle. L'un des « trois grands » poissons d'Okinawa.",
    regions: ["Okinawa — l'un des trois poissons de luxe", "Ogasawara", "Kyūshū sud"]
  },
  {
    id: "hokke", kanji: "ホッケ", romaji: "Hokke",
    fr: "Terpuga (hokke)", en: "Atka mackerel",
    cat: "shiromi",
    gout: "Célébrissime grillé en izakaya, quasi introuvable cru : trop fragile pour voyager. À Hokkaidō même, très frais, il révèle une chair grasse et fondante en sushi.",
    regions: ["Rausu et mer d'Okhotsk (Hokkaidō)", "Printemps et automne"]
  },
  {
    id: "shiira", kanji: "鱪", romaji: "Shiira",
    fr: "Coryphène (mahi-mahi)", en: "Mahi-mahi",
    cat: "shiromi",
    gout: "Le mahi-mahi des mers chaudes : chair rosée, ferme et maigre, au goût léger. Modeste au Japon, star à Hawaï — honnête fraîcheur d'été.",
    regions: ["Kyūshū et Kōchi", "Okinawa", "Été"]
  },
  {
    id: "menuke", kanji: "目抜", romaji: "Menuke",
    fr: "Sébaste menuke", en: "Rougheye rockfish",
    cat: "shiromi",
    gout: "Grand sébaste des abysses dont les yeux « ressortent » à la remontée : chair blanche grasse et douce, généreuse. Un rouge profond des mers du nord.",
    regions: ["Tōhoku", "Hokkaidō et Kouriles", "Hiver"]
  },
  {
    id: "sugi", kanji: "スギ", romaji: "Sugi",
    fr: "Cobia", en: "Cobia",
    cat: "shiromi",
    gout: "Grand poisson des mers chaudes remis au goût du jour par l'aquaculture japonaise : chair ferme, légèrement grasse, entre sériole et espadon. Une curiosité moderne.",
    regions: ["Élevages de Kyūshū", "Mers chaudes du sud", "Été-automne"]
  },
  {
    id: "hoshigarei", kanji: "星鰈", romaji: "Hoshigarei",
    fr: "Flétan tacheté (hoshigarei)", en: "Spotted halibut",
    cat: "shiromi",
    gout: "Avec le matsukawa, l'aristocrate absolu des poissons plats : rare, cher, à la chair ferme, sucrée et d'une pureté cristalline. Le graal des amateurs de shiromi.",
    regions: ["Baie de Tokyo et Jōban", "Mer intérieure de Seto", "Été-automne"]
  },
  {
    id: "matsukawa", kanji: "松皮鰈", romaji: "Matsukawa",
    fr: "Barbue matsukawa", en: "Barfin flounder",
    cat: "shiromi",
    gout: "L'autre roi des poissons plats, à la peau « écorce de pin » : chair épaisse, ferme et profonde, portée par l'aquaculture de repeuplement d'Hokkaidō. Somptueux en automne-hiver.",
    regions: ["Hokkaidō (Tomakomai)", "Automne-hiver"]
  },

  // ---------- ANGUILLES ----------
  {
    id: "unagi", kanji: "鰻", romaji: "Unagi",
    fr: "Anguille (eau douce)", en: "Freshwater eel",
    cat: "anguille",
    gout: "Toujours servie cuite : grillée et laquée à la sauce tare sucrée-salée (kabayaki). Chair grasse, moelleuse, presque fondante, au parfum fumé caramélisé. Riche et réconfortante, c'est traditionnellement le plat des grandes chaleurs d'été.",
    regions: ["Lac Hamana (Shizuoka) — berceau de l'élevage", "Kagoshima et Aichi — premières régions productrices", "Stocks sauvages devenus rares (espèce menacée)"]
  },
  {
    id: "anago", kanji: "穴子", romaji: "Anago",
    fr: "Congre japonais", en: "Conger eel",
    cat: "anguille",
    gout: "Le pendant marin et edomae de l'unagi : mijoté puis nappé de tsume (réduction sucrée), il est plus léger, plus délicat et moins gras que l'anguille d'eau douce. Texture aérienne qui s'effondre en bouche — un final classique du repas de sushi.",
    regions: ["Baie de Tokyo (Haneda) — tradition edomae", "Akashi et mer intérieure de Seto", "Tsushima (Nagasaki)"]
  },

  {
    id: "hamo", kanji: "鱧", romaji: "Hamo",
    fr: "Congre-brochet", en: "Daggertooth pike conger",
    cat: "anguille",
    gout: "L'anguille de l'été de Kyōto : sa chair truffée d'arêtes exige la technique du honekiri, des centaines d'incisions au couteau. Ébouillantée, elle s'ouvre en fleur blanche, tendre et délicate. En sushi, plutôt aburi ou en oshizushi, parfois relevée de prune ume.",
    regions: ["Mer intérieure de Seto (île d'Awaji)", "Kyōto et Ōsaka — culture estivale du hamo", "Kyūshū (Ōita)"]
  },

  {
    id: "noresore", kanji: "のれそれ", romaji: "Noresore",
    fr: "Larve de congre (noresore)", en: "Conger eel larva",
    cat: "anguille",
    gout: "Ruban parfaitement transparent servi en gunkan au ponzu : texture glissante et fraîche, goût subtil d'eau de mer sucrée. L'éphémère printemps de Kōchi, quelques semaines par an.",
    regions: ["Kōchi — spécialité emblématique", "Mer intérieure de Seto", "Février à avril"]
  },

  // ---------- CRUSTACÉS ----------
  {
    id: "ebi", kanji: "海老", romaji: "Ebi",
    fr: "Crevette cuite", en: "Cooked shrimp",
    cat: "crustace",
    gout: "La crevette pochée puis ouverte en papillon, familière de tous les plateaux : chair ferme et rebondissante, saveur douce et sucrée, sans aucune agressivité. Un neta rassurant, parfait pour les débutants et les enfants.",
    regions: ["Élevages d'Asie du Sud-Est (vannamei, black tiger)", "Argentine — crevette rouge sauvage", "Japon : petites pêcheries côtières"]
  },
  {
    id: "amaebi", kanji: "甘海老", romaji: "Amaebi",
    fr: "Crevette nordique (crue)", en: "Sweet shrimp",
    cat: "crustace",
    gout: "Littéralement « crevette sucrée » : servie crue, elle offre une texture collante, presque crémeuse, et une douceur sucrée remarquable qui se développe quelques jours après la pêche. Souvent deux pièces par nigiri, parfois coiffées de leurs œufs bleus.",
    regions: ["Mer du Japon : Toyama, Ishikawa, Niigata", "Hokkaidō", "Atlantique nord : Canada, Groenland, Norvège"]
  },
  {
    id: "botanebi", kanji: "牡丹海老", romaji: "Botan ebi",
    fr: "Crevette botan", en: "Botan shrimp",
    cat: "crustace",
    gout: "La grande sœur luxueuse de l'amaebi, nommée d'après la pivoine : chair épaisse, dense et croquante, à la fois sucrée et profondément umami. Une seule pièce suffit à couvrir le riz. Sa tête, grillée ou en soupe miso, est un délice à part entière.",
    regions: ["Baie de Toyama", "Hokkaidō (Rumoi, Mashike)", "Pacifique nord (Canada, Alaska)"]
  },
  {
    id: "kurumaebi", kanji: "車海老", romaji: "Kuruma ebi",
    fr: "Crevette kuruma (tigrée du Japon)", en: "Japanese tiger prawn",
    cat: "crustace",
    gout: "La crevette noble du sushi edomae, juste pochée pour être servie tiède : chair ferme et croquante, parfum intense de crustacé, douceur élégante et robe rayée spectaculaire. À mi-chemin entre cru et cuit, c'est un sommet de l'art du sushi-ya.",
    regions: ["Mer intérieure de Seto", "Kyūshū (Kumamoto, Ōita) — élevage traditionnel", "Baie de Tokyo historiquement"]
  },
  {
    id: "shako", kanji: "蝦蛄", romaji: "Shako",
    fr: "Squille (crevette-mante)", en: "Mantis shrimp",
    cat: "crustace",
    gout: "Un neta d'initié au physique étrange : pochée puis badigeonnée de tsume, la squille offre une chair souple au goût marin profond, entre crevette et crabe, avec une légère amertume noble. Les femelles pleines d'œufs, au début de l'été, sont les plus prisées.",
    regions: ["Koshiba, baie de Tokyo — tradition edomae", "Oshoro (Hokkaidō)", "Mer intérieure de Seto (Okayama)"]
  },
  {
    id: "zuwaigani", kanji: "楚蟹", romaji: "Zuwai-gani",
    fr: "Crabe des neiges", en: "Snow crab",
    cat: "crustace",
    gout: "Chair blanche filandreuse, juteuse et délicatement sucrée, à l'arôme marin raffiné. En sushi, la chair de pattes est montée en nigiri ou en gunkan, parfois liée au corail. Les crabes de la mer du Japon (Echizen, Matsuba) sont un luxe hivernal absolu.",
    regions: ["Echizen (Fukui) et Matsuba (Tottori, Hyōgo)", "Hokkaidō et mer d'Okhotsk", "Canada et Alaska pour l'importation ; saison : hiver"]
  },
  {
    id: "tarabagani", kanji: "鱈場蟹", romaji: "Taraba-gani",
    fr: "Crabe royal du Kamtchatka", en: "Red king crab",
    cat: "crustace",
    gout: "Le géant des crabes : pattes énormes à la chair dense, charnue et juteuse, plus puissante et plus sucrée que le crabe des neiges. Une bouchée spectaculaire et généreuse, parfois légèrement grillée pour exalter son parfum.",
    regions: ["Mer d'Okhotsk et Hokkaidō (Wakkanai, Abashiri)", "Kamtchatka (Russie)", "Mer de Béring (Alaska)"]
  },

  {
    id: "kegani", kanji: "毛蟹", romaji: "Kegani",
    fr: "Crabe poilu d'Hokkaidō", en: "Horsehair crab",
    cat: "crustace",
    gout: "Plus petit que ses cousins, mais d'une finesse supérieure : chair délicate et sucrée, et surtout un kani-miso (corail) crémeux considéré comme le meilleur de tous les crabes. En sushi, souvent en gunkan mêlant chair et miso.",
    regions: ["Hokkaidō (mer d'Okhotsk, Hidaka, Noboribetsu)", "Pêché presque toute l'année selon les zones"]
  },
  {
    id: "sakuraebi", kanji: "桜海老", romaji: "Sakura ebi",
    fr: "Crevette sakura", en: "Sakura shrimp",
    cat: "crustace",
    gout: "La minuscule crevette rose translucide, pêchée presque exclusivement dans la baie de Suruga : crue en gunkan, elle offre un croquant délicat et une douceur marine intense, avec le parfum caractéristique de sa fine carapace. Un trésor printanier.",
    regions: ["Baie de Suruga (Shizuoka) — Yui et Ōigawa, quasi-exclusivité mondiale", "Deux courtes saisons : printemps et automne"]
  },

  {
    id: "shiraebi", kanji: "白海老", romaji: "Shiraebi",
    fr: "Crevette blanche de Toyama", en: "Glass shrimp",
    cat: "crustace",
    gout: "Le « joyau de la baie de Toyama » : minuscule crevette translucide, décortiquée à la main, à la douceur crémeuse et délicate. En gunkan, une neige nacrée inoubliable.",
    regions: ["Baie de Toyama — quasi-exclusivité mondiale", "Avril à novembre"]
  },
  {
    id: "shimaebi", kanji: "縞海老", romaji: "Shimaebi",
    fr: "Crevette morotoge (shima-ebi)", en: "Morotoge shrimp",
    cat: "crustace",
    gout: "Rayures élégantes et chair crue sucrée, croquante puis fondante — les connaisseurs la placent au niveau de la botan. Un délice des lagunes froides d'Hokkaidō.",
    regions: ["Lacs Saroma et Notoro (Hokkaidō)", "Été et automne"]
  },
  {
    id: "budoebi", kanji: "葡萄海老", romaji: "Budō ebi",
    fr: "Crevette raisin", en: "Grape shrimp",
    cat: "crustace",
    gout: "Rarissime, d'un violet de raisin mûr : chair plus dense, plus grasse et plus sucrée encore que la botan. Quelques kilos par jour au marché — un caviar de comptoir.",
    regions: ["Rausu et Shiretoko (Hokkaidō)", "Baie de Toyama (prises rares)"]
  },
  {
    id: "benizuwaigani", kanji: "紅楚蟹", romaji: "Benizuwaigani",
    fr: "Crabe des neiges rouge", en: "Red snow crab",
    cat: "crustace",
    gout: "Le cousin des grandes profondeurs du zuwai : chair plus juteuse, franchement sucrée, d'un excellent rapport plaisir-prix. L'orgueil des ports de la mer du Japon.",
    regions: ["Sakaiminato (Tottori)", "Toyama et Hyōgo", "Automne à début d'été"]
  },
  {
    id: "gazami", kanji: "蝤蛑", romaji: "Gazami",
    fr: "Crabe bleu japonais (watari-gani)", en: "Japanese blue crab",
    cat: "crustace",
    gout: "Le « crabe nageur » aux pattes-rames : chair douce et fine, corail crémeux savoureux, généralement cuit ou vinaigré en sushi. Le crabe des baies tempérées.",
    regions: ["Mer intérieure de Seto", "Mer d'Ariake (Kyūshū)", "Automne-hiver"]
  },
  {
    id: "kumaebi", kanji: "隈海老", romaji: "Kumaebi",
    fr: "Crevette kuma (tigrée verte)", en: "Green tiger prawn",
    cat: "crustace",
    gout: "Proche cousine de la kuruma, aux rayures plus sombres : pochée, elle offre le même croquant rebondissant et une douceur franche, légèrement plus rustique.",
    regions: ["Kyūshū (Ariake)", "Mer intérieure de Seto", "Automne"]
  },
  {
    id: "iseebi", kanji: "伊勢海老", romaji: "Ise ebi",
    fr: "Langouste japonaise", en: "Japanese spiny lobster",
    cat: "crustace",
    gout: "Le crustacé des célébrations : chair translucide, dense, au sucré profond, servie crue à peine raidie. Sa carapace finit en soupe miso mémorable.",
    regions: ["Ise-Shima (Mie) — le berceau", "Bōsō (Chiba) et Izu", "Automne-hiver"]
  },
  {
    id: "akazaebi", kanji: "藜海老", romaji: "Akaza ebi",
    fr: "Langoustine japonaise (akaza)", en: "Japanese scampi",
    cat: "crustace",
    gout: "La langoustine des fosses japonaises : chair crémeuse, presque coulante, d'une sucrosité riche qui surpasse l'amaebi. Souvent servie crue, tête grillée à côté.",
    regions: ["Baies de Suruga et de Sagami", "Fosses de Kumano (Mie)", "Toute l'année"]
  },
  {
    id: "ibaramoebi", kanji: "イバラモエビ", romaji: "Ibaramo ebi",
    fr: "Crevette épineuse (ibaramo)", en: "Spiny lebbeid shrimp",
    cat: "crustace",
    gout: "Hérissée d'épines, rare et recherchée : chair épaisse à la douceur dense et enveloppante, considérée par certains comme la meilleure crevette crue des mers froides.",
    regions: ["Mer d'Okhotsk (Hokkaidō)", "Mer du Japon nord", "Hiver-printemps"]
  },
  {
    id: "gasuebi", kanji: "ガス海老", romaji: "Gasu ebi",
    fr: "Crevette gasu", en: "Gasu shrimp",
    cat: "crustace",
    gout: "Trop fragile pour voyager : elle se mange là où elle est pêchée, et les locaux la jugent plus savoureuse que l'amaebi — plus profonde, plus umami. Une raison de plus d'aller à Toyama.",
    regions: ["Baie de Toyama", "Kanazawa (Ishikawa)", "Automne-hiver"]
  },

  // ---------- COQUILLAGES ----------
  {
    id: "hotate", kanji: "帆立", romaji: "Hotate",
    fr: "Coquille Saint-Jacques", en: "Scallop",
    cat: "coquillage",
    gout: "La noix de pétoncle géant du Japon : crue, elle est soyeuse, fondante et remarquablement sucrée, avec un umami rond qui plaît à tous. L'un des coquillages les plus accessibles et les plus aimés, superbe aussi en aburi au chalumeau.",
    regions: ["Hokkaidō (lac Saroma, Okhotsk) — premier producteur", "Baie de Mutsu (Aomori)", "Sanriku (Iwate, Miyagi)"]
  },
  {
    id: "akagai", kanji: "赤貝", romaji: "Akagai",
    fr: "Arche de Broughton (coque sanguine)", en: "Ark shell",
    cat: "coquillage",
    gout: "Coquillage rouge orangé emblématique de l'edomae : chair croquante et élastique, parfum marin intense et finale légèrement sucrée. Le claquement du coquillage sur la planche avant service est un rituel des comptoirs traditionnels. Son manteau (himo) se déguste aussi.",
    regions: ["Yuriage (Miyagi) — la référence absolue", "Baie de Tokyo historiquement", "Mer intérieure de Seto et Kyūshū"]
  },
  {
    id: "hokkigai", kanji: "北寄貝", romaji: "Hokkigai",
    fr: "Mactre de Sakhaline", en: "Surf clam",
    cat: "coquillage",
    gout: "Coquillage nordique à la pointe violacée qui rosit à la cuisson : généralement blanchi quelques secondes, il devient croquant, juteux et nettement sucré. Un goût marin franc et une jolie mâche, très populaire à Hokkaidō.",
    regions: ["Tomakomai (Hokkaidō) — premier port de pêche", "Aomori et Sanriku", "Canada pour l'importation (surf clam)"]
  },
  {
    id: "tsubugai", kanji: "螺", romaji: "Tsubu-gai",
    fr: "Bulot du Japon", en: "Whelk",
    cat: "coquillage",
    gout: "Gastéropode des mers froides servi cru : chair très croquante, presque craquante sous la dent, au goût marin pur et à la douceur discrète. Un neta de texture par excellence, apprécié des amateurs de coquillages fermes.",
    regions: ["Hokkaidō (Okhotsk) — principale origine", "Aomori et mer du Japon nord", "Sanriku"]
  },
  {
    id: "mirugai", kanji: "海松貝", romaji: "Mirugai",
    fr: "Panope du Japon", en: "Gaper clam / Geoduck",
    cat: "coquillage",
    gout: "Le grand siphon d'un coquillage fouisseur : ébouillanté puis pelé, il offre un croquant spectaculaire, une saveur iodée profonde et une douceur persistante. Un des coquillages les plus chers et les plus recherchés des connaisseurs.",
    regions: ["Baie de Mikawa (Aichi)", "Baie de Tokyo (Kisarazu, Chiba)", "Panope du Pacifique importée du Canada et des États-Unis"]
  },
  {
    id: "awabi", kanji: "鮑", romaji: "Awabi",
    fr: "Ormeau", en: "Abalone",
    cat: "coquillage",
    gout: "Le coquillage le plus prestigieux : cru, il est ferme et croquant avec un parfum d'algue raffiné ; cuit à la vapeur de saké (mushi-awabi), il devient tendre et libère un umami extraordinaire, souvent accompagné d'une sauce à son propre foie.",
    regions: ["Péninsule de Bōsō (Chiba) — pêche des ama", "Sanriku (Iwate)", "Îles d'Izu ; pleine saison en été"]
  },
  {
    id: "kaki", kanji: "牡蠣", romaji: "Kaki",
    fr: "Huître", en: "Oyster",
    cat: "coquillage",
    gout: "En sushi, souvent en gunkan, crue avec ponzu ou brièvement pochée : chair laiteuse, grasse et charnue, au goût marin puissant, entre crème et iode. Les huîtres d'hiver, gorgées de glycogène, sont d'une rondeur incomparable.",
    regions: ["Hiroshima — premier producteur du Japon", "Sanriku (Miyagi)", "Akkeshi (Hokkaidō) — huîtres réputées toute l'année"]
  },

  {
    id: "tairagai", kanji: "平貝", romaji: "Taira-gai",
    fr: "Jambonneau de mer", en: "Pen shell",
    cat: "coquillage",
    gout: "La grande noix du jambonneau de mer, coquillage triangulaire planté dans les fonds sableux : plus large et plus ferme que la Saint-Jacques, au croquant net et à la douceur discrète. Souvent légèrement snackée ou relevée d'un voile de nori.",
    regions: ["Baie de Mikawa et baie d'Ise (Aichi)", "Mer d'Ariake (Kyūshū)", "Hiver-printemps"]
  },
  {
    id: "torigai", kanji: "鳥貝", romaji: "Torigai",
    fr: "Bucarde du Japon", en: "Japanese cockle",
    cat: "coquillage",
    gout: "La bucarde noire et luisante en forme de bec d'oiseau — d'où son nom de « coquillage-oiseau » : chair souple et rebondissante, d'une douceur sucrée marquée. Fugace : sa pleine saison ne dure que quelques semaines au début de l'été.",
    regions: ["Baie d'Ise et baie de Mikawa", "Tango et Maizuru (Kyōto) — torigai géants réputés", "Mer intérieure de Seto ; fin de printemps"]
  },
  {
    id: "aoyagi", kanji: "青柳", romaji: "Aoyagi",
    fr: "Mactre du Japon", en: "Round clam",
    cat: "coquillage",
    gout: "La mactre orangée au parfum marin assumé, légèrement iodé-amer, à la texture tendre puis croquante. Son nom vient du village d'Aoyagi (Chiba) qui l'expédiait vers Edo. Un coquillage de caractère, cher au cœur des amateurs.",
    regions: ["Baie de Tokyo (Funabashi, Chiba) — berceau historique", "Baie de Mikawa (Aichi)", "Hiver-printemps"]
  },
  {
    id: "kobashira", kanji: "小柱", romaji: "Kobashira",
    fr: "Noix de mactre", en: "Round clam adductor",
    cat: "coquillage",
    gout: "Les petits muscles adducteurs de l'aoyagi, servis en gunkan : de petites noix nacrées, croquantes et sucrées, plus fines que le coquillage entier. Avec une pointe de wasabi, un classique edomae discret et délicieux.",
    regions: ["Issues des aoyagi de la baie de Tokyo et de Mikawa", "Hiver-printemps"]
  },

  {
    id: "ishigakigai", kanji: "石垣貝", romaji: "Ishigakigai",
    fr: "Coque d'Ishigaki", en: "Bering Sea cockle",
    cat: "coquillage",
    gout: "La cousine ferme du torigai, servie crue : croquant net, douceur sucrée persistante, sans la fugacité saisonnière du torigai. Fierté estivale de Kesennuma.",
    regions: ["Kesennuma (Miyagi)", "Été"]
  },
  {
    id: "tokobushi", kanji: "常節", romaji: "Tokobushi",
    fr: "Petit ormeau tokobushi", en: "Small abalone",
    cat: "coquillage",
    gout: "Le petit frère de l'ormeau, tendre même cru, souvent mijoté entier et lustré de tsume : une bouchée moelleuse au parfum d'algue élégant, moins solennelle que l'awabi.",
    regions: ["Izu et Bōsō", "Kyūshū", "Été"]
  },
  {
    id: "bai", kanji: "バイ貝", romaji: "Bai",
    fr: "Bulot bai", en: "Japanese babylon",
    cat: "coquillage",
    gout: "Bulot élégant à la coquille lisse : chair souple, moins ferme que le tsubu, à la douceur marine délicate et légèrement amère en finale. Un classique discret de la mer du Japon.",
    regions: ["Mer du Japon (San'in, Hokuriku)", "Mer intérieure de Seto"]
  },
  {
    id: "shiromiru", kanji: "白海松", romaji: "Shiromiru",
    fr: "Panope blanche (shiromiru)", en: "White gaper clam",
    cat: "coquillage",
    gout: "Le « mirugai blanc » : siphon croquant et iodé très proche du vrai mirugai, avec une douceur légèrement moindre — et un prix nettement plus doux. L'alternative maligne.",
    regions: ["Baie de Mikawa (Aichi)", "Mer du Japon"]
  },
  {
    id: "sazae", kanji: "栄螺", romaji: "Sazae",
    fr: "Turban cornu (sazae)", en: "Horned turban",
    cat: "coquillage",
    gout: "Le coquillage cornu des rochers : chair au croquant puissant, iodée, avec cette amertume noble d'algue en finale qui divise et fascine. L'été des côtes rocheuses.",
    regions: ["San'in et mer du Japon", "Izu et Bōsō", "Été"]
  },
  {
    id: "saragai", kanji: "皿貝", romaji: "Saragai",
    fr: "Coquillage plat saragai", en: "Northern great tellin",
    cat: "coquillage",
    gout: "Bivalve nordique blanc rosé : brièvement blanchi, il devient tendre et nettement sucré, dans l'esprit d'un hokkigai plus délicat. Une rareté des ports du nord.",
    regions: ["Hokkaidō", "Aomori"]
  },
  {
    id: "akanishigai", kanji: "赤螺", romaji: "Akanishigai",
    fr: "Rapane veiné (akanishi)", en: "Veined rapa whelk",
    cat: "coquillage",
    gout: "Gastéropode charnu à l'intérieur orangé : croquant marqué, goût marin franc et direct. Le bulot de caractère des baies japonaises.",
    regions: ["Baie de Tokyo", "Mer intérieure de Seto et Ariake"]
  },
  {
    id: "akoyagai", kanji: "阿古屋貝", romaji: "Akoyagai",
    fr: "Noix d'huître perlière akoya", en: "Akoya pearl oyster adductor",
    cat: "coquillage",
    gout: "Le sous-produit précieux de la perliculture : la petite noix de l'huître à perles, croquante et délicatement sucrée, disponible seulement l'hiver quand on récolte les perles.",
    regions: ["Ise-Shima (Mie)", "Uwajima (Ehime)", "Hiver — saison des perles"]
  },
  {
    id: "akagaihimo", kanji: "赤貝ひも", romaji: "Akagai himo",
    fr: "Manteau d'arche (himo)", en: "Ark shell mantle",
    cat: "coquillage",
    gout: "Le « ruban » qui borde l'akagai : croquant vif, iodé et joyeux, souvent roulé avec du concombre en himokyū-maki. La preuve que rien ne se perd dans un bon coquillage.",
    regions: ["Issu des akagai de Yuriage (Miyagi)", "Tradition edomae"]
  },
  {
    id: "hamaguri", kanji: "蛤", romaji: "Hamaguri",
    fr: "Palourde hamaguri (ni-hamaguri)", en: "Hard clam (simmered)",
    cat: "coquillage",
    gout: "La palourde noble d'Edo, pochée puis lustrée de tsume : moelleuse, marine et sucrée, elle incarne le sushi cuisiné à l'ancienne. Un classique edomae absolu, aujourd'hui devenu rare.",
    regions: ["Kuwana (Mie) — la référence historique", "Kashima et Chōshi (Ibaraki-Chiba)", "Printemps"]
  },
  {
    id: "asari", kanji: "浅蜊", romaji: "Asari",
    fr: "Palourde japonaise (asari)", en: "Manila clam",
    cat: "coquillage",
    gout: "La petite palourde des vasières, en gunkan ou mijotée nitsuke : saveur marine concentrée, presque un bouillon solide. L'humble goût des baies japonaises.",
    regions: ["Baie de Tokyo (Funabashi)", "Mer d'Ariake", "Baie de Mikawa ; printemps"]
  },

  // ---------- CÉPHALOPODES ----------
  {
    id: "ika", kanji: "烏賊", romaji: "Ika",
    fr: "Calmar / seiche", en: "Squid",
    cat: "cephalopode",
    gout: "Chair blanc nacré, dense et légèrement collante, à la douceur sucrée qui s'intensifie avec un quadrillage au couteau. Selon la saison : sumi-ika ferme et élégant, aori-ika épais et intensément sucré (le roi des calmars), yari-ika fin et tendre. Souvent servi avec sel et sudachi.",
    regions: ["Hakodate (Hokkaidō) — ville du calmar", "Yobuko (Saga) — calmar vivant translucide", "Mer du Japon et côtes de tout l'archipel"]
  },
  {
    id: "tako", kanji: "蛸", romaji: "Tako",
    fr: "Poulpe", en: "Octopus",
    cat: "cephalopode",
    gout: "Généralement poché ou massé puis cuit : tranches aux bords violets, texture ferme et rebondissante, goût doux et umami discret. Le poulpe d'Akashi, musclé par les courants du détroit, est réputé pour sa saveur profonde. Parfois servi en sakura-ni, mijoté fondant.",
    regions: ["Akashi (Hyōgo) — le poulpe légendaire", "Kujūkuri et Sajima (Kantō)", "Afrique de l'Ouest (Mauritanie, Maroc) pour l'importation"]
  },
  {
    id: "hotaruika", kanji: "蛍烏賊", romaji: "Hotaru-ika",
    fr: "Calmar luciole", en: "Firefly squid",
    cat: "cephalopode",
    gout: "Minuscule calmar bioluminescent servi entier, blanchi : une bouchée entière d'océan, où le corps tendre libère des viscères crémeux, riches et doux-amers. Un délice printanier éphémère, souvent en gunkan avec une sauce miso vinaigrée (sumiso).",
    regions: ["Baie de Toyama — remontées spectaculaires au printemps", "Hyōgo (mer du Japon)", "Saison très courte : mars à mai"]
  },

  {
    id: "aoriika", kanji: "障泥烏賊", romaji: "Aori ika",
    fr: "Calmar récifal (aori-ika)", en: "Bigfin reef squid",
    cat: "cephalopode",
    gout: "Le « roi des calmars » : chair épaisse et dense, d'une sucrosité exceptionnelle qui s'intensifie après quelques jours de maturation. Le sommet absolu de la famille.",
    regions: ["Kyūshū et Kii", "Izu", "Printemps-été"]
  },
  {
    id: "sumiika", kanji: "墨烏賊", romaji: "Sumi ika",
    fr: "Seiche dorée (sumi-ika)", en: "Golden cuttlefish",
    cat: "cephalopode",
    gout: "La seiche de la tradition edomae : chair épaisse au croquant net qui cède en fondant, douceur franche et propre. L'hiver venu, elle est à son apogée.",
    regions: ["Baie de Tokyo — tradition edomae", "Mer d'Ariake (Kyūshū)", "Hiver"]
  },
  {
    id: "shinika", kanji: "新烏賊", romaji: "Shin ika",
    fr: "Seiche juvénile (shin-ika)", en: "Juvenile golden cuttlefish",
    cat: "cephalopode",
    gout: "Le « shinko des calmars » : les bébés sumi-ika du cœur de l'été, à la tendreté irréelle, presque une gelée sucrée. Éphémère, cher, adoré des habitués.",
    regions: ["Mer d'Ariake", "Izumi (Kagoshima)", "Août — quelques semaines"]
  },
  {
    id: "yariika", kanji: "槍烏賊", romaji: "Yari ika",
    fr: "Calmar lance (yari-ika)", en: "Spear squid",
    cat: "cephalopode",
    gout: "Fin comme une lance : chair mince, tendre et élégamment sucrée, moins dense que ses cousins. Le calmar de l'hiver et du début du printemps.",
    regions: ["Mer du Japon", "Baie de Sagami", "Hiver-printemps"]
  },
  {
    id: "kensakiika", kanji: "剣先烏賊", romaji: "Kensaki ika",
    fr: "Calmar sabre (kensaki-ika)", en: "Swordtip squid",
    cat: "cephalopode",
    gout: "L'été de Kyūshū : c'est lui, le fameux « ika vivant » translucide de Yobuko, soyeux et intensément sucré, servi si frais que ses chromatophores scintillent encore.",
    regions: ["Yobuko (Saga) — l'ika vivant", "Iki et Tsushima (Nagasaki)", "Été"]
  },
  {
    id: "surumeika", kanji: "鯣烏賊", romaji: "Surume ika",
    fr: "Calmar japonais (surume-ika)", en: "Japanese flying squid",
    cat: "cephalopode",
    gout: "Le calmar du quotidien japonais : chair plus fine, au goût marin plus marqué, honnête et généreuse. La base des calamars séchés — et de beaux sushi populaires à Hakodate.",
    regions: ["Hakodate (Hokkaidō)", "Sanriku", "Été-automne"]
  },
  {
    id: "kaminariika", kanji: "雷烏賊", romaji: "Kaminari ika",
    fr: "Seiche kaminari (mongo-ika)", en: "Kisslip cuttlefish",
    cat: "cephalopode",
    gout: "La grande seiche charnue dite mongo-ika : chair épaisse, moelleuse et douce, au fondant enveloppant. Une alternative généreuse au sumi-ika.",
    regions: ["Kyūshū", "Mer intérieure de Seto", "Automne-hiver"]
  },
  {
    id: "sodeika", kanji: "袖烏賊", romaji: "Sode ika",
    fr: "Calmar diamant (sode-ika)", en: "Diamond squid",
    cat: "cephalopode",
    gout: "Le géant des mers chaudes (jusqu'à 20 kg) : chair épaisse, souple et sucrée, souvent travaillée congelée — ce qui la rend d'ailleurs plus tendre. Très présent dans les bons kaiten.",
    regions: ["Okinawa", "San'in (mer du Japon)", "Kyūshū"]
  },
  {
    id: "niika", kanji: "煮烏賊", romaji: "Ni ika",
    fr: "Calmar mijoté (ni-ika)", en: "Simmered squid",
    cat: "cephalopode",
    gout: "La préparation edomae d'antan : calmar poché dans un bouillon sucré-salé puis nappé de tsume — moelleux, parfumé, délicieusement nostalgique. Rare aujourd'hui, précieux à croiser.",
    regions: ["Tradition de la baie de Tokyo", "Comptoirs edomae classiques"]
  },
  {
    id: "geso", kanji: "下足", romaji: "Geso",
    fr: "Tentacules de calmar (geso)", en: "Squid tentacles",
    cat: "cephalopode",
    gout: "Les tentacules, crues, pochées ou aburi nappées de tsume : croquantes, pleines de goût, sans chichi. L'esprit populaire et généreux du comptoir.",
    regions: ["Partout au Japon", "Tradition edomae pour la version au tsume"]
  },
  {
    id: "mizudako", kanji: "水蛸", romaji: "Mizudako",
    fr: "Pieuvre géante du Pacifique", en: "Giant Pacific octopus",
    cat: "cephalopode",
    gout: "Le poulpe géant du nord, servi cru ou à peine blanchi en tranches fines : tendre, juteux et sucré là où le madako joue la fermeté. Ses ventouses croquantes sont un régal à part.",
    regions: ["Wakkanai et Hokkaidō", "Tōhoku", "Hiver"]
  },

  // ---------- ŒUFS & OURSIN ----------
  {
    id: "ikura", kanji: "いくら", romaji: "Ikura",
    fr: "Œufs de saumon", en: "Salmon roe",
    cat: "oeufs",
    gout: "Grosses billes orange marinées au soja ou au sel : elles éclatent en bouche en libérant un jus riche, salin et umami, adouci par une rondeur grasse. Servi en gunkan, souvent avec une pointe de concombre ou de shiso. Un festival de texture.",
    regions: ["Hokkaidō — saumons d'automne", "Sanriku (Iwate, Miyagi)", "Alaska et Russie pour l'importation"]
  },
  {
    id: "tobiko", kanji: "飛子", romaji: "Tobiko",
    fr: "Œufs de poisson volant", en: "Flying fish roe",
    cat: "oeufs",
    gout: "Minuscules œufs orange vif au croquant pétillant caractéristique, salés et légèrement fumés. Moins riches que l'ikura, ils apportent surtout une texture crépitante joyeuse. Souvent teintés au wasabi (vert) ou à l'encre de seiche (noir) dans les rolls.",
    regions: ["Kyūshū (mer de Chine orientale)", "Taïwan et Indonésie — principales origines", "Pérou"]
  },
  {
    id: "kazunoko", kanji: "数の子", romaji: "Kazunoko",
    fr: "Œufs de hareng", en: "Herring roe",
    cat: "oeufs",
    gout: "Bloc d'œufs doré à la texture unique : un croquant crépitant, presque caoutchouteux, qui craque sous la dent en cascade. Saumuré puis dessalé, son goût est subtil et marin. Symbole de prospérité, incontournable du Nouvel An japonais.",
    regions: ["Hokkaidō (Rumoi) — tradition du hareng", "Alaska et Colombie-Britannique (Canada)", "Mer d'Okhotsk"]
  },
  {
    id: "uni", kanji: "雲丹", romaji: "Uni",
    fr: "Oursin (gonades)", en: "Sea urchin",
    cat: "oeufs",
    gout: "Les langues d'oursin, du jaune pâle à l'orange soutenu : texture crémeuse fondante et goût unique, à la fois sucré, iodé et profondément umami, avec une pointe d'amertume marine. Clivant mais culte : le bafun-uni, intense, et le murasaki-uni, plus délicat.",
    regions: ["Rishiri et Rebun (Hokkaidō) — le sommet absolu", "Sanriku (Iwate)", "Hokuriku et Kyūshū ; importations de Californie et du Chili"]
  },

  {
    id: "komochikonbu", kanji: "子持ち昆布", romaji: "Komochi konbu",
    fr: "Œufs de hareng sur kombu", en: "Herring roe on kelp",
    cat: "oeufs",
    gout: "Une couche d'œufs de hareng pondue à même l'algue kombu : double croquant crépitant, salinité umami de l'algue, festif et spectaculaire. Trésor du Nouvel An.",
    regions: ["Hokkaidō", "Alaska et Canada"]
  },
  {
    id: "sujiko", kanji: "筋子", romaji: "Sujiko",
    fr: "Œufs de saumon en grappe", en: "Salmon roe skein",
    cat: "oeufs",
    gout: "L'ikura avant séparation : la grappe entière saumurée dans sa membrane — plus intense, plus salée, à la texture soudée et fondante. Le goût brut de l'automne du nord.",
    regions: ["Hokkaidō", "Sanriku (Tōhoku)", "Automne"]
  },
  {
    id: "tarako", kanji: "鱈子", romaji: "Tarako",
    fr: "Œufs de colin salés", en: "Salted pollock roe",
    cat: "oeufs",
    gout: "La poche d'œufs fins du colin d'Alaska, salée : granuleuse, saline et profondément savoureuse en gunkan. Sa version pimentée, le mentaiko de Fukuoka, est culte.",
    regions: ["Hokkaidō", "Fukuoka — le mentaiko", "Mer de Béring"]
  },

  // ---------- MAKI CLASSIQUES ----------
  {
    id: "kappamaki", kanji: "河童巻", romaji: "Kappa maki",
    fr: "Maki au concombre", en: "Cucumber roll",
    cat: "maki",
    gout: "Le rouleau du yōkai kappa, amateur de concombres : croquant, frais, végétal — le grand nettoyeur de palais entre deux poissons gras, et la fin de repas des puristes.",
    regions: ["Tradition edomae (Tokyo)", "Servi dans tout le Japon"]
  },
  {
    id: "tekkamaki", kanji: "鉄火巻", romaji: "Tekka maki",
    fr: "Maki au thon", en: "Tuna roll",
    cat: "maki",
    gout: "Né, dit-on, dans les tripots (tekkaba) pour manger d'une main sans lâcher les cartes : akami vif, wasabi net, nori croustillant. L'essence du maki.",
    regions: ["Tradition edomae (Tokyo)", "Incontournable partout"]
  },
  {
    id: "kanpyomaki", kanji: "干瓢巻", romaji: "Kanpyō maki",
    fr: "Maki de calebasse séchée", en: "Dried gourd roll",
    cat: "maki",
    gout: "Le maki d'Edo par excellence : lanières de calebasse mijotées sucré-salé, moelleuses et parfumées. Le final traditionnel d'un repas edomae — un chef se juge aussi à son kanpyō.",
    regions: ["Tradition edomae (Tokyo)", "Kanpyō de Tochigi"]
  },
  {
    id: "himokyumaki", kanji: "ひもきゅう巻", romaji: "Himokyū maki",
    fr: "Maki manteau d'arche et concombre", en: "Ark shell mantle & cucumber roll",
    cat: "maki",
    gout: "Le himo croquant de l'akagai roulé avec du concombre : marin contre végétal, deux croquants qui se répondent. Un classique de connaisseur.",
    regions: ["Tradition edomae (Tokyo)"]
  },
  {
    id: "torotakumaki", kanji: "トロたく巻", romaji: "Torotaku maki",
    fr: "Maki toro-takuan", en: "Fatty tuna & pickled radish roll",
    cat: "maki",
    gout: "Le gras fondant du toro haché contre le croquant salé du takuan (radis mariné) : un contraste moderne devenu culte, dangereux tant il est addictif.",
    regions: ["Création moderne des comptoirs de Tokyo"]
  },
  {
    id: "negitoromaki", kanji: "ねぎとろ巻", romaji: "Negitoro maki",
    fr: "Maki negitoro", en: "Minced fatty tuna & scallion roll",
    cat: "maki",
    gout: "Toro et parures de thon hachés, mêlés de ciboule : fondant, riche, immédiat. Le plaisir régressif du répertoire, né de l'art de ne rien perdre du thon.",
    regions: ["Tradition des marchés de Tokyo", "Universel aujourd'hui"]
  },
  {
    id: "anakyumaki", kanji: "穴きゅう巻", romaji: "Anakyū maki",
    fr: "Maki anago-concombre", en: "Conger & cucumber roll",
    cat: "maki",
    gout: "La douceur laquée de l'anago contre la fraîcheur croquante du concombre : l'un des plus beaux équilibres du répertoire des maki, en clôture de repas.",
    regions: ["Tradition edomae (Tokyo)"]
  },

  // ---------- AUTRES ----------
  {
    id: "tamago", kanji: "玉子", romaji: "Tamago",
    fr: "Omelette japonaise", en: "Sweet omelet",
    cat: "autre",
    gout: "L'omelette sucrée-salée montée couche par couche, parfois enrichie de crevette ou de poisson mixés dans la tradition edomae. Moelleuse, dense et parfumée au dashi, elle se déguste souvent en fin de repas — on dit qu'elle révèle, à elle seule, le savoir-faire d'une maison.",
    regions: ["Préparée dans chaque sushi-ya (pas de pêche !)", "Tradition edomae : tamago au shiba-ebi de la baie de Tokyo"]
  },

  {
    id: "ankimo", kanji: "鮟肝", romaji: "Ankimo",
    fr: "Foie de lotte", en: "Monkfish liver",
    cat: "autre",
    gout: "Le foie de lotte poché au saké : le « foie gras de la mer ». Texture dense et crémeuse, richesse profonde adoucie d'une pointe d'amertume noble, souvent en gunkan avec ponzu et momiji-oroshi. Un incontournable de l'hiver.",
    regions: ["Ibaraki et Fukushima — tradition de l'ankō", "Hokkaidō (Yoichi)", "Pleine saison en hiver"]
  },
  {
    id: "shirako", kanji: "白子", romaji: "Shirako",
    fr: "Laitance de cabillaud", en: "Cod milt",
    cat: "autre",
    gout: "Crémeuse et fondante comme une crème marine, au goût lacté et umami profond. En gunkan avec ponzu, ou brièvement pochée : c'est l'autre grand luxe de l'hiver japonais, à la texture inoubliable.",
    regions: ["Hokkaidō (cabillaud du Pacifique)", "Mer du Japon (Ishikawa, Niigata)", "Décembre à février"]
  },
  {
    id: "fugushirako", kanji: "河豚白子", romaji: "Fugu shirako",
    fr: "Laitance de fugu", en: "Tiger pufferfish milt",
    cat: "autre",
    gout: "La laitance la plus luxueuse du Japon : celle du torafugu, d'une crémosité dense et profonde, souvent aburi pour caraméliser sa surface. L'hiver dans ce qu'il a de plus opulent.",
    regions: ["Shimonoseki (Yamaguchi)", "Kyūshū", "Plein hiver"]
  },
  {
    id: "oboro", kanji: "朧", romaji: "Oboro",
    fr: "Oboro (condiment de crevette)", en: "Shrimp floss",
    cat: "autre",
    gout: "Crevette shiba et poisson blanc pilés, séchés au sucre et au mirin : le voile rose sucré que l'edomae ancien glissait entre neta et riz pour lier les saveurs. Une madeleine du sushi d'Edo.",
    regions: ["Tradition edomae (Tokyo)", "Shiba-ebi de la baie de Tokyo historiquement"]
  },
  {
    id: "menegi", kanji: "芽葱", romaji: "Menegi",
    fr: "Jeunes pousses de ciboule", en: "Green onion sprouts",
    cat: "autre",
    gout: "Un fagot de pousses de ciboule fines comme des aiguilles, souvent coiffé d'umeboshi : piquant frais, végétal et net. Le sorbet du comptoir.",
    regions: ["Culture maraîchère (Shizuoka)", "Servi toute l'année"]
  },
  {
    id: "shiitake", kanji: "椎茸", romaji: "Shiitake",
    fr: "Shiitaké mijoté", en: "Simmered shiitake",
    cat: "autre",
    gout: "Le champignon mijoté sucré-salé façon kanpyō : moelleux, juteux et profondément umami. Un neta végétarien historique, trop souvent oublié.",
    regions: ["Ōita et Shizuoka — grandes régions du shiitaké"]
  },
  {
    id: "kaiware", kanji: "貝割れ", romaji: "Kaiware",
    fr: "Pousses de daikon", en: "Daikon radish sprouts",
    cat: "autre",
    gout: "Les pousses de radis au piquant de moutarde, croquantes et vives, en gunkan ou glissées sous un neta : la ponctuation verte et fraîche du répertoire.",
    regions: ["Culture maraîchère de tout le Japon"]
  },
  {
    id: "hoya", kanji: "海鞘", romaji: "Hoya",
    fr: "Ascidie (hoya)", en: "Sea pineapple",
    cat: "autre",
    gout: "L'« ananas de mer » du Sanriku : iodé, minéral, doux-amer, avec une finale qui évoque l'océan à marée basse. Le neta le plus clivant du Japon — et l'obsession de ses amateurs.",
    regions: ["Sanriku (Miyagi) — cœur de la tradition", "Hokkaidō", "Été"]
  },
  {
    id: "namako", kanji: "海鼠", romaji: "Namako",
    fr: "Concombre de mer", en: "Sea cucumber",
    cat: "autre",
    gout: "Croquant-élastique unique, mariné au ponzu, d'une fraîcheur minérale. Ses entrailles salées (konowata) comptent parmi les trois grands délices salés du Japon.",
    regions: ["Péninsule de Noto (Ishikawa)", "Mer intérieure de Seto", "Hiver"]
  },
  {
    id: "kujira", kanji: "鯨", romaji: "Kujira",
    fr: "Baleine (minke, rorqual de Bryde)", en: "Whale (minke, Bryde's)",
    cat: "autre",
    gout: "Présente dans quelques traditions régionales : chair rouge sombre, dense et maigre, proche d'une viande de gibier, parfois servie en sushi avec gingembre et ail. Sa consommation, encadrée au Japon, reste très controversée à l'international.",
    regions: ["Taiji (Wakayama)", "Shimonoseki (Yamaguchi)", "Hokkaidō (Kushiro)"]
  },
];
