class GreenMonster {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})

  }


  update() {

  }

  draw(ctx) {

  }

  drawMinimap(ctx, mmX, mmY){
    // ctx.fillStyle = "White";
    // ctx.fillRect(mmX + this.BB.x / PARAMS.BITWIDTH, mmY + this.BB.y / PARAMS.BITWIDTH, this.BB.width / PARAMS.BITWIDTH, PARAMS.SCALE * 20);
  }
}
