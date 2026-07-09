import { SpriteLoader } from "../core/SpriteLoader.js";

export class Cactus {

    constructor(game) {

        this.game = game;

        const types = [

            { width: 42, height: 60 },

            { width: 54, height: 78 },

            { width: 64, height: 96 }

        ];

        const randomType =
            types[Math.floor(Math.random() * types.length)];

        this.width = randomType.width;
        this.height = randomType.height;

        this.sprite = SpriteLoader.get("cactus");

        this.x = this.game.canvas.width;

        this.y =
            this.game.canvas.height -
            this.game.groundHeight -
            this.height;

    }

    update() {

        this.x -= this.game.gameSpeed;

    }

    getHitbox() {

        return {

            x: this.x + this.width * 0.28,
            y: this.y + 2,

            width: this.width * 0.44,
            height: this.height - 4

        };

    }

    draw(ctx) {

        ctx.imageSmoothingEnabled = false;

        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 4;

        ctx.drawImage(

            this.sprite,

            this.x,
            this.y,

            this.width,
            this.height

        );
        
        ctx.shadowBlur = 0;

    }

    isOffScreen() {

        return this.x + this.width < 0;

    }

}