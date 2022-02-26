class TransitionItem {
    constructor(game, x, y, level) {
      Object.assign(this, {game, x, y, level})

      this.sprites = [];
      this.sprites[1] = ASSET_MANAGER.getAsset("./sprites/transition/level 1 hole.png");
      this.sprites[2] = ASSET_MANAGER.getAsset("./sprites/transition/level 2 jetpack.png");
      this.sprites[3] = ASSET_MANAGER.getAsset("./sprites/transition/level 3 pod.png");
      this.mapY = this.y;
      this.mapX = this.x;
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

      this.visible = true;

      if (this.level == 1) {
          this.visible = false;
      }
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.level == 1) {
            this.BB = new BoundingBox(this.x + 100, this.y + 70, 40, 40);
        } else if (this.level == 2) {
            this.BB = new BoundingBox(this.x + 30, this.y + 20, 60, 70);
        } else if (this.level == 3) {
            this.BB = new BoundingBox(this.x + 20, this.y + 20, 210, 210);
        }
    }

    update() {
      this.updateBB();

      let player = this.game.player;

      if (this.level == 1 && player.gears == 3 && this.game.entities.enemies.length == 0) {
          this.visible = 1;
      }

      if (this.BB && player.feetBB.collide(this.BB)) {
            if (this.level == 1 && this.visible) {
                this.game.camera.loadLevel(levelTwo, false, true);
            } else if (this.level == 2) {
                this.game.camera.loadLevel(levelThree, false, true);
            } else if (this.level == 3) {
                this.game.camera.loadLevel(levelOne, true, false);
            }
        }
        
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
    }

    draw(ctx){
        ctx.drawImage(this.sprites[this.level], this.x, this.y, this.w, this.h);
        // if (PARAMS.DEBUG) {
        //   ctx.strokeStyle = 'Blue';
        //   ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    }
  }
