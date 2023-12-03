class Game {
    constructor () {
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.height = 
        this.width = 
        this.player = null
        this.enemies = []
        this.animateId = null
    }

    start() {
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`

        this.player = new Player(this.gameScreen)
        this.gameLoop()
    }

    gameLoop() {
        this.player.move()

        const nextEnemies = []
        this.enemies.forEach(currentEnemy => {
            currentEnemy.move()
            if(currentEnemy.left + currentEnemy.width > 0) {
                nextEnemies.push(currentEnemy)            
            }
        })
        this.enemies = nextEnemies

        if (this.animateId % 250 == 0) {
            this.enemies.push(new Enemy(this.gameScreen))
        }
        console.log(this.enemies)
        this.animateId = requestAnimationFrame (() => {
            console.log(this)
            this.gameLoop()})
    }
}