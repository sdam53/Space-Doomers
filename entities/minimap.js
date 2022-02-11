class Minimap {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});
        this.game.minimap = this;
    };

    update(){

    };

    draw(ctx){
        ctx.strokeStyle="White";

        let level = this.game.camera.level;
        let level_w = level.map[0].length;
        let level_h = level.map.length;
        var x = 250;
        var y = 250;
        var size = 50;
        if (250/level_w > 250/level_h){
            size = 250/level_h;
        }
        else{
            size = 250/level_w;
        }
        x = this.x + (250 - size * level_h)/2;
        y = this.y + (250 - size * level_w)/2;

        PARAMS.BITWIDTH = 125/size;

        // ctx.strokeRect(this.y, this.x, level.map[0].length * 125 / PARAMS.BITWIDTH, level.map.length * 125 / PARAMS.BITWIDTH);
        ctx.strokeRect(this.y, this.x, 250, 250);
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
        // this.game.entities.traps.forEach((trap, i)=>{
        //     trap.drawMinimap(ctx, y,x);
        // }
        // )
    };
}
