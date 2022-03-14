class Powerup {
    constructor(game, x, y, powerup) {
        Object.assign(this, {game, x, y, powerup});
        if (powerup === "healthpack") {
            this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/healthpack.png");
        } else if (powerup === "ricochet") {
            this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/ricochet.png");
        } else if (powerup === "shotgun") {
            this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/shotgun.png");
        }
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.lastBB;
        if (this.powerup === "healthpack") {
            this.BB = new BoundingBox(this.x+30, this.y+30, 50, 50)
        } else if (this.powerup === "ricochet") {
            this.BB = new BoundingBox(this.x + 12, this.y + 25, 100, 70)
        } else if (this.powerup === "shotgun") {
            this.BB = new BoundingBox(this.x + 20, this.y + 35, 80, 50)
        }
    }

    update() {
        if (this.powerup === "ricochet") {
            if (this.BB.collide(this.game.player.feetBB)) {
                ASSET_MANAGER.playAsset("./music/weapon_powerup.mp3");
                this.game.player.bulletRicochet = 3;
                this.removeFromWorld = true;
            }
        } else if (this.powerup === "shotgun") {
            if (this.BB.collide(this.game.player.feetBB)) {
                ASSET_MANAGER.playAsset("./music/weapon_powerup.mp3");
                this.game.player.shotgun.shotgun = true
                this.game.player.shotgun.amount++;
                this.removeFromWorld = true;
            }
        } else if (this.powerup === "healthpack") {
            if (this.BB.collide(this.game.player.feetBB)) {
                ASSET_MANAGER.playAsset("./music/health.mp3");
				this.game.player.hp = 100;
                this.removeFromWorld = true;
            }
        }

        this.updateBB();
        this.x += this.game.camera.x;
        this.y += this.game.camera.y;

    }

    draw(ctx){
        if (this.powerup === "healthpack") {
            ctx.drawImage(this.sprites, this.x+35, this.y+30, 50, 50);
        } else if (this.powerup === "ricochet") {
            ctx.drawImage(this.sprites, this.x + 12, this.y + 12, 100, 100);
        } else if (this.powerup === "shotgun") {
            ctx.drawImage(this.sprites, this.x + 12, this.y + 12, 100, 100);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
    

    drawMinimap(ctx, mmX, mmY){
    let x = this.game.entities.player.mMapX;
    let y = this.game.entities.player.mMapY;
    
    if (this.game.entities.minimap.checkInCircle(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, x, y, 50)){
        this.reveal = true;
        ctx.fillStyle = "Green";
        }
        else{
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    }
    if (this.reveal)
        ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 100/PARAMS.BITWIDTH , 100/PARAMS.BITWIDTH);


    }
}
