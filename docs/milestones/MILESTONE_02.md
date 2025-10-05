# MILESTONE 2: Enemy Movement

**Status**: ⏸️ Pending
**Estimated Time**: 3-4 hours
**Dependencies**: Milestone 1 complete

---

## Objective

Create Enemy class and implement pathfinding so enemies walk along defined paths from spawn to gate.

---

## Requirements

### 2.1 Path System Data

**File**: `src/systems/PathSystem.ts`

Define waypoints for both paths as arrays of coordinates.

```typescript
export interface PathWaypoint {
  x: number;
  y: number;
}

export class PathSystem {
  static readonly PATH_1: PathWaypoint[] = [
    { x: 200, y: 1000 },   // Spawn (bottom-left)
    { x: 400, y: 800 },
    { x: 600, y: 600 },
    { x: 800, y: 400 },
    { x: 960, y: 200 }     // Gate (top-center)
  ];

  static readonly PATH_2: PathWaypoint[] = [
    { x: 1720, y: 1000 },  // Spawn (bottom-right)
    { x: 1520, y: 800 },
    { x: 1320, y: 600 },
    { x: 1120, y: 400 },
    { x: 960, y: 200 }     // Gate (top-center)
  ];

  static getAllPaths(): PathWaypoint[][] {
    return [this.PATH_1, this.PATH_2];
  }

  static getRandomPath(): PathWaypoint[] {
    const paths = this.getAllPaths();
    return paths[Math.floor(Math.random() * paths.length)];
  }
}
```

**Requirements:**
- Two paths defined as waypoint arrays
- Helper method to get random path
- Coordinates match visual paths from Milestone 1

---

### 2.2 Enemy Entity Class

**File**: `src/entities/Enemy.ts`

```typescript
import Phaser from 'phaser';
import { PathWaypoint } from '../systems/PathSystem';

export class Enemy extends Phaser.GameObjects.Rectangle {
  private path: PathWaypoint[];
  private currentWaypointIndex: number = 0;
  private moveSpeed: number; // pixels per second
  public hp: number;
  public maxHP: number;
  public reward: number;
  public isAlive: boolean = true;

  constructor(
    scene: Phaser.Scene,
    path: PathWaypoint[],
    hp: number,
    speed: number,
    reward: number
  ) {
    // Start at first waypoint
    super(scene, path[0].x, path[0].y, 30, 30, 0xff0000);

    this.path = path;
    this.hp = hp;
    this.maxHP = hp;
    this.moveSpeed = speed;
    this.reward = reward;

    // Visual setup
    this.setStrokeStyle(2, 0xffff00);

    // Add to scene
    scene.add.existing(this);
  }

  update(delta: number) {
    if (!this.isAlive) return;

    const target = this.path[this.currentWaypointIndex];
    if (!target) {
      // Reached end of path (gate)
      this.onReachGate();
      return;
    }

    // Move toward current waypoint
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      // Reached waypoint, move to next
      this.currentWaypointIndex++;
    } else {
      // Move toward waypoint
      const moveDistance = (this.moveSpeed * delta) / 1000;
      const ratio = moveDistance / distance;
      this.x += dx * ratio;
      this.y += dy * ratio;
    }
  }

  takeDamage(amount: number): boolean {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.onDeath();
      return true; // Enemy killed
    }
    return false; // Still alive
  }

  private onDeath() {
    this.isAlive = false;
    this.destroy();
    // Award coins (implemented in Milestone 4)
  }

  private onReachGate() {
    this.isAlive = false;
    this.destroy();
    // Damage gate (implemented in Milestone 4)
  }
}
```

**Requirements:**
- Enemy follows waypoint path sequentially
- Smooth movement (interpolated between waypoints)
- HP tracking (damage handling for Milestone 3)
- Speed parameter (pixels per second)
- Visual: Red square with yellow border (placeholder sprite)
- Destroys itself when reaching gate or dying

---

### 2.3 Update GameScene for Enemy Spawning

**File**: `src/scenes/GameScene.ts` (add to existing)

```typescript
import { Enemy } from '../entities/Enemy';
import { PathSystem } from '../systems/PathSystem';

export class GameScene extends Phaser.Scene {
  private enemies: Enemy[] = [];

  // ... existing code ...

  create() {
    this.createBackground();
    this.createPaths();
    this.createGate();

    // TEST: Spawn one enemy for demonstration
    this.spawnTestEnemy();
  }

  update(time: number, delta: number) {
    // Update all enemies
    this.enemies.forEach(enemy => {
      if (enemy.isAlive) {
        enemy.update(delta);
      }
    });

    // Clean up dead enemies
    this.enemies = this.enemies.filter(e => e.isAlive);
  }

  private spawnTestEnemy() {
    // Spawn single enemy on random path for testing
    const path = PathSystem.getRandomPath();
    const enemy = new Enemy(this, path, 100, 80, 10); // 100 HP, 80 speed, £10 reward
    this.enemies.push(enemy);

    console.log('Test enemy spawned on path');
  }
}
```

**Requirements:**
- Import Enemy and PathSystem
- Maintain enemies array
- Update all enemies in update() loop
- Spawn one test enemy on create()
- Clean up dead/finished enemies from array

---

### 2.4 Enemy HP Bar (Visual Feedback)

**File**: `src/entities/Enemy.ts` (enhance existing)

Add HP bar above enemy sprite:

```typescript
export class Enemy extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Rectangle;
  private hpBarBackground: Phaser.GameObjects.Rectangle;
  private hpBarFill: Phaser.GameObjects.Rectangle;

  // ... existing properties ...

  constructor(
    scene: Phaser.Scene,
    path: PathWaypoint[],
    hp: number,
    speed: number,
    reward: number
  ) {
    super(scene, path[0].x, path[0].y);

    // Create enemy sprite
    this.sprite = scene.add.rectangle(0, 0, 30, 30, 0xff0000);
    this.sprite.setStrokeStyle(2, 0xffff00);
    this.add(this.sprite);

    // Create HP bar
    this.hpBarBackground = scene.add.rectangle(0, -25, 30, 5, 0x000000);
    this.hpBarFill = scene.add.rectangle(0, -25, 30, 5, 0x00ff00);
    this.add(this.hpBarBackground);
    this.add(this.hpBarFill);

    this.path = path;
    this.hp = hp;
    this.maxHP = hp;
    this.moveSpeed = speed;
    this.reward = reward;

    scene.add.existing(this);
  }

  takeDamage(amount: number): boolean {
    this.hp -= amount;
    this.updateHPBar();

    if (this.hp <= 0) {
      this.onDeath();
      return true;
    }
    return false;
  }

  private updateHPBar() {
    const hpPercent = Math.max(0, this.hp / this.maxHP);
    this.hpBarFill.width = 30 * hpPercent;

    // Color changes based on HP
    if (hpPercent > 0.6) {
      this.hpBarFill.setFillStyle(0x00ff00); // Green
    } else if (hpPercent > 0.3) {
      this.hpBarFill.setFillStyle(0xffff00); // Yellow
    } else {
      this.hpBarFill.setFillStyle(0xff0000); // Red
    }
  }
}
```

**Note**: Change Enemy from `Rectangle` to `Container` to hold multiple visual elements.

---

## Testing Scenarios

### Test 2.1: Enemy Spawns
1. Run game
2. **Expected**: One red square enemy appears at bottom-left or bottom-right (random)

### Test 2.2: Enemy Moves Along Path
1. Watch spawned enemy
2. **Expected**: Enemy smoothly moves along cyan path waypoints toward gate

### Test 2.3: Enemy Reaches Gate
1. Wait for enemy to complete path
2. **Expected**: Enemy disappears when reaching gate (x: 960, y: 200)
3. **Expected**: Console shows no errors

### Test 2.4: HP Bar Visible
1. Enemy spawns
2. **Expected**: Green HP bar visible above enemy sprite

### Test 2.5: Path Selection Random
1. Reload game multiple times (F5)
2. **Expected**: Sometimes enemy spawns on left path, sometimes right path (50/50 random)

### Test 2.6: Movement Speed
1. Enemy moves along path
2. **Expected**: Takes approximately 12-15 seconds to reach gate (at 80 px/s speed)

---

## Success Criteria

- ✅ Enemy spawns at start of random path
- ✅ Enemy smoothly follows waypoints
- ✅ Enemy reaches gate and despawns
- ✅ HP bar visible and correct size
- ✅ No console errors during movement
- ✅ Movement speed feels appropriate (not too fast/slow)

---

## Files Created/Modified

**New:**
- `/src/systems/PathSystem.ts`
- `/src/entities/Enemy.ts`

**Modified:**
- `/src/scenes/GameScene.ts`

---

## Next Milestone

**MILESTONE 3**: Basic Archer + Shooting - Create Archer class that targets and shoots enemies.

---

**Completion Checklist:**
- [ ] All requirements implemented
- [ ] All tests passing
- [ ] Enemy movement smooth and correct
- [ ] PROGRESS.md updated
- [ ] Ready to proceed to Milestone 3
