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
            console.log('consulta con datos');
           // addRowDT(data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error: " + xhr.responseText);
        }
    });
}