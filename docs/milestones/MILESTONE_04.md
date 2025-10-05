# MILESTONE 4: Round System + Economy

**Status**: ⏸️ Pending
**Estimated Time**: 4-5 hours
**Dependencies**: Milestone 3 complete

---

## Objective

Implement wave system, coin economy, heart system, and win/loss conditions.

---

## Key Requirements

### 4.1 Economy System
**File**: `src/systems/EconomySystem.ts`

```typescript
export class EconomySystem {
  private coins: number = 100;
  private hearts: number = 500;

  addCoins(amount: number): void
  removeCoins(amount: number): boolean
  canAfford(cost: number): boolean

  loseHearts(amount: number): boolean // Returns true if game over
  addHearts(amount: number): void
}
```

### 4.2 Wave System
**File**: `src/systems/WaveSystem.ts`

- Track current round number
- Calculate enemies per round (5 + round × 2, capped at 50)
- Spawn enemies in timed intervals (1 every 1.5 seconds)
- Award £100 + kill rewards on wave complete
- "Start Wave" button to begin next round

### 4.3 UI Overlays
**File**: `src/scenes/UIScene.ts`

Top bar display:
- ❤️ Hearts: 500
- 💰 Coins: £100
- Round: 1

Bottom bar:
- "Start Wave" button (green, pulsing)
- Enemy counter: "12 / 25 remaining"

### 4.4 Game Over / Victory Screens
- Hearts reach 0 → Game Over screen
- Round 10 complete → "Victory" message (for now)

---

## Testing Scenarios

1. **Start Wave**: Click button → enemies spawn in sequence
2. **Kill Rewards**: Enemies die → coin count increases
3. **Wave Complete**: All enemies dead → +£100, round increments
4. **Heart Loss**: Enemy reaches gate → hearts decrease by 1
5. **Game Over**: Hearts reach 0 → game over screen shows

---

## Success Criteria

- ✅ Wave system spawns correct enemy count
- ✅ Coins earned from kills and wave completion
- ✅ Hearts decrease when enemies reach gate
- ✅ Game over triggers at 0 hearts
- ✅ UI displays accurate coins, hearts, round number

---

## Files Created

- `/src/systems/EconomySystem.ts`
- `/src/systems/WaveSystem.ts`
- `/src/scenes/UIScene.ts`

---

**Next**: MILESTONE 5 - Archer Shop + Multiple Types
