export class Cloud {

    constructor(game) {

        this.game = game;

        this.reset();

    }

    reset() {

        this.x = this.game.canvas.width + Math.random() * 300;

        this.y = 50 + Math.random() * 120;

        this.width = 70 + Math.random() * 40;

        this.height = 30;

        this.speed = 1 + Math.random();

    }

    update() {

        this.x -= this.speed + this.game.gameSpeed * 0.05;

        if (this.x + this.width < 0) {

            this.reset();

        }

    }

    draw(ctx) {

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(this.x + 15, this.y + 15, 15, 0, Math.PI * 2);

        ctx.arc(this.x + 35, this.y + 8, 18, 0, Math.PI * 2);

        ctx.arc(this.x + 55, this.y + 15, 15, 0, Math.PI * 2);

        ctx.fill();

    }

}