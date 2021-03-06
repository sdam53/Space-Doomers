class Player {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y});
		this.game.player = this;

		this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/player/player_up_idle.png");
		this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/player/player_up_run.png");
		this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/player/player_down_idle.png");
		this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/player/player_down_run.png");
		this.spritesheet5 = ASSET_MANAGER.getAsset("./sprites/player/player_left_idle.png");
		this.spritesheet6 = ASSET_MANAGER.getAsset("./sprites/player/player_left_run.png");
		this.spritesheet7 = ASSET_MANAGER.getAsset("./sprites/player/player_right_idle.png");
		this.spritesheet8 = ASSET_MANAGER.getAsset("./sprites/player/player_right_run.png");
		this.spritesheet9 = ASSET_MANAGER.getAsset("./sprites/player/player_bullet.png");
		this.spritesheet10 = ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png");
		
		this.facing = "right"; // can be left, right, up, down
		this.state = "idle"; // can be idle, run, attack, death
		
		this.maxhp = 100;
		this.hp = 100;
		this.gears = 0;
		
		this.velocity = {x: 0, y : 0};
		
		this.bulletSpeed = 400;
		this.bulletRate = .5;
		this.bulletTimer = 0;
		this.bulletSize = 30;
		this.bulletRicochet = 0
		this.moveMultiplyer = 1;
		this.shotgun = {shotgun: false, amount: 0};//ammount means how many pairs, ie 1 will give 3 bullets, 2 will give 5...
		
		this.animations = [];
		this.loadAnimations();

		// shield specifics
		this.shieldSprite = ASSET_MANAGER.getAsset("./sprites/player/active shield.png");
		this.shieldTime = 30;
		this.activeShield = false;
		this.time = 0;
		this.buttonCooldown = 0.5;
		
		this.updateBB();
		
		//pixels in respect to map
		//used for pathfinding
		this.mapX = this.feetBB.x + 25;
		this.mapY = this.feetBB.y + 10;

		//current location of player on the minimap
		this.mMapX = this.mapX;
		this.mMapY = this.mapY;

	}
	timerOk() {
		if (this.time > this.buttonCooldown) {
			this.time = 0;
			return true;
		} 
		return false;
	}
	
	loadAnimations() {
		this.animations["left idle"] = new Animator(this.spritesheet5, 0.0, 0.0, 81.3, 101.7, 25, 0.05, 0.0, false, true);
		this.animations["left run"] = new Animator(this.spritesheet6, 0.0, 0.0, 84.0, 103.8, 16, 0.03, 0.0, false, true);
		this.animations["right idle"] = new Animator(this.spritesheet7, 0.0, 0.0, 81.3, 101.7, 25, 0.05, 0.0, false, true);
		this.animations["right run"] = new Animator(this.spritesheet8, 0.0, 0.0, 84.0, 103.8, 16, 0.03, 0.0, false, true);
		this.animations["up idle"] = new Animator(this.spritesheet1, 0.0, 0.0, 87.9, 101.4, 25, 0.05, 0.0, false, true);
		this.animations["up run"] = new Animator(this.spritesheet2, 0.0, 0.0, 89.7, 102.6, 16, 0.03, 0.0, false, true);
		this.animations["down idle"] = new Animator(this.spritesheet3, 0.0, 0.0, 84.0, 101.7, 25, 0.05, 0.0, false, true);
		this.animations["down run"] = new Animator(this.spritesheet4, 0.0, 0.0, 89.7, 102.9, 16, 0.03, 0.0, false, true);
		this.animations["death"] = new Animator(this.spritesheet10, 0.0, 0.0, 110.7, 136.2, 18, 0.05, 0.0, false, false);
	}
	
	updateBB() {
		this.lastBB = this.BB;
		/* if (this.facing === "right") {
			// this.BB = new BoundingBox(this.x + 2, this.y + 1, 72, 92);
			this.BB = new BoundingBox(this.x, this.y, 72, 92);
		} else if (this.facing === "left") {
			// this.BB = new BoundingBox(this.x + 5, this.y + 1, 72, 92);
			this.BB = new BoundingBox(this.x, this.y, 72, 92);
		} else {
			// this.BB = new BoundingBox(this.x + 7, this.y + 1, 72, 90);
		} */
		
		this.BB = new BoundingBox(this.x, this.y, 86, 93);
		this.feetBB = new BoundingBox(this.x + 20, this.y + 73, 50, 20);
	}
	
	update() {		
		const TICK = this.game.clockTick;
		this.time += TICK;
		const RUN = 350;

		if (this.activeShield) this.shieldTime -= TICK; 
		if (this.activeShield && this.shieldTime <= 0) this.activeShield = false; // Deactivate shield after its used
		if (this.game.keys["f"] && !this.activeShield && this.shieldTime > 0 && this.timerOk()) this.activeShield = true; // Activate shield on f
		if (this.game.keys["f"] && this.activeShield && this.timerOk()) this.activeShield = false; // deactivate shield on f
	
		// Movement and User Input
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.state = "idle";
		if ((this.game.keys["w"] || this.game.keys["ArrowUp"]) && (!this.game.keys["s"] && !this.game.keys["ArrowDown"])) {
			this.velocity.y = -RUN;
			this.state = "run";
		}
		if ((this.game.keys["s"] || this.game.keys["ArrowDown"]) && (!this.game.keys["w"] && !this.game.keys["ArrowUp"])) {
			this.velocity.y = RUN;
			this.state = "run";
		}
		if ((this.game.keys["d"] || this.game.keys["ArrowRight"]) && (!this.game.keys["a"] && !this.game.keys["ArrowLeft"])) { // go right: press d and not a
			this.velocity.x = RUN;
			this.state = "run";
		}
		if ((this.game.keys["a"] || this.game.keys["ArrowLeft"]) && (!this.game.keys["d"] && !this.game.keys["ArrowRight"])) { // go left
			this.velocity.x = -RUN;
			this.state = "run";
		}
    	if (this.hp <= 0) {
			this.state = "death";
			return;
		} else if (this.hp <= 10) {
			ASSET_MANAGER.playAsset("./music/player death sound 200.mp3");
		}
		//shooting
		if ((this.game.lclick) && !this.game.camera.title && !this.game.camera.transition) {
			if (this.bulletTimer <= 0) {
				this.state = "idle";
				ASSET_MANAGER.playAsset("./music/player shot sound 200.wav");
				if (this.facing === "left") {
					this.game.addBullet(new Bullet(this.game, this.x - 25, this.y + 55, this.game.mouse.x - (this.bulletSize / 2), this.game.mouse.y - (this.bulletSize / 2), this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else if (this.facing === "right") {
					this.game.addBullet(new Bullet(this.game, this.x + 75, this.y + 55, this.game.mouse.x - (this.bulletSize / 2), this.game.mouse.y - (this.bulletSize / 2), this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else if (this.facing === "up") {
					this.game.addBullet(new Bullet(this.game, this.x + 24, this.y, this.game.mouse.x - (this.bulletSize / 2), this.game.mouse.y - (this.bulletSize / 2), this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else {
					this.game.addBullet(new Bullet(this.game, this.x + 24, this.y + 87, this.game.mouse.x - (this.bulletSize / 2), this.game.mouse.y - (this.bulletSize / 2), this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				}
				this.bulletTimer = this.bulletRate;
			}
		}
		//shooting cooldown counter
		if (this.bulletTimer >= 0) {
			this.bulletTimer-=TICK;
		}

		// update direction
		this.calculateDirection();
		// check if on slow trap
		this.checkSlowTrap();

		// update position. side scrolling
		this.x += (this.velocity.x * TICK) * this.moveMultiplyer + this.game.camera.x;
		this.y += (this.velocity.y * TICK) * this.moveMultiplyer + this.game.camera.y;
		
		this.mapX += this.velocity.x * TICK * this.moveMultiplyer;
		this.mapY += this.velocity.y * TICK * this.moveMultiplyer;	
		
		//wall collision
		var that = this;
		if (!PARAMS.GODMODE) {
			this.game.entities.tiles.forEach(function (entity) {
				if (entity.BB && that.feetBB.collide(entity.BB)) {
					if (entity instanceof Wall) {
						if (entity.leftBB && that.feetBB.collide(entity.leftBB)) // collides with left side of wall
						{
							that.x = that.x - RUN * TICK;
							that.mapX -= RUN * TICK;
						}
						if (entity.rightBB && that.feetBB.collide(entity.rightBB)) // collides with right side of wall
						{
							that.x = that.x + RUN * TICK;
							that.mapX += RUN * TICK;
						}
						if (entity.topBB && that.feetBB.collide(entity.topBB)) // collides with top side of wall
						{
							that.y = that.y - RUN * TICK;
							that.mapY -= RUN * TICK;
						}
						if (entity.bottomBB && that.feetBB.collide(entity.bottomBB)) // collides with bottom side of wall
						{
							that.y = that.y + RUN * TICK;
							that.mapY += RUN * TICK;
						}
					}
				}
			});
		}
		//collision with doors
		this.game.entities.portals.forEach(function (entity) {
			if (entity.BB && that.feetBB.collide(entity.BB)) {
				if (entity instanceof Door) {
					if (entity.leftBB && that.feetBB.collide(entity.leftBB)) // collides with left side of wall
					{
						that.x = that.x - RUN * TICK;
						that.mapX -= RUN * TICK;
					}
					if (entity.rightBB && that.feetBB.collide(entity.rightBB)) // collides with right side of wall
					{
						entity.removeFromWorld = true;

						that.x = that.x + RUN * TICK;
						that.mapX += RUN * TICK;
					}
					if (entity.topBB && that.feetBB.collide(entity.topBB)) // collides with top side of wall
					{
						entity.removeFromWorld = true;

						that.y = that.y - RUN * TICK;
						that.mapY -= RUN * TICK;
					}
					if (entity.bottomBB && that.feetBB.collide(entity.bottomBB)) // collides with bottom side of wall
					{
						entity.removeFromWorld = true;

						that.y = that.y + RUN * TICK;
						that.mapY += RUN * TICK;
					}
				}
			}
		});
		this.updateBB();
	}
  
	draw(ctx) {
		if (this.hp <= 0) {
			this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
		} else {
			this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
			if (this.activeShield) ctx.drawImage(this.shieldSprite, this.x - 20, this.y - 15, 120, 120);
		}
		
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
			ctx.strokeStyle = "Blue";
			ctx.strokeRect(this.feetBB.x, this.feetBB.y, this.feetBB.width, this.feetBB.height)
		}
	}

	/**
	 * draws player onto minimap
	 * @param {} ctx 
	 * @param {*} mmX 
	 * @param {*} mmY 
	 */
	drawMinimap(ctx, mmX, mmY){
		ctx.fillStyle = "Green";
		this.mMapX = mmX + this.mapX / PARAMS.BITWIDTH;
		this.mMapY = mmY + this.mapY / PARAMS.BITWIDTH;
		ctx.fillRect(this.mMapX, this.mMapY, 93/PARAMS.BITWIDTH , 86/PARAMS.BITWIDTH);
	}

	/**
	 * changed player direction based on mouse
	 */
	calculateDirection() {
		let mouse = {x: this.game.mouse.x - this.x - 42.5, y : this.game.mouse.y - this.y - 50}; //42.5 and 50 are offsets to get to middle of sprite
		let player = {x: 0, y : 0};
		if ((mouse.x < player.x) && (mouse.y < (-1) * mouse.x) && (mouse.y > mouse.x)) { //left
			this.facing = "left"
		} else if ((mouse.x > player.x) && (mouse.y > (-1) * mouse.x) && (mouse.y < mouse.x)) {
			this.facing = "right";
		} else if ((mouse.y > player.y) && (mouse.y > (-1) * mouse.x) && (mouse.y > mouse.x)) {
			this.facing = "down";
		} else if ((mouse.y < player.y) && (mouse.y < (-1) * mouse.x) && (mouse.y < mouse.x)) {
			this.facing = "up";
		}
	}

	/**
	 * checks whether player is currently on a slow trap and changes the speed multiplier
	 */
    checkSlowTrap() {
		let traps = this.game.entities.traps;
		for (let i = 0; i < traps.length; i++) {
			if (traps[i].trap_type === "thorn" && this.feetBB.collide(traps[i].BB)){
				this.moveMultiplyer = 0.2;
				return;
        	}	
		}
	    this.moveMultiplyer = 1;
    }

	/**
	 * calculates damage to player and applies it
	 * enemie/bullets will call this
	 * @param {*} damage base damage value
	 */
	calculateDamage(damage) {
		if (this.activeShield) {
			damage /= 2;
		}
		this.hp -= damage;
	}
}