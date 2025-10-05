# MILESTONE 3: Basic Archer + Shooting

**Status**: ⏸️ Pending
**Estimated Time**: 4-5 hours
**Dependencies**: Milestone 2 complete

---

## Objective

Create Archer and Projectile classes. Enable click-to-place archer that auto-targets and shoots enemies.

---

## Key Requirements

### 3.1 Projectile Class
**File**: `src/entities/Projectile.ts`

- Visual: Small circle (5px radius)
- Moves toward target enemy at fixed speed (400 px/s)
- Deals damage on collision
- Destroys itself after hit or miss
- Tracks target enemy position (updates if enemy moves)

### 3.2 Archer Class
**File**: `src/entities/Archer.ts`

- Properties: range, fireRate, damage, position
- Auto-detects enemies in range (use Phaser distance check)
- Shoots projectile every 1/fireRate seconds
- Visual: Blue square (40×40px) with range circle on hover
- Click to select (shows stats)

### 3.3 Placement System
**File**: `src/scenes/GameScene.ts` (enhance)

- Click map → place Recruit Bow archer (free)
- Show range preview circle when placing
- Prevent placement on paths (basic collision check)
- Track placed archers in array

### 3.4 Combat Loop
**File**: `src/scenes/GameScene.ts` (update method)

- Update all archers (targeting, shooting)
- Update all projectiles (movement, collision)
- Check projectile-enemy collisions
- Apply damage, destroy enemy if HP ≤ 0

---

## Testing Scenarios

1. **Place Archer**: Click map → archer appears
2. **Archer Shoots**: Archer fires projectiles at enemy in range
3. **Projectile Hits**: Enemy HP bar decreases when hit
4. **Enemy Dies**: Enemy disappears after enough hits
5. **Out of Range**: Archer doesn't shoot enemies beyond range circle

---

## Success Criteria

- ✅ Click to place archer works
- ✅ Archer automatically shoots nearest enemy in range
- ✅ Projectiles visible and move toward enemies
- ✅ Enemies take damage and die
- ✅ Range preview circle shows when placing

---

## Files Created

- `/src/entities/Archer.ts`
- `/src/entities/Projectile.ts`

**Modified**: `/src/scenes/GameScene.ts`

---

**USER TESTING CHECKPOINT**: This milestone demonstrates core gameplay. User should test and approve before continuing.

---

**Next**: MILESTONE 4 - Round System + Economy
