import { gagsData } from 'features/gag';
import { Gag } from 'features/gag';
import { Combo } from 'features/combo';


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


export default class FindCombo {
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


  /*
    replace: 
    gag: {
      stat: {
        organic: org-val, 
        non-organic: non-org-val
      }
    }
     
    with:
    gag: {
      stat: org-val
    }

    or: 
    gag: {
      stat: non-org-val
    }
  */ 
  _mapGagStats(gag, organicText="non-organic") {
    let thisStat;
    let newGag = JSON.parse(JSON.stringify(gag));
    ["accuracy", "damage", "heal"].forEach((stat) => {
      if (
        (Object.keys(newGag).includes(stat)) &&
        (Object.keys(gag[stat]).includes(organicText))
      ) {
        thisStat = gag[stat][organicText];
        newGag[stat] = (Array.isArray(thisStat)) ? thisStat[1] : thisStat;  // use highest stat value (for now)
      }
    });
    newGag.organic = (organicText==="organic");
    return newGag;
  }

  
  _getGags() {
    // requires both params
    if (this.tracks===null || this.toonOrgs===null) return false;

    let thisGags = [];
    this.tracks.forEach((track, i) => {
      thisGags.push(gagsData[track].map((gag, j) => {
        gag.track = track;
        gag.level = j+1;
        let organicValue = (this.toonOrgs[i] === track) ? "organic" : "non-organic"; 
        return this._mapGagStats(gag, organicValue);
      }));
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
