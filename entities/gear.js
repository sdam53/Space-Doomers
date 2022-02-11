class Gear {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.game = game;
      this.x = x;
      this.y = y;
      this.mapX = x;
      this.mapY = y;
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/gear.png");
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);
      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 9, 83, 88);
    }

    update() {
      this.updateBB();
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
    }

    draw(ctx){
        ctx.drawImage(
          this.spritesheet,
            1, 1, //source from sheet
            83, 88,
            this.x + 20, this.y + 9,
            83,
            88);
        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    drawMinimap(ctx, mmX, mmY){
      ctx.fillStyle = "Yellow";
      ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 100/PARAMS.BITWIDTH , 100/PARAMS.BITWIDTH);
    }
  }
