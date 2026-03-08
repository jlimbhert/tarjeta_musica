const cancion = {

titulo: "Nena Maldición",

audio: "assets/audio/cancion1.mp3",

imagen: "assets/images/icono.png",

fondo: "assets/images/fondo.png",

colorBorde:"#ff7a18",
colorTexto:"#ffd89b",
colorUI:"#ff9b42",
colorCursor:"#fff1c9",

opacidadFondo: 0.7,

letraSincronizada: [

[2, "Mi futuro y tu presente"],
[4, "Ya no quieren coincidir"],
[6, "Pero el corazón no miente"],
[8, "Cuando te pones hablar de mi"],
[10, "Sabes bien que aunque no quieras"],
[12, "Nadie ocupa mi lugar"],
[14, "Que los besos que te he dado"],
[17, "Nadie los puede igualar"]

]

}

const root = document.documentElement

root.style.setProperty('--url-fondo', `url('${cancion.fondo}')`)
root.style.setProperty('--opacidad-capa', cancion.opacidadFondo)

root.style.setProperty('--color-borde', cancion.colorBorde)
root.style.setProperty('--color-texto', cancion.colorTexto)
root.style.setProperty('--color-ui', cancion.colorUI)
root.style.setProperty('--color-cursor', cancion.colorCursor)

document.getElementById("idTitulo").textContent = cancion.titulo
document.getElementById("idImagen").src = cancion.imagen

const contenedor = document.getElementById("cajaScroll")

let lineas = []

cancion.letraSincronizada.forEach(item=>{

const div = document.createElement("div")

div.classList.add("linea")

div.innerText = item[1]

contenedor.appendChild(div)

lineas.push(div)

})

const audio = new Audio(cancion.audio)

const btnPlay = document.getElementById("botonPlay")
const icono = document.getElementById("estadoIcono")

const ondasContenedor = document.getElementById("ondasContenedor")

for (let i = 0; i < 15; i++){

const onda = document.createElement("div")

onda.classList.add("una-onda")

ondasContenedor.appendChild(onda)

}

const ondas = document.querySelectorAll(".una-onda")

function moverOndas(){

if (!audio.paused){

ondas.forEach(onda=>{

const altura = Math.floor(Math.random()*25)+5

onda.style.height = altura+"px"

onda.classList.add("activa")

})

setTimeout(moverOndas, 150)

} else {

ondas.forEach(onda=>{

onda.style.height = "5px"
onda.classList.remove("activa")

})

}

}

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

audio.onended = ()=>{

icono.innerHTML = "▶"

lineas.forEach(l=>l.classList.remove("activa"))

}