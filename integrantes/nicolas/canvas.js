// Nicolás Herrera · PORTAL 404 · Arte generativo con Canvas 2D
// Todas las figuras y letras del afiche se dibujan con JavaScript.

const canvas = document.getElementById("canvasNicolas");
const ctx = canvas.getContext("2d");

// Arreglo con DOS paletas originales de al menos CUATRO colores.
const paletas = [
    { nombre: "Arcade", fondo1: "#070e24", fondo2: "#18103e", colores: ["#d3fb65", "#76f7e3", "#ff6fba", "#ffb35c"] },
    { nombre: "Synthwave", fondo1: "#210b34", fondo2: "#091b46", colores: ["#ff77bb", "#a48bff", "#ffcf74", "#6cc8ff"] }
];
let paletaActual = 0;
let numeroPoster = 0;

function numeroAleatorio(min, max) {
    return min + Math.random() * (max - min);
}

// Función 1: fondo Canvas (degradado, estrellas y sol pixelado).
function dibujarFondo() {
    const paleta = paletas[paletaActual];
    const fondo = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    fondo.addColorStop(0, paleta.fondo1);
    fondo.addColorStop(1, paleta.fondo2);
    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Resplandor detrás del portal.
    const brillo = ctx.createRadialGradient(490, 295, 15, 490, 295, 360);
    brillo.addColorStop(0, paleta.colores[1] + "38");
    brillo.addColorStop(1, "#00000000");
    ctx.fillStyle = brillo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 65 estrellas con posiciones aleatorias; círculos mediante arc().
    for (let i = 0; i < 65; i++) {
        const x = numeroAleatorio(30, 930);
        const y = numeroAleatorio(25, 460);
        const radio = numeroAleatorio(1, 2.7);
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fillStyle = paleta.colores[i % 4];
        ctx.globalAlpha = numeroAleatorio(0.35, 0.85);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// Función 2: cuadrícula de suelo retro con líneas y perspectiva.
function dibujarSuelo() {
    const color = paletas[paletaActual].colores[1];
    const horizonte = 385;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.32;
    for (let i = -8; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(480 + i * 32, horizonte);
        ctx.lineTo(480 + i * 128, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < 9; i++) {
        const progreso = i / 8;
        const y = horizonte + progreso * progreso * (canvas.height - horizonte);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// Función 3: el portal es una secuencia de marcos inclinados y anillos.
function dibujarPortal() {
    const paleta = paletas[paletaActual];
    const centroX = numeroAleatorio(455, 510);
    const centroY = numeroAleatorio(295, 325);
    const giro = numeroAleatorio(-0.14, 0.14);
    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(giro);

    // Marcos: rectángulos mediante strokeRect() y líneas mediante moveTo/lineTo.
    for (let i = 0; i < 6; i++) {
        const tamaño = 240 - i * 32;
        const color = paleta.colores[i % 4];
        ctx.strokeStyle = color;
        ctx.lineWidth = i === 0 ? 8 : 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.strokeRect(-tamaño / 2, -tamaño / 2, tamaño, tamaño);
    }
    ctx.shadowBlur = 0;
    // Círculo dentro del portal: no es un conjunto aleatorio igual al ejemplo.
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fillStyle = paleta.colores[2];
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fillStyle = paleta.fondo1;
    ctx.fill();
    ctx.restore();
}

// Función 4: partículas pixel, triángulos y círculos.
function dibujarFragmentos() {
    const paleta = paletas[paletaActual];
    // Bucle for: 44 elementos diferentes como mínimo (más de los 15 pedidos).
    for (let i = 0; i < 44; i++) {
        const x = numeroAleatorio(34, 925);
        const y = numeroAleatorio(95, 505);
        const tamaño = numeroAleatorio(6, 23);
        const color = paleta.colores[i % 4];
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        // Condicional if / else if / else: alterna tres figuras.
        if (i % 3 === 0) {
            ctx.fillRect(x, y, tamaño, tamaño); // cuadrados
        } else if (i % 3 === 1) {
            ctx.beginPath();
            ctx.moveTo(x, y - tamaño);
            ctx.lineTo(x + tamaño, y + tamaño);
            ctx.lineTo(x - tamaño, y + tamaño);
            ctx.closePath();
            ctx.stroke(); // triángulos
        } else {
            ctx.beginPath();
            ctx.arc(x, y, tamaño * 0.45, 0, Math.PI * 2);
            ctx.stroke(); // círculos
        }
    }
}

// Función 5: tipografía se dibuja DENTRO de Canvas con fillText().
function dibujarTexto() {
    ctx.save();
    ctx.fillStyle = "rgba(5,8,24,0.78)";
    ctx.fillRect(42, 34, 440, 108);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 64px Arial, sans-serif";
    ctx.fillText("PORTAL 404", 60, 100);
    ctx.fillStyle = paletas[paletaActual].colores[0];
    ctx.font = "bold 18px Arial, sans-serif";
    ctx.fillText("DEL PIXEL A OTRO UNIVERSO", 63, 127);
    ctx.fillStyle = "#e1dcff";
    ctx.font = "bold 15px Arial, sans-serif";
    ctx.fillText("N. HERRERA   /   CREATIVE CODE", 52, 588);
    ctx.textAlign = "right";
    ctx.fillText("NO. " + String(numeroPoster).padStart(3, "0"), 915, 588);
    ctx.restore();
}

// Función principal: cada clic genera una composición nueva.
function generarComposicion() {
    numeroPoster++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarFondo();
    dibujarSuelo();
    dibujarPortal();
    dibujarFragmentos();
    dibujarTexto();
    document.getElementById("nicoEstado").textContent = "Composición " + numeroPoster + " · paleta " + paletas[paletaActual].nombre + ".";
}

function seleccionarPaleta(numero) {
    paletaActual = numero;
    const b1 = document.getElementById("nicoPaleta1");
    const b2 = document.getElementById("nicoPaleta2");
    b1.classList.toggle("activa", numero === 0);
    b2.classList.toggle("activa", numero === 1);
    b1.setAttribute("aria-pressed", String(numero === 0));
    b2.setAttribute("aria-pressed", String(numero === 1));
    generarComposicion();
}

// Eventos addEventListener conectan los botones HTML al JavaScript.
document.getElementById("nicoPaleta1").addEventListener("click", function () { seleccionarPaleta(0); });
document.getElementById("nicoPaleta2").addEventListener("click", function () { seleccionarPaleta(1); });
document.getElementById("nicoGenerar").addEventListener("click", generarComposicion);
document.getElementById("nicoGuardar").addEventListener("click", function () {
    const enlace = document.createElement("a");
    enlace.download = "Herrera_Nicolas_Portal404.png";
    enlace.href = canvas.toDataURL("image/png");
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    document.getElementById("nicoEstado").textContent = "PNG descargado correctamente.";
});

// La composición aparece al abrir la página, sin presionar ningún botón.
generarComposicion();
