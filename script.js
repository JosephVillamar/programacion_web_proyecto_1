const carrito = document.getElementById('carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const listaProductos = document.getElementById('lista-1');
const loadMoreBtn = document.getElementById('load-more');
const imgCarrito = document.getElementById('img-carrito');

let carritoItems = [];
let loadedProducts = 4;  
const productsPerPage = 3;  


document.addEventListener('DOMContentLoaded', () => {
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    loadMoreBtn.addEventListener('click', cargarMasProductos);
    imgCarrito.addEventListener('mouseenter', mostrarCarrito);
    imgCarrito.addEventListener('mouseleave', ocultarCarrito);

    cargarProductosIniciales();
});


function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
        mostrarCarrito();
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    };

    carritoItems.push(infoProducto);
    mostrarCarrito();
}

function mostrarCarrito() {
    limpiarCarrito();
    carritoItems.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        listaCarrito.appendChild(row);
    });
    carrito.style.display = 'block';
}

function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        carritoItems = carritoItems.filter(producto => producto.id !== productoId);
        mostrarCarrito();
    }
}

function vaciarCarrito() {
    carritoItems = [];
    limpiarCarrito();
}

function limpiarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

function cargarMasProductos() {
    const totalProducts = document.querySelectorAll('.box').length;
    let loaded = 0;

    for (let i = loadedProducts; i < totalProducts; i++) {
        if (loaded >= productsPerPage) break;

        const product = document.querySelector(`.box:nth-child(${i + 1})`);
        product.style.display = 'block';
        loaded++;
    }

    loadedProducts += loaded;

    if (loadedProducts >= totalProducts) {
        loadMoreBtn.style.display = 'none';
    }
}

function cargarProductosIniciales() {
    const totalProducts = document.querySelectorAll('.box').length;

    for (let i = 0; i < loadedProducts && i < totalProducts; i++) {
        const product = document.querySelector(`.box:nth-child(${i + 1})`);
        product.style.display = 'block';
    }

    if (loadedProducts >= totalProducts) {
        loadMoreBtn.style.display = 'none';
    }
}

function ocultarCarrito() {
    carrito.style.display = 'none';
}