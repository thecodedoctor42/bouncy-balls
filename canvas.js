var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var ballArray
var ball 
var gravity = 1
var friction = 0.95
var ballsAmount = 100
// Add a mouse move listener to the canvas
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener('click', function(){
    init()
})


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
  

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color + "75";
        c.fill()
        c.closePath()
    }
    this.update = function(){
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx
        }
        if (this.y + this.radius + this.dy >= canvas.height){
            this.dy = -this.dy * friction
            this.dx = this.dx * friction
        }
        // To simulate gravity, all we need is an else statement here:
        else{
            // We're adding 1 velocity to the dy variable with every 
            // redraw of the circle.
            this.dy += gravity
            // As the ball approaches the bottom canvas border it's velocity
            // increases, and because we make the velocity negative when it bounces
            // up we're adding to it and so slowing it down as it travels upwards.
            // Once 0 velocity is reached the ball keeps increasing velocity and so 
            // reverses direction again as velocity increase in to positive dy values.
        }
        this.x += this.dx
        this.y += this.dy
        // This is gonna draw a new circle with every function call
        this.draw()
    }
}

function init(){
    ballArray = []

    for (let i = 0; i < ballsAmount; i++) {
        var radius = randomIntFromRange(5, 50)
        var x = randomIntFromRange(0 + radius, canvas.width - radius)
        var y = randomIntFromRange(0 + radius, canvas.height / 3)
        var dx = randomIntFromRange(-5, 5)
        var dy = randomIntFromRange(0, 5)
        var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ball = new Ball(x, y, dx, dy, radius, color)
        ballArray.push(ball)
    }
}

function animate(){
    requestAnimationFrame(animate);
    // Clear the entire canvas with every iteration
    // c.clearRect(x, y, width, height)
    c.clearRect(0, 0, innerWidth, innerHeight);
    ballArray.forEach(ball => {
        ball.update()
    })
}
// By doing this the animation works through refreshing the page over and over
// moving the object by a vector with every refresh

init()
animate()
