let productos=[
{nombre:"iPhone 14",precio:799,img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"},
{nombre:"Laptop Dell",precio:1200,img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"},
{nombre:"Audífonos Sony",precio:199,img:"https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9"},
{nombre:"Tablet Samsung",precio:450,img:"https://images.unsplash.com/photo-1542751110-97427bbecf20"},
{nombre:"Smartwatch Apple",precio:399,img:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"},
{nombre:"Teclado Mecánico",precio:120,img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
]

function registrar(){

let user=regUser.value
let pass=regPass.value

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[]

usuarios.push({user,pass})

localStorage.setItem("usuarios",JSON.stringify(usuarios))

alert("Usuario creado")

window.location="index.html"

}

function login(){

let user=loginUser.value
let pass=loginPass.value

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[]

let valido=usuarios.find(u=>u.user===user && u.pass===pass)

if(valido){

localStorage.setItem("sesion",user)

window.location="tienda.html"

}else{

alert("Datos incorrectos")

}

}

function logout(){

localStorage.removeItem("sesion")

window.location="index.html"

}

if(document.getElementById("listaProductos")){

mostrarProductos(productos)
actualizarCarrito()

}

function mostrarProductos(lista){

let html=""

lista.forEach(p=>{

html+=`
<div class="card">
<img src="${p.img}">
<h4>${p.nombre}</h4>
<p>$${p.precio}</p>
<button onclick="agregar('${p.nombre}',${p.precio},'${p.img}')">Agregar</button>
</div>
`

})

listaProductos.innerHTML=html

}

function buscarProducto(){

let texto=document.getElementById("buscar").value.toLowerCase()

let filtrados=productos.filter(p=>p.nombre.toLowerCase().includes(texto))

mostrarProductos(filtrados)

}

function agregar(nombre,precio,img){

let carrito=JSON.parse(localStorage.getItem("carrito"))||[]

carrito.push({nombre,precio,img})

localStorage.setItem("carrito",JSON.stringify(carrito))

actualizarCarrito()

}

function actualizarCarrito(){

let carrito=JSON.parse(localStorage.getItem("carrito"))||[]

contador.innerText=carrito.length

let html=""

carrito.forEach((p,i)=>{

html+=`
<tr>
<td><img src="${p.img}"></td>
<td>${p.nombre}</td>
<td>$${p.precio}</td>
<td><button onclick="eliminar(${i})">X</button></td>
</tr>
`

})

tablaCarrito.innerHTML=html

}

function eliminar(i){

let carrito=JSON.parse(localStorage.getItem("carrito"))||[]

carrito.splice(i,1)

localStorage.setItem("carrito",JSON.stringify(carrito))

actualizarCarrito()

}

function vaciarCarrito(){

localStorage.removeItem("carrito")

actualizarCarrito()

}

function toggleCarrito(){

let panel=document.getElementById("panelCarrito")

panel.style.display=panel.style.display==="block"?"none":"block"

}