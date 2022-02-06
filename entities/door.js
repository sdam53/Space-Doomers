class Door {
  constructor(game, x, y, w, h, state, direction) {
    Object.assign(this, {game, x, y, w, h, state, direction});
    this.sprites = [];
    this.sprites["unlocked down"] = ASSET_MANAGER.getAsset("./sprites/tiles/door unlocked.png");
    this.updateBB();

    this.mapX = this.x;
    this.mapY = this.y;
  }

  updateBB() {
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    this.leftBB = new BoundingBox(this.x, this.y + 10, 3, this.h - 20);
    this.rightBB = new BoundingBox(this.x + this.w - 3, this.y + 10, 3, this.h - 20); 
    this.topBB = new BoundingBox(this.x + 10, this.y, this.w - 20, 3);
    this.bottomBB = new BoundingBox(this.x + 10, this.y + this.h - 3, this.w - 20, 3);
  }

  update() {
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
      this.updateBB();
  }

  draw(ctx) {
    ctx.drawImage(this.sprites["unlocked down"], this.x, this.y, this.w, this.h);
    if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
      ctx.strokeStyle = 'Brown';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
      //ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
      //ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
      //ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);
      //ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
    }
  }
}