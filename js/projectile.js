class Projectile {
    constructor(gameScreen, x, y) {
        this.gameScreen = gameScreen;
        this.width = 100;
        this.height = 50;
        this.visible = false; // Alapértelmezés szerint nem látható
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

    // Új metódus az láthatóság frissítéséhez
    updateVisibility() {
        this.element.style.display = this.visible ? 'block' : 'none';
    }

    // Lövedék láthatóságának beállítása
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
            const newLeft = currentLeft + 25; // Balról jobbra mozgás
    
            this.element.style.left = `${newLeft}px`;
    
            // Ellenőrizze, hogy a lövedék elért-e egy bizonyos pontot (pl. 1300px)
            if (newLeft > 1300) {
                // Ha igen, állítsd láthatatlanná és helyezd vissza az eredeti pozíciójába
                this.setVisibility(false);
                this.element.style.left = '0px';
                this.stopMoving() 
            } else {
                setTimeout(() => this.move(), 16);
            }
        }
    }
}