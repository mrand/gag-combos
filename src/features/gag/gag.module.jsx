import { gagsData } from '~/features/gag';


export default class Gag {
  /** 
   * @param {string} track Gag track
   * @param {int} level Gag level
   * @param {boolean} org Gag is organic (true/false)
  */
  constructor(track=null, level=null, org=null) {
    // Defaults
    this.organic = 'Non-Organic';
    this.track = '';
    this.level = 0;
    this.name = 'Pass'; 
    this.accuracy = {
      'Base': 1.0,
      'Attack': 1.0
    };
    this.damage = {
      'Base': 0,
      'Attack': 0,
      'Lured Multiplier': 0,
      'Combo Multiplier': 0,
    };
    this.heal = 0;
    this.stun = 0;
    this.targetsMulti = false;
    // Override Defaults based on given parameters
    this._getGagStats(track, level, org);
    this.image = this._getImageName();
  }

  _getGagStats(track, level, org) {

    // if any parameters are missing, treat it as a "Pass"
    if (!track || !level) return;

    this.track = track;
    this.level = level;
    this.organic = (org) ? 'Organic' : 'Non-Organic';

    // get gag object from JSON
    let thisGag = gagsData[this.track][this.level-1];
    let organicTxt = this.organic.toLowerCase(); 
    
    // Accuracy - Lure special
    if (this.track === 'Lure') {
      this.accuracy['Base'] = thisGag.accuracy[organicTxt];
    } else {
      this.accuracy['Base'] = thisGag.accuracy;
    }


    // Damage - Trap, Sound, Throw, Squirt, Drop special
    if (
      (this.track === 'Trap') || 
      (this.track === 'Sound') ||
      (this.track === 'Throw') ||
      (this.track === 'Squirt') ||
      (this.track === 'Drop')
    ) {
      this.damage['Base'] = thisGag.damage[organicTxt][1];
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
    if (this.name === 'Pass') return './img/gags/pass.png';

    let trackConf = this.track.replace(/-/g,'').toLowerCase();
    let nameConf = this.name.replace(/[$ ]/g,'').toLowerCase();

    return (`/img/gags/${trackConf}-${nameConf}.png`);
  }

  /**
   * 
   * @param {dict} counts A dictionary containing how many gags of each track are used in a particular combo.
   * @param {boolean} isLured Whether or not the cog is lured.
   * @param {int} cogLevel The cog's level.
   */
  getAccuracyWithCombo(counts, isLured, cog) {

    /*
    100% Accuracy Cases:
    */
    if (

      // Pass
      this.name === 'Pass' ||
      
      // Trap
      this.track === 'Trap' ||

      // Sound on Lured Cogs
      (
        (
          !Object.keys(counts).includes('Trap') && 
          Object.keys(counts).includes('Lure') &&
          this.track === 'Sound'
        ) || (
          !Object.keys(counts).includes('Trap') && 
          isLured &&
          this.track === 'Sound'
        )
      ) ||
      
      // Throw on Lured Cogs
      (
        (
          !Object.keys(counts).includes('Trap') && 
          !Object.keys(counts).includes('Sound') && 
          Object.keys(counts).includes('Lure') &&
          this.track === 'Throw'
        ) || (
          !Object.keys(counts).includes('Trap') && 
          !Object.keys(counts).includes('Sound') && 
          isLured &&
          this.track === 'Throw'
        )
      ) ||
      
      // Squirt on Lured Cogs
      (
        (
          !Object.keys(counts).includes('Trap') && 
          !Object.keys(counts).includes('Sound') && 
          !Object.keys(counts).includes('Throw') && 
          Object.keys(counts).includes('Lure') &&
          this.track === 'Squirt'
        ) || (
          !Object.keys(counts).includes('Trap') && 
          !Object.keys(counts).includes('Sound') && 
          !Object.keys(counts).includes('Throw') && 
          isLured &&
          this.track === 'Squirt'
        )
      )
    ) {
      this.accuracy['Attack'] = 1.0;
      return;
    }


    // Proposed Accuracy := Gag's Base Accuracy
    const propAcc = this.accuracy['Base'] * 100;  


    /*
    Track Experience := (highest gag level in track - 1) * 10
    Assume maximum track experience.
    */
    const trackExp = 60;


    /*
    Target Defense defined by cog
    Special Case: Toon-Up always equals 0.
    */
    const tgtDef = (this.track==='Toon-Up') ? 0 : cog.tgtDef;


    /*
    Previous Hits
    Assume all previous gags hit.
    */
    let prevHits = 0;  
    for (const [track, count] of Object.entries(counts)) {
      if (track === this.track) break;  // do not count current track
      prevHits += (20 * count);
    }


    /*
    Lured Ratio := (number of lured cogs) / (total cogs in battle) * 100
    Total cogs in battle assumed to be 1 for recommendations. 
    */
    let luredRatio = 0;
    if (!(this.track in ['Toon-Up', 'Trap', 'Drop'])) {
      if (
        (
          (this.track === 'Sound') ||
          (this.level === 7 && this.track in ['Throw', 'Squirt'])
        ) && (
          isLured || 'Lure' in counts
        )
      ) {
        luredRatio = 100;
      }
    }

    const bonus = prevHits + luredRatio; 

    const atkAcc = Math.min(propAcc + trackExp + tgtDef + bonus, 95) / 100;
    this.accuracy['Attack'] = atkAcc;
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
    if (this.damage['Base'] === 0) return [0, 0, 0];

    // Drop on Lure Dud
    if (
      (this.track === 'Drop') &&
      (isLured || counts['Lure'] > 0) && 
      (!('Trap' in counts) || counts['Trap'] > 1) && 
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

    this.damage['Lured Multiplier'] = Math.round(luredMultiplier * this.damage['Attack'] * 10) / 10;
    this.damage['Combo Multiplier'] = Math.round(comboMultiplier * this.damage['Attack'] * 10) / 10;

    return [dudMultiplier, luredMultiplier, comboMultiplier];
  }

  toString() {
    return (
      `Gag: ${this.organic} ${this.track}, ${this.level} - ${this.name}, Damage: ${this.damage['Base']}`
      // \n- Image: ${this.image}`
    );
  }
}

// let testGag = new Gag('Squirt', 2, false);
// console.log(`${testGag}`);
