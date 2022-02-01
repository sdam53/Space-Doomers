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

ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right_death.png");

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
ASSET_MANAGER.queueDownload("./music/player shot sound.wav");
ASSET_MANAGER.queueDownload("./music/player shot sound 100.wav");
ASSET_MANAGER.queueDownload("./music/player shot sound 200.wav");

// background images
ASSET_MANAGER.queueDownload("./images/title.png");
ASSET_MANAGER.queueDownload("./images/credits.jpg");
ASSET_MANAGER.queueDownload("./images/logo.png");
ASSET_MANAGER.queueDownload("./images/over.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
