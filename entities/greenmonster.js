class GreenMonster {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})

    this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_up.png");
    this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_down.png");
    this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_left.png");
    this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/green_monster/green_monster_right.png");

    //offset to get be in center of tile
    this.x += 25;
    this.y += 25;

	  this.facing = "down"; // can be left, right, up, down
    this.state = "idle"; // can be idle, run, attack, death
 
    this.hp = 100;
    this.moveSpeed = 150;

    this.bulletSpeed = 200;
    this.bulletRate = 100;
    this.bulletTimer = this.bulletRate;
    this.bulletSize = 30;

    this.animations = [];
    this.loadAnimations();
    this.updateBB();

    //offset to get the middle of sprite
    this.midPointOffset = {x: 121, y : 123};

  
    //info for pathfinding
    this.mapX = this.x + this.midPointOffset.x;
    this.mapY = this.y + this.midPointOffset.y;
    this.origLocation = new Point(this.game, floor(this.mapX / 125), floor(this.mapY / 125), null);
    this.path;
  }

  loadAnimations() {
    this.animations["left idle"] = new Animator(this.leftSprite, 0, 0, 244, 247, 107, 0.05, 0, false, true);
    this.animations["left run"] = new Animator(this.leftSprite, 0, 247, 276, 273, 31, 0.03, 0, false, true);
    this.animations["left attack"] = new Animator(this.leftSprite, 0, 520, 309, 271, 28, 0.03, 0, false, true);
    this.animations["left death"] = new Animator(this.leftSprite, 0, 791, 333, 324, 3, 0.2, 0, false, false);

    this.animations["right idle"] = new Animator(this.rightSprite, 0, 0, 244, 247, 107, 0.05, 0, false, true);
    this.animations["right run"] = new Animator(this.rightSprite, 0, 247, 276, 273, 31, 0.03, 0, false, true);
    this.animations["right attack"] = new Animator(this.rightSprite, 0, 520, 309, 271, 28, 0.03, 0, false, true);
    this.animations["right death"] = new Animator(this.rightSprite, 0, 791, 333, 324, 3, 0.2, 0, false, false);

    this.animations["up idle"] = new Animator(this.upSprite, 0, 0, 243, 247, 36, 0.05, 0, false, true);
    this.animations["up run"] = new Animator(this.upSprite, 0, 247, 276, 268, 31, 0.03, 0, false, true);
    this.animations["up attack"] = new Animator(this.upSprite, 0, 515, 254, 258, 28, 0.03, 0, false, true);
    this.animations["up death"] = new Animator(this.upSprite, 0, 787, 318, 310, 3, 0.2, 0, false, false);

    this.animations["down idle"] = new Animator(this.downSprite, 0, 0, 242, 247, 107, 0.05, 0, false, true);
    this.animations["down run"] = new Animator(this.downSprite, 0, 247, 276, 267, 30, 0.03, 0, false, true);
    this.animations["down attack"] = new Animator(this.downSprite, 0, 514, 265, 267, 28, 0.03, 0, false, true);
    this.animations["down death"] = new Animator(this.downSprite, 0, 781, 318, 309, 3, 0.2, 0, false, false);
  }

  updateBB() {
    this.lastBB = this.BB;
    if (this.state != "death") { //body BB
      this.BB = new BoundingBox(this.x, this.y + 4, 73, 61);
    }
    if (this.hp <= 0) {
      this.BB = null;
    }



  }


  update() {
    if (this.hp <= 0) {
      this.state = "death";
      if (this.animations[this.facing + " " + this.state].frame === 3) {
        this.removeFromWorld = true;
      }
    }

    //side scrolling
    this.x += this.game.camera.x;
    this.y += this.game.camera.y;
    
    this.updateBB();
  }

  draw(ctx) {
    let xOffset = 0; // 0 offset is idle
    let yOffset = 0;
    if (this.state === "attack") {
      if (this.facing === "down") {
        xOffset = -4;
        yOffset = -6;
      } else if (this.facing === "up") {
        xOffset = -2;
        yOffset = -6;
      } else if (this.facing === "left") {
        xOffset = -17;
        yOffset = -7;
      } else {
        xOffset = -2;
        yOffset = -7;
      }
    } else if (this.state === "run" ) {
      if (this.facing === "up" || this.facing === "down") {
        xOffset = -4;
        yOffset = -6;
      } else if (this.facing === "left") {
        xOffset = -3;
        yOffset = -8;
      } else {
        xOffset = -4;
        yOffset = -8;
      }
    } else if (this.state === "death") {
      if (this.facing === "up" || this.facing === "down") {
        xOffset = -12;
        yOffset = -19;
      } else if (this.facing === "left") {
        xOffset = -10;
        yOffset = -23;
      } else {
        xOffset = -15;
        yOffset = -23;
      }
    }
    this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x + xOffset, this.y + yOffset, .3);

    if (PARAMS.DEBUG && this.BB) {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}
