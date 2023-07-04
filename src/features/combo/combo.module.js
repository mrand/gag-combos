import comboInfo from 'features/combo/combo.data.json';

export default class Combo {
  /**
   * @param {Cog} cog Cog object
   * @param {Array<Gag>} gags Array of Gag objects
  */
  constructor(cog, gags, isLured=false) {
    this.cogLevel = cog.level;
    this.cogHP = cog.hp;
    this.cogResistance = cog.gagResistance;
    this.gags = gags;
    this.isLured = isLured;
    this.counts = this._countGagsByTrack();
    this.totalDamage = 0;
    this.defeatsCog = false;
    this.info = {
      indicator: null,
      text: []
    };
    this.tryCombo();
  }

  _countGagsByTrack() {
    // count how many of each gag track are used
    let counts = {};
    this.gags.forEach((gag) => {
      if (gag.track) {
        (gag.track in counts) ? counts[gag.track]++ : counts[gag.track] = 1;
      }
    });
    return counts;
  }

  tryCombo() {
    // Get Dud, Lured, and Combo Multiplier Damages
    let mainDamage = 0;   // main multiplier damage
    let luredDamage = 0;  // lured multiplier damage
    let comboDamage = 0;  // combo multiplier damage
    let gagDudMultiplier;    // (=0 if dud)
    let gagLureMultiplier;   // (=0.5 if lured)
    let gagComboMultiplier;  // (=0.2 if combo)
    this.gags.forEach((gag) => {
      let actualDamage = Math.max(gag.damage - this.cogResistance, 0);
      [
        gagDudMultiplier, gagLureMultiplier, gagComboMultiplier
      ] = gag.getDamageWithMultiplier(this.counts, this.isLured);
      mainDamage  += (actualDamage * gagDudMultiplier);
      luredDamage += (actualDamage * gagLureMultiplier);
      comboDamage += (actualDamage * gagComboMultiplier);
    });

    // Get Total Damage
    this.totalDamage = mainDamage + Math.ceil(luredDamage) + Math.ceil(comboDamage);
    if (this.totalDamage >= this.cogHP) {
      this.defeatsCog = true;
      return true;
    }
    return false;
  }


  /**
   * Add warnings or extra information about the combo if applicable.
  */ 
  getDetailedInfo() {

    const thisComboTracks = JSON.stringify(Object.keys(this.counts)); 

    // Drop Only
    if (thisComboTracks === JSON.stringify(['Drop'])) {
      this.info = comboInfo['All Drop'];
    }

    // Sound on Lured Cogs before Throw/Squirt
    if (
      [
        JSON.stringify(['Lure', 'Sound', 'Throw']),
        JSON.stringify(['Lure', 'Sound', 'Squirt']),
        JSON.stringify(['Lure', 'Sound', 'Throw', 'Squirt']),
      ]
      .includes(thisComboTracks)
    ) {
      this.info = comboInfo['Lure-Sound and Throw-Squirt'];
    }

    // Lure and Sound Only - Secured Sound
    if (thisComboTracks === JSON.stringify(['Lure', 'Sound'])) {
      this.info = comboInfo['Lure-Sound Only'];
    }
    
  }


  toString() {
    return (
      `Combo: \nCog HP: ${this.cogHP} \nGags: [\n${
        this.gags.map(gag => `${gag}`).join(',\n')
      }\n]\nDamage: ${this.totalDamage}\nDefeats Cog: ${this.defeatsCog}`
    );
  }
}

// let testCombo = new Combo(
//   new Cog(3),
//   [
//     new Gag('Lure', 1, false),
//     new Gag('Trap', 1, false),
//     new Gag('Throw', 1, false),
//     new Gag('Squirt', 1, false)
//   ]
// );
// console.log(`${testCombo}`);
