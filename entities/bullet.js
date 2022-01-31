class Bullet {
  /*
  game: game engine
  x: x start location
  y: y start location
  size: desired height/width of image
  xTarget: x target location
  yTarget: y target location
  bulletSpeed: speed of bullet
  type: bullet's side (enemy/player)
  image: bullet image
  */
  constructor(game, x, y, size, xTarget, yTarget, bulletSpeed, type, image) {
    Object.assign(this, {game, x, y, size, xTarget, yTarget, bulletSpeed, type, image});
    this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
    this.xBulletDir = (this.xTarget - this.x) / this.distance;
    this.yBulletDir = (this.yTarget - this.y) / this.distance;
    this.updateBB();
  }

  updateBB() {
    this.BB = new BoundingBox(this.x, this.y, this.size, this.size);
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
    if (PARAMS.DEBUG) {
        ctx.strokeStyle = 'Blue';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }

  }

  //checks if bullet has hit wall.
  checkWallCollision() {
    let count = 0;
    this.game.entities.tiles.forEach((tiles, i) => {
      if ((tiles instanceof Wall) && (tiles.BB.collide(this.BB))) {
        count++;
      }
    });
    return (count >= 1);
  }

  update() {
    //destroys bullet if hits a wall
    if (this.checkWallCollision()) {
      this.destroy();
    } else {
      this.x += this.bulletSpeed * this.xBulletDir;
      this.y += this.bulletSpeed * this.yBulletDir;
    }
    //destroys bullet if out of map
    if (this.x < 0 || this.x > PARAMS.CANVAS_WIDTH) {
      this.destroy();
    }
    if (this.y < 0 || this.y > PARAMS.CANVAS_HEIGHT) {
      this.destroy();
    }
    //damage to enemy
    this.game.entities.enemies.forEach((enemy, i) => {
      if ((enemy.BB != null) && enemy.BB.collide(this.BB) && (this.type === "player")) {
        this.destroy();
        enemy.hp -= 35;
      }
    });
    //damage to player
    if (!PARAMS.GODMODE) {
      if (this.game.player.BB.collide(this.BB) && (this.type == "enemy")) {
        this.destroy();
        this.game.player.hp -= 10;
      }
    }
    this.updateBB();
    this.x += this.game.camera.x;
    this.y += this.game.camera.y;
  }

  destroy() {
      this.removeFromWorld = true;
  }
}
