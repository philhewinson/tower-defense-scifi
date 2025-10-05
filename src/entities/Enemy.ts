import Phaser from 'phaser';
import { PathWaypoint } from '../systems/PathSystem';

export class Enemy extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Rectangle;
  private hpBarBackground: Phaser.GameObjects.Rectangle;
  private hpBarFill: Phaser.GameObjects.Rectangle;
  private path: PathWaypoint[];
  private currentWaypointIndex: number = 0;
  private moveSpeed: number; // pixels per second
  public hp: number;
  public maxHP: number;
  public reward: number;
  public isAlive: boolean = true;
  public reachedGate: boolean = false;

  constructor(
    scene: Phaser.Scene,
    path: PathWaypoint[],
    hp: number,
    speed: number,
    reward: number
  ) {
    super(scene, path[0].x, path[0].y);

    this.path = path;
    this.hp = hp;
    this.maxHP = hp;
    this.moveSpeed = speed;
    this.reward = reward;

    // Create enemy - NO BOXES, just graphics!
    // Just the enemy character
    const enemyText = scene.add.text(0, 0, '👾', {
      fontSize: '48px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(enemyText);

    // Subtle red glow for visibility
    const glow = scene.add.circle(0, 0, 28);
    glow.setFillStyle(0xff0000, 0.15);
    glow.setStrokeStyle(2, 0xff0000, 0.3);
    this.add(glow);
    glow.setDepth(-1); // Behind emoji

    // Create HP bar background (sleek, no box)
    this.hpBarBackground = scene.add.rectangle(0, -35, 50, 5, 0x000000, 0.8);
    this.add(this.hpBarBackground);

    // Create HP bar fill
    this.hpBarFill = scene.add.rectangle(0, -35, 50, 5, 0x00ff00);
    this.add(this.hpBarFill);

    // Add to scene
    scene.add.existing(this);
    this.setDepth(50); // Below archers but above paths
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
    this.updateHPBar();

    if (this.hp <= 0) {
      this.onDeath();
      return true; // Enemy killed
    }
    return false; // Still alive
  }

  private updateHPBar() {
    const hpPercent = Math.max(0, this.hp / this.maxHP);
    this.hpBarFill.width = 50 * hpPercent; // Updated for new size

    // Color changes based on HP
    if (hpPercent > 0.6) {
      this.hpBarFill.setFillStyle(0x00ff00); // Green
    } else if (hpPercent > 0.3) {
      this.hpBarFill.setFillStyle(0xffff00); // Yellow
    } else {
      this.hpBarFill.setFillStyle(0xff0000); // Red
    }
  }

  private onDeath() {
    this.isAlive = false;
    this.destroy();
    // Scene will award coins based on this.reward
  }

  private onReachGate() {
    this.isAlive = false;
    this.reachedGate = true;
    this.destroy();
    // Scene will damage gate (1 heart)
  }
}
