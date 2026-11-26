
const canvas = document.getElementById("brutalCanvas");
const ctx = canvas.getContext("2d");

const botonLimpiar = document.getElementById("limpiarCanvas");

let particulas = [];
let mouse = { x: -1000, y: -1000 };

const colores = [
    "#171717",
    "#7436df",
    "#ff5733",
    "#d7ff36",
    "#f2eee3"
];

// AJUSTAR TAMAÑO DEL CANVAS

function ajustarCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// CREAR FIGURAS

function crearParticula(x, y) {

    particulas.push({
        x: x,
        y: y,

        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,

        size: Math.random() * 45 + 15,

        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.08,

        color: colores[
            Math.floor(Math.random() * colores.length)
        ],

        vida: 1
    });

    // Limitar cantidad de figuras

    if (particulas.length > 100) {
        particulas.shift();
    }
}

// INTERACCIÓN CON EL MOUSE

canvas.addEventListener("pointermove", function(e) {

    const rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    if (e.buttons === 1 || e.pointerType === "touch") {
        crearParticula(mouse.x, mouse.y);
    }

    // Crear figuras al mover el cursor

    if (Math.random() > 0.65) {
        crearParticula(mouse.x, mouse.y);
    }

});

// CREAR COMPOSICIÓN AL HACER CLIC

canvas.addEventListener("click", function(e) {

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 12; i++) {
        crearParticula(x, y);
    }

});

// DIBUJAR FIGURA BRUTALISTA

function dibujarParticula(p) {

    ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    ctx.fillStyle = p.color;

    const tipo = Math.floor(p.size) % 3;

    if (tipo === 0) {

        // CUADRADO

        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
        );

    } else if (tipo === 1) {

        // CÍRCULO

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            p.size / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();

    } else {

        // TRIÁNGULO

        ctx.beginPath();

        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);

        ctx.closePath();
        ctx.fill();

    }

    ctx.restore();
}

// ANIMACIÓN PRINCIPAL

function animar() {

    const ancho = canvas.clientWidth;
    const alto = canvas.clientHeight;

    // Fondo

    ctx.fillStyle = "#e8e3d6";
    ctx.fillRect(0, 0, ancho, alto);

    // Cuadrícula brutalista

    ctx.strokeStyle = "#17171722";
    ctx.lineWidth = 1;

    for (let x = 0; x < ancho; x += 35) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, alto);
        ctx.stroke();

    }

    for (let y = 0; y < alto; y += 35) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ancho, y);
        ctx.stroke();

    }

    // Elementos decorativos

    ctx.fillStyle = "#171717";
    ctx.font = "bold 12px Arial";
    ctx.fillText("BRUTALISM / 001", 20, 30);

    ctx.font = "bold 55px Arial";
    ctx.fillText("FORM", 20, alto - 35);

    ctx.fillStyle = "#7436df";
    ctx.fillRect(ancho - 65, 20, 40, 40);

    // Dibujar partículas

    particulas.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.985;
        p.vy *= 0.985;

        p.rotation += p.rotationSpeed;

        p.vida -= 0.0015;

        dibujarParticula(p);

        if (p.vida <= 0) {
            particulas.splice(index, 1);
        }

    });

    // Indicador del cursor

    if (mouse.x > 0 && mouse.y > 0) {

        ctx.beginPath();

        ctx.arc(
            mouse.x,
            mouse.y,
            8,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "#7436df";
        ctx.lineWidth = 2;
        ctx.stroke();

    }

    requestAnimationFrame(animar);
}

animar();

// REINICIAR COMPOSICIÓN

botonLimpiar.addEventListener("click", function() {

    particulas = [];

    mouse.x = -1000;
    mouse.y = -1000;

});
