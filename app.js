
const headerContainer = document.querySelector('#header-container')
const productsContainer = document.querySelector('#products-container')
const carritoContainer = document.querySelector("#carrito-container")
const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector("#precioTotal")
const botonVaciar = document.querySelector("#vaciarCarrito")
const logo = document.createElement("div")

let carrito 
let stock = [] 
const carritoEnLS = JSON.parse( localStorage.getItem("carrito") ) 

logo.innerHTML = `<img src="img/OmegaPower.png" alt="logo" id="logo"> `
headerContainer.prepend(logo)

fetch('stock.JSON')
    .then((resp) => resp.json())
    .then((data) =>{
        stock = data
        stock.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
        
            div.innerHTML = `   <div class="card" style="width: 18rem;">
                                    <img src="${producto.img}" class="card-img-top" alt="creatina star">
                                    <div class="card-body">
                                        <h3 class="card-title">${producto.nombre}</h3>
                                        <p class="card-text">$ ${producto.precio}</p>
                                        <button onclick= "agregarAlCarrito(${producto.id})" id="botonAgregar" class="btn btn-danger">Agregar al carrito</button>
                                    </div>
                                </div>
                            `
            
            productsContainer.append(div)
        })        
    })
    .catch((err) => {
        console.log(err)
    })


const agregarAlCarrito = (id) => {
    const item = stock.find((prod) => prod.id === id)
    carrito.push(item)

    avisoAgrego(item.nombre)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    
    mostrarCarrito()
    mostrarCantidadCarrito()
    mostrarTotal()
} 

const mostrarCarrito = () => {
    carritoContainer.innerHTML = ""

    carrito.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("productoEnCarrito")

        div.innerHTML = `<p>${item.nombre}</p>
                        <p>$${item.precio}</p>
                        <button onclick= "eliminarDelCarrito(${item.id})" class="btn btn-danger"">Eliminar producto</button>
                        
                        `
        
        carritoContainer.append(div)
    })
}

const mostrarCantidadCarrito = () => {
    contadorCarrito.innerText = carrito.length + " Productos seleccionados"
}

const mostrarTotal = () => {
    let total = 0
    carrito.forEach((el) => {
        total += el.precio
    })
    precioTotal.innerText = total
}

const eliminarDelCarrito = (id) => {
    const item = carrito.find((prod) => prod.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)

    avisoElimino(item.nombre)

    localStorage.setItem("carrito", JSON.stringify(carrito))

    mostrarCarrito()
    mostrarCantidadCarrito()
    mostrarTotal()
}

let vaciarCarrito = () => {
    carrito.length = 0

    localStorage.setItem("carrito", JSON.stringify(carrito))

    mostrarCarrito()
    mostrarCantidadCarrito()
    mostrarTotal()
}

botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Confirma vaciar carrito?',
        text: "Se perdera los productos seleccionados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar',
        cancelButtonText: 'CANCELAR',
        width:"400px",
      }).then( (result) => {
            if (result.isConfirmed) {
                vaciarCarrito()
                Toastify({
                    text: 'Se vació el carrito',
                    gravity: 'bottom',
                    position: 'left',
                    duration: 2500,
                    style: {
                        background: "rgb(207, 67, 67)",
                      }
                }).showToast()
            }
      } )
})

if (carritoEnLS) {
    carrito = carritoEnLS

    mostrarCarrito()
    mostrarCantidadCarrito()
    mostrarTotal()
} else {
    carrito = []
}

const avisoAgrego = (producto) => {
    Toastify({
        text: `Agregaste ${producto} al carrito!`,
        duration: 2500,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: "rgb(207, 67, 67)",
          }
    }).showToast()
}

const avisoElimino = (producto) => {
    Toastify({
        text: `Eliminaste ${producto} del carrito!`,
        duration: 2500,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: "rgb(207, 67, 67)",
          }
    }).showToast()
}

