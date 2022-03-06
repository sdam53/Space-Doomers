class Smol {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.facing = "down";
	  this.state = "idle";

	  this.hp = 40;

	  this.moveSpeed = getRandomInteger(175, 350);

	  this.animations = [];
	  this.loadAnimations();
	  this.updateBB();

	  //offset to get the middle of sprite and feet
	  this.midPointOffset = {x: 40, y : 32, feet: 47};
	  this.mapX = this.x + this.midPointOffset.x;
	  this.mapY = this.y + this.midPointOffset.feet;
	  this.path;
	  this.target = {x: null, y: null};

	  this.aggro = false;
	  
    }

	loadAnimations () {
		this.bullet 			= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol bullet.png");

		this.leftIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol left/smol left idle.png");
		this.leftRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol left/smol left run.png");
		this.leftAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol left/smol left attack.png");
		this.leftDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol left/smol left death.png");

		this.rightIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol right/smol right idle.png");
		this.rightRunSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol right/smol right run.png");
		this.rightAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol right/smol right attack.png");
		this.rightDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol right/smol right death.png");

		this.upIdleSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol up/smol up idle.png");
		this.upRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol up/smol up run.png");
		this.upAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol up/smol up attack.png");
		this.upDeathSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol up/smol up death.png");

		this.downIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol down/smol down idle.png");
		this.downRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol down/smol down run.png");
		this.downAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol down/smol down attack.png");
		this.downDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/smol/smol down/smol down death.png");

		this.animations["left idle"] 	= new Animator(this.leftIdleSprite, 0.0, 0.0, 40.3, 60.3, 36, 0.04, 0.0, false, true);
		this.animations["left run"] 	= new Animator(this.leftRunSprite, 0.0, 0.0, 40.5, 65.9, 20, 0.03, 0.0, false, true);
		this.animations["left attack"] 	= new Animator(this.leftAttackSprite, 0.0, 0.0, 65.7, 71.1, 25, 0.04, 0.0, false, true);

		this.animations["left death"] 	= new Animator(this.leftDeathSprite, 0.0, 0.0, 48.9, 92.5, 17, 0.05, 0.0, false, false);/////////

		this.animations["right idle"] 	= new Animator(this.rightIdleSprite, 0.0, 0.0, 40.3, 60.3, 36, 0.04, 0.0, false, true);
		this.animations["right run"] 	= new Animator(this.rightRunSprite, 0.0, 0.0, 40.5, 65.9, 20, 0.03, 0.0, false, true);
		this.animations["right attack"] = new Animator(this.rightAttackSprite, 0.0, 0.0, 65.7, 71.1, 25, 0.04, 0.0, true, true);

		this.animations["right death"] 	= new Animator(this.rightDeathSprite, 0.0, 0.0, 48.9, 92.5, 17, 0.05, 0.0, true, false);//////////

		this.animations["up idle"] 		= new Animator(this.upIdleSprite, 0.0, 0.0, 75.3, 64.0, 36, 0.04, 0.0, false, true);
		this.animations["up run"] 		= new Animator(this.upRunSprite, 0.0, 0.0, 84.7, 67.1, 20, 0.03, 0.0, false, true);
		this.animations["up attack"] 	= new Animator(this.upAttackSprite, 0.0, 0.0, 82.1, 74.6, 25, 0.04, 0.0, false, true);

		this.animations["up death"] 	= new Animator(this.upDeathSprite, 0.0, 0.0, 83.5, 98.0, 17, 0.05, 0.0, false, false);////////

		this.animations["down idle"] 	= new Animator(this.downIdleSprite, 0.0, 0.0, 75.4, 62.8, 36, 0.04, 0.0, false, true);
		this.animations["down run"] 	= new Animator(this.downRunSprite, 0.0, 0.0, 84.5, 65.7, 20, 0.03, 0.0, false, true);
		this.animations["down attack"] 	= new Animator(this.downAttackSprite, 0.0, 0.0, 89.4, 72.8, 25, 0.04, 0.0, false, true);

		this.animations["down death"] 	= new Animator(this.downDeathSprite, 0.0, 0.0, 87.3, 97.0, 17, 0.05, 0.0, false, false);/////////
	}

	updateBB() {
		this.lastBB = this.BB;
		if (this.facing === "down") {
			this.BB = new BoundingBox(this.x + 16, this.y + 10, 44, 44);
		} else if (this.facing === "up") {
			this.BB = new BoundingBox(this.x + 16, this.y + 10, 44, 44);
		} else if (this.facing === "left") {
			this.BB = new BoundingBox(this.x + 20, this.y + 10, 35, 45);
		} else if (this.facing === "right") {
			this.BB = new BoundingBox(this.x + 20, this.y + 10, 35, 45);
		}
	}

	/**
	 * calcualates the directions to face the player
	 */
	calculatedDirection() {
		let player = {x: this.game.player.x - (this.x + this.midPointOffset.x), y : this.game.player.y - (this.y + this.midPointOffset.y)};
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
	* moves entity to target in path list
	*/
	move() {
		const TICK = this.game.clockTick;
		let distance = Math.floor(getDistance(this.target.x, this.target.y, this.mapX, this.mapY));
		if (distance === 0) {
			this.getPath();
		} else {
			//caluclating unit vectors
			let xDir = (this.target.x - this.mapX) / distance;
			let yDir = (this.target.y - this.mapY) / distance;
			//calculating which way to face
			let myX = floor(this.mapX / 125);
			let myY = floor(this.mapY / 125);
			if (this.path[0].x > myX) {//right
				this.facing = "right";
			} else if (this.path[0].x < myX) {//left
				this.facing = "left"
			} else if (this.path[0].y > myY) {//down
				this.facing = "down"
			} else if (this.path[0].y < myY) { //up
				this.facing = "up"
			}
			this.x += this.moveSpeed * xDir * TICK;
			this.y += this.moveSpeed * yDir * TICK;
			this.mapX += this.moveSpeed * xDir * TICK;
			this.mapY += this.moveSpeed * yDir * TICK;
			this.state = "run";
		}
	}

	/**
	* moves entity to player
	*/
	moveToPlayer() {
		const TICK = this.game.clockTick;
		let distance = Math.floor(getDistance(this.game.player.mapX, this.game.player.mapY, this.mapX, this.mapY));
		if (distance === 0) {
			this.getPath();
		} else {
			//caluclating unit vectors
			let xDir = (this.game.player.mapX - this.mapX) / distance;
			let yDir = (this.game.player.mapY  - this.mapY) / distance;
			//calculating which way to face
			let myX = floor(this.mapX / 125);
			let myY = floor(this.mapY / 125);
			if (this.path[0].x > myX) {//right
				this.facing = "right";
			} else if (this.path[0].x < myX) {//left
				this.facing = "left"
			} else if (this.path[0].y > myY) {//down
				this.facing = "down"
			} else if (this.path[0].y < myY) { //up
				this.facing = "up"
			}
			this.x += this.moveSpeed * xDir * TICK;
			this.y += this.moveSpeed * yDir * TICK;
			this.mapX += this.moveSpeed * xDir * TICK;
			this.mapY += this.moveSpeed * yDir * TICK;
			this.state = "run";
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
			this.target.x = this.path[0].x * 125 + 62.5;
			this.target.y = this.path[0].y * 125 + 62.5;
		}
	}

    update() {
		const TICK = this.game.clockTick
		if (this.hp <= 0) {
			this.state = "death";
			if (this.animations[this.facing + " " + this.state].frame === 16) {
				this.removeFromWorld = true;
			}
		} else if (this.aggro){
			if (this.path && (typeof this.path[0] != 'undefined')) {
				if (this.BB.collide(this.game.player.BB)) {
					this.state = "attack";
				} else {
					//this.moveToPlayer()
					this.move();
				}
			} else {
				this.getPath();
			}
		} else {
			if (this.path && this.path.length != 0 && this.path.length < 10 && getDistance(this.x + this.midPointOffset.x, this.y + this.midPointOffset.feet, this.game.player.x, this.game.player.y) <= 500) { //checks/changes to aggro
				this.aggro = true;
			} else {
				this.getPath();
			}
		}
		this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y; 
	}

    draw(ctx) {
		let xOffset, yOffset;

		if (this.state == "death") {
			if (this.facing == "up") xOffset = -4, yOffset = -30;
			else if (this.facing == "down") xOffset = -4, yOffset = -30
			else if (this.facing == "left") xOffset = 12, yOffset = -30;
			else if (this.facing == "right") xOffset = 14, yOffset = -30;
		} else if (this.state != "death") {
			if (this.facing == "left") {
				if (this.state == "idle") xOffset = 18, yOffset = 0;
				else if (this.state == "run") xOffset = 18, yOffset = -2;
				else if (this.state == "attack") xOffset = -1, yOffset = -11;
			} else if (this.facing == "right") {
				if (this.state == "idle")  xOffset = 18, yOffset = 0 ;
				else if (this.state == "run") xOffset = 18, yOffset = -2;
				else if (this.state == "attack") xOffset = 11, yOffset = -10;
			} else if (this.facing == "up") {
				if (this.state == "idle") xOffset = 0, yOffset = 0;
				else if (this.state == "run") xOffset = -5, yOffset = -3;
				else if (this.state == "attack") xOffset = -3, yOffset = -10;
			} else if (this.facing == "down") {
				if (this.state == "idle") xOffset = 0, yOffset = 0;
				else if (this.state == "run") xOffset = -5, yOffset = -3;
				else if (this.state == "attack") xOffset = -7, yOffset = -10;
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
			ctx.fillStyle = "Red";
			ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
		}
		else {
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		}
		// if (this.reveal)
		// ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 10 , 10);
	  }
}
