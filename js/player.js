class Player {
    constructor (gameScreen) {
        this.gameScreen = gameScreen
        this.left = 30
        this.top = 250
        this.height = 250
        this.width = 160
        this.directionX = 0
        this.directionY = 0
        this.element = document.createElement('img')
        this.element.src = "../images/mando.png"
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

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;     
    }
}