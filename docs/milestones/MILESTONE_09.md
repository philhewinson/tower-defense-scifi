# MILESTONE 9: Boss System + Difficulty Scaling

**Status**: ⏸️ Pending
**Estimated Time**: 6-7 hours
**Dependencies**: Milestone 8 complete

---

## Objective

Implement boss enemies every 10 rounds, HP/count scaling, and difficulty progression.

---

## Key Requirements

### 9.1 Boss Enemy Class
**File**: `src/entities/Boss.ts`

Extends Enemy with:
- Much higher HP (3000+)
- Special abilities (shield, fire aura, regen)
- Larger sprite (2-3× normal enemy size)
- Particle effects
- Deals 50 hearts damage to gate (vs 1 for regular)

### 9.2 Boss Abilities

**Shield**: Absorbs damage up to X amount before boss takes damage
```typescript
class Boss {
  private shieldHP: number = 1500;
  takeDamage(amount: number) {
    if (this.shieldHP > 0) {
      this.shieldHP -= amount;
      // Show shield hit effect
    } else {
      this.hp -= amount;
    }
  }
}
```

**Fire Aura**: Slows nearby archers by 30%
- Check distance to all archers every frame
- If within 150px, reduce their fire rate temporarily

**Regeneration**: Heal 100 HP/second
- Add HP in update loop

### 9.3 HP Scaling Formula
**File**: `src/systems/WaveSystem.ts`

```typescript
calculateEnemyHP(baseHP: number, round: number): number {
  return Math.floor(baseHP * (1 + round * 0.15));
}
```

Apply to all enemies on spawn.

### 9.4 Boss Round Detection
```typescript
isBossRound(round: number): boolean {
  return round % 10 === 0;
}
```

On boss rounds:
- Only spawn boss (no regular enemies)
- Show warning message: "BOSS INCOMING"
- Dramatic music change

### 9.5 Enemy Count Scaling
```typescript
calculateEnemyCount(round: number): number {
  if (round <= 5) return 5 + (round - 1) * 2;
  if (round <= 20) return 13 + (round - 5) * 2;
  return Math.min(50, 43 + (round - 20) * 1);
}
```

---

## Testing Scenarios

1. **Boss Spawns**: Round 10 → boss appears instead of regular enemies
2. **Boss HP**: Boss takes many hits to kill (3000+ HP)
3. **Shield Mechanic**: First 1500 damage absorbed, then boss HP decreases
4. **Fire Aura**: Archers near boss fire slower
5. **Regen**: Boss HP increases over time if not damaged
6. **Boss Reward**: Killing boss awards £500+
7. **Scaling**: Round 20 enemies have 4× HP of Round 1
8. **Enemy Count**: Round 1 = 5 enemies, Round 20 = 41 enemies

---

## Success Criteria

- ✅ Boss spawns on rounds 10, 20, 30, etc.
- ✅ Boss has shield, fire aura, or regen (depending on round)
- ✅ HP scaling formula applied correctly
- ✅ Enemy count increases per round
- ✅ Boss deals 50 heart damage to gate
- ✅ Difficulty feels progressively harder

---

## Files Created

- `/src/entities/Boss.ts`

**Modified:**
- `/src/systems/WaveSystem.ts`
- `/src/scenes/GameScene.ts`

---

**USER TESTING CHECKPOINT**: Difficulty curve validation.

---

**Next**: MILESTONE 10 - Avatar System + Meta Progression
