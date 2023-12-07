class Enemy {
    constructor (gameScreen) {
        this.gameScreen = gameScreen
        this.height = 180
        this.width = 100
        this.top = Math.floor(Math.random() * (720 - this.height))
        this.left = 1500
        this.element = document.createElement('img')
        this.element.src = "images/trooper.png"
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element) 
}

move () {
    this.left -= 7
    this.updatePosition()
}

updatePosition() {
    this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
}
didCollide(projectile) {
    const enemyRect = this.element.getBoundingClientRect();
    const projectileRect = projectile.element.getBoundingClientRect();

    if (
        enemyRect.left < projectileRect.right &&
        enemyRect.right > projectileRect.left &&
        enemyRect.top < projectileRect.bottom &&
        enemyRect.bottom > projectileRect.top
    ) {
        console.log('Enemy Collision detected!');
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