export const trackColors = {
  "Toon-Up": "#c55ae8",
  "Trap":    "#e8e65a",
  "Lure":    "#33bd35",
  "Sound":   "#5470ef",
  "Throw":   "#ed9f32",
  "Squirt":  "#f55bd6",
  "Drop":    "#32eaed"
};

export const gagsData = {
  "Toon-Up": [
    {
      "name": "Feather",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [8, 10],
        "organic": [10, 12]
      }
    },
    {
      "name": "Megaphone",
      "skill_points": 20,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [15, 18],
        "organic": [18, 22]
      }
    },
    {
      "name": "Lipstick",
      "skill_points": 200,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [25, 30],
        "organic": [30, 36]
      }
    },
    {
      "name": "Bamboo Cane",
      "skill_points": 800,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [40, 45],
        "organic": [48, 54]
      }
    },
    {
      "name": "Pixie Dust",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [50, 60],
        "organic": [60, 72]
      }
    },
    {
      "name": "Juggling Cubes",
      "skill_points": 6000,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": {
        "non-organic": [75, 105],
        "organic": [90, 126]
      }
    },
    {
      "name": "High Dive",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "heal": {
        "non-organic": [210, 210],
        "organic": [252, 252]
      }
    }
  ],
  "Trap": [
    {
      "name": "Banana Peel",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [10, 12],
        "organic": [11, 14]
      }
    },
    {
      "name": "Rake",
      "skill_points": 20,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [18, 20],
        "organic": [20, 22]
      }
    },
    {
      "name": "Marbles",
      "skill_points": 100,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [30, 35],
        "organic": [33, 39]
      }
    },
    {
      "name": "Quicksand",
      "skill_points": 800,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [45, 50],
        "organic": [50, 55]
      }
    },
    {
      "name": "Trapdoor",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [75, 85],
        "organic": [83, 94]
      }
    },
    {
      "name": "TNT",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [90, 180],
        "organic": [99, 198]
      }
    },
    {
      "name": "Railroad",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 1.0,
      "damage": {
        "non-organic": [200, 200],
        "organic": [220, 220]
      }
    }
  ],
  "Lure": [
    {
      "name": "$1 Bill",
      "skill_points": 0,
      "targets_multi": false,
      "stun": 2,
      "accuracy": {
        "non-organic": 0.6,
        "organic": 0.7
      }
    },
    {
      "name": "Small Magnet",
      "skill_points": 20,
      "targets_multi": true,
      "stun": 2,
      "accuracy": {
        "non-organic": 0.55,
        "organic": 0.65
      }
    },
    {
      "name": "$5 Bill",
      "skill_points": 100,
      "targets_multi": false,
      "stun": 3,
      "accuracy": {
        "non-organic": 0.7,
        "organic": 0.8
      }
    },
    {
      "name": "Big Magnet",
      "skill_points": 800,
      "targets_multi": true,
      "stun": 3,
      "accuracy": {
        "non-organic": 0.65,
        "organic": 0.75
      }
    },
    {
      "name": "$10 Bill",
      "skill_points": 2000,
      "targets_multi": false,
      "stun": 4,
      "accuracy": {
        "non-organic": 0.8,
        "organic": 0.9
      }
    },
    {
      "name": "Hypno Goggles",
      "skill_points": 6000,
      "targets_multi": true,
      "stun": 4,
      "accuracy": {
        "non-organic": 0.75,
        "organic": 0.85
      }
    },
    {
      "name": "Presentation",
      "skill_points": 10000,
      "targets_multi": true,
      "stun": 8,
      "accuracy": {
        "non-organic": 0.9,
        "organic": 0.95
      }
    }
  ],
  "Sound": [
    {
      "name": "Bike Horn",
      "skill_points": 0,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [3, 4],
        "organic": [4, 5]
      }
    },
    {
      "name": "Whistle",
      "skill_points": 20,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [5, 7],
        "organic": [6, 8]
      }
    },
    {
      "name": "Bugle",
      "skill_points": 200,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [9, 11],
        "organic": [10, 13]
      }
    },
    {
      "name": "Aoogah",
      "skill_points": 800,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [14, 16],
        "organic": [16, 18]
      }
    },
    {
      "name": "Elephant Trunk",
      "skill_points": 2000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [19, 21],
        "organic": [21, 24]
      }
    },
    {
      "name": "Foghorn",
      "skill_points": 6000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [25, 50],
        "organic": [28, 55]
      }
    },
    {
      "name": "Opera Singer",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [90, 90],
        "organic": [99, 99]
      }
    }
  ],
  "Throw": [
    {
      "name": "Cupcake",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [4, 6],
        "organic": [5, 7]
      }
    },
    {
      "name": "Fruit Pie Slice",
      "skill_points": 10,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [8, 10],
        "organic": [9, 11]
      }
    },
    {
      "name": "Cream Pie Slice",
      "skill_points": 50,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [14, 17],
        "organic": [16, 19]
      }
    },
    {
      "name": "Whole Fruit Pie",
      "skill_points": 400,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [24, 27],
        "organic": [27, 30]
      }
    },
    {
      "name": "Whole Cream Pie",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [36, 40],
        "organic": [40, 44]
      }
    },
    {
      "name": "Birthday Cake",
      "level": 6,
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [48, 100],
        "organic": [53, 110]
      }
    },
    {
      "name": "Wedding Cake",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.75,
      "damage": {
        "non-organic": [120, 120],
        "organic": [132, 132]
      }
    }
  ],
  "Squirt": [
    {
      "name": "Squirting Flower",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [3, 4],
        "organic": [4, 5]
      }
    },
    {
      "name": "Glass of Water",
      "skill_points": 10,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [6, 8],
        "organic": [7, 9]
      }
    },
    {
      "name": "Squirt Gun",
      "skill_points": 50,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [10, 12],
        "organic": [11, 14]
      }
    },
    {
      "name": "Seltzer Bottle",
      "skill_points": 400,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [18, 21],
        "organic": [20, 24]
      }
    },
    {
      "name": "Fire Hose",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [27, 30],
        "organic": [30, 33]
      }
    },
    {
      "name": "Storm Cloud",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [36, 80],
        "organic": [40, 88]
      }
    },
    {
      "name": "Geyser",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": {
        "non-organic": [105, 105],
        "organic": [116, 116]
      }
    }
  ],
  "Drop": [
    {
      "name": "Flower Pot",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [10, 10],
        "organic": [11, 11]
      }
    },
    {
      "name": "Sandbag",
      "skill_points": 20,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [18, 18],
        "organic": [20, 20]
      }
    },
    {
      "name": "Anvil",
      "skill_points": 100,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [30, 30],
        "organic": [33, 33]
      }
    },
    {
      "name": "Big Weight",
      "skill_points": 500,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [45, 45],
        "organic": [50, 50]
      }
    },
    {
      "name": "Safe",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [60, 70],
        "organic": [66, 77]
      }
    },
    {
      "name": "Grand Piano",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [85, 170],
        "organic": [94, 187]
      }
    },
    {
      "name": "Toontanic",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.5,
      "damage": {
        "non-organic": [180, 180],
        "organic": [198, 198]
      }
    }
  ]
};
