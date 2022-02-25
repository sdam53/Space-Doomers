//make sure player is placed between .25 < player < .75 width and height
let levelOne = {
	count: 1,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,],
			[0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,0,],
			[0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,],
			[0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,],
			[0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],
	player: {x: 5, y: 3},
	flying_monsters: [
		{x: 12, y: 5, offscreen: true},
		{x: 2, y: 5, offscreen: true},
	],
	red_monsters: [
		{x: 2, y: 1, offscreen: true},
	],
	green_monsters: [
		{x: 2, y: 12, offscreen: true},
	],
	blue_monsters: [
		{x: 4, y: 12, offscreen: true},
	],
	smols: [
		//{x: 13, y: 4},
		//{x: 13, y: 5}
	],
	boss: [
		{x: 11, y: 4}
	],
	gears: [
		{x: 5, y: 6},
		{x: 2, y: 11},
		{x: 16, y: 2},
	],
	portals: [
		{x: 2, y: 4},
		{x: 13, y: 12},
	],
	doors : [
		{x: 5, y: 1, state: "unlocked", direction: "left"},
		{x: 8, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 9, y: 1, state: "locked", direction: "right", requiredGears: 1},
		{x: 15, y: 13, state: "locked", direction: "right", requiredGears: 2}
	],
	traps: [
		{x: 6, y: 6, type: "spike"},
		{x: 8, y: 6, type: "thorn"},
		{x: 7, y: 6, type: "thorn"},
	],
	walltraps : [
		{x: 8, y: 0, direction: "down", rate: 3},
		{x: 3, y: 13, direction: "right", rate: 4},
	],
  	powerup: [
		  {x: 2, y: 5, powerup: "healthpack"}
	],

	transitionItem : {x: 11, y: 2, level: 1},

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
		  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
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
		{x: 8, y: 30, offscreen: false},
		{x: 12, y: 34, offscreen: false},
		{x: 5, y: 8, offscreen: false},
		{x: 12, y: 23, offscreen: false},
		{x: 27, y: 18, offscreen: false},
		{x: 20, y: 10, offscreen: false},
		{x: 20, y: 18, offscreen: false},
		{x: 29, y: 30, offscreen: false},
		{x: 33, y: 34, offscreen: false},
    ],
	green_monsters: [
		{x: 4, y: 17, offscreen: false},
		{x: 19, y: 4, offscreen: false},
		{x: 24, y: 5, offscreen: false},
		{x: 22, y: 19, offscreen: false},
		{x: 22, y: 13, offscreen: false},
		{x: 19, y: 34, offscreen: false},
		{x: 23, y: 30, offscreen: false},
	],
	blue_monsters: [
		{x: 4, y: 19, offscreen: false},
	],
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
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,],
			[0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,0,],
			[0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,],
			[0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,],
			[0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],
	player: {x: 5, y: 3},
	flying_monsters: [
		X = [12,2],
		Y = [5,5],
		OFFSCREEN = [true,true]
	],
	green_monsters: [
		X = [2],
		Y = [12],
		OFFSCREEN = [true]
	], 
	blue_monsters: [
		X = [2],
		Y = [12],
		OFFSCREEN = [true]
	],
	boss: [{x: 11, y: 4}],
	gears: [
		X = [5, 2, 16],
		Y = [6, 11, 2]
	],
	portals: [
		X = [2, 13],
		Y = [4, 12]
	],
	doors : [
		{x: 5, y: 1, state: "unlocked", direction: "left"},
		{x: 8, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 9, y: 1, state: "locked", direction: "right", requiredGears: 1},
		{x: 15, y: 13, state: "locked", direction: "right", requiredGears: 2}
	],
	traps: [
		X = [6,8],
		Y = [6,6],
		T = ["spike","thorn"]
	],
	walltraps : [
		{x: 8, y: 0, direction: "down", rate: 3},
		{x: 3, y: 13, direction: "right", rate: 4},
	],
  	powerup: [{x: 2, y: 5, powerup: "ricochet"}],
	transitionItem : {x: 11, y: 2, level: 3},
	story: [                                        //
		"Rob quickly puts the jetpack on but is ",
		"   startled by a loud explosion. There   ",
		"   was no fuel left, and he finds himself",
		"   stuck again. Poor Rob, indeed."
	],
	songPath: "./music/level 3 song.mp3"
};

let finalStory = [
		"Rob got into the escape pod and finally",
		"	made it back home. However, he is",
		"	not excited about retirement and",
		"	wants to see what other",
		"	adventures he can find."
]

