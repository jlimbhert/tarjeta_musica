// 1. CONFIGURACIÓN CENTRALIZADA
const cancion = {
titulo: "Nena Maldición",
audio: "assets/audio/cancion1.mp3",
imagen: "assets/images/icono.png",
fondo: "url('assets/images/fondo.png')",
colorPrincipal: "#161616",
colorDeLetra: "#FC651F",
opacidadFondo: 0.7,

letraSincronizada: [
[2, "Mi futuro y tu presente"],
[4, "Ya no quieren coincidir"],
[6, "Pero el corazón no miente"],
[8, "Cuando te pones hablar de mi"],
[10, "Sabes bien que aunque no quieras"],
[12, "Nadie ocupa mi lugar"],
[14, "Que los besos que te he dado"],
[17, "Nadie los puede igualar"],
[18, "Hasta cuando y hastado donde"],
[21, "Tú y yo vamos a esperar"],
[23, "Y es que tú"],
[24, "Tú no te imaginas"],
[26, "Cuanto me ha costado"],
[29, "Comenzar de nuevo"],
[31, "Entre el recuerdo y tu pasado"],
[24, "Tú no te imaginas"],
[43, "Lo que te he querido"],
[38, "Odio cuando dices"],
[24, "Que mejor seamos amigos..."],
]
};

// 2. APLICACIÓN DE ESTILOS DINÁMICOS
const root = document.documentElement;
root.style.setProperty('--url-fondo', cancion.fondo);
root.style.setProperty('--opacidad-capa', cancion.opacidadFondo);
root.style.setProperty('--color-acento', cancion.colorPrincipal);
root.style.setProperty('--color-letra', cancion.colorDeLetra);

document.getElementById('idTitulo').textContent = cancion.titulo;
document.getElementById('idImagen').src = cancion.imagen;

// 3. LÓGICA DEL REPRODUCTOR
const btnPlay = document.getElementById('botonPlay');
const spanIcono = document.getElementById('estadoIcono');
const ondasContenedor = document.getElementById('ondasContenedor');
const textoDestino = document.getElementById('textoVerso');
const cajaScroll = document.getElementById('cajaScroll');

const cancionAudio = new Audio(cancion.audio);

// Generar ondas
for (let i = 0; i < 15; i++) {
const onda = document.createElement('div');
onda.classList.add('una-onda');
ondasContenedor.appendChild(onda);
}
const todasLasOndas = document.querySelectorAll('.una-onda');

function moverOndas() {
if (!cancionAudio.paused) {
todasLasOndas.forEach(onda => {
const altura = Math.floor(Math.random() * 25) + 5;
onda.style.height = `${altura}px`;
onda.classList.add('activa');
});
setTimeout(moverOndas, 150);
} else {
todasLasOndas.forEach(onda => {
onda.style.height = '5px';
onda.classList.remove('activa');
});
}
}

// LÓGICA DE SINCRONIZACIÓN:
cancionAudio.ontimeupdate = () => {
const tiempoActual = cancionAudio.currentTime;

cancion.letraSincronizada.forEach((linea) => {
const tiempoFrase = linea[0];
const textoFrase = linea[1];

// Si el tiempo del audio pasó la marca, escribimos la línea
if (tiempoActual >= tiempoFrase) {
// Verificamos si la frase ya está en pantalla para no repetirla
if (!textoDestino.innerText.includes(textoFrase)) {
textoDestino.innerHTML += textoFrase + "<br>";
cajaScroll.scrollTop = cajaScroll.scrollHeight;
}
}
});
};

btnPlay.addEventListener('click', () => {
if (cancionAudio.paused) {
cancionAudio.play();
spanIcono.innerHTML = '&#10074;&#10074;';
moverOndas();
} else {
cancionAudio.pause();
spanIcono.innerHTML = '&#9658;';
}
});

cancionAudio.onended = () => {
spanIcono.innerHTML = '&#9658;';
textoDestino.innerHTML = ""; // Limpia la letra al terminar
};