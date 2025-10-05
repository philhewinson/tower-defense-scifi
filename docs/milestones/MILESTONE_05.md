# MILESTONE 5: Archer Shop + Multiple Types

**Status**: ⏸️ Pending
**Estimated Time**: 5-6 hours
**Dependencies**: Milestone 4 complete

---

## Objective

Create archer shop UI with first 6 archer types (Tier 1 bows). Enable purchasing and placing different archers.

---

## Key Requirements

### 5.1 Archer Data Configuration
**File**: `src/data/archerData.ts`

Export array of all 30 archer definitions (initially populate 6 for Tier 1):

```typescript
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
  {
    id: 'recruit_bow',
    name: 'Recruit Bow',
    tier: 1,
    cost: 0,
    range: 100,
    fireRate: 1.0,
    damage: 10,
    projectileType: 'arrow',
    description: 'Basic free archer'
  },
  // ... 5 more Tier 1 archers
];
```

### 5.2 Shop Panel UI
**File**: `src/ui/ShopPanel.ts`

Left sidebar:
- Display all available archers as cards
- Show: Icon, name, cost, quick stats
- Click to select archer type
- Highlight selected
- Gray out if can't afford

### 5.3 Archer Class Enhancement
Update `Archer.ts` to accept ArcherConfig and apply stats dynamically.

### 5.4 Placement Flow
1. Click archer in shop → select type
2. Hover over map → see preview + range circle
3. Click valid spot → deduct coins, place archer
4. Placed archer uses selected type's stats

### 5.5 Mobile Touch Support
- Tap archer in shop → select
- Tap map → place
- Long-press archer → open detail panel

---

## Testing Scenarios

1. **Shop Displays**: 6 Tier 1 archers visible in left panel
2. **Select Archer**: Click hunter bow → it highlights
3. **Placement Cost**: Place hunter bow → £150 deducted
4. **Different Stats**: Sniper Bow has longer range than Recruit Bow
5. **Insufficient Funds**: Sniper Bow grayed out if only £100 coins
6. **Multiple Archers**: Place 3 different archer types, all shoot independently

---

## Success Criteria

- ✅ Shop UI displays all 6 Tier 1 archers
- ✅ Selecting archer works (click, highlight)
- ✅ Placing different archers deducts correct costs
- ✅ Different archers have visibly different stats (range, speed, damage)
- ✅ Can't place archer if insufficient coins

---

## Files Created

- `/src/data/archerData.ts`
- `/src/ui/ShopPanel.ts`

**Modified**: `/src/entities/Archer.ts`, `/src/scenes/GameScene.ts`

---

**Next**: MILESTONE 6 - Upgrade System
