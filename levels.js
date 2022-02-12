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
		X = [12,2],
		Y = [5,5]
	],
	green_monsters: [
		X = [2],
		Y = [12]
	],
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
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,0,0,0,1,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,],
		  [0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,],
		  [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,],
		  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
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
	    X = [5, 12, 14],
	    Y = [3, 23, 15]
    ],
	green_monsters: [
		X = [],
		Y = []
	],
	green_monsters: [
	X = [],
	Y = []
	],
	gears: [
	X = [13,2,2,15],
	Y = [6,14,12,23]
	],
	portals: [
		X = [31,1,34,7],
		Y = [1,19,8,11]
	],
	doors : [
		{x: 40, y: 6, state: "locked", direction: "down", requiredGears: 0},
		{x: 12, y: 11, state: "locked", direction: "right", requiredGears: 3},
		{x: 13, y: 23, state: "locked", direction: "right", requiredGears: 3},
		{x: 9, y: 24, state: "locked", direction: "right", requiredGears: 3},
		{x: 5, y: 26, state: "locked", direction: "left", requiredGears: 4},
		{x: 6, y: 28, state: "locked", direction: "down", requiredGears: 3},
		{x: 34, y: 7, state: "locked", direction: "down", requiredGears: 3},
		{x: 8, y: 11, state: "locked", direction: "left", requiredGears: 3},
	],
	traps: [
		X = [6],
		Y = [6],
		T = ["spike"]
	],
  	powerup: [{x: 3, y: 26, powerup: "healthpack"}],
	walltraps : [
		{x: 39, y: 20, direction: "up", rate: 5},
	],
	transitionItem: {x: 39.5, y: 34.5, level: 2},
	story: [ //Level 1 - Level 2                    //
		"Falling through the mysterious hole led Rob ",
		"   into a lengthy fall through the unknown   ",
		"   spaceship. After picking himself back up, ",
		"   he hopes he will be more careful next time."
	],
	powerup: {x: 3.5, y: 26.5, powerup: "healthpack"},
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
		Y = [5,5]
	],
	green_monsters: [
		X = [2],
		Y = [12]
	],
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

