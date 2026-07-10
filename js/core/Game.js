import { Player } from "../entities/Player.js";
import { Input } from "./Input.js";
import { EnemyManager } from "../managers/EnemyManager.js";
import { GameState } from "./GameState.js";
import { CollisionManager } from "./CollisionManager.js";
import { HUD } from "../ui/HUD.js";
import { ScoreManager } from "../managers/ScoreManager.js";
import { Ground } from "../entities/Ground.js";
import { CloudManager } from "../managers/CloudManager.js";
import { EnvironmentManager } from "../managers/EnvironmentManager.js";
import { SpriteLoader } from "./SpriteLoader.js";

export class Game {

    constructor() {

        this.canvas = document.getElementById("gameCanvas");

        this.virtualWidth = 1400;
        this.virtualHeight = 700;

        this.offsetX = 0;
        this.offsetY = 0;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.gameSpeed = 6;
        this.maxGameSpeed = 15;
        this.groundHeight = 120;
        this.state = GameState.RUNNING;

        this.resize();

        this.player = new Player(this);

        this.ground = new Ground(this);

        this.cloudManager = new CloudManager(this);

        this.environment = new EnvironmentManager(this);

        this.background = SpriteLoader.get("background");

        this.input = new Input();

        this.scoreManager = new ScoreManager();

        this.enemyManager = new EnemyManager(this);

        this.hud = new HUD(this);

        window.addEventListener("resize", () => {
            this.resize();
        });

    }

    resize() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.imageSmoothingEnabled = false;

        this.offsetX =
            (this.canvas.width - this.virtualWidth) / 2;

        this.offsetY =
            (this.canvas.height - this.virtualHeight) / 2;

    }

    restart() {

        this.state = GameState.RUNNING;

        this.player = new Player(this);

        this.enemyManager = new EnemyManager(this);

        this.scoreManager.reset();

    }

    updateDifficulty() {

        this.gameSpeed = Math.min(
            6 + Math.floor(this.scoreManager.score / 100),
            this.maxGameSpeed
        );

    }

    update() {

        if (this.state === GameState.GAME_OVER) {

            if (this.input.wasPressed("Space")) {

                this.restart();

            }

            return;

        }

        if (this.input.wasPressed("Space")) {

            this.player.jump();

        }
        if (
            this.input.isPressed("ArrowDown") ||
            this.input.isPressed("KeyS")
        ) {

            this.player.duck();

        } else {

            this.player.standUp();

        }

        this.player.update();

        this.ground.update();

        this.cloudManager.update();

        this.environment.update();

        this.enemyManager.update();

        this.scoreManager.update();

        this.updateDifficulty();

        if (CollisionManager.check(this.player, this.enemyManager)) {

            this.state = GameState.GAME_OVER;

        }

    }

    draw(){

        this.ctx.fillStyle = this.environment.getSkyColor();

        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.cloudManager.draw(this.ctx);

        this.ground.draw(this.ctx);

        this.enemyManager.draw(this.ctx);

        this.player.draw(this.ctx);

        this.hud.draw(this.ctx);

    }

    loop = () => {

        this.update();

        this.draw();

        this.input.update();

        requestAnimationFrame(this.loop);

    }

    start() {

        this.loop();

    }

}