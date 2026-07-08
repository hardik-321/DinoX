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

        // Animation
        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 8;

    }

    update() {

        this.velocityY += this.gravity;
        this.y += this.velocityY;

        const groundY =
            this.game.canvas.height - this.game.groundHeight;

        if (this.y >= groundY - this.height) {

            this.y = groundY - this.height;
            this.velocityY = 0;
            this.isJumping = false;

        }

        // Running animation
        if (!this.isJumping) {

            this.frameTimer++;

            if (this.frameTimer >= this.frameInterval) {

                this.frame = (this.frame + 1) % 2;

                this.frameTimer = 0;

            }

        }

    }

    draw(ctx) {

        ctx.fillStyle = "#3CB043";

        // Body
        ctx.fillRect(
            this.x + 10,
            this.y + 10,
            30,
            40
        );

        // Head
        ctx.fillRect(
            this.x + 30,
            this.y,
            20,
            20
        );

        // Eye
        ctx.fillStyle = "#000";

        ctx.fillRect(
            this.x + 44,
            this.y + 5,
            3,
            3
        );

        // Tail
        ctx.fillStyle = "#3CB043";

        ctx.fillRect(
            this.x,
            this.y + 20,
            10,
            10
        );

        // Legs
        if (this.isJumping) {

            ctx.fillRect(
                this.x + 15,
                this.y + 50,
                6,
                10
            );

            ctx.fillRect(
                this.x + 30,
                this.y + 50,
                6,
                10
            );

        } else {

            if (this.frame === 0) {

                ctx.fillRect(
                    this.x + 15,
                    this.y + 50,
                    6,
                    10
                );

                ctx.fillRect(
                    this.x + 30,
                    this.y + 46,
                    6,
                    14
                );

            } else {

                ctx.fillRect(
                    this.x + 15,
                    this.y + 46,
                    6,
                    14
                );

                ctx.fillRect(
                    this.x + 30,
                    this.y + 50,
                    6,
                    10
                );

            }

        }

    }

    jump() {

        if (!this.isJumping) {

            this.velocityY = this.jumpForce;

            this.isJumping = true;

        }

    }

}