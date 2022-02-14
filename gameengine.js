// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.clearEntities();

        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {"w": false, "a": false, "s": false, "d":false, "ArrowLeft": false, "ArrowRight": false, "ArrowUp": false, "ArrowDown": false, ".": false};
        this.lclick = false;
        this.mouse = {x: 0, y: 0};

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

        this.gamepad = false;
        this.keyboardActive = false;
        this.mouseActive = false;

        this.pathfindingChoice = "astar";//bfs or astar
    };

    clearEntities() {
        this.entities = {
            player: null,
            enemies: [],
            bullets: [],
            tiles: [],
            portals: [],
            powerups: [],
            minimap: [],
            traps: []
        };
    }

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
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        // Added by Raz
        this.ctx.canvas.addEventListener("mousedown", function (e) {
            that.mouseActive = true;
            this.lclick = getXandY(e);
            if (e.button == 0) {
                that.lclick = true;
            }
        }, false);

        // Added by Raz
        this.ctx.canvas.addEventListener("mouseup", function (e) {
            that.mouseActive = false;
            that.lclick = getXandY(e);
            if (e.button == 0) {
                that.lclick = false;
            }
        }, false);

        /* this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        }); */

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        window.addEventListener("keydown", event => {
            this.keys[event.key] = true;
            this.keyboardActive = true;
        });
        window.addEventListener("keyup", event => {
            this.keys[event.key] = false;
            this.keyboardActive = false;
        });
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
        this.entities.portals.push(entity);
    };

    addPowerUp(entity) {
        this.entities.powerups.push(entity);
    };

    addTrap(entity) {
        this.entities.traps.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.entities.tiles.forEach((tile) => {
          tile.draw(this.ctx);
        });
        //this.entities.traps.forEach((trap) => {
            //if (trap.trap_type === "thorn") {
             //   trap.draw2(this.ctx);
            //}
        //});
        this.entities.portals.forEach((portals) => {
          portals.draw(this.ctx);
        });
        this.entities.enemies.forEach((enemy) => {
          enemy.draw(this.ctx);
        });
        this.entities.bullets.forEach((bullet) => {
          bullet.draw(this.ctx);
        });
        this.entities.powerups.forEach((powerups) => {
            powerups.draw(this.ctx);
        });
        this.entities.player.draw(this.ctx, this);
        this.entities.traps.forEach((trap) => { 
            trap.draw(this.ctx);
        });
        
        this.entities.minimap.draw(this.ctx, this);
        this.camera.draw(this.ctx);
    };

    gamepadUpdate() {
        this.gamepad = navigator.getGamepads()[0];
        let gamepad = this.gamepad;
        if (gamepad != null) {
            if (!this.keyboardActive) {
                // movement
                this.keys["a"] = gamepad.buttons[14].pressed || gamepad.axes[0] < -0.3;
                this.keys["d"] = gamepad.buttons[15].pressed || gamepad.axes[0] > 0.3;
                this.keys["w"] = gamepad.buttons[12].pressed || gamepad.axes[1] < -0.3;
                this.keys["s"] = gamepad.buttons[13].pressed || gamepad.axes[1] > 0.3;
            }

            // shooting
            if (!this.mouseActive 
                && (gamepad.buttons[0].pressed || gamepad.buttons[7].pressed) 
                && (Math.abs(gamepad.axes[2]) > 0.05 || Math.abs(gamepad.axes[3] > 0.05))) {
                this.lclick = true;
               
                if (this.player.facing == "left") {
                    this.mouse.x = this.player.x - 25 + gamepad.axes[2] * 100;
                    this.mouse.y = this.player.y + 55 + gamepad.axes[3] * 100;
				} else if (this.player.facing == "right") {
                    this.mouse.x = this.player.x + 75 + gamepad.axes[2] * 100;
                    this.mouse.y = this.player.y + 55 + gamepad.axes[3] * 100;
                } else if (this.player.facing == "up") {
                    this.mouse.x = this.player.x + 24 + gamepad.axes[2] * 100;
                    this.mouse.y = this.player.y + 0 + gamepad.axes[3] * 100;
				} else if (this.player.facing == "down") {
                    this.mouse.x = this.player.x + 24 + gamepad.axes[2] * 100;
                    this.mouse.y = this.player.y + 87 + gamepad.axes[3] * 100;
                }
            } else if (!this.mouseActive && (gamepad.buttons[0].pressed || gamepad.buttons[7].pressed)) { 
                this.lclick = true;
                if (this.player.facing == "left") {
                    this.mouse.x = this.player.x - 100;
                    this.mouse.y = this.player.y + 55;
                } else if (this.player.facing == "right") {
                    this.mouse.x = this.player.x + 100;
                    this.mouse.y = this.player.y + 55;
                } else if (this.player.facing == "up") {
                    this.mouse.x = this.player.x + 28;
                    this.mouse.y = this.player.y - 100;
                } else if (this.player.facing == "down") {
                    this.mouse.x = this.player.x + 24;
                    this.mouse.y = this.player.y + 100;
                } 
            } else if (!this.mouseActive) {
                this.lclick = false;
            }
        }
    }

    update() {
        this.gamepadUpdate();

        PARAMS.DEBUG = document.getElementById("debug").checked;
        PARAMS.GODMODE = document.getElementById("godmode").checked;
        // Update Entities
        //this.entities.forEach(entity => entity.update(this));
        this.entities.tiles.forEach((tile) => {
          tile.update();
        });
        this.entities.portals.forEach((portals) => {
          portals.update();
        });
        this.entities.enemies.forEach((enemy) => {
          enemy.update();
        });
        this.entities.bullets.forEach((bullet) => {
          bullet.update();
        });
        this.entities.powerups.forEach((powerups) => {
            powerups.update();
        });
        this.entities.traps.forEach((trap) => {
            trap.update();
        });
        // Remove dead things
        this.entities.bullets = this.entities.bullets.filter(entity => !entity.removeFromWorld);
        this.entities.enemies = this.entities.enemies.filter(entity => !entity.removeFromWorld);
        this.entities.powerups = this.entities.powerups.filter(entity => !entity.removeFromWorld);
        //this.entities.portals = this.entities.portals.filter(entity => !entity.removeFromWorld);
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
