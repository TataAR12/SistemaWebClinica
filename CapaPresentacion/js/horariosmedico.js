$("#bntBuscar").on("click", function (event) {
    event.preventDefault();

    var dni = $("#txtDni").val();
    var obj = JSON.stringify({ dni: dni });

    if (dni.length > 0) {
        $.ajax({
            type: "POST",
            url: "GestionarHorarioAtencion.aspx/BuscarMedico",
            data: obj,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                console.log("éxito");
                llenarDatosMedico(data);

                var medico = data.d;

                $("#lblNombres").text(medico.Nombre);
                $("#lblApellidos").text(medico.ApPaterno + " " + medico.ApMaterno);
                $("#lblEspecialidad").text(medico.Especialidad.Descripcion);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + xhr.responseText);
            }
        });
    } else {
        console.log("No ha ingresado un dni");
    }
});


function llenarDatosMedico(obj) {
    $("#lblNombres").text(obj.Nombre || "");
    var apellidoCompleto = (obj.ApPaterno || "") + " " + (obj.ApMaterno || "");
    $("#lblApellidos").text(apellidoCompleto.trim());
    $("#lblEspecialidad").text(obj.Especialidad?.Descripcion || "");
}