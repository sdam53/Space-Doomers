class TransitionItem {
    constructor(game, x, y, level) {
      Object.assign(this, {game, x, y, level})

      this.sprites = [];
      this.sprites[1] = ASSET_MANAGER.getAsset("./sprites/transition/level 1 hole.png");
      this.sprites[2] = ASSET_MANAGER.getAsset("./sprites/transition/level 2 jetpack.png");
      this.sprites[3] = ASSET_MANAGER.getAsset("./sprites/transition/level 3 pod.png");

      if (level == 1) {
          this.w = 250;
          this.h = 250;
      } else if (level == 2) {
          this.w = 125;
          this.h = 125;
      } else if (level == 3) {
          this.w = 250;
          this.h = 250;
      }

      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.level == 1) {
            this.BB = new BoundingBox(this.x + 100, this.y + 70, 40, 40);
        }
        
    }

    update() {
      this.updateBB();
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
    }

    draw(ctx){
        ctx.drawImage(this.sprites[this.level], this.x, this.y, this.w, this.h);
        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
  }