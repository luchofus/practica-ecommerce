//Estilos iniciales
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("show-cart").innerHTML = " "
let cantidadesProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
//En el principio llamé al storage para que me de la cantidad del producto elegido
const cantidadProducto = localStorage.getItem("cantidad-de-producto")
// let cantidadesProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
let totalCarrito = carrito.reduce((acumulador, producto)=> acumulador + (producto.precio * producto.cantidad), 0)
const contador = localStorage.getItem("contador-carrito")
document.getElementById("count-cart").innerHTML = `
        <p>${cantidadesProductos} - $${totalCarrito}</p> `  
carrito.forEach((prod) => {
document.getElementById("cont-prod-pagar").innerHTML += `
<div>
<div style="display:flex; flex-direction:row; width:100%">
    <p class="name">${prod.nombre}</p>
    <p class="cantidad">x ${prod.cantidad}</p>
    <p class="price">Precio: ${prod.precio}</p>
</div>
</div>`
})  
const priceTotal = document.createElement("p")
priceTotal.innerHTML = `<p class="price-total-car">Precio total: $${totalCarrito}</p>`
document.getElementById("cont-prod-pagar").appendChild(priceTotal)
document.getElementById("foot-modal").innerHTML = `
<div style="display:flex; flex-direction:column; justify-content:center; width:100%;">
<div style="display:flex; flex-direction:row; justify-content:space-between;">
    <div>
        <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
    </div>
    <div>
        <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
    </div>
</div>
<div class="cont-link-pay">
<a href="#scrollspyHeading1" class="link-pay">Ir a pagar</a>
</div>
</div>
`
const mostradorCarrito = document.getElementById("show-cart")
localStorage.getItem("mostrador-carrito")
carrito.forEach ((prod) => {
    const contenedor = document.createElement("div")
    contenedor.className = ("cont-items")
    contenedor.innerHTML = `
    <img src="${prod.imagen}" class="imagen-cart-producto">
    <h2 class="nombre-producto-cart">${prod.nombre}</h2>
    <p class="price-producto-cart">Precio: $${prod.precio}</p>
    <p id="cantidad-producto">Cantidad: ${prod.cantidad}</p>
    <button class="btn-eliminar-producto" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
    `
    mostradorCarrito.appendChild(contenedor)
})

//Array de productos disponibles
const stockDisponible = [
    {id: 1,nombre: "Avena",precio: 180, imagen: "src/avena.jpg", cantidad:1},
    {id: 2,nombre: "Granola",precio: 170, imagen: "src/granola.jpg", cantidad:1},
    {id: 3,nombre: "Barritas energéticas",precio: 60, imagen: "src/barritas.jpg", cantidad:1},
    {id: 4,nombre: "Almohaditas",precio: 120, imagen: "src/almohaditas.jpg", cantidad:1},
    {id: 5,nombre: "Pan integral",precio: 180, imagen: "src/pan-integral.jpg", cantidad:1},
    {id: 6,nombre: "Alfajores",precio: 100, imagen: "src/alfajores.jpg", cantidad:1},
    {id: 7,nombre: "Leche de almendras",precio: 290, imagen: "src/leche.jpg", cantidad:1},
    {id: 8,nombre: "Frutos secos",precio: 110, imagen: "src/frutos.jpg", cantidad:1},
    {id: 9,nombre: "Galletitas de avena",precio: 80, imagen: "src/galletitas.jpg", cantidad:1},
    {id: 10,nombre: "Infusiones",precio: 60, imagen: "src/infusiones.jpg", cantidad:1},
    {id: 11,nombre: "Cereales",precio: 90, imagen: "src/cereales.jpg", cantidad:1},
    {id: 12,nombre: "Suplemento deportivo",precio: 200, imagen: "src/proteinas.jpg", cantidad:1},
]

//Llamando a los productos del archivo 'productos.json' con fetch y creando las cards
const newCards = async () => {    
    const response = await fetch('productos.json');
    const data = await response.json();
        data.forEach((producto) => {
            const botonId = `agregarCarrito${producto.id}`
            const cardsCont = document.getElementById("cards-section")
            const div = document.createElement("div")
            div.className = "col col-lg-3 col-dm-3 col-xs-6 contenedor-productos"
            div.innerHTML += `<img src="${producto.imagen}" class="img-productos">
            <h2 class="title-productos">${producto.nombre}</h2>
            <p class="price-productos">Precio: $${producto.precio}</p>
            <button class="btn-agregar-carrito" id=${botonId}><span class="text-btn-add">Agregar</span></button>
            `
            cardsCont.appendChild(div)
            document.getElementById(botonId).addEventListener('click', () => {
                let existeElProducto = carrito.some((prod) => prod.id == producto.id)
                if(existeElProducto){
                    let prodFind = carrito.find((prod) => prod.id == producto.id)
                    prodFind.cantidad++;
                }else{
                    carrito.push(producto)    
                }
                let cantidadesProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
                    localStorage.setItem("cantidad-producto", JSON.stringify(cantidadesProductos))
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
                const alert = Swal.fire(`
                <p>¡Agregaste con éxito ${producto.nombre} al carrito!</p>
                <img src="${producto.imagen}" class="imagen-cart-producto">
                <div style="display:flex; flex-direction:row; justify-content:space-between; width:100%;">
                    <p>Precio: $${producto.precio}</p>
                </div>
                <p>Total carrito: $${totalCarrito}</p>`
            )
            actualizarCarrito();
            })
        })

    }
//Ejecuto la función para crear las cards
newCards();

//Buscador
const buscador = document.getElementById("input-buscar")
const botonBuscador = document.getElementById("btn-buscar")
    const filtrar = () => {
        const cardsCont = document.getElementById("cards-section")
        const contenedor = document.createElement("div")
        cardsCont.innerHTML = ' '
        let textoBuscado = buscador.value.toLowerCase();
        stockDisponible.forEach((producto) => {
            let productoABuscar = producto.nombre.toLowerCase();
            if(productoABuscar.indexOf(textoBuscado) !== -1){
                const botonId = `agregarCarrito${producto.id}`
                cardsCont.innerHTML += `<div class="col col-lg-3 col-dm-3 col-xs-6 contenedor-productos">
                <img src="${producto.imagen}" class="img-productos">
                <h2 class="title-productos">${producto.nombre}</h2>
                <p class="price-productos">Precio: $${producto.precio}</p>
                <button class="btn-agregar-carrito" id=${botonId}><span class="text-btn-add">Agregar</span></button>
                </div>
                `
            }
        })
            let botones = document.querySelectorAll(".btn-agregar-carrito")
            botones.forEach((producto) => {
                producto.addEventListener('click', () => {                  
                    let id = producto.id[producto.id.length - 1];
                    let productoAgregar = stockDisponible.find((prod) => prod.id == id)
                    let existeElProducto = carrito.some((prod) => prod.id == id)
                    console.log(existeElProducto)
                    if(existeElProducto){
                        let prodFind = carrito.find((prod) => prod.id == productoAgregar.id)
                        prodFind.cantidad++
                    }else{
                        carrito.push(productoAgregar)    
                    }
                    let cantidadesProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
                    localStorage.setItem("cantidad-producto", JSON.stringify(cantidadesProductos))
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
                    Swal.fire(`
                    <p>¡Agregaste con éxito ${productoAgregar.nombre} al carrito!</p>
                    <img src="${productoAgregar.imagen}" class="imagen-cart-producto">
                    <div style="display:flex; flex-direction:row; justify-content:space-between; width:100%;">
                        <p>Precio: $${productoAgregar.precio}</p>
                    </div>
                    <p>Total carrito: $${totalCarrito}</p>`
                )
                actualizarCarrito();
                Swal.fire.className = ("alert-buy")
                })
                })
            }
buscador.addEventListener('keyup', filtrar)
botonBuscador.addEventListener('click', filtrar)

//Función actualizar Carrito que se ejecutará siempre que se agregue o elimine un producto
const actualizarCarrito = () => {
    mostradorCarrito.innerHTML = " "
    let cantidadesProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    localStorage.setItem("cantidad-producto", JSON.stringify(cantidadesProductos))
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
    localStorage.setItem("total-carrito", totalCarrito)
    document.getElementById("foot-modal").innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; width:100%;">
        <div style="display:flex; flex-direction:row; justify-content:space-between;">
            <div>
                <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
            </div>
            <div>
                <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
            </div>
        </div>
        <div class="cont-link-pay">
            <a href="#scrollspyHeading1" class="link-pay">Ir a pagar</a>
        </div>
        </div>
`
    const contador = document.getElementById("count-cart").innerHTML = `
        <p>${cantidadesProductos} - $${totalCarrito}</p> `   
    localStorage.setItem("contador-carrito", JSON.stringify(contador))
    carrito.forEach ((prod) => {
        const contenedor = document.createElement("div")
        contenedor.className = ("cont-items")
        contenedor.innerHTML = `
        <img src="${prod.imagen}" class="imagen-cart-producto">
        <h2 class="nombre-producto-cart text-modal">${prod.nombre}</h2>
        <p class="price-producto-cart text-modal">Precio: $${prod.precio}</p>
        <p id="cantidad-producto" class="text-modal">Cantidad: ${prod.cantidad}</p>
        <button class="btn-eliminar-producto text-modal" id="btn-eliminar${prod.id}" onclick="eliminarDelCarrito(${prod.id})"><i class= "fas fa-trash"></i></button>
        `
        mostradorCarrito.appendChild(contenedor)
        document.getElementById("foot-modal").innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; width:100%;">
        <div style="display:flex; flex-direction:row; justify-content:space-between;">
            <div>
                <p style="margin-bottom: 0px; font-weight:700;"> Precio total: $ ${totalCarrito}</p>
            </div>
            <div>
                <button type="button" id="delete-cart" onclick="vaciarCarrito()"><span class="text-vaciar">Vaciar carrito</span></button>
            </div>
        </div>
        <div class="cont-link-pay">
            <a href="#scrollspyHeading1" class="link-pay">Ir a pagar</a>
        </div>
        </div>
`
        localStorage.setItem("mostrador-carrito", JSON.stringify(mostradorCarrito.innerHTML))
        document.getElementById("cont-prod-pagar").innerHTML = " "
        carrito.forEach((prod) => {
            document.getElementById("cont-prod-pagar").innerHTML += `
                <div class="show-prods-pay">
                    <div style="display:flex; flex-direction-row" class="cont-name-cant">
                        <p class="name">${prod.nombre}</p>
                        <p class="cantidad">x ${prod.cantidad}</p>
                    </div>
                    <div class="cont-price-car">
                        <p class="price">Precio: ${prod.precio}</p>
                    </div>
                </div>`
        })
        if(cantidadesProductos = 0){
            document.getElementById("cont-prod-pagar").innerHTML = " "
        }
        const priceTotal = document.createElement("p")
        priceTotal.innerHTML = `<p class="price-total-car">Precio total: $${totalCarrito}</p>`
        document.getElementById("cont-prod-pagar").appendChild(priceTotal)
    })
}

//Función eliminar del carrito
const eliminarDelCarrito = (productoSeleccionado) => {
    const producto = carrito.find((prod) => prod.id === productoSeleccionado)
    const indiceProducto = carrito.indexOf(producto)
    producto.cantidad--
    if(producto.cantidad <= 0){
        carrito.splice(indiceProducto, 1)
        producto.cantidad = 1
        document.getElementById("cont-prod-pagar").innerHTML = " "
        const priceTotal = document.createElement("p")
        priceTotal.innerHTML = `<p class="price-total-car">Precio total: $${totalCarrito}</p>`
        document.getElementById("cont-prod-pagar").appendChild(priceTotal)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito();
}

//Función vaciar Carrito (La ejecutará un boton que está en el carrito)
const vaciarCarrito = () => {
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito))
    document.getElementById("cont-prod-pagar").innerHTML = " "
    const priceTotal = document.createElement("p")
    priceTotal.innerHTML = `<p class="price-total-car">Precio total: $${totalCarrito}</p>`
    document.getElementById("cont-prod-pagar").appendChild(priceTotal)
    actualizarCarrito();
}


//Le damos efecto al header
window.addEventListener('scroll', () => {
    let header = document.getElementById("cont-header")
    header.classList.toggle("scroll-abajo", window.scrollY > 0)
    header.classList.toggle("scroll-arriba", window.scrollY < 0)
})

//Formulario
const nombre = document.getElementById("validationCustom01")
const botonSubmit = document.getElementById("btn-submit")
const botonSpinner = document.getElementById("btn-spinner")
const form = document.getElementById("form")
nombre.addEventListener('keyup', () => {
    if(nombre.value.length < 6){
        nombre.className = "border-red"
    }else{
        nombre.className = "border-green"
    }
})
botonSubmit.addEventListener('click', () => {
    botonSpinner.classList = "btn-spinner-2"
    botonSubmit.classList = "btn-submit-2"
    setTimeout(() => {
        document.getElementById("cont-form").classList = "col-lg-12"
        form.innerHTML = " "
        document.getElementById("cont-prod-pagar").innerHTML = " "
        document.getElementById("text-page-doneit").innerHTML = `       
        <i class="fas fa-circle-check"></i>
        <p class="text-payed">¡Pago realizado!</p>
        `
        vaciarCarrito();
    }, 2500)
})