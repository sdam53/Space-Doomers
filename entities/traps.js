class Trap{
    constructor(game, x, y, trap_type) {
		Object.assign(this, {game, x, y, trap_type})
		
		this.thorn1 = ASSET_MANAGER.getAsset("./sprites/traps/thorn1.png");
		this.spike = ASSET_MANAGER.getAsset("./sprites/traps/spike.png");
		this.size = this.h/20;
		this.tile = this.door_shut
        this.mapY = this.y;
        this.mapX = this.x;
        this.trap = this.thorn1;
        this.damage = 1;
        if (this.trap_type == "thorn"){
            this.trap = this.thorn1;
            this.trapX = 485;
            this.trapY = 495;
            this.damage = 5;
        }
        else if (this.trap_type == "spike"){
            this.trap = this.spike;
            this.trapX = 181;
            this.trapY = 174;
            this.damage = 10;
        }
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
		ctx.drawImage(this.trap,
            1, 1, //source from sheet
            this.trapX, this.trapY,
            this.x+22, this.y+22,
            80,
            80);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Green';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
  
}
