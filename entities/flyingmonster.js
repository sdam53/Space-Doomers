class FlyingMonster {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})

    this.bullet = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_bullet.png");
    this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_up.png");
    this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_down.png");
    this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_left.png");
    this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_right.png");

    this.facing = "down"; // can be left, right, up, down
    this.state = "idle"; // can be idle, run, attack, death

    this.hp = 100;
    this.velocity = {x: 0, y : 0};

    this.bulletSpeed = 2;
    this.bulletRate = 100;
    this.bulletTimer = this.bulletRate;
    this.bulletSize = 30;
    this.bullets = [];

    this.animations = [];
    this.loadAnimations();
    this.updateBB();

    //offset to get the middle of sprite
    this.midPointOffset = {x: 60, y : 38};
  }

  loadAnimations() {
    this.animations["left idle"] = new Animator(this.leftSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
    this.animations["left run"] = new Animator(this.leftSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
    this.animations["left attack"] = new Animator(this.leftSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
    this.animations["left death"] = new Animator(this.leftSprite, 0, 1480, 305, 517, 20, 0.1, 5, false, false); //very wrong

    this.animations["right idle"] = new Animator(this.rightSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
    this.animations["right run"] = new Animator(this.rightSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
    this.animations["right attack"] = new Animator(this.rightSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
    this.animations["right death"] = new Animator(this.rightSprite, 0, 1480, 305, 517, 20, 0.1, 5, true, false); //very wrong

    this.animations["up idle"] = new Animator(this.upSprite, 0, 0, 401, 374, 29, 0.05, 0, false, true);
    this.animations["up run"] = new Animator(this.upSprite, 0, 374, 401, 366, 13, 0.03, 0, false, true);
    this.animations["up attack"] = new Animator(this.upSprite, 0, 740, 449, 387, 25, 0.03, 0, false, true);
    this.animations["up death"] = new Animator(this.upSprite, 0, 1475, 516, 500, 20, 0.1, 0, false, false);

    this.animations["down idle"] = new Animator(this.downSprite, 0, 0, 405, 362, 29, 0.05, 0, false, true);
    this.animations["down run"] = new Animator(this.downSprite, 0, 362, 402, 372, 13, 0.03, 0, false, true);
    this.animations["down attack"] = new Animator(this.downSprite, 0, 734, 440, 366, 25, 0.03, 8, false, true);
    this.animations["down death"] = new Animator(this.downSprite, 0, 1475, 470, 511, 20, 0.1, 42, false, false);


  }

  updateBB() {
    this.lastBB = this.BB;
    if (this.state != "death") { //not done yet
      this.BB = new BoundingBox(this.x + 30, this.y + 8, 60, 60);
    }
    if (this.hp <= 0) {
      this.BB = null;
    }
  }

  fourBulletAtk() { //testing. will be used for boss attacks
    this.game.addBullet(new Bullet(this.game, this.x + 46, this.y + 80, this.bulletSize, this.x + 46, this.y + 1000, this.bulletSpeed, "enemy", this.bullet)); //down
    this.game.addBullet(new Bullet(this.game, this.x + 46, this.y - 34, this.bulletSize, this.x + 46, this.y - 100, this.bulletSpeed, "enemy", this.bullet)); //up
    this.game.addBullet(new Bullet(this.game, this.x - 10 , this.y + 20, this.bulletSize, this.x - 15 , this.y + 20, this.bulletSpeed, "enemy", this.bullet));//left
    this.game.addBullet(new Bullet(this.game, this.x + 105, this.y + 20, this.bulletSize, this.x + 115, this.y + 20, this.bulletSpeed, "enemy", this.bullet));//right
  }

  eightBulletAtk() {
    this.game.addBullet(new Bullet(this.game, this.x + 46, this.y + 80, this.bulletSize, this.x + 46, this.y + 1000, this.bulletSpeed, "enemy", this.bullet)); //down
    this.game.addBullet(new Bullet(this.game, this.x + 46, this.y - 34, this.bulletSize, this.x + 46, this.y - 100, this.bulletSpeed, "enemy", this.bullet)); //up
    this.game.addBullet(new Bullet(this.game, this.x - 10 , this.y + 20, this.bulletSize, this.x - 15 , this.y + 20, this.bulletSpeed, "enemy", this.bullet));//left
    this.game.addBullet(new Bullet(this.game, this.x + 105, this.y + 20, this.bulletSize, this.x + 115, this.y + 20, this.bulletSpeed, "enemy", this.bullet));//right

    this.game.addBullet(new Bullet(this.game, this.x  + 40 + 55 * cos((3 * PI) / 4), this.y + 18 - 55 * sin((3 * PI) / 4), this.bulletSize, this.x + 40 + 100 * cos((3 * PI) / 4), this.y + 18 - 100 * sin((3 * PI) / 4), this.bulletSpeed, "enemy", this.bullet)); //up left
    this.game.addBullet(new Bullet(this.game, this.x + 40 + 55 * cos((3 * PI) / 4), this.y + 29 + 55 * sin((3 * PI) / 4), this.bulletSize, this.x + 40 + 100 * cos((3 * PI) / 4), this.y + 29 + 100 * sin((3 * PI) / 4), this.bulletSpeed, "enemy", this.bullet)); //down left
    this.game.addBullet(new Bullet(this.game, this.x + 51 + 55 * cos((PI) / 4), this.y + 29 + 55 * sin((PI) / 4), this.bulletSize, this.x + 51 + 100 * cos((PI) / 4), this.y + 29 + 100 * sin((PI) / 4), this.bulletSpeed, "enemy", this.bullet)); //down right
    this.game.addBullet(new Bullet(this.game, this.x + 51 + 55 * cos((PI) / 4), this.y + 17 - 55 * sin((PI) / 4), this.bulletSize, this.x + 51 + 100 * cos((PI) / 4), this.y + 17 - 100 * sin((PI) / 4), this.bulletSpeed, "enemy", this.bullet)); //up right
  }

  singleBulletAtlk() {
    if (this.facing === "down") {
    //  this.game.addBullet(new Bullet(this.game, this.x + 35, this.y + 70, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, this.bullet));
    } else if (this.facing === "up") {
      this.game.addBullet(new Bullet(this.game, this.x + 35, this.y - 43, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
    } else if (this.facing === "left") {
      this.game.addBullet(new Bullet(this.game, this.x - 20 , this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
    } else if (this.facing === "right") {
      this.game.addBullet(new Bullet(this.game, this.x + 90, this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
    }
  }

  shotgunAttack() {
  //  let slope =  (this.game.player.y - this.y) / (this.game.player.x - this.x);
    //console.log(this.game.player.y , this.game.player.x, this.x, this.y);
    //slope = slope * PI / 180;
  //  let slope = atan2(this.game.player.x - this.x, this.game.player.y - this.y)
    //this.game.addBullet(new Bullet(this.game, this.x + 200 + 150 * cos(angleRads), this.y + 125 - 150 * sin(angleRads), 5, this.x + 200 + 200 * cos(angleRads), this.y + 125 - 200 * sin(angleRads), 5, this.bullet)); //up left
  //  console.log(slope);

  }

  checkcollision() {

  }

  //used when shooting
  //makes the monster the origin then offsets its real x and y to player
  //then compares x or y values then to the functions f(x) and f(-x)
  //should maybe use player offsets for mindpoint
  calculatedDirection() {
    let player = {x: this.game.player.x - this.x + this.midPointOffset.x, y : this.game.player.y - this.y + this.midPointOffset.y};
    let monster = {x: 0, y : 0};
    if ((player.x < monster.x) && (player.y < (-1) * player.x) && (player.y > player.x)) { //left
      this.facing = "left"
    } else if ((player.x > monster.x) && (player.y > (-1) * player.x) && (player.y < player.x)) {
      this.facing = "right";
    } else if ((player.y > monster.y) && (player.y > (-1) * player.x) && (player.y > player.x)) {
      this.facing = "down";
    } else if ((player.y < monster.y) && (player.y < (-1) * player.x) && (player.y < player.x)) {
      this.facing = "up";
    }
  }

  update() {

    if (this.hp <= 0) {
      this.state = "death"
      if (this.animations[this.facing + " " + this.state].frame === 20) {
        this.removeFromWorld;
      }
    } else {
      //shoots at player when close
      if (getDistance(this.x, this.y, this.game.player.x, this.game.player.y) < 1000) {
        this.calculatedDirection();
        if (this.bulletTimer <= 0) {
          let ran = randomInt(3)
          if (ran === 0) {
            this.singleBulletAtlk();
          } else if (ran === 1) {
            this.fourBulletAtk();
          } else {
            this.eightBulletAtk();
          }
          this.bulletTimer = this.bulletRate;
          this.animations[this.facing + " " + this.state].flag = true;
        }
      }
    }
    //shooting cooldown counter
    if (this.bulletTimer <= this.bulletRate) {
      this.bulletTimer--;
    }

    this.updateBB();
  }

  draw(ctx) {
  // offsets for x and y since images are different sizes
    if (this.state === "death") {
      if (this.facing === "up") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 18, this.y -50, .3);
      } else if (this.facing === "down") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x , this.y - 45, .3);
      } else if (this.facing === "left") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 20, this.y - 55, .3);
      } else {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 15, this.y -55, .3);
      }
    } else {
      if (this.facing === "left") {
          if (this.state === "idle") {
            this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 28, this.y + 2, .3);
        } else if (this.state === "run") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 26, this.y - 3, .3);
        } else if (this.state === "attack") {
            this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x +20, this.y - 37, .3);
        }
      } else if (this.facing === "right") {
        if (this.state === "idle") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 19, this.y, .3);
        } else if (this.state === "run") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 20, this.y - 5, .3);
        } else if (this.state === "attack") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 12, this.y - 39, .3);
        }
      } else if (this.facing === "up") {
        if (this.state === "idle" || this.state === "run") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y - 3, .3);
        } else if (this.state === "attack") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 8, this.y - 8, .3);
        }
      } else if (this.facing === "down") {
        if (this.state === "idle" || this.state === "run" || this.state === "attack") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, .3);
        }
      }
    }
    if (PARAMS.DEBUG && this.BB) {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}
