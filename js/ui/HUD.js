import { GameState } from "../core/GameState.js";

export class HUD {

    constructor(game) {
        this.game = game;
    }

    draw(ctx) {

        if (this.game.state === GameState.GAME_OVER) {

            // Dark overlay
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(
                0,
                0,
                this.game.canvas.width,
                this.game.canvas.height
            );

            // Game Over
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 64px Arial";
            ctx.textAlign = "center";

            ctx.fillText(
                "GAME OVER",
                this.game.canvas.width / 2,
                this.game.canvas.height / 2 - 20
            );

            // Restart message
            ctx.font = "24px Arial";

            ctx.fillText(
                "Press SPACE to Restart",
                this.game.canvas.width / 2,
                this.game.canvas.height / 2 + 40
            );

        }

    }

}