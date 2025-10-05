export interface ArcherConfig {
  id: string;
  name: string;
  tier: number;
  cost: number;
  range: number;
  fireRate: number;
  damage: number;
  projectileType: string;
  description: string;
}

export const ARCHER_DATA: ArcherConfig[] = [
  // TIER 1: BOW ARCHERS (£0-500)
  {
    id: 'recruit_bow',
    name: 'Recruit Bow',
    tier: 1,
    cost: 0,
    range: 100,
    fireRate: 1.0,
    damage: 10,
    projectileType: 'arrow',
    description: 'FREE starter archer'
  },
  {
    id: 'hunter_bow',
    name: 'Hunter Bow',
    tier: 1,
    cost: 150,
    range: 120,
    fireRate: 1.2,
    damage: 12,
    projectileType: 'arrow',
    description: 'Balanced archer with improved stats'
  },
  {
    id: 'longbow',
    name: 'Longbow',
    tier: 1,
    cost: 250,
    range: 150,
    fireRate: 0.9,
    damage: 18,
    projectileType: 'arrow',
    description: 'Long range, high damage'
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    tier: 1,
    cost: 300,
    range: 110,
    fireRate: 1.5,
    damage: 14,
    projectileType: 'arrow',
    description: 'Fast firing crossbow'
  },
  {
    id: 'rapid_bow',
    name: 'Rapid Bow',
    tier: 1,
    cost: 400,
    range: 90,
    fireRate: 2.5,
    damage: 8,
    projectileType: 'arrow',
    description: 'Very fast fire rate'
  },
  {
    id: 'sniper_bow',
    name: 'Sniper Bow',
    tier: 1,
    cost: 500,
    range: 200,
    fireRate: 0.6,
    damage: 35,
    projectileType: 'arrow',
    description: 'Extreme range sniper'
  }
];

export function getArcherById(id: string): ArcherConfig | undefined {
  return ARCHER_DATA.find(archer => archer.id === id);
}

export function getArchersByTier(tier: number): ArcherConfig[] {
  return ARCHER_DATA.filter(archer => archer.tier === tier);
}
