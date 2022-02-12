const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tiles/ground.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/18.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/20.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/portal.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/gear.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/broken_stone.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/metal_tile.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/cracked_tile.png");
ASSET_MANAGER.queueDownload("./sprites/traps/spike.png");
ASSET_MANAGER.queueDownload("./sprites/traps/thorn1.png");
ASSET_MANAGER.queueDownload("./sprites/chest/chest_open.png");
ASSET_MANAGER.queueDownload("./sprites/chest/chest_closed.png");
ASSET_MANAGER.queueDownload("./sprites/door/door_shut.png");
ASSET_MANAGER.queueDownload("./sprites/door/door_open.png");
ASSET_MANAGER.queueDownload("./sprites/tiles/x wall.png");

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
ASSET_MANAGER.queueDownload("./sprites/player/hp_bar.png");

//flying monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right_death.png");

//green monster sprites
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/green_monster/green_monster_right.png");

// boss sprites 
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

// music
ASSET_MANAGER.queueDownload("./music/title.mp3");
ASSET_MANAGER.queueDownload("./music/level 2 song.mp3");
ASSET_MANAGER.queueDownload("./music/level 3 song.mp3");

// sound effects
ASSET_MANAGER.queueDownload("./music/player shot sound.wav");
ASSET_MANAGER.queueDownload("./music/player shot sound 100.wav");
ASSET_MANAGER.queueDownload("./music/player shot sound 200.wav");
ASSET_MANAGER.queueDownload("./music/portal sound.wav");
ASSET_MANAGER.queueDownload("./music/gear sound.wav");
ASSET_MANAGER.queueDownload("./music/click sound.wav");
ASSET_MANAGER.queueDownload("./music/player death sound.mp3");
ASSET_MANAGER.queueDownload("./music/player death sound 200.mp3");
ASSET_MANAGER.queueDownload("./music/flying monster death sound.wav");
ASSET_MANAGER.queueDownload("./music/flying monster death sound 200.wav");

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
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
