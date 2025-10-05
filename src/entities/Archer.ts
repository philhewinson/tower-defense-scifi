import Phaser from 'phaser';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { ArcherConfig } from '../data/archerData';

export class Archer extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Rectangle;
  private rangeCircle: Phaser.GameObjects.Arc | null = null;
  private range: number;
  private fireRate: number; // shots per second
  private damage: number;
  private lastShotTime: number = 0;
  private scene: Phaser.Scene;
  public config: ArcherConfig;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: ArcherConfig
  ) {
    super(scene, x, y);

    this.scene = scene;
    this.config = config;
    this.range = config.range;
    this.fireRate = config.fireRate;
    this.damage = config.damage;

    // Create unique archer visual for each type - NO BOXES, just graphics!
    const archerEmojis: { [key: string]: string } = {
      'recruit_bow': '🧑‍🎓',      // Student/trainee
      'hunter_bow': '🏹',         // Classic archer
      'longbow': '🎯',            // Target/precision
      'crossbow': '⚔️',           // Weapon
      'rapid_bow': '💨',          // Fast/wind
      'sniper_bow': '🔭'          // Telescope/long range
    };

    const emoji = archerEmojis[config.id] || '🏹';

    // Just the character - NO background box!
    const archerText = scene.add.text(0, 0, emoji, {
      fontSize: '56px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(archerText);

    // Add a subtle glow circle behind for visibility
    const glow = scene.add.circle(0, 0, 30);
    glow.setFillStyle(0xffffff, 0.2);
    glow.setStrokeStyle(2, 0xffffff, 0.5);
    this.add(glow);
    glow.setDepth(-1); // Behind the emoji

    scene.add.existing(this);
    this.setDepth(100); // Ensure archers render on top of paths

    // Make interactive for selection (larger area)
    this.setSize(70, 70);
    this.setInteractive();
  }

  update(time: number, enemies: Enemy[], projectiles: Projectile[]) {
    // Find closest enemy in range
    const target = this.findTarget(enemies);

    if (target && this.canShoot(time)) {
      this.shoot(target, projectiles);
      this.lastShotTime = time;
    }
  }

  private findTarget(enemies: Enemy[]): Enemy | null {
    let closest: Enemy | null = null;
    let closestDistance = Infinity;

    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;

      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        enemy.x,
        enemy.y
      );

      if (distance <= this.range && distance < closestDistance) {
        closest = enemy;
        closestDistance = distance;
      }
    });

    return closest;
  }

  private canShoot(currentTime: number): boolean {
    const shotCooldown = 1000 / this.fireRate; // milliseconds between shots
    return currentTime - this.lastShotTime >= shotCooldown;
  }

  private shoot(target: Enemy, projectiles: Projectile[]) {
    const projectile = new Projectile(
      this.scene,
      this.x,
      this.y,
      target,
      this.damage
    );
    projectiles.push(projectile);
  }

  showRangeCircle() {
    if (!this.rangeCircle) {
      this.rangeCircle = this.scene.add.circle(this.x, this.y, this.range);
      this.rangeCircle.setStrokeStyle(2, 0x00ff00, 0.5);
      this.rangeCircle.setFillStyle(0x00ff00, 0.1);
    }
  }

  hideRangeCircle() {
    if (this.rangeCircle) {
      this.rangeCircle.destroy();
      this.rangeCircle = null;
    }
  }

  getRange(): number {
    return this.range;
  }
}
