window.addEventListener('load', () => {
    const startButton = document.getElementById('start-button')
    const restartButton = document.getElementById('restart-button')

    const game = new Game ()

    function startGame() {
        console.log('start game')
        game.start()
    }

    startButton.addEventListener("click", function () {
        startGame()
    })

    document.addEventListener('keydown', event => {
        if (event.code == 'ArrowUp' || event.code == 'KeyW') {
            console.log('up')
            game.player.directionY = -5
        }
        if (event.code == 'ArrowDown' || event.code == 'KeyS') {
            console.log('down')
            game.player.directionY = 5
        }
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            console.log('Left')
            game.player.directionX = -5
        }
        if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            console.log('Right')
            game.player.directionX = 5
        }
        if (event.code == 'Space') {
            console.log('Shoot')
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code == 'ArrowUp' || event.code == 'KeyW' || 
            event.code == 'ArrowDown' || event.code == 'KeyS') {
            console.log('stop moving on Y')
            game.player.directionY = 0
        }
        if (event.code == 'ArrowLeft' || event.code == 'KeyA' ||
            event.code == 'ArrowRight' || event.code == 'KeyD') {
            console.log('stop moving on X')
            game.player.directionX = 0
        }
    })
})