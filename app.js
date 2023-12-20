document.addEventListener('DOMContentLoaded', function() {
    cargarDepartamentos();
});

function cargarDepartamentos() {
    fetch('https://api-colombia.com/api/v1/Department')
        .then(response => response.json())
        .then(data => {
            const selectDepartamento = document.getElementById('departamento');
            data.forEach(departamento => {
                let opcion = document.createElement('option');
                opcion.value = departamento.id;
                opcion.textContent = departamento.name;
                selectDepartamento.appendChild(opcion);
            });
        });
}

document.getElementById('departamento').addEventListener('change', function() {
    cargarCiudades(this.value);
});

function cargarCiudades(departamentoId) {
    fetch(`https://api-colombia.com/api/v1/Department/${departamentoId}/cities`)
        .then(response => response.json())
        .then(data => {
            const selectCiudad = document.getElementById('ciudad');
            selectCiudad.innerHTML = '';
            data.forEach(ciudad => {
                let opcion = document.createElement('option');
                opcion.value = ciudad.id;
                opcion.textContent = ciudad.name;
                selectCiudad.appendChild(opcion);
            });
        });
}

//Función crear mensaje de whatsapp
function crearMensajeWhatsApp(nombre, tramite, nombreDepartamento, nombreCiudad, tipoVehiculo) {
    // Aquí, los emojis están directamente en el string
    let mensaje = `🌟 Solicitud de Trámite de Tránsito 🌟
    
¡Hola! me encuentro realizando una solicitud de trámite y me gustaría enviarte los detalles:

👤 Nombre del Solicitante: ${nombre}
🚗 Trámite Solicitado: ${tramite}
📍 Departamento: ${nombreDepartamento}
🏙️ Ciudad de Circulación: ${nombreCiudad}
🚘 Tipo de Vehículo: ${tipoVehiculo}

Por favor, ¿podrían confirmar la recepción de esta solicitud y brindarme más información sobre los pasos a seguir?

¡Gracias por su atención! 🚀`;

    return mensaje;
}
// Función para procesar el formulario
document.getElementById('formulario-cita').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let tramite = document.getElementById('tramite').value;
    let departamento = document.getElementById('departamento');
    let nombreDepartamento = departamento.options[departamento.selectedIndex].text;
    let ciudad = document.getElementById('ciudad');
    let nombreCiudad = ciudad.options[ciudad.selectedIndex].text
    let tipoVehiculo = document.getElementById('vehiculo').value;

    // Crear el mensaje para el modal y WhatsApp
    let mensaje = crearMensajeWhatsApp(nombre, tramite, nombreDepartamento, nombreCiudad, tipoVehiculo)

    // Guardar el mensaje para usarlo luego en WhatsApp
    window.crearMensajeWhatsApp = mensaje;
    console.log(mensaje);

    // Mostrar el modal
    $('#confirmacionModal').modal('show');
});

// Función para enviar el mensaje a WhatsApp
function enviarWhatsApp() {
    let encodedMessage = encodeURIComponent(window.crearMensajeWhatsApp);
    let whatsappUrl = `https://wa.me/3046809324?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

