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
  constructor(game, x, y, size, xTarget, yTarget, bulletSpeed, image) {
    Object.assign(this, {game, x, y, size, xTarget, yTarget, bulletSpeed, image});
    //this.updateBB();
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

  update() {
    this.x += this.bulletSpeed * this.xBulletDir;
    this.y += this.bulletSpeed * this.yBulletDir;
    this.updateBB();

  }

  destroy() {
      this.removeFromWorld = true;
  }
}
