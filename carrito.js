const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("show-cart").innerHTML = " "
let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
const contador = localStorage.getItem("contador-carrito")
document.getElementById("foot-modal").innerHTML = `
<div>
    <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
</div>
<div>
    <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
    </div>
`
document.getElementById("count-cart").innerHTML = 
`
<p>${carrito.length} - $${totalCarrito}</p> 
`
const mostradorCarrito = document.getElementById("show-cart")
localStorage.getItem("mostrador-carrito")
carrito.forEach ((prod) => {
    mostradorCarrito.innerHTML += `<div class="cont-items">
    <img src="${prod.imagen}" class="imagen-cart-producto">
    <h2 class="nombre-producto-cart">${prod.nombre}</h2>
    <p class="price-producto-cart">Precio: $${prod.precio}</p>
    <button class="btn-eliminar-producto" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
    </div>
    `
})
//Array de productos disponibles
const stockDisponible = [
    {id: 1,nombre: "Avena",precio: 180, imagen: "avena.jpg", cantidad:1},
    {id: 2,nombre: "Granola",precio: 170, imagen: "granola.jpg", cantidad:1},
    {id: 3,nombre: "Barritas energéticas",precio: 60, imagen: "barritas.jpg", cantidad:1},
    {id: 4,nombre: "Almohaditas",precio: 120, imagen: "almohaditas.jpg", cantidad:1},
    {id: 5,nombre: "Pan integral",precio: 180, imagen: "pan-integral.jpg", cantidad:1},
    {id: 6,nombre: "Alfajores",precio: 100, imagen: "alfajores.jpg", cantidad:1},
    {id: 7,nombre: "Leche de almendras",precio: 290, imagen: "leche.jpg", cantidad:1},
    {id: 8,nombre: "Frutos secos",precio: 110, imagen: "frutos.jpg", cantidad:1},
    {id: 9,nombre: "Galletitas de avena",precio: 80, imagen: "galletitas.jpg", cantidad:1},
    {id: 10,nombre: "Infusiones",precio: 60, imagen: "infusiones.jpg", cantidad:1},
    {id: 11,nombre: "Cereales",precio: 90, imagen: "cereales.jpg", cantidad:1},
    {id: 12,nombre: "Suplemento deportivo",precio: 200, imagen: "proteinas.jpg", cantidad:1},
]

// Creamos las cards de los productos con un forEach
stockDisponible.forEach ((producto) => {
    const botonId = `agregarCarrito${producto.id}`
    const cardsCont = document.getElementById("cards-section")
    const contenedor = document.createElement("div")
    contenedor.className = "col col-lg-3 col-dm-3 col-xs-6 contenedor-productos"
    contenedor.innerHTML += `<div data-aos="fade-up" data-aos-duration="1" class="productos">
        <img src="${producto.imagen}" class="img-productos">
        <h2 class="title-productos">${producto.nombre}</h2>
        <p class="price-productos">Precio: $${producto.precio}</p>
        <button class="btn-agregar-carrito" id=${botonId}><span class="text-btn-add">Agregar</span></button>
    </div>`
    //Agregamos a la seccion cards-section el html creado arriba
    cardsCont.appendChild(contenedor)
})

const buscador = document.getElementById("input-buscar")
const botonBuscador = document.getElementById("btn-buscar")


const filtrar = () => {
    const cardsCont = document.getElementById("cards-section")
    const contenedor = document.createElement("div")        
    cardsCont.innerHTML = ''
    let textoBuscado = buscador.value.toLowerCase();
    stockDisponible.forEach ((producto) => {
        const botonId = `agregarCarrito${producto.id}`
        let nombreProductoABuscar = producto.nombre.toLowerCase();
        if(nombreProductoABuscar.indexOf(textoBuscado) !== -1){
            cardsCont.innerHTML += `
                <div class= "col col-lg-3 col-dm-3 col-xs-6 contenedor-productos">
                        <img src="${producto.imagen}" class="img-productos">
                        <h2 class="title-productos">${producto.nombre}</h2>
                        <p class="price-productos"> $ ${producto.precio}</p>
                        <button class="btn-agregar-carrito" id=${botonId}><span class="text-btn-add">Agregar</span></button>
                </div>
            `
        }
    })
}

buscador.addEventListener('keyup', filtrar)
botonBuscador.addEventListener('click', filtrar)


//Función agregar al carrito
stockDisponible.forEach ((producto) => {
    const botonId = `agregarCarrito${producto.id}`
    document.getElementById(botonId).addEventListener('click', () =>{
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarCarrito();
    })
})

const actualizarCarrito = () => {
    //Actualizamos lo que vamos a ver cuando clickeemos sobre el carrito
    mostradorCarrito.innerHTML = " "
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
    document.getElementById("foot-modal").innerHTML = `
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
    </div>
    <div>
    <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
    </div>
    `
    console.log(totalCarrito)
    const contador = document.getElementById("count-cart").innerHTML = `
        <p>${carrito.length} - $${totalCarrito}</p> `   
    localStorage.setItem("contador-carrito", JSON.stringify(contador))
    carrito.forEach ((prod) => {
        mostradorCarrito.innerHTML += `<div class="cont-items">
        <img src="${prod.imagen}" class="imagen-cart-producto">
        <h2 class="nombre-producto-cart">${prod.nombre}</h2>
        <p class="price-producto-cart">Precio: $${prod.precio}</p>
        <button class="btn-eliminar-producto" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
        </div>
        `
        document.getElementById("foot-modal").innerHTML= `
        <div>
            <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
        </div>
        <div>
            <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
        </div>
        `
        localStorage.setItem("mostrador-carrito", JSON.stringify(mostradorCarrito.innerHTML))
    })
}


const eliminarDelCarrito = (productoSeleccionado) => {
    const producto = carrito.find((prod) => prod.id === productoSeleccionado)
    const indiceProducto = carrito.indexOf(producto)
    carrito.splice(indiceProducto, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito();
}

const vaciarCarrito = () => {
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito();
}


//Le damos efecto al header

window.addEventListener('scroll', () => {
    let header = document.getElementById("cont-header")
    header.classList.toggle("scroll-abajo", window.scrollY > 0)
    header.classList.toggle("scroll-arriba", window.scrollY < 0)
})


//Buscar los productos con el buscador