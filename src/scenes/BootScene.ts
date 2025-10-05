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
