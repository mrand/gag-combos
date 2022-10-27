import gags from '../data/gags.data.json';


export default class Gag {
  /** 
   * @param {string} track Gag track
   * @param {int} level Gag level
   * @param {boolean} org Gag is organic (true/false)
  */
  constructor(track=null, level=null, org=null) {
    this.organic = (org) ? "Organic" : "Non-Organic";
    this.track = track;
    this.level = level;
    [this.name, this.damage, this.accuracy] = this._getGagStats();
    this.image = this._getImageName();
    // used by Combo class
    this.luredMultiplier = 0;
    this.comboMultiplier = 0;
  }

  _getGagStats() {

    // if any parameters are missing, treat it as a "Pass"
    if (this.organic === null || this.track === null || this.level === null) {
      this.level = 0;
      return ['Pass', 0, null];
    }

    // get gag object from JSON
    let thisGag = gags[this.organic][this.track][this.level-1];
    
    // Toon-Up and Lure have no damage
    if (this.track === 'Toon-Up' || this.track === 'Lure') {
      return [thisGag.name, 0, thisGag.accuracy];
    }
    
    // Other Gags have damage
    return [thisGag.name, thisGag.damage, thisGag.accuracy];

  }

  _getImageName() {
    // Pass image doesn't adhere to naming format
    if (this.name === 'Pass') return './img/gags/Pass.png';

    let trackConf = this.track.split('-').join('').toLowerCase();
    let nameConf = this.name.split('$').join('').split(' ').join('_');

    return (`./img/gags/${trackConf}-${nameConf}.png`);
  }

  /**
   * 
   * @param {dict} counts A dictionary containing how many gags of each track are used in a particular combo. 
   */
  getDamageWithMultiplier(counts, isLured) {
    let dudMultiplier = 1;
    let luredMultiplier = 0;
    let comboMultiplier = 0;

    // 'Pass', 'Lure', and 'Toon-Up' have no damage to multiply
    if (this.damage === 0) return [0, 0, 0];

    // Drop on Lure Dud
    if (
      (this.track === 'Drop') &&
      (counts['Lure'] > 0) && 
      !('Trap' in counts) && 
      !('Sound' in counts) && 
      !('Throw' in counts) &&
      !('Squirt' in counts)
    ) {
      return [0, 0, 0];
    }

    // Trap no Lure Dud
    if (
      (this.track === 'Trap') && 
      (!('Lure' in counts))
    ) {
      return [0, 0, 0];
    }

    // Multiple Traps Dud
    if (this.track === 'Trap' && counts['Trap'] > 1) return [0, 0, 0];


    // Get Lured Multiplier
    if (
      (counts['Lure'] > 0) ||
      (isLured)
    ) {
      // Throw (trap and sound don't knockback first)
      if (
        (this.track === 'Throw') && 
        (!('Trap' in counts) || (counts['Trap'] > 1)) &&
        !('Sound' in counts)
      ) {
        luredMultiplier = 0.5;
      }
      // Squirt (trap, sound, and throw don't knockback first)
      if (
        (this.track === 'Squirt') && 
        (!('Trap' in counts) || (counts['Trap'] > 1)) &&
        !('Sound' in counts) && 
        !('Throw' in counts)
      ) {
        luredMultiplier = 0.5;
      }
    }

    // Get Sound/Throw/Squirt/Drop Combo Multiplier
    if (
      (this.track === 'Sound' || this.track === 'Throw' || this.track === 'Squirt' || this.track === 'Drop') &&
      (counts[this.track] > 1)
    ) {
      comboMultiplier = 0.2;
    }

    return [dudMultiplier, luredMultiplier, comboMultiplier];
  }

  toString() {
    return (
      `Gag: ${this.organic} ${this.track}, ${this.level} - ${this.name}, Damage: ${this.damage}`
      // \n- Image: ${this.image}`
    );
  }
}

// let testGag = new Gag('Squirt', 2, false);
// console.log(`${testGag}`);
