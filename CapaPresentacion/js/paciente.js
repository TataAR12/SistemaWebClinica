function addRowDT(data) {
    var tabla = $("#tbl_pacientes").DataTable();
    tabla.clear(); // Limpia la tabla antes de agregar

    for (var i = 0; i < data.length; i++) {
        tabla.row.add([
            data[i].Idpaciente,
            data[i].Nombres,
            data[i].ApPaterno + " " + data[i].ApMaterno,
            (data[i].Sexo === 'M') ? "Masculino" : "Femenino",
            data[i].Edad,
            data[i].Direccion,
            (data[i].Estado === true) ? "Activo" : "Inactivo"
        ]);
    }
    tabla.draw(false); // Renderiza las filas
}

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "GestionarPaciente.aspx/ListarPacientes",
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            addRowDT(data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error: " + xhr.responseText);
        }
    });
}

$(document).ready(function () {
    $('#tbl_pacientes').DataTable({
        destroy: true,
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        }
    });

    sendDataAjax();
});
