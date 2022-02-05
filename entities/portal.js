class Portal {
    constructor(game, x1, y1, x2, y2, link) {
      Object.assign(this, {game, x1, y1, x2, y2, link})

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/portal.png");
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animations = [];
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);

      this.cooldown = 3;
      this.counter = this.cooldown;
      this.linkPortal();
      this.updateBB();
    }
    
    /**
     * links teleporter to another
     */
    linkPortal() {
      if (this.link === null) {
        this.link = new Portal(this.game, this.x2, this.y2, this.x1, this.y1, this);
        this.game.addPortal(this.link);
      }
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x1 + 20, this.y1 + 23, 16 * 5, 16 * 5);
    }

    update() {
      if (this.counter <= 0) {
        if (this.BB.collide(this.game.player.feetBB)) {
          ASSET_MANAGER.playAsset("./music/portal sound.wav");
          this.game.player.x = this.link.x1 + 17;
          this.game.player.y = this.link.y1 - 25;
          this.counter = this.cooldown;
          this.link.counter = this.cooldown;
        }
      }
      this.counter -= this.game.clockTick;



      this.updateBB();
      this.x1 += this.game.camera.x;
      this.y1 += this.game.camera.y;
    }

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x1 + 20, this.y1 + 23, 5);
        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
  }