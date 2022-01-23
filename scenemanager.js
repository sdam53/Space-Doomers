class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        // this.score = 0;
        // this.coins = 0;

        this.player = new Player(this.game, 100, 100);
        this.game.entities.player = this.player;

        // this.ground = new Ground(this.game,0,0, 1400, 800, "");
        this.loadLevel(level1, true);

    }

    loadLevel(level, title) {
        this.x = 0;
        this.game.addTile(new Ground(this.game, 100,100,50,50, ""));

        this.game.addEnemy(new FlyingMonster(this.game, 200,200));

    }

    update() {

    };

    draw(ctx) {

    };

    }
