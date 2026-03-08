/*
========================================
1️⃣ CONFIGURACIÓN DE LA CANCIÓN
========================================
Todo lo que se puede personalizar
*/
const cancion = {
titulo: "Nena Maldición",
audio: "assets/audio/cancion1.mp3",
imagen: "assets/images/icono.png",
fondo: "assets/images/fondo.png",
video: null,

colorBorde: "#2b6cff",
colorTexto: "#d6e4ff",
colorUI: "#6fa3ff",
colorCursor: "#ffffff",

opacidadFondo: 0.7,

letraSincronizada: [
[2, "Tu pasiencia y mi silencio"],
[4, "Decidieron terminar"],
[6, "Tu memoria y mi recuerdo"],
[8, "Ya no quieren conversar"],
[10, "Son tus besos mi frontera"],
[12, "Y tu carcel mi querer"],
[14, "Y aunque digas que no quieras"],
[14, "Tu tambien quieres volver"],
[14, "Hasta cuando y hasta donde"],
[14, "Tú y yo vamos a esperar"],
[14, "Y es que Tú"],
[17, "Tú no te imaginas"]
[14, "Cuanto me ha costado"],
[14, "Comenzar de nuevo"],
[14, "entre el recuerdo y tu pasado"],
[14, "Tú no te imaginas"],
[14, "Lo que te he querido"],
[14, "De una vez por todas"],
[14, "O regresas o te olvido"],
[14, "..."],
]
}

/*
========================================
2️⃣ APLICAR COLORES Y FONDO DINÁMICOS
========================================
*/
const root = document.documentElement

root.style.setProperty('--url-fondo', `url('${cancion.fondo}')`)
root.style.setProperty('--opacidad-capa', cancion.opacidadFondo)
root.style.setProperty('--color-borde', cancion.colorBorde)
root.style.setProperty('--color-texto', cancion.colorTexto)
root.style.setProperty('--color-ui', cancion.colorUI)
root.style.setProperty('--color-cursor', cancion.colorCursor)

/*
========================================
VIDEO DE FONDO OPCIONAL
========================================
*/

if (cancion.video){
const video = document.createElement("video")
video.src = cancion.video
video.autoplay = true
video.loop = true
video.muted = true
video.playsInline = true
video.style.position = "fixed"
video.style.top = "0"
video.style.left = "0"
video.style.width = "100%"
video.style.height = "100%"
video.style.objectFit = "cover"
video.style.zIndex = "-2"
document.body.prepend(video)
}

/*
========================================
3️⃣ CARGAR TÍTULO E IMAGEN
========================================
*/
document.getElementById("idTitulo").textContent = cancion.titulo
const imagen = document.getElementById("idImagen")
imagen.src = cancion.imagen


/*
========================================
4️⃣ CREAR CONTENEDOR DE LETRAS
========================================
Cada línea se convierte en un div
*/
const contenedor = document.getElementById("cajaScroll")

let lineas = []

cancion.letraSincronizada.forEach(item=>{

const div = document.createElement("div")

div.classList.add("linea")

div.innerText = item[1]

contenedor.appendChild(div)

lineas.push(div)

})


/*
========================================
5️⃣ CONFIGURACIÓN DEL AUDIO
========================================
*/
const audio = new Audio(cancion.audio)


/*
========================================
6️⃣ BOTÓN PLAY
========================================
*/
const btnPlay = document.getElementById("botonPlay")
const icono = document.getElementById("estadoIcono")


/*
========================================
7️⃣ CREAR ONDAS DEL ECUALIZADOR
========================================
*/
const ondasContenedor = document.getElementById("ondasContenedor")

for (let i = 0; i < 15; i++){

const onda = document.createElement("div")

onda.classList.add("una-onda")

ondasContenedor.appendChild(onda)

}

const ondas = document.querySelectorAll(".una-onda")


/*
========================================
8️⃣ FUNCIÓN DE ANIMACIÓN DE ONDAS
========================================
✔ simula ecualizador
✔ actúa como barra de progreso
✔ hace pulsar la imagen
*/
function moverOndas(){

if (!audio.paused){

let energia = 0

const progreso = audio.currentTime / audio.duration
const ondasEncendidas = Math.floor(progreso * ondas.length)

ondas.forEach((onda,index)=>{

const altura = Math.floor(Math.random()*25)+5

onda.style.height = altura+"px"

energia += altura

if (index <= ondasEncendidas){

onda.classList.add("activa")

} else {

onda.classList.remove("activa")

}

})

/*
Pulso de la imagen central
(simula reacción a la música)
*/

const pulso = 1 + (energia / 600)
imagen.style.transform = `scale(${pulso})`
/*
Reacción del marco al ritmo
*/
const marco = document.getElementById("marcoCancion")
const brillo = 10 + (energia / 40)

marco.style.boxShadow =
`0 0 ${brillo}px var(--color-borde),
0 0 ${brillo*2}px var(--color-borde)`
setTimeout(moverOndas, 150)

} else {

ondas.forEach(onda=>{

onda.style.height = "5px"
onda.classList.remove("activa")

})

imagen.style.transform = "scale(1)"

}

}


/*
========================================
9️⃣ SINCRONIZACIÓN DE LETRA
========================================
Activa cada línea cuando llega su tiempo
*/
let indiceActual=-1

audio.ontimeupdate = ()=>{

const tiempo = audio.currentTime

cancion.letraSincronizada.forEach((linea,i)=>{

if (tiempo >= linea[0] && i > indiceActual){

if (lineas[indiceActual]){
lineas[indiceActual].classList.remove("activa")
}

lineas[i].classList.add("activa")

indiceActual = i

}

})

}


/*
========================================
🔟 BOTÓN PLAY / PAUSA
========================================
*/
btnPlay.addEventListener("click", ()=>{

if (audio.paused){

audio.play()

icono.innerHTML = "❚❚"

moverOndas()

} else {

audio.pause()

icono.innerHTML = "▶"

}

})


/*
========================================
1️⃣1️⃣ CUANDO TERMINA LA CANCIÓN
========================================
*/
audio.onended = ()=>{

icono.innerHTML = "▶"

lineas.forEach(l=>l.classList.remove("activa"))

imagen.style.transform = "scale(1)"

}
