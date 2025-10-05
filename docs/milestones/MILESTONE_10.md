# MILESTONE 10: Avatar System + Meta Progression

**Status**: ⏸️ Pending
**Estimated Time**: 5-6 hours
**Dependencies**: Milestone 9 complete

---

## Objective

Implement avatar selection with gameplay bonuses, meta currency system, and persistent unlocks.

---

## Key Requirements

### 10.1 Avatar Data
**File**: `src/data/avatarData.ts`

```typescript
export interface AvatarConfig {
  id: string;
  name: string;
  cost: number;
  type: 'gameplay' | 'cosmetic';
  bonus?: {
    stat: 'archerCost' | 'range' | 'speed' | 'damage' | 'coinDrop' | 'hearts';
    multiplier: number;
  };
  sprite: string;
}

export const AVATAR_DATA: AvatarConfig[] = [
  { id: 'cadet', name: 'Cadet', cost: 0, type: 'gameplay', sprite: 'cadet.png' },
  { id: 'engineer', name: 'Engineer', cost: 800, type: 'gameplay',
    bonus: { stat: 'archerCost', multiplier: 0.88 }, sprite: 'engineer.png' },
  // ... all 10 gameplay + 4 cosmetic avatars
];
```

### 10.2 Meta Currency System
**File**: `src/systems/MetaProgressionSystem.ts`

Separate from in-game coins:
- **Meta Coins**: Earned by reaching milestones
  - Round 10: +500 meta coins
  - Round 20: +1000 meta coins
  - Round 30: +1500 meta coins
- Persists between games (LocalStorage)
- Used to unlock avatars and maps permanently

### 10.3 Avatar Selection Scene
**File**: `src/scenes/AvatarSelectScene.ts`

Menu before game starts:
- Grid of avatar portraits
- Show: Name, cost, bonus description
- Click to preview
- "Select" button → apply avatar to game
- Locked avatars show cost and lock icon

### 10.4 Apply Avatar Bonuses
When game starts, apply selected avatar bonuses globally:

```typescript
class GameScene {
  private avatarBonus: AvatarConfig;

  applyAvatarBonus() {
    if (this.avatarBonus.bonus?.stat === 'archerCost') {
      // Multiply all archer costs by 0.88 (12% discount)
    }
    if (this.avatarBonus.bonus?.stat === 'range') {
      // Add 15% to all archer ranges
    }
    // ... apply other bonuses
  }
}
```

### 10.5 Save System Enhancement
**File**: `src/systems/SaveSystem.ts`

Persist to LocalStorage:
- Unlocked avatars (array of IDs)
- Meta coin balance
- Selected avatar ID
- Unlocked maps

---

## Testing Scenarios

1. **Avatar Select**: Main menu shows avatar grid
2. **Select Avatar**: Choose Engineer → game starts with 12% archer discount
3. **Verify Bonus**: Recruit Bow costs £0, Hunter Bow costs £132 (vs £150 base)
4. **Meta Coins**: Reach Round 10 → earn 500 meta coins
5. **Unlock Avatar**: Spend 800 meta coins → unlock Tactician
6. **Persistence**: Close game, reopen → unlocked avatars still available
7. **Different Bonuses**: Economist gives 30% more coin drops

---

## Success Criteria

- ✅ Avatar selection screen functional
- ✅ 10 gameplay + 4 cosmetic avatars available
- ✅ Bonuses apply correctly in game
- ✅ Meta currency earned from milestones
- ✅ Unlocks persist via LocalStorage
- ✅ Can switch avatars between games

---

## Files Created

- `/src/data/avatarData.ts`
- `/src/systems/MetaProgressionSystem.ts`
- `/src/scenes/AvatarSelectScene.ts`
- `/src/systems/SaveSystem.ts`

---

**Next**: MILESTONE 11 - Learning Mode + Questions
