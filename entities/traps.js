class Trap{
    constructor(game, x, y) {
		Object.assign(this, {game, x, y})
		
		this.thorn1 = ASSET_MANAGER.getAsset("./sprites/traps/thorn1.png");
		
		this.size = this.h/20;
		this.tile = this.door_shut
		this.trap = this.trap1
    
    this.mapY = this.y;
    this.mapX = this.x;
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, 125, 125);
	}
	
	update() {
		this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
        // if (this.game.player.feetBB.collide(this.BB)){
        //     this.game.player.moveMultiplyer = 0.2;
        // }
        // else {
        //     this.game.player.moveMultiplyer = 1;

        // }
	}
	drawMinimap(ctx, mmX, mmY){
    ctx.fillStyle = "Black";
    ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );
  }
	draw(ctx) {
		ctx.drawImage(this.thorn1,
            1, 1, //source from sheet
            485, 495,
            this.x, this.y,
            125,
            125);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
  
}
