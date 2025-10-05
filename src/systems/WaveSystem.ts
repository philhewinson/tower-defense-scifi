import { Enemy } from '../entities/Enemy';
import { PathSystem } from './PathSystem';

export class WaveSystem {
  private currentRound: number = 1;
  private isWaveActive: boolean = false;
  private enemiesInWave: number = 0;
  private enemiesSpawned: number = 0;
  private spawnTimer: number = 0;
  private spawnInterval: number = 1500; // ms between spawns

  getCurrentRound(): number {
    return this.currentRound;
  }

  isActive(): boolean {
    return this.isWaveActive;
  }

  getEnemiesRemaining(): number {
    return this.enemiesInWave - this.enemiesSpawned;
  }

  getTotalEnemies(): number {
    return this.enemiesInWave;
  }

  startWave(): void {
    if (this.isWaveActive) return;

    this.isWaveActive = true;
    this.enemiesInWave = this.calculateEnemyCount();
    this.enemiesSpawned = 0;
    this.spawnTimer = 0;

    console.log(`Wave ${this.currentRound} started! Enemies: ${this.enemiesInWave}`);
  }

  update(delta: number, scene: Phaser.Scene, enemies: Enemy[]): void {
    if (!this.isWaveActive) return;
    if (this.enemiesSpawned >= this.enemiesInWave) return;

    this.spawnTimer += delta;

    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnEnemy(scene, enemies);
      this.spawnTimer = 0;
    }
  }

  checkWaveComplete(currentEnemyCount: number): boolean {
    if (this.isWaveActive &&
        this.enemiesSpawned >= this.enemiesInWave &&
        currentEnemyCount === 0) {
      this.onWaveComplete();
      return true;
    }
    return false;
  }

  private spawnEnemy(scene: Phaser.Scene, enemies: Enemy[]): void {
    const path = PathSystem.getRandomPath();
    const enemy = new Enemy(
      scene,
      path,
      40 * (1 + this.currentRound * 0.15), // HP scaling
      80, // Speed
      10  // Reward
    );
    enemies.push(enemy);
    this.enemiesSpawned++;
  }

  private calculateEnemyCount(): number {
    // Round 1-5: 5, 7, 9, 11, 13
    if (this.currentRound <= 5) {
      return 5 + (this.currentRound - 1) * 2;
    }
    // Round 6-10: 15, 17, 19, 21, 23
    if (this.currentRound <= 10) {
      return 13 + (this.currentRound - 5) * 2;
    }
    // Round 11+: Continue scaling
    return 23 + (this.currentRound - 10) * 2;
  }

  private onWaveComplete(): void {
    this.isWaveActive = false;
    this.currentRound++;
    console.log(`Wave complete! Moving to round ${this.currentRound}`);
  }
}
