class Player {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.player = this;
        this.game = game;

        this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/player/player_up_idle.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/player/player_up_run.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/player/player_down_idle.png");
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/player/player_down_run.png");
        this.spritesheet5 = ASSET_MANAGER.getAsset("./sprites/player/player_left_idle.png");
        this.spritesheet6 = ASSET_MANAGER.getAsset("./sprites/player/player_left_run.png");
        this.spritesheet7 = ASSET_MANAGER.getAsset("./sprites/player/player_right_idle.png");
        this.spritesheet8 = ASSET_MANAGER.getAsset("./sprites/player/player_right_run.png");
        this.spritesheet9 = ASSET_MANAGER.getAsset("./sprites/player/player_bullet.png");
        this.spritesheet10 = ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png");

        this.facing = "right"; // can be left, right, up, down
        this.state = "idle"; // can be idle, run, attack, death

        this.maxhp = 100;
        this.hp = 100;

        this.velocity = {x: 0, y : 0};


        this.animations = [];
        this.loadAnimations();

        this.updateBB();

    }

    loadAnimations() {

        this.animations["left idle"] = new Animator(this.spritesheet5, 0, 0, 271, 339, 25, 0.05, 0, false, true);
        this.animations["left run"] = new Animator(this.spritesheet6, 0, 0, 280, 346, 16, 0.03, 0, false, true);

        this.animations["right idle"] = new Animator(this.spritesheet7, 0, 0, 271, 339, 25, 0.05, 0, false, true);
        this.animations["right run"] = new Animator(this.spritesheet8, 0, 0, 280, 346, 16, 0.03, 0, false, true);

        this.animations["up idle"] = new Animator(this.spritesheet1, 0, 0, 293, 338, 25, 0.05, 0, false, true);
        this.animations["up run"] = new Animator(this.spritesheet2, 0, 0, 299, 342, 16, 0.03, 0, false, true);

        this.animations["down idle"] = new Animator(this.spritesheet3, 0, 0, 280, 339, 25, 0.05, 0, false, true);
        this.animations["down run"] = new Animator(this.spritesheet4, 0, 0, 299, 343, 16, 0.03, 0, false, true);

        this.animations["death"] = new Animator(this.spritesheet10, 0, 0, 369, 454, 18, 0.05, 0, false, true);
    }

    updateBB() {
      this.lastBB = this.BB;
      if (this.facing === "right") {
        this.BB = new BoundingBox(this.x + 2, this.y + 1, 72, 92);
      } else if (this.facing === "left") {
        this.BB = new BoundingBox(this.x + 5, this.y + 1, 72, 92);
      } else {
        this.BB = new BoundingBox(this.x + 7, this.y + 1, 72, 90);
      }
    }

    die () {

    }

    update() {
        const TICK = this.game.clockTick;
        const RUN = 350;

        // Movement and User Input

        this.velocity.x = 0;
        this.velocity.y = 0;
        this.state = "idle";

        if ((this.game.keys["w"] || this.game.keys["ArrowUp"]) && (!this.game.keys["s"] && !this.game.keys["ArrowDown"])) {
            this.velocity.y = -RUN;
            this.state = "run";
        }
        if ((this.game.keys["s"] || this.game.keys["ArrowDown"]) && (!this.game.keys["w"] && !this.game.keys["ArrowUp"])) {
            this.velocity.y = RUN;
            this.state = "run";
        }
        if ((this.game.keys["d"] || this.game.keys["ArrowRight"]) && (!this.game.keys["a"] && !this.game.keys["ArrowLeft"])) { // go right: press d and not a
            this.velocity.x = RUN;
            this.state = "run";
            // if ((this.game.keys["w"] || this.game.keys["ArrowUp"]) && (!this.game.keys["s"] && !this.game.keys["ArrowDown"])) this.velocity.y = -RUN;
            // else if ((this.game.keys["s"] || this.game.keys["ArrowDown"]) && (!this.game.keys["w"] && !this.game.keys["ArrowUp"])) this.velocity.y = RUN;
        }
        if ((this.game.keys["a"] || this.game.keys["ArrowLeft"]) && (!this.game.keys["d"] && !this.game.keys["ArrowRight"])) { // go left
            this.velocity.x = -RUN;
            this.state = "run";
        }

        // update direction
        if (this.velocity.x > 0) this.facing = "right";
        if (this.velocity.x < 0) this.facing = "left";
        if (this.velocity.y < 0) this.facing = "up";
        if (this.velocity.y > 0) this.facing = "down";

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

        this.updateBB();
    }

    draw(ctx) {
        // this.healthbar.draw(ctx);
        // this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.3);

        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
