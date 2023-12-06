class Projectile {
    constructor(gameScreen, x, y) {
        this.gameScreen = gameScreen;
        this.width = 50;
        this.height = 50;
        this.visible = false; 
        this.element = document.createElement('img');
        this.element.src = '../images/projectile.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.isMoving = false

        this.gameScreen.appendChild(this.element);
        this.updateVisibility();
    }

    
    updateVisibility() {
        this.element.style.display = this.visible ? 'block' : 'none';
    }

    
    setVisibility(visible) {
        this.visible = visible;
        this.updateVisibility();
    }

    startMoving() {
        this.isMoving = true;
        this.move();
    }
        stopMoving() {
            this.isMoving = false;
        }

    move() {
        if (this.visible && this.isMoving) {
            const currentLeft = parseInt(this.element.style.left, 10) || 0;
            const newLeft = currentLeft + 25; 
    
            this.element.style.left = `${newLeft}px`;
    
            
            if (newLeft > 1300) {
               
                this.setVisibility(false);
                this.element.style.left = '0px';
                this.stopMoving() 
            } else {
                setTimeout(() => this.move(), 16);
            }
        }
    }
    didCollide(enemy) {
        const enemyRect = enemy.element.getBoundingClientRect();
        const projectileRect = this.element.getBoundingClientRect();
    
        if (
            projectileRect.left < enemyRect.right &&
            projectileRect.right > enemyRect.left &&
            projectileRect.top < enemyRect.bottom &&
            projectileRect.bottom > enemyRect.top
        ) {
            console.log('Projectile Collision detected!');
            return true;
        } else {
            return false;
        }
    }
    
}