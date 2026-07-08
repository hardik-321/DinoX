export class Player {

    constructor(game) {

        this.game = game;

        // Position
        this.x = 100;

        this.width = 50;

        this.normalHeight = 60;
        this.duckHeight = 35;

        this.height = this.normalHeight;

        this.y = this.getGroundY();

        // Physics
        this.velocityY = 0;
        this.gravity = 0.8;
        this.jumpForce = -18;

        // States
        this.isJumping = false;
        this.isDucking = false;

        // Animation
        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 8;

    }

    getGroundY() {

        return this.game.canvas.height -
               this.game.groundHeight -
               this.normalHeight;

    }

    update() {

        this.velocityY += this.gravity;

        this.y += this.velocityY;

        const ground = this.getGroundY();

        if (this.y >= ground) {

            this.y = ground;

            this.velocityY = 0;

            this.isJumping = false;

        }

        if (!this.isJumping) {

            this.frameTimer++;

            if (this.frameTimer >= this.frameInterval) {

                this.frame = (this.frame + 1) % 2;

                this.frameTimer = 0;

            }

        }

    }

    jump() {

        if (this.isJumping) return;

        this.velocityY = this.jumpForce;

        this.isJumping = true;

    }

    duck() {

        // Cannot duck while jumping or falling
        if (this.isJumping || this.velocityY !== 0) return;

        if (this.isDucking) return;

        this.isDucking = true;

        const oldBottom = this.y + this.height;

        this.height = this.duckHeight;

        this.y = oldBottom - this.height;

    }

    standUp() {

        if (!this.isDucking) return;

        const ground = this.getGroundY();

        // Stand up only when on the ground
        if (this.y !== ground) return;

        const oldBottom = this.y + this.height;

        this.height = this.normalHeight;

        this.y = oldBottom - this.height;

        this.isDucking = false;

    }

    draw(ctx) {

        ctx.fillStyle = "#3CB043";
        const offsetY = this.isDucking ? 25 : 0;

        // Tail
        ctx.fillRect(
            this.x,
            this.y + 20 + offsetY,
            10,
            10
        );

        // Body
        ctx.fillRect(
            this.x + 10,
            this.y + 10 + offsetY,
            30,
            this.height - 20
        );

        // Head
        if (!this.isDucking) {

            ctx.fillRect(
                this.x + 30,
                this.y + offsetY,
                20,
                20
            );

        }

        // Eye
        ctx.fillStyle = "#000";

        if (!this.isDucking) {

            ctx.fillRect(
                this.x + 44,
                this.y + 5 + offsetY,
                3,
                3
            );

        }

        ctx.fillStyle = "#3CB043";

        const legY = this.y + this.height - 10;

        if (this.frame === 0) {

            ctx.fillRect(
                this.x + 15,
                legY,
                6,
                10
            );

            ctx.fillRect(
                this.x + 30,
                legY - 4,
                6,
                14
            );

        } else {

            ctx.fillRect(
                this.x + 15,
                legY - 4,
                6,
                14
            );

            ctx.fillRect(
                this.x + 30,
                legY,
                6,
                10
            );

        }

    }

}