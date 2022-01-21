const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

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

ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_up.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_down.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_left.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/flying_monster/flying_monster_right.png");


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
