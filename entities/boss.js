class Boss {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.facing = "down";
	  this.state = "idle";

	  this.moveSpeed = 100;
	  
	  this.bulletSpeed = 300;
	  this.bulletSize = 30;
	  this.shotgun = {shotgun: true, amount: 1};

	  this.attackCheck = false;
	  this.attackCooldown = .75;
	  this.counter = 0;

	  this.animations = [];
	  this.loadAnimations();
	  this.updateBB();

	  this.hp = 1000;
	  this.distancedMoved = 0; //distanced moved to tile 0-125

	  //offset to get the middle of sprite and feet
	  this.offset = {x: 110, y : 110, feet: 170};
	  this.mapX = this.x + this.offset.x;
	  this.mapY = this.y + this.offset.feet;	  
    }

	loadAnimations () {
		this.bullet 			= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss bullet.png");

		this.leftIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left idle.png");
		this.leftRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left run.png");
		this.leftAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left attack.png");
		this.leftDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left death.png");

		this.rightIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right idle.png");
		this.rightRunSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right run.png");
		this.rightAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right attack.png");
		this.rightDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right death.png");

		this.upIdleSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up idle.png");
		this.upRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up run.png");
		this.upAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up attack.png");
		this.upDeathSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up death.png");

		this.downIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down idle.png");
		this.downRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down run.png");
		this.downAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down attack.png");
		this.downDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down death.png");

		this.animations["left idle"] 	= new Animator(this.leftIdleSprite, 0.0, 0.0, 120.9, 180.9, 36, 0.04, 0.0, false, true);
		this.animations["left run"] 	= new Animator(this.leftRunSprite, 0.0, 0.0, 121.5, 197.7, 20, 0.03, 0.0, false, true);
		this.animations["left attack"] 	= new Animator(this.leftAttackSprite, 0.0, 0.0, 197.1, 213.3, 25, 0.04, 0.0, false, true);
		this.animations["left death"] 	= new Animator(this.leftDeathSprite, 0.0, 0.0, 146.7, 277.5, 17, 0.05, 0.0, false, false);

		this.animations["right idle"] 	= new Animator(this.rightIdleSprite, 0.0, 0.0, 120.9, 180.9, 36, 0.04, 0.0, false, true);
		this.animations["right run"] 	= new Animator(this.rightRunSprite, 0.0, 0.0, 121.5, 197.7, 20, 0.03, 0.0, false, true);
		this.animations["right attack"] = new Animator(this.rightAttackSprite, 0.0, 0.0, 197.1, 213.3, 25, 0.04, 0.0, true, true);
		this.animations["right death"] 	= new Animator(this.rightDeathSprite, 0.0, 0.0, 146.7, 277.5, 17, 0.05, 0.0, true, false);

		this.animations["up idle"] 		= new Animator(this.upIdleSprite, 0.0, 0.0, 225.9, 192.0, 36, 0.04, 0.0, false, true);
		this.animations["up run"] 		= new Animator(this.upRunSprite, 0.0, 0.0, 254.1, 201.3, 20, 0.03, 0.0, false, true);
		this.animations["up attack"] 	= new Animator(this.upAttackSprite, 0.0, 0.0, 246.3, 223.8, 25, 0.04, 0.0, false, true);
		this.animations["up death"] 	= new Animator(this.upDeathSprite, 0.0, 0.0, 250.5, 294.0, 17, 0.05, 0.0, false, false);

		this.animations["down idle"] 	= new Animator(this.downIdleSprite, 0.0, 0.0, 226.2, 188.4, 36, 0.04, 0.0, false, true);
		this.animations["down run"] 	= new Animator(this.downRunSprite, 0.0, 0.0, 253.5, 197.1, 20, 0.03, 0.0, false, true);
		this.animations["down attack"] 	= new Animator(this.downAttackSprite, 0.0, 0.0, 268.2, 218.4, 25, 0.04, 0.0, false, true);
		this.animations["down death"] 	= new Animator(this.downDeathSprite, 0.0, 0.0, 261.9, 291.0, 17, 0.05, 0.0, false, false);
	}

	updateBB() {
		this.lastBB = this.BB;
		if (this.facing === "down") {
			this.BB = new BoundingBox(this.x + 55, this.y + 35, 115, 115);
		} else if (this.facing === "up") {
			this.BB = new BoundingBox(this.x + 55, this.y + 35, 115, 115);
		} else if (this.facing === "left") {
			this.BB = new BoundingBox(this.x + 60, this.y + 35, 100, 115);
		} else if (this.facing === "right") {
			this.BB = new BoundingBox(this.x + 60, this.y + 35, 100, 115);
		}
	}

	fourBulletAtk(radius) { 
		let xStart = this.x + 97;//offsets needed to get to center of sprite
		let yStart = this.y + 80;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), xStart + 2 * radius * cos(PI /2), yStart + 2 * radius * sin(PI /2), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down
		
	}
	
	eightBulletAtk(radius) {
		let xStart = this.x + 97;//offsets needed to get to center of sprite
		let yStart = this.y + 80;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), xStart + 2 * radius * cos(PI /2), yStart + 2 * radius * sin(PI /2), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down
		
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /4), yStart + radius * sin(PI /4), xStart + 2 * radius * cos(PI /4) , yStart + 2 * radius * sin(PI /4), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 4), yStart + radius * sin(3 * PI / 4), xStart + 2 * radius * cos(3 * PI / 4) , yStart + 2 * radius * sin(3 * PI / 4), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //down left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(5 * PI / 4), yStart + radius * sin(5 * PI / 4), xStart + 2 * radius * cos(5 * PI / 4) , yStart + 2 * radius * sin(5 * PI / 4), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //up left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(7 * PI / 4), yStart + radius * sin(7 * PI / 4), xStart + 2 * radius * cos(7 * PI / 4) , yStart + 2 * radius * sin(7 * PI / 4), this.bulletSize, this.bulletSpeed, 0, false, "enemy", this.bullet)); //up right
	}

	singleBulletAtlk() {
		if (this.facing === "down") {
		  this.game.addBullet(new Bullet(this.game, this.x + 95, this.y + 110, this.game.player.x + 25, this.game.player.y + 25, this.bulletSize, this.bulletSpeed, 0, this.shotgun, "enemy", this.bullet));
		} else if (this.facing === "up") {
		  this.game.addBullet(new Bullet(this.game, this.x + 100, this.y + 10, this.game.player.x + 25, this.game.player.y + 25, this.bulletSize, this.bulletSpeed, 0, this.shotgun, "enemy", this.bullet));
		} else if (this.facing === "left") {
		  this.game.addBullet(new Bullet(this.game, this.x + 30, this.y + 80, this.game.player.x + 25, this.game.player.y + 25, this.bulletSize, this.bulletSpeed, 0, this.shotgun, "enemy", this.bullet));
		} else if (this.facing === "right") {
		  this.game.addBullet(new Bullet(this.game, this.x + 160, this.y + 80, this.game.player.x + 25, this.game.player.y + 25, this.bulletSize, this.bulletSpeed, 0, this.shotgun, "enemy", this.bullet));
		}
	}

	calculatedDirection() {
		let player = {x: this.game.player.x - (this.x + this.offset.x), y : this.game.player.y - (this.y + this.offset.y)};
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

	shoot() {
		if (this.attackCheck) {
			let ran = randomInt(3)
			if (ran === 0) {
				this.singleBulletAtlk();
			} else if (ran === 1) {
				this.fourBulletAtk(80);
			} else {
				this.eightBulletAtk(80);
			}
		}
		this.attackCheck = false;
	}

	/**
	* gets path to player in the form of an array of points
	*/
	move() {		  
		const TICK = this.game.clockTick;
		if (this.path && (typeof this.path[0] != 'undefined')) {
			let distance = getDistance(this.mapX, this.mapY, this.path[0].x * 125 + 62, this.path[0].y * 125 + 62);
			if (this.distancedMoved >= 125) {
				this.getPath();
				this.distancedMoved = 0;
				return;
			} else if (distance > 0) {
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
					case 'none':
						return;	
				}
				this.distancedMoved += this.moveSpeed * TICK;
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
		this.path = aStarPath(new Point(this.game, myX, myY, null), new Point(this.game, pX, pY, null), this.game.camera.level.map, this.game, this).reverse();
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
		const TICK = this.game.clockTick
		//attack frame at 8
		
		if (this.hp <= 0) {
			this.state = "death";
			if (this.animations[this.facing + " " + this.state].frame === 16) {
				this.removeFromWorld = true;
			}
			ASSET_MANAGER.playAsset("./music/boss.wav");
		} else {
		 	if (this.path) { 
				if (this.state === "attack") {
					if (this.animations[this.facing + " attack"].frame === 10) {
						this.shoot();
					}
					if (!this.animations[this.facing + " attack"].flag) {
						this.state = "idle";
					}
				} else {
					if (this.path.length === 0) {
						this.state = "idle"
					} else if (this.path.length < 10 && this.counter <= 0 && this.distancedMoved === 0) {
						this.calculatedDirection();
						this.state = "attack";
						this.counter = this.attackCooldown;
						this.animations[this.facing + " attack"].flag = true;
						this.attackCheck = true;
					} else {
						this.move();
					}
				}
				if (this.distancedMoved === 0) {
					this.getPath()
				}
			} else {
				this.getPath();//should only be called once in beginning
			}
		}
		this.counter-=TICK;
		this.x += this.game.camera.x;
		this.y += this.game.camera.y; 
		this.updateBB();
	}

    draw(ctx) {
		if (this.hp < 1000) {
			ctx.fillStyle = "#ffdd00";
			ctx.strokeStyle = "#ffdd00";
			ctx.strokeRect(this.x + 65, this.y + 175, 100, 20);
			ctx.fillRect(this.x + 65, this.y + 175, (this.hp / 1000) * 100, 20); 
		}
		let xOffset, yOffset;
		if (this.state == "death") {
			if (this.facing == "up") xOffset = -15, yOffset = -100;
			else if (this.facing == "down") xOffset = -15, yOffset = -100;
			else if (this.facing == "left") xOffset = 35, yOffset = -90;
			else if (this.facing == "right") xOffset = 50, yOffset = -90;
		} else if (this.state != "death") {
			if (this.facing == "left") {
				if (this.state == "idle") xOffset = 50, yOffset = 0;
				else if (this.state == "run") xOffset = 50, yOffset = -10;
				else if (this.state == "attack") xOffset = -10, yOffset = -30;
			} else if (this.facing == "right") {
				if (this.state == "idle")  xOffset = 50, yOffset = 0 ;
				else if (this.state == "run") xOffset = 50, yOffset = -10;
				else if (this.state == "attack") xOffset = 40, yOffset = -30;
			} else if (this.facing == "up") {
				if (this.state == "idle") xOffset = 0, yOffset = 0;
				else if (this.state == "run") xOffset = -10, yOffset = -10;
				else if (this.state == "attack") xOffset = -10, yOffset = -30;
			} else if (this.facing == "down") {
				if (this.state == "idle") xOffset = 0, yOffset = 0;
				else if (this.state == "run") xOffset = -10, yOffset = -10;
				else if (this.state == "attack") xOffset = -20, yOffset = -30;
			}
		}

		this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x + xOffset, this.y + yOffset, 1);
		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
    }


	drawMinimap(ctx, mmX, mmY){
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
			// this.reveal = true;
		ctx.fillStyle = "Purple";
		ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);

		  }
		  else{
			  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		}
		// if (this.reveal)
		// ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
	
	  }
}
