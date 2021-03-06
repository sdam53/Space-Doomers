class Trap{
    constructor(game, x, y, trap_type) {
		Object.assign(this, {game, x, y, trap_type})
		
	    this.thorn1 = ASSET_MANAGER.getAsset("./sprites/traps/thorn1.png");
        this.thorn2 = ASSET_MANAGER.getAsset("./sprites/traps/thorn_bottom.png");
		this.spike = ASSET_MANAGER.getAsset("./sprites/traps/spike.png");
		this.needle = ASSET_MANAGER.getAsset("./sprites/traps/Needle.png");
		this.spike_animation = new Animator(this.needle, 15, 0, 130, 174, 16, 0.2, 51, false, true);

		this.size = this.h/20;
		this.tile = this.door_shut
        this.mapY = this.y;
        this.mapX = this.x;
        this.trap = this.thorn1;
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
            this.timer = 3.2;
            this.cooldown = true;
        }
        this.updateBB();
	}
	
	updateBB() {
		if (this.trap_type === "spike") {
            if (this.spike_animation.frame >= 12 && this.spike_animation.frame <= 15) {
                this.BB = new BoundingBox(this.x, this.y, 125, 125);
            } else {
                this.BB = null;
            }
        } else {
            this.BB = new BoundingBox(this.x, this.y, 125, 125);
        }
	}
	
	update() {
        if (!PARAMS.GODMODE) {
            if (this.trap_type === "spike") {
                if (this.timer <= 0.8 && this.BB && this.BB.collide(this.game.player.feetBB) && this.cooldown == false) {
                    this.game.player.calculateDamage(this.damage);
                    this.cooldown = true;
                    ASSET_MANAGER.playAsset("./music/spikes.mp3");
                }
                this.timer -= this.game.clockTick;
                if (this.timer < 0){
                    this.timer = 3.2;
                    this.cooldown = false;
                }
            }
        }
		this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
	}
	drawMinimap(ctx, mmX, mmY){
        ctx.fillStyle = "Black";
        ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 125/PARAMS.BITWIDTH , 125/PARAMS.BITWIDTH );
    }

    //used for layering of thorn trap
    layer(ctx) {
        if (PARAMS.LANTERN) {
            let x = this.game.entities.player.mapX;
            let y = this.game.entities.player.mapY;
            if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
                this.reveal = true;
            }
            else {
                ctx.globalAlpha = PARAMS.OPACITY;
            }
            ctx.drawImage(this.trap,
                1, 1, //source from sheet
                485, 750,
                this.x, this.y - 50,
                125,
                175);
            ctx.globalAlpha = 1;
        } else {
            ctx.drawImage(this.trap,
                1, 1, //source from sheet
                485, 750,
                this.x, this.y - 50,
                125,
                175);      
        }
	}
    
	draw(ctx) {
        if (this.trap_type === "thorn") {
            ctx.drawImage(this.thorn2,
            0, 0,
            this.trapX, this.trapY,
            this.x, this.y - 50,
            125,
            175);       
        } else if (this.trap_type === "spike") {
            // ctx.drawImage(this.trap,
            // 1, 1, //source from sheet
            // this.trapX, this.trapY,
            // this.x - 15, this.y - 55,
            // 175,
            // 175);
		    this.spike_animation.drawFrame(this.game.clockTick, ctx, this.x + 5, this.y+ 5 -56*0.8, 0.8);

        }
		if (PARAMS.DEBUG && this.BB && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
}
