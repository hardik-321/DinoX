import { Player } from "../entities/Player.js";
import { Input } from "./Input.js";
import { ObstacleManager } from "../managers/ObstacleManager.js";
import { GameState } from "./GameState.js";
import { CollisionManager } from "./CollisionManager.js";
import { HUD } from "../ui/HUD.js";

export class Game {

    constructor() {

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.gameSpeed = 8;
        this.groundHeight = 120;
        this.state = GameState.RUNNING;

        this.resize();

        this.player = new Player(this);

        this.input = new Input();

        this.obstacleManager = new ObstacleManager(this);

        this.hud = new HUD(this);

        window.addEventListener("resize", () => {
            this.resize();
        });

    }

    resize() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }

    restart() {

        this.state = GameState.RUNNING;

        this.player = new Player(this);

        this.obstacleManager = new ObstacleManager(this);

    }

    update() {

        if (this.state === GameState.GAME_OVER) {

            if (this.input.isPressed("Space")) {

                this.restart();

            }

            return;

        }

        if (this.input.isPressed("Space")) {

            this.player.jump();

        }

        this.player.update();

        this.obstacleManager.update();

        if (CollisionManager.check(this.player, this.obstacleManager)) {

            this.state = GameState.GAME_OVER;

        }

    }

    draw(){

        this.ctx.fillStyle = "#f7f7f7";

        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.player.draw(this.ctx);
        this.obstacleManager.draw(this.ctx);
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