const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

const paletas = [
    ["#00E5FF", "#FF4081", "#00E676", "#FFAB00"],
    ["#C5B3FF", "#FFB4CD", "#9BE8D2", "#FFE0A0"]
];

let paletaActual = 0;

function dibujarFondo() {
    const fondo = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    fondo.addColorStop(0, "#0A1424");
    fondo.addColorStop(1, paletaActual === 0 ? "#24334A" : "#493A63");

    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        const y = 75 + i * 52;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(860, y);
        ctx.stroke();
    }
}

function dibujarFiguras() {
    for (let i = 0; i < 28; i++) {
        const x = 65 + Math.random() * 750;
        const y = 60 + Math.random() * 385;
        const tamano = 15 + Math.random() * 45;

        ctx.fillStyle = paletas[paletaActual][i % 4];

        if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(x, y, tamano / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(x, y, tamano, tamano);
        }
    }
}

function generarComposicion() {
    dibujarFondo();
    dibujarFiguras();
    document.getElementById("mensajeCanvas").textContent = "¡Composición generada!";
}

document.getElementById("paleta1").addEventListener("click", function () {
    paletaActual = 0;
    document.getElementById("paleta1").classList.add("seleccionada");
    document.getElementById("paleta2").classList.remove("seleccionada");
    generarComposicion();
});

document.getElementById("paleta2").addEventListener("click", function () {
    paletaActual = 1;
    document.getElementById("paleta2").classList.add("seleccionada");
    document.getElementById("paleta1").classList.remove("seleccionada");
    generarComposicion();
});

document.getElementById("generar").addEventListener("click", generarComposicion);

document.getElementById("guardar").addEventListener("click", function () {
    const enlace = document.createElement("a");
    enlace.download = "pulso-visual.png";
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
});

generarComposicion();
