import FindCombo from "./find-combo.module";
import combos from '~/features/combos/combos.data.json';


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
    comboSort='None',
    gagFilters=null
  ) {
    this.cog = cog;
    this.isLured = isLured;
    this.numToons = numToons;
    this.toonOrgs = [...toonOrgs];
    this.comboType = comboType;
    this.comboSort = comboSort;
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
    
    // filter and sort solutions
    recSolns = this._filterSolns(recSolns);
    recSolns = this._sortSolns(recSolns);
    recSolns = this._sortSolnGags(recSolns);
 
    return recSolns;
  }

  _filterByGag(recSolns, track) {
    return recSolns.filter(function (combo) { 
      let counts = Object.keys(combo.counts);
      return !counts.includes(track);
    });
  }

  _filterSolns(recSolns) {

    // Custom Filters...

    // ...by Gag Tracks
    if (this.gagFilters) {
      let tracks = Object.keys(this.gagFilters);
      for (let i=0; i<tracks.length; i++) {
        let track = tracks[i];
        if (!this.gagFilters[track]) {
          recSolns = this._filterByGag(recSolns, track);
        }
      }
    }

    // ...Best Combos Only
    if (this.comboType === 'Best') {
      recSolns = recSolns.filter(function(combo) {
        return (
          // remove combos marked as bad
          combo.info.indicator !== 'bad'
          // remove combos with total damage below hp+threshold
          && combo.totalDamage <= combo.cog.hp + Math.ceil(Math.sqrt(combo.cog.hp) / 2)
          // remove combos with accuracy below 90%
          && combo.accuracy >= 90
        ); 
      });
    }


    // Normal Filters...
    
    // ...Remove Non-Unique Combos
    recSolns = recSolns.reduce(function (p, c) {
      // if the next object's 'counts' is not found in the output array
      // push the object into the output array
      if (!p.some(function (el) { return JSON.stringify(el.counts) === JSON.stringify(c.counts); })) p.push(c);
      return p;
    }, []);

    // ...Remove Drop-Only combos if Cog is Lured
    // (some lured cog drop combos remove the stun gag while optimizing)
    if (this.isLured) {
      recSolns = recSolns.filter(function (combo) { 
        return JSON.stringify(Object.keys(combo.counts)) !== JSON.stringify(['Drop']);
      });
    }

    return recSolns;
  }


  _sortSolns(recSolns) {

    // Custom Sort...

    // ...by Damage
    if (this.comboSort === 'Damage') {
      recSolns.sort(function(combo1, combo2) {
        if (combo1.totalDamage === combo2.totalDamage) return 0;
        return (combo1.totalDamage < combo2.totalDamage) ? -1 : 1
      });
    }

    // ...by Accuracy
    if (this.comboSort === 'Accuracy') {
      recSolns.sort(function(combo1, combo2) {
        if (combo1.accuracy === combo2.accuracy) return 0;
        return (combo1.accuracy < combo2.accuracy) ? 1 : -1
      });
    }

    // ...by Damage+Accuracy
    if (this.comboSort === 'Damage+Accuracy') {
      recSolns.sort(function(combo1, combo2) {
        // prefer higher accuracy for same damage combos 
        if (combo1.totalDamage === combo2.totalDamage) {
          if (combo1.accuracy === combo2.accuracy) return 0;
          return (combo1.accuracy > combo2.accuracy) ? -1 : 1;
        }
        // sort by damage
        return (combo1.totalDamage < combo2.totalDamage) ? -1 : 1
      });
    }

    // ...by Accuracy+Damage
    if (this.comboSort === 'Accuracy+Damage') {
      recSolns.sort(function(combo1, combo2) {
        // prefer lower damage for same accuracy combos 
        if (combo1.accuracy === combo2.accuracy) {
          if (combo1.totalDamage === combo2.totalDamage) return 0;
          return (combo1.totalDamage > combo2.totalDamage) ? 1 : -1;
        }
        // sort by accuracy
        return (combo1.accuracy < combo2.accuracy) ? 1 : -1
      });
    }

    return recSolns;
  }

  _sortSolnGags(recSolns) {
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
        return 'No recommended "best" combos! Try another filter instead.';
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
