import { Obstacle } from "../entities/Obstacle.js";

export class ObstacleManager {

    constructor(game) {

        this.game = game;

        this.obstacles = [];

        this.spawnTimer = 0;

        this.spawnInterval = 120;

    }

    update() {

        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {

            this.spawnObstacle();

            this.spawnTimer = 0;

        }

        this.obstacles.forEach(obstacle => obstacle.update());

        this.obstacles = this.obstacles.filter(
            obstacle => !obstacle.isOffScreen()
        );

    }

    draw(ctx) {

        this.obstacles.forEach(obstacle => {

            obstacle.draw(ctx);

        });

    }

    spawnObstacle() {

        this.obstacles.push(
            new Obstacle(this.game)
        );

    }

}