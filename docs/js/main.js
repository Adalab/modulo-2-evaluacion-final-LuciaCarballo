const u=document.querySelector(".js_listadoProductos"),m=document.querySelector(".js_input"),g=document.querySelector(".js_buttonFilter"),l=document.querySelector(".js_listadoCarrito"),y=document.querySelector(".js_vaciarCarrito"),b="https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";let i=[],e=[];function d(){const t=JSON.stringify(e);localStorage.setItem("carrito",t)}function S(t){const r=t.currentTarget,c=r.closest(".producto"),o=parseInt(r.id);c.classList.toggle("carrito");const a=i.find(n=>n.id===o);c.classList.contains("carrito")?(!e.find(f=>f.id===o)&&a&&e.push(a),r.textContent="Eliminar"):(e=e.filter(n=>n.id!==o),r.textContent="Buy"),s(),d()}function h(){const t=localStorage.getItem("carrito");t&&(e=JSON.parse(t),s())}y.addEventListener("click",()=>{e=[],s(),d()});function p(t){let r="";u.innerHTML="";for(let o of t)r+=`
      <li class="producto">
        <img src="${o.image}" alt="Producto${o.id}" class="producto__img">
        <h2 class="productoTitulo">${o.title}</h2>
        <p class="productoPrecio">${o.price}€</p>
        <button class="buy-button js_buyButton" id="${o.id}">Comprar</button>
      </li>
    `;u.innerHTML+=r;const c=document.querySelectorAll(".js_buyButton");for(let o of c)o.addEventListener("click",S)}function s(){l.innerHTML="";for(let t of e)l.innerHTML+=`
      <li class="productoCarrito">
        <img src="${t.image}" alt="Producto${t.id}" class="producto__img">
        <h3>${t.title}</h3>
        <p>${t.price}€</p>
      </li>
    `}function L(t){t.preventDefault();let r=m.value;const c=i.filter(o=>o.title.toLowerCase().includes(r.toLowerCase()));p(c)}g.addEventListener("click",L);fetch(b).then(t=>t.json()).then(t=>{i=t,h(),p(i)});
//# sourceMappingURL=main.js.map
