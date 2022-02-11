class Ground {
	constructor(game, x, y, w, h, type) {
		Object.assign(this, {game, x, y, w, h, type})
		
		this.tile1 = ASSET_MANAGER.getAsset("./sprites/tiles/ground.png");
		this.tile2 = ASSET_MANAGER.getAsset("./sprites/tiles/broken_stone.png");
		this.tile3 = ASSET_MANAGER.getAsset("./sprites/tiles/metal_tile.png");
		this.tile4 = ASSET_MANAGER.getAsset("./sprites/tiles/cracked_tile.png");
		this.trap1 = ASSET_MANAGER.getAsset("./sprites/traps/spike.png");
		this.trap2 = ASSET_MANAGER.getAsset("./sprites/traps/thorn1.png");
		this.chest_open = ASSET_MANAGER.getAsset("./sprites/chest/chest_open.png");
		this.chest_closed = ASSET_MANAGER.getAsset("./sprites/chest/chest_closed.png");
		this.door_shut = ASSET_MANAGER.getAsset("./sprites/door/door_shut.png");
		this.door_open = ASSET_MANAGER.getAsset("./sprites/door/door_open.png");
		
		
		this.wall = ASSET_MANAGER.getAsset("./sprites/tiles/18.png");
		this.corner = ASSET_MANAGER.getAsset("./sprites/tiles/20.png");
		
		this.size = this.h/20;
		this.tile = this.door_shut
		this.trap = this.trap1
    
    this.mapY = this.y;
    this.mapX = this.x;
    if (this.game.gameLevel == 1){
      this.tile = this.tile1;
    }
    else if (this.game.gameLevel == 2){
      this.tile = this.tile2;
    }
    else {
      this.tile = this.tile4;
    }
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
	}
	
	update() {
		// this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
	}
	drawMinimap(ctx, mmX, mmY){
    ctx.fillStyle = "White";
    ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );
  }
	draw(ctx) {
		ctx.drawImage(this.tile, this.x, this.y, this.w, this.h);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
  
  drawMinimap(ctx, mmX, mmY){
    ctx.fillStyle = "White";
    ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );
  }
}

class Wall {
	constructor(game, x, y, w, h, type) {
		Object.assign(this, {game, x, y, w, h, type});
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/x wall.png");
		this.updateBB();
		
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
		this.leftBB = new BoundingBox(this.x, this.y + 10, 3, this.h - 20);
		this.rightBB = new BoundingBox(this.x + this.w - 3, this.y + 10, 3, this.h - 20); 
		this.topBB = new BoundingBox(this.x + 10, this.y, this.w - 20, 3);
		this.bottomBB = new BoundingBox(this.x + 10, this.y + this.h - 3, this.w - 20, 3);
	}
	
	update() {
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
		this.updateBB();
		
	}
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Brown';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
			//ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
			//ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
			//ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);
			//ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
		}
	}
	drawMinimap(ctx, mmX, mmY){
		//ctx.fillStyle = "White";
		//ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );
	  }
}

