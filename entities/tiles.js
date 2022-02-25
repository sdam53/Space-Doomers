class Ground {
	constructor(game, x, y, w, h, type) {
		Object.assign(this, {game, x, y, w, h, type})
	
		this.tile = ASSET_MANAGER.getAsset("./sprites/tiles/ground.png");

		//check if the object is reveal on the map
		this.reveal = false;
	
		this.mapY = this.y;
		this.mapX = this.x;
	
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
	}
	
	update() {
		// this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
	}

	draw(ctx) {
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (PARAMS.LANTERN) {
			if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)) {
				this.reveal = true;
				ctx.drawImage(this.tile, this.x, this.y, this.w, this.h);
			}
			else{
				ctx.globalAlpha = PARAMS.OPACITY;
			}
		} else {
			ctx.drawImage(this.tile, this.x, this.y, this.w, this.h);
		}
		// ctx.globalAlpha = 0.4;
		// if (this.reveal)
		// 	ctx.drawImage(this.tile, this.x, this.y, this.w, this.h);
		ctx.globalAlpha = 1;

		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
  
  drawMinimap(ctx, mmX, mmY){
	let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
		this.reveal = true;
		ctx.fillStyle = "White";
		}
    else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	}
	if (this.reveal)
    	ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );	

  }
}

class Wall {
	constructor(game, x, y, w, h, type) {
		Object.assign(this, {game, x, y, w, h, type});
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/x wall.png");
		this.updateBB();
		this.reveal = false;
		this.mapY = this.y;
		this.mapX = this.x;
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
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (PARAMS.LANTERN) {
			if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
				this.reveal = true;
				ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
			}
		} else {
			ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
		}
		// else{
		// 	ctx.globalAlpha = PARAMS.OPACITY;
		// }
		// if (this.reveal)
			// ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
		ctx.globalAlpha = 1;
		
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
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
		this.reveal = true;
		ctx.fillStyle = "Black";
    	ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );	
		}
    else{
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	}
	// if (this.reveal)
    // 	ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );	
	  }
}

