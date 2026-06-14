export interface PlanetData {
  id: string;
  name: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  modelUrl: string;
  mission: string;
  zone: string;
  habitability: string;
  atmosphere: {
    gas: string;
    percentage: number;
  }[];
  equipment: string[];
}

export const planets: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    description: "The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon. It has a rocky surface covered with craters.",
    stats: [
      { label: "Gravity", value: "3.7 m/s²" },
      { label: "Orbital Speed", value: "47.87 km/s" },
      { label: "Moons", value: "0" },
      { label: "Density", value: "5.43 g/cm³" },
      { label: "Mass", value: "3.30 × 10^23 kg" },
    ],
    modelUrl: "/models/mercury-v2.bin",
    mission: "SURVEY SOLAR FLARE IMPACT CRATERS",
    zone: "SECTOR M-1",
    habitability: "CLASS 9: LETHAL HEAT",
    atmosphere: [
      { gas: "Oxygen", percentage: 42 },
      { gas: "Sodium", percentage: 29 },
      { gas: "Hydrogen", percentage: 22 },
      { gas: "Helium", percentage: 6 }
    ],
    equipment: ["THERMAL_SHIELD", "SOLAR_PROBE", "RADIATION_SUIT"]
  },
  {
    id: "venus",
    name: "Venus",
    description: "Venus is the second planet from the Sun. It is Earth's planetary twin in size, but has a toxic, suffocating atmosphere that traps heat in a runaway greenhouse effect.",
    stats: [
      { label: "Gravity", value: "8.87 m/s²" },
      { label: "Orbital Speed", value: "35.02 km/s" },
      { label: "Moons", value: "0" },
      { label: "Density", value: "5.24 g/cm³" },
      { label: "Mass", value: "4.87 × 10^24 kg" },
    ],
    modelUrl: "/models/venus-v2.bin",
    mission: "ANALYZE RUNAWAY GREENHOUSE KINETICS",
    zone: "SECTOR V-2",
    habitability: "CLASS 10: TOXIC/LETHAL",
    atmosphere: [
      { gas: "Carbon Dioxide", percentage: 96.5 },
      { gas: "Nitrogen", percentage: 3.5 }
    ],
    equipment: ["ACID_RESISTANT_HULL", "HIGH_PRESSURE_SEALS"]
  },
  {
    id: "earth",
    name: "Earth",
    description: "Earth is our home, teeming with life and diverse ecosystems. It boasts water and a protective atmosphere that sustains the unique conditions for life.",
    stats: [
      { label: "Gravity", value: "9.8 m/s²" },
      { label: "Orbital Speed", value: "29.78 km/s" },
      { label: "Moons", value: "1 (The Moon)" },
      { label: "Density", value: "5.51 g/cm³" },
      { label: "Mass", value: "5.97 × 10^24 kg" },
    ],
    modelUrl: "/models/earth-v2.bin",
    mission: "MAINTAIN BIOSPHERE EQUILIBRIUM",
    zone: "SECTOR E-3 (HOME)",
    habitability: "CLASS 1: OPTIMAL",
    atmosphere: [
      { gas: "Nitrogen", percentage: 78.1 },
      { gas: "Oxygen", percentage: 20.9 },
      { gas: "Argon", percentage: 0.9 }
    ],
    equipment: ["STANDARD_KIT", "COMM_ARRAY"]
  },
  {
    id: "mars",
    name: "Mars",
    description: "Known as the Red Planet, Mars is a dusty, cold, desert world with a very thin atmosphere. It is a dynamic planet with seasons, polar ice caps, canyons, and extinct volcanoes.",
    stats: [
      { label: "Gravity", value: "3.72 m/s²" },
      { label: "Orbital Speed", value: "24.07 km/s" },
      { label: "Moons", value: "2 (Phobos, Deimos)" },
      { label: "Density", value: "3.93 g/cm³" },
      { label: "Mass", value: "6.42 × 10^23 kg" },
    ],
    modelUrl: "/models/mars-v2.bin",
    mission: "LOCATE SUBSURFACE ICE DEPOSITS",
    zone: "SECTOR M-4",
    habitability: "CLASS 4: HOSTILE",
    atmosphere: [
      { gas: "Carbon Dioxide", percentage: 95.3 },
      { gas: "Nitrogen", percentage: 2.7 },
      { gas: "Argon", percentage: 1.6 }
    ],
    equipment: ["TERRAIN_ROVER", "DRILL_RIG", "HAB_UNIT"]
  },
  {
    id: "jupiter",
    name: "Jupiter",
    description: "Jupiter, a colossal gas giant, features swirling clouds and a strong magnetic field. The Great Red Spot is a prominent feature of this massive planet.",
    stats: [
      { label: "Gravity", value: "24.79 m/s²" },
      { label: "Orbital Speed", value: "13.07 km/s" },
      { label: "Moons", value: "95" },
      { label: "Density", value: "1.33 g/cm³" },
      { label: "Mass", value: "1.90 × 10^27 kg" },
    ],
    modelUrl: "/models/jupiter-v2.bin",
    mission: "MONITOR GREAT RED SPOT TURBULENCE",
    zone: "SECTOR J-5",
    habitability: "CLASS 10: CRUSHING DEPTHS",
    atmosphere: [
      { gas: "Hydrogen", percentage: 89.8 },
      { gas: "Helium", percentage: 10.2 }
    ],
    equipment: ["GRAVITY_SHIELDING", "ATMOSPHERIC_PROBE"]
  },
  {
    id: "saturn",
    name: "Saturn",
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is adorned with a dazzling system of icy rings.",
    stats: [
      { label: "Gravity", value: "10.44 m/s²" },
      { label: "Orbital Speed", value: "9.68 km/s" },
      { label: "Moons", value: "146" },
      { label: "Density", value: "0.687 g/cm³" },
      { label: "Mass", value: "5.68 × 10^26 kg" },
    ],
    modelUrl: "/models/saturn-v2.bin",
    mission: "MAP RING DEBRIS FIELDS",
    zone: "SECTOR S-6",
    habitability: "CLASS 9: GASEOUS/HOSTILE",
    atmosphere: [
      { gas: "Hydrogen", percentage: 96.3 },
      { gas: "Helium", percentage: 3.25 }
    ],
    equipment: ["COLLISION_RADAR", "ICE_COLLECTOR"]
  },
  {
    id: "uranus",
    name: "Uranus",
    description: "Uranus is the seventh planet from the Sun. It rotates at a nearly 90-degree angle from the plane of its orbit, making it appear to spin on its side.",
    stats: [
      { label: "Gravity", value: "8.69 m/s²" },
      { label: "Orbital Speed", value: "6.80 km/s" },
      { label: "Moons", value: "28" },
      { label: "Density", value: "1.27 g/cm³" },
      { label: "Mass", value: "8.68 × 10^25 kg" },
    ],
    modelUrl: "/models/uranus-v2.bin",
    mission: "INVESTIGATE ORBITAL ANOMALY",
    zone: "SECTOR U-7",
    habitability: "CLASS 8: EXTREME COLD",
    atmosphere: [
      { gas: "Hydrogen", percentage: 82.5 },
      { gas: "Helium", percentage: 15.2 },
      { gas: "Methane", percentage: 2.3 }
    ],
    equipment: ["CRYOGENIC_BAFFLES", "MAGNETOMETER"]
  },
  {
    id: "neptune",
    name: "Neptune",
    description: "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.",
    stats: [
      { label: "Gravity", value: "11.15 m/s²" },
      { label: "Orbital Speed", value: "5.43 km/s" },
      { label: "Moons", value: "16" },
      { label: "Density", value: "1.64 g/cm³" },
      { label: "Mass", value: "1.02 × 10^26 kg" },
    ],
    modelUrl: "/models/neptune-v2.bin",
    mission: "MEASURE SUPERSONIC WINDS",
    zone: "SECTOR N-8",
    habitability: "CLASS 9: VIOLENT ATMOSPHERE",
    atmosphere: [
      { gas: "Hydrogen", percentage: 80.0 },
      { gas: "Helium", percentage: 19.0 },
      { gas: "Methane", percentage: 1.0 }
    ],
    equipment: ["AERODYNAMIC_STABILIZERS", "DEEP_SPACE_TELESCOPE"]
  },
  {
    id: "pluto",
    name: "Pluto",
    description: "Once considered the ninth planet, Pluto is now classified as a dwarf planet. It is a complex and mysterious world with mountains, valleys, and craters.",
    stats: [
      { label: "Gravity", value: "0.62 m/s²" },
      { label: "Orbital Speed", value: "4.74 km/s" },
      { label: "Moons", value: "5" },
      { label: "Density", value: "1.85 g/cm³" },
      { label: "Mass", value: "1.30 × 10^22 kg" },
    ],
    modelUrl: "/models/pluto-v2.bin",
    mission: "SURVEY KUIPER BELT OBJECTS",
    zone: "SECTOR P-9",
    habitability: "CLASS 7: BARREN ROCK",
    atmosphere: [
      { gas: "Nitrogen", percentage: 90.0 },
      { gas: "Methane", percentage: 10.0 }
    ],
    equipment: ["LONG_RANGE_SENSORS", "MINING_LASER"]
  }
];
