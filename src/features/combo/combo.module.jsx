import comboInfo from '~/features/combo/combo.data.json';

export default class Combo {
  /**
   * @param {Cog} cog Cog object
   * @param {Array<Gag>} gags Array of Gag objects
  */
  constructor(cog, gags, isLured=false) {
    this.cog = cog;
    this.gags = gags;
    this.isLured = isLured;
    this.counts = this._countGagsByTrack();
    this.totalDamage = 0;
    this.defeatsCog = false;
    this.accuracy = 1.0;
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

  _getAccuracy() {
    
    // Use maximum attack accuracy from groups of gags of the same track.
    let maxAtkAccs = {};
    this.gags.forEach((gag) => {
      gag.getAccuracyWithCombo(this.counts, this.isLured, this.cog);
      (gag.track in maxAtkAccs)
        ? maxAtkAccs[gag.track] = Math.max(gag.accuracy['Attack'], maxAtkAccs[gag.track])
        : maxAtkAccs[gag.track] = gag.accuracy['Attack'];
    });
    this.gags.forEach((gag) => gag.accuracy['Attack'] = maxAtkAccs[gag.track]);

    // Calculate combo accuracy using gags' attack accuracy values. 
    let comboAccuracy = 1;
    for (let ta in maxAtkAccs) {
      comboAccuracy *= maxAtkAccs[ta];
    }

    // format value as 0-100 with 1 decimal place
    this.accuracy = Math.round(comboAccuracy * 1000) / 10;
  }

  /**
   * Add warnings or extra information about the combo if applicable.
  */ 
  _getDetails() {
    // generate a key from this combo's unique gag tracks
    let thisInfoKey = Object.keys(this.counts)
      .join('-')
      .toLowerCase();

    if (this.isLured) thisInfoKey = 'lure-'+thisInfoKey;
    if (!comboInfo["mapsToData"][thisInfoKey]) return false;

    // use the key to get the map to any descriptions/warnings
    const infoMap = comboInfo["mapsToData"][thisInfoKey];
    if (!comboInfo["data"][infoMap]) return false;
    
    // set descriptions/warnings for this combo
    this.info = comboInfo["data"][infoMap];
  }

  _getDamage() {
    // Get Dud, Lured, and Combo Multiplier Damages
    let mainDamage = 0;   // main multiplier damage
    let luredDamage = 0;  // lured multiplier damage
    let comboDamage = 0;  // combo multiplier damage
    let gagDudMultiplier;    // (=0 if dud)
    let gagLureMultiplier;   // (=0.5 if lured)
    let gagComboMultiplier;  // (=0.2 if combo)
    this.gags.forEach((gag) => {
      let actualDamage = Math.max(gag.damage['Base'] - this.cog.v2Resistance, 0);
      [
        gagDudMultiplier, gagLureMultiplier, gagComboMultiplier
      ] = gag.getDamageWithMultiplier(this.counts, this.isLured);
      mainDamage  += (actualDamage * gagDudMultiplier);
      luredDamage += (actualDamage * gagLureMultiplier);
      comboDamage += (actualDamage * gagComboMultiplier);
    });

    // Check Total Damage
    this.totalDamage = mainDamage + Math.ceil(luredDamage) + Math.ceil(comboDamage);

    // defeats cog
    if (this.totalDamage >= this.cog.hp) this.defeatsCog = true;
  }

  tryCombo() {
    this._getDamage();
    if (!this.defeatsCog) return false;

    this._getDetails();  // get combo details
    this._getAccuracy();  // get combo accuracy
    return true;
  }

  toString() {
    return (
      `Combo: \nCog HP: ${this.cog.hp} \nGags: [\n${
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
