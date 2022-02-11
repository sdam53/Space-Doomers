class Powerup {
    constructor(game, x, y, powerup) {
        Object.assign(this, {game, x, y, powerup});
        this.sprites = [];
        this.sprites = ASSET_MANAGER.getAsset("./sprites/tiles/healthpack.png");
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.lastBB;
        if (this.powerup === "healthpack") {
            this.BB = new BoundingBox(this.x+30, this.y+30, 50, 50)
        }
    }

    update() {
        this.updateBB();
        this.x += this.game.camera.x;
        this.y += this.game.camera.y;

    }

    draw(ctx){
        ctx.drawImage(this.sprites, this.x+35, this.y+30, 50, 50);
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