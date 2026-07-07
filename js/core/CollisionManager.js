export class CollisionManager {

    static check(player, obstacleManager) {

        console.log("CollisionManager called");

        for (const obstacle of obstacleManager.obstacles) {

            const collision =
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y;

            if (collision) {
                console.log("Collision detected!");
                return true;
            }

        }

        return false;

    }

}