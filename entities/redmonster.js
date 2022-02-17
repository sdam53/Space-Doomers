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
		
		this.bulletSpeed = 325;
		this.bulletRate = 1;
		this.bulletTimer = this.bulletRate;
		this.bulletSize = 30;
		
		this.animations = [];
		this.loadAnimations();
		this.updateBB();
		
		//offset to get the middle of sprite
		this.midPointOffset = {x: 60, y : 38};
		
		//info for pathfinding
		this.mapX = this.x + 62//this.midPointOffset.x;
		this.mapY = this.y + + 62//this.midPointOffset.y;
		this.path;
	}
	
	loadAnimations() {
		this.animations["left idle"] = new Animator(this.leftSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
		this.animations["left run"] = new Animator(this.leftSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
		this.animations["left attack"] = new Animator(this.leftSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
		this.animations["left death"] = new Animator(this.leftSprite, 0, 1480, 305, 517, 20, 0.05, 5, false, false);
		this.animations["right idle"] = new Animator(this.rightSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
		this.animations["right run"] = new Animator(this.rightSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
		this.animations["right attack"] = new Animator(this.rightSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
		
		this.animations["right death"] = new Animator(this.rightDeathSprite, 0, 0, 305, 517, 20, 0.05, 5, false, false);
		
		this.animations["up idle"] = new Animator(this.upSprite, 0, 0, 401, 374, 29, 0.05, 0, false, true);
		this.animations["up run"] = new Animator(this.upSprite, 0, 374, 401, 366, 13, 0.03, 0, false, true);
		this.animations["up attack"] = new Animator(this.upSprite, 0, 740, 449, 387, 25, 0.03, 0, false, true);
		this.animations["up death"] = new Animator(this.upSprite, 0, 1475, 516, 500, 20, 0.05, 0, false, false);
		this.animations["down idle"] = new Animator(this.downSprite, 0, 0, 405, 362, 29, 0.05, 0, false, true);
		this.animations["down run"] = new Animator(this.downSprite, 0, 362, 402, 372, 13, 0.03, 0, false, true);
		this.animations["down attack"] = new Animator(this.downSprite, 0, 734, 440, 366, 25, 0.03, 8, false, true);
		this.animations["down death"] = new Animator(this.downSprite, 0, 1475, 470, 511, 20, 0.05, 42, false, false);
	}
	
	updateBB() {
		this.lastBB = this.BB;
		if (this.state != "death") { //not done yet
			this.BB = new BoundingBox(this.x + 30, this.y + 8, 60, 60);
		}
		if (this.hp <= 0) {
			this.BB = null;
		}
	}
	
	singleBulletAtlk() {
		if (this.facing === "down") {
			this.game.addBullet(new Bullet(this.game, this.x + 35, this.y + 70, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "up") {
			this.game.addBullet(new Bullet(this.game, this.x + 35, this.y - 43, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "left") {
			this.game.addBullet(new Bullet(this.game, this.x - 20, this.y + 12, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		} else if (this.facing === "right") {
			this.game.addBullet(new Bullet(this.game, this.x + 90, this.y + 12, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet));
		}
	}
	
	shotgunAttack() {
		//  let slope =  (this.game.player.y - this.y) / (this.game.player.x - this.x);
		//console.log(this.game.player.y , this.game.player.x, this.x, this.y);
		//slope = slope * PI / 180;
		//  let slope = atan2(this.game.player.x - this.x, this.game.player.y - this.y)
		//this.game.addBullet(new Bullet(this.game, this.x + 200 + 150 * cos(angleRads), this.y + 125 - 150 * sin(angleRads), 5, this.x + 200 + 200 * cos(angleRads), this.y + 125 - 200 * sin(angleRads), 5, this.bullet)); //up left
		//  console.log(slope);
		
	}
	
	//used when shooting
	//makes the monster the origin then offsets its real x and y to player
	//then compares x or y values then to the functions f(x) and f(-x)
	//should maybe use player offsets for mindpoint
	calculatedDirection() {
		let player = {x: this.game.player.x - this.x + this.midPointOffset.x, y : this.game.player.y - this.y + this.midPointOffset.y};
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
			this.singleBulletAtlk();
			this.bulletTimer = this.bulletRate;
			this.state = "attack";
		}
	}
	
	/**
	* gets path to player in the form of an array of points
	*/
	move() {
		const TICK = this.game.clockTick;
		if (getDistance(this.mapX, this.mapY, this.path[0].x * 125 + 62, this.path[0].y * 125 + 62) > 25) {
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
			if (randomInt(7) % 2 === 0) {
				this.getPath();
			}
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
		if (this.game.pathfindingChoice === "bfs") {
			this.path = BFS(new Point(this.game, myX, myY, null), new Point(this.game, pX, pY, null), this.game.camera.level.map, this.game);
		} else {
			this.path = aStarPath(new Point(this.game, myX, myY, null), new Point(this.game, pX, pY, null), this.game.camera.level.map, this.game).reverse();
		}
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
		 } else if (!(this.x > this.game.ctx.canvas.width || this.x < 0 || this.y > this.game.ctx.canvas.height || this.y < 0) || this.offscreen) {
				if (this.path && (typeof this.path[0] != 'undefined')) {
					if (this.path.length > 1) {
						this.move();
					} else {
						if (randomInt(7) % 2 === 0) {
							this.getPath();
						}
					}
					if (getDistance(this.x, this.y, this.game.player.x + 150, this.game.player.y + 150) < 1000) {
						this.shoot();
					}
				} else {
					if (randomInt(7) % 2 === 0) {
						this.getPath();
					}
				}
		 }
		 
		 
		
		
		//shooting cooldown counter
		if (this.bulletTimer <= this.bulletRate) {
			this.bulletTimer -= this.game.clockTick;
		}
		
		this.updateBB();
		
		//side scrolling
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
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
				xOffset = -18
				yOffset = -50
			} else if (this.facing === "down") {
				xOffset = 0
				yOffset = -45
			} else if (this.facing === "left") {
				xOffset = 20
				yOffset = -55
			} else if (this.facing === "right") {
				xOffset = 15
				yOffset = -55
			}
		} else {
			if (this.facing === "left") {
				if (this.state === "idle") {
					xOffset = 28
					yOffset = 2
				} else if (this.state === "run") {
					xOffset = 26
					yOffset = -3
				} else if (this.state === "attack") {
					xOffset = 20
					yOffset = -37
				}
			} else if (this.facing === "right") {
				if (this.state === "idle") {
					xOffset = 19
					yOffset = 0
				} else if (this.state === "run") {
					xOffset = 20
					yOffset = -5
				} else if (this.state === "attack") {
					xOffset = 12
					yOffset = -39
				}
			} else if (this.facing === "up") {
				if (this.state === "idle" || this.state === "run") {
					xOffset = 0
					yOffset = -3
				} else if (this.state === "attack") {
					xOffset = -8
					yOffset = -8
				}
			} else if (this.facing === "down") {
				if (this.state === "idle" || this.state === "run" || this.state === "attack") {
					xOffset = 0
					yOffset = 0
				}
			}
				}
		//fog of war
		if (PARAMS.LANTERN) {
			let x = this.game.entities.player.mapX;
			let y = this.game.entities.player.mapY;
			if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + xOffset, this.y + yOffset, .5);
			}	
		} else {
			this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + xOffset, this.y + yOffset, .5);
		}
		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
		
	}
	
}

