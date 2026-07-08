export class Bird {

    constructor(game) {

        this.game = game;

        this.width = 55;
        this.height = 35;

        this.x = this.game.canvas.width;

        const ground =
            this.game.canvas.height -
            this.game.groundHeight;

        // Standing dinosaur head position
        const playerHeadY = this.game.player.getGroundY();

        /*
            35% Low Bird  -> Jump
            45% Medium Bird -> Duck
            20% High Bird -> Ignore
        */

        const type = Math.random();

        if (type < 0.35) {

            // LOW BIRD
            // Player jumps

            this.y = ground - this.height - 5;

        }
        else if (type < 0.80) {

            // MEDIUM BIRD
            // 60 px above the ground

            this.y = ground - this.height - 50;

        }
        else {

            // HIGH BIRD

            this.y = ground - this.height - 145;

        }

        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 10;

    }

    update() {

        this.x -= this.game.gameSpeed;

        this.frameTimer++;

        if (this.frameTimer >= this.frameInterval) {

            this.frame = (this.frame + 1) % 2;

            this.frameTimer = 0;

        }

    }

    draw(ctx) {

        // Body
        ctx.fillStyle = "#795548";

        ctx.fillRect(
            this.x + 12,
            this.y + 10,
            30,
            12
        );

        // Head
        ctx.fillRect(
            this.x + 40,
            this.y + 6,
            10,
            10
        );

        // Beak
        ctx.fillStyle = "#FFB300";

        ctx.fillRect(
            this.x + 50,
            this.y + 9,
            5,
            3
        );

        // Wings
        ctx.fillStyle = "#A1887F";

        if (this.frame === 0) {

            ctx.fillRect(
                this.x + 18,
                this.y,
                12,
                10
            );

            ctx.fillRect(
                this.x + 18,
                this.y + 22,
                12,
                8
            );

        }
        else {

            ctx.fillRect(
                this.x + 18,
                this.y + 5,
                12,
                5
            );

            ctx.fillRect(
                this.x + 18,
                this.y + 20,
                12,
                14
            );

        }

        // Eye
        ctx.fillStyle = "#000";

        ctx.fillRect(
            this.x + 46,
            this.y + 9,
            2,
            2
        );

    }

    isOffScreen() {

        return this.x + this.width < 0;

    }

}