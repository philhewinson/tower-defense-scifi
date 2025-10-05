import Phaser from 'phaser';
import { Enemy } from '../entities/Enemy';
import { Archer } from '../entities/Archer';
import { Projectile } from '../entities/Projectile';
import { PathSystem } from '../systems/PathSystem';
import { EconomySystem } from '../systems/EconomySystem';
import { WaveSystem } from '../systems/WaveSystem';
import { UIScene } from './UIScene';
import { ShopPanel } from '../ui/ShopPanel';
import { ArcherConfig, getArcherById } from '../data/archerData';
import { isOnPath } from '../utils/helpers';

export class GameScene extends Phaser.Scene {
  private pathGraphics!: Phaser.GameObjects.Graphics;
  private gateSprite!: Phaser.GameObjects.Rectangle;
  private enemies: Enemy[] = [];
  private archers: Archer[] = [];
  private projectiles: Projectile[] = [];
  private previewArcher: Phaser.GameObjects.Container | null = null;
  private previewCircle: Phaser.GameObjects.Arc | null = null;
  private economySystem!: EconomySystem;
  private waveSystem!: WaveSystem;
  private uiScene!: UIScene;
  private shopPanel!: ShopPanel;
  private gameOver: boolean = false;
  private freeArchersPlaced: number = 0; // Track free Recruit Bow placements
  private readonly MAX_FREE_ARCHERS: number = 5; // Maximum free archers allowed
  private gameSpeedMultiplier: number = 1; // Game speed multiplier (1x, 2x, etc.)

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Initialize systems
    this.economySystem = new EconomySystem();
    this.waveSystem = new WaveSystem();
    this.uiScene = this.scene.get('UIScene') as UIScene;

    this.createBackground();
    this.createPaths();
    this.createGate();

    // Create shop panel
    this.shopPanel = new ShopPanel(this);

    // Enable click-to-place archer
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerdown', this.onPointerDown, this);

    // Listen for start wave button
    this.uiScene.events.on('startWave', this.startWave, this);

    // Listen for speed change
    this.uiScene.events.on('speedChanged', this.onSpeedChanged, this);

    // Start UIScene
    this.scene.launch('UIScene');

    // Auto-select first archer (Recruit Bow - FREE)
    const recruitBow = getArcherById('recruit_bow');
    if (recruitBow) {
      (this.shopPanel as any).selectArcher(recruitBow);
    }
  }

  update(time: number, delta: number) {
    if (this.gameOver) return;

    // Apply game speed multiplier
    const adjustedDelta = delta * this.gameSpeedMultiplier;

    // Update wave system (spawns enemies)
    this.waveSystem.update(adjustedDelta, this, this.enemies);

    // Update all enemies
    this.enemies.forEach(enemy => {
      if (enemy.isAlive) {
        enemy.update(adjustedDelta);
      } else if (enemy.reachedGate) {
        // Enemy reached gate - lose hearts
        const isGameOver = this.economySystem.loseHearts(1);
        this.uiScene.updateHearts(this.economySystem.getHearts());

        if (isGameOver) {
          this.onGameOver();
        }
      } else {
        // Enemy was killed - award coins
        this.economySystem.addCoins(enemy.reward);
        this.uiScene.updateCoins(this.economySystem.getCoins());
      }
    });

    // Update all archers
    this.archers.forEach(archer => {
      archer.update(time * this.gameSpeedMultiplier, this.enemies, this.projectiles);
    });

    // Update all projectiles
    this.projectiles.forEach(projectile => {
      if (projectile.isActive) {
        projectile.update(adjustedDelta);
      }
    });

    // Clean up dead enemies and inactive projectiles
    this.enemies = this.enemies.filter(e => e.isAlive);
    this.projectiles = this.projectiles.filter(p => p.isActive);

    // Check wave complete
    if (this.waveSystem.checkWaveComplete(this.enemies.length)) {
      this.onWaveComplete();
    }

    // Update UI
    this.uiScene.setStartWaveButtonEnabled(!this.waveSystem.isActive());
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

    // Redraw paths with glow
    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(200, 1000);
    this.pathGraphics.lineTo(400, 800);
    this.pathGraphics.lineTo(600, 600);
    this.pathGraphics.lineTo(800, 400);
    this.pathGraphics.lineTo(960, 200);
    this.pathGraphics.strokePath();

    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(1720, 1000);
    this.pathGraphics.lineTo(1520, 800);
    this.pathGraphics.lineTo(1320, 600);
    this.pathGraphics.lineTo(1120, 400);
    this.pathGraphics.lineTo(960, 200);
    this.pathGraphics.strokePath();
  }

  private createGate() {
    // Simple gate representation (will be sprite later)
    this.gateSprite = this.add.rectangle(960, 140, 200, 150, 0xffa500);
    this.gateSprite.setStrokeStyle(4, 0xffff00);

    // Gate label
    this.add.text(960, 140, 'GATE', {
      fontSize: '32px',
      color: '#000000',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private startWave() {
    this.waveSystem.startWave();
    this.uiScene.updateRound(this.waveSystem.getCurrentRound());
  }

  private onWaveComplete() {
    // Award round completion bonus
    this.economySystem.addCoins(100);
    this.uiScene.updateCoins(this.economySystem.getCoins());

    console.log('Wave complete! +£100 bonus');
  }

  private onGameOver() {
    this.gameOver = true;
    this.uiScene.showGameOver(
      this.waveSystem.getCurrentRound() - 1,
      this.economySystem.getCoins()
    );
  }

  private onSpeedChanged(speed: number) {
    // Store the speed multiplier - this gets applied to delta in update()
    this.gameSpeedMultiplier = speed;
    console.log(`⚡ Game speed changed to ${speed}x`);
  }

  private onPointerMove(pointer: Phaser.Input.Pointer) {
    const selectedConfig = this.shopPanel.getSelectedArcher();
    if (!selectedConfig) return;

    // Don't show preview over shop
    if (pointer.x < 300) {
      if (this.previewArcher) this.previewArcher.setVisible(false);
      if (this.previewCircle) this.previewCircle.setVisible(false);
      return;
    }

    // Check if placement is valid (not on path)
    const onPath = isOnPath(pointer.x, pointer.y, PathSystem.getAllPaths());

    // Show placement preview
    if (!this.previewArcher) {
      // Create preview archer sprite - NO BOX, just emoji!
      this.previewArcher = this.add.container(pointer.x, pointer.y);

      const archerEmojis: { [key: string]: string } = {
        'recruit_bow': '🧑‍🎓',
        'hunter_bow': '🏹',
        'longbow': '🎯',
        'crossbow': '⚔️',
        'rapid_bow': '💨',
        'sniper_bow': '🔭'
      };
      const emoji = archerEmojis[selectedConfig.id] || '🏹';

      const emojiText = this.add.text(0, 0, emoji, {
        fontSize: '56px',
        fontStyle: 'bold'
      }).setOrigin(0.5).setAlpha(0.7);
      this.previewArcher.add(emojiText);

      this.previewArcher.setDepth(200); // On top of everything

      // Create range circle
      this.previewCircle = this.add.circle(pointer.x, pointer.y, selectedConfig.range);
      this.previewCircle.setStrokeStyle(3, 0x00ff00, 0.7);
      this.previewCircle.setFillStyle(0x00ff00, 0.15);
      this.previewCircle.setDepth(199);
    }

    // Make visible if hidden
    this.previewArcher.setVisible(true);
    if (this.previewCircle) this.previewCircle.setVisible(true);

    // Update preview position and range
    this.previewArcher.setPosition(pointer.x, pointer.y);
    if (this.previewCircle) {
      this.previewCircle.setPosition(pointer.x, pointer.y);
      this.previewCircle.setRadius(selectedConfig.range);

      // Change color based on validity: RED if on path, GREEN if valid
      if (onPath) {
        this.previewCircle.setStrokeStyle(3, 0xff0000, 0.7); // Red = invalid
        this.previewCircle.setFillStyle(0xff0000, 0.15);
      } else {
        this.previewCircle.setStrokeStyle(3, 0x00ff00, 0.7); // Green = valid
        this.previewCircle.setFillStyle(0x00ff00, 0.15);
      }
    }

    // Update affordability
    this.shopPanel.updateAffordability(this.economySystem.getCoins());
  }

  private onPointerDown(pointer: Phaser.Input.Pointer) {
    // Don't place archers if clicking on UI (shop panel on left side)
    if (pointer.x < 300) {
      console.log('Clicked on shop UI - ignoring placement');
      return;
    }

    const selectedConfig = this.shopPanel.getSelectedArcher();
    if (!selectedConfig) {
      console.log('No archer selected');
      return;
    }

    // CHECK: Cannot place on path!
    const onPath = isOnPath(pointer.x, pointer.y, PathSystem.getAllPaths());
    if (onPath) {
      console.log('❌ Cannot place archer on path!');
      // Flash the preview red briefly to show it's invalid
      if (this.previewCircle) {
        this.previewCircle.setStrokeStyle(5, 0xff0000, 1.0);
        this.time.delayedCall(200, () => {
          if (this.previewCircle) {
            this.previewCircle.setStrokeStyle(3, 0xff0000, 0.7);
          }
        });
      }
      return;
    }

    // Special check for free Recruit Bow - only 5 allowed!
    if (selectedConfig.id === 'recruit_bow' && selectedConfig.cost === 0) {
      if (this.freeArchersPlaced >= this.MAX_FREE_ARCHERS) {
        console.log(`❌ You've already placed ${this.MAX_FREE_ARCHERS} free Recruit Bows! Choose a different archer.`);
        // Flash red to show limit reached
        if (this.previewCircle) {
          this.previewCircle.setStrokeStyle(5, 0xff0000, 1.0);
          this.time.delayedCall(200, () => {
            if (this.previewCircle) {
              this.previewCircle.setStrokeStyle(3, 0xff0000, 0.7);
            }
          });
        }
        return;
      }
    }

    // Check if can afford
    if (!this.economySystem.canAfford(selectedConfig.cost)) {
      console.log(`Cannot afford ${selectedConfig.name} (£${selectedConfig.cost})`);
      return;
    }

    // Deduct cost (only if not free)
    if (selectedConfig.cost > 0) {
      this.economySystem.removeCoins(selectedConfig.cost);
      this.uiScene.updateCoins(this.economySystem.getCoins());
    } else {
      // Track free archer placement
      this.freeArchersPlaced++;
      console.log(`Free archers used: ${this.freeArchersPlaced}/${this.MAX_FREE_ARCHERS}`);
      // Update shop UI to show remaining free archers
      this.shopPanel.updateFreeArcherCount(this.freeArchersPlaced, this.MAX_FREE_ARCHERS);
    }

    // Place archer at click location
    const archer = new Archer(this, pointer.x, pointer.y, selectedConfig);
    this.archers.push(archer);

    console.log(`✅ ${selectedConfig.name} placed at (${pointer.x}, ${pointer.y}) for £${selectedConfig.cost})`);
    console.log(`Total archers: ${this.archers.length}`);
  }
}
