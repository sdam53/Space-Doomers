const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tiles/ground.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/portal.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/gear.png");
ASSET_MANAGER.queueDownload("./sprites/traps/spike.png");
ASSET_MANAGER.queueDownload("./sprites/traps/thorn1.png");
ASSET_MANAGER.queueDownload("./sprites/traps/thorn_bottom.png");
ASSET_MANAGER.queueDownload("./sprites/traps/wall bullet.png");

// hp and armor overlay 
ASSET_MANAGER.queueDownload("./sprites/overlay/health overlay.png");
ASSET_MANAGER.queueDownload("./sprites/overlay/armor overlay.png");

// wall trap cannons
ASSET_MANAGER.queueDownload("./sprites/traps/wall trap left.png");
ASSET_MANAGER.queueDownload("./sprites/traps/wall trap right.png");
ASSET_MANAGER.queueDownload("./sprites/traps/wall trap up.png");
ASSET_MANAGER.queueDownload("./sprites/traps/wall trap down.png");

// shield powerup
ASSET_MANAGER.queueDownload("./sprites/player/active shield.png");

ASSET_MANAGER.queueDownload("./sprites/door/door_shut.png");
ASSET_MANAGER.queueDownload("./sprites/door/door_open.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/x wall.png");
ASSET_MANAGER.queueDownload("./images/cursor.png");

// door sprites
ASSET_MANAGER.queueDownload("./sprites/door/door open down.png");
ASSET_MANAGER.queueDownload("./sprites/door/door open left.png");
ASSET_MANAGER.queueDownload("./sprites/door/door open right.png");
ASSET_MANAGER.queueDownload("./sprites/door/door unlocked down.png");
ASSET_MANAGER.queueDownload("./sprites/door/door unlocked left.png");
ASSET_MANAGER.queueDownload("./sprites/door/door unlocked right.png");
ASSET_MANAGER.queueDownload("./sprites/door/door locked down.png");
ASSET_MANAGER.queueDownload("./sprites/door/door locked left.png");
ASSET_MANAGER.queueDownload("./sprites/door/door locked right.png");

// powerup sprites
ASSET_MANAGER.queueDownload("./sprites/tiles/healthpack.png")
ASSET_MANAGER.queueDownload("./sprites/tiles/ricochet.png")
ASSET_MANAGER.queueDownload("./sprites/tiles/shotgun.png")

// transition items sprites 
ASSET_MANAGER.queueDownload("./sprites/transition/level 1 hole.png");
ASSET_MANAGER.queueDownload("./sprites/transition/level 2 jetpack.png");
ASSET_MANAGER.queueDownload("./sprites/transition/level 3 pod.png");

// main player sprites
ASSET_MANAGER.queueDownload("./sprites/player/player_up_idle.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_up_run.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_down_idle.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_down_run.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_left_idle.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_left_run.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_right_idle.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_right_run.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_down_death.png");
ASSET_MANAGER.queueDownload("./sprites/player/player_game_over.png");
ASSET_MANAGER.queueDownload("./sprites/player/hp_bar.png");

//flying monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right_death.png");

//red monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_right.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/red_monster/red_monster_right_death.png");

//green monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_right.png");

// blue monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/blue_monster/blue_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/blue_monster/blue_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/blue_monster/blue_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/blue_monster/blue_monster_right.png");

// boss sprites 
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss bullet.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss left/boss left idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss left/boss left run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss left/boss left attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss left/boss left death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss right/boss right idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss right/boss right run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss right/boss right attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss right/boss right death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss up/boss up idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss up/boss up run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss up/boss up attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss up/boss up death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss down/boss down idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss down/boss down run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss down/boss down attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/boss/boss down/boss down death.png");

// smol sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol bullet.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol left/smol left idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol left/smol left run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol left/smol left attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol left/smol left death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol right/smol right idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol right/smol right run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol right/smol right attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol right/smol right death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol up/smol up idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol up/smol up run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol up/smol up attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol up/smol up death.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol down/smol down idle.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol down/smol down run.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol down/smol down attack.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/smol/smol down/smol down death.png");

// music
ASSET_MANAGER.queueDownload("./music/title.mp3");
ASSET_MANAGER.queueDownload("./music/level 2 song.mp3");
ASSET_MANAGER.queueDownload("./music/level 3 song.mp3");

// sound effects
ASSET_MANAGER.queueDownload("./music/player shot sound.wav");
ASSET_MANAGER.queueDownload("./music/player shot sound 200.wav");
ASSET_MANAGER.queueDownload("./music/portal sound.wav");
ASSET_MANAGER.queueDownload("./music/gear sound.wav");
ASSET_MANAGER.queueDownload("./music/click sound.wav");
ASSET_MANAGER.queueDownload("./music/player death sound 200.mp3");
ASSET_MANAGER.queueDownload("./music/flying monster death sound 200.wav");
ASSET_MANAGER.queueDownload("./music/weapon_powerup.mp3");
ASSET_MANAGER.queueDownload("./music/health.mp3");
ASSET_MANAGER.queueDownload("./music/spikes.mp3");
ASSET_MANAGER.queueDownload("./music/slime.wav");
ASSET_MANAGER.queueDownload("./music/boss.wav");

// background images
ASSET_MANAGER.queueDownload("./images/title.png");
ASSET_MANAGER.queueDownload("./images/credits.jpg");
ASSET_MANAGER.queueDownload("./images/logo.png");
ASSET_MANAGER.queueDownload("./images/over.png");


ASSET_MANAGER.downloadAll(() => {
	ASSET_MANAGER.autoRepeat("./music/title.mp3");
	ASSET_MANAGER.autoRepeat("./music/level 2 song.mp3");
	ASSET_MANAGER.autoRepeat("./music/level 3 song.mp3");

	const canvas = document.getElementById("gameWorld");
	//removes mouse pointer
	canvas.style.cursor = 'none';
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
