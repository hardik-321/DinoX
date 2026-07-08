export class CollisionManager {

    static check(player, enemyManager) {

        for (const enemy of enemyManager.enemies) {

            const collision =
                player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y;

            if (collision) {

                return true;

            }

        }

        return false;

    }

}