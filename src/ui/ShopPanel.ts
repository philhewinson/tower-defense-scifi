import Phaser from 'phaser';
import { ArcherConfig, ARCHER_DATA } from '../data/archerData';

export class ShopPanel {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private selectedArcher: ArcherConfig | null = null;
  private archerCards: Phaser.GameObjects.Container[] = [];
  private freeArcherText: Phaser.GameObjects.Text | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create() {
    this.container = this.scene.add.container(0, 0);

    // Background panel
    const panel = this.scene.add.rectangle(150, 540, 280, 1080, 0x1a1a2e, 0.95);
    this.container.add(panel);

    // Title - positioned below the header bar
    const title = this.scene.add.text(150, 90, 'ARCHER SHOP', {
      fontSize: '24px',
      color: '#00aaff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.container.add(title);

    // Free archer section
    const freeArcherLabel = this.scene.add.text(150, 125, 'Recruit Bow', {
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.container.add(freeArcherLabel);

    this.freeArcherText = this.scene.add.text(150, 150, 'Free: 5/5 left', {
      fontSize: '16px',
      color: '#00ff00',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.container.add(this.freeArcherText);

    // Create archer cards for Tier 1
    let yPos = 200;
    ARCHER_DATA.forEach((archerConfig, index) => {
      if (archerConfig.tier === 1) {
        const card = this.createArcherCard(archerConfig, 150, yPos);
        this.archerCards.push(card);
        this.container.add(card);
        yPos += 140;
      }
    });
  }

  private createArcherCard(config: ArcherConfig, x: number, y: number): Phaser.GameObjects.Container {
    const card = this.scene.add.container(x, y);

    // Card background
    const bg = this.scene.add.rectangle(0, 0, 250, 120, 0x2a2a4e);
    bg.setStrokeStyle(2, 0x4a4a6e);
    bg.setInteractive({ useHandCursor: true });
    card.add(bg);

    // Archer name
    const nameText = this.scene.add.text(0, -45, config.name, {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    card.add(nameText);

    // Cost
    const costColor = config.cost === 0 ? '#00ff00' : '#ffaa00';
    const costText = this.scene.add.text(0, -20, `£${config.cost}`, {
      fontSize: '18px',
      color: costColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    card.add(costText);

    // Stats
    const statsText = this.scene.add.text(0, 10,
      `Range: ${config.range}\nSpeed: ${config.fireRate}/s\nDamage: ${config.damage}`, {
      fontSize: '14px',
      color: '#aaaaaa',
      align: 'center'
    }).setOrigin(0.5);
    card.add(statsText);

    // Click handler
    bg.on('pointerdown', () => {
      this.selectArcher(config);
    });

    // Hover effect
    bg.on('pointerover', () => {
      bg.setStrokeStyle(3, 0x00aaff);
    });
    bg.on('pointerout', () => {
      if (this.selectedArcher?.id !== config.id) {
        bg.setStrokeStyle(2, 0x4a4a6e);
      }
    });

    // Store reference to background for selection highlighting
    (card as any).bg = bg;
    (card as any).config = config;

    return card;
  }

  private selectArcher(config: ArcherConfig) {
    this.selectedArcher = config;

    // Update all card borders
    this.archerCards.forEach(card => {
      const bg = (card as any).bg;
      const cardConfig = (card as any).config;
      if (cardConfig.id === config.id) {
        bg.setStrokeStyle(3, 0x00ff00); // Green = selected
      } else {
        bg.setStrokeStyle(2, 0x4a4a6e); // Gray = not selected
      }
    });

    console.log(`Selected archer: ${config.name}`);
  }

  getSelectedArcher(): ArcherConfig | null {
    return this.selectedArcher;
  }

  updateAffordability(currentCoins: number) {
    this.archerCards.forEach(card => {
      const config = (card as any).config;
      const bg = (card as any).bg;

      if (currentCoins < config.cost) {
        bg.setAlpha(0.5); // Gray out unaffordable
      } else {
        bg.setAlpha(1.0);
      }
    });
  }

  updateFreeArcherCount(used: number, max: number) {
    if (this.freeArcherText) {
      const remaining = max - used;
      this.freeArcherText.setText(`Free: ${remaining}/${max} left`);

      // Change color based on remaining
      if (remaining === 0) {
        this.freeArcherText.setColor('#ff0000'); // Red when none left
      } else if (remaining <= 2) {
        this.freeArcherText.setColor('#ffaa00'); // Orange when few left
      } else {
        this.freeArcherText.setColor('#00ff00'); // Green when plenty
      }
    }
  }
}
