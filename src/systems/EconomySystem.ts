export class EconomySystem {
  private coins: number = 100;
  private hearts: number = 500;

  getCoins(): number {
    return this.coins;
  }

  getHearts(): number {
    return this.hearts;
  }

  addCoins(amount: number): void {
    this.coins += amount;
    console.log(`+£${amount} coins. Total: £${this.coins}`);
  }

  removeCoins(amount: number): boolean {
    if (this.coins >= amount) {
      this.coins -= amount;
      return true;
    }
    return false;
  }

  canAfford(cost: number): boolean {
    return this.coins >= cost;
  }

  loseHearts(amount: number): boolean {
    this.hearts -= amount;
    console.log(`Lost ${amount} hearts. Remaining: ${this.hearts}`);

    if (this.hearts <= 0) {
      this.hearts = 0;
      return true; // Game over
    }
    return false;
  }

  addHearts(amount: number): void {
    this.hearts += amount;
    console.log(`+${amount} hearts. Total: ${this.hearts}`);
  }
}
