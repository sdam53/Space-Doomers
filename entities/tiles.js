class Ground {
  constructor(game, x, y, w, h, type) {
    Object.assign(this, {game, x, y, w, h, type})

    this.tile1 = ASSET_MANAGER.getAsset("./sprites/tiles/ground.png");
    this.tile2 = ASSET_MANAGER.getAsset("./sprites/tiles/broken_stone.png");
    this.tile3 = ASSET_MANAGER.getAsset("./sprites/tiles/metal_tile.png");
    this.tile4 = ASSET_MANAGER.getAsset("./sprites/tiles/cracked_tile.png");
    this.trap1 = ASSET_MANAGER.getAsset("./sprites/traps/spike.png");
    this.trap2 = ASSET_MANAGER.getAsset("./sprites/traps/thorn1.png");


    this.wall = ASSET_MANAGER.getAsset("./sprites/tiles/18.png");
    this.corner = ASSET_MANAGER.getAsset("./sprites/tiles/20.png");

    this.size = this.h/20;
    this.tile = this.tile1
    this.trap = this.trap1
  }

  updateBB() {
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
  }

  update() {
    this.updateBB();
  }

  draw(ctx) {
    ctx.drawImage(this.tile, this.x, this.y, this.w, this.h);
    if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
      ctx.strokeStyle = 'Green';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
/*
    for (let x1 = this.x ; x1 < this.w; x1+=this.size)
    {
        for (let y1 = this.y ; y1 < this.h; y1+=this.size){
          //draw wall on the left
          if (x1 == this.x && y1 > this.y && y1 < this.h-this.size){
            ctx.drawImage(this.wall, 0, 0, 69, 111, x1, y1, this.size, this.size);
          }
          //draw wall on the right
          else if (x1 == this.w-this.size && y1 > this.y && y1 < this.h-this.size){
            ctx.drawImage(this.wall, 0, 0, 69, 111, x1, y1, this.size, this.size);
          }
          //draw wall on the top
          else if (y1 == this.y && x1 >= this.x + this.size && x1 < this.w - this.size){
            ctx.drawImage(this.wall, 0, 0, 69, 111, x1, y1, this.size, this.size);
          }
          //draw wall on the bottom
          else if (y1 == this.h-this.size && x1 >= this.x + this.size && x1 < this.w - this.size){
            ctx.drawImage(this.wall, 0, 0, 69, 111, x1, y1, this.size, this.size);
          }
          //corner
          else if (x1 == this.w-this.size || x1 == this.x || y1 == this.h-this.size || y1 == this.w-this.size){
            ctx.drawImage(this.corner, 0, 0, 138, 125, x1, y1, this.size, this.size);
          }
          else{
            ctx.drawImage(this.tile, 0, 0, 150, 150, x1, y1, this.size, this.size);
          }
        }
    }
    */
    }
}

class Wall {
  constructor(game, x, y, w, h, type) {
    Object.assign(this, {game, x, y, w, h, type})
    this.updateBB();

  }

  updateBB() {
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    this.leftBB = new BoundingBox(this.x, this.y + 10, 3, this.h - 20);
    this.rightBB = new BoundingBox(this.x + this.w - 3, this.y + 10, 3, this.h - 20); 
    this.topBB = new BoundingBox(this.x + 10, this.y, this.w - 20, 3);
    this.bottomBB = new BoundingBox(this.x + 10, this.y + this.h - 3, this.w - 20, 3);
  }

  update() {
    this.updateBB();
  }

  draw(ctx) {
    if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
      ctx.strokeStyle = 'Brown';
      // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
      ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
      ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
      ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);
      ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
    }
  }
}
