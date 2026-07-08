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

        // Cactus Color
        ctx.fillStyle = "#43A047";

        // Outline
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;

        // ===== Body =====
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        ctx.strokeRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        // ===== Left Arm =====
        if (this.height >= 75) {

            ctx.fillRect(
                this.x - 8,
                this.y + 18,
                8,
                20
            );

            ctx.strokeRect(
                this.x - 8,
                this.y + 18,
                8,
                20
            );

        }

        // ===== Right Arm =====
        if (this.height >= 90) {

            ctx.fillRect(
                this.x + this.width,
                this.y + 30,
                8,
                22
            );

            ctx.strokeRect(
                this.x + this.width,
                this.y + 30,
                8,
                22
            );

        }

        // ===== Eyes =====
        ctx.fillStyle = "#111";

        if (this.height >= 75) {

            ctx.fillRect(
                this.x + this.width / 2 - 6,
                this.y + 12,
                3,
                3
            );

            ctx.fillRect(
                this.x + this.width / 2 + 3,
                this.y + 12,
                3,
                3
            );

        }

    }

    isOffScreen() {

        return this.x + this.width < 0;

    }

}