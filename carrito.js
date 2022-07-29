
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
document.getElementById("count-cart").innerHTML = `${carrito.length} - $${totalCarrito}`;
document.getElementById("foot-modal").innerHTML = `
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
    </div>
    <div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="delete-cart" onclick="vaciarCarrito()">Vaciar carrito</button>
    </div>
    `
//Array de productos disponibles
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

//Creamos las cards de los productos con un forEach
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
    //Agregamos a la seccion cards-section el html creado arriba
    cardsCont.appendChild(contenedor)
})

//Por cada producto del array (metodo forEach), vamos a ejecutar una función al hacer click sobre el boton creado anteriormente
stockDisponible.forEach ((producto) => {
    const botonId = `agregarCarrito${producto.id}`
    //Creamos el evento click para el botón creado
    document.getElementById(botonId).addEventListener('click', () =>{
        //Cada vez que hagamos click sobre el botón, agregamos el producto a el array vacío "carrito"
        carrito.push(producto)
        //Almacenamos el carrito en el LS, pero debemos convertirlo a un string debido que es un objeto, usamos en JSON.stringify
        localStorage.setItem("carrito", JSON.stringify(carrito))
        //Sacamos el total del carrito mediante el metodo reduce (acumulador, qué vamos a acumular)
        const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
        //Actualizamos el contador del carrito obteniendo el largo del carrito 
        document.getElementById("count-cart").innerHTML = `${carrito.length} - $${totalCarrito}`
        //Actualizamos precio al mostrar el carrito y sus productos
        document.getElementById("foot-modal").innerHTML = `
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
    </div>
    <div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="delete-cart" onclick="vaciarCarrito()">Vaciar carrito</button>
    </div>
    `   //Al hacer click sobre el botón creado, ejecutamos la función actualizarCarrito construida abajo
        actualizarCarrito();
    })
})

const actualizarCarrito = () => {
    //Actualizamos lo que vamos a ver cuando clickeemos sobre el carrito
    document.getElementById("show-cart").innerHTML = " "
    carrito.forEach ((prod) => {
        document.getElementById("show-cart").innerHTML += `<div class="cont-items">
        <p class="id-show-cart">ID: ${prod.id}</p>
        <h2 class="nombre-producto-cart">${prod.nombre}</h2>
        <p class="price-producto-cart">$ ${prod.precio}</p>
        <button class="btn-eliminar-producto" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
        </div>
        `
        /*Creamos un nuevo boton que nos permite eliminar el producto que queramos. Recibe por id el nombre que le dimos
        y le damos la funcion onclick, que al presionar el boton vamos a ejecutar la funcion eliminar del carrito*/
    })}

//Funcion eliminar carrito que ejecutaremos cada vez que presionemos el boton eliminar incluido al mostrar el carrito
const eliminarDelCarrito = (productoSeleccionado) => {
    //Buscamos el producto dentro del carrito que tenga el mismo id que el producto seleccionado a eliminar
    const producto = carrito.find((prod) => prod.id === productoSeleccionado)
    //Al encontrarlo, ubicamos el indice del producto mediante el metodo indexOf
    const indiceProducto = carrito.indexOf(producto)
    //Y desde su indice, lo eliminamos mediante el metodo splice
    carrito.splice(indiceProducto, 1)
    //Actualizamos total del carrito
    const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
    //Actualizamos precio carrito
    document.getElementById("foot-modal").innerHTML = `
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
    </div>
    <div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="delete-cart" onclick="vaciarCarrito()">Vaciar carrito</button>
    </div>
    `
    //Ejecutamos la función actualizar carrito cada vez que eliminemos un producto
    actualizarCarrito();
    //Actualizamos contador de carrito
    document.getElementById("count-cart").innerHTML = `${carrito.length}`
    console.log(carrito) 
}