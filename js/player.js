class Player {
    constructor (gameScreen) {
        this.gameScreen = gameScreen
        this.left = 30
        this.top = 250
        this.height = 250
        this.width = 160
        this.directionX = 0
        this.directionY = 0
        this.isShooting = false
        this.projectile = null
        this.element = document.createElement('img')
        this.element.src = "images/mando.png"
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.gameScreen.appendChild(this.element)
    }
    move () {
        if (this.left >= 0) {
            this.left += this.directionX
        }
        else {
            this.left = 0
        }
        if (this.left <=1500 -this.width) {
            this.left += this.directionX
        }
        else {
            this.left = 1500 - this.width
        }
        
        if (this.top >= 0) {
            this.top += this.directionY
        }
        else {
            this.top = 0
        }
        if (this.top <=760 -this.height) {
            this.top += this.directionY
        }
        else {
            this.top = 760 - this.height
        }

        this.updatePosition()
    }
    shoot() {
        console.log('Player shoots!')
        if (!this.isShooting && (!this.projectile || !this.projectile.visible)) {
            this.isShooting = true;
            if (this.projectile && this.projectile.visible) {
                this.projectile.setVisibility(false);
                this.projectile = null;
            }
            this.projectile = new Projectile(this.gameScreen, this.left + this.width, this.top + this.height / 2);
            this.projectile.setVisibility(true); // Állítsd láthatóvá a lövedéket
            this.projectile.startMoving();
            setTimeout(() => {
                this.isShooting = false;
            }, 100);
        }
    }
    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;     
    }

    didCollide (enemy) {
        const playerRect = this.element.getBoundingClientRect()
        const enemyRect = enemy.element.getBoundingClientRect()

        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            return true
        }
        else {
            return false
        }
    }

}