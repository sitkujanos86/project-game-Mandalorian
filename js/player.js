class Player {
    constructor (gameScreen) {
        this.gameScreen = gameScreen
        this.left = 0
        this.top = 0
        this.height = 50
        this.width = 40
        this.element = document.createElement('img')
        this.element.src = "../images/mando.png"
        this.element.style.position = 'absolute'

        this.gameScreen.appendChild(this.element)
    }
}