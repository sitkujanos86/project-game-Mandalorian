class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("game-end");
        this.height = 720;
        this.width = 1500;
        this.player = null;
        this.projectiles = [];  // Fixed typo: changed 'this.projectile' to 'this.projectiles'
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
        this.projectiles = [];  // Fixed typo: changed 'this.projectile' to 'this.projectiles'
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
        this.player.move();

        const nextEnemies = [];
        this.enemies.forEach(currentEnemy => {
            currentEnemy.move();
            if (currentEnemy.left + currentEnemy.width > 0) {
                if (this.player.didCollide(currentEnemy)) {
                    console.log('collision');
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

        if (this.animateId % 250 == 0) {
            this.enemies.push(new Enemy(this.gameScreen));
        }
        this.projectiles.forEach(currentProjectile => {
            currentProjectile.move()
            this.enemies.forEach((enemy1)=>{
                if (currentProjectile.didCollide(enemy1)){
                    currentProjectile.element.remove()
                    enemy1.element.remove()
                }
            })
        })
       /* this.projectiles.forEach(currentProjectile => {
            currentProjectile.move();
            console.log('Projectile collided with Enemy!')
            const nextProjectiles = this.projectiles.filter(projectile => projectile !== currentProjectile);
            if (currentProjectile.left + currentProjectile.width > 0) {
                nextProjectiles.push(currentProjectile);
            }
            this.projectiles = nextProjectiles;
           

            this.enemies.forEach(currentEnemy => {
                console.log ('Hello')
                if (currentProjectile.didCollide(currentEnemy)) {

                    console.log('Projectile collided with Enemy!');
                    currentEnemy.element.remove(); 
                } else {
                    nextEnemies.push(currentEnemy);
                }
            });
        }); */

        if (this.isGameOver) {
            this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
            this.player.element.remove();
        } else {
            this.updateProjectileVisibility();
        }

        document.getElementById('score').innerText = this.score;
        document.getElementById('lives').innerText = this.lives;

        if (this.isGameOver) {
            this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
            this.player.element.remove();
        } else {
            this.animateId = requestAnimationFrame(() => this.gameLoop());
        }
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
