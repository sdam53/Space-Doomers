class Minimap {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});
        this.game.minimap = this;
    };

    update(){

    };

    draw(ctx){
        ctx.strokeStyle="White";
        // ctx.strokeRect(this.y, this.x, PARAMS.CANVAS_WIDTH/PARAMS.BITWIDTH, PARAMS.CANVAS_HEIGHT/PARAMS.BITWIDTH);
        ctx.strokeRect(this.y, this.x, MAPONE.MAP[0].length*125/PARAMS.BITWIDTH, MAPONE.MAP.length*125/PARAMS.BITWIDTH);
        this.game.entities.tiles.forEach((tile, i) => {
            tile.drawMinimap(ctx, this.y, this.x);
          });
        this.game.entities.player.drawMinimap(ctx, this.y, this.x);
        this.game.entities.enemies.forEach((enemy, i) => {
            enemy.drawMinimap(ctx, this.y, this.x);
          });
        this.game.entities.powerup.forEach((powerup, i) => {
            powerup.drawMinimap(ctx, this.y, this.x);
          });  
        this.game.entities.portal.forEach((portal, i) => {
            portal.drawMinimap(ctx, this.y, this.x);
          });
        
        for (var i = 0; i < 5; i++){
            this.game.entities.player.drawMinimap(ctx, this.x, this.y);
        }
    };
}
