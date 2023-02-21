var canvas = document.getElementById("world");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

var x = width / 2; // cursor x
var y = height / 2; // cursor y
var nx = width / 2; // new x of star
var ny = height / 2; // new y of star
var rotationSpeed = 0.02;

// defining star class
class star {
    radius;
    color;
    theta;
    px;
    py;

    constructor(radius, color, theta) {
        this.radius = radius;
        this.color = color;
        this.theta = theta;
        this.px = width / 2;
        this.py = height / 2;
    }
}
// defining stars
var stars = [];
var numStars = 101;

for (var i = 0; i < numStars; i++) {
    var newStar = new star(randomInt(20, 150), randomCol(), randomFloat(0, Math.PI * 2));
    stars.push(newStar);
}

// function returns random integer number
function randomInt(a, b) {
    return Math.floor(Math.random() * b + a);
}

// function returns random float number
function randomFloat(a, b) {
    return Math.random() * b + a;
}

// function returns random color
function randomCol() {
    return "rgb(" + randomInt(0, 255) + "," + randomInt(0, 255) + "," + randomInt(0, 255) + ")";
}

// gathering most recent mouse position
function mousePosition(event) {
    x = event.clientX;
    y = event.clientY;
}

function ani() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.save();

    for (var i = 0; i < stars.length; i++) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = stars[i].color;
        stars[i].theta += rotationSpeed;

        const ls = {
            a: stars[i].px,
            b: stars[i].py,
        };

        nx = x + stars[i].radius * Math.cos(stars[i].theta);
        ny = y + stars[i].radius * Math.sin(stars[i].theta);

        stars[i].px = nx;
        stars[i].py = ny;

        ctx.beginPath();
        ctx.moveTo(ls.a, ls.b);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
    window.requestAnimationFrame(ani);
}
ani();


window.addEventListener("mousemove", mousePosition);
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
})

