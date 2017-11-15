// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here, we've provided one for you to get started

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed ford
    // all computers.
    this.x += dt * this.speed;

    if(this.x > ctx.canvas.width) {
        this.x = - 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(x, y) {
    if ( x === undefined || y === undefined ) { return; }
    this.x += x;
    this.y += y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var tileWidth = 100;
    var tileHeight = 80;

    switch(key) {
        case 'up':
            if (this.y - tileHeight >= -20) {
                this.update(0, -tileHeight);
               
            }
            break;
        case 'down':
            if (this.y + tileHeight < ctx.canvas.height - 160) {
                this.update(0, tileHeight);
            }
            break;
        case 'right':
            if (this.x + tileWidth < tileWidth * 5) {
                this.update(tileWidth, 0);
            }
            break;
        case 'left':
            if (this.x - tileWidth >= 0) {
                this.update(-tileWidth, 0);
            }
            break;
    }
};
    

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyPositions = [60, 140, 220];
var allEnemies = enemyPositions.map(function(y) {
    return new Enemy(0, y, 100 +  Math.floor(Math.random() * 200));
});
var player = new Player(200, 300);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
