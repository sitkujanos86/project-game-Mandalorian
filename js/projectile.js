class Projectile {
    constructor(gameScreen, x, y) {
        this.gameScreen = gameScreen;
        this.width = 100;
        this.height = 50;
        this.left = x
        this.visible = false;
        this.element = document.createElement('img');
        this.element.src = '../images/projectile.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left - 15}px`;
        this.element.style.top = `${y - 137}px`;
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
        this.left += 25
        this.element.style.left = `${this.left -45}px`;}
       /* if (this.visible && this.isMoving) {
            const currentLeft = parseInt(this.element.style.left, 10) || 0;
            const newLeft = currentLeft + 25;

            this.element.style.left = `${newLeft}px`;

            if (newLeft > 1300) {
                this.setVisibility(false);
                this.element.style.left = '0px';
                this.stopMoving();
                this.removeElement();
            } else {
                this.animationId = requestAnimationFrame(() => this.move());
            }
        }
    }*/

    didCollide(enemy) {
        const enemyRect = enemy.element.getBoundingClientRect();
        const projectileRect = this.element.getBoundingClientRect();
    
        return (
            projectileRect.left < enemyRect.right &&
            projectileRect.right > enemyRect.left &&
            projectileRect.top < enemyRect.bottom &&
            projectileRect.bottom > enemyRect.top
        );
    }

    removeElement() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
