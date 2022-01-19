class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        // this.score = 0;
        // this.coins = 0;

        this.player = new Player(this.game, 100, 100);

        this.loadLevel(level1, true);

    }

    loadLevel(level, title) {
        this.x = 0;
        this.game.addEntity(this.player);
    }

    update() {

    };

    draw(ctx) {

    };

    }
