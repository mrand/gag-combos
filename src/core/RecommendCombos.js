import gags from './gags.json';
import combos from './combos.json';
import { Combo, Gag } from './Combo.js';


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


function parseJSON(gags) {
  let types = Object.keys(gags);
  let tracks = Object.keys(gags.Organic);  // arbitrarily use Organic - same tracks as Non-Organic

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


export class FindCombo {
  constructor(
    cog=null,
    tracks=null,
    toonOrgs=null,
    isLured=false
  ) {
    this.numToons = tracks.length;
    this.tracks = this._sortTracks(tracks);
    this.toonOrgs = this._configToonOrgs(toonOrgs);
    this.gags = this._getGags();
    this.isLured=isLured;
    this.solution = this.find(cog);
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

  _configToonOrgs(toonOrgs) {
    let toonOrgsCopy = [...toonOrgs];  // mutate copy of toonOrgs
    let thisToonOrgs = [];             // to be this.toonOrgs

    this.tracks.forEach((track) => {
      let trackIdx = toonOrgsCopy.indexOf(track); 
      if (trackIdx !== -1) {
        thisToonOrgs.push(track);          // add to thisToonOrgs
        toonOrgsCopy.splice(trackIdx, 1);  // remove from toonOrgsCopy
      } else {
        thisToonOrgs.push('');
      }
    });
    return thisToonOrgs;
  }

  _getGags() {
    // requires both params
    if (this.tracks===null || this.toonOrgs===null) return false;

    let thisGags = [];
    this.tracks.forEach((track, i) => {
      if (this.toonOrgs[i] === track) {
        thisGags.push(gagsContent["Organic"][track])
      } else {
        thisGags.push(gagsContent["Non-Organic"][track])
      }
    });

    return thisGags;
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

      // find minimum level gag (not Lure or Toon-Up, which have 0 damage)
      let tmp = comboGags.filter(function(gag) { return gag.track !== "Lure"; });
      let updateGag = tmp.hasNonZeroMin('level');
      let updateGagIndex = comboGags.findIndex(x => (x === updateGag));

      // lowest gag can go no higher ?
      if (updateGag.level === 7) return false;

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
    iterCount = 0;  // reset error check iteration counter

    let comboGagsCopy;   // Use copies to check...
    let thisTracksCopy;  // ...before mutating...
    let tempCombo;       // ...actual objects.

    let tmp;  // to check if combo is unchanged after for loop

    while (true) {
      tmp = {...combo};  // store initial state of combo before for loop

      for (let i=0; i < comboGags.length; i++) {

        comboGagsCopy = [...comboGags];
        tempCombo = {...combo};
        thisTracksCopy = [...this.tracks];

        let updateGag = comboGags[i];

        if (
          (updateGag.level > 0) &&            // ignore passes
          (updateGag.track !== 'Toon-Up') &&  // ignore Toon-Up
          (updateGag.track !== 'Lure')        // ignore Lure
        ) {
          
          // if gag can go no lower - make it a pass
          if (updateGag.level === 1) {
            comboGagsCopy[i] = new Gag();
            thisTracksCopy[i] = '';

          // else replace gag with next lowest
          } else {
            comboGagsCopy[i] = new Gag(
              this.tracks[i],
              updateGag.level-1,
              this.gags[i][updateGag.level-1].organic
            );
          }

          // update tempCombo and check
          tempCombo = new Combo(cog, comboGagsCopy, this.isLured);
          tempCombo.tryCombo();
          if (tempCombo.defeatsCog) { 
            combo = tempCombo; 
            comboGags = [...comboGagsCopy];
            this.tracks = [...thisTracksCopy];
          }
        }
      }

      // while loop break condition:
      // for loop has just checked all gags and made no changes to the combo
      if (JSON.stringify(tmp) === JSON.stringify(combo)) break;

      // Throw error after 21 iterations
      // (We know at least 1 gag must stay fixed, so there are a maximum of 21 iterations for the 3 other gags, 
      // and this can surely be more restrictive - but it should never be triggered anyway.)
      iterCount++;
      if (iterCount>21) {
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
//   ['None', 'None', 'None', 'None'],      // toon organic gags
//   false                                  // is Lured
// );
// console.log(`${testCombo.solution}`);



/**
 * Filter Class that presents user with relevant combos
 */
export class RecommendCombos {
  constructor(
    cog=null,
    isLured=false,
    numToons=0,
    toonOrgs=[],
    comboType='All',
    gagFilters=null
  ) {
    this.cog = cog;
    this.isLured = isLured;
    this.numToons = numToons;
    this.toonOrgs = [...toonOrgs];
    this.comboType = comboType;
    this.gagFilters = gagFilters;

    this.gagComboTracks = this._getGagComboTracks();
    this.recCombos = this._recCombos();
    this.errorMsg = this._checkForError();
  }

  _getGagComboTracks() {
    if (this.numToons === 0) return [];

    // Init
    let gagComboTracks = [];
    if (this.comboType === 'Basic') {
      gagComboTracks = gagComboTracks.concat(combos[String(this.numToons)]["basic"]);
    } else {
      if (!this.isLured) {
        gagComboTracks = gagComboTracks.concat(combos[String(this.numToons)]["notLured"]);
      }
      gagComboTracks = gagComboTracks.concat(combos[String(this.numToons)]["default"]);
    }
    
    return gagComboTracks;
  }

  _recCombos()  {
    let recSolns=[];
    let foundCombo;

    if (!this.cog || this.numToons===0) {
      // no combos exist
      return recSolns;
    }

    // find combos
    this.gagComboTracks.forEach(comboTracks => {
      foundCombo = new FindCombo(
        this.cog,
        comboTracks,
        this.toonOrgs,
        this.isLured
      );
      
      if (foundCombo.solution) {
        recSolns.push(foundCombo.solution); 
      } 
    });
    
    // filter solutions
    recSolns = this._filterByGags(recSolns);
    recSolns = this._filterSolns(recSolns);
 
    return recSolns;
  }

  _filterByGags(recSolns) {
    if (this.gagFilters) {
      let tracks = Object.keys(this.gagFilters);
      for (let i=0; i<tracks.length; i++) {
        let track = tracks[i];
        if (!this.gagFilters[track]) {
          recSolns = this._filterByGag(recSolns, track);
        }
      }
    }
    return recSolns;
  }

  _filterByGag(recSolns, track) {
    return recSolns.filter(function (combo) { 
      let counts = Object.keys(combo.counts);
      return !counts.includes(track);
    });
  }

  _filterSolns(recSolns) {
    // remove non-unique combos
    recSolns = recSolns.reduce(function (p, c) {
      // if the next object's 'counts' is not found in the output array
      // push the object into the output array
      if (!p.some(function (el) { return JSON.stringify(el.counts) === JSON.stringify(c.counts); })) p.push(c);
      return p;
    }, []);

    // remove combos with only drop left if cog is lured
    // (some lured cog drop combos remove the stun gag while optimizing)
    if (this.isLured) {
      recSolns = recSolns.filter(function (combo) { 
        return JSON.stringify(Object.keys(combo.counts)) !== JSON.stringify(['Drop']);
      });
    }

    // remove combos with lure and sound but no trap
    // (some lure trap sound combos remove trap while optimizing, making the lure useless)
    recSolns = recSolns.filter(function (combo) { 
      return (
        !(
          Object.keys(combo.counts).includes('Lure') && 
          Object.keys(combo.counts).includes('Sound') &&
          !Object.keys(combo.counts).includes('Trap')
        )
      ) 
    });

    // optional filter - recommend best combos
    if (this.comboType === 'Best') {

      // Remove Drop-Only Combos
      recSolns = recSolns.filter(function (combo) { 
        return JSON.stringify(Object.keys(combo.counts)) !== JSON.stringify(['Drop']);
      });

      // Sort Combos by Total Damage
      recSolns.sort((combo1, combo2) => (combo1.totalDamage > combo2.totalDamage) ? 1 : -1);

      // Reduce Number of Displayed Combos
      // combos with total damage below hp+threshold
      let tmp1 = recSolns.filter(function(combo) {
        return combo.totalDamage <= combo.cogHP + Math.ceil(Math.sqrt(combo.cogHP)); 
      });
      // if still more than 4 combos...
      if (tmp1.length > 4) {
        // ...get combos with total damage <= 4th best combo
        let combo4damage = tmp1[3].totalDamage;
        tmp1 = tmp1.filter(function(combo) {
          return combo.totalDamage <= combo4damage; 
        });
      }
      recSolns = tmp1;
    }

    // sort gags - put 'Pass' at the end.
    recSolns.forEach((combo) => {
      combo.gags.sort((gag1, gag2) => (gag2.name !== 'Pass') ? 1 : -1);
    });

    return recSolns;
  }

  _checkForError() {
    if (this.numToons === 0) {
      return 'You need at least 1 toon to defeat the cogs!';
    } else if (this.recCombos.length === 0) {
      if (this.comboType === 'Best') {
        return 'No recommended "best" combos! Try the "All" filter instead.';
      } else if (
        JSON.stringify(this.gagFilters) !== JSON.stringify({
          'Toon-Up': true,
          'Trap': true,
          'Lure': true,
          'Sound': true,
          'Throw': true,
          'Squirt': true,
          'Drop': true
        })
      ) {
        return 'You may need more gag tracks to defeat this cog!'
      } else {
        return 'You need more toons to defeat this cog!';
      }
    }
    return null;
  }
}