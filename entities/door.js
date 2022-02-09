class Door {
<<<<<<< HEAD
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.game = game;
      this.x = x;
      this.y = y;
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/portal.png");
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animations = [];
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);
      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 23, 16 * 5, 16 * 5);
    }

    update() {
      this.updateBB();
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
    }

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x + 20, this. y + 23, 5);
        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
  }
=======
	constructor(game, x, y, state, direction, requiredGears) {
		Object.assign(this, {game, x, y, state, direction, requiredGears});
		
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

		this.updateBB();
		
		this.mapX = this.x;
		this.mapY = this.y;
	}
	
	updateBB() {
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
		} 
		else {
			this.BB = null;
		}
	}
	
	update() {
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
		
		if (this.game.player.gears >= this.requiredGears && this.state == "locked") {
			this.state = "unlocked";
		}

		// implement another statement for final door boss death check
		

		if (this.doorDistance(this.game.entities.player) < 180 && this.state == "unlocked") {
			this.state = "open";
		} else if (this.doorDistance(this.game.entities.player) > 180 && this.state == "open") {
			this.state = "unlocked";
		}

		this.updateBB();
	}
	
	doorDistance(player) {
		return Math.sqrt(Math.pow(player.x - this.x - this.w / 2, 2) + Math.pow(player.y - this.y - this.h / 2, 2));
	}
	
	draw(ctx) {
		ctx.drawImage(this.sprites[this.state + " " + this.direction], this.x, this.y, this.w, this.h);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined') && this.BB) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
			ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
			ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
			ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);
			ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
		}
	}
}
>>>>>>> daa45de7ae05bfe1bd07199dae2022535d934f56
