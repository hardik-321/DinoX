import { GameState } from "../core/GameState.js";

export class HUD {

    constructor(game) {
        this.game = game;
    }

    draw(ctx) {

        ctx.fillStyle = "#000";

        ctx.font = "30px Arial";

        ctx.textAlign = "left";

        ctx.fillText(
            `Score : ${this.game.scoreManager.score}`,
            20,
            40
        );

        ctx.fillText(
            `High Score : ${this.game.scoreManager.highScore}`,
            20,
            75
        );

        if (this.game.state === GameState.GAME_OVER) {

            ctx.fillStyle = "rgba(0,0,0,0.5)";

            ctx.fillRect(
                0,
                0,
                this.game.canvas.width,
                this.game.canvas.height
            );

            ctx.fillStyle = "#fff";

            ctx.textAlign = "center";

            ctx.font = "bold 64px Arial";

            ctx.fillText(
                "GAME OVER",
                this.game.canvas.width / 2,
                this.game.canvas.height / 2 - 20
            );

            ctx.font = "28px Arial";

            ctx.fillText(
                "Press SPACE to Restart",
                this.game.canvas.width / 2,
                this.game.canvas.height / 2 + 40
            );

        }

    }

}