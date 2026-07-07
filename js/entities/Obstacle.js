export class Obstacle {

    constructor(game) {

        this.game = game;

        this.width = 35;
        this.height = 60;

        this.x = this.game.canvas.width;
        this.y = this.game.canvas.height - this.game.groundHeight - this.height;

        this.speed = this.game.gameSpeed || 8;

    }

    update() {

        this.x -= this.speed;

    }

    draw(ctx) {

        ctx.fillStyle = "green";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

    }

    isOffScreen() {

        return this.x + this.width < 0;

    }

}