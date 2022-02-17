class Minimap {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});
        this.game.minimap = this;
        this.miniMap_size = 250;
    };

    update(){

    };

    draw(ctx){
        ctx.strokeStyle="White";

        let level = this.game.camera.level;
        let level_w = level.map[0].length;
        let level_h = level.map.length;
        var x = this.miniMap_size;
        var y = this.miniMap_size;
        var size = 50;
        if (this.miniMap_size/level_w > this.miniMap_size/level_h){
            size = this.miniMap_size/level_h;
        }
        else{
            size = this.miniMap_size/level_w;
        }
        x = this.x + (this.miniMap_size - size * level_h)/2;
        y = this.y + (this.miniMap_size - size * level_w)/2;

        PARAMS.BITWIDTH = 125/size;

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.y, this.x, this.miniMap_size, this.miniMap_size);

        // ctx.strokeRect(this.y, this.x, level.map[0].length * 125 / PARAMS.BITWIDTH, level.map.length * 125 / PARAMS.BITWIDTH);
        ctx.strokeRect(this.y, this.x, this.miniMap_size, this.miniMap_size);
        this.game.entities.tiles.forEach((tile, i) => {
            tile.drawMinimap(ctx, y, x);
          });
          
        this.game.entities.player.drawMinimap(ctx, y, x);
        this.game.entities.enemies.forEach((enemy, i) => {
            enemy.drawMinimap(ctx, y, x);
          });
        this.game.entities.powerups.forEach((powerup, i) => {
            powerup.drawMinimap(ctx, y, x);
          });  
        // this.game.entities.portals.forEach((portal, i) => {
        //     portal.drawMinimap(ctx, y, x);
        //   });  
        
        // this.game.entities.traps.forEach((trap, i)=>{
        //     trap.drawMinimap(ctx, y,x);
        // }
        // )
    };

    checkInCircle(a, b, x, y, r){

        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
        r *= r;

        if (dist_points < r) {
            return true;
        }

        return false;
    }

}
