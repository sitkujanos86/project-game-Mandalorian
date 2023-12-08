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
        this.backgroundChanged = false;
        this.backgroundMusic = new Audio('./audio.mp3')
        this.WINNING_SCORE = 700;
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
        this.checkAndChangeBackground();
        this.gameLoop();
        this.backgroundMusic.play()
    }

    updateProjectileVisibility() {
        if (this.projectiles.length > 0) {
            this.projectiles.forEach(projectile => {
                projectile.setVisibility(this.isGameOver || !projectile.visible);
            });
        }
    }
    checkWinConditions() {
        if (this.score >= this.WINNING_SCORE) {
            this.showWinScreen();
        }
    }

    gameLoop() {
        if (this.score >= this.WINNING_SCORE) {
            this.isGameOver=true
            
        }
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
    
        if (this.animateId % 40 == 0) {
            this.enemies.push(new Enemy(this.gameScreen));
        }
        this.projectiles.forEach(currentProjectile => {
            currentProjectile.move()
            const collidedEnemies = [];
            this.enemies.forEach((currentEnemy)=>{
                if (currentProjectile.didCollide(currentEnemy)){
                    this.score += 15;
                    currentEnemy.element.remove(); 
                } else {
                    collidedEnemies.push(currentEnemy)
                }
            })
            this.enemies = collidedEnemies
        })
    
        this.projectiles = this.projectiles.filter(projectile => projectile.left < this.width);
    
        console.log('Enemies:', this.enemies);
        console.log('Projectiles:', this.projectiles);
    
        if (this.isGameOver) {
            if (this.lives <=0 ) {
                this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
            this.player.element.remove();
            } else { this.showWinScreen()}
           
        } else {
            this.updateProjectileVisibility();
        }
    
        document.getElementById('score').innerText = this.score;
        document.getElementById('lives').innerText = this.lives;
    
        if (this.isGameOver) {
            if (this.lives <=0 ) {
                this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
            this.player.element.remove();
            } else { this.showWinScreen()}
        } else {
            this.animateId = requestAnimationFrame(() => this.gameLoop());
        }
        this.checkAndChangeBackground();
    }
    

    changeBackground(newBackground) {
        this.gameScreen.style.backgroundImage = `url('${newBackground}')`;
    }
    
    checkAndChangeBackground() {
        if (this.score >= 250 && this.score < 500 && !this.backgroundChanged) {
            this.changeBackground('images/hangar.jpg'); 
        } else if (this.score >= 500 && !this.backgroundChanged) {
            this.changeBackground('images/surface.jpg'); 
        }
    }

    playBackgroundMusic() {
        this.backgroundMusic.play();
    }
    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0; 
    }
    pauseBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    resumeBackgroundMusic() {
        this.backgroundMusic.play();
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
     showWinScreen() {
        this.stopBackgroundMusic();
        document.getElementById('game-win').style.display = 'block';
        document.getElementById('game-screen').style.display = 'none';
    }
}