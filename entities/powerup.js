class Powerup {
    constructor(game, x, y, powerup) {
        Object.assign(this, {game, x, y, powerup});
        if (powerup === "heathpack") {
            this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/healthpack.png");
        } else if (powerup === "ricochet") {
            this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/ricochet.png");
        }
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.lastBB;
        if (this.powerup === "healthpack") {
            this.BB = new BoundingBox(this.x+30, this.y+30, 50, 50)
        } else if (this.powerup === "ricochet") {
            this.BB = new BoundingBox(this.x + 12, this.y + 25, 100, 70)
        }
    }

    update() {
        if (this.powerup === "ricochet") {
            if (this.BB.collide(this.game.player.feetBB)) {
                this.game.player.bulletRicochet = 3;
                this.removeFromWorld = true;
            }
        }

        this.updateBB();
        this.x += this.game.camera.x;
        this.y += this.game.camera.y;

    }

    draw(ctx){
        if (this.powerup === "heathpack") {
            ctx.drawImage(this.sprites, this.x+35, this.y+30, 50, 50);
        } else if (this.powerup === "ricochet") {
            ctx.drawImage(this.sprites, this.x + 12, this.y + 12, 100, 100);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
    
    drawMinimap(ctx, mmX, mmY){
        ctx.fillStyle = "Green";
        ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 100/PARAMS.BITWIDTH , 100/PARAMS.BITWIDTH);
      }
}
