/* =========================================
   1. VARIABLES Y CONFIGURACIÓN
   ========================================= */
const btnPlay = document.getElementById('botonPlay');
const spanIcono = document.getElementById('estadoIcono');
const ondasContenedor = document.getElementById('ondasContenedor');
const textoDestino = document.getElementById('textoVerso');
const cajaScroll = document.getElementById('cajaScroll');

// Letra de la canción (Edita este texto para cada video)
const contenidoVerso = "No me arrepiento,\nde nada contigo\nContigo me muero\nContigo revivo\nSos mi victoria\nY sos mi fracaso\nY sos mi victoria\nY sos mi fracaso\nSos todo lo bueno\nSos todo lo malo\nAquí estoy\nOtra vez...\n\nSoy tu soldado\nde brazos rendidos\nsiempre en esta gerra\nsalimos heridos\nComo explicarte\neste sentimiento\nSino me acostumbro\nSi no lo resuelvo\n\nNunca te olvides\nQue te doy mi vida\nTe extraño de noche\nTe quiero de día\n\nQuiero llevarte\nPor siempre conmigo\nHacia ningun lado\nhacia el infinito...";

// Audio
const cancionAudio = new Audio('assets/audio/cancion1.mp3');

let index = 0;
let escrituraIniciada = false;

/* =========================================
   2. CREACIÓN DE ONDAS VISUALES
   ========================================= */
for (let i = 0; i < 15; i++) {
const onda = document.createElement('div');
onda.classList.add('una-onda');
if (i % 2 === 0) onda.classList.add('roja');
ondasContenedor.appendChild(onda);
}

const todasLasOndas = document.querySelectorAll('.una-onda');

function moverOndas() {
todasLasOndas.forEach(onda => {
const alturaAleatoria = Math.floor(Math.random() * 25) + 5;
onda.style.height = `${alturaAleatoria}px`;
});
if (!cancionAudio.paused) {
setTimeout(moverOndas, 150);
} else {
todasLasOndas.forEach(onda => onda.style.height = '5px');
}
}

/* =========================================
   3. EFECTO MÁQUINA DE ESCRIBIR CON SCROLL
   ========================================= */
function arrancarEscritura() {
if (index < contenidoVerso.length) {
textoDestino.textContent += contenidoVerso.charAt(index);
index++;

// AUTO-SCROLL: Empuja el texto hacia arriba para que siempre se vea lo nuevo
cajaScroll.scrollTop = cajaScroll.scrollHeight;

// Velocidad de escritura (ajusta según el ritmo de la canción)
setTimeout(arrancarEscritura, 100);
}
}

/* =========================================
   4. CONTROL DEL REPRODUCTOR
   ========================================= */
btnPlay.addEventListener('click', () => {
if (cancionAudio.paused) {
cancionAudio.play();
spanIcono.innerHTML = '&#10074;&#10074;'; // Pausa
moverOndas();

if (!escrituraIniciada) {
arrancarEscritura();
escrituraIniciada = true;
}
} else {
cancionAudio.pause();
spanIcono.innerHTML = '&#9658;'; // Play
}
});

// Resetear al terminar
cancionAudio.onended = () => {
spanIcono.innerHTML = '&#9658;';
index = 0;
escrituraIniciada = false;
textoDestino.textContent = "";
};