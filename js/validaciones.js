/*FECHA DE NACIMIENTO 
1. Importar el archivo js en una etiqueta script antes de cerrar el body.
2. Acceder al input a traves de la constante "inputNacimiento" y agragar en el parentesis el id "birth"
3. Agregar al inputNacimiento un listener para el sombreado de la fecha con una funcion console.log
4. Agregar una funcion "validarNacimiento" que reciba el "input", se accede al valor mediante la constante "fecha" con la propiedad del input value "input.value"
function validarNacimiento (input){
    const fecha = input.value; 
    console.log(fecha);
}
5. Para abrir un cuadro de fecha la const fecha una nueva instancia de input
6.Para asegura que la persona sea mayor de edad creamos la funcion "mayorDeEdad" recibiendo de parametro la fecha y luego agregamos la const fecha una nueva instancia newDate(); sin especificarla
    function mayorDeEdad (fecha){
    const fechaActual = newDate();
    }
7. Modificamos fecha por fechaCliente y en lugar de console.log(fechaCliente) modificamos por mayorDeEdad(fechaCliente);
8. verificar con console.log si es verdadero o falso console.log(diferenciaFechas <= fechaActual); luego modificarlo con return.

https://www.w3schools.com/jsref/jsref_getutcdate.asp libreria getUTC...

MEJORANDO EL CODIGO
8. Acceder al input mediante el id "birth" no es una buena practicar y se necesita reutilizar el codigo listener blur. Eliminamos:
    const inputNacimiento = document.querySelector("#birth")

    inputNacimiento.addEventListener("blur", (evento) =>{
    validarNacimiento(evento.target);
    });
9. Se agrega en html un data-"tipo" y creamos la funcion en js donde la propiedad dataset nos permite acceder a los datos y el tipo especifica donde lo referimos 

10. Creamos una constante/arrowfuntion que nos permite acceder al data- por el nombre "nacimoento"

11. Crear archivo app.js y exportar "valida" para reutilizar el blur

https://regexr.com/


live server  https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
browser/sync https://browsersync.io/

MOSTRANDO MENSAJE DE ERROR 
 if(input.validity.valid) {
        input.parentElement.classlist.remove("input-container--invalid");
        } else {
        input.parentElement.classlist.add("input-container--invalid");
        (tipoDeInput,input);
    }
 
}

//Mensaje de Error
const mensajeDeError = {
 nombre: {
    valueMissing: "Este campo no puede estar vacío"
 },

 Email: {
    valueMissing: "Este campo no puede estar vacío",
    typeMismatch: "El correo no es valido"
 }

 password: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contner una letra mayúscula, una letra minúscula, un número y no puede contener caracteres especiales."
 },

 nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad"
},



}


TIPO DE ERROR

1.  if(input.validity.valid) {
        input.parentElement.classlist.remove("input-container--invalid"); 
        input.parentElement.querySelector("input-message-error").innerHTML= ""; --AGREGADO 

    } else {
        input.parentElement.classlist.add("input-container--invalid");
        input.parentElement.querySelector("input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input); --AGREGADO 

    }

const tipoDeErrores = [
    "ValueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];
*/

 export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classlist.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= ""; 

    } else {
        input.parentElement.classlist.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
            mostrarMensajeDeError(tipoDeInput,input);
        }
 
    }

//TIPOS DE ERRORES

const tipoDeErrores = [
    "ValueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

//Mensaje de Error

const mensajeDeError = {
 nombre: {
    valueMissing: 'Este campo no puede estar vacío',
    },

 email: {
    valueMissing: 'Este campo no puede estar vacío',
    typeMismatch: 'El correo no es valido', 
    },

 password: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contner una letra mayúscula, una letra minúscula, un número y no puede contener caracteres especiales.',
    },

 nacimiento: {
    valueMissing: 'Este campo no puede estar vacío',
    customError: 'Debes tener al menos 18 años de edad',
    },

numero: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'El formato requerido es xxxxxxxxxx 10 números',
}

direccion: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.',
},

ciudad: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La ciudad debe contener entre 10 a 40 caracteres.',
},

estado: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'El estado debe contener entre 10 a 40 caracteres.',
},
    
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error]
        }
    });
    
    return mensaje
}


const validadores = {
    nacimiento: (input) => validarNacimiento(input), 
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value); 
    mayorDeEdad(fechaCliente);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}