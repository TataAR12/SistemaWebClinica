var tabla = null;
var data = null;

function addRowDT(data) {
    tabla = $("#tbl_pacientes").DataTable();
    tabla.clear(); // Limpia la tabla antes de agregar

    for (var i = 0; i < data.length; i++) {
        tabla.row.add([
            data[i].IdPaciente,
            data[i].Nombres,
            data[i].ApPaterno + " " + data[i].ApMaterno,
            (data[i].Sexo === 'M') ? "Masculino" : "Femenino",
            data[i].Edad,
            data[i].Direccion,
            '<button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit" data-target="#imodal" data-toggle="modal"><i class="fa fa-refresh" aria-hidden="true"></i></button>&nbsp;' +
            '<button value="Eliminar" title="Eliminar" class="btn btn-danger btn-delete"><i class="fa fa-times" aria-hidden="true"></i></button>'

            //(data[i].Estado === true) ? "Activo" : "Inactivo"
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

function updateDataAjax() {

    var obj = JSON.stringify({ id: (data[0]), direccion: $("#txtModalDireccion").val()});
 
    $.ajax({
        type: "POST",
        url: "GestionarPaciente.aspx/ActualizarDatosPaciente",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.d) {
                $('#imodal').modal('hide');
                alert("Datos actualizados correctamente.");
                sendDataAjax();
            } else {
                alert("Error al actualizar los datos."); }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error: " + xhr.responseText);
        }
    });
}
function deleteDataAjax(data) {

    var obj = JSON.stringify({ id:(data) });

    $.ajax({
        type: "POST",
        url: "GestionarPaciente.aspx/EliminarDatosPaciente",
        data: obj,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.d) {
                alert("Datos actualizados correctamente.");
                sendDataAjax();
            } else {
                alert("Error al actualizar los datos.");
            }
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
    //Evento click para boton actualizar registros
    $(document).on('click', '.btn-edit', function (e) {
        e.preventDefault();

        var row = $(this).closest('tr');      // Busca la fila
         data = tabla.row(row).data();     // Obtiene los datos de esa fila
        fillModalData(data);                  // Llama a la función con los datos
    });

    //Evento click para botón eliminar registros
    $(document).on('click', '.btn-delete', function (e) {
        e.preventDefault();
        var row = $(this).closest('tr'); // busca la fila padre más cercana
        var dataRow = tabla.row(row).data(); // usa la nueva API

        //Enviar el id por medio de ajax
        deleteDataAjax(dataRow[0]); // Llama a la función de eliminación con el ID del paciente
        //paso 2: renderizar el datatable
        sendDataAjax()

        
    });

    //cargar datos en el modal
    function fillModalData(data) {
        $("#txtFullName").val(data[1]);        
        $("#txtModalDireccion").val(data[5]);   
    }
    //Enviar la informacion al servidor 
    $("#btnactualizar").click(function (e) {
        e.preventDefault();
        updateDataAjax();

    });
    

//Llamado a la funcion de ajax al cargar el documento
    sendDataAjax();
});
