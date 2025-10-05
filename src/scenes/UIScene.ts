import Phaser from 'phaser';

export class UIScene extends Phaser.Scene {
  private heartsText!: Phaser.GameObjects.Text;
  private coinsText!: Phaser.GameObjects.Text;
  private roundText!: Phaser.GameObjects.Text;
  private startWaveButton!: Phaser.GameObjects.Container;
  private buttonText!: Phaser.GameObjects.Text;
  private speedButtons: Phaser.GameObjects.Container[] = [];
  private currentSpeed: number = 1;

  constructor() {
    super({ key: 'UIScene', active: true });
  }

  create() {
    // Top bar background - pinned to top
    const topBar = this.add.rectangle(960, 35, 1920, 60, 0x1a1a2e, 0.9);

    // Hearts display (left)
    this.heartsText = this.add.text(50, 35, '❤️ 500', {
      fontSize: '28px',
      color: '#ff4444',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Coins display (center)
    this.coinsText = this.add.text(960, 35, '💰 £100', {
      fontSize: '28px',
      color: '#ffaa00',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Round display
    this.roundText = this.add.text(1450, 35, 'Round 1', {
      fontSize: '28px',
      color: '#00aaff',
      fontStyle: 'bold'
    }).setOrigin(1, 0.5);

    // Speed control buttons (top-right)
    this.createSpeedButtons();

    // Start Wave button
    this.createStartWaveButton();
  }

  private createSpeedButtons() {
    const speeds = [1, 2, 3, 4, 5];
    const startX = 1520;
    const spacing = 75;

    speeds.forEach((speed, index) => {
      const x = startX + (index * spacing);
      const y = 35; // Aligned with the header bar

      const container = this.add.container(x, y);

      // Button background
      const bg = this.add.rectangle(0, 0, 65, 50, 0x2a2a4e);
      bg.setStrokeStyle(3, 0x4a4a6e);
      bg.setInteractive({ useHandCursor: true });
      container.add(bg);

      // Speed text
      const text = this.add.text(0, 0, `${speed}x`, {
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(text);

      // Store references
      (container as any).bg = bg;
      (container as any).text = text;
      (container as any).speed = speed;

      // Click handler
      bg.on('pointerdown', () => {
        this.setSpeed(speed);
      });

      // Hover effect
      bg.on('pointerover', () => {
        if (this.currentSpeed !== speed) {
          bg.setFillStyle(0x3a3a5e);
        }
      });
      bg.on('pointerout', () => {
        if (this.currentSpeed !== speed) {
          bg.setFillStyle(0x2a2a4e);
        }
      });

      this.speedButtons.push(container);
    });

    // Highlight default speed (1x) - delay to ensure graphics are ready
    this.time.delayedCall(50, () => {
      this.updateSpeedButtonHighlight();
    });
  }

  private setSpeed(speed: number) {
    this.currentSpeed = speed;
    this.updateSpeedButtonHighlight();

    // Emit event to GameScene to change speed
    this.events.emit('speedChanged', speed);
    console.log(`⚡ Game speed set to ${speed}x`);
  }

  private updateSpeedButtonHighlight() {
    this.speedButtons.forEach(container => {
      const bg = (container as any).bg;
      const text = (container as any).text;
      const speed = (container as any).speed;

      if (speed === this.currentSpeed) {
        // Highlight selected speed
        bg.setFillStyle(0x00aa00); // Green
        bg.setStrokeStyle(4, 0x00ff00);
        text.setAlpha(1.0);
      } else {
        // Normal appearance
        bg.setFillStyle(0x2a2a4e);
        bg.setStrokeStyle(3, 0x4a4a6e);
        text.setAlpha(0.6);
      }
    });
  }

  private createStartWaveButton() {
    this.startWaveButton = this.add.container(960, 1000);

    const buttonBg = this.add.rectangle(0, 0, 250, 60, 0x00aa00);
    buttonBg.setStrokeStyle(4, 0x00ff00);
    buttonBg.setInteractive({ useHandCursor: true });

    this.buttonText = this.add.text(0, 0, 'START WAVE', {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.startWaveButton.add([buttonBg, this.buttonText]);

    // Button click handler
    buttonBg.on('pointerdown', () => {
      this.events.emit('startWave');
    });

    // Button hover effect
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x00dd00);
    });
    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x00aa00);
    });
  }

  updateHearts(hearts: number) {
    this.heartsText.setText(`❤️ ${hearts}`);
  }

  updateCoins(coins: number) {
    this.coinsText.setText(`💰 £${coins}`);
  }

  updateRound(round: number) {
    this.roundText.setText(`Round ${round}`);
  }

  setStartWaveButtonEnabled(enabled: boolean) {
    if (enabled) {
      this.startWaveButton.setAlpha(1);
      this.buttonText.setText('START WAVE');
    } else {
      this.startWaveButton.setAlpha(0.5);
      this.buttonText.setText('WAVE ACTIVE');
    }
  }

  showGameOver(finalRound: number, totalCoins: number) {
    // Game over screen
    const overlay = this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.8);

    const gameOverText = this.add.text(960, 400, 'GAME OVER', {
      fontSize: '72px',
      color: '#ff0000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const statsText = this.add.text(960, 540,
      `Final Round: ${finalRound}\nTotal Coins Earned: £${totalCoins}`, {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    const retryButton = this.add.rectangle(960, 700, 200, 60, 0x0066ff);
    retryButton.setStrokeStyle(4, 0x00aaff);
    retryButton.setInteractive({ useHandCursor: true });

    const retryText = this.add.text(960, 700, 'RETRY', {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    retryButton.on('pointerdown', () => {
      this.scene.restart('GameScene');
      this.scene.restart('UIScene');
    });
  }
}
