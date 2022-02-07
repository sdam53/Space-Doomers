//make sure player is placed between .25 < player < .75 width and height
let levelOne = {
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
		{x: 8, y: 9, state: "unlocked", direction: "down"},
	],
	doortrap : [
		{x: 8, y: 0, direction: "down"},
		{x: 3, y: 13, direction: "right"},
	]
};

const levelTwo = {
	MAP: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
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
	PLAYER: [5,3],
	FLYINGMONSTER: [
		X = [12,2],
		Y = [5,5]
	],
	GREENMONSTER: [
		X = [12],
		Y = [5]
	],
	GEARS: [
		X = [5, 2, 16],
		Y = [6, 11, 2]
	],
	PORTAL: [
		X = [2],
		Y = [4]
	]
};

const LEVEL_THREE = {
	MAP: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
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
	PLAYER: [5,3],
	FLYINGMONSTER: [
		X = [12,2],
		Y = [5,5]
	],
	GREENMONSTER: [
		X = [12],
		Y = [5]
	],
	GEARS: [
		X = [5, 2, 16],
		Y = [6, 11, 2]
	],
	PORTAL: [
		X = [2],
		Y = [4]
	]
};