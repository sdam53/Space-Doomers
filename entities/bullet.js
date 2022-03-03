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
	shotgun: tuple with whether its shotgun shot and how much spread
	type: bullet's side (enemy/player)
	image: bullet image
	*/
	constructor(game, x, y, xTarget, yTarget, size, bulletSpeed, ricochet, shotgun, type, image) {
		Object.assign(this, {game, x, y, xTarget, yTarget, size, bulletSpeed, ricochet, shotgun, type, image});
		this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
		this.xBulletDir = (this.xTarget - this.x) / this.distance;
		this.yBulletDir = (this.yTarget - this.y) / this.distance;
		this.updateBB();
		if (this.shotgun.shotgun) {
			this.bulletSpeed *= 1.5;
			this.shotgunAtk();
		}
	}
	
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.size, this.size);
	}
	
	shotgunAtk() {
		let end = {x: this.xTarget - this.x, y: this.yTarget - this.y};
		let angle = atan2(end.y, end.x);
		let angleOffset = 0;
		for (let i = 0; i < this.shotgun.amount; i++) {
			angleOffset += (PI/32);
			this.game.addBullet(new Bullet(this.game, 
				this.x + cos(angle), this.y + sin(angle), 
				this.x + 2 * cos(angle - angleOffset), this.y + 2 * sin(angle - angleOffset),
				this.size, this.bulletSpeed, this.ricochet, false, this.type, this.image));
			this.game.addBullet(new Bullet(this.game, 
				this.x + cos(angle), this.y + sin(angle), 
		   		this.x + 2 * cos(angle + angleOffset), this.y + 2 * sin(angle + angleOffset),
		   		this.size, this.bulletSpeed, this.ricochet, false, this.type, this.image));
		}
	}

	//checks if bullet has hit wall.
	checkWallCollision() {
		var that = this;
		this.game.entities.tiles.forEach((tiles) => {
			if ((tiles instanceof Wall) && (tiles.BB.collide(that.BB))) {
				if (that.ricochet > 0) {
					if (tiles.leftBB.collide(that.BB) || tiles.rightBB.collide(that.BB)) {
						that.xBulletDir *= -1;
					} else {
						that.yBulletDir *= -1;
					}
					that.ricochet--;
					return;
				} else {
					that.removeFromWorld = true;
					return;
				}
			}
		});
	}

	checkDoorCollision() {
		let doors = this.game.entities.portals;
		for (let i = 0; i < doors.length; i++) {
			if (doors[i] instanceof Door && doors[i].state != "open" && this.BB.collide(doors[i].BB2)) {
				if (this.ricochet > 0) {
					if (doors[i].direction === "left" || doors[i].direction === "right") {
						this.xBulletDir *= -1;
					} else {
						this.yBulletDir *= -1;
					}
					this.ricochet--; 
					break;
				} else {
					this.removeFromWorld = true;
					return;
				}	
			}
		}
		return true;
	}
	
	update() {
		const TICK = this.game.clockTick;
		//checks if hits wall and if ricochet
		this.checkWallCollision()
		//checks if hits closed door and if ricochet
		this.checkDoorCollision();
		
		//damage to enemy
		this.game.entities.enemies.forEach((enemy, i) => {
			if ((enemy.BB != null) && enemy.BB.collide(this.BB) && (this.type === "player")) {
				this.removeFromWorld = true;
				enemy.hp -= 35;
				if (enemy instanceof FlyingMonster || enemy instanceof RedMonster) {
					ASSET_MANAGER.playAsset("./music/flying monster death sound 200.wav");
				}
				if (enemy instanceof GreenMonster || enemy instanceof BlueMonster) {
					ASSET_MANAGER.playAsset("./music/slime.wav");
				}
				if (enemy instanceof Boss) {
					ASSET_MANAGER.playAsset("./music/boss.wav");
				}
				if (enemy instanceof Smol) {
					ASSET_MANAGER.playAsset("./music/player death sound 200.mp3");
				}
			}
		});

		// damage to boss
		this.game.entities.bosses.forEach((enemy, i) => {
			if ((enemy.BB != null) && enemy.BB.collide(this.BB) && (this.type === "player")) {
				this.removeFromWorld = true;
				enemy.hp -= 35;
				if (enemy instanceof FlyingMonster || enemy instanceof RedMonster) {
					ASSET_MANAGER.playAsset("./music/flying monster death sound 200.wav");
				}
				if (enemy instanceof GreenMonster || enemy instanceof BlueMonster) {
					ASSET_MANAGER.playAsset("./music/slime.wav");
				}
				if (enemy instanceof Boss) {
					ASSET_MANAGER.playAsset("./music/boss.wav");
				}
				if (enemy instanceof Smol) {
					ASSET_MANAGER.playAsset("./music/player death sound 200.mp3");
				}
			}
		});
		//damage to player
		if (!PARAMS.GODMODE) {
			if (this.game.player.BB.collide(this.BB) && (this.type == "enemy")) {
				this.removeFromWorld = true;
				this.game.player.calculateDamage(10);
			}
		}
		this.x += this.bulletSpeed * this.xBulletDir * TICK;
		this.y += this.bulletSpeed * this.yBulletDir * TICK;
		this.x += this.game.camera.x;
		this.y += this.game.camera.y;
		this.updateBB();
	}

	draw(ctx) {

		ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
		
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
		
	}
}
