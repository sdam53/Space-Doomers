class Gear {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.game = game;
      this.x = x;
      this.y = y;
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/gear.png");
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);
      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 83, 88);
    }

    update() {

    }

    draw(ctx){
        ctx.drawImage(this.spritesheet,
            1, 1, //source from sheet
            83, 88,
            this.x, this.y,
            83,
            88);
    }
  }