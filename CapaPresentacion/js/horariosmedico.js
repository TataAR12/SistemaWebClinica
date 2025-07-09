// Configuración de timepicker y date
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

    //  Registrar evento eliminar solo una vez
    $(document).off('click', '.btn-delete').on('click', '.btn-delete', function (e) {
        e.preventDefault();

        var row = $(this).closest('tr');
        var dataRow = tabla.row(row).data();
        console.log("ID horario a eliminar:", dataRow[2]);
        deleteDataAjax(dataRow[2], row);
    });

    //  Registrar evento editar solo una vez
    $(document).off('click', '.btn-edit').on('click', '.btn-edit', function (e) {
        e.preventDefault();

        var row = $(this).closest('tr');
        var dataRow = tabla.row(row).data();
        llenarDatosHorario(dataRow);
    });
});
function llenarDatosHorario(data) {
    $("#txtEditarFecha").val(data[3]);
    $("#txtEditarHora").val(data[4]);
    $("#txtIdHorario").val(data[2]);
  
}

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
                console.log("éxito", data);
                var medico = data.d;

                llenarDatosMedico(medico);
                $("#txtMedico").val(medico.IdMedico);
                listHorarios(medico.IdMedico);
            },
            error: function (xhr) {
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

$("#btnAgregar").on("click", function (event) {
    event.preventDefault();

    var fecha = $("#txtFecha").val();
    var hora = $("#txtHoraInicio").val();
    var idmedico = $("#txtIdMedico").val();

    if (fecha.length > 0 && hora.length > 0 && idmedico > 0) {
        var obj = JSON.stringify({ fecha: fecha, hora: hora, idmedico: idmedico });

        $.ajax({
            type: "POST",
            url: "GestionarHorarioAtencion.aspx/AgregarHorario",
            data: obj,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                $("#AgregarHorario").modal('toggle');
                addRow(data.d);
            },
            error: function (xhr) {
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
        '<button title="Actualizar" class="btn btn-primary btn-edit" data-target="#imodal" data-toggle="modal"><i class="fa fa-refresh" aria-hidden="true"></i></button>&nbsp;',
        '<button title="Eliminar" class="btn btn-danger btn-delete" data-id="' + obj.IdHorarioAtencion + '"><i class="fa fa-times" aria-hidden="true"></i></button>',
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
    console.log(obj)
    $.ajax({
        type: "POST",
        url: "GestionarHorarioAtencion.aspx/ListarHorariosAtencion",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            tabla.clear().draw();
            for (var i = 0; i < data.d.length; i++) {
                addRow(data.d[i]);
            }
        },
        error: function (xhr) {
            console.log("Error: " + xhr.responseText);
        }
    });
}

// ACTUALIZACIÓN AJAX


$("#btnEditar").click(function (e) {
    e.preventDefault();

    var idmedico = $("#txtMedico").val();
    var idhorario = $("#txtIdHorario").val();
    var fecha = $("#txtEditarFecha").val();
    var hora = $("#txtEditarHora").val();

    var obj = JSON.stringify({
        idmedico: idmedico,
        idhorario: idhorario,
        fecha: fecha,
        hora: hora
    });

    $.ajax({
        type: "POST",
        url: "GestionarHorarioAtencion.aspx/ActualizarHorarioAtencion",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.d) {
                $("#imodal").modal('hide');
                listHorarios(idmedico); // ✅ Usar variable original
                console.log("Datos actualizados correctamente");
            } else {
                alert("Error al actualizar los datos.");
            }
        },
        error: function (xhr) {
            console.log("Error: " + xhr.responseText);
        }
    });
});

// ELIMINAR AJAX ()
function deleteDataAjax(id, row) {
    console.log("Entrando a deleteDataAjax con ID:", id);
    var obj = JSON.stringify({ id: parseInt(id) });

    $.ajax({
        type: "POST",
        url: "GestionarHorarioAtencion.aspx/EliminarHorarioAtencion",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.d) {
                console.log("Datos eliminados correctamente");
                alert("Datos eliminados correctamente.");
                tabla.row(row).remove().draw(); // ✅ Eliminar directamente la fila
            } else {
                alert("Error al eliminar los datos.");
            }
        },
        error: function (xhr) {
            console.log("ERROR AJAX:", xhr.responseText);
            alert("Hubo un error al eliminar. Revisa la consola.");
        }
    });
}
