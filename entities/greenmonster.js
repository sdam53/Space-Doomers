class GreenMonster {
	constructor(game, x, y, offscreen) {
		Object.assign(this, {game, x, y, offscreen})
		
		this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_up.png");
		this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_down.png");
		this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_left.png");
		this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_right.png");
		
		//offset to get be in center of tile
		this.x += 25;
		this.y += 25;
		
		this.facing = "down"; // can be left, right, up, down
		this.state = "idle"; // can be idle, run, attack, death
		
		this.hp = 125;
		this.moveSpeed = 225;
		
		this.attackRate = 1; //could use some slight changes
		this.attackTimer = this.attackRate;
		
		this.animations = [];
		this.loadAnimations();
		this.updateBB();
		
		//offset to get the middle of sprite based on x, y
		this.midPointOffset = {x: 35, y : 35};
		
		//info for pathfinding
		this.mapX = this.x + this.midPointOffset.x;
		this.mapY = this.y + this.midPointOffset.y;
		this.origLocation = new Point(this.game, floor(this.mapX / 125), floor(this.mapY / 125), null);
		this.path;
		this.directionToGo;
	}
	
	loadAnimations() {
		this.animations["left idle"] = new Animator(this.leftSprite, 0.0, 0.0, 73.2, 74.1, 107, 0.05, 0.0, false, true);
		this.animations["left run"] = new Animator(this.leftSprite, 0.0, 74.1, 82.8, 81.9, 31, 0.03, 0.0, false, true);
		this.animations["left attack"] = new Animator(this.leftSprite, 0.0, 156.0, 92.7, 81.3, 28, 0.03, 0.0, false, true);
		this.animations["left death"] = new Animator(this.leftSprite, 0.0, 237.3, 99.9, 97.2, 3, 0.1, 0.0, false, false);
		this.animations["right idle"] = new Animator(this.rightSprite, 0.0, 0.0, 73.2, 74.1, 107, 0.05, 0.0, false, true);
		this.animations["right run"] = new Animator(this.rightSprite, 0.0, 74.1, 82.8, 81.9, 31, 0.03, 0.0, false, true);
		this.animations["right attack"] = new Animator(this.rightSprite, 0.0, 156.0, 92.7, 81.3, 28, 0.03, 0.0, false, true);
		this.animations["right death"] = new Animator(this.rightSprite, 0.0, 237.3, 99.9, 97.2, 3, 0.1, 0.0, false, false);
		this.animations["up idle"] = new Animator(this.upSprite, 0.0, 0.0, 72.9, 74.1, 36, 0.05, 0.0, false, true);
		this.animations["up run"] = new Animator(this.upSprite, 0.0, 74.1, 82.8, 80.4, 31, 0.03, 0.0, false, true);
		this.animations["up attack"] = new Animator(this.upSprite, 0.0, 154.5, 76.2, 77.4, 28, 0.03, 0.0, false, true);
		this.animations["up death"] = new Animator(this.upSprite, 0.0, 236.1, 95.4, 93.0, 3, 0.1, 0.0, false, false);
		this.animations["down idle"] = new Animator(this.downSprite, 0.0, 0.0, 72.6, 74.1, 107, 0.05, 0.0, false, true);
		this.animations["down run"] = new Animator(this.downSprite, 0.0, 74.1, 82.8, 80.1, 30, 0.03, 0.0, false, true);
		this.animations["down attack"] = new Animator(this.downSprite, 0.0, 154.2, 79.5, 80.1, 28, 0.03, 0.0, false, true);
		this.animations["down death"] = new Animator(this.downSprite, 0.0, 234.3, 95.4, 92.7, 3, 0.1, 0.0, false, false);
	}
	
	updateBB() {
		this.lastBB = this.BB; //body BB
		if (this.state != "death") { 
			this.BB = new BoundingBox(this.x, this.y + 4, 73, 61);
		}
		if (this.hp <= 0) {
			this.BB = null;
		}
		this.lastAtkBB = this.atkBB; //attack BB
		if (this.state === "attack" && this.facing === "left" && (this.animations[this.facing + " " + this.state].frame >= 13 && this.animations[this.facing + " " + this.state].frame <= 20)) {
			this.atkBB = new BoundingBox(this.x - 14, this.y + 20, 14, 45);
		} else if (this.state === "attack" && this.facing === "right" && (this.animations[this.facing + " " + this.state].frame >= 6 && this.animations[this.facing + " " + this.state].frame <= 13)) {
			this.atkBB = new BoundingBox(this.x + 73, this.y + 20, 14, 45);
		} else if (this.state === "attack" && this.facing === "up" && (this.animations[this.facing + " " + this.state].frame >= 13 && this.animations[this.facing + " " + this.state].frame <= 20)) {
			this.atkBB = new BoundingBox(this.x + 14, this.y + 5, 45, 30);
		} else if (this.state === "attack" && this.facing === "down" && (this.animations[this.facing + " " + this.state].frame >= 13 && this.animations[this.facing + " " + this.state].frame <= 20)) {
			this.atkBB = new BoundingBox(this.x + 14, this.y + 35, 45, 30);
		} else {
			this.atkBB = null;
		}
	}
	
	/**
	* calculates direction monster needs to face to attack player
	*/
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
	* gets path to player in the form of an array of points
	*/
	move() {
		const TICK = this.game.clockTick;
		if (getDistance(this.mapX, this.mapY, this.path[0].x * 125 + 62, this.path[0].y * 125 + 62) > 25) {
			if (getDistance(this.mapX, this.mapY, this.game.player.mapX, this.game.player.mapY) > 5) {
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
		//console.log(this.offscreen);
		if (this.hp <= 0) {
			this.state = "death";
			if (this.animations[this.facing + " " + this.state].frame === 2) {
				this.removeFromWorld = true;
			}
		} else if (!(this.x > this.game.ctx.canvas.width || this.x < 0 || this.y > this.game.ctx.canvas.height || this.y < 0) || this.offscreen) {
			if (this.BB.collide(this.game.player.BB)) {
				this.calculatedDirection();
				this.state = "attack";
			} else {
				if (this.path && (typeof this.path[0] != 'undefined')) {
					this.move()
				} else {
					if (randomInt(7) % 2 === 0) {
						this.getPath();
					}
				}
			}			
			if (this.atkBB && PARAMS.GODMODE === false) {
				if (this.attackTimer <= 0) {
					if (this.atkBB.collide(this.game.player.BB)) {
						this.game.player.hp -= 20; //might revamp damage system later
						this.attackTimer = this.attackRate;
					}
				}
			}
		}
		
		 
			
		if (this.attackTimer > 0) {
			this.attackTimer-= this.game.clockTick;
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
		let xOffset = 0; // 0 offset is idle
		let yOffset = 0;
		if (this.state === "attack") {
			if (this.facing === "down") {
				xOffset = -4;
				yOffset = -6;
			} else if (this.facing === "up") {
				xOffset = -2;
				yOffset = -6;
			} else if (this.facing === "left") {
				xOffset = -17;
				yOffset = -7;
			} else {
				xOffset = -2;
				yOffset = -7;
			}
		} else if (this.state === "run" ) {
			if (this.facing === "up" || this.facing === "down") {
				xOffset = -4;
				yOffset = -6;
			} else if (this.facing === "left") {
				xOffset = -3;
				yOffset = -8;
			} else {
				xOffset = -4;
				yOffset = -8;
			}
		} else if (this.state === "death") {
			if (this.facing === "up" || this.facing === "down") {
				xOffset = -12;
				yOffset = -19;
			} else if (this.facing === "left") {
				xOffset = -10;
				yOffset = -23;
			} else {
				xOffset = -15;
				yOffset = -23;
			}
		}
		//fog of war
		if (PARAMS.LANTERN) {
			let x = this.game.entities.player.mapX;
			let y = this.game.entities.player.mapY;
			if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
				this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x + xOffset, this.y + yOffset, 1);
			}
		} else {
			this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x + xOffset, this.y + yOffset, 1);
		}
		
		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
			if (this.atkBB) {
				ctx.strokeStyle = 'Red';
				ctx.strokeRect(this.atkBB.x, this.atkBB.y, this.atkBB.width, this.atkBB.height);
			}
		}
	}
}
