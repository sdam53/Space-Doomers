class Portal {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.game = game;
      this.x = x;
      this.y = y;
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/portal.png");
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animations = [];
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);
      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 16 * 5, 16 * 5);
    }

    update() {

    }

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this. y, 5);
    }
  }
