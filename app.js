// @ts-nocheck
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let wobble = 1;

class Particle {
    constructor(moveRadius, step, position, size) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
    }
    draw() {
        wobble += 0.0001;
        let x = (Math.cos(this.position) + Math.cos(wobble)) * this.moveRadius + canvas.width / 2;
        let y = (Math.sin(this.position) + Math.sin(wobble)) * this.moveRadius + canvas.height / 2;
        // Start Stars
        drawStar(x, y, 5, this.size, this.size / 2);
        // End Stars
        //Start  circle
        ctx.beginPath();
        ctx.arc(
            x,
            y,
            this.size,
            0,
            Math.PI * 2
        );
        ctx.closePath();
        // sphere
        // ctx.fillStyle = "white";
        // ctx.fill();
        // End Circle
        // circle
        ctx.strokeStyle = "orange";
        ctx.stroke();
    }
    update() {
        this.position += this.step;
        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        const moveRadius = Math.random() * canvas.width;
        const step = Math.random() * 0.002 + 0.002;
        const position = Math.random() * (Math.PI * 2);
        const size = Math.random() * 8 + 0.5;
        particles.push(new Particle(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    // trails (estela)
    ctx.fillStyle = "rgba(0,0,0,0.05)";

    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// drawStar

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius) {
    let rotation = (Math.PI / 2) * 3;
    let x = positionX;
    let y = positionY;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(positionX, positionY - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = positionX + Math.cos(rotation) * outerRadius;
        y = positionY + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = positionX + Math.cos(rotation) * innerRadius;
        y = positionY + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;
    }
    ctx.lineTo(positionX, positionY - outerRadius);
    ctx.closePath();
}

// function drawStar(ctx, x, y, radius, npoints) {
//     var angle = Math.PI / 2 * 3;
//     var step = Math.PI / npoints;
//     ctx.beginPath();
//     ctx.moveTo(
//         x + radius * Math.cos(angle),
//         y + radius * Math.sin(angle)
//     );
//     for (var i = 0; i < npoints; i++) {
//         angle += step;
//         ctx.lineTo(
//             x + radius * Math.cos(angle),
//             y + radius * Math.sin(angle)
//         );
//     }
//     ctx.closePath();
//     ctx.stroke();
// }
