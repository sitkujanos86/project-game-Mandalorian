class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("game-end");
        this.height = 720;
        this.width = 1500;
        this.player = null;
        this.projectiles = [];
        this.enemies = [];
        this.animateId = null;
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
    }

    start() {
        this.startScreen.style.display = 'none';
        this.endScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.player = new Player(this.gameScreen);
        this.projectiles = [];
        this.enemies = [];
        this.updateProjectileVisibility();
        this.gameLoop();
    }

    updateProjectileVisibility() {
        if (this.projectiles.length > 0) {
            this.projectiles.forEach(projectile => {
                projectile.setVisibility(this.isGameOver || !projectile.visible);
            });
        }
    }

    gameLoop() {
        console.log('Entering gameLoop');

        // Move player
        this.player.move();

        // Move and check collisions with enemies
        const nextEnemies = [];
        this.enemies.forEach(currentEnemy => {
            currentEnemy.move();

            if (currentEnemy.left + currentEnemy.width > 0) {
                if (this.player.didCollide(currentEnemy)) {
                    console.log('Player collided with enemy');
                    currentEnemy.element.remove();
                    this.lives -= 1;
                    if (this.lives <= 0) {
                        this.isGameOver = true;
                    }
                } else {
                    nextEnemies.push(currentEnemy);
                }
            } else {
                currentEnemy.element.remove();
                this.score += 10;
            }
        });
        this.enemies = nextEnemies;

        // Move and check collisions with projectiles
        const nextProjectiles = [];
        this.projectiles.forEach(currentProjectile => {
            currentProjectile.move();

            // Check for collision with enemies
            let collided = false;
            this.enemies.forEach(currentEnemy => {
                if (currentProjectile.didCollide(currentEnemy)) {
                    console.log('Projectile collided with enemy!');
                    currentEnemy.element.remove();
                    collided = true;
                }
            });

            // Only push the projectile if it didn't collide with an enemy
            if (!collided) {
                nextProjectiles.push(currentProjectile);
            }
        });

        this.projectiles = nextProjectiles;

        // Add new enemy every 250 frames
        if (this.animateId % 250 === 0) {
            this.enemies.push(new Enemy(this.gameScreen));
        }

        // Move projectiles
        this.projectiles.forEach(projectile => projectile.move());

        // Check for game over
        if (this.isGameOver) {
            console.log('Game over');
            this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
            this.player.element.remove();
        } else {
            console.log('Scheduling next frame');
            this.updateProjectileVisibility();
            this.animateId = requestAnimationFrame(() => this.gameLoop());
        }

        // Update UI
        document.getElementById('score').innerText = this.score;
        document.getElementById('lives').innerText = this.lives;
    }

    restartGame() {
        this.isGameOver = false;
        this.lives = 3;
        this.score = 0;
        this.enemies.forEach(enemy => enemy.element.remove());
        this.enemies = [];
        this.projectiles.forEach(projectile => projectile.element.remove());
        this.projectiles = [];
        this.gameScreen.style.display = 'block';
        this.endScreen.style.display = 'none';
        if (this.player) {
            this.player.element.remove();
            this.player = null;
        }

        this.start();
    }
}
