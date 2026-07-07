export class Player {

    constructor(game) {

        this.game = game;

        this.width = 50;
        this.height = 60;

        this.x = 100;

        this.y = this.game.canvas.height - this.game.groundHeight - this.height;

        this.velocityY = 0;

        this.gravity = 0.8;

        this.jumpForce = -18;

        this.isJumping = false;

    }

    update() {

        this.velocityY += this.gravity;

        this.y += this.velocityY;

        const groundY = this.game.canvas.height - this.game.groundHeight;

        if (this.y >= groundY - this.height) {

            this.y = groundY - this.height;

            this.velocityY = 0;

            this.isJumping = false;

        }

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

    jump() {

        if (!this.isJumping) {

            this.velocityY = this.jumpForce;

            this.isJumping = true;

        }

    }

}