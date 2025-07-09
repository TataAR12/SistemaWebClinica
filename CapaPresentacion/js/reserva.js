$("#btnBuscar").on('click', function (e) {
    e.preventDefault();

    var dni = $("#txtDNI").val();

    searchPacienteDni(dni);
});

function searchPacienteDni(dni) {
    var data = JSON.stringify({ dni: dni })
    $.ajax({
        type: "POST",
        url: "GestionarReservaCitas.aspx/BuscarPacienteDNI",
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d == null) {
                alert('No se encontró ningún paciente con el DNI proporcionado.' + dni);
                limpiarDatosPaciente();
            } else {
                llenarDatosPaciente(data.d);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error: " + xhr.responseText);
        }
    });
}
function llenarDatosPaciente(obj) {
    $("#idPaciente").val(obj.IdPaciente);
    $("#txtNombres").val(obj.Nombres);
    $("#txtApellidos").val(obj.ApPaterno + " " + obj.ApMaterno);
    $("#txtTelefono").val(obj.Telefono);
    $("#txtEdad").val(obj.Edad);
    $("#txtSexo").val((obj.Sexo == 'M')?'Masculino':'Femenino');
    
}

function limpiarDatosPaciente() {
        $("#idPaciente").val("0");
        $("#txtNombres").val("");
        $("#txtApellidos").val("");
        $("#txtTelefono").val("");
        $("#txtEdad").val("");
        $("#txtSexo").val("");
}