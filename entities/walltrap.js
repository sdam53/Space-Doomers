/**
 * class representing wall trap that shoots bullets through hall
 */
class WallTrap {
    /**
     * 
     * @param {*} game game engine 
     * @param {*} x x location
     * @param {*} y y location
     * @param {*} direction direction of bullets
     */
	constructor(game, x, y, direction, bulletRate) {
		Object.assign(this, {game, x, y, direction, bulletRate});
		//this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles/x wall.png");
		//will work on sprites later
        this.bullet = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_bullet.png");
        //this.updateBB();
        this.radius = 85;
        this.bulletSpeed = 300;
		this.bulletTimer = 0;
		this.bulletSize = 30;
		
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y , this.w, this.h);
	}
	
	update() {
		//this.updateBB();
        if (this.bulletTimer <= 0) {
            switch (this.direction) {
                case "left":
                    this.game.addBullet(new Bullet(this.game, this.x + 47.5 + this.radius * cos(PI), this.y + 47.5 + this.radius * sin(PI), this.x + 47.5 + 2 * this.radius * cos(PI) , this.y + 47.5 + 2 * this.radius * sin(PI), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //left
                    break;
                case "right":
                    this.game.addBullet(new Bullet(this.game, this.x + 47.5 + this.radius * cos(0), this.y + 47.5 + this.radius * sin(0), this.x + 47.5 + 2 * this.radius * cos(0) , this.y + 47.5 + 2 * this.radius * sin(0), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //right
                    break;
                case "up":
                    this.game.addBullet(new Bullet(this.game, this.x + 47.5 + this.radius * cos(3 * PI / 2), this.y + 47.5 + this.radius * sin(3 * PI / 2), this.x + 47.5 + 2 * this.radius * cos(3 * PI / 2) , this.y + 47.5 + 2 * this.radius * sin(3 * PI / 2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //up
                    break;
                case "down":
                    this.game.addBullet(new Bullet(this.game, this.x + 47.5 + this.radius * cos(PI /2) , this.y + 47.5 + this.radius * sin(PI /2), this.x + 47.5 + 2 * this.radius * cos(PI /2) , this.y + 47.5 + 2 * this.radius * sin(PI /2), this.bulletSize, this.bulletSpeed, 0, "enemy", this.bullet)); //down
                    break;
            }
            this.bulletTimer = this.bulletRate;
        } else {
            this.bulletTimer -= this.game.clockTick;
        }
        this.x += this.game.camera.x;
		this.y += this.game.camera.y;
	}
	
	draw(ctx) {
		//ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
		if (PARAMS.DEBUG && (typeof this.BB != 'undefined')) {
			ctx.strokeStyle = 'Brown';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}
}