class Gear {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.game = game;
      this.x = x;
      this.y = y;
      this.mapX = x;
      this.mapY = y;
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/gear.png");
      //check if the object is reveal on the map
		  this.reveal = false;
      // xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      this.animation = new Animator(this.spritesheet, 1, 1, 16, 16, 12, 0.3, 0, false, true);
      this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 9, 83, 88);
    }

    update() {
      this.updateBB();
      this.x += this.game.camera.x;
      this.y += this.game.camera.y;
    }

    draw(ctx){
      //fog of war
		let x = this.game.entities.player.mapX;
		let y = this.game.entities.player.mapY;
		if (this.game.entities.minimap.checkInCircle(this.mapX , this.mapY, x, y, PARAMS.FOW_M_R)){
        ctx.drawImage(
          this.spritesheet,
            1, 1, //source from sheet
            83, 88,
            this.x + 20, this.y + 9,
            83,
            88);
        }
        if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Blue';
          ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

 

    drawMinimap(ctx, mmX, mmY){
      // let x = this.game.entities.player.mMapX;
      // let y = this.game.entities.player.mMapY;
    
      // if (this.game.entities.minimap.checkInCircle(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, x, y, 50)){
      //   this.reveal = true;
      //   ctx.fillStyle = "Yellow";
      //   }
      //   else{
      //       ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      // }
      // if (this.reveal)
      // ctx.fillRect(mmX + this.mapX / PARAMS.BITWIDTH, mmY + this.mapY / PARAMS.BITWIDTH, 100/PARAMS.BITWIDTH , 100/PARAMS.BITWIDTH);
    }
  }
