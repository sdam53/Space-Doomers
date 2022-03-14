class Door {
	/**
	 * class representing a door
	 * @param {*} game gamee engine 
	 * @param {*} x x location
	 * @param {*} y y location
	 * @param {*} state starting state
	 * @param {*} direction direction to face
	 * @param {*} requiredGears required gears to unlock
	 * @param {*} finalDoor boolean whether it is final door
	 */
	constructor(game, x, y, state, direction, requiredGears, finalDoor) {
		Object.assign(this, {game, x, y, state, direction, requiredGears, finalDoor});
		this.reveal = false;

		if (direction == "down") {
			this.x = x - 60;
			this.y = y - 43;
			this.w = 245;
			this.h = 168;
		} else if (this.direction == "right") {
			this.y = y - 60;
			this.w = 167;
			this.h = 245;
		} else if (this.direction == "left") {
			this.x = x - 42;
			this.y = y - 60;
			this.w = 167;
			this.h = 245;
		}
		
		this.sprites = [];
		this.sprites["open down"] =     ASSET_MANAGER.getAsset("./sprites/door/door open down.png");
		this.sprites["open left"] = 	ASSET_MANAGER.getAsset("./sprites/door/door open left.png");
		this.sprites["open right"] = 	ASSET_MANAGER.getAsset("./sprites/door/door open right.png");
		this.sprites["unlocked down"] = ASSET_MANAGER.getAsset("./sprites/door/door unlocked down.png");
		this.sprites["unlocked left"] =	ASSET_MANAGER.getAsset("./sprites/door/door unlocked left.png");
		this.sprites["unlocked right"] =	ASSET_MANAGER.getAsset("./sprites/door/door unlocked right.png");
		this.sprites["locked down"] =	ASSET_MANAGER.getAsset("./sprites/door/door locked down.png");
		this.sprites["locked left"] =	ASSET_MANAGER.getAsset("./sprites/door/door locked left.png");
		this.sprites["locked right"] =	ASSET_MANAGER.getAsset("./sprites/door/door locked right.png");
		
		this.mapX = this.x;
		this.mapY = this.y;
		this.updateBB();
	}
	
	updateBB() {
		//BB used for closed door collision
		//BB2 used for bullet to door collision
		//BB3 used for opening or closing door
		if (this.state == "locked") {
			if (this.direction == "down") {
				this.BB = 		new BoundingBox(this.x, this.y + this.game.camera.y + 40, this.w, this.h - 40);
				this.leftBB = 	new BoundingBox(this.x, this.y + 10 + 40, 3, this.h - 20 - 40);
				this.rightBB = 	new BoundingBox(this.x + this.w - 3, this.y + 10 + 40, 3, this.h - 20 - 40); 
				this.topBB = 	new BoundingBox(this.x + 10, this.y + 40, this.w - 20, 3);
				this.bottomBB = new BoundingBox(this.x + 10, this.y + this.h - 3, this.w - 20, 3);
			}
			else if (this.direction == "left") {
				this.BB = 		new BoundingBox(this.x + 40, this.y + this.game.camera.y, this.w - 40, this.h);
				this.leftBB = 	new BoundingBox(this.x + 40, this.y + 10, 3, this.h - 20);
				this.rightBB = 	new BoundingBox(this.x + this.w - 3, this.y + 10, 3, this.h - 20); 
				this.topBB = 	new BoundingBox(this.x + 10 + 40, this.y, this.w - 20 - 40, 3);
				this.bottomBB = new BoundingBox(this.x + 10 + 40, this.y + this.h - 3, this.w - 20 - 40, 3);
			}
			else if (this.direction == "right") {
				this.BB = 		new BoundingBox(this.x, this.y + this.game.camera.y, this.w - 40, this.h);
				this.leftBB = 	new BoundingBox(this.x, this.y + 10, 3, this.h - 20);
				this.rightBB = 	new BoundingBox(this.x + this.w - 3 - 40, this.y + 10, 3, this.h - 20); 
				this.topBB = 	new BoundingBox(this.x + 10, this.y, this.w - 20 - 40, 3);
				this.bottomBB = new BoundingBox(this.x + 10, this.y + this.h - 3, this.w - 20 - 40, 3);
			}
		} else {
			this.BB = null;
		}
		if (this.direction == "down") {
			this.BB2 = 		new BoundingBox(this.x, this.y + 40, this.w, this.h - 40);
			this.BB3 =		new BoundingBox(this.x + 60, this.y + 43 - 62, 125, 249);
		}
		else if (this.direction == "left") {
			this.BB2 = 		new BoundingBox(this.x + 40, this.y, this.w - 40, this.h);
			this.BB3 =		new BoundingBox(this.x + 42 - 62, this.y + 60, 249, 125);

		}
		else if (this.direction == "right") {
			this.BB2 = 		new BoundingBox(this.x, this.y, this.w - 40, this.h);
			this.BB3 =		new BoundingBox(this.x - 62, this.y + 60, 249, 125);
		}
	}
	
	update() {
		this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
		
		if (!this.finalDoor && this.state == "locked" &&  this.game.player.gears >= this.requiredGears) {
			this.state = "unlocked";
		}

		// unlock condition for levels 2 and 3
		if (this.finalDoor && this.state == "locked" && this.game.player.gears >= this.requiredGears && this.game.entities.bosses == 0) this.state = "unlocked";
				
		// checks for open or closed case
		if (this.BB3 && (this.state === "unlocked" || this.state === "open")) {
			let enemies = this.game.entities.enemies;
			let player = this.game.entities.player;
			
			if (this.BB3.collide(player.feetBB)) {
				this.state = "open";
				return;
			} else {
				this.state = "unlocked";
			}
			for (let index = 0; index < enemies.length; index++) {
				if (enemies[index].BB && this.BB3.collide(enemies[index].BB)) {
					this.state = "open";
					return;
				} else {
					this.state = "unlocked";
				}
			}
		}
	}
	
	draw(ctx) {
		ctx.drawImage(this.sprites[this.state + " " + this.direction], this.x, this.y, this.w, this.h);
		// if (this.reveal)
		// ctx.drawImage(this.sprites[this.state + " " + this.direction], this.x, this.y, this.w, this.h);
		ctx.globalAlpha = 1;

		if (PARAMS.DEBUG && (typeof this.BB != 'undefined') && this.BB) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

			//ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
			//ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
			//ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);
			//ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
		}
	}

	drawMinimap(ctx, mmX, mmY){
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)) {
			this.reveal = true;
			ctx.fillStyle = "Gray";
		}
    	else {
        	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		}
		if (this.reveal)
    		ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );	
	}
}
