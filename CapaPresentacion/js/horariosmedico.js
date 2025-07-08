//Configuracion de timepiker y date
$("[data-mask]").inputmask();
$(".timepicker").timepicker({ showInputs: false, showMeridiam: false, minuteStep: 30 });


$("#bntBuscar").on("click", function (event) {
    event.preventDefault();

    var dni = $("#txtDni").val();
    var obj = JSON.stringify({ dni: dni });

    if (dni.length > 0) {
        //Llamada ajax
        $.ajax({
            type: "POST",
            url: "GestionarHorarioAtencion.aspx/BuscarMedico",
            data: obj,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) { 
                console.log("éxito", data);
                var medico = data.d;

                llenarDatosMedico(medico);

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
    $("#txtIdMedico").val(obj.IdMedico || 0);
}

// Agregar horario
$("#btnAgregar").on("click", function (event) {
    event.preventDefault();

    // Obtener los valores de los campos
    var fecha = $("#txtFecha").val();
    var hora = $("#txtHoraInicio").val();
    var idmedico = $("#txtIdMedico").val();

    console.log("ID Médico:", idmedico);

    if (fecha.length > 0 && hora.length > 0 && idmedico > 0) {
        var obj = JSON.stringify({ fecha: fecha, hora: hora, idmedico: idmedico }); 

        // Llamada AJAX
        $.ajax({
            type: "POST",
            url: "GestionarHorarioAtencion.aspx/AgregarHorario",
            data: obj,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                console.log("éxito", data);
                //Cerrar ventana modal usando jQuery
                $("#AgregarHorario").modal('toggle');
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + xhr.responseText);
            }
        });

    } else {
        console.log("Ingrese los datos requeridos");
    }
});