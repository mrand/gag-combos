import cogs from './cogs.json';

export default class Cog {
  /** 
   * @param {number} level 
  */
  constructor(level) {
    this.level = level;
    this.hp = this._calculateHP();
    this.suit = this._getRandomSuit();
    this.cog = this._getRandomCog();
    [this.suitImage, this.cogImage] = this._getImageNames();
  }
 
  _calculateHP() {
  return (this.level+1)*(this.level+2) + (
    (this.level > 11) ? 14 : 0
    );
  }

  _getRandomSuit() {
    // level > 12 - FO cogs only 
    if (this.level > 12) return "Sellbot";
    // level <= 12, could be any suit
    const suits = Object.keys(cogs);
    return suits[Math.floor(Math.random() * suits.length)]
  }

  _getRandomCog() {
    const cogsOfSuit = cogs[this.suit];

    // level > 12, use a random cog - FO cogs
    if (this.level > 12) return cogsOfSuit[Math.floor(Math.random() * cogsOfSuit.length)];

    // level <= 12, choose a cog that could legitimately have that level
    let minIndex = Math.max(this.level - 5, 0); 
    let maxIndex = Math.min(this.level, 8); 
    let indexes = [];
    for (let i=minIndex; i<maxIndex; i++) indexes.push(i);
    return cogsOfSuit[indexes[Math.floor(Math.random() * indexes.length)]];  
  }

  _getImageNames() {
    let suitConf = this.suit.toLowerCase();
    let cogConf = this.cog.replace(/[-&. ]/g,'').toLowerCase();
    return [
      `./img/cogs/symbol-${suitConf}.webp`,
      `./img/cogs/${suitConf}-${cogConf}.webp`
    ];
  }

  toString() {
    return (
      `Cog: ${this.suit}, ${this.cog} Level ${this.level} (HP ${this.hp})\n- Suit Image: ${this.suitImage}\n- Cog Image: ${this.cogImage}`
    );
  }
}

// let testCog = new Cog(2);
// console.log(`${testCog}`);