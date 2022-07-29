
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("count-cart").innerHTML = `${carrito.length}`;
document.getElementById("foot-modal").innerHTML = `
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ 0</p>
    </div>
    <div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="delete-cart" onclick="vaciarCarrito()">Vaciar carrito</button>
    </div>
    `

const stockDisponible = [
    {id: 1,nombre: "Avena",precio: 180, imagen: "avena.jpg"},
    {id: 2,nombre: "Granola",precio: 170, imagen: "granola.jpg"},
    {id: 3,nombre: "Barritas energéticas",precio: 60, imagen: "barritas.jpg"},
    {id: 4,nombre: "Almohaditas",precio: 120, imagen: "almohaditas.jpg"},
    {id: 5,nombre: "Pan integral",precio: 180, imagen: "pan-integral.jpg"},
    {id: 6,nombre: "Alfajores",precio: 100, imagen: "alfajores.jpg"},
    {id: 7,nombre: "Leche de almendras",precio: 290, imagen: "leche.jpg"},
    {id: 8,nombre: "Frutos secos",precio: 110, imagen: "frutos.jpg"},
    {id: 9,nombre: "Galletitas de avena",precio: 80, imagen: "galletitas.jpg"},
    {id: 10,nombre: "Infusiones",precio: 60, imagen: "infusiones.jpg"},
    {id: 11,nombre: "Cereales",precio: 90, imagen: "cereales.jpg"},
    {id: 12,nombre: "Suplemento deportivo",precio: 200, imagen: "proteinas.jpg"},
]

stockDisponible.forEach ((producto) => {
    const botonId = `agregarCarrito${producto.id}`
    const cardsCont = document.getElementById("cards-section")
    const contenedor = document.createElement("div")
    contenedor.className = "col col-lg-3 col-dm-3 col-xs-6 contenedor-productos"
    contenedor.innerHTML += `<div>
        <img src="${producto.imagen}" class="img-productos">
        <h2 class="title-productos">${producto.nombre}</h2>
        <p class="price-productos">$ ${producto.precio}</p>
        <button class="btn-agregar-carrito" id=${botonId}><span class="text-btn-add">Agregar</span></button>
    </div>`
    cardsCont.appendChild(contenedor)
    
})

stockDisponible.forEach ((producto) => {
    const botonId = `agregarCarrito${producto.id}`
    document.getElementById(botonId).addEventListener('click', () =>{
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        document.getElementById("count-cart").innerHTML = `${carrito.length}`
        actualizarCarrito();
    })
})

const actualizarCarrito = () => {
    document.getElementById("show-cart").innerHTML = " "
    carrito.forEach ((prod) => {
        document.getElementById("show-cart").innerHTML += `<div class="cont-items">
        <p class="id-show-cart">ID: ${prod.id}</p>
        <h2 class="nombre-producto-cart">${prod.nombre}</h2>
        <p class="price-producto-cart">$ ${prod.precio}</p>
        <button class="btn-eliminar-producto" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
        </div>
        `
    })}

const eliminarDelCarrito = (productoSeleccionado) => {
    const producto = carrito.find((prod) => prod.id === productoSeleccionado)
    const indiceProducto = carrito.indexOf(producto)
    carrito.splice(indiceProducto, 1)
    actualizarCarrito();
    document.getElementById("count-cart").innerHTML = `${carrito.length}`
    console.log(carrito) 
}

const vaciarCarrito = () => {
    carrito.splice.length()
    
}