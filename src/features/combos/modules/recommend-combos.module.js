import FindCombo from "./find-combo.module";
import combos from '../data/combos.data.json';


/**
 * Filter Class that presents user with relevant combos
 */
 export default class RecommendCombos {
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
      recSolns.sort(function(combo1, combo2) {
        // equal damage combos sort equally
        if (combo1.totalDamage === combo2.totalDamage) return 0;
        // else sort by lowest to highest total damage
        return (combo1.totalDamage > combo2.totalDamage) ? 1 : -1
      });

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


    // Sort Remaining Recommended Combos' Gags
    recSolns.forEach((combo) => {
      combo.gags.sort(function(a,b) {
        // Put 'Pass' at End
        if (a.name === 'Pass') return 1;
        if (b.name === 'Pass') return -1;
        // Otherwise Preserve Order
        return 0;
      });
    });
    

    return recSolns;
  }


  _checkForError() {
    if (this.numToons === 0) {
      return 'You need at least 1 toon to defeat the cogs! Use the \'Toons\' section to configure your toons.';
    } else if (!this.cog) {
      return 'There is no cog to defeat! Use the \'Cog\' section to choose a level.';
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
