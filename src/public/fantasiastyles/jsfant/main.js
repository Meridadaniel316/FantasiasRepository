(function($) {

	"use strict";

	$('[data-toggle="tooltip"]').tooltip()

	$("#modalPromociones").modal('show');
	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

})(jQuery);