import gags from './gags.json';


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
    [this.name, this.damage, this.accuracy] = this._getGagStats();
    this.image = this._getImageName();
    // used by Combo class
    this.luredMultiplier = 0;
    this.comboMultiplier = 0;
  }

  _getGagStats() {

    // if any parameters are missing, treat it as a "Pass"
    if (this.organic === null || this.track === null || this.level === null) {
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
    let orgConf = (this.organic === 'Organic') ? '-organic' : '';

    return (`./img/gags/${trackConf}-${nameConf}${orgConf}.png`);
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

    // Get Sound/Throw/Squirt Combo Multiplier
    if (
      (this.track === 'Sound' || this.track === 'Throw' || this.track === 'Squirt') &&
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


export class Combo {
  /** 
   * @param {Cog} cog Cog object
   * @param {Array<Gag>} gags Array of Gag objects
  */
  constructor(cog, gags, isLured=false) {
    this.cogHP = cog.hp;
    this.gags = gags;
    this.isLured = isLured;
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
    // Get Dud, Lured, and Combo Multiplier Damages
    let mainDamage = 0;   // main multiplier damage 
    let luredDamage = 0;  // lured multiplier damage 
    let comboDamage = 0;  // combo multiplier damage
    let gagDudMultiplier;    // (=0 if dud)
    let gagLureMultiplier;   // (=0.5 if lured)
    let gagComboMultiplier;  // (=0.2 if combo)
    this.gags.forEach((gag) => {
      [
        gagDudMultiplier, gagLureMultiplier, gagComboMultiplier
      ] = gag.getDamageWithMultiplier(this.counts, this.isLured);
      mainDamage  += (gag.damage * gagDudMultiplier)
      luredDamage += (gag.damage * gagLureMultiplier);
      comboDamage += (gag.damage * gagComboMultiplier);
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
//     new Gag('Lure', 1, false),
//     new Gag('Trap', 1, false),
//     new Gag('Throw', 1, false),
//     new Gag('Squirt', 1, false)
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
        return gag;
      });
    });
  });

  return gags;
}
const gagsContent = parseJSON(gags);
// console.log(gagsContent)


// eslint-disable-next-line no-extend-native
Array.prototype.hasNonZeroMin = function(attrib) {
  const checker = (o, i) => typeof(o) === 'object' && o[i]
  return (this.length && this.reduce(function(prev, curr){
      const prevOk = checker(prev, attrib);
      const currOk = checker(curr, attrib);
      if (!prevOk && !currOk) return {};
      if (!prevOk) return curr;
      if (!currOk) return prev;
      return ((prev[attrib] < curr[attrib]) && (prev[attrib] > 0) && (curr[attrib] > 0)) ? prev : curr; 
  })) || null;
}

// eslint-disable-next-line no-extend-native
Array.prototype.hasMax = function(attrib) {
  const checker = (o, i) => typeof(o) === 'object' && o[i]
  return (this.length && this.reduce(function(prev, curr){
      const prevOk = checker(prev, attrib);
      const currOk = checker(curr, attrib);
      if (!prevOk && !currOk) return {};
      if (!prevOk) return curr;
      if (!currOk) return prev;
      return (prev[attrib] > curr[attrib]) ? prev : curr; 
  })) || null;
}


export class FindCombo {
  constructor(
    cog=null,
    tracks=null,
    toonOrgs=null,
    isLured=false
  ) {
    // place empty values at end of org gags array
    toonOrgs.sort((a,b) => a ? b ? a.localeCompare(b) : -1 : 1);

    this.numToons = tracks.length;
    this.tracks = this._sortTracks(tracks);
    this.gags = this._getGags(tracks, toonOrgs);
    this.isLured=isLured;
    this.solution = this.find(cog);
  }

  _getGags(tracks, toonOrgs) {
    // requires both params
    if (tracks===null || toonOrgs===null) return false;

    let thisGags = [];
    tracks.forEach((track, i) => {
      if (toonOrgs[i] === track) {
        thisGags.push(gagsContent["Organic"][track])
      } else {
        thisGags.push(gagsContent["Non-Organic"][track])
      }
    });

    return thisGags;
  }

  _sortTracks(tracks) {
    // Pre-defined Order
    let ordering = {
      'Toon-Up': 1,
      'Trap':    2,
      'Lure':    3,
      'Sound':   4,
      'Throw':   5,
      'Squirt':  6,
      'Drop':    7
    }

    return tracks.sort(function(a,b) {
      return (ordering[a] - ordering[b] || a.localeCompare(b));
    });
  }

  find(cog) {
    if (!cog || !this.gags || this.gags.length === 0) return false;

    // Initialize Combo with Level 1 Gags
    let comboGags = [];
    for (let i=0; i<this.numToons; i++) {
      comboGags.push(
        new Gag(
          this.tracks[i],
          1,
          this.gags[i][0].organic
        )
      );
    }

    // Initialize Combo
    let combo = new Combo(cog, comboGags, this.isLured);

    // Find Optimal Combo
    let iterCount = 0;  // error check - iteration counter
    while (!combo.defeatsCog) {

      // find minimum damage gag (not Lure or Toon-Up, which have 0 damage)
      let tmp = comboGags.filter(function(gag) { return gag.track !== "Lure"; });
      let updateGag = tmp.hasNonZeroMin('level');
      let updateGagIndex = comboGags.findIndex(x => (x === updateGag));

      // lowest gag can go no higher ?
      if (updateGag.level === 7) {
        
        // edge case, stronger gag with a lower level exists (e.g. TNT vs Geyser)
        tmp = comboGags.filter(function(gag) { return gag.track !== "Lure"; });
        tmp = tmp.hasNonZeroMin('level');
        if (tmp.level < updateGag.level) {
          updateGag = tmp;
          updateGagIndex = comboGags.findIndex(x => (x === tmp));
        
        // true lowest gag can go no higher - no solution
        } else {
          return false;
        }
      }

      // replace weakest gag with next highest gag
      comboGags[updateGagIndex] = new Gag(
        this.tracks[updateGagIndex],
        updateGag.level+1,
        this.gags[updateGagIndex][updateGag.level].organic
      );
      // update combo and check
      combo = new Combo(cog, comboGags, this.isLured);
      if (combo.defeatsCog) break;

      // Throw error after 29 iterations
      // (a 4 gag combo will have a maximum of 28 iterations)
      iterCount++;
      if (iterCount>28) {
        throw new Error('Welp, the while loop was stuck iterating upwards.'); 
      }
    }

    // Decrease Gags if Possible
    let comboGagsCopy;  // use copies to check before mutating actual objects
    let tempCombo;      // yes, it is becoming slight spaghetti. tasty.
    iterCount = 0;  // reset error check iteration counter
    while (combo.defeatsCog) {

      // find maximum damage gag
      let updateGag = comboGags.hasMax('damage');
      let updateGagIndex = comboGags.findIndex(x => (x === updateGag));

      comboGagsCopy = [...comboGags];

      // maximum gag can go no lower - make it a pass
      if (updateGag.level === 1) {
        comboGagsCopy[updateGagIndex] = new Gag();

      // replace strongest gag with next lowest gag
      } else {
        comboGagsCopy[updateGagIndex] = new Gag(
          this.tracks[updateGagIndex],
          updateGag.level-1,
          this.gags[updateGagIndex][updateGag.level-1].organic
        );
      }

      // update combo and check
      tempCombo = new Combo(cog, comboGagsCopy, this.isLured);
      if (!tempCombo.defeatsCog) { 
        break; 
      } else { 
        combo = tempCombo; 
        comboGags = comboGagsCopy;
      }

      // Throw error after 4 iterations
      // (a 4 gag combo should decrease no more than 3 of its gags
      // since it just increased its lowest (4th) gag in the previous while loop)
      iterCount++;
      if (iterCount>3) {
        throw new Error('Welp, the while loop was stuck iterating downwards.'); 
      }
    }

    return combo;
  }

  toString() {
    return (
      `FindCombo: \nnumToons: ${this.numToons} \ntracks: ${this.tracks} \nsolution: ${this.solution}`
    );
  }
}


// let testCombo = new FindCombo(
//   new Cog(4),
//   ['Throw', 'Throw', 'Throw', 'Throw'],  // gag combo tracks
//   ['None', 'None', 'None', 'None'],     // toon organic gags
//   false                                 // is Lured
// );
// console.log(`${testCombo.solution}`);

// class AllFoundCombos {
//   constructor() {

//   }
// }