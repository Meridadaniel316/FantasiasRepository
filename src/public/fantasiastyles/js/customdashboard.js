(function ($) {

    "use strict";

    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /* ..............................................
    Promotion and updates
    ................................................. */
    $('[data-toggle="tooltip"]').tooltip()

    $('#modalUpdatesDatosDashboard').modal({backdrop: 'static', keyboard: false})
    $("#modalUpdatesDashboard").modal('show');

    var botonpromocionedit = document.getElementById("botonpromocionedit");

    if (botonpromocionedit) {
        botonpromocionedit.onclick = function (e) {
            $("#modalEditPromociones").modal('show');
        }
    }

    var botoneditPageHome = document.getElementById("botoneditPageHome");

    if (botoneditPageHome) {
        botoneditPageHome.onclick = function (e) {
            $("#modalEditPageHome").modal('show');
        }
    }

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    /* ..............................................
    Buttons
    ................................................. */

    $('#datatablebuttons').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        'dom': 'lBfrtip',
        'buttons': [
            {
                "extend": "copyHtml5",
                "text": "<i class='far fa-copy'></i> Copiar",
                "titleAttr": "Copiar",
                "className": "btn btn-secondary"
            },
            {
                "extend": "print",
                "text": "<i class='bi bi-printer-fill'></i> Imprimir",
                "titleAttr": "Imprimir",
                "className": "btn btn-warning"
            },
            {
                "extend": "excelHtml5",
                "text": "<i class='fas fa-file-excel'></i> Excel",
                "titleAttr": "Esportar a Excel",
                "className": "btn btn-success"
            }, {
                "extend": "csvHtml5",
                "text": "<i class='fas fa-file-csv'></i> CSV",
                "titleAttr": "Esportar a CSV",
                "className": "btn btn-info"
            }
        ],
        "resonsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "desc"]],
        "responsive": true
    });
    /* ..............................................
        Quetion Product 
        ................................................. */
    $("#questionproduct").on("click", function (e) {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Quieres ver o crear productos?',
            text: "¡Selecciona la opción que necesites actualmente!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Ver productos',
            cancelButtonText: 'Crear producto',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/admin/products";
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                window.location.href = "/admin/new-product";
            }
        })
    });
})(jQuery);

