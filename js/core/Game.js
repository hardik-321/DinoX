import { Player } from "../entities/Player.js";
import { Input } from "./Input.js";
import { ObstacleManager } from "../managers/ObstacleManager.js";
import { GameState } from "./GameState.js";
import { CollisionManager } from "./CollisionManager.js";

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

        window.addEventListener("resize", () => {
            this.resize();
        });

    }

    resize() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }

    update(){

        if(this.state !== GameState.RUNNING){

            return;

        }
        if(this.input.isPressed("Space")){

            this.player.jump();

        }

        this.player.update();
        this.obstacleManager.update();
        if (CollisionManager.check(this.player, this.obstacleManager)) {

            this.state = GameState.GAME_OVER;

            console.log("💥 GAME OVER");

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

    }

    loop = () => {

        this.update();

        this.draw();

        requestAnimationFrame(this.loop);

    }

    start() {

        this.loop();

    }

}