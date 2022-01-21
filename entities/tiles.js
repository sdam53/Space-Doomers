class Ground {
  constructor(game, x, y, w, h, type) {
    Object.assign(this, {game, x, y, w, h, type})

    this.ground = ASSET_MANAGER.getAsset("./sprites/tiles/ground.png");
    this.size = 50;
  }


  update() {

  }

  draw(ctx){
    for (let x1 = this.x; x1 < this.w; x1+=this.size)
    {
        for (let y1 = this.y; y1 < this.h; y1+=this.size){
            ctx.drawImage(this.ground, 0, 0, 150, 150, x1, y1, this.size, this.size);
        }
    }
}
}
