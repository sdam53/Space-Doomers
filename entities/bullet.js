class Bullet {
	/*
	game: game engine
	x: x start location
	y: y start location
	xTarget: x target location
	yTarget: y target location
	size: desired height/width of image
	bulletSpeed: speed of bullet
	ricochet: value for how many times to ricochet
	type: bullet's side (enemy/player)
	image: bullet image
	*/
	constructor(game, x, y, xTarget, yTarget, size, bulletSpeed, ricochet, type, image) {
		Object.assign(this, {game, x, y, xTarget, yTarget, size, bulletSpeed, ricochet, type, image});
		this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
		this.xBulletDir = (this.xTarget - this.x) / this.distance;
		this.yBulletDir = (this.yTarget - this.y) / this.distance;
		this.updateBB();
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.size, this.size);
	}
	
	//checks if bullet has hit wall.
	checkWallCollision() {
		let collide = [false, false];
		this.game.entities.tiles.forEach((tiles) => {
			if ((tiles instanceof Wall) && (tiles.BB.collide(this.BB))) {
				collide[0] = true;
				if (tiles.leftBB.collide(this.BB) || tiles.rightBB.collide(this.BB)) {
					collide[1] = "vertical";
				} else {
					collide[1] = "horizontal";
				}
				return;
			}
		});
		return collide;
	}
	
	update() {
		const TICK = this.game.clockTick;
		let collide = this.checkWallCollision()
		//destroys bullet if hits a wall
		if (collide[0]) {
			if (this.ricochet <= 0) {
				this.destroy();
				return;
			} else {
				if (collide[1] === "vertical") {
					this.xBulletDir *= -1
				} else {
					this.yBulletDir *= -1
				}
				this.ricochet--;
			}
		} 
		this.x += this.bulletSpeed * this.xBulletDir * TICK;
		this.y += this.bulletSpeed * this.yBulletDir * TICK;
		//damage to enemy
		this.game.entities.enemies.forEach((enemy, i) => {
			if ((enemy.BB != null) && enemy.BB.collide(this.BB) && (this.type === "player")) {
				this.destroy();
				enemy.hp -= 35;
				if (enemy instanceof FlyingMonster) {
					ASSET_MANAGER.playAsset("./music/flying monster death sound 200.wav");
				}
			}
		});
		//damage to player
		if (!PARAMS.GODMODE) {
			if (this.game.player.BB.collide(this.BB) && (this.type == "enemy")) {
				this.destroy();
				this.game.player.hp -= 10;
			}
		}
		this.updateBB();
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
		
	}
	
	destroy() {
		this.removeFromWorld = true;
	}
}
