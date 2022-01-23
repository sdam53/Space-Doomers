class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        // this.score = 0;
        // this.coins = 0;


        // this.ground = new Ground(this.game,0,0, 1400, 800, "");
        this.loadLevel();

    }

    loadLevel() {
      let x = 0;
      let y = 0;
      for (let i = 0; i < MAPONE.MAP.length; i++) { //create level
        for (let j = 0; j < MAPONE.MAP[0].length; j++) {
          if (MAPONE.MAP[i][j] === 1) {
            this.game.addTile(new Ground(this.game, x, y, 125, 125, 1));
          }
          x += 125;
        }
        x = 0;
        y += 125;
      }
      //add player
    //  this.player = new Player(this.game, MAPONE.PLAYER[0], MAPONE.PLAYER[1]);
    //  this.game.entities.player = this.player;
    this.player = new Player(this.game, MAPONE.PLAYER[0] * 125, MAPONE.PLAYER[1] * 125);
   //  this.game.entities.player = this.player;
    this.game.entities.player = this.player;
    this.game.addEnemy(new FlyingMonster(this.game, MAPONE.FLYINGMONSTER[0] * 125, MAPONE.FLYINGMONSTER[1] * 125))
  }

    update() {
      let midpoint = PARAMS.CANVAS_WIDTH/2
      this.x = this.player.x - midpoint
    };

    draw(ctx) {

    };

    }
