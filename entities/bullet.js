class Bullet {
  /*
  game: game engine
  x: x start location
  y: y start location
  radius:
  xTarget: x target location
  yTarget: y target location
  bulletSpeed: speed of bullet
  image: bullet image
  */
  constructor(game, x, y, radius, xTarget, yTarget, bulletSpeed, image) {
    Object.assign(this, {game, x, y, radius, xTarget, yTarget, bulletSpeed, image});
    //this.updateBB();
    this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
    this.xBulletDir = (this.xTarget - this.x) / this.distance;
    this.yBulletDir = (this.yTarget - this.y) / this.distance;

  }

  updateBB() {
    //this.BB = new BoundingBox(this.x, this.y, w, h);
  }

  draw(ctx) {

    //this.image.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.3);
    ctx.drawImage(this.image, this.x, this.y)



  }

  update() {
    this.x += this.bulletSpeed * this.xBulletDir;
    this.y += this.bulletSpeed * this.yBulletDir;
    this.updateBB();

  }

  destroy() {
      this.removeFromWorld = true;
  }
}
