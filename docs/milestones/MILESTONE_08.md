# MILESTONE 8: All Archers + Enemy Types

**Status**: ⏸️ Pending
**Estimated Time**: 8-10 hours
**Dependencies**: Milestone 7 complete

---

## Objective

Implement all 30 archer types with special abilities, all 8 enemy types, and special attack mechanics.

---

## Key Requirements

### 8.1 Complete Archer Data
**File**: `src/data/archerData.ts`

Populate all 30 archers with full stats (see GAME_DESIGN.md for complete list).

### 8.2 Special Ability System
**File**: `src/systems/SpecialAbilitySystem.ts`

Implement:
- **Splash Damage**: AOE damage in radius
- **Pierce**: Projectile continues through enemy
- **Chain**: Projectile jumps to nearby enemies
- **Poison/DoT**: Damage over time effect
- **Slow**: Reduce enemy speed temporarily
- **Shield Break**: Bonus damage to shields
- **Multi-shot**: Fire multiple projectiles

### 8.3 Enemy Data
**File**: `src/data/enemyData.ts`

```typescript
export interface EnemyConfig {
  id: string;
  name: string;
  baseHP: number;
  speed: number;
  reward: number;
  special?: string;
}

export const ENEMY_DATA: EnemyConfig[] = [
  { id: 'scout', name: 'Scout', baseHP: 40, speed: 120, reward: 10 },
  { id: 'infantry', name: 'Infantry', baseHP: 80, speed: 80, reward: 15 },
  { id: 'heavy', name: 'Heavy', baseHP: 150, speed: 50, reward: 25 },
  { id: 'armored', name: 'Armored', baseHP: 100, speed: 80, reward: 30, special: 'armor' },
  // ... all 8 enemy types
];
```

### 8.4 Projectile Types
Different visuals and behaviors:
- Arrow (arc trajectory)
- Bullet (fast, straight)
- Laser (instant beam)
- Rocket (slow, big splash)
- Energy orb (medium, glowing)

### 8.5 Shop UI Enhancement
Organize shop by tiers with tabs:
- Tier 1: Bows
- Tier 2: Adv Bows
- Tier 3: Energy
- Tier 4: Guns
- Tier 5: Heavy
- Tier 6: Special

---

## Testing Scenarios

1. **All Archers Available**: Can purchase and place all 30 types
2. **Splash Damage**: Explosive Bow damages multiple nearby enemies
3. **Pierce**: Railgun projectile hits 3 enemies in line
4. **Chain Lightning**: Tesla Coil zaps 5 enemies sequentially
5. **Poison**: Poison Bow enemy continues taking damage after hit
6. **Slow Effect**: Cryo Archer slows enemy movement visibly
7. **Enemy Variety**: Different enemy types have different HP/speed

---

## Success Criteria

- ✅ All 30 archers implemented with correct stats
- ✅ Special abilities work (splash, pierce, chain, DoT, slow)
- ✅ All 8 enemy types spawn with correct properties
- ✅ Projectile visuals match archer type
- ✅ Shop organized by tiers

---

## Files Created/Modified

**New:**
- `/src/data/enemyData.ts`
- `/src/systems/SpecialAbilitySystem.ts`

**Modified:**
- `/src/data/archerData.ts` (complete 30 archers)
- `/src/entities/Projectile.ts` (special effects)
- `/src/ui/ShopPanel.ts` (tier tabs)

---

**Next**: MILESTONE 9 - Boss System + Scaling
