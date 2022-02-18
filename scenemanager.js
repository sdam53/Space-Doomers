class SceneManager {
	constructor(game) {
		this.game = game;
		this.game.gameLevel = 1;
		this.game.camera = this;
		this.x = 0;
		this.y = 0;
		
		this.hp_bar = ASSET_MANAGER.getAsset("./sprites/player/hp_bar.png");
		this.gear = ASSET_MANAGER.getAsset("./sprites/tiles/gear.png");
		this.titleBackground = ASSET_MANAGER.getAsset("./images/title.png");
		this.logo = ASSET_MANAGER.getAsset("./images/logo.png");
		this.creditsBackground = ASSET_MANAGER.getAsset("./images/credits.jpg");

		this.title = true;
		this.transition = false;
		this.credits = false;
		this.gameOver = false;
		this.loadLevel(levelOne, this.title, false);
		this.death = new Animator(ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png"), 0, 0, 369, 454, 18, 0.05, 0, false, false);

		this.time = 0;
		this.menuCooldown = 0.5;

		this.gamepadSelect = 498;
		
	}
	
	loadLevel(level, title, transition) {
		this.game.clearEntities();
		
		this.gamepadSelect = 498;

		this.level = level;
		this.levelCount = level.levelCount;
		this.title = title;
		this.transition = transition;
		this.credits = false;

		//adding minimap
    	// this.minimap = new Minimap(this.game, 0, PARAMS.CANVAS_WIDTH - PARAMS.CANVAS_WIDTH/PARAMS.BITWIDTH, 500);
    	this.minimap = new Minimap(this.game, 0, PARAMS.CANVAS_WIDTH - 250, 250);
    	this.game.entities.minimap = this.minimap;
		this.fog = new FogOfWar(this.game);
		this.game.entities.fog = this.fog;

		// loading Ground, walls and traps
		let x = 0;
		let y = 0;
		if (!title && !this.gameOver) {
			for (let i = 0; i < level.map.length; i++) { //create level
				for (let j = 0; j < level.map[0].length; j++) {
					if (level.map[i][j] === 1) {
						this.game.addTile(new Ground(this.game, x, y, 125, 125, 1));
					} else if (level.map[i][j] === 0) {
						this.game.addTile(new Wall(this.game, x, y, 125, 125, 1));
					} else if (level.map[i][j] === 2) {
						this.game.addTile(new Trap(this.game, x, y, 125, 125, 1));
					}
					x += 125;
				}
				x = 0;
				y += 125;
			}
		}
		
		//adding player
		this.player = new Player(this.game, level.player.x * 125, level.player.y * 125);
		this.game.entities.player = this.player;
		
		//adding level entities
		if (!title && !transition && !this.gameOver) {
			if (level.flying_monsters) {
				for (let i = 0; i < level.flying_monsters[0].length; i ++) {
					this.game.addEnemy(new FlyingMonster(this.game, level.flying_monsters[0][i] * 125, level.flying_monsters[1][i] * 125, level.flying_monsters[2][i]));
				}
			} 
			if (level.red_monsters) {
				for (let i = 0; i < level.red_monsters[0].length; i ++) {
					this.game.addEnemy(new RedMonster(this.game, level.red_monsters[0][i] * 125, level.red_monsters[1][i] * 125, level.red_monsters[2][i]));
				}
			} 
			if (level.green_monsters) {
				for (let i = 0; i < level.green_monsters[0].length; i ++) {
					this.game.addEnemy(new GreenMonster(this.game, level.green_monsters[0][i] * 125, level.green_monsters[1][i] * 125, level.green_monsters[2][i]));
				}
			}
			if (level.blue_monsters) {
				for (let i = 0; i < level.blue_monsters[0].length; i ++) {
					this.game.addEnemy(new BlueMonster(this.game, level.blue_monsters[0][i] * 125, level.blue_monsters[1][i] * 125, level.blue_monsters[2][i]));
				}
			}
			if (level.blue_monsters) {
				for (let i = 0; i < level.blue_monsters[0].length; i ++) {
					this.game.addEnemy(new BlueMonster(this.game, level.blue_monsters[0][i] * 125, level.blue_monsters[1][i] * 125, level.blue_monsters[2][i]));
				}
			}
			if (level.smols) {
				for (let i = 0; i < level.smols.length; i++) {
					this.game.addEnemy(new Smol(this.game, level.smols[i].x * 125 - 55, level.smols[i].y * 125 - 85));
				}
			}
			if (level.gears) {
				for (let i = 0; i < level.gears[0].length; i ++) {
					this.game.addPowerUp(new Gear(this.game, level.gears[0][i] * 125, level.gears[1][i] * 125));
				}
			} 
			if (level.portals) {
				for (let i = 0; i < level.portals[0].length; i+=2) {
					this.game.addPortal(new Portal(this.game, level.portals[0][i] * 125, level.portals[1][i] * 125, level.portals[0][i + 1] * 125, level.portals[1][i + 1] * 125, null));
				}
			}
			if (level.doors) {
				for (let i = 0; i < level.doors.length; i++) {
					this.game.addPortal(new Door(this.game, level.doors[i].x * 125, level.doors[i].y * 125, 
												level.doors[i].state, level.doors[i].direction, level.doors[i].requiredGears, level.doors[i].finalDoor));
				}
			}
			if (level.walltraps) {
				for (let i = 0; i < level.walltraps.length; i++) {
					this.game.addTrap(new WallTrap(this.game, level.walltraps[i].x * 125, level.walltraps[i].y * 125, level.walltraps[i].direction, level.walltraps[i].rate));
				}
			}
			if (level.traps) {
				for (let i = 0; i < level.traps[0].length; i++) {
					this.game.addTrap(new Trap(this.game, level.traps[0][i] * 125, level.traps[1][i] * 125, level.traps[2][i]));
				}
			}
			if (level.powerup) {
				for (let i = 0; i < level.powerup.length; i++) {
					this.game.addPowerUp(new Powerup(this.game, level.powerup[i].x * 125, level.powerup[i].y * 125, level.powerup[i].powerup));
				}
			}
			if (level.boss) {
				for (let i = 0; i < level.boss.length; i++) {
					this.game.addEnemy(new Boss(this.game, level.boss[i].x * 125 - 55, level.boss[i].y * 125 - 85));
				}
			}
			this.game.addPortal(new TransitionItem(this.game, level.transitionItem.x * 125, level.transitionItem.y * 125, level.transitionItem.level));
		}
		
		// Background music
		if (!this.title && this.transition) {
			ASSET_MANAGER.pauseBackgroundMusic();
			ASSET_MANAGER.playAsset(level.songPath);
		}
	}
	
	timerOk() {
		if (this.time > this.menuCooldown) {
			this.time = 0;
			return true;
		} 
		return false;
	}

	gamepadButton() {
		return this.game.gamepad && (this.game.gamepad.buttons[0].pressed || this.game.gamepad.buttons[7].pressed);
	}
	
	update() {
		this.time += this.game.clockTick;

		if (this.game.keys["a"]  && this.timerOk()) {
			this.gamepadSelect--;
		} else if (this.game.keys["d"] && this.timerOk()) {
			this.gamepadSelect++;
		}

		if (this.game.keys["Escape"]) {
			this.loadLevel(levelOne, true, false);
		};

		// (Debug) easy level select
		if (this.game.keys["8"]) {
			this.loadLevel(levelOne, false, false);
			this.game.gameLevel = 1;
		} else if (this.game.keys["9"]) {
			this.loadLevel(levelTwo, false, false);
			this.game.gameLevel = 2;
		} else if (this.game.keys["0"]) {
			this.loadLevel(levelThree, false, false);
			this.game.gameLevel = 3;
		} 
		
		let midpoint = PARAMS.CANVAS_WIDTH/2
		this.x = this.player.x - midpoint;
		if (this.game.player.hp <= 0 && this.game.player.animations["death"].frame === 17) this.gameOver = true;
		this.updateAudio();
		
		// this.game.lclick = true;
		// if (this.title && this.game.lclick && this.game.mouse.x > 800 && this.game.mouse.x < 1020 && this.game.mouse.y > 170 && this.game.mouse.y < 210)
				
		// If title screen
		if (this.title && this.game.lclick && !this.levelSelect) {
			// Title Screen -> Start Game (with transition)
			if (!this.credits 
				&& ((this.game.mouse.x > 300 && this.game.mouse.x < 590 && this.game.mouse.y > 760 && this.game.mouse.y < 810) 
					|| (this.game.gamepad && this.gamepadSelect % 3 == 0 && this.gamepadButton())) 
				&& this.timerOk()) {
					
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.title = false;
				this.player = new Player(this.game, 100, 100);
				this.loadLevel(levelOne, false, true);
			}
			// Title -> Level Select
			if (!this.credits 
				&& ((this.game.mouse.x > 850 && this.game.mouse.x < 1100 && this.game.mouse.y > 800 && this.game.mouse.y < 840) 
					|| (this.gamepadSelect % 3 == 1 && this.gamepadButton())) 
				&& this.timerOk()) {
				this.time = this.game.clockTick;
				this.levelSelect = true;
				ASSET_MANAGER.playAsset("./music/click sound.wav");
			}
			// Title Screen -> Credits
			if (!this.credits 
				&& ((this.game.mouse.x > 1400 && this.game.mouse.x < 1595 && this.game.mouse.y > 760 && this.game.mouse.y < 810) 
				    || (this.gamepadSelect % 3 == 2 && this.gamepadButton()))
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.loadLevel(levelOne, true, false);
				this.credits = true;
			}

			// Credits -> Title Screen
			if (this.credits 
				&& ((this.game.mouse.x > 780 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90) 
				|| this.gamepadButton()) 
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.credits = false;
				this.loadLevel(levelOne, true, false);
			}
		}

		if (this.levelSelect && this.game.lclick) {
			if (((this.game.mouse.x > 100 && this.game.mouse.x < 560 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
			 		|| (this.game.gamepad && this.gamepadSelect % 3 == 0 && this.gamepadButton())) 
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.levelSelect = false;
				this.loadLevel(levelOne, false, true);
				this.game.gameLevel = 1;
			}
			else if (((this.game.mouse.x > 740 && this.game.mouse.x < 1180 && this.game.mouse.y > 800 && this.game.mouse.y < 840)
						|| (this.gamepadSelect % 3 == 1 && this.gamepadButton())) 
					&& this.timerOk()) {
					ASSET_MANAGER.playAsset("./music/click sound.wav");
					this.levelSelect = false;
					this.loadLevel(levelTwo, false, true);
					this.game.gameLevel = 2;
			}
			else if (((this.game.mouse.x > 1310 && this.game.mouse.x < 1795 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
						|| (this.gamepadSelect % 3 == 2 && this.gamepadButton()))
					&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.levelSelect = false;
				this.loadLevel(levelThree, false, true);
				this.game.gameLevel = 3;
			}
		}
		
		if (this.transition && this.game.lclick) {
			if (((this.game.mouse.x > 1400 && this.game.mouse.x < 1640 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
					|| this.gamepadButton())
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.transition = false;
				this.title = false;
				this.player = new Player(this.game, 100, 100);
				this.loadLevel(this.level, false, false);
			}
		}

		if (this.gameOver && this.game.lclick) {
			if (((this.game.mouse.x > 830 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90)
					|| this.gamepadButton())
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				this.gameOver = false;
				this.player = new Player(this.game, 100, 100);
				this.loadLevel(levelOne, true, false);
			}
		}

		//side scrollling
		let x1 = PARAMS.CANVAS_WIDTH * 1/4
		let x2 = PARAMS.CANVAS_WIDTH * 3/4
		let y1 = PARAMS.CANVAS_HEIGHT * 1/4
		let y2 = PARAMS.CANVAS_HEIGHT * 3/4
		if (this.player.x <= x1) {
			this.x = x1 - this.player.x;
		} else if (this.player.x >= x2) {
			this.x = x2- this.player.x;
		} else {
			this.x = 0;
		}
		if (this.player.y <= y1) {
			this.y = y1 - this.player.y;
		} else if (this.player.y >= y2) {
			this.y = y2 - this.player.y;
		} else {
			this.y = 0;
		}
	};
	
	updateAudio() {
		var mute = document.getElementById("mute").checked;
		var volume = document.getElementById("volume").value;
		
		ASSET_MANAGER.muteAudio(mute);
		ASSET_MANAGER.adjustVolume(volume);
		
	};

	draw(ctx) {
		
		ctx.fillStyle = "White"
		ctx.fillRect(50,80,200,20);
		ctx.drawImage(this.hp_bar, 3, 3, 1, 2, 50, 80, this.player.hp*2, 20);
		
		ctx.fillStyle = "#39FF14";
		ctx.fillText("HP", 50, 50);
		ctx.fillText("gears", 300, 50);
		ctx.drawImage(this.gear, 1, 1, 83, 88, 300, 70, 31, 30);
		ctx.fillText("x " + this.player.gears, 350, 100);
		ctx.font = '40px "NASA"';
		ctx.fillStyle = "Red";
		ctx.strokeStyle = "Red";
		
		// Title Screen
		if (this.title && !this.credits && !this.transition && !this.levelSelect) {
			
			ctx.drawImage(this.titleBackground, 0, 0);
			ctx.drawImage(this.logo, 690, 160);
			ctx.fillStyle = "#4a8437";

			ctx.fillRect(300, 760, 290, 50); // left 90 up 50
			if ((this.game.mouse && this.game.mouse.x > 300 && this.game.mouse.x < 590 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
				|| (this.game.gamepad && this.gamepadSelect % 3 == 0)) {
				ctx.fillStyle = "#e6e4df";
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("START GAME", 310, 800);

			ctx.font = '30px "NASA"';
			ctx.fillStyle = "#fa3b26";
			ctx.fillRect(850, 800, 250, 40); 
			if ((this.game.mouse && this.game.mouse.x > 850 && this.game.mouse.x < 1100 && this.game.mouse.y > 800 && this.game.mouse.y < 840) 
				|| (this.gamepadSelect % 3 == 1)) {
				ctx.fillStyle = "white";
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("LEVEL SELECT", 860, 830);

			ctx.font = '40px "NASA"';
			ctx.fillStyle = "#ba6cc3";
			ctx.fillRect(1400, 760, 195, 50);
			if ((this.game.mouse && this.game.mouse.x > 1400 && this.game.mouse.x < 1595 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
			 	|| (this.gamepadSelect % 3 == 2)) {
				ctx.fillStyle = "#e6e4df"; 
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("CREDITS", 1410, 800);

		} else if (this.levelSelect) {
			// Level select
			ctx.drawImage(this.titleBackground, 0, 0);
			ctx.drawImage(this.logo, 690, 160);
			ctx.fillStyle = "#4a8437";

			ctx.fillRect(100, 760, 460, 50); // left 90 up 50
			if ((this.game.mouse && this.game.mouse.x > 100 && this.game.mouse.x < 560 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
			 	|| (this.game.gamepad && this.gamepadSelect % 3 == 0)) {
				ctx.fillStyle = "#e6e4df"; 
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("LEVEL 1: ROB IS FINE", 110, 800);

			ctx.font = '30px "NASA"';
			ctx.fillStyle = "#fa3b26";
			ctx.fillRect(740, 800, 440, 40); 
			if ((this.game.mouse && this.game.mouse.x > 740 && this.game.mouse.x < 1180 && this.game.mouse.y > 800 && this.game.mouse.y < 840)
			 	|| (this.gamepadSelect % 3 == 1)) {
				ctx.fillStyle = "White"; 
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("LEVEL 2: TOO. MUCH. RUN.", 750, 830);

			ctx.font = '40px "NASA"';
			ctx.fillStyle = "#ba6cc3";
			ctx.fillRect(1310, 760, 485, 50);
			if ((this.game.mouse && this.game.mouse.x > 1310 && this.game.mouse.x < 1795 && this.game.mouse.y > 760 && this.game.mouse.y < 810)
			 	|| (this.gamepadSelect % 3 == 2)) {
				ctx.fillStyle = "#e6e4df"; 
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText("LEVEL 3: GET THE BAG", 1320, 800);
		}	// Credits Screen
			else if (this.title && this.credits && !this.transition && !this.levelSelect) {
			ctx.drawImage(this.creditsBackground, 0, 0);
			ctx.fillStyle = "#4191b1";
			ctx.fillRect(780, 40, 295, 50);
			ctx.fillStyle = this.game.mouse && this.game.mouse.x > 780 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90 ? "#e6e4df" : "Black";
			ctx.fillText("MAIN MENU", 790, 80);
			ctx.fillStyle = "#4191b1";
			ctx.font = '30px "NASA"';
			ctx.fillRect(700, 200, 450, 200);
			ctx.fillStyle = "Black";
			ctx.fillText("• Code Base: Chris Marriott", 710, 240);
			ctx.fillText("• Main Sprites: Moon Tribe", 710, 280);
			ctx.fillText("• Developers: Alex, Raz", 710, 320);
			ctx.fillText("  Sasha, Shilnara", 710, 360);
		}
		
		if (this.transition && !this.title && !this.credits) {
			ctx.drawImage(this.titleBackground, 0, 0);
			ctx.fillStyle = "#e6e4df";
			ctx.font = '30px "Nasa"';
			for (let i = 0; i < this.level.story.length; i++) {
				ctx.fillText(this.level.story[i], 600, 250 + i * 40);
			}
			ctx.fillStyle = "#4a8437";
			ctx.fillRect(1400, 760, 240, 50);
			ctx.fillStyle = this.game.mouse && this.game.mouse.x > 1400 && this.game.mouse.x < 1640 && this.game.mouse.y > 760 && this.game.mouse.y < 810 ? "#e6e4df" : "Black";
			ctx.font = '40px "NASA"';
			ctx.fillText("CONTINUE", 1410, 800);
		}
		
		if (this.gameOver) {
			ctx.drawImage(this.creditsBackground, 0, 0);
			ctx.fillStyle = "#4191b1";
			ctx.fillRect(830, 40, 245, 50);
			ctx.fillStyle = this.game.mouse && this.game.mouse.x > 830 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90 ? "#e6e4df" : "Black";
			ctx.fillText("TRY AGAIN", 840, 80);
			ctx.drawImage(ASSET_MANAGER.getAsset("./images/over.png"),200, 200);
			this.death.drawFrame(this.game.clockTick, ctx, 750, 400, 1);
			if (this.death.frame > 16) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png"), 6273, 0, 369, 454, 750, 400, 369, 454);
			} 
		}

	};
}
