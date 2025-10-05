# MILESTONE 6: Upgrade System

**Status**: ⏸️ Pending
**Estimated Time**: 5-6 hours
**Dependencies**: Milestone 5 complete

---

## Objective

Implement 3-tier upgrade system with 10 stars per tier. Enable purchasing upgrades for placed archers.

---

## Key Requirements

### 6.1 Upgrade System Class
**File**: `src/systems/UpgradeSystem.ts`

```typescript
export interface ArcherUpgrades {
  rangeTier: number;      // 0-10 stars
  speedTier: number;      // 0-10 stars
  damageTier: number;     // 0-10 stars
}

export class UpgradeSystem {
  calculateUpgradeCost(baseArcherCost: number, currentStars: number): number
  calculateRangeBonus(stars: number): number  // +5% per star
  calculateSpeedBonus(stars: number): number  // +8% per star
  calculateDamageBonus(stars: number): number // +10% per star
  canUpgrade(tier: 'range'|'speed'|'damage', currentStars: number): boolean
}
```

### 6.2 Archer Class Enhancement
Add upgrade tracking to each archer instance:

```typescript
class Archer {
  private upgrades: ArcherUpgrades = {
    rangeTier: 0,
    speedTier: 0,
    damageTier: 0
  };

  getEffectiveRange(): number // Base × (1 + upgrades.rangeTier × 0.05)
  getEffectiveFireRate(): number
  getEffectiveDamage(): number
}
```

### 6.3 Upgrade Panel UI
**File**: `src/ui/UpgradePanel.ts`

Right sidebar when archer selected:
- Display current archer stats
- 3 tier sections (Range, Speed, Damage)
- Star progress indicators (⭐⭐⭐⚪⚪⚪⚪⚪⚪⚪)
- Upgrade button per tier with cost
- Preview of stat after upgrade

### 6.4 Purchase Flow
1. Select placed archer → upgrade panel opens
2. Click "Upgrade Range" → pay cost, gain 1 star
3. Archer stats recalculate immediately
4. Visual feedback (star fills, number updates)

---

## Testing Scenarios

1. **Select Archer**: Click placed archer → upgrade panel shows
2. **Purchase Upgrade**: Click "Upgrade Range" → star fills, range increases
3. **Cost Scaling**: First star costs X, 10th star costs more
4. **Stat Changes**: Upgrade speed tier → archer fires faster visibly
5. **Max Stars**: Can't upgrade beyond 10 stars per tier
6. **Insufficient Funds**: Upgrade button disabled if can't afford

---

## Success Criteria

- ✅ Clicking archer shows upgrade panel
- ✅ Purchasing upgrades increases stats correctly
- ✅ Star indicators fill accurately (0-10)
- ✅ Cost scaling formula works (1.25^star_number)
- ✅ Upgraded archers visibly stronger in combat
- ✅ Can fully upgrade all 3 tiers (30 total stars)

---

## Files Created

- `/src/systems/UpgradeSystem.ts`
- `/src/ui/UpgradePanel.ts`

**Modified**: `/src/entities/Archer.ts`

---

**USER TESTING CHECKPOINT**: Economy and progression validated.

---

**Next**: MILESTONE 7 - Advanced Paths + Crossings
