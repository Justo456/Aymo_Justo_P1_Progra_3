let frutas = [{id: 1 ,nombre: "arandano", precio: 5000, ruta_img:"img/arandano.png"},
    {id: 2 ,nombre: "banana", precio: 1000, ruta_img:"img/banana.png"},
    {id: 3 ,nombre: "frambuesa", precio: 4000, ruta_img:"img/frambuesa.png"},
    {id: 4 ,nombre: "frutilla", precio: 3000 , ruta_img:"img/frutilla.png"},
    {id: 5 ,nombre: "kiwi", precio: 2000, ruta_img:"img/kiwi.png"},
    {id: 6 ,nombre: "mandarina", precio: 800, ruta_img:"img/mandarina.png"},
    {id: 7 ,nombre: "manzana", precio: 1500, ruta_img:"img/manzana.png"},
    {id: 8 ,nombre: "naranja", precio: 9000, ruta_img:"img/naranja.png"},
    {id: 9 ,nombre: "pera", precio: 2500, ruta_img: "img/pera.png"},
    {id: 10 ,nombre: "anana", precio: 3000, ruta_img:"img/anana.png"},
    {id: 11 ,nombre: "pomelo-amarillo", precio: 2000, ruta_img:"img/pomelo-amarillo.png"},
    {id: 12 ,nombre: "pomelo-rojo", precio: 2000, ruta_img:"img/pomelo-rojo.png"}
]
//Inicializo un array q dentro posee varios objetos q cada uno tiene su key y vu value

function init(){//Inicializo la funcion init q sirve para decirle a la web por donde empezar a a cargar
    imprimirDatosAlumno();
    mostrarProductos(frutas);
    filtrar();
    vaciarCarrito();//Inicializo las funciones dentro de la funcion init para inidicar q tiene q hacer
    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);//agrego el evento vaciar carrito cuando escuche un click y se fija en el tag q tenga el id = "vaciarCarrito"
    let listadoFrutas = document.getElementById("listadoFrutas")//lo mismo q en vaciar carrito pero esta vez solo le asigno a una variable el espacio para q luego pueda ingresarle etiquetas, aca no uso un evento
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];//inicializo el array para q si existe lo leaa parseandolo y si no q lo cree

    function imprimirDatosAlumno(){
        let alumno = {dni:"44764019" ,nombre: "Justo",apellido: "Aymo" };//le asigno a una variable un objeto
        console.log(`/Alumno/ Nombre: ${alumno.nombre}-Apellido: ${alumno.apellido}-DNI: ${alumno.dni}`) //printeo en la consola de la web

        let navNombreApellido = document.getElementById("barra-navegacion");
        navNombreApellido.textContent =`${alumno.nombre}-${alumno.apellido}`//escribo el contenido dentro de lo `` en la variable q esta en el header

    }
    
    
    function mostrarProductos(frutas){
        
        let cartaFrutas = ""// creo variable para hacer un acumulador de strings luego
        frutas.forEach(fruta => {//recorro cada elemento de la  lista 
            cartaFrutas += `
            <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="Imagen de ${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarAlCarrito('${fruta.id}')" class ="boton-agregar" >Agregar al carrito</button>
        </div>`
        })
        listadoFrutas.innerHTML = cartaFrutas; //cargo todo el contenido de cartasFrutas en el html


    }
    function filtrar(){     
        let barraBusqueda = document.getElementById("barra-busqueda");
        barraBusqueda.addEventListener("keyup", function(event){//uso un evento para identificar cuando escribe
            let valorDeBusqueda =  barraBusqueda.value.toLowerCase();//me guardo el valor de lo q escribio
            console.log(event.key)
            let frutasFiltradas = frutas.filter(
                fruta =>{return fruta.nombre.toLowerCase().includes(valorDeBusqueda);});// filtro segun la fruta q escribio
            
            mostrarProductos(frutasFiltradas)
        });}
    
    function agregarAlCarrito(id){
        let frutaSeleccionada = frutas.find(producto => producto.id == id);//busco el id en base al id q me pasaron por parametros para agregarlos al carrito
        carrito.push(frutaSeleccionada);//lo agrego
        console.log(carrito);
        mostrarCarrito(carrito);
    }

   
    function mostrarCarrito(carrito){
    let objetosCarritos = document.getElementById("elementos");
    let contadorCarrito = document.getElementById("contador");
    let totalCarrito = document.getElementById("total-carrito");//ya lo explique

    let cartaCarrito = "";

    carrito.forEach((fruta, indice) => {//ya lo explique
        cartaCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">${fruta.nombre} - $${fruta.precio}</p>
                <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
            </li>
        `;//me falto agregar q asigno un onclick q lleva a la funcion eliminarProducto()
    });

    objetosCarritos.innerHTML = cartaCarrito;//ya lo explique

    contadorCarrito.innerHTML = `<h3>Carrito: ${carrito.length} productos</h3>`;
    let total = carrito.reduce((acc, fruta) => acc + fruta.precio, 0);//hago un acumulador para luego ir agregandole el precio de cada fruta
    if (carrito.length > 0) {
        totalCarrito.innerHTML = `<h4>Total: $${total}</h4>`;
    } else {
        totalCarrito.innerHTML = "";
        objetosCarritos.innerHTML = "<p>Carrito vacío</p>";
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); //agrego el carrito en formato string al localStorage
}

    function eliminarProducto(indice){
        carrito.splice(indice,1);//indico el indice q va a ser el inicio de donde empieza a borrar y dsp le digo cuanto quuiero q borre
        mostrarCarrito(carrito);
    }
    function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");//vacio el carrito pisando el array y lo remuevo del localStorage
    mostrarCarrito(carrito);

}




    
        

        




    
window.onload = init;