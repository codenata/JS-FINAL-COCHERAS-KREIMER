/* Se trata de un sistema de intercambio de cocheras en casas particulares.
Los usuarios publican su oferta tipo tabloide. 
Los dueños completan el formulario con sus datos personales y luego los de la cochera.
El sistema toma la data por medio de un form, elabora un array de chocheras, evita que refresque la pagina, lo almacena en localstorage y devuelve por DOM la info de la cochera.
Procesa la info del form y modifica el precio de acuerdo a los parametros que ingresa el usuario, zona y features de automatismo, tamano y techo.
Se utiliza fetch para la api del clima.
Se usa libreri sweet alert para mostrar en pantalla nuevo precio al usuario.

Kreimer Nataniel - Comision 41300
*/

class Cochera {
    constructor(user, email, precio, direccion, zona, automatico, grande, cubierta) {
    this.user = user;
    this.email = email;
    this.precio = precio;
    this.direccion = direccion;
    this.zona = zona;
    this.automatico = automatico;
    this.grande = grande;
    this.cubierta = cubierta;
    }
}

const cocheras = [];

//Si el LocalStorage tiene datos, los agrego al Array de cocheras.

if (localStorage.getItem('cocheras')) {
let cochera = JSON.parse(localStorage.getItem('cocheras'));
for (let i = 0; i < cochera.length; i++) {
    cocheras.push(cochera[i]);
    }
}

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarCochera();
});

function agregarCochera() {
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const precio =  parseFloat(document.getElementById('precio').value);
    const direccion = document.getElementById('direccion').value;
    const zona = document.getElementById('zona').value;
    const automatico = document.getElementById('automatico').checked;
    const grande = document.getElementById('grande').checked;
    const cubierta = document.getElementById('cubierta').checked;


    // Modificar el precio en base a los atributos de la cochera> Zona 1 Plus20%. Zona 2 Plus10%. Automatico Plus10%. Grande Plus10%. Cubierta Plus10%.

    // Inicializar una variable para guardar el porcentaje de aumento
    let porcentajeAumento = 0;

    // ZONA
    if (zona.value === "ZONA CENTRO 1") {
        porcentajeAumento += 0.2;
    } else if (zona.value === "ZONA CERCA 2") {
        porcentajeAumento += 0.1;
    }

    // FEATURES
    if (automatico.checked) {
        porcentajeAumento += 0.1;
    }

    if (grande.checked) {
        porcentajeAumento += 0.1;
    }

    if (cubierta.checked) {
        porcentajeAumento += 0.1;
    }

    // Aumentar el precio según el porcentaje de aumento
    let nuevoPrecio = precio * (1 + porcentajeAumento);

    // cartel de exito, que desaparece solo

    let timerInterval
Swal.fire({
  title: `El nuevo precio es: ${nuevoPrecio}`,
  html: 'I will close in <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('cerrado by the timer')
  }
})


    const nuevaCochera = new Cochera(user, email, precio, direccion, zona, automatico, grande, cubierta);
    cocheras.unshift(nuevaCochera);
    //Agrego al LocalStorage:
    localStorage.setItem('cocheras', JSON.stringify(cocheras));
    formulario.reset();
}

const contenedorCocheras = document.getElementById('contenedorCocheras');
const verCocheras = document.getElementById('verCocheras');

verCocheras.addEventListener('click', () => {
mostrarCocheras();
});

function mostrarCocheras() {
    contenedorCocheras.innerHTML = '';
    cocheras.forEach((cochera) => {

        const div = document.createElement('div');
        let automaticoTexto = "No tiene";
        if(cochera.automatico){
            automaticoTexto = "Suma un 10% al precio!";
        }
        let grandeTexto = "No tiene";
        if(cochera.grande){
            grandeTexto = "Suma un 10% al precio!";
        }
        let cubiertaTexto = "No tiene";
        if(cochera.cubierta){
            cubiertaTexto = "Suma un 10% al precio!";
        }
        
        div.innerHTML = `
            <div>
                <p>Usuario: ${cochera.user}</p>
                <p>Email: ${cochera.email}</p>
                <p>Precio: $${cochera.precio}</p>
                <p>Direccion: ${cochera.direccion}</p>
                <p>Zona: ${cochera.zona}</p>
                <p>Control Remoto & Porton Automatico: ${automaticoTexto}</p>
                <p>Apropiada para vehiculos Gran Tamano: ${grandeTexto}</p>
                <p>El vehiculo queda completamente bajo techo: ${cubiertaTexto}</p>
            </div>
        `;

    contenedorCocheras.appendChild(div);
    });
}