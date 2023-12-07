class Projectile {
    constructor(gameScreen, x, y) {
        this.gameScreen = gameScreen;
        this.width = 125;
        this.height = 50;
        this.left = x
        this.visible = false;
        this.element = document.createElement('img');
        this.element.src = 'images/projectile.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left - 5}px`;
        this.element.style.top = `${y - 140}px`;
        this.isMoving = false;
        this.animationId = null;

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
        if (!this.isMoving) {
            this.isMoving = true;
            this.move();
        }
    }

    stopMoving() {
        this.isMoving = false;
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }

    move() {
        this.left += 10
        this.element.style.left = `${this.left -75}px`;}
       
    didCollide(enemy) {
        const enemyRect = enemy.element.getBoundingClientRect();
        const projectileRect = this.element.getBoundingClientRect();
    
        if (
            enemyRect.left < projectileRect.right &&
            enemyRect.right > projectileRect.left &&
            enemyRect.top < projectileRect.bottom &&
            enemyRect.bottom > projectileRect.top
        ) {
            console.log('Enemy Collision detected!');
            enemy.removeElement();
            this.removeElement();
            return true;
        } else {
            return false;
        }
    }

    removeElement() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}