export class Cactus {

    constructor(game) {

        this.game = game;

        const types = [

            { width: 30, height: 55 },

            { width: 45, height: 75 },

            { width: 60, height: 90 }

        ];

        const randomType =
            types[Math.floor(Math.random() * types.length)];

        this.width = randomType.width;
        this.height = randomType.height;

        this.x = this.game.canvas.width;

        this.y =
            this.game.canvas.height -
            this.game.groundHeight -
            this.height;

    }

    update() {

        this.x -= this.game.gameSpeed;

    }

    draw(ctx) {

        ctx.fillStyle = "#2E8B57";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        if (this.height >= 75) {

            ctx.fillRect(
                this.x - 8,
                this.y + 18,
                8,
                20
            );

        }

        if (this.height >= 90) {

            ctx.fillRect(
                this.x + this.width,
                this.y + 30,
                8,
                22
            );

        }

    }

    isOffScreen() {

        return this.x + this.width < 0;

    }

}