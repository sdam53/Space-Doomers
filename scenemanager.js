class SceneManager {
    constructor(game, ) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        // this.score = 0;
        // this.coins = 0;
        this.ground = new Ground(this.game,0,0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT, "");
        this.player = new Player(this.game, 100, 100);
        this.monster = new FlyingMonster(this.game, 1100, 300)

        // this.ground = new Ground(this.game,0,0, 1400, 800, "");

        this.loadLevel(level1, true);

    }

    loadLevel(level, title) {
        this.x = 0;

        this.game.addEntity(this.monster);
        this.game.addEntity(this.player);
        this.game.addEntity(this.ground);


    }

    update() {

    };

    draw(ctx) {

    };

    }
