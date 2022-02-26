class RedMonster {
	constructor(game, x, y, offscreen) {
		Object.assign(this, {game, x, y, offscreen})
		
		this.bullet = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_bullet.png");
		this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_up.png");
		this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_down.png");
		this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_left.png");
		this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_right.png");
		//temp fix
		this.rightDeathSprite = ASSET_MANAGER.getAsset("./sprites/enemies/red_monster/red_monster_right_death.png");
		
		this.facing = "down"; // can be left, right, up, down
		this.state = "idle"; // can be idle, run, attack, death
		
		this.hp = 125;
		this.moveSpeed = 75;
		
		this.bulletSpeed = 200;
		this.bulletRate = 1;
		this.bulletTimer = this.bulletRate;
		this.bulletSize = 30;
		
		this.animations = [];
		this.loadAnimations();
		this.updateBB();
		
		
		//info for pathfinding
		this.mapX = this.x + 101//this.midPointOffset.x;
		this.mapY = this.y + 63//this.midPointOffset.y;
		this.path;
	}
	
	loadAnimations() {
		this.animations["left idle"] = new Animator(this.leftSprite, 0.0, 0.0, 122.0, 179.0, 29, 0.05, 0.0, false, true);
		this.animations["left run"] = new Animator(this.leftSprite, 0.0, 179.0, 124.0, 140.5, 13, 0.03, 0.0, false, true);
		this.animations["left attack"] = new Animator(this.leftSprite, 0.0, 319.5, 146.0, 195.0, 25, 0.03, 0.0, false, true);
		this.animations["left death"] = new Animator(this.leftSprite, 0.0, 740.0, 152.5, 258.5, 20, 0.05, 2.5, false, false);
		this.animations["right idle"] = new Animator(this.rightSprite, 0.0, 0.0, 122.0, 179.0, 29, 0.05, 0.0, false, true);
		this.animations["right run"] = new Animator(this.rightSprite, 0.0, 179.0, 124.0, 140.5, 13, 0.03, 0.0, false, true);
		this.animations["right attack"] = new Animator(this.rightSprite, 0.0, 319.5, 146.0, 195.0, 25, 0.03, 0.0, false, true);
		this.animations["right death"] = new Animator(this.rightDeathSprite, 0.0, 0.0, 152.5, 258.5, 20, 0.05, 2.5, false, false);
		this.animations["up idle"] = new Animator(this.upSprite, 0.0, 0.0, 200.5, 187.0, 29, 0.05, 0.0, false, true);
		this.animations["up run"] = new Animator(this.upSprite, 0.0, 187.0, 200.5, 183.0, 13, 0.03, 0.0, false, true);
		this.animations["up attack"] = new Animator(this.upSprite, 0.0, 370.0, 224.5, 193.5, 25, 0.03, 0.0, false, true);
		this.animations["up death"] = new Animator(this.upSprite, 0.0, 737.5, 258.0, 250.0, 20, 0.05, 0.0, false, false);
		this.animations["down idle"] = new Animator(this.downSprite, 0.0, 0.0, 202.5, 181.0, 29, 0.05, 0.0, false, true);
		this.animations["down run"] = new Animator(this.downSprite, 0.0, 181.0, 201.0, 186.0, 13, 0.03, 0.0, false, true);
		this.animations["down attack"] = new Animator(this.downSprite, 0.0, 367.0, 210.0, 183.0, 25, 0.03, 14.0, false, true);
		this.animations["down death"] = new Animator(this.downSprite, 0.0, 737.5, 235.0, 255.5, 20, 0.05, 21.0, false, false);
	}
	
	updateBB() {
		this.lastBB = this.BB;
		if (this.state != "death") { //not done yet
			this.BB = new BoundingBox(this.x + 54, this.y + 17, 92, 90);
		}
		if (this.hp <= 0) {
			this.BB = null;
		}
	}
	
	singleBulletAtlk() {
		if (this.facing === "down") {
			this.game.addBullet(new Bullet(this.game, this.x + 86, this.y + 110, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "up") {
			this.game.addBullet(new Bullet(this.game, this.x + 86, this.y - 10, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "left") {
			this.game.addBullet(new Bullet(this.game, this.x + 22, this.y + 48, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "right") {
			this.game.addBullet(new Bullet(this.game, this.x + 146, this.y + 48, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		}
	}
	
	shotgunAttack() {
		if (this.facing === "down") {
			this.game.addBullet(new Bullet(this.game, this.x + 86, this.y + 110, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, {shotgun: true, amount: 2}, "enemy", this.bullet));
		} else if (this.facing === "up") {
			this.game.addBullet(new Bullet(this.game, this.x + 86, this.y - 10, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, {shotgun: true, amount: 2}, "enemy", this.bullet));
		} else if (this.facing === "left") {
			this.game.addBullet(new Bullet(this.game, this.x + 22, this.y + 48, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, {shotgun: true, amount: 2}, "enemy", this.bullet));
		} else if (this.facing === "right") {
			this.game.addBullet(new Bullet(this.game, this.x + 146, this.y + 48, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, {shotgun: true, amount: 2}, "enemy", this.bullet));
		}
	}
	
	//used when shooting
	//makes the monster the origin then offsets its real x and y to player
	//then compares x or y values then to the functions f(x) and f(-x)
	//should maybe use player offsets for mindpoint
	calculatedDirection() {
		let player = {x: this.game.player.x - this.x + 101 - 69, y : this.game.player.y - this.y + 63};
		let monster = {x: 0, y : 0};
		if ((player.x < monster.x) && (player.y < (-1) * player.x) && (player.y > player.x)) { //left
			this.facing = "left"
		} else if ((player.x > monster.x) && (player.y > (-1) * player.x) && (player.y < player.x)) {
			this.facing = "right";
		} else if ((player.y > monster.y) && (player.y > (-1) * player.x) && (player.y > player.x)) {
			this.facing = "down";
		} else if ((player.y < monster.y) && (player.y < (-1) * player.x) && (player.y < player.x)) {
			this.facing = "up";
		}
		
	}
	
	/**
	* randomly shoots three different bullet patterns. 
	*/
	shoot() {
		this.calculatedDirection();
		if (this.bulletTimer <= 0) {
			if (randomInt(2) % 2 === 0) {
				this.shotgunAttack();
			} else {
				this.singleBulletAtlk();
			}
			this.bulletTimer = this.bulletRate;
			this.state = "attack";
		}
	}
	
	/**
	* gets path to player in the form of an array of points
	*/
	move() {
		const TICK = this.game.clockTick;
		if (getDistance(this.mapX, this.mapY, this.path[0].x * 125 + 62, this.path[0].y * 125 + 62) > 5) {
			this.state = "run";
			switch (this.directionToGo) {
				case 'up':
					this.facing = "up";
	  				this.y -= this.moveSpeed * TICK;
		  			this.mapY -= this.moveSpeed * TICK;
			  		break;
				case 'down':
  					this.facing = "down";
	  				this.y += this.moveSpeed * TICK;
		  			this.mapY += this.moveSpeed * TICK;
			  		break;
				case 'left':
  					this.facing = "left";
	  				this.x -= this.moveSpeed * TICK;
		  			this.mapX -= this.moveSpeed * TICK;
			  		break;
				case 'right':
  					this.facing = "right";
	  				this.x += this.moveSpeed * TICK;
		  			this.mapX += this.moveSpeed * TICK;
			  		break;   
			}
		} else {
			this.getPath();
		}
	}
	
	/**
	* gets path to player in the form of an array of points
	*/
	getPath() {
		let myX = floor(this.mapX / 125);
		let myY = floor(this.mapY / 125);
		let pX = floor(this.game.player.mapX / 125);
		let pY = floor(this.game.player.mapY / 125);
		this.path = aStarPath(new Point(this.game, myX, myY, null), new Point(this.game, pX, pY, null), this.game.camera.level.map, this.game).reverse();
		if (this.path[0] && (typeof this.path[0] != 'undefined')) { 
			if (this.path[0].x > myX) {//right
				this.directionToGo = "right";
			} else if (this.path[0].x < myX) {//left
				this.directionToGo = "left"
			} else if (this.path[0].y > myY) {//down
				this.directionToGo = "down"
			} else if (this.path[0].y < myY) { //up
				this.directionToGo = "up"
			} else {
				this.directionToGo = "none"
			}
		}
	}
	
	update() {
		if (this.hp <= 0) {
			this.state = "death";
			if (this.animations[this.facing + " " + this.state].frame === 19) {
				this.removeFromWorld = true;
			}
		} else if (this.path && (typeof this.path[0] != 'undefined')) {
			if (this.path.length > 1) {
						this.move();
			} else {
				if (randomInt(7) % 2 === 0) {
					this.getPath();
				}
			}
			if (getDistance(this.x, this.y, this.game.player.x + 150, this.game.player.y + 150) < 800) {
				this.shoot();
			}
		} else {
			this.getPath();
		}
		//shooting cooldown counter
		if (this.bulletTimer <= this.bulletRate) {
			this.bulletTimer -= this.game.clockTick;
		}
		//side scrolling
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
		this.updateBB();

	}
  
	drawMinimap(ctx, mmX, mmY){
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
			// this.reveal = true;
			ctx.fillStyle = "Red";
			ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
		}
		else{
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		}
		// if (this.reveal)
		// ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
	  }
	
	  draw(ctx) {
		let xOffset = 0;
		let yOffset = 0;
		// offsets for x and y since images are different sizes
		if (this.state === "death") {
			if (this.facing === "up") {
				xOffset = -30
				yOffset = -78
			} else if (this.facing === "down") {
				xOffset = 0
				yOffset = -71
			} else if (this.facing === "left") {
				xOffset = 35
				yOffset = -92
			} else if (this.facing === "right") {
				xOffset = 15
				yOffset = -78
			}
		} else {
			if (this.facing === "left") {
				if (this.state === "idle") {
					xOffset = 47
					yOffset = 2
				} else if (this.state === "run") {
					xOffset = 40
					yOffset = -9
				} else if (this.state === "attack") {
					xOffset = 33
					yOffset = -65
				}
			} else if (this.facing === "right") {
				if (this.state === "idle") {
					xOffset = 31
					yOffset = 3
				} else if (this.state === "run") {
					xOffset = 35
					yOffset = -8
				} else if (this.state === "attack") {
					xOffset = 21
					yOffset = -68
				}
			} else if (this.facing === "up") {
				if (this.state === "idle" || this.state === "run") {
					xOffset = 0
					yOffset = -6
				} else if (this.state === "attack") {
					xOffset = -12
					yOffset = -15
				}
			} else if (this.facing === "down") {
				if (this.state === "idle" || this.state === "run" || this.state === "attack") {
					xOffset = 0
					yOffset = 0
				}
			}
		}	
		this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + xOffset, this.y + yOffset, 1);
		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
}