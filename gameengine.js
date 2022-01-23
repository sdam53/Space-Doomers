// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = {
            player: null,
            enemies: [],
            bullets: [],
            tiles: [],
            portal: []
        };
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {"w": false, "a": false, "s": false, "d":false, "ArrowLeft": false, "ArrowRight": false, "ArrowUp": false, "ArrowDown": false, ".": false};

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        window.addEventListener("keydown", event => this.keys[event.key] = true);
        window.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEnemy(entity) {
        this.entities.enemies.push(entity);
    };

    addBullet(entity) {
      this.entities.bullets.push(entity);
    };

    addTile(entity) {
        this.entities.tiles.push(entity);
    };

    addPortal(entity) {
        this.entities.portal.push(entity);
    };



    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.entities.tiles.forEach((tile, i) => {
          tile.draw(this.ctx);
        });
        this.entities.portal.forEach((portal, i) => {
          portal.draw(this.ctx);
        });
        this.entities.enemies.forEach((enemy, i) => {
          enemy.draw(this.ctx);
        });
        this.entities.bullets.forEach((bullet, i) => {
          bullet.draw(this.ctx);
        });
        this.entities.player.draw(this.ctx, this);
        this.camera.draw(this.ctx);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        // Update Entities
        //this.entities.forEach(entity => entity.update(this));
        this.entities.tiles.forEach((tile, i) => {
          tile.update();
        });
        this.entities.portal.forEach((portal, i) => {
          portal.update();
        });
        this.entities.enemies.forEach((enemy, i) => {
          enemy.update();
        });
        this.entities.bullets.forEach((bullet, i) => {
          bullet.update();
        });
        // Remove dead things
        this.entities.bullets = this.entities.bullets.filter(entity => !entity.removeFromWorld);
        this.entities.enemies = this.entities.enemies.filter(entity => !entity.removeFromWorld);
      this.entities.player.update();
      this.camera.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
    get["width"]() { return this.ctx?.canvas?.width || 0; }
    get["height"]() { return this.ctx?.canvas?.height || 0; }
};

// KV Le was here :)
