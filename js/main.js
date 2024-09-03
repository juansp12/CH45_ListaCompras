const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// bandera, al ser true permite agregar los datos a la tabla
let isValid = true;
let contador =0;
let precio=0;
let costoTotal =0;
let totalEnProductos =0;

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }//lenght==0

    if (isNaN(txtNumber.value)){
        return false
    }// isNaN

    if(Number(txtNumber.value)<=0){
        return false
    }//<=0

    return true;
}//validarCantidad()

function getPrecio(){
    return Math.round((Math.random()*10000))/100;
}// getPrecio

btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    txtNombre.style.border="";
    txtNumber.style.border="";
       alertValidacionesTexto.innerHTML="";
       alertValidaciones.style.display="none";
       isValid = true;
// Validar el nombre del producto
    if(txtNombre.value.trim().length<3){
        txtNombre.style.border="solid red medium";
       alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto.<br/>";
       alertValidaciones.style.display="block";
       isValid = false;
    }//if length<3

//validar la cantidad
    if (! validarCantidad()){
        txtNumber.style.border="solid red medium";
       alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta.<br/>";
       alertValidaciones.style.display="block";
       isValid = false;
    }//! validarCantidad

    if(isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
                    cuerpoTabla.insertAdjacentHTML("beforeend", row);
                    costoTotal += precio * Number(txtNumber.value);
                    totalEnProductos += Number(txtNumber.value);
                    contadorProductos.innerText = contador;
                    productosTotal.innerText=totalEnProductos;
                    precioTotal.innerText ="$ " + costoTotal.toFixed(2);
                    
                    txtNombre.value="";
                    txtNumber.value="";
                    txtNombre.focus();
    }//isValid




}); //btnAgregar.addEventListener

//Evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
   txtNombre.value = txtNombre.value.trim(); 
}); // txtNombre.addEventListener

window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador") !=null){    
    }//null
    if (localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(localStorage.getItem("totalEnProductos"));
    }//null

    if (localStorage.getItem("costoTotal") !=null){
        costoTotal = Number(localStorage.getItem("costoTotal"));
    }//null
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText ="$ " + costoTotal.toFixed(2);
})//windows load