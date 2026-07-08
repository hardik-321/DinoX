export class Ground {

    constructor(game) {

        this.game = game;

        this.x = 0;

        this.speed = this.game.gameSpeed;

        this.height = this.game.groundHeight;

    }

    update() {

        this.x -= this.game.gameSpeed * 0.8;

        if (this.x <= -40) {

            this.x = 0;

        }

    }

    draw(ctx) {

        const y = this.game.canvas.height - this.height;

        // Grass
        ctx.fillStyle = "#6ab04c";

        ctx.fillRect(
            0,
            y,
            this.game.canvas.width,
            6
        );

        // Soil
        ctx.fillStyle = "#8e5a2b";

        ctx.fillRect(
            0,
            y + 6,
            this.game.canvas.width,
            this.height - 6
        );

        // Moving ground pattern
        ctx.fillStyle = "#5d3a1a";

        for (let i = this.x; i < this.game.canvas.width; i += 40) {

            ctx.fillRect(
                i,
                y + 18,
                20,
                4
            );

        }

    }

}