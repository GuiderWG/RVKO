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

	/* Mobile menu */
	var menuLink = $('.mobile-menu-btn'),
			menuLinkActive = $('.mobile-menu-btn_active'),
			mobileMenu = $('.mobile-menu-wrap'),
			mobileMenuLink = $('.mobile-menu__link');

	$('#main-nav').hcOffcanvasNav({
      maxWidth: 992,
			customToggle: menuLink,
  });
	menuLink.click(function() {
		menuLink.toggleClass('mobile-menu-btn_active');
		mobileMenu.toggleClass('mobile-menu-wrap_active');
	});

	mobileMenuLink.click(function() {
		menuLink.toggleClass('mobile-menu-btn_active');
		mobileMenu.toggleClass('mobile-menu-wrap_active');
	});
	/*----*/

	$('[data-toggle="popover"]').popover();
	$(".owl-carousel").owlCarousel();
	$("a[rel^='fancyimg']").fancybox({});
});
