# MILESTONE 1: Project Setup + Basic Map Rendering

**Status**: 🔄 In Progress
**Estimated Time**: 4-6 hours
**Dependencies**: None

---

## Objective

Set up the complete project infrastructure and render a basic game map with paths and gate visible.

---

## Requirements

### 1.1 Project Initialization

- [ ] Create `package.json` with Phaser 3, TypeScript, Vite dependencies
- [ ] Install all npm packages successfully
- [ ] Create `tsconfig.json` with strict TypeScript settings
- [ ] Create `vite.config.ts` for development server
- [ ] Create `index.html` entry point

**Files to Create:**
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`

---

### 1.2 Directory Structure

Create all folders as specified in `@CLAUDE.md`:

```
src/
  scenes/
  entities/
  systems/
  ui/
  data/
  config/
  utils/
assets/
  sprites/
  effects/
  ui/
  audio/
    music/
    sfx/
  maps/
docs/
  milestones/
```

**Verification**: All folders exist and are empty (ready for files)

---

### 1.3 Phaser Game Configuration

Create basic Phaser 3 game instance:

**File**: `src/config/gameConfig.ts`

```typescript
import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { GameScene } from '../scenes/GameScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, GameScene]
};
```

**Requirements:**
- Canvas size: 1920×1080 (scales to window)
- Arcade physics enabled (for collision detection)
- Auto-centering and fit scaling
- Two scenes registered: BootScene, GameScene

---

### 1.4 Boot Scene (Asset Loading)

**File**: `src/scenes/BootScene.ts`

```typescript
import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // For Milestone 1: No assets yet, just setup
    console.log('BootScene: Loading assets...');
  }

  create() {
    console.log('BootScene: Assets loaded, starting GameScene');
    this.scene.start('GameScene');
  }
}
```

**Purpose**: Will load assets in future milestones. For now, just transitions to GameScene.

---

### 1.5 Game Scene (Main Map Rendering)

**File**: `src/scenes/GameScene.ts`

```typescript
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private pathGraphics!: Phaser.GameObjects.Graphics;
  private gateSprite!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.createBackground();
    this.createPaths();
    this.createGate();
  }

  private createBackground() {
    // Hexagon grid pattern (like reference image)
    const graphics = this.add.graphics();
    graphics.fillStyle(0x2a2a4e, 1); // Dark blue-purple
    graphics.fillRect(0, 0, 1920, 1080);

    // Draw hexagon grid (simplified for Milestone 1)
    graphics.lineStyle(2, 0x4a4a6e, 0.5);
    const hexSize = 50;
    for (let y = 0; y < 1080; y += hexSize * 1.5) {
      for (let x = 0; x < 1920; x += hexSize * Math.sqrt(3)) {
        this.drawHexagon(graphics, x, y, hexSize);
      }
    }
  }

  private drawHexagon(graphics: Phaser.GameObjects.Graphics, x: number, y: number, size: number) {
    const points: Phaser.Types.Math.Vector2Like[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push({
        x: x + size * Math.cos(angle),
        y: y + size * Math.sin(angle)
      });
    }
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.closePath();
    graphics.strokePath();
  }

  private createPaths() {
    // Two simple paths from bottom corners to center-top
    this.pathGraphics = this.add.graphics();
    this.pathGraphics.lineStyle(60, 0x3a8fb7, 0.8); // Cyan path

    // Path 1: Bottom-left to gate
    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(200, 1000);
    this.pathGraphics.lineTo(400, 800);
    this.pathGraphics.lineTo(600, 600);
    this.pathGraphics.lineTo(800, 400);
    this.pathGraphics.lineTo(960, 200); // Center-top (gate)
    this.pathGraphics.strokePath();

    // Path 2: Bottom-right to gate
    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(1720, 1000);
    this.pathGraphics.lineTo(1520, 800);
    this.pathGraphics.lineTo(1320, 600);
    this.pathGraphics.lineTo(1120, 400);
    this.pathGraphics.lineTo(960, 200); // Center-top (gate)
    this.pathGraphics.strokePath();

    // Glowing edge effect (overlay)
    this.pathGraphics.lineStyle(10, 0x00d4ff, 1); // Bright cyan outline
    this.pathGraphics.strokePath();
  }

  private createGate() {
    // Simple gate representation (will be sprite later)
    this.gateSprite = this.add.rectangle(960, 100, 200, 150, 0xffa500);
    this.gateSprite.setStrokeStyle(4, 0xffff00);

    // Gate label
    this.add.text(960, 100, 'GATE', {
      fontSize: '32px',
      color: '#000000',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }
}
```

**Requirements:**
- Background: Hexagon grid pattern (sci-fi aesthetic)
- Two paths: From bottom corners converging at top center
- Glowing cyan path edges
- Gate: Orange rectangle at top center (placeholder sprite)
- All elements visible on game launch

---

### 1.6 Main Entry Point

**File**: `src/main.ts`

```typescript
import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig';

// Initialize Phaser game
const game = new Phaser.Game(gameConfig);

// Make game instance globally accessible for debugging
(window as any).game = game;

console.log('Tower Defense Game - Milestone 1: Initialized');
```

**Purpose**: Starts the Phaser game and makes it debuggable.

---

### 1.7 HTML Entry Point

**File**: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tower Defense - Sci-Fi Edition</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #000000;
    }
    #game-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

**Requirements:**
- Full-screen game container
- Black background
- Loads main.ts as ES module

---

### 1.8 Package Configuration

**File**: `package.json`

```json
{
  "name": "tower-defense-scifi",
  "version": "1.0.0",
  "description": "Sci-fi tower defense game with educational integration",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "phaser": "^3.80.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "typescript": "^5.3.3",
    "vite": "^5.0.11"
  }
}
```

---

### 1.9 TypeScript Configuration

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

---

### 1.10 Vite Configuration

**File**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

---

## Testing Scenarios

### Test 1.1: Project Runs
1. Run `npm install`
2. Run `npm run dev`
3. Browser opens automatically to `http://localhost:3000`
4. **Expected**: Game canvas visible, no console errors

### Test 1.2: Background Renders
1. Game loads
2. **Expected**: Dark blue-purple background with hexagon grid pattern visible

### Test 1.3: Paths Render
1. Game loads
2. **Expected**: Two cyan glowing paths from bottom corners to center-top, paths have visible width and glow

### Test 1.4: Gate Renders
1. Game loads
2. **Expected**: Orange rectangle labeled "GATE" at top center (x: 960, y: 100)

### Test 1.5: Scaling Works
1. Resize browser window
2. **Expected**: Game canvas scales proportionally, maintains aspect ratio, stays centered

### Test 1.6: Console Logs
1. Open browser console (F12)
2. **Expected**: See logs:
   - "Tower Defense Game - Milestone 1: Initialized"
   - "BootScene: Loading assets..."
   - "BootScene: Assets loaded, starting GameScene"

---

## Success Criteria

- ✅ `npm run dev` starts game without errors
- ✅ Hexagon grid background visible
- ✅ Two cyan paths visible from bottom to top
- ✅ Orange gate visible at top center
- ✅ Game scales correctly when window resized
- ✅ No TypeScript errors
- ✅ No browser console errors

---

## Files Created

- `/package.json`
- `/tsconfig.json`
- `/vite.config.ts`
- `/index.html`
- `/src/main.ts`
- `/src/config/gameConfig.ts`
- `/src/scenes/BootScene.ts`
- `/src/scenes/GameScene.ts`

---

## Next Milestone

**MILESTONE 2**: Enemy Movement - Create Enemy class and make enemies walk along paths.

---

**Completion Checklist:**
- [ ] All requirements implemented
- [ ] All tests passing
- [ ] User has tested and approved
- [ ] PROGRESS.md updated
- [ ] Ready to proceed to Milestone 2
