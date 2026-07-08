import { Cactus } from "../entities/Cactus.js";

export class EnemyManager {

    constructor(game) {

        this.game = game;

        this.enemies = [];

        this.spawnTimer = 0;

        this.spawnInterval = 120;

    }

    update() {

        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {

            this.spawnEnemy();

            this.spawnTimer = 0;

        }

        this.enemies.forEach(enemy => enemy.update());

        this.enemies =
            this.enemies.filter(
                enemy => !enemy.isOffScreen()
            );

    }

    draw(ctx) {

        this.enemies.forEach(enemy => enemy.draw(ctx));

    }

    spawnEnemy() {

        this.enemies.push(
            new Cactus(this.game)
        );

    }

}