// Chemistry Database & Simulation Engine for SmartChem

export const CATEGORIES = [
  { id: 'vessel', name: 'Reaction vessel', icon: 'flask', symbol: '⚗', description: 'Glassware and containers' },
  { id: 'tools', name: 'Assistive devices', icon: 'burner', symbol: '♨', description: 'Heating, measuring & handling' },
  { id: 'solid', name: 'Solid chemical', icon: 'capsule', symbol: '◐', description: 'Metals, salts & powders' },
  { id: 'liquid', name: 'Liquid chemicals', icon: 'droplet', symbol: '💧', description: 'Acids, bases & solutions' },
  { id: 'gas', name: 'Gas chemicals', icon: 'cloud', symbol: '☁', description: 'Collected & reactive gases' }
];

export const EQUIPMENT_CATALOG = {
  vessel: [
    {
      id: 'round_flask',
      name: 'Round Bottomed Flask',
      detail: '250 mL boiling flask',
      type: 'vessel',
      vesselType: 'flask_round',
      capacity: 250,
      suitableFor: ['liquid', 'solid'],
      description: 'Ideal for uniform heating, boiling, and distillation apparatus.'
    },
    {
      id: 'separatory_funnel',
      name: 'Globe-Shaped Separatory Funnel',
      detail: '125 mL with PTFE stopcock',
      type: 'vessel',
      vesselType: 'separatory',
      capacity: 125,
      suitableFor: ['liquid'],
      description: 'Used for liquid-liquid extractions and controlled addition.'
    },
    {
      id: 'gas_jar',
      name: 'Gas jar',
      detail: '250 mL wide collection jar',
      type: 'vessel',
      vesselType: 'gas_jar',
      capacity: 250,
      suitableFor: ['gas', 'solid', 'liquid'],
      description: 'Heavy glass jar for gas collection and combustion testing.'
    },
    {
      id: 'gas_cylinder',
      name: 'Quintuple Gas Cylinder',
      detail: 'Multi-port collection unit',
      type: 'vessel',
      vesselType: 'gas_cylinder',
      capacity: 500,
      suitableFor: ['gas'],
      description: 'Multi-chamber apparatus for sequential gas generation and storage.'
    },
    {
      id: 'small_test_tube',
      name: 'Small Test Tube',
      detail: '15 mL borosilicate tube',
      type: 'vessel',
      vesselType: 'testtube_small',
      capacity: 15,
      suitableFor: ['liquid', 'solid'],
      description: 'Standard tube for qualitative test reactions and observations.'
    },
    {
      id: 'large_test_tube',
      name: 'Large test tube',
      detail: '35 mL boiling tube',
      type: 'vessel',
      vesselType: 'testtube_large',
      capacity: 35,
      suitableFor: ['liquid', 'solid'],
      description: 'Heavy-walled boiling tube for heating powders and solutions.'
    },
    {
      id: 'side_arm_tube',
      name: 'Test Tube With Side Arm',
      detail: '25 mL gas delivery tube',
      type: 'vessel',
      vesselType: 'testtube_sidearm',
      capacity: 25,
      suitableFor: ['liquid', 'solid', 'gas'],
      description: 'Features a lateral delivery arm for piping produced gases.'
    },
    {
      id: 'beaker_100',
      name: 'Beaker 100mL',
      detail: '100 mL Pyrex beaker',
      type: 'vessel',
      vesselType: 'beaker_100',
      capacity: 100,
      suitableFor: ['liquid', 'solid'],
      description: 'Standard graduated beaker for mixing, titration, and heating.'
    },
    {
      id: 'beaker_250',
      name: 'Beaker 250mL',
      detail: '250 mL Pyrex beaker',
      type: 'vessel',
      vesselType: 'beaker_250',
      capacity: 250,
      suitableFor: ['liquid', 'solid'],
      description: 'General purpose laboratory beaker for solutions and precipitation.'
    },
    {
      id: 'conical_flask',
      name: 'Conical Flask',
      detail: '250 mL Erlenmeyer',
      type: 'vessel',
      vesselType: 'flask_conical',
      capacity: 250,
      suitableFor: ['liquid', 'solid'],
      description: 'Narrow neck prevents splashing during swirling and titrations.'
    },
    {
      id: 'watch_glass',
      name: 'Watch Glass',
      detail: '70 mm concave glass',
      type: 'vessel',
      vesselType: 'watch_glass',
      capacity: 20,
      suitableFor: ['solid'],
      description: 'Ideal for weighing solids, holding powders, and slow evaporation.'
    },
    {
      id: 'crucible',
      name: 'Porcelain Crucible',
      detail: '30 mL with porcelain lid',
      type: 'vessel',
      vesselType: 'crucible',
      capacity: 30,
      suitableFor: ['solid'],
      description: 'High-temperature refractory vessel for intense heating and calcination.'
    },
    {
      id: 'evaporating_dish',
      name: 'Evaporating Dish',
      detail: '50 mL ceramic basin',
      type: 'vessel',
      vesselType: 'evaporating_dish',
      capacity: 50,
      suitableFor: ['liquid', 'solid'],
      description: 'Shallow dish with pouring lip for evaporating excess solvent.'
    }
  ],
  tools: [
    {
      id: 'burner',
      name: 'Bunsen Burner',
      detail: 'Gas burner with air collar',
      type: 'heater',
      action: 'heat',
      suitableFor: ['vessel'],
      description: 'Adjustable laboratory heat source for boiling and decomposition.'
    },
    {
      id: 'tripod',
      name: 'Tripod & Wire Gauze',
      detail: 'Cast iron bench support',
      type: 'support',
      action: 'support',
      suitableFor: ['vessel', 'heater'],
      description: 'Provides stable elevation and uniform heat distribution.'
    },
    {
      id: 'test_tube_rack',
      name: 'Test Tube Rack',
      detail: '6-well wooden/acrylic rack',
      type: 'support',
      action: 'hold',
      suitableFor: ['vessel'],
      description: 'Holds multiple test tubes upright for side-by-side comparison.'
    },
    {
      id: 'stand',
      name: 'Retort Stand & Clamp',
      detail: 'Steel rod with bosshead clamp',
      type: 'support',
      action: 'support',
      suitableFor: ['vessel', 'tool'],
      description: 'Secures glassware, burettes, and funnels firmly at desired heights.'
    },
    {
      id: 'balance',
      name: 'Digital Balance',
      detail: '0.01 g precision scale',
      type: 'meter',
      action: 'weigh',
      suitableFor: ['solid', 'vessel'],
      description: 'Accurately measures mass of solid reagents and samples with Tare.'
    },
    {
      id: 'thermometer',
      name: 'Digital Thermometer',
      detail: '-10 to 110 °C probe',
      type: 'meter',
      action: 'measure_temp',
      suitableFor: ['vessel'],
      description: 'Monitors exothermic and endothermic enthalpy temperature changes.'
    },
    {
      id: 'ph_meter',
      name: 'Digital pH Meter',
      detail: 'pH 0.0 - 14.0 glass electrode',
      type: 'meter',
      action: 'measure_ph',
      suitableFor: ['vessel', 'liquid'],
      description: 'Measures exact acidity or alkalinity of reaction solutions.'
    },
    {
      id: 'dropper',
      name: 'Glass Dropper / Pipette',
      detail: '1 mL rubber teat dropper',
      type: 'tool',
      action: 'drop',
      suitableFor: ['liquid', 'vessel'],
      description: 'Adds liquid reagents drop by drop with controlled dosing.'
    },
    {
      id: 'spatula',
      name: 'Chemical Spatula',
      detail: 'Stainless steel micro scoop',
      type: 'tool',
      action: 'scoop',
      suitableFor: ['solid', 'vessel'],
      description: 'Crucial for scooping powders and crystals into vessels without spill.'
    },
    {
      id: 'stirring_rod',
      name: 'Glass Stirring Rod',
      detail: '200 mm solid glass rod',
      type: 'tool',
      action: 'stir',
      suitableFor: ['vessel'],
      description: 'Assists rapid dissolution, mixing, and induces crystallization.'
    },
    {
      id: 'forceps',
      name: 'Tweezers / Forceps',
      detail: 'Blunt stainless forceps',
      type: 'tool',
      action: 'handle_metal',
      suitableFor: ['solid'],
      description: 'Safely handles reactive metals, magnesium ribbons, and zinc chips.'
    },
    {
      id: 'delivery_tube',
      name: 'Delivery Tube & Stopper',
      detail: 'Bent glass tube with rubber bung',
      type: 'tool',
      action: 'connect_gas',
      suitableFor: ['vessel'],
      description: 'Directs evolved gases (CO2, H2, O2) from generator to gas jar.'
    }
  ],
  solid: [
    {
      id: 'sodium',
      name: 'Sodium metal',
      detail: 'Na · Silvery reactive solid',
      formula: 'Na',
      category: 'alkali_metal',
      type: 'chemical',
      state: 'solid',
      color: '#d4dcdd',
      mass: 0.5,
      suitableEquipment: ['forceps', 'watch_glass', 'beaker_250'],
      description: 'Soft alkali metal stored under paraffin oil. Reacts violently with water.'
    },
    {
      id: 'magnesium',
      name: 'Magnesium ribbon',
      detail: 'Mg · 0.42 g shiny ribbon',
      formula: 'Mg',
      category: 'metal',
      type: 'chemical',
      state: 'solid',
      color: '#c2cbd1',
      mass: 0.42,
      suitableEquipment: ['forceps', 'testtube', 'crucible'],
      description: 'Burnable reactive metal ribbon. Burns with intense brilliant white flame.'
    },
    {
      id: 'zinc',
      name: 'Zinc granules',
      detail: 'Zn · 1.00 g grey granules',
      formula: 'Zn',
      category: 'metal',
      type: 'chemical',
      state: 'solid',
      color: '#9ba7af',
      mass: 1.00,
      suitableEquipment: ['spatula', 'testtube', 'beaker'],
      description: 'Granular metal that rapidly displaces hydrogen gas from dilute acids.'
    },
    {
      id: 'copper_turnings',
      name: 'Copper turnings',
      detail: 'Cu · Reddish-brown metal',
      formula: 'Cu',
      category: 'metal',
      type: 'chemical',
      state: 'solid',
      color: '#c87d55',
      mass: 1.20,
      suitableEquipment: ['forceps', 'spatula', 'testtube'],
      description: 'Ductile transition metal. Reacts with concentrated nitric acid.'
    },
    {
      id: 'iron_filings',
      name: 'Iron filings',
      detail: 'Fe · Fine dark grey powder',
      formula: 'Fe',
      category: 'metal',
      type: 'chemical',
      state: 'solid',
      color: '#555b62',
      mass: 1.50,
      suitableEquipment: ['spatula', 'watch_glass', 'testtube'],
      description: 'Fine metallic particles used for displacement and synthesis of sulfides.'
    },
    {
      id: 'cuo',
      name: 'Copper(II) oxide',
      detail: 'CuO · Black fine powder',
      formula: 'CuO',
      category: 'metal_oxide',
      type: 'chemical',
      state: 'solid',
      color: '#38302b',
      mass: 0.80,
      suitableEquipment: ['spatula', 'watch_glass', 'testtube'],
      description: 'Basic metal oxide. Dissolves in hot dilute acid to give turquoise blue solution.'
    },
    {
      id: 'potassium_iodide_s',
      name: 'Potassium iodide crystals',
      detail: 'KI · White crystalline salt',
      formula: 'KI',
      category: 'salt_solid',
      type: 'chemical',
      state: 'solid',
      color: '#f0f3f6',
      mass: 1.00,
      suitableEquipment: ['spatula', 'watch_glass', 'balance'],
      description: 'Halide salt that dissolves readily. Forms vibrant precipitates with lead & silver.'
    },
    {
      id: 'lead_nitrate_s',
      name: 'Lead(II) nitrate',
      detail: 'Pb(NO₃)₂ · White crystalline powder',
      formula: 'Pb(NO₃)₂',
      category: 'lead_salt',
      type: 'chemical',
      state: 'solid',
      color: '#eef2f5',
      mass: 1.20,
      suitableEquipment: ['spatula', 'balance', 'beaker'],
      description: 'Soluble toxic heavy metal salt. Reagent for the famous "Golden Rain" reaction.'
    },
    {
      id: 'calcium_carbonate',
      name: 'Calcium carbonate chips',
      detail: 'CaCO₃ · Marble chips/powder',
      formula: 'CaCO₃',
      category: 'carbonate',
      type: 'chemical',
      state: 'solid',
      color: '#ece8e1',
      mass: 1.50,
      suitableEquipment: ['spatula', 'testtube_sidearm', 'beaker'],
      description: 'Insoluble carbonate rock that briskly effervesces CO₂ when exposed to acid.'
    },
    {
      id: 'potassium_permanganate_s',
      name: 'Potassium permanganate',
      detail: 'KMnO₄ · Deep purple needle crystals',
      formula: 'KMnO₄',
      category: 'oxidizer_solid',
      type: 'chemical',
      state: 'solid',
      color: '#511b58',
      mass: 0.60,
      suitableEquipment: ['spatula', 'watch_glass', 'testtube'],
      description: 'Powerful oxidizing agent. Dissolves to impart an intense magenta-violet hue.'
    },
    {
      id: 'sulfur_powder',
      name: 'Sulfur powder',
      detail: 'S · Bright yellow powder',
      formula: 'S',
      category: 'nonmetal',
      type: 'chemical',
      state: 'solid',
      color: '#e5cf37',
      mass: 0.80,
      suitableEquipment: ['spatula', 'crucible', 'watch_glass'],
      description: 'Insoluble nonmetal powder. Melts and burns with blue flame emitting SO₂.'
    },
    {
      id: 'cuso4_s',
      name: 'Copper(II) sulfate crystals',
      detail: 'CuSO₄·5H₂O · Bright blue crystals',
      formula: 'CuSO₄·5H₂O',
      category: 'salt_solid',
      type: 'chemical',
      state: 'solid',
      color: '#267bd6',
      mass: 1.50,
      suitableEquipment: ['spatula', 'watch_glass', 'evaporating_dish'],
      description: 'Blue vitriol. Dehydrates on heating to white anhydrous CuSO₄ powder.'
    },
    {
      id: 'sodium_bicarbonate',
      name: 'Sodium bicarbonate',
      detail: 'NaHCO₃ · Fine white powder',
      formula: 'NaHCO₃',
      category: 'carbonate',
      type: 'chemical',
      state: 'solid',
      color: '#f7fafc',
      mass: 1.00,
      suitableEquipment: ['spatula', 'balance', 'beaker'],
      description: 'Baking soda. Rapidly neutralizes acids with bubbling carbon dioxide release.'
    }
  ],
  liquid: [
    {
      id: 'water',
      name: 'Distilled water',
      detail: 'H₂O · Pure solvent · pH 7.0',
      formula: 'H₂O',
      category: 'water',
      type: 'chemical',
      state: 'liquid',
      color: '#76caef',
      ph: 7.0,
      suitableEquipment: ['beaker', 'flask', 'dropper', 'measuring_cylinder'],
      description: 'Deionized neutral solvent essential for aqueous chemical reactions.'
    },
    {
      id: 'hcl',
      name: 'Hydrochloric acid',
      detail: 'HCl · 1.0 M · pH 1.0',
      formula: 'HCl',
      category: 'strong_acid',
      type: 'chemical',
      state: 'liquid',
      color: '#e4f4f7',
      ph: 1.0,
      suitableEquipment: ['dropper', 'beaker', 'testtube'],
      description: 'Strong monoprotic acid. Reacts vigorously with metals, bases, and carbonates.'
    },
    {
      id: 'h2so4',
      name: 'Sulfuric acid (dil.)',
      detail: 'H₂SO₄ · 1.0 M · pH 0.8',
      formula: 'H₂SO₄',
      category: 'strong_acid',
      type: 'chemical',
      state: 'liquid',
      color: '#d8eef5',
      ph: 0.8,
      suitableEquipment: ['dropper', 'beaker', 'conical_flask'],
      description: 'Strong diprotic mineral acid. Forms insoluble white barium sulfate with Ba²⁺.'
    },
    {
      id: 'naoh',
      name: 'Sodium hydroxide',
      detail: 'NaOH · 1.0 M · pH 13.5',
      formula: 'NaOH',
      category: 'strong_base',
      type: 'chemical',
      state: 'liquid',
      color: '#d6f5ea',
      ph: 13.5,
      suitableEquipment: ['dropper', 'burette', 'beaker'],
      description: 'Caustic alkaline solution. Precipitates heavy metal hydroxides.'
    },
    {
      id: 'nh3_aq',
      name: 'Ammonia solution',
      detail: 'NH₃(aq) · 2.0 M · pH 11.5',
      formula: 'NH₃·H₂O',
      category: 'weak_base',
      type: 'chemical',
      state: 'liquid',
      color: '#e1f5f2',
      ph: 11.5,
      suitableEquipment: ['dropper', 'beaker', 'flask'],
      description: 'Volatile base and ligand. Forms brilliant deep-blue tetraamminecopper complexes.'
    },
    {
      id: 'cuso4_aq',
      name: 'Copper(II) sulfate sol.',
      detail: 'CuSO₄(aq) · 0.5 M · Sky blue',
      formula: 'CuSO₄(aq)',
      category: 'salt_solution',
      type: 'chemical',
      state: 'liquid',
      color: '#2b8fe0',
      ph: 4.8,
      suitableEquipment: ['dropper', 'beaker', 'testtube'],
      description: 'Aqueous copper(II) solution. Precipitates bright blue Cu(OH)₂ with NaOH.'
    },
    {
      id: 'fecl3_aq',
      name: 'Iron(III) chloride sol.',
      detail: 'FeCl₃(aq) · 0.2 M · Amber yellow',
      formula: 'FeCl₃(aq)',
      category: 'iron_salt',
      type: 'chemical',
      state: 'liquid',
      color: '#d48a28',
      ph: 2.5,
      suitableEquipment: ['dropper', 'testtube', 'beaker'],
      description: 'Aqueous iron(III) solution. Produces blood-red complex with potassium thiocyanate.'
    },
    {
      id: 'kscn_aq',
      name: 'Potassium thiocyanate',
      detail: 'KSCN(aq) · 0.1 M · Colorless',
      formula: 'KSCN(aq)',
      category: 'thiocyanate',
      type: 'chemical',
      state: 'liquid',
      color: '#f0f5fa',
      ph: 6.8,
      suitableEquipment: ['dropper', 'testtube'],
      description: 'Specific ligand test for Fe³⁺ ions, instantaneously forming intense blood-red [Fe(SCN)]²⁺.'
    },
    {
      id: 'agno3_aq',
      name: 'Silver nitrate solution',
      detail: 'AgNO₃(aq) · 0.1 M · Clear',
      formula: 'AgNO₃(aq)',
      category: 'silver_salt',
      type: 'chemical',
      state: 'liquid',
      color: '#edf5fa',
      ph: 5.5,
      suitableEquipment: ['dropper', 'testtube'],
      description: 'Precipitating agent for halide ions. Forms curdy white AgCl insoluble precipitate.'
    },
    {
      id: 'ki_aq',
      name: 'Potassium iodide sol.',
      detail: 'KI(aq) · 0.5 M · Clear solution',
      formula: 'KI(aq)',
      category: 'iodide_sol',
      type: 'chemical',
      state: 'liquid',
      color: '#f0f7fb',
      ph: 7.0,
      suitableEquipment: ['dropper', 'testtube'],
      description: 'Provides iodide anions for precipitation of bright yellow lead(II) iodide.'
    },
    {
      id: 'lead_nitrate_aq',
      name: 'Lead(II) nitrate sol.',
      detail: 'Pb(NO₃)₂(aq) · 0.2 M · Clear',
      formula: 'Pb(NO₃)₂(aq)',
      category: 'lead_salt',
      type: 'chemical',
      state: 'liquid',
      color: '#eef4fa',
      ph: 4.2,
      suitableEquipment: ['dropper', 'testtube', 'beaker'],
      description: 'Soluble lead salt solution. Mixes with KI to yield luminous yellow PbI₂ crystals.'
    },
    {
      id: 'bacl2_aq',
      name: 'Barium chloride sol.',
      detail: 'BaCl₂(aq) · 0.2 M · Clear',
      formula: 'BaCl₂(aq)',
      category: 'barium_salt',
      type: 'chemical',
      state: 'liquid',
      color: '#eaf3f8',
      ph: 6.5,
      suitableEquipment: ['dropper', 'testtube'],
      description: 'Confirmatory reagent for sulfate ions; immediately forms heavy white BaSO₄ precipitate.'
    },
    {
      id: 'phenolphthalein',
      name: 'Phenolphthalein indicator',
      detail: 'Colorless in acid · Pink in base',
      formula: 'HIn (PP)',
      category: 'indicator_pp',
      type: 'chemical',
      state: 'liquid',
      color: '#fad3e7',
      ph: 7.0,
      suitableEquipment: ['dropper'],
      description: 'Standard acid-base indicator. Turns vivid fuchsia pink at pH > 8.2.'
    },
    {
      id: 'universal_indicator',
      name: 'Universal indicator',
      detail: 'Full rainbow pH 1 - 14 scale',
      formula: 'UI Sol.',
      category: 'indicator_ui',
      type: 'chemical',
      state: 'liquid',
      color: '#55b358',
      ph: 7.0,
      suitableEquipment: ['dropper'],
      description: 'Multi-component indicator exhibiting distinct colors across the entire pH spectrum.'
    },
    {
      id: 'ethanol',
      name: 'Ethanol (99%)',
      detail: 'C₂H₅OH · Volatile alcohol',
      formula: 'C₂H₅OH',
      category: 'alcohol',
      type: 'chemical',
      state: 'liquid',
      color: '#d6f0ff',
      ph: 7.0,
      suitableEquipment: ['beaker', 'flask', 'burner'],
      description: 'Flammable organic solvent. Burns cleanly with a pale blue-orange flame.'
    }
  ],
  gas: [
    {
      id: 'oxygen_gas',
      name: 'Oxygen gas (O₂)',
      detail: 'O₂ · Supports vigorous combustion',
      formula: 'O₂',
      category: 'gas_o2',
      type: 'chemical',
      state: 'gas',
      color: '#e4f7ff',
      suitableEquipment: ['gas_jar', 'gas_cylinder'],
      description: 'Relights a glowing splint. Vital oxidizer in combustion and respiration.'
    },
    {
      id: 'hydrogen_gas',
      name: 'Hydrogen gas (H₂)',
      detail: 'H₂ · Highly flammable gas',
      formula: 'H₂',
      category: 'gas_h2',
      type: 'chemical',
      state: 'gas',
      color: '#def3fb',
      suitableEquipment: ['gas_jar', 'side_arm_tube'],
      description: 'Lightest element. Burns with characteristic squeaky "pop" sound.'
    },
    {
      id: 'carbon_dioxide_gas',
      name: 'Carbon dioxide (CO₂)',
      detail: 'CO₂ · Dense gas · Extinguishes fire',
      formula: 'CO₂',
      category: 'gas_co2',
      type: 'chemical',
      state: 'gas',
      color: '#eaf0f2',
      suitableEquipment: ['gas_jar', 'delivery_tube'],
      description: 'Extinguishes burning splints and turns clear limewater milky white.'
    }
  ]
};

// Comprehensive Chemical Reaction Database
export const REACTION_RULES = [
  // 1. Precipitation: Lead(II) nitrate + Potassium iodide -> Lead(II) iodide (Golden Rain)
  {
    id: 'golden_rain',
    name: 'Precipitation of Lead(II) Iodide (Golden Rain)',
    category: 'precipitation',
    reactants: [['lead_salt', 'lead_nitrate_s', 'lead_nitrate_aq'], ['iodide_sol', 'potassium_iodide_s', 'ki_aq']],
    equation: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓ (yellow) + 2KNO₃(aq)',
    status: 'precipitation',
    title: 'Golden Rain Reaction',
    color: '#ffe600',
    after_color: 'rgba(255, 215, 0, 0.88)',
    precipitate_color: '#ffd700',
    effects: ['precipitate', 'settling_crystals'],
    products: ['PbI₂ yellow precipitate', 'KNO₃ solution'],
    temperatureChange: 1.5,
    description: 'A striking double displacement reaction that immediately precipitates brilliant, glittering golden-yellow flakes of lead(II) iodide.',
    mechanism: 'Lead(II) cations (Pb²⁺) combine with iodide anions (I⁻) to form an insoluble ionic lattice with very low solubility product (Ksp = 9.8 × 10⁻⁹).'
  },

  // 2. Precipitation: Silver nitrate + Hydrochloric acid / chloride -> Silver chloride (Curdy white)
  {
    id: 'silver_chloride',
    name: 'Precipitation of Silver Chloride',
    category: 'precipitation',
    reactants: [['silver_salt', 'agno3_aq'], ['strong_acid', 'hcl']],
    equation: 'AgNO₃(aq) + HCl(aq) → AgCl↓ (curdy white) + HNO₃(aq)',
    status: 'precipitation',
    title: 'Curdy White AgCl Precipitate',
    color: '#ffffff',
    after_color: 'rgba(240, 245, 250, 0.85)',
    precipitate_color: '#ffffff',
    effects: ['precipitate', 'dense_cloud'],
    products: ['AgCl white precipitate', 'HNO₃ solution'],
    temperatureChange: 2.0,
    description: 'A dense, curdy milk-white precipitate of silver chloride forms instantaneously upon mixing silver ions with chloride ions.',
    mechanism: 'Ag⁺ + Cl⁻ → AgCl(s). Silver chloride is highly insoluble in acidic solution (Ksp = 1.8 × 10⁻¹⁰) and turns purple-grey when exposed to sunlight.'
  },

  // 3. Precipitation: Copper sulfate + Sodium hydroxide -> Copper(II) hydroxide
  {
    id: 'copper_hydroxide',
    name: 'Precipitation of Copper(II) Hydroxide',
    category: 'precipitation',
    reactants: [['salt_solution', 'cuso4_aq', 'cuso4_s'], ['strong_base', 'naoh']],
    equation: 'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂↓ (gelatinous blue) + Na₂SO₄(aq)',
    status: 'precipitation',
    title: 'Gelatinous Blue Cu(OH)₂ Precipitate',
    color: '#1e90ff',
    after_color: 'rgba(30, 144, 255, 0.82)',
    precipitate_color: '#0070e0',
    effects: ['precipitate', 'bubbles'],
    products: ['Cu(OH)₂ gelatinous precipitate', 'Na₂SO₄ solution'],
    temperatureChange: 4.2,
    description: 'A flocculent, sea-blue gelatinous precipitate of copper(II) hydroxide forms rapidly as hydroxide ions replace sulfate counterions.',
    mechanism: 'Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s). If gently heated, the blue precipitate dehydrates into black copper(II) oxide (CuO).'
  },

  // 4. Precipitation: Barium chloride + Sulfuric acid -> Barium sulfate
  {
    id: 'barium_sulfate',
    name: 'Barium Sulfate Sulfate Test',
    category: 'precipitation',
    reactants: [['barium_salt', 'bacl2_aq'], ['strong_acid', 'h2so4']],
    equation: 'BaCl₂(aq) + H₂SO₄(aq) → BaSO₄↓ (heavy white) + 2HCl(aq)',
    status: 'precipitation',
    title: 'Dense Barium Sulfate Precipitate',
    color: '#f8fafc',
    after_color: 'rgba(245, 250, 255, 0.9)',
    precipitate_color: '#ffffff',
    effects: ['precipitate'],
    products: ['BaSO₄ dense precipitate', '2HCl(aq)'],
    temperatureChange: 3.0,
    description: 'Classic analytical test for sulfate ions: yields a fine, dense milky-white precipitate completely insoluble in concentrated mineral acids.',
    mechanism: 'Ba²⁺ + SO₄²⁻ → BaSO₄(s). The extremely lattice enthalpy of barium sulfate makes it virtually insoluble (Ksp = 1.1 × 10⁻¹⁰).'
  },

  // 5. Complexation: Iron(III) chloride + Potassium thiocyanate -> [Fe(SCN)]2+ (Blood Red)
  {
    id: 'iron_thiocyanate',
    name: 'Blood-Red Thiocyanatoiron(III) Complex',
    category: 'complexation',
    reactants: [['iron_salt', 'fecl3_aq'], ['thiocyanate', 'kscn_aq']],
    equation: 'FeCl₃(aq) + 3KSCN(aq) ⇌ [Fe(SCN)(H₂O)₅]²⁺ (blood red) + 3KCl(aq)',
    status: 'color_change',
    title: 'Blood-Red Coordination Complex',
    color: '#8b0000',
    after_color: 'rgba(165, 0, 0, 0.92)',
    effects: ['deep_color_shift'],
    products: ['[Fe(SCN)]²⁺ blood-red complex', 'KCl solution'],
    temperatureChange: 1.0,
    description: 'Instantaneous transition from pale amber to deep, velvety blood-red due to charge-transfer ligand-to-metal orbital transition.',
    mechanism: 'Fe³⁺(aq) + SCN⁻(aq) ⇌ [Fe(SCN)]²⁺(aq). The intense red color is caused by a ligand-to-metal charge transfer (LMCT) absorption at λmax = 475 nm.'
  },

  // 6. Complexation: Copper sulfate + Excess Ammonia -> Tetraamminecopper(II) (Royal Azure)
  {
    id: 'tetraamminecopper',
    name: 'Deep Royal Blue Tetraamminecopper(II)',
    category: 'complexation',
    reactants: [['salt_solution', 'cuso4_aq'], ['weak_base', 'nh3_aq']],
    equation: 'CuSO₄(aq) + 4NH₃(aq) → [Cu(NH₃)₄(H₂O)₂]²⁺ (deep azure blue) + SO₄²⁻',
    status: 'color_change',
    title: 'Deep Azure Tetraammine Complex',
    color: '#001fa3',
    after_color: 'rgba(0, 31, 163, 0.92)',
    effects: ['deep_color_shift', 'bubbles'],
    products: ['[Cu(NH₃)₄]²⁺ complex', 'Sulfate solution'],
    temperatureChange: 3.5,
    description: 'Light sky blue solution deepens dramatically into an intense, glowing royal azure-indigo color as ammonia displaces water ligands.',
    mechanism: 'Ammonia is a stronger Lewis base ligand than water in the spectrochemical series, causing a larger crystal field splitting (Δo).'
  },

  // 7. Gas Evolution / Displacement: Zinc + Hydrochloric Acid -> Hydrogen Gas
  {
    id: 'zinc_hcl',
    name: 'Single Displacement of Hydrogen by Zinc',
    category: 'gas_evolution',
    reactants: [['metal', 'zinc'], ['strong_acid', 'hcl', 'h2so4']],
    equation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂↑ (effervescent bubbles)',
    status: 'gas_evolution',
    title: 'Vigorous Hydrogen Gas Effervescence',
    color: '#edf6fa',
    after_color: 'rgba(235, 248, 255, 0.75)',
    effects: ['bubbles', 'gas', 'rapid_fizzing'],
    products: ['ZnCl₂ solution', 'H₂ gas ↑'],
    temperatureChange: 18.5,
    gasProduced: 'H₂',
    description: 'Zinc granules effervesce briskly, releasing continuous streams of buoyant hydrogen gas micro-bubbles while warming the vessel.',
    mechanism: 'Redox displacement: Zn(s) is oxidized (Zn → Zn²⁺ + 2e⁻, E° = -0.76 V) while hydrogen ions are reduced (2H⁺ + 2e⁻ → H₂).'
  },

  // 8. Gas Evolution / Displacement: Magnesium + Hydrochloric Acid -> Hydrogen Gas (Rapid Exothermic)
  {
    id: 'magnesium_hcl',
    name: 'Vigorous Reaction of Magnesium with Acid',
    category: 'gas_evolution',
    reactants: [['metal', 'magnesium'], ['strong_acid', 'hcl', 'h2so4']],
    equation: 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂↑ + heat (ΔH = -462 kJ/mol)',
    status: 'gas_evolution',
    title: 'Violent Effervescence & Steam Release',
    color: '#f0fbff',
    after_color: 'rgba(230, 248, 255, 0.7)',
    effects: ['bubbles', 'gas', 'heat_wave', 'rapid_fizzing'],
    products: ['MgCl₂ solution', 'H₂ gas ↑'],
    temperatureChange: 38.0,
    gasProduced: 'H₂',
    description: 'Magnesium ribbon darts across the liquid surface with violent sizzling, rapid hydrogen gas evolution, and significant heat release.',
    mechanism: 'Highly exothermic single displacement (E° Mg²⁺/Mg = -2.37 V). Vessel walls heat up rapidly from room temperature to over 60 °C.'
  },

  // 9. Gas Evolution: Calcium carbonate + Hydrochloric acid -> Carbon Dioxide
  {
    id: 'carbonate_acid',
    name: 'Acid Decomposition of Calcium Carbonate',
    category: 'gas_evolution',
    reactants: [['carbonate', 'calcium_carbonate', 'sodium_bicarbonate'], ['strong_acid', 'hcl', 'h2so4']],
    equation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂↑ (effervescence)',
    status: 'gas_evolution',
    title: 'Carbon Dioxide Frothing & Fizzing',
    color: '#f5fafc',
    after_color: 'rgba(235, 245, 250, 0.7)',
    effects: ['bubbles', 'gas', 'frothing'],
    products: ['CaCl₂ solution', 'CO₂ gas ↑', 'H₂O'],
    temperatureChange: 4.5,
    gasProduced: 'CO₂',
    description: 'Marble chips froth vigorously as carbonic acid forms and instantly decomposes into water and effervescing carbon dioxide gas.',
    mechanism: 'CO₃²⁻ + 2H⁺ ⇌ H₂CO₃ ⇌ H₂O + CO₂(g)↑. The evolved dense gas extinguishes lighted splints and turns limewater milky.'
  },

  // 10. Alkali Metal: Sodium metal + Water -> Violent Explosion / Flame
  {
    id: 'sodium_water',
    name: 'Violent Reaction of Sodium with Water',
    category: 'violent_alkali',
    reactants: [['alkali_metal', 'sodium'], ['water', 'water']],
    equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂↑ + flame (ΔH = -368 kJ/mol)',
    status: 'violent',
    title: 'Explosive Flame & Hydrogen Ignition',
    color: '#ff6600',
    after_color: 'rgba(255, 200, 150, 0.65)',
    effects: ['fire', 'smoke', 'bubbles', 'gas', 'sparks'],
    products: ['NaOH alkaline solution', 'H₂ gas ↑', 'Heat & yellow sodium flame'],
    temperatureChange: 65.0,
    description: 'Sodium metal melts into a molten spherical bead, skitters frantically on the surface, generates hydrogen gas, and bursts into bright yellow flames with loud pops!',
    mechanism: 'High reactivity of Group 1 element Na. The intense heat of reaction easily reaches the auto-ignition temperature of released hydrogen gas in air.'
  },

  // 11. Neutralization with Phenolphthalein: Acid + Base + Indicator
  {
    id: 'neutralization_indicator',
    name: 'Acid-Base Neutralization with Phenolphthalein',
    category: 'neutralization',
    reactants: [['strong_acid', 'hcl', 'h2so4'], ['strong_base', 'naoh']],
    equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) (ΔH = -57.3 kJ/mol)',
    status: 'neutralization',
    title: 'Neutralization & Salt Water Formation',
    color: '#c2f2dc',
    after_color: 'rgba(195, 240, 220, 0.7)',
    effects: ['bubbles'],
    products: ['NaCl neutral salt', 'H₂O water'],
    temperatureChange: 8.5,
    description: 'Equimolar amounts of strong acid and strong base combine to form pure salt and water, evolving standard enthalpy of neutralization (57.3 kJ/mol).',
    mechanism: 'Hydronium and hydroxide ions combine: H₃O⁺ + OH⁻ → 2H₂O. The solution approaches neutral pH 7.0.'
  },

  // 12. Indicator color change: Base + Phenolphthalein
  {
    id: 'phenolphthalein_base',
    name: 'Phenolphthalein Alkaline Color Change',
    category: 'neutralization',
    reactants: [['strong_base', 'weak_base', 'naoh', 'nh3_aq'], ['indicator_pp', 'phenolphthalein']],
    equation: 'In⁻ (colorless) + OH⁻ ⇌ In²⁻ (vibrant fuchsia pink, pH > 8.2)',
    status: 'color_change',
    title: 'Fuchsia Pink Alkaline Indicator',
    color: '#e91e63',
    after_color: 'rgba(233, 30, 99, 0.82)',
    effects: ['deep_color_shift'],
    products: ['Pink alkaline indicator solution'],
    temperatureChange: 0.5,
    description: 'Colorless indicator molecule undergoes structural opening into a conjugated quinoid dianion, flashing radiant magenta pink.',
    mechanism: 'Deprotonation of phenolphthalein opens its central lactone ring into an extended conjugated chromophore that strongly absorbs green light.'
  },

  // 13. Universal Indicator: Acid (Red) or Base (Purple/Blue)
  {
    id: 'universal_acid',
    name: 'Universal Indicator with Acid (Red/Orange)',
    category: 'neutralization',
    reactants: [['strong_acid', 'hcl', 'h2so4'], ['indicator_ui', 'universal_indicator']],
    equation: 'Universal Indicator + H⁺ → Vivid Ruby Red (pH 1 - 2)',
    status: 'color_change',
    title: 'Acidic Red Indicator Hue',
    color: '#e53935',
    after_color: 'rgba(229, 57, 53, 0.85)',
    effects: ['deep_color_shift'],
    products: ['Acidic red solution (pH ~ 1)'],
    temperatureChange: 0.5,
    description: 'Universal indicator turns intense bright red, indicating a strongly acidic pH between 1.0 and 2.0.',
    mechanism: 'Thymol blue and methyl red components become fully protonated in high [H⁺] concentration.'
  },

  // 14. Universal Indicator with Base (Purple)
  {
    id: 'universal_base',
    name: 'Universal Indicator with Base (Purple/Violet)',
    category: 'neutralization',
    reactants: [['strong_base', 'naoh'], ['indicator_ui', 'universal_indicator']],
    equation: 'Universal Indicator + OH⁻ → Deep Royal Violet (pH 12 - 14)',
    status: 'color_change',
    title: 'Alkaline Purple Indicator Hue',
    color: '#7b1fa2',
    after_color: 'rgba(123, 31, 162, 0.85)',
    effects: ['deep_color_shift'],
    products: ['Alkaline violet solution (pH ~ 13)'],
    temperatureChange: 0.5,
    description: 'Universal indicator shifts through emerald green and royal blue to rich violet-purple, confirming caustic alkaline pH.',
    mechanism: 'Bromothymol blue and phenolphthalein indicator components are fully deprotonated.'
  },

  // 15. Thermal Decomposition: Copper(II) oxide / Carbonate on Heating
  {
    id: 'thermal_decomposition_cu',
    name: 'Thermal Decomposition of Copper Carbonate',
    category: 'decomposition',
    reactants: [['carbonate', 'calcium_carbonate'], ['heater', 'burner']],
    equation: 'CuCO₃(s) (green) + heat → CuO(s) (black) + CO₂↑',
    status: 'decomposition',
    title: 'Thermal Color Transition & Gas Release',
    color: '#2a2a2a',
    after_color: 'rgba(40, 40, 40, 0.95)',
    effects: ['heat_wave', 'smoke', 'gas'],
    products: ['CuO black solid powder', 'CO₂ gas ↑'],
    temperatureChange: 95.0,
    description: 'Green copper carbonate decomposes upon heating into fine velvety black copper(II) oxide and evolving carbon dioxide gas.',
    mechanism: 'High thermal energy breaks weak metal-carbonate bonds, yielding stable transition metal oxide lattice.'
  },

  // 16. Combustion: Ethanol + Burner
  {
    id: 'ethanol_combustion',
    name: 'Combustion of Ethanol',
    category: 'combustion',
    reactants: [['alcohol', 'ethanol'], ['heater', 'burner']],
    equation: 'C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g) + heat (ΔH = -1367 kJ/mol)',
    status: 'combustion',
    title: 'Luminous Blue-Yellow Clean Flame',
    color: '#ff9900',
    after_color: 'rgba(255, 170, 0, 0.6)',
    effects: ['fire', 'smoke', 'heat_wave'],
    products: ['CO₂ gas', 'H₂O vapor', 'Radiant heat'],
    temperatureChange: 85.0,
    description: 'Ethanol ignites smoothly, burning with a pale luminous blue-yellow flame releasing water vapor and carbon dioxide.',
    mechanism: 'Complete oxidation of alcohol hydrocarbon backbone with atmospheric oxygen.'
  },

  // 17. Dissolution: Copper sulfate crystals + Water
  {
    id: 'cuso4_dissolution',
    name: 'Aqueous Hydration of Copper(II) Sulfate',
    category: 'dissolution',
    reactants: [['salt_solid', 'cuso4_s'], ['water', 'water']],
    equation: 'CuSO₄(s) + 6H₂O(l) → [Cu(H₂O)₆]²⁺(aq) + SO₄²⁻(aq) (sky blue)',
    status: 'dissolution',
    title: 'Hydration to Sky Blue Solution',
    color: '#2b8fe0',
    after_color: 'rgba(43, 143, 224, 0.8)',
    effects: ['dissolving_crystals'],
    products: ['[Cu(H₂O)₆]²⁺ copper sulfate solution'],
    temperatureChange: -1.2,
    description: 'Blue crystals dissolve smoothly into distilled water, forming a brilliant clear turquoise blue hexaaquacopper(II) solution.',
    mechanism: 'Water dipoles hydrate Cu²⁺ and SO₄²⁻ lattice ions, generating octahedral [Cu(H₂O)₆]²⁺ complex ions.'
  },

  // 18. Dissolution: Potassium permanganate + Water
  {
    id: 'kmno4_dissolution',
    name: 'Dissolution of Potassium Permanganate',
    category: 'dissolution',
    reactants: [['oxidizer_solid', 'potassium_permanganate_s'], ['water', 'water']],
    equation: 'KMnO₄(s) + H₂O(l) → K⁺(aq) + MnO₄⁻(aq) (intense magenta)',
    status: 'dissolution',
    title: 'Vivid Magenta Permanganate Solution',
    color: '#7b1178',
    after_color: 'rgba(123, 17, 120, 0.88)',
    effects: ['deep_color_shift', 'dissolving_crystals'],
    products: ['Intense purple KMnO₄ solution'],
    temperatureChange: -0.8,
    description: 'Dark purple crystals dissolve instantly with vibrant swirling plumes of rich royal magenta permanganate ions.',
    mechanism: 'MnO₄⁻ tetraoxoanions diffuse through solvent; strong ligand-to-metal charge transfer produces exceptionally high molar absorptivity.'
  }
];

// Helper to evaluate a reaction from an array of chemical/item objects
export function evaluateMixture(items, isHeated = false) {
  if (!items || items.length === 0) return null;

  const categories = items.map((i) => i.category || i.type);
  const ids = items.map((i) => i.id);

  // If heat is active, check thermal reactions first
  if (isHeated) {
    const alcohol = items.find((i) => i.category === 'alcohol' || i.id === 'ethanol');
    if (alcohol) {
      return REACTION_RULES.find((r) => r.id === 'ethanol_combustion');
    }
    const decomposer = items.find((i) => i.id === 'calcium_carbonate' || i.id === 'cuo');
    if (decomposer) {
      return REACTION_RULES.find((r) => r.id === 'thermal_decomposition_cu');
    }
  }

  // Check each reaction rule
  for (const rule of REACTION_RULES) {
    const [groupA, groupB] = rule.reactants;

    const hasA = items.some((item) =>
      groupA.includes(item.category) || groupA.includes(item.id)
    );
    const hasB = items.some((item) =>
      groupB.includes(item.category) || groupB.includes(item.id)
    );

    if (hasA && hasB) {
      return rule;
    }
  }

  // Special cases for indicator with mixture
  const hasPP = items.some((i) => i.category === 'indicator_pp' || i.id === 'phenolphthalein');
  const hasBase = items.some((i) => i.category === 'strong_base' || i.category === 'weak_base');
  const hasAcid = items.some((i) => i.category === 'strong_acid');

  if (hasPP && hasBase && !hasAcid) {
    return REACTION_RULES.find((r) => r.id === 'phenolphthalein_base');
  }

  return null;
}

// Reaction Showcase Categories for the First Page
export const SHOWCASE_CATEGORIES = [
  {
    id: 'precipitation',
    name: 'Precipitation Reactions',
    badge: 'Insoluble Salt Formation',
    icon: '🌧',
    tagline: 'Witness two clear aqueous solutions clash to form stunning insoluble micro-crystalline precipitates.',
    featured: 'golden_rain',
    examples: [
      {
        id: 'golden_rain',
        name: 'Lead(II) Nitrate + Potassium Iodide',
        subtitle: 'The Legendary "Golden Rain" Reaction',
        reactants: ['lead_nitrate_aq', 'ki_aq'],
        equation: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓ (yellow) + 2KNO₃(aq)',
        color: '#ffd700',
        precipitateColor: '#ffd700',
        observation: 'Instant formation of luminous golden-yellow crystalline flakes of lead(II) iodide settling at the base.',
        vessel: 'beaker_250',
        suitableTools: ['beaker_250', 'dropper', 'measuring_cylinder']
      },
      {
        id: 'silver_chloride',
        name: 'Silver Nitrate + Hydrochloric Acid',
        subtitle: 'Curdy White Insoluble Silver Halide',
        reactants: ['agno3_aq', 'hcl'],
        equation: 'AgNO₃(aq) + HCl(aq) → AgCl↓ (curdy white) + HNO₃(aq)',
        color: '#ffffff',
        precipitateColor: '#ffffff',
        observation: 'Heavy, dense curdy white silver chloride precipitate forms and flocculates instantly.',
        vessel: 'small_test_tube',
        suitableTools: ['small_test_tube', 'dropper']
      },
      {
        id: 'copper_hydroxide',
        name: 'Copper(II) Sulfate + Sodium Hydroxide',
        subtitle: 'Gelatinous Royal Sea-Blue Hydroxide',
        reactants: ['cuso4_aq', 'naoh'],
        equation: 'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂↓ (gelatinous blue) + Na₂SO₄(aq)',
        color: '#1e90ff',
        precipitateColor: '#0070e0',
        observation: 'A gelatinous, semi-translucent sky-blue copper(II) hydroxide precipitate clouds the beaker.',
        vessel: 'beaker_100',
        suitableTools: ['beaker_100', 'dropper']
      }
    ]
  },
  {
    id: 'neutralization',
    name: 'Acid-Base & Indicators',
    badge: 'Proton Transfer & pH Indicators',
    icon: '🧪',
    tagline: 'Observe proton transfer, enthalpy release, and dramatic pH indicator color transformations.',
    featured: 'phenolphthalein_base',
    examples: [
      {
        id: 'phenolphthalein_base',
        name: 'Sodium Hydroxide + Phenolphthalein',
        subtitle: 'Alkaline Fuchsia Pink Transformation',
        reactants: ['naoh', 'phenolphthalein'],
        equation: 'In⁻ (colorless) + OH⁻ ⇌ In²⁻ (vibrant fuchsia pink, pH > 8.2)',
        color: '#e91e63',
        observation: 'Instant chromatic flash from crystal clear to vibrant, radiant fuchsia pink.',
        vessel: 'conical_flask',
        suitableTools: ['conical_flask', 'dropper', 'ph_meter']
      },
      {
        id: 'neutralization_indicator',
        name: 'Hydrochloric Acid + Sodium Hydroxide',
        subtitle: 'Standard Enthalpy Neutralization',
        reactants: ['hcl', 'naoh'],
        equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) (ΔH = -57.3 kJ/mol)',
        color: '#a8f0d2',
        observation: 'Exothermic heat released (+8.5 °C). Clear saline solution forms at neutral pH 7.0.',
        vessel: 'beaker_250',
        suitableTools: ['beaker_250', 'thermometer', 'ph_meter']
      },
      {
        id: 'universal_acid',
        name: 'Hydrochloric Acid + Universal Indicator',
        subtitle: 'Strong Acidity Crimson Scale',
        reactants: ['hcl', 'universal_indicator'],
        equation: 'HCl + Universal Indicator → Ruby Red (pH 1.0)',
        color: '#e53935',
        observation: 'Color switches to deep ruby crimson, signaling highly concentrated hydronium ions.',
        vessel: 'small_test_tube',
        suitableTools: ['small_test_tube', 'dropper']
      }
    ]
  },
  {
    id: 'gas_evolution',
    name: 'Gas Evolution & Redox',
    badge: 'Effervescence & Displacement',
    icon: '💨',
    tagline: 'Reactive metals and carbonates generate vigorous buoyant gases, bubbling, and enthalpy changes.',
    featured: 'zinc_hcl',
    examples: [
      {
        id: 'zinc_hcl',
        name: 'Zinc Granules + Hydrochloric Acid',
        subtitle: 'Hydrogen Gas Generation',
        reactants: ['zinc', 'hcl'],
        equation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂↑ (effervescent bubbles)',
        color: '#eef8fc',
        observation: 'Vigorous bubbling effervescence of hydrogen gas streaming from zinc granule surfaces.',
        vessel: 'side_arm_tube',
        suitableTools: ['side_arm_tube', 'delivery_tube', 'gas_jar', 'spatula']
      },
      {
        id: 'magnesium_hcl',
        name: 'Magnesium Ribbon + Hydrochloric Acid',
        subtitle: 'Fast Exothermic Metal Dissolution',
        reactants: ['magnesium', 'hcl'],
        equation: 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂↑ + heat (ΔH = -462 kJ/mol)',
        color: '#f0fbff',
        observation: 'Magnesium ribbon darts violently across the surface with boiling bubbles and hot steam.',
        vessel: 'large_test_tube',
        suitableTools: ['large_test_tube', 'forceps', 'thermometer']
      },
      {
        id: 'carbonate_acid',
        name: 'Calcium Carbonate + Hydrochloric Acid',
        subtitle: 'Carbon Dioxide Frothing',
        reactants: ['calcium_carbonate', 'hcl'],
        equation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂↑',
        color: '#f2f8fa',
        observation: 'Rapid white frothing and steady release of dense, fire-extinguishing carbon dioxide gas.',
        vessel: 'beaker_250',
        suitableTools: ['beaker_250', 'spatula', 'gas_jar']
      }
    ]
  },
  {
    id: 'complexation',
    name: 'Complexation & Colors',
    badge: 'Transition Metal Coordination',
    icon: '🔮',
    tagline: 'Discover dazzling color shifts when ligands coordinate with transition metal d-orbitals.',
    featured: 'iron_thiocyanate',
    examples: [
      {
        id: 'iron_thiocyanate',
        name: 'Iron(III) Chloride + Potassium Thiocyanate',
        subtitle: 'The Blood-Red Coordination Test',
        reactants: ['fecl3_aq', 'kscn_aq'],
        equation: 'FeCl₃(aq) + 3KSCN(aq) ⇌ [Fe(SCN)]²⁺ (blood red) + 3KCl(aq)',
        color: '#8b0000',
        observation: 'Immediate transition from faint pale amber into velvety, opaque blood-red.',
        vessel: 'small_test_tube',
        suitableTools: ['small_test_tube', 'dropper']
      },
      {
        id: 'tetraamminecopper',
        name: 'Copper(II) Sulfate + Ammonia Solution',
        subtitle: 'Deep Royal Azure Tetraammine Complex',
        reactants: ['cuso4_aq', 'nh3_aq'],
        equation: 'CuSO₄(aq) + 4NH₃(aq) → [Cu(NH₃)₄]²⁺ (royal azure) + SO₄²⁻',
        color: '#001fa3',
        observation: 'Sky blue solution transforms into a breathtaking, deep radiant royal blue complex.',
        vessel: 'beaker_100',
        suitableTools: ['beaker_100', 'dropper']
      }
    ]
  },
  {
    id: 'violent_alkali',
    name: 'Alkali Metal Violent Reactions',
    badge: 'Pyrotechnic Redox',
    icon: '🔥',
    tagline: 'Experience explosive energy release, dancing metal spheres, flames, and hydrogen combustion.',
    featured: 'sodium_water',
    examples: [
      {
        id: 'sodium_water',
        name: 'Sodium Metal + Water',
        subtitle: 'Violent Alkali Metal Oxidation',
        reactants: ['sodium', 'water'],
        equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂↑ + yellow flame',
        color: '#ff6600',
        observation: 'Silvery sodium melts into a dancing sphere, smokes, emits sparks, and bursts into flame.',
        vessel: 'beaker_250',
        suitableTools: ['beaker_250', 'forceps', 'watch_glass']
      }
    ]
  },
  {
    id: 'decomposition',
    name: 'Thermal Decomposition & Dissolution',
    badge: 'Thermal Cleavage & Crystal Hydration',
    icon: '♨',
    tagline: 'Examine crystal dissolution dynamics and thermal breakdowns under Bunsen burner heating.',
    featured: 'kmno4_dissolution',
    examples: [
      {
        id: 'kmno4_dissolution',
        name: 'Potassium Permanganate + Distilled Water',
        subtitle: 'Vivid Royal Violet Permanganate Plume',
        reactants: ['potassium_permanganate_s', 'water'],
        equation: 'KMnO₄(s) + H₂O(l) → K⁺(aq) + MnO₄⁻(aq) (intense magenta)',
        color: '#7b1178',
        observation: 'Deep purple crystals dissolve into billowing plumes of intense royal magenta solution.',
        vessel: 'flask_round',
        suitableTools: ['round_flask', 'spatula', 'stirring_rod']
      },
      {
        id: 'cuso4_dissolution',
        name: 'Copper(II) Sulfate Crystals + Water',
        subtitle: 'Aqueous Crystal Hydration',
        reactants: ['cuso4_s', 'water'],
        equation: 'CuSO₄(s) + 6H₂O(l) → [Cu(H₂O)₆]²⁺(aq) (clear sky blue)',
        color: '#2b8fe0',
        observation: 'Blue crystals slowly dissolve with stirring to produce uniform sky blue liquid.',
        vessel: 'beaker_250',
        suitableTools: ['beaker_250', 'spatula', 'stirring_rod']
      }
    ]
  }
];
