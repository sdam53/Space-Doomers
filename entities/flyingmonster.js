class FlyingMonster {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y})
		
		this.bullet = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_bullet.png");
		this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_up.png");
		this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_down.png");
		this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_left.png");
		this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_right.png");
		//temp fix
		this.rightDeathSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_right_death.png");
		
		this.facing = "down"; // can be left, right, up, down
		this.state = "idle"; // can be idle, run, attack, death
		
		this.hp = 100;
		this.moveSpeed = 150;
		
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
		this.mapX = this.x + this.midPointOffset.x;
		this.mapY = this.y + this.midPointOffset.y;
		this.origLocation = new Point(this.game, floor(this.mapX / 125), floor(this.mapY / 125), null);
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
	
	fourBulletAtk(radius) { 
		let xStart = this.x + 45;//offsets needed to get to center of sprite
		let yStart = this.y + 20;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), xStart + 2 * radius * cos(PI /2) , yStart + 2 * radius * sin(PI /2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down
		
	}
	
	eightBulletAtk(radius) {
		let xStart = this.x + 45;//offsets needed to get to center of sprite
		let yStart = this.y + 20;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), xStart + 2 * radius * cos(PI /2) , yStart + 2 * radius * sin(PI /2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down
		
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /4), yStart + radius * sin(PI /4), xStart + 2 * radius * cos(PI /4) , yStart + 2 * radius * sin(PI /4), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 4), yStart + radius * sin(3 * PI / 4), xStart + 2 * radius * cos(3 * PI / 4) , yStart + 2 * radius * sin(3 * PI / 4), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(5 * PI / 4), yStart + radius * sin(5 * PI / 4), xStart + 2 * radius * cos(5 * PI / 4) , yStart + 2 * radius * sin(5 * PI / 4), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //up left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(7 * PI / 4), yStart + radius * sin(7 * PI / 4), xStart + 2 * radius * cos(7 * PI / 4) , yStart + 2 * radius * sin(7 * PI / 4), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //up right
	}
	
	singleBulletAtlk() {
		if (this.facing === "down") {
			this.game.addBullet(new Bullet(this.game, this.x + 35, this.y + 70, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet));
		} else if (this.facing === "up") {
			this.game.addBullet(new Bullet(this.game, this.x + 35, this.y - 43, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet));
		} else if (this.facing === "left") {
			this.game.addBullet(new Bullet(this.game, this.x - 20, this.y + 12, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet));
		} else if (this.facing === "right") {
			this.game.addBullet(new Bullet(this.game, this.x + 90, this.y + 12, this.game.player.x + 30, this.game.player.y + 40, this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet));
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
			this.animations[this.facing + " " + this.state].flag = true;
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
		this.path = findPath(new Point(this.game, myX, myY, null), new Point(this.game, pX, pY, null), this.game.camera.level.map, this.game);
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
		 } else {
		// 	if (getDistance(this.mapX, this.mapY, this.game.player.x + 150, this.game.player.y + 150) < 300) {
		// 		this.calculatedDirection();
		// 		if (this.bulletTimer <= 0) {
		// 			this.shoot();
		// 		}
		// 	} else {
		// 		if (this.path && (typeof this.path[0] != 'undefined')) {
		// 			this.move()
		// 		} else {
		// 			this.getPath();
		// 		}
		// 	}
		// 	if (this.bulletTimer <= 0) {
		// 		this.shoot();
				
		// 	}



			if (this.path && (typeof this.path[0] != 'undefined')) {
				if (this.path.length > 1) {
					this.move()
				} else {
					this.getPath();
				}
				if (getDistance(this.x, this.y, this.game.player.x + 150, this.game.player.y + 150) < 1000) {
					this.shoot();
				}
			} else {
				this.getPath();
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
      ctx.fillStyle = "Blue";
      ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
  }
	
	draw(ctx) {
		// offsets for x and y since images are different sizes
		if (this.state === "death") {
			if (this.facing === "up") {
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 18, this.y -50, .3);
			} else if (this.facing === "down") {
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x , this.y - 45, .3);
			} else if (this.facing === "left") {
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 20, this.y - 55, .3);
			} else if (this.facing === "right") {
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 15, this.y -55, .3);
			}
		} else {
			if (this.facing === "left") {
				if (this.state === "idle") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 28, this.y + 2, .3);
				} else if (this.state === "run") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 26, this.y - 3, .3);
				} else if (this.state === "attack") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x +20, this.y - 37, .3);
				}
			} else if (this.facing === "right") {
				if (this.state === "idle") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 19, this.y, .3);
				} else if (this.state === "run") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 20, this.y - 5, .3);
				} else if (this.state === "attack") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 12, this.y - 39, .3);
				}
			} else if (this.facing === "up") {
				if (this.state === "idle" || this.state === "run") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y - 3, .3);
				} else if (this.state === "attack") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 8, this.y - 8, .3);
				}
			} else if (this.facing === "down") {
				if (this.state === "idle" || this.state === "run" || this.state === "attack") {
					this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, .3);
				}
			}
		}
		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
		
	}
	
}

