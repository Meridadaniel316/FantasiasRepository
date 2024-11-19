(function($) {
    "use strict";  

    //* Form js
    function verificationForm() {
        var current_fs, next_fs, previous_fs; // fieldsets
        var left, opacity, scale; // fieldset properties which we will animate
        var animating; // flag to prevent quick multi-click glitches

        $(".next").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            // Limpiar cualquier estilo de error previo
            $("input, select, textarea").removeClass("error");
            $(".radio").removeClass("error");  // Limpiar las clases de error de los radios

            // Validar los campos requeridos
            var isValid = true;

            // Validar campos de tipo input, select, textarea con required
            current_fs.find("input[required], select[required], textarea[required]").each(function() {
                // Para los select, verificar que no tenga valor vacío
                if ($(this).is("select") && $(this).val() === "") {
                    $(this).addClass("error"); // Agregar clase error
                    isValid = false;
                }
                // Para los input tipo text, date, email, etc., verificar que no esté vacío
                else if ($(this).val() === "" || $(this).val() === null) {
                    $(this).addClass("error"); // Agregar clase error
                    isValid = false;
                }
                // Validar los campos de tipo email con su formato
                else if ($(this).is("input[type='email']") && !$(this)[0].validity.valid) {
                    $(this).addClass("error"); // Agregar clase error si el email no es válido
                    isValid = false;
                }
            });

            // Validar los radio buttons requeridos
            current_fs.find("input[type='radio'][required]").each(function() {
                var name = $(this).attr('name');
                // Verificar si algún radio button de ese grupo está seleccionado
                if (!$("input[name='" + name + "']:checked").length) {
                    // Si no está seleccionado ningún radio button, resaltar el grupo de radios
                    $("input[name='" + name + "']").closest(".radio").addClass("error"); // Aplicar error al contenedor
                    isValid = false;
                }
            });

            // Si no es válido, mostrar alerta y detener el avance
            if (!isValid) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "error",
                    title: "Datos faltantes"
                  });
                animating = false;
                return false; // No continuar al siguiente paso
            }

            // Si todo está bien, avanzar al siguiente paso
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            // Animar el paso siguiente
            next_fs.show();
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = (now * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

        $(".previous").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            // Deactivar el paso actual en el progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            // Mostrar el paso anterior
            previous_fs.show();
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

        $(".submit").click(function () {
            return false;
        });
    }; 
    
    //* Function Calls  
    verificationForm();

})(jQuery);
