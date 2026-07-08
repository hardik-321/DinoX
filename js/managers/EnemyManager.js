import { Cactus } from "../entities/Cactus.js";
import { Bird } from "../entities/Bird.js";

export class EnemyManager {

    constructor(game) {

        this.game = game;

        this.enemies = [];

        this.spawnTimer = 0;

        this.consecutiveCactus = 0;
        this.consecutiveBird = 0;

        this.updateSpawnInterval();

    }

    update() {

        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnInterval) {

            this.spawnEnemy();

            this.spawnTimer = 0;

            this.updateSpawnInterval();

        }

        this.enemies.forEach(enemy => enemy.update());

        this.enemies = this.enemies.filter(
            enemy => !enemy.isOffScreen()
        );

    }

    draw(ctx) {

        this.enemies.forEach(enemy => enemy.draw(ctx));

    }

    updateSpawnInterval() {

        const score = this.game.scoreManager
            ? this.game.scoreManager.score
            : 0;

        if (score < 200) {

            this.minSpawn = 80;
            this.maxSpawn = 120;

        }
        else if (score < 500) {

            this.minSpawn = 70;
            this.maxSpawn = 105;

        }
        else if (score < 1000) {

            this.minSpawn = 60;
            this.maxSpawn = 90;

        }
        else {

            this.minSpawn = 50;
            this.maxSpawn = 75;

        }

        this.spawnInterval =
            Math.floor(
                Math.random() *
                (this.maxSpawn - this.minSpawn + 1)
            ) + this.minSpawn;

    }

    spawnEnemy() {

        const score = this.game.scoreManager.score;

        let birdChance = 0;

        if (score >= 1000) {

            birdChance = 0.70;

        }
        else if (score >= 500) {

            birdChance = 0.60;

        }
        else if (score >= 200) {

            birdChance = 0.50;

        }

        let spawnBird = Math.random() < birdChance;

        // Prevent too many birds in a row
        if (this.consecutiveBird >= 2) {

            spawnBird = false;

        }

        // Prevent too many cactus in a row
        if (this.consecutiveCactus >= 3) {

            spawnBird = true;

        }

        if (spawnBird) {

            this.enemies.push(
                new Bird(this.game)
            );

            this.consecutiveBird++;

            this.consecutiveCactus = 0;

        }
        else {

            this.enemies.push(
                new Cactus(this.game)
            );

            this.consecutiveCactus++;

            this.consecutiveBird = 0;

        }

    }

}