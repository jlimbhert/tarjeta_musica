// 1. CONFIGURACIÓN CENTRALIZADA
const cancion = {
titulo: "Nena Maldición",
audio: "assets/audio/cancion1.mp3",
imagen: "assets/images/icono.png",
fondo: "url('assets/images/fondo.png')",
colorPrincipal: "#ff0000",
colorDeLetra: "#ffd700",
opacidadFondo: 0.7,

// AQUÍ PONES EL SEGUNDO EXACTO Y LA FRASE
letraSincronizada: [
[2, "Mirada fría como la nieve,"],
[4, "me congela hasta no dar más"],
[6, "si me toca hace que me eleve"],
[8, "hasta ni ver toda la ciudad"],
[10, "Compraría lo que ella quiere"],
[12, "con tal que venga para acá"],
[14, "Estaríamos como se debe,"],
[17, "relajados sin un problema"],
[18, "Seguro tiene mil pretendientes"],
[21, "pero ni uno valiente"],
[23, "para hacerle ternuras"],
[24, "sin miedo a qué diga la gente"],
[26, "Yo sé bien lo que siente"],
[29, "sé muy bien lo que siente"],
[31, "Que todos somos iguales"],
[43, "con los mismos errores de siempre"],
[38, "No vez que me estoy muriendo<br>porque un ratito me regales tu atención"],
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

// LÓGICA DE SINCRONIZACIÓN: Revisa el tiempo del audio constantemente
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