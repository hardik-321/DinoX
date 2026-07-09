import { SpriteLoader } from "../core/SpriteLoader.js";

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

        this.sprite = SpriteLoader.get("player");

        this.frameWidth = 24;
        this.frameHeight = 24;

        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 8;
        this.currentAnimation = "run";

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
        if (this.isJumping) {

            this.currentAnimation = "jump";

        }
        else if (this.isDucking) {

            this.currentAnimation = "duck";

        }
        else {

            this.currentAnimation = "run";

        }

        // Animation
        this.animationTimer++;

        if (this.animationTimer >= this.animationSpeed) {

            this.animationTimer = 0;

            if (!this.isJumping && !this.isDucking) {

                this.animationFrame++;

                if (this.animationFrame > 3) {

                    this.animationFrame = 0;

                }

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

    getHitbox() {

        return {

            x: this.x + 12,
            y: this.y + 6,

            width: this.width - 24,
            height: this.height - 10

        };

    }

    draw(ctx) {

        let frameX = 0;

        let drawX = this.x;
        let drawY = this.y;
        let drawWidth = this.width;
        let drawHeight = this.height;

        if (this.isJumping) {

            frameX = 4;

        }
        else if (this.isDucking) {

            frameX = 10;

            // Duck sprite settings
            drawWidth = 65;
            drawHeight = 35;

            // Keep feet on the ground
            drawY = this.getGroundY() + (this.normalHeight - drawHeight);

        }
        else {

            frameX = this.animationFrame;

        }

        ctx.drawImage(

            this.sprite,

            frameX * this.frameWidth,
            0,

            this.frameWidth,
            this.frameHeight,

            drawX,
            drawY,

            drawWidth,
            drawHeight

        );

    }

}