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

class FogOfWar {
    constructor(game,x,y,r){
        Object.assign(this, {game, x, y, r});

        let darkness = 1;
        let fogness = .5;
        let dark_color = "black";
        let fog_color = "black";
        let global_vision = [];
        let width = 700;
        let height = 700;

        //Entity variables
        let entity_size = 20;
        let entities = [];
        let entity_color = "yellow";
        let entity_spacing = 100;
        let entity_vision_radius = 150;
        for(let i = 0; i < width/(entity_size+entity_spacing); i++){
            for(let j = 0; k<height/(entity_size+entity_spacing); j++){
                entities.push({
                    x:i*(entity_size+entity_spacing),
                    y:j*(entity_size+entity_spacing)
                });
            }
        }


    }

    draw(ctx){
        //pos is the current coordinate of the player
        this.pos = {x: this.game.entities.player.mMapX, y : this.game.entities.player.mMapY};
        let x = pos.x;
        let y = pos.y;

        // let default_gco = 
    }

    update(){

    }


}
