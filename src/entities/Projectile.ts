import Phaser from 'phaser';
import { Enemy } from './Enemy';

export class Projectile extends Phaser.GameObjects.Arc {
  private target: Enemy;
  private speed: number = 400; // pixels per second
  private damage: number;
  public isActive: boolean = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    target: Enemy,
    damage: number
  ) {
    super(scene, x, y, 8, 0, 360, false, 0xffff00); // Bigger yellow circle

    this.target = target;
    this.damage = damage;
    this.setStrokeStyle(2, 0xffaa00, 1.0); // Thicker border, more visible

    scene.add.existing(this);
    this.setDepth(75); // Between enemies and archers
  }

  update(delta: number) {
    if (!this.isActive || !this.target.isAlive) {
      this.destroy();
      this.isActive = false;
      return;
    }

    // Move toward target's current position
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      // Hit the target
      this.onHit();
    } else {
      // Move toward target
      const moveDistance = (this.speed * delta) / 1000;
      const ratio = moveDistance / distance;
      this.x += dx * ratio;
      this.y += dy * ratio;
    }
  }

  private onHit() {
    // Deal damage to target
    this.target.takeDamage(this.damage);

    // Destroy projectile
    this.isActive = false;
    this.destroy();
  }
}
