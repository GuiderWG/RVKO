$(document).ready(function() {

	/*Hide/Show Search*/
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
	/*-----*/

	/*Fixed menu*/
	$(window).scroll(function () {

    $('.wr-se-head').removeClass('fixed-top');
    if($(this).width() >= 320){
      var preHeaderHeight = $('.pre-header').outerHeight();
      if ($(this).scrollTop() > preHeaderHeight) {
        $('.wr-se-head').addClass('fixed-top');
      } else {
        $('.wr-se-head').removeClass('fixed-top');
      }
    }
  }).scroll();
	/*-----*/

	/* TOP SCROLL */
  var offset = 300,
    offset_opacity = 1200,
    scroll_top_duration = 700,
    $back_to_top = $('.cd-top');
  $(window).scroll(function() {
    ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass('cd-fade-out');
    }
  });

  $back_to_top.on('click', function(event) {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0,
    }, scroll_top_duration);
  });
  /*---*/

	/* Mobile menu */
	var menuLink = $('.mobile-menu-btn');

	$('#main-nav').hcOffcanvasNav({
      maxWidth: 992,
			customToggle: menuLink,
			labelClose: '<img src="img/logo_normal.png" alt="" class="logo__img logo__img_mobile img-fluid">',
			labelBack: 'Назад',
  });
	/*----*/

	/*Slick Slider Video*/
	var slideWrapper = $(".main-slider"),
	    iframes = slideWrapper.find('.embed-player'),
	    lazyImages = slideWrapper.find('.slide-image'),
	    lazyCounter = 0;

	// POST commands to YouTube or Vimeo API
	function postMessageToPlayer(player, command){
	  if (player == null || command == null) return;
	  player.contentWindow.postMessage(JSON.stringify(command), "*");
	}

	// When the slide is changing
	function playPauseVideo(slick, control){
	  var currentSlide, slideType, startTime, player, video;

	  currentSlide = slick.find(".slick-current");
	  slideType = currentSlide.attr("class").split(" ")[1];
	  player = currentSlide.find("iframe").get(0);
	  startTime = currentSlide.data("video-start");

	  if (slideType === "vimeo") {
	    switch (control) {
	      case "play":
	        if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
	          currentSlide.addClass('started');
	          postMessageToPlayer(player, {
	            "method": "setCurrentTime",
	            "value" : startTime
	          });
	        }
	        postMessageToPlayer(player, {
	          "method": "play",
	          "value" : 1
	        });
	        break;
	      case "pause":
	        postMessageToPlayer(player, {
	          "method": "pause",
	          "value": 1
	        });
	        break;
	    }
	  } else if (slideType === "youtube") {
	    switch (control) {
	      case "play":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "mute"
	        });
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "playVideo"
	        });
	        break;
	      case "pause":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "pauseVideo"
	        });
	        break;
	    }
	  } else if (slideType === "video") {
	    video = currentSlide.children("video").get(0);
	    if (video != null) {
	      if (control === "play"){
	        video.play();
	      } else {
	        video.pause();
	      }
	    }
	  }
	}

	// Resize player
	function resizePlayer(iframes, ratio) {
	  if (!iframes[0]) return;
	  var win = $(".main-slider"),
	      width = win.width(),
	      playerWidth,
	      height = win.height(),
	      playerHeight,
	      ratio = ratio || 16/9;

	  iframes.each(function(){
	    var current = $(this);
	    if (width / ratio < height) {
	      playerWidth = Math.ceil(height * ratio);
	      current.width(playerWidth).height(height).css({
	        left: (width - playerWidth) / 2,
	         top: 0
	        });
	    } else {
	      playerHeight = Math.ceil(width / ratio);
	      current.width(width).height(playerHeight).css({
	        left: 0,
	        top: (height - playerHeight) / 2
	      });
	    }
	  });
	}


	  // Initialize
	  slideWrapper.on("init", function(slick){
	    slick = $(slick.currentTarget);
	    setTimeout(function(){
	      playPauseVideo(slick,"play");
	    }, 1000);
	    resizePlayer(iframes, 16/9);
	  });
	  slideWrapper.on("beforeChange", function(event, slick) {
	    slick = $(slick.$slider);
	    playPauseVideo(slick,"pause");
	  });
	  slideWrapper.on("afterChange", function(event, slick) {
	    slick = $(slick.$slider);
	    playPauseVideo(slick,"play");
	  });
	  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
	    lazyCounter++;
	    if (lazyCounter === lazyImages.length){
	      lazyImages.addClass('show');
	      // slideWrapper.slick("slickPlay");
	    }
	  });

	  //start the slider
	  slideWrapper.slick({
	    // fade:true,
	    autoplaySpeed:4000,
	    lazyLoad:"progressive",
	    speed:600,
	    arrows:false,
	    dots:true,
	    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
	  });


	// Resize event
	$(window).on("resize.slickVideoPlayer", function(){
	  resizePlayer(iframes, 16/9);
	});
	/*-------*/

	/*YANDEX MAP*/
  var ifmap = document.getElementById('left-map');
  if (ifmap != null) {
    function init () {
        var myMap = new ymaps.Map('left-map', {
            center: [55.766147, 37.604241],
            controls: [],
            zoom: 16,
                behaviors: ['default', 'scrollZoom']
            }),
            myPlacemark = new ymaps.Placemark([55.766147, 37.604241], {
							hintContent: 'г. Москва, ул.Тверская д.18, корп. 1, офис 720',
              balloonContent: 'г. Москва, ул.Тверская д.18, корп. 1, офис 720'
            }, {
              iconLayout: 'default#image',
              iconImageHref: '/img/big_shema.png',
              iconImageSize: [29, 47],
              iconImageOffset: [-14, -47]
            }),

            myCollection = new ymaps.GeoObjectCollection();

        myCollection.add(myPlacemark);

        myMap.geoObjects.add(myCollection);

    }
    ymaps.ready(init);
  }

  var ifmapRight = document.getElementById('right-map');
  if (ifmapRight != null) {
    function init () {
        var myMap = new ymaps.Map('right-map', {
            center: [51.803785, 55.065550],
            controls: [],
            zoom: 16,
                behaviors: ['default', 'scrollZoom']
            }),
            myPlacemark = new ymaps.Placemark([51.803785, 55.065550], {
							hintContent: 'г. Оренбург, пр. Братьев Коростелевых, 52',
              balloonContent: 'г. Оренбург, пр. Братьев Коростелевых, 52'
            }, {
              iconLayout: 'default#image',
              iconImageHref: '/img/big_shema.png',
              iconImageSize: [29, 47],
              iconImageOffset: [-14, -47]
            }),

            myCollection = new ymaps.GeoObjectCollection();

        myCollection.add(myPlacemark);

        myMap.geoObjects.add(myCollection);

    }
    ymaps.ready(init);
  }
  /*---*/

	new WOW().init();

	$('[data-toggle="popover"]').popover();
	$(".owl-carousel").owlCarousel();
	$("a[rel^='fancyimg']").fancybox({});
});
