import { gagsData } from './gag.data';


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

    this.accuracy = 0;
    this.damage = 0; 
    this.heal = 0;
    this.name = ""; 
    this.stun = 0;
    this.targetsMulti = false;
    this._getGagStats();
    
    this.image = this._getImageName();
    
    this.luredMultiplierDamage = 0;
    this.comboMultiplierDamage = 0;
  }

  _getGagStats() {

    // if any parameters are missing, treat it as a "Pass"
    if (this.organic === null || this.track === null || this.level === null) {
      this.level = 0;
      this.name = 'Pass';
      return;
    }

    // get gag object from JSON
    let thisGag = gagsData[this.track][this.level-1];
    let organicTxt = this.organic.toLowerCase(); 
    
    // Accuracy - Lure special
    if (this.track === 'Lure') {
      this.accuracy = thisGag.accuracy[organicTxt];
    } else {
      this.accuracy = thisGag.accuracy;
    }


    // Damage - Trap, Sound, Throw, Squirt, Drop special
    if (
      (this.track === 'Trap') || 
      (this.track === 'Sound') ||
      (this.track === 'Throw') ||
      (this.track === 'Squirt') ||
      (this.track === 'Drop')
    ) {
      this.damage = thisGag.damage[organicTxt][1];
    } 

    // Heal - Toon-Up special
    if (this.track === 'Toon-Up') {
      this.heal = thisGag.heal[organicTxt][1];

    }

    // Name
    this.name = thisGag.name;

    // Stun - Lure Special
    if (this.track === 'Lure') this.stun = thisGag.stun; 

    // Targets Multi
    this.targetsMulti = thisGag.targets_multi;
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

    this.luredMultiplierDamage = Math.ceil(luredMultiplier * this.damage);
    this.comboMultiplierDamage = Math.ceil(comboMultiplier * this.damage);

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
