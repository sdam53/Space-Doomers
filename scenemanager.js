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

		this.cursor = ASSET_MANAGER.getAsset("./images/cursor.png");

		this.title = true;
		this.transition = false;
		this.credits = false;
		this.gameOver = false;
		this.loadLevel(levelOne, this.title, false);
		this.death = new Animator(ASSET_MANAGER.getAsset("./sprites/player/player_game_over.png"), 0, 0, 369, 454, 18, 0.05, 0, false, false);

		this.time = 0;
		this.menuCooldown = 0.5;

		this.gamepadSelect = 498;
		
	}
	
	loadLevel(level, title, transition) {
		this.game.clearEntities();
		
		this.gamepadSelect = 498;

		this.level = level;
		this.levelCount = level.count;
		this.title = title;
		this.transition = transition;
		this.credits = false;
		this.totalGears = level.gears.length;

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
				for (let i = 0; i < level.flying_monsters.length; i ++) {
					this.game.addEnemy(new FlyingMonster(this.game, level.flying_monsters[i].x * 125, level.flying_monsters[i].y * 125, level.flying_monsters[i].offscreen));
				}
			} 
			if (level.red_monsters) {
				for (let i = 0; i < level.red_monsters.length; i ++) {
					this.game.addEnemy(new RedMonster(this.game, level.red_monsters[i].x * 125 - 39, level.red_monsters[i].y * 125 - 1, level.red_monsters[i].offscreen));
				}
			} 
			if (level.green_monsters) {
				for (let i = 0; i < level.green_monsters.length; i ++) {
					this.game.addEnemy(new GreenMonster(this.game, level.green_monsters[i].x * 125, level.green_monsters[i].y * 125, level.green_monsters[i].offscreen));
				}
			}
			if (level.blue_monsters) {
				for (let i = 0; i < level.blue_monsters.length; i ++) {
					this.game.addEnemy(new BlueMonster(this.game, level.blue_monsters[i].x * 125 + 2, level.blue_monsters[i].y * 125 + 5, level.blue_monsters[i].offscreen));
				}
			}
			if (level.smols) {
				for (let i = 0; i < level.smols.length; i++) {
					this.game.addEnemy(new Smol(this.game, level.smols[i].x * 125 + 22, level.smols[i].y * 125 + 30));
				}
			}
			if (level.gears) {
				for (let i = 0; i < level.gears.length; i ++) {
					this.game.addPowerUp(new Gear(this.game, level.gears[i].x * 125, level.gears[i].y * 125));
				}
			} 
			if (level.portals) {
				for (let i = 0; i < level.portals.length; i+=2) {
					this.game.addPortal(new Portal(this.game, level.portals[i].x * 125, level.portals[i].y * 125, level.portals[i + 1].x * 125, level.portals[i + 1].y * 125, null));
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
				for (let i = 0; i < level.traps.length; i++) {
					this.game.addTrap(new Trap(this.game, level.traps[i].x * 125, level.traps[i].y * 125, level.traps[i].type));
				}
			}
			if (level.powerup) {
				for (let i = 0; i < level.powerup.length; i++) {
					this.game.addPowerUp(new Powerup(this.game, level.powerup[i].x * 125, level.powerup[i].y * 125, level.powerup[i].powerup));
				}
			}
			if (level.boss) {
				for (let i = 0; i < level.boss.length; i++) {
					this.game.addBoss(new Boss(this.game, level.boss[i].x * 125 - 55, level.boss[i].y * 125 - 85));
				}
			}
			this.game.addPortal(new TransitionItem(this.game, level.transitionItem.x * 125, level.transitionItem.y * 125, level.transitionItem.level));
		}

		if (this.levelCount == 1) this.requiredKills = this.game.entities.enemies.length;
		else this.requiredKills = this.game.entities.bosses.length; // level.boss.length;
		
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

		if (this.game.keys["l"] && this.timerOk()) {
			PARAMS.LANTERN = !PARAMS.LANTERN;
		}

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
			if (((this.game.mouse.x > 525 && this.game.mouse.x < 735 && this.game.mouse.y > 770 && this.game.mouse.y < 820)
					|| this.gamepadButton())
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				PARAMS.LANTERN = false;
				this.transition = false;
				this.title = false;
				this.player = new Player(this.game, 100, 100);
				this.loadLevel(this.level, false, false);
			} 
			if (((this.game.mouse.x > 1200 && this.game.mouse.x < 1340 && this.game.mouse.y > 770 && this.game.mouse.y < 820)
					|| this.gamepadButton())
				&& this.timerOk()) {
				ASSET_MANAGER.playAsset("./music/click sound.wav");
				PARAMS.LANTERN = true;
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
		ctx.font = '20px "NASA"';
		ctx.lineWidth = 3;
		ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/overlay/health overlay.png"), 30, 30, 50, 50);
		ctx.fillStyle = "Red";
		ctx.strokeStyle = "Red";
		ctx.strokeRect(90, 45, 200, 20);
		ctx.fillRect(90, 45, (this.player.hp / 100) * 200, 20); 
		ctx.fillStyle = "Black";
		if (this.player.hp <= 30) ctx.fillStyle = "Red";
		ctx.fillText(this.player.hp + "/100", 150, 62);

		ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/overlay/armor overlay.png"), 30, 90, 50, 50);
		ctx.fillStyle = "Black";
		ctx.fillText("F", 50, 120);
		ctx.fillStyle = "#73f9e3";
		ctx.strokeStyle = "#73f9e3";
		ctx.strokeRect(90, 105, 200, 20);
		ctx.fillRect(90, 105, (this.player.shieldTime / 30) * 200, 20); 
		ctx.fillStyle = "Black";
		if (this.player.shieldTime <= 12) ctx.fillStyle = "#73f9e3";
		let timeLeft;
		if (parseInt(this.player.shieldTime) >= 0) timeLeft = parseInt(this.player.shieldTime);
		else timeLeft = 0;
		ctx.fillText(timeLeft + "s", 165, 122);

		ctx.font = '40px "NASA"';

		ctx.drawImage(this.gear, 30, 150, 50, 50);
		ctx.fillStyle = "#ffdd00";
		ctx.fillText(this.player.gears + "/" + this.totalGears, 90, 185);

		ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/overlay/required kills.png"), 30, 215, 50, 50);
		ctx.fillStyle = "#ffdd00";
		if (this.levelCount == 1) {
			let enemiesKilled = this.requiredKills - this.game.entities.enemies.length;
			ctx.fillText(enemiesKilled + "/" + this.requiredKills, 90, 255);
		}
		else {
			let bossesKilled = this.requiredKills - this.game.entities.bosses.length;
			ctx.fillText(bossesKilled + "/" + this.requiredKills, 90, 255);
		}
		
		ctx.font = '40px "NASA"';
		ctx.fillStyle = "Red";
		ctx.strokeStyle = "Red";
		
		if (this.endgame) {
			ctx.drawImage(this.titleBackground, 0, 0);
			ctx.drawImage(this.logo, 690, 30);
		
			ctx.fillStyle = "#e6e4df";
			ctx.font = '30px "Nasa"';
			for (let i = 0; i < finalStory.length; i++) {
				ctx.fillText(finalStory[i], 600, 260 + i * 40);
			}
		}

		// Title Screen
		else if (this.title && !this.credits && !this.transition && !this.levelSelect) {
			
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
		// transition
		if (this.transition && !this.title && !this.credits) {
			ctx.drawImage(this.titleBackground, 0, 0);
			ctx.fillStyle = "#e6e4df";
			ctx.font = '30px "Nasa"';
			for (let i = 0; i < this.level.story.length; i++) {
				ctx.fillText(this.level.story[i], 600, 250 + i * 40);
			}
			ctx.fillStyle = "#4a8437";
			ctx.fillRect(525, 770, 210, 50);
			ctx.fillStyle = this.game.mouse && this.game.mouse.x > 525 && this.game.mouse.x < 735 && this.game.mouse.y > 770 && this.game.mouse.y < 820 ? "#e6e4df" : "Black";
			ctx.font = '40px "NASA"';
			ctx.fillText("NORMAL", 530, 810);

			ctx.fillStyle = "#4a8437";
			ctx.fillRect(1200, 770, 140, 50);
			ctx.fillStyle = this.game.mouse && this.game.mouse.x > 1200 && this.game.mouse.x < 1340 && this.game.mouse.y > 770 && this.game.mouse.y < 820 ? "#e6e4df" : "Black";
			ctx.font = '40px "NASA"';
			ctx.fillText("HARD", 1210, 810);
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
				ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/player/player_game_over.png"), 6273, 0, 369, 454, 750, 400, 369, 454);
			} 
		}
		//draws aiming cursor
		ctx.drawImage(this.cursor, this.game.mouse.x - 62.5, this.game.mouse.y - 62.5);

	};
}
