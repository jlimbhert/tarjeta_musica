// 1. CONFIGURACIÓN CENTRALIZADA
const cancion = {
    titulo: "Nunca lo Olvides",
    audio: "assets/audio/cancion1.mp3",
    imagen: "assets/images/delijitos.png",
    fondo: "url('assets/images/fondo1.jpg')",
    colorPrincipal: "#ff0000",   
    colorDeLetra: "#ffd700",     
    opacidadFondo: 0.7,          
    velocidadLetras: 100,
    letra: "No me arrepiento,\nde nada contigo\nContigo me muero\nContigo revivo\nSos mi victoria\nY sos mi fracaso\nY sos mi victoria\nY sos mi fracaso\nSos todo lo bueno\nSos todo lo malo\nAquí estoy\nOtra vez...\n\nSoy tu soldado\nde brazos rendidos\nsiempre en esta gerra\nsalimos heridos\nComo explicarte\neste sentimiento\nSino me acostumbro\nSi no lo resuelvo\n\nNunca te olvides\nQue te doy mi vida\nTe extraño de noche\nTe quiero de día\n\nQuiero llevarte\nPor siempre conmigo\nHacia ningun lado\nhacia el infinito..."
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
let index = 0;
let escrituraIniciada = false;

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

function arrancarEscritura() {
    if (index < cancion.letra.length) {
        textoDestino.textContent += cancion.letra.charAt(index);
        index++;
        cajaScroll.scrollTop = cajaScroll.scrollHeight;
        setTimeout(arrancarEscritura, cancion.velocidadLetras);
    }
}

btnPlay.addEventListener('click', () => {
    if (cancionAudio.paused) {
        cancionAudio.play();
        spanIcono.innerHTML = '&#10074;&#10074;'; 
        moverOndas();
        if (!escrituraIniciada) {
            arrancarEscritura();
            escrituraIniciada = true;
        }
    } else {
        cancionAudio.pause();
        spanIcono.innerHTML = '&#9658;'; 
    }
});

cancionAudio.onended = () => {
    spanIcono.innerHTML = '&#9658;';
    index = 0;
    escrituraIniciada = false;
    textoDestino.textContent = "";
};
