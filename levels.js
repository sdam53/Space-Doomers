//make sure player is placed between .25 < player < .75 width and height
let levelOne = {
	count: 1,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,1,1,0,0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,],
			[0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,],
			[0,0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,],
			[0,0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,],
			[0,0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,],
			[0,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,],
			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,],
			[0,0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,],
			[0,0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],
	player: {x: 6, y: 8},
	flying_monsters: [
		{x: 13, y: 7, offscreen: true},
		{x: 4, y: 9, offscreen: true},
		{x: 14, y: 15, offscreen: true},

	],
	red_monsters: [
		{x: 3, y: 2, offscreen: true},
	],
	green_monsters: [
		{x: 3, y: 17, offscreen: true},
	],
	blue_monsters: [
		{x: 5, y: 17, offscreen: true},
	],
	smols: [
		//{x: 13, y: 4},
		//{x: 13, y: 5}
	],
	boss: [
		{x: 12, y: 9}
	],
	gears: [
		{x: 6, y: 11},
		{x: 3, y: 16},
		//{x: 16, y: 7},
		{x: 8, y: 1},
	],
	portals: [
		{x: 3, y: 9},
		{x: 14, y: 17},
	],
	doors : [
		{x: 6, y: 4, state: "locked", direction: "left", requiredGears: 1},
		{x: 9, y: 14, state: "locked", direction: "down", requiredGears: 2},
		//{x: 10, y: 6, state: "locked", direction: "right", requiredGears: 1},
		{x: 16, y: 18, state: "locked", direction: "right", requiredGears: 3},
		{x: 15, y: 10, state: "locked", direction: "left", requiredGears: 3},
		{x: 2, y: 5, state: "locked", direction: "down", requiredGears: 2},
		{x: 6, y: 1, state: "locked", direction: "right", requiredGears: 1},

	],
	traps: [
		{x: 7, y: 11, type: "spike"},
		{x: 9, y: 11, type: "thorn"},
		{x: 8, y: 11, type: "thorn"},
	],
	walltraps : [
		{x: 9, y: 5, direction: "down", rate: 3},
		{x: 4, y: 18, direction: "right", rate: 4},
	],
  	powerup: [
		  {x: 1, y: 6, powerup: "healthpack"}
	],

	transitionItem : {x: 12, y: 7, level: 1},

	story: [ // title - level 1
		"After landing on an abandoned space station ",
		"   by mistake, Rob has to do everything   ",
		"   he can to make his way to the emergency",
		"   escape pod and save himself."
	],

	songPath: "./music/title.mp3"
};

let levelTwo = {
	count: 2,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,0,0,0,1,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,],
		  [0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,],
		  [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,],
		  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
/*18y*/	  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],

	player: {x: 4, y: 2},
    flying_monsters: [
		{x: 8, y: 30},
		{x: 12, y: 34},
		{x: 5, y: 8},
		{x: 12, y: 23},
		{x: 27, y: 18},
		{x: 20, y: 10},
		{x: 20, y: 18},
		{x: 29, y: 30},
		{x: 33, y: 34},
		{x: 25, y: 12},
		{x: 31, y: 14},
		{x: 19, y: 18},


    ],
	green_monsters: [
		{x: 4, y: 17},
		{x: 19, y: 4},
		{x: 24, y: 5},
		{x: 22, y: 19},
		{x: 22, y: 13},
		{x: 19, y: 34},
		{x: 23, y: 30},
		{x: 29, y: 14},

	],
	blue_monsters: [
		{x: 4, y: 19},
	],

	red_monsters: [
		{x: 32, y: 19, offscreen: true},

	],

	// smols: [
	// 	{x: 21, y: 5},
	// ],

	boss: [
		{x: 33, y: 34}
	],
	gears: [
		{x: 13, y: 6},
		{x: 2, y: 14},
		{x: 2, y: 12},
		{x: 15, y: 23},
	],
	portals: [
		{x: 31, y: 1},
		{x: 1, y: 19},
		{x: 34, y: 8},
		{x: 7, y: 11},
	],
	doors : [
		{x: 40, y: 6, state: "locked", direction: "down", requiredGears: 3},
		{x: 27, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 12, y: 11, state: "locked", direction: "right", requiredGears: 3},
		{x: 13, y: 23, state: "locked", direction: "right", requiredGears: 3},
		{x: 9, y: 24, state: "locked", direction: "right", requiredGears: 3},
		{x: 5, y: 26, state: "locked", direction: "left", requiredGears: 4},
		{x: 6, y: 28, state: "locked", direction: "down", requiredGears: 3},
		{x: 34, y: 7, state: "locked", direction: "down", requiredGears: 3},
		{x: 8, y: 11, state: "locked", direction: "left", requiredGears: 3},
		{x: 25, y: 18, state: "locked", direction: "left", requiredGears: 3},
		{x: 17, y: 5, state: "unlocked", direction: "right", requiredGears: 0},
		{x: 32, y: 7, state: "locked", direction: "down", requiredGears: 1},
		{x: 38, y: 35, state: "locked", direction: "right", requiredGears: 4, finalDoor: true}
	],
	traps: [
		{x: 5, 	y: 6, 	type: "spike"},
		{x: 6, 	y: 6, 	type: "spike"},
		{x: 17, y: 8, 	type: "thorn"},
		{x: 18, y: 8, 	type: "thorn"},
		{x: 19, y: 8, 	type: "thorn"},
		{x: 20, y: 8, 	type: "thorn"},
		{x: 32, y: 5, 	type: "thorn"},
		{x: 34, y: 5,	type: "thorn"},
		{x: 34, y: 4,	type: "spike"},
		{x: 32, y: 3, 	type: "spike"},
		{x: 31, y: 3, 	type: "spike"},
		{x: 31, y: 3, 	type: "spike"},
		{x: 20, y: 31, 	type: "thorn"},
		{x: 9, 	y: 33, 	type: "thorn"},
		{x: 16, y: 29, 	type: "thorn"},
		{x: 32, y: 30, 	type: "thorn"},
		{x: 8, 	y: 30, 	type: "thorn"},
		{x: 11, y: 31, 	type: "spike"},
		{x: 16, y: 33, 	type: "spike"},
		{x: 22, y: 34, 	type: "spike"},
		{x: 13, y: 29, 	type: "thorn"},
		{x: 26, y: 30, 	type: "spike"},
		{x: 27, y: 30, 	type: "spike"},
		{x: 32, y: 34, 	type: "thorn"},
		{x: 31, y: 34, 	type: "thorn"},
		{x: 30, y: 34, 	type: "thorn"},
		{x: 30, y: 33, 	type: "thorn"},
		{x: 35, y: 32, 	type: "spike"},
		{x: 2, 	y: 15, 	type: "thorn"},
		{x: 3, 	y: 15, 	type: "thorn"},
		{x: 2, 	y: 17, 	type: "spike"},
		{x: 1, 	y: 17, 	type: "spike"},
		{x: 1, 	y: 18, 	type: "spike"},
		{x: 4, 	y: 16, 	type: "spike"},
		{x: 21, 	y: 4, 	type: "spike"},
		{x: 21, 	y: 3, 	type: "spike"},
		{x: 21, 	y: 5, 	type: "spike"},

	],
  	powerup: [
		{x: 3, y: 26, powerup: "healthpack"},
	  	{x: 13, y: 11, powerup: "healthpack"},
		{x: 14, y: 25, powerup: "ricochet"},
		{x: 31, y: 8, powerup: "shotgun"}
	],
	walltraps : [
		{x: 39, y: 20, direction: "up", rate: 4},
		{x: 28, y: 5, direction: "right", rate:3.5},
		{x: 0, y: 17, direction: "right", rate:2},
		{x: 6, y: 19, direction: "left", rate:4},
		{x: 6, y: 15, direction: "left", rate:2},
	],

	transitionItem: {x: 39.5, y: 34.5, level: 2},

	story: [ //Level 1 - Level 2                    //
		"Falling through the mysterious hole led Rob ",
		"   into a lengthy fall through the unknown   ",
		"   spaceship. After picking himself back up, ",
		"   he hopes he will be more careful next time."
	],

	songPath: "./music/level 2 song.mp3"
};

let levelThree = {
	count: 3,
	map: 
		 
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,],
	[0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,],
	[0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
	[0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,],
	[0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,],
	[0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,],
	[0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,0,],
	[0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,],
	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,],
	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,],
	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,],
	[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
	[0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
	[0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
	[0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,],
	[0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,],
	[0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,],
	[0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,],
	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,0,],
	[0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,],
	[0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
	[0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,],
	[0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,],
	[0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
	[0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
	[0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,],
	[0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,],
	[0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
	[0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],


player: {x: 3, y: 1},
flying_monsters: [
	{x: 12, y: 4},
	{x: 15, y: 3},
	{x: 36, y: 5},
	{x: 36, y: 38},
	{x: 39, y: 39},
	{x: 7, y: 42},
	{x: 23, y: 39},
	{x: 21, y: 39},
	{x: 10, y: 38},
	{x: 10, y: 32},
	{x: 10, y: 25},
	{x: 10, y: 19},
	{x: 16, y: 25},
	{x: 16, y: 19},
	{x: 31, y: 21},
	{x: 36, y: 23},


],
green_monsters: [
	{x: 5, y: 6},
	{x: 26, y: 10},
	{x: 39, y: 42},
	{x: 9, y: 44},
	{x: 21, y: 42},
	{x: 23, y: 42},
	{x: 24, y: 24},
	{x: 30, y: 19},
	{x: 31, y: 24},




],

smols: [
	{x: 22, y: 23},
	{x: 26, y: 25},

],

red_monsters: [
	{x: 38, y: 7},
	{x: 31, y: 12},
	{x: 31, y: 38},
	{x: 23, y: 18},


],
boss: [
	{x: 37, y: 19},
	{x: 22, y: 12},
],
gears: [
	{x: 3, y: 20},
	{x: 34, y: 15},
	{x: 41, y: 25},
	{x: 11, y: 35},
	{x: 2, y: 28},

],
portals: [
	{x: 7, y: 15},
	{x: 47, y: 1},
	{x: 45, y: 10},
	{x: 47, y: 20},
	{x: 34, y: 33},
	{x: 2, y: 44},
],
	blue_monsters: [
		{x: 3, y: 17},
		{x: 4, y: 8},
		// {x: 32, y: 42},
		{x: 16, y: 42},

	],
	// boss: [{x: 11, y: 4}],
	doors : [
		{x: 3, y: 19, state: "unlocked", direction: "down"},
		{x: 9, y: 3, state: "unlocked", direction: "right"},
		{x: 13, y: 6, state: "unlocked", direction: "down"},
		{x: 8, y: 8, state: "unlocked", direction: "left"},
		{x: 4, y: 4, state: "locked", direction: "down", requiredGears: 1},
		{x: 2, y: 14, state: "unlocked", direction: "down"},
		{x: 6, y: 15, state: "locked", direction: "right", requiredGears: 1},
		{x: 5, y: 9, state: "unlocked", direction: "down"},
		{x: 45, y: 8, state: "locked", direction: "right", requiredGears:2},
		{x: 47, y: 6, state: "locked", direction: "down", requiredGears: 2},
		{x: 42, y: 5, state: "locked", direction: "left", requiredGears: 1},
		{x: 26, y: 3, state: "locked", direction: "down", requiredGears: 1},
		{x: 21, y: 5, state: "locked", direction: "left", requiredGears: 1},
		{x: 25, y: 8, state: "locked", direction: "down", requiredGears: 1},
		{x: 33, y: 15, state: "locked", direction: "right", requiredGears: 1},
		{x: 33, y: 10, state: "locked", direction: "right", requiredGears: 2},
		{x: 40, y: 28, state: "locked", direction: "right", requiredGears: 2},
		{x: 34, y: 32, state: "locked", direction: "down", requiredGears: 3},
		{x: 42, y: 41, state: "locked", direction: "right", requiredGears: 2},
		{x: 27, y: 36, state: "locked", direction: "down", requiredGears: 2},
		{x: 5, y: 35, state: "locked", direction: "left", requiredGears: 4},
		{x: 8, y: 34, state: "locked", direction: "down", requiredGears: 5},
		{x: 14, y: 32, state: "locked", direction: "right", requiredGears: 5},
		{x: 13, y: 28, state: "locked", direction: "down", requiredGears: 5},
		{x: 11, y: 36, state: "locked", direction: "down", requiredGears: 3},
		{x: 13, y: 37, state: "locked", direction: "left", requiredGears: 3},
		{x: 22, y: 37, state: "locked", direction: "down", requiredGears: 3},
		{x: 36, y: 3, state: "locked", direction: "down", requiredGears: 1},
		{x: 11, y: 41, state: "locked", direction: "right", requiredGears: 3},
		{x: 14, y: 43, state: "locked", direction: "down", requiredGears: 3},
		{x: 19, y: 44, state: "locked", direction: "right", requiredGears: 3},

	// 	{x: 8, y: 9, state: "locked", direction: "down", requiredGears: 1},
	// 	{x: 9, y: 1, state: "locked", direction: "right", requiredGears: 1},
	// 	{x: 15, y: 13, state: "locked", direction: "right", requiredGears: 2}
	],

	traps: [
		{x: 2, 	y: 16, 	type: "spike"},
		{x: 3, 	y: 16, 	type: "thorn"},
		{x: 1, 	y: 17, 	type: "thorn"},
		{x: 4, 	y: 15, 	type: "spike"},
		{x: 4, 	y: 17, 	type: "thorn"},
		{x: 28, y: 2, 	type: "thorn"},
		{x: 30, y: 2, 	type: "spike"},
		{x: 32, y: 2, 	type: "thorn"},
		{x: 34, y: 2, 	type: "thorn"},
		{x: 6, y: 8, 	type: "thorn"},
		{x: 6, y: 7, 	type: "thorn"},
		{x: 7, y: 7, 	type: "thorn"},
		{x: 33, y: 39, 	type: "thorn"},
		{x: 35, y: 39, 	type: "thorn"},
		{x: 35, y: 41, 	type: "thorn"},
		{x: 33, y: 41, 	type: "thorn"},
		{x: 14, y: 41, 	type: "spike"},
		{x: 15, y: 41, 	type: "spike"},
		{x: 16, y: 40, 	type: "spike"},
		{x: 11, y: 37, 	type: "spike"},
		{x: 12, y: 38, 	type: "spike"},
		{x: 9, y: 38, 	type: "spike"},
		{x: 4, y: 34, 	type: "spike"},
		{x: 4, y: 32, 	type: "spike"},
		{x: 4, y: 31, 	type: "thorn"},
	],
	walltraps : [
		{x: 0, y: 18, direction: "right", rate: 1},
		{x: 25, y: 1, direction: "right", rate: 2.5},
		{x: 28, y: 29, direction: "right", rate: 1},
		{x: 40, y: 31, direction: "left", rate: 2},
		{x: 34, y: 26, direction: "down", rate: 1},
		{x: 30, y: 26, direction: "down", rate: 1},
		{x: 32, y: 26, direction: "down", rate: 1},
		{x: 36, y: 26, direction: "down", rate: 1},
		{x: 38, y: 26, direction: "down", rate: 1},
		{x: 25, y: 40, direction: "right", rate: 1},
		{x: 34, y: 36, direction: "down", rate: 1},
		{x: 13, y: 39, direction: "left", rate: 3},
		{x: 3, y: 37, direction: "up", rate: 3},
	],
  	powerup: [{x: 3, y: 3, powerup: "shotgun"},
	  		  {x: 19, y: 4, powerup: "healthpack"},
			  {x: 34, y: 40, powerup: "healthpack"},
			  {x: 44, y: 41, powerup: "ricochet"},
			  {x: 15, y: 32, powerup: "healthpack"},
			  {x: 21, y: 35, powerup: "shotgun"},
			],

	transitionItem : {x: 40, y: 12, level: 3},

	story: [                                        
		"Rob quickly puts the jetpack on but is ",
		"   startled by a loud explosion. There   ",
		"   was no fuel left, and he finds himself",
		"   stuck again. Poor Rob, indeed."
	],

	songPath: "./music/level 3 song.mp3"
};

let finalStory = [
		"Rob got into the escape pod and finally",
		"	   made it back home. However, he is",
		"	   not excited about retirement and",
		"	   wants to see what other adventures",
		"	   he can find."
]

