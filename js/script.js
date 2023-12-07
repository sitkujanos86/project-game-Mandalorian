window.addEventListener('load', () => {
    const startButton = document.getElementById('start-button')
    const restartButton = document.getElementById('restart-button')
    const winRestartButton = document.getElementById('win-restart-button');

    let game

    function startGame() {
        console.log('start game')
        game = new Game ()
        game.start()
    }

    function restartGame() {
        // Clear existing game objects
        clearGameObjects();
    
        // Create a new instance of the Game class
        game = new Game();
    
        // Start the new game
        game.start();
    }
    
    function clearGameObjects() {
        // Clear enemies
        game.enemies.forEach(enemy => enemy.element.remove());
        game.enemies = [];
    
        // Clear projectiles
        game.projectiles.forEach(projectile => projectile.element.remove());
        game.projectiles = [];
    
        // Clear player
        if (game.player) {
            game.player.element.remove();
            game.player = null;
        }
    }
    

       startButton.addEventListener("click", function () {
        startGame()
    })

    restartButton.addEventListener("click", function () {
        location.reload()
    })

    winRestartButton.addEventListener('click', () => {
        document.getElementById('game-win').style.display = 'none';
        location.reload()
    });

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
        if (event.code === 'Space') {
            console.log('Shoot')
            game.projectiles.push(new Projectile(game.gameScreen, game.player.left + 160, game.player.top +130)) ;
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