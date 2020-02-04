$(document).ready(function() {

	var searchBtn = $('.search-btn'),
			closeBtn = $('.search__close'),
			search = $('.search');

	searchBtn.on("click", function (e) {
		e.preventDefault();
		search.toggleClass('search_active');

		closeBtn.click(function() {
			search.removeClass('search_active');
		});
	});

	$('[data-toggle="popover"]').popover();
	$(".owl-carousel").owlCarousel();
	$("a[rel^='fancyimg']").fancybox({});
});
