//Configuracion de timepiker y date
$("[data-mask]").inputmask();
$(".timepicker").timepicker({ showInputs: false, showMeridiam: false, minuteStep: 30 });

var tabla;
function iniDataTable() {
    if (!$.fn.DataTable.isDataTable("#tbl_horarios")) {
        tabla = $("#tbl_horarios").DataTable({
            "aaSorting": [[0, 'desc']],
            "bSort": true,
            "aoColumns": [
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false },
                null,
                null
            ]
        });
    } else {
        tabla = $("#tbl_horarios").DataTable(); // reutiliza instancia si ya existe
    }
    tabla.column(2).visible(false);
}

$('#AgregarHorario').on('shown.bs.modal', function () {
    iniDataTable();
});
$(document).ready(function () {
    iniDataTable();
});

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

                llenarDatosMedico(data.d);
                listHorarios(data.d.IdMedico); 

                //$("#lblNombres").text(medico.Nombre);
                //$("#lblApellidos").text(medico.ApPaterno + " " + medico.ApMaterno);
                //$("#lblEspecialidad").text(medico.Especialidad.Descripcion);
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
                console.log("Contenido real recibido:", data.d.Hora);

                addRow(data.d);
            
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + xhr.responseText);
            }
        });

    } else {
        console.log("Ingrese los datos requeridos");
    }
});

function addRow(obj) {

    var fechaFormateada = formatDate(obj.Fecha);
    tabla.row.add([
        '<button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit" data-target="#imodal" data-toggle="modal"><i class="fa fa-refresh" aria-hidden="true"></i></button>&nbsp;',
        '<button value="Eliminar" title="Eliminar" class="btn btn-danger btn-delete"><i class="fa fa-times" aria-hidden="true"></i></button>',
        obj.IdHorarioAtencion,
        fechaFormateada,
        obj.Hora.hora
    ]).draw();
}

function formatDate(date) {
    var fecha = date.replace('/Date(', '').replace(')/', '');
    var fechaReal = new Date(parseInt(fecha));
    var dia = ("0" + fechaReal.getDate()).slice(-2);
    var mes = ("0" + (fechaReal.getMonth() + 1)).slice(-2);
    var anio = fechaReal.getFullYear();
    return dia + "/" + mes + "/" + anio;
}


function listHorarios(idmedico) {
    iniDataTable();
    var obj = JSON.stringify({ idmedico: idmedico });

    $.ajax({
        type: "POST",
        url: "GestionarHorarioAtencion.aspx/ListarHorariosAtencion",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            console.log("éxito", data);

            // Limpia la tabla antes de agregar nuevas filas
            tabla.clear().draw();

            for (var i = 0; i < data.d.length; i++) {
                addRow(data.d[i]);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error: " + xhr.responseText);
        }
    });
}


$(document).on('click', '.btn-edit', function (e) {
    e.preventDefault();

    var row = $(this).closest('tr');      
    data = tabla.row(row).data();     
    fillModalData(data);                  
});

//Evento click para botón eliminar registros
$(document).on('click', '.btn-delete', function (e) {
    e.preventDefault();
    var row = $(this).closest('tr'); // busca la fila padre más cercana
    var dataRow = tabla.row(row).data(); // usa la nueva API

    //Enviar el id por medio de ajax
   //eleteDataAjax(dataRow[0]); 
    sendDataAjax()


});