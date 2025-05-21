'use strict';

'use strict';

const productosUL = document.querySelector(".js_listadoProductos");
const input = document.querySelector(".js_input");
const button = document.querySelector(".js_buttonFilter");
const carritoUL = document.querySelector(".js_listadoCarrito");
const botonVaciar = document.querySelector(".js_vaciarCarrito");
const url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

let productos = [];
let listadoCarrito = [];

function guardarCarritoEnLocalStorage() {
  const carritoJSON = JSON.stringify(listadoCarrito);
  localStorage.setItem('carrito', carritoJSON);
}

function handleClickBuy(event) {
  const button = event.currentTarget;
  const liProducto = button.closest('.producto');
  const idProducto = parseInt(button.id);

  liProducto.classList.toggle('carrito');
  const productoSeleccionado = productos.find(producto => producto.id === idProducto);

  if (liProducto.classList.contains('carrito')) {
    const yaEsta = listadoCarrito.find(p => p.id === idProducto);
    if (!yaEsta && productoSeleccionado) {
      listadoCarrito.push(productoSeleccionado);
    }
    button.textContent = 'Eliminar';
  } else {
    listadoCarrito = listadoCarrito.filter(p => p.id !== idProducto);
    button.textContent = 'Buy';
  }

  renderCarrito();
  guardarCarritoEnLocalStorage();
}

function recuperarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    const arrayObjetos = JSON.parse(carritoGuardado);
    listadoCarrito = arrayObjetos;
    renderCarrito();
  }
}

botonVaciar.addEventListener("click", () => {
  listadoCarrito = [];
  renderCarrito();
  guardarCarritoEnLocalStorage();
});

function renderProductos(productos) {
  let html = "";
  productosUL.innerHTML = "";

  for (let producto of productos) {
    html += `
      <li class="producto">
        <img src="${producto.image}" alt="Producto${producto.id}" class="producto__img">
        <h2 class="productoTitulo">${producto.title}</h2>
        <p class="productoPrecio">${producto.price}€</p>
        <button class="buy-button js_buyButton" id="${producto.id}">Comprar</button>
      </li>
    `;
  }

  productosUL.innerHTML += html;

  const buyButton = document.querySelectorAll(".js_buyButton");
  for (let button of buyButton) {
    button.addEventListener("click", handleClickBuy);
  }
}

function renderCarrito() {
  carritoUL.innerHTML = "";

  for (let producto of listadoCarrito) {
    carritoUL.innerHTML += `
      <li class="productoCarrito">
        <img src="${producto.image}" alt="Producto${producto.id}" class="producto__img">
        <h3>${producto.title}</h3>
        <p>${producto.price}€</p>
      </li>
    `;
  }
}

function handleClickSearch(event) {
  event.preventDefault();
  let valueSearch = input.value;
  const productosFiltrados = productos.filter(productoItem =>
    productoItem.title.toLowerCase().includes(valueSearch.toLowerCase())
  );
  renderProductos(productosFiltrados);
}

button.addEventListener("click", handleClickSearch);

fetch(url)
  .then(response => response.json())
  .then(data => {
    productos = data;
    recuperarCarritoDeLocalStorage();
    renderProductos(productos);
  });
