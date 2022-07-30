import gags from './gags.json';
import Cog from './Cog';


export class Gag {
  /** 
   * @param {string} track Gag track
   * @param {int} level Gag level
   * @param {boolean} org Gag is organic (true/false)
  */
  constructor(track=null, level=null, org=null) {
    this.organic = (org) ? "Organic" : "Non-Organic";
    this.track = track;
    this.level = level;
    [this.name, this.damage] = this._getGagStats();
    this.image = this._getImageName();
    // used by Combo class
    this.luredMultiplier = 0;
    this.comboMultiplier = 0;
  }

  _getGagStats() {

    // if any parameters are missing, treat it as a "Pass"
    if (this.organic === null || this.track === null || this.level === null) {
      return ['Pass', 0];
    }

    // get gag object from JSON
    let thisGag = gags[this.organic][this.track][this.level-1];

    // Toon-Up and Lure have no damage
    if (this.track === 'Toon-Up' || this.track === 'Lure') {
      return [thisGag.name, 0];
    }
    
    // Other Gags have damage
    return [thisGag.name, thisGag.damage];

  }

  _getImageName() {
    // Pass image doesn't adhere to naming format
    if (this.name === 'Pass') return './img/gags/Pass.png';

    let trackConf = this.track.replace('-','').toLowerCase();
    let nameConf = this.name.replace('$','').replace(' ','_');
    return (`./img/gags/${trackConf}-${nameConf}.png`);
  }

  /**
   * 
   * @param {dict} counts A dictionary containing how many gags of each track are used in a particular combo. 
   */
  getDamageWithMultiplier(counts) {

    // 'Pass', 'Lure', and 'Toon-Up' have no damage to multiply
    if (this.damage === 0) return 0;

    // Drop on Lure Dud
    if (
      (this.track === 'Drop') &&
      (counts['Lure'] > 0) && 
      !('Trap' in counts) && 
      !('Sound' in counts) && 
      !('Throw' in counts) &&
      !('Squirt' in counts)
    ) {
      return 0;
    }

    // Trap no Lure Dud
    if (
      (this.track === 'Trap') && 
      (!('Lure' in counts))
    ) {
      return 0;
    }

    // Multiple Traps Dud
    if (this.track === 'Trap' && counts['Trap'] > 1) return 0;


    // Get Lured Multiplier
    if (counts['Lure'] > 0) {
      // Throw (trap and sound don't knockback first)
      if (
        (this.track === 'Throw') && 
        (!('Trap' in counts) || (counts['Trap'] > 1)) &&
        !('Sound' in counts)
      ) {
        this.luredMultiplier = 0.5;
      }
      // Squirt (trap, sound, and throw don't knockback first)
      if (
        (this.track === 'Squirt') && 
        (!('Trap' in counts) || (counts['Trap'] > 1)) &&
        !('Sound' in counts) && 
        !('Throw' in counts)
      ) {
        this.luredMultiplier = 0.5;
      }
    }

    // Get Throw/Squirt Combo Multiplier
    if (
      (this.track === 'Sound' || this.track === 'Throw' || this.track === 'Squirt') &&
      (counts[this.track] > 1)
    ) {
      this.comboMultiplier = 0.2;
    }
  }

  toString() {
    return (
      `Gag: ${this.organic} ${this.track}, ${this.level} - ${this.name}, Damage: ${this.damage}\n- Image: ${this.image}`
    );
  }
}
// let testGag = new Gag('Squirt', 2, false);
// console.log(`${testGag}`);


export class Combo {
  /** 
   * @param {Cog} cog Cog object
   * @param {Array<Gag>} gags Array of Gag objects
  */
  constructor(cog, gags) {
    this.cogHP = cog.hp;
    this.gags = gags;
    this.counts = this._countGagsByTrack();
    this.totalDamage = 0;
    this.defeatsCog = false;

    this._tryCombo();
  }

  _countGagsByTrack() {
    // count how many of each gag track are used
    let counts = {}; 
    this.gags.forEach((gag) => {
      if (gag.track) {
        (gag.track in counts) ? counts[gag.track]++ : counts[gag.track] = 1;
      }
    });
    // console.log(counts);
    return counts;
  }

  _tryCombo() {
    // Get Main Damage
    let mainDamage = 0;
    this.gags.forEach((gag) => { mainDamage += gag.damage });

    // Get Lured and Combo Multiplier Damages
    this.gags.forEach((gag) => gag.getDamageWithMultiplier(this.counts));
    // lured multiplier damage
    let luredDamage = 0;
    this.gags.forEach((gag) => {
      luredDamage += (gag.damage * gag.luredMultiplier);
    });
    // combo multiplier damage
    let comboDamage = 0;
    this.gags.forEach((gag) => {
      comboDamage += (gag.damage * gag.comboMultiplier);
    });

    // Get Total Damage
    this.totalDamage = mainDamage + Math.ceil(luredDamage) + Math.ceil(comboDamage);
    if (this.totalDamage >= this.cogHP) {
      this.defeatsCog = true;
      return true;
    }
    return false;
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
//     new Gag('Lure', 0, false),
//     new Gag('Trap', 0, false),
//     new Gag('Throw', 0, false),
//     new Gag('Squirt', 0, false)
//   ]
// );
// console.log(`${testCombo}`);


function parseJSON(gags) {
  let types = Object.keys(gags);
  let tracks = Object.keys(gags.Organic);

  types.forEach(type => {
    tracks.forEach(track => {
      gags[type][track].map((gag, i) => {
        gag.organic = (type === 'Organic') ? true : false;
        gag.track = track;
        gag.level = i+1;
      });
    });
  });

  return gags;
}
const gagsContent = parseJSON(gags);
// console.log(gagsContent)

// let soundGags;
// let throwGags;
// let squirtGags;
// let trapLureGags;
// let dropThrowSquirtGags;


class FindCombo {
  constructor(
    cog=null, 
    gagTrack=null,
    includeOrg=false,
    numToons=1
  ) {
    this.track = gagTrack;
    this.includeOrg = includeOrg
    this.gags = this._getGags(this.includeOrg);
    this.solns = this.find(cog, numToons);
  }

  _getGags(includeOrg=false) {
    if (!this.track) return false;

    // get all gags
    let allGags = false;
    if (includeOrg) {
      allGags = gagsContent['Organic'][this.track].concat(gagsContent['Non-Organic'][this.track]) || false;
    } else {
      allGags = gagsContent['Non-Organic'][this.track] || false;
    }
    if (!allGags) return false;

    // sort and add index to each gag object
    allGags.sort((a,b) => a.damage - b.damage)
    allGags.map((gag, i) => { gag.index = i; });
    return allGags;
  }

  find(cog, numToons) {
    if (!cog || !this.gags) return false;

    // initialize each toon's gag as a non-organic level 1 gag
    let comboGags = [];
    for (let i=0; i<numToons; i++) {
      comboGags.push(
        new Gag(
          this.track,
          1,
          false
        )
      );
    }

    // if trap, force first gag to be lure (arbitrarily $10 bill)
    if (this.track === 'Trap') {
      if (numToons === 1) return false;  // trap needs lure
      comboGags[0] = new Gag('Lure', 5, false);
    };

    // initialize combo
    let combo = new Combo(cog, comboGags);

    // increase each gag level until it defeats cog
    while (!combo.defeatsCog) {

      for (let i=0; i<comboGags.length; i++) {
        let gag = comboGags[i];
        let idx = gag.level-1;
        if (this.includeOrg) {
          idx = (gag.organic === 'Organic') ? (2*gag.level)-1 : (2*gag.level)-2; 
        }
        let newIndex = idx + 1;
        // last gag is as high as it can be - no solution
        if (
          (i === comboGags.length-1) &&
          (newIndex === this.gags.length)
        ) {
          return false;
        }

        if (gag.track === 'lure') { 
          continue;  // leave lure alone
        } else if (idx === this.gags.length-1) { 
          continue;  // gag can go no higher
        } else {
          // replace gag with next highest gag
          comboGags[i] = new Gag(
            this.track, 
            this.gags[newIndex].level, 
            this.gags[newIndex].organic
          );
          // update combo and check
          combo = new Combo(cog, comboGags);
          if (combo.defeatsCog) break;
        }
      }

    }
    
    return combo;
  }
}


let testFindCombo = new FindCombo(
  new Cog(8),  // cog(level)
  'Throw',     // gag track,
  false,       // include organic
  4            // number of toons
);
console.log(testFindCombo.solns);
