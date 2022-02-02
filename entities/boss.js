class Boss {
    constructor(game, x, y) {
      Object.assign(this, {game, x, y})

      this.facing = "up";
	  this.status = "death";

	  this.hp = 100;

	  this.moveSpeed = 0.5;

	  this.bulletSpeed = 2;
	  this.bulletRate = 100;
	  this.bulletTimer = this.bulletRate;
	  this.bulletSize = 30;

	  this.animations = [];
	  this.loadAnimations();
	  this.updateBB();

	  //offset to get the middle of sprite
	  this.midPointOffset = {x: 60, y : 38};
    }

	loadAnimations () {
		this.bulletSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_bullet.png");

		this.leftIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left idle.png");
		this.leftRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left run.png");
		this.leftAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left attack.png");
		this.leftDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss left/boss left death.png");

		this.rightIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right idle.png");
		this.rightRunSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right run.png");
		this.rightAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right attack.png");
		this.rightDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss right/boss right death.png");

		this.upIdleSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up idle.png");
		this.upRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up run.png");
		this.upAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up attack.png");
		this.upDeathSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss up/boss up death.png");

		this.downIdleSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down idle.png");
		this.downRunSprite 		= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down run.png");
		this.downAttackSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down attack.png");
		this.downDeathSprite 	= ASSET_MANAGER.getAsset("./sprites/enemies/boss/boss down/boss down death.png");

		this.animations["left idle"] 	= new Animator(this.leftIdleSprite, 0, 0, 403, 603, 36, 0.04, 0, false, true);
		this.animations["left run"] 	= new Animator(this.leftRunSprite, 0, 0, 405, 659, 20, 0.03, 0, false, true);
		this.animations["left attack"] 	= new Animator(this.leftAttackSprite, 0, 0, 657, 711, 25, 0.04, 0, false, true);
		this.animations["left death"] 	= new Animator(this.leftDeathSprite, 0, 0, 489, 925, 17, 0.05, 0, false, true); // change loop to false

		this.animations["right idle"] 	= new Animator(this.rightIdleSprite, 0, 0, 403, 603, 36, 0.04, 0, false, true);
		this.animations["right run"] 	= new Animator(this.rightRunSprite, 0, 0, 405, 659, 20, 0.03, 0, false, true);
		this.animations["right attack"] = new Animator(this.rightAttackSprite, 0, 0, 657, 711, 25, 0.04, 0, false, true);
		this.animations["right death"] 	= new Animator(this.rightDeathSprite, 0, 0, 489, 925, 17, 0.05, 0, true, true); // change loop to false

		this.animations["up idle"] 		= new Animator(this.upIdleSprite, 0, 0, 753, 640, 36, 0.04, 0, false, true);
		this.animations["up run"] 		= new Animator(this.upRunSprite, 0, 0, 847, 671, 20, 0.03, 0, false, true);
		this.animations["up attack"] 	= new Animator(this.upAttackSprite, 0, 0, 821, 746, 25, 0.04, 0, false, true);
		this.animations["up death"] 	= new Animator(this.upDeathSprite, 0, 0, 835, 980, 17, 0.05, 0, false, true); // change loop to false

		this.animations["down idle"] 	= new Animator(this.downIdleSprite, 0, 0, 754, 628, 36, 0.04, 0, false, true);
		this.animations["down run"] 	= new Animator(this.downRunSprite, 0, 0, 845, 657, 20, 0.03, 0, false, true);
		this.animations["down attack"] 	= new Animator(this.downAttackSprite, 0, 0, 894, 728, 25, 0.04, 0, false, true);
		this.animations["down death"] 	= new Animator(this.downDeathSprite, 0, 0, 873, 970, 17, 0.05, 0, false, true); // change loop to false
	}

	updateBB() {
		this.lastBB = this.BB;
		if (this.state != "death") {
			this.BB = new BoundingBox(this.x, this.y, 80, 80);
		} 
		if (this.hp <= 0) {
			this.BB = null;
		}
	}

	fourBulletAtk(radius) { 
		let xStart = this.x + 45;//offsets needed to get to center of sprite
		let yStart = this.y + 20;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), this.bulletSize, xStart + 2 * radius * cos(PI /2) , yStart + 2 * radius * sin(PI /2), this.bulletSpeed, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), this.bulletSize, xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSpeed, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), this.bulletSize, xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSpeed, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), this.bulletSize, xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSpeed, "enemy", this.bullet)); //down"
	  }
	
	  eightBulletAtk(radius) {
		let xStart = this.x + 45;//offsets needed to get to center of sprite
		let yStart = this.y + 20;
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /2), yStart + radius * sin(PI /2), this.bulletSize, xStart + 2 * radius * cos(PI /2) , yStart + 2 * radius * sin(PI /2), this.bulletSpeed, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI), yStart + radius * sin(PI), this.bulletSize, xStart + 2 * radius * cos(PI) , yStart + 2 * radius * sin(PI), this.bulletSpeed, "enemy", this.bullet)); //left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(0), yStart + radius * sin(0), this.bulletSize, xStart + 2 * radius * cos(0) , yStart + 2 * radius * sin(0), this.bulletSpeed, "enemy", this.bullet)); //right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 2), yStart + radius * sin(3 * PI / 2), this.bulletSize, xStart + 2 * radius * cos(3 * PI / 2) , yStart + 2 * radius * sin(3 * PI / 2), this.bulletSpeed, "enemy", this.bullet)); //down
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(PI /4), yStart + radius * sin(PI /4), this.bulletSize, xStart + 2 * radius * cos(PI /4) , yStart + 2 * radius * sin(PI /4), this.bulletSpeed, "enemy", this.bullet)); //down right
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(3 * PI / 4), yStart + radius * sin(3 * PI / 4), this.bulletSize, xStart + 2 * radius * cos(3 * PI / 4) , yStart + 2 * radius * sin(3 * PI / 4), this.bulletSpeed, "enemy", this.bullet)); //down left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(5 * PI / 4), yStart + radius * sin(5 * PI / 4), this.bulletSize, xStart + 2 * radius * cos(5 * PI / 4) , yStart + 2 * radius * sin(5 * PI / 4), this.bulletSpeed, "enemy", this.bullet)); //up left
		this.game.addBullet(new Bullet(this.game, xStart + radius * cos(7 * PI / 4), yStart + radius * sin(7 * PI / 4), this.bulletSize, xStart + 2 * radius * cos(7 * PI / 4) , yStart + 2 * radius * sin(7 * PI / 4), this.bulletSpeed, "enemy", this.bullet)); //up right
	  }

	singleBulletAtlk() {
		if (this.facing === "down") {
		  this.game.addBullet(new Bullet(this.game, this.x + 35, this.y + 70, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
		} else if (this.facing === "up") {
		  this.game.addBullet(new Bullet(this.game, this.x + 35, this.y - 43, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
		} else if (this.facing === "left") {
		  this.game.addBullet(new Bullet(this.game, this.x - 20 , this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
		} else if (this.facing === "right") {
		  this.game.addBullet(new Bullet(this.game, this.x + 90, this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, "enemy", this.bullet));
		}
	}

	calculatedDirection() {
		let player = {x: this.game.player.x - this.x + this.midPointOffset.x, y : this.game.player.y - this.y + this.midPointOffset.y};
		let monster = {x: 0, y : 0};
		if ((player.x < monster.x) && (player.y < (-1) * player.x) && (player.y > player.x)) { //left
		  this.facing = "left"
		} else if ((player.x > monster.x) && (player.y > (-1) * player.x) && (player.y < player.x)) {
		  this.facing = "right";
		} else if ((player.y > monster.y) && (player.y > (-1) * player.x) && (player.y > player.x)) {
		  this.facing = "down";
		} else if ((player.y < monster.y) && (player.y < (-1) * player.x) && (player.y < player.x)) {
		  this.facing = "up";
		}
	}

	shoot() {
		this.calculatedDirection();
		if (this.bulletTimer <= 0) {
		  let ran = randomInt(3)
		if (ran === 0) {
		  this.singleBulletAtlk();
		} else if (ran === 1) {
		  this.fourBulletAtk();
		} else {
		  this.eightBulletAtk();
		}
		  this.bulletTimer = this.bulletRate;
		  this.animations[this.facing + " " + this.state].flag = true;
		}
		this.getPath();
	}

    update() {
		
		/*
		if (this.hp <= 0) {
		  this.state = "death"
		  if (this.animations[this.facing + " " + this.state].frame === 19) {
			this.removeFromWorld = true;
		  }
		} else {
		  if (this.path && (typeof this.path[0] != 'undefined')) {
			if (this.path.length <= 5) {
			  this.shoot();
			} else if (this.path.length <= 10) {
			  this.move()
			} else {
			  this.getPath()
			}
		  } else {
			this.getPath();
		  }
		}
		*/
	  
		if (this.bulletTimer <= this.bulletRate) {
		  this.bulletTimer--;
		}
	
		this.updateBB();

		this.x += this.game.camera.x;
		this.y += this.game.camera.y; 
	}

    draw(ctx) {
		let xOffset, yOffset;

		if (this.state == "death") {
			if (this.facing == "up") xOffset = 10, yOffset = 10;
			else if (this.facing == "down") xOffset = 10, yOffset = 10;
			else if (this.facing == "left") xOffset = 10, yOffset = 10;
			else if (this.facing == "right") xOffset = 10, yOffset = 10;
		} else if (this.state != "death") {
			if (this.facing == "left") {
				if (this.state == "idle") xOffset = 10, yOffset = 10;
				else if (this.state == "run") xOffset = 10, yOffset = 10;
				else if (this.state == "attack") xOffset = 10, yOffset = 10;
			} else if (this.facing == "right") {
				if (this.state == "idle")  xOffset = 10, yOffset = 10 ;
				else if (this.state == "run") xOffset = 10, yOffset = 10;
				else if (this.state == "attack") xOffset = 10, yOffset = 10;
			} else if (this.facing == "up") {
				if (this.state == "idle") xOffset = 10, yOffset = 10;
				else if (this.state == "run") xOffset = 10, yOffset = 10;
				else if (this.state == "attack") xOffset = 10, yOffset = 10;
			} else if (this.facing == "down") {
				if (this.state == "idle") xOffset = 10, yOffset = 10;
				else if (this.state == "run") xOffset = 10, yOffset = 10;
				else if (this.state == "attack") xOffset = 10, yOffset = 10;
			}
		}

		xOffset = 0;
		yOffset = 0;

		this.animations[this.facing + " " + this.status].drawFrame(this.game.clockTick, ctx, this.x + xOffset, this.y + yOffset, 0.3);

		if (PARAMS.DEBUG && this.BB) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
    }
}
