class Ground {
  constructor(game, x, y, w, h, type) {
    Object.assign(this, {game, x, y, w, h, type})

    this.tile = ASSET_MANAGER.getAsset("./sprites/tiles/ground.png");
    this.wall = ASSET_MANAGER.getAsset("./sprites/tiles/18.png");
    this.corner = ASSET_MANAGER.getAsset("./sprites/tiles/20.png");
    this.size = this.h/20;
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
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    this.updateBB();

  }

  updateBB() {
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
  }

  update() {
    this.updateBB();
  }
  draw(ctx) {
    if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
      console.log(this.BB !=null);
      ctx.strokeStyle = 'Brown';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}
