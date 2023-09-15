import { cogsData } from '~/features/cog';


export default class Cog {
  /**
   * @param {number} level
  */
  constructor(
    level,
    isV2=false,
    suit=null,
    name=null
  ) {
    this.level = level;
    this.rank = null;
    this.v2Resistance = isV2 ? Math.floor(this.level * 1.5) : 0;
    this.tgtDef = this._getTargetDefense();
    this.hp = this._calculateHP();
    this.suit = suit ? suit : this._getRandomSuit();
    this.cog = name ? name : this._getRandomCog();
    this.image = this._getImageName();
  }

  /**
   * Get the target defense value of the cog based on the lookup table:
   * 
   * Cog Level  tgtDef
   * 1          -2
   * 2          -5
   * 3          -10
   * 4          -12* / -15
   * 5          -15* / -20
   * 6          -25
   * 7          -30
   * 8          -35
   * 9          -40
   * 10         -45
   * 11         -50
   * 12         -55
   * 13+        ?
   * 
   * Levels 4 and 5: use the smaller number if the cog is rank 1. 
   * Levels 13+: TTR keeps these values secret - return level 12 tgtDef.
  */
  _getTargetDefense() {
    // Special Cases
    if (this.level === 1) return -2;
    if (this.level === 4 && this.rank === 1) return -12;
    if (this.level === 5 && this.rank === 1) return -15;
    if (this.level > 12) return -55;
    // Normal Case
    return (-5 * this.level) + 5;
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
    const suits = Object.keys(cogsData);
    return suits[Math.floor(Math.random() * suits.length)]
  }

  _getRandomCog() {
    const cogsOfSuit = cogsData[this.suit];

    // level <= 12, choose a cog that could legitimately have that level
    if (this.level <= 12) {
      let minIndex = Math.max(this.level - 5, 0);
      let maxIndex = Math.min(this.level, 8);
      
      let indexes = [];
      for (let i=minIndex; i<maxIndex; i++) indexes.push(i);
      
      this.rank = indexes[Math.floor(Math.random() * indexes.length)];
      return cogsOfSuit[this.rank];
    }

    // level > 12, use a random cog - FO cogs
    else {
      this.rank = Math.floor(Math.random() * cogsOfSuit.length)
      return cogsOfSuit[this.rank];
    }
  }

  _getImageName() {
    let suitConf = this.suit.toLowerCase();
    let cogConf = this.cog.replace(/[-&. ]/g,'').toLowerCase();
    return `/img/cogs/${suitConf}-${cogConf}.webp`;
  }

  toString() {
    return (
      `Cog: ${this.suit}, ${this.cog} Level ${this.level} (HP ${this.hp})\n- Image: ${this.image}`
    );
  }
}

// let testCog = new Cog(2);
// console.log(`${testCog}`);
