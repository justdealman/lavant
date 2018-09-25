function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		if ( !t.is('.scale-min') ) {
			t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
		} else {
			t.css({
				'min-height': t.outerWidth()*$(this).attr('data-ratio')
			});
		}
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:991px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	
	$('[data-tabs-slider]').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		speed: 0,
		adaptiveHeight: true
	});
	function setTab(e) {
		var id = e.attr('href')-1;
		var tabsContainer = e.parents('[data-tabs-container]')
		tabsContainer.find('[data-tabs-slider]').slick('slickGoTo', id);
	}
	$('[data-tabs-nav] a').on('click', function(e) {
		e.preventDefault();
		setTab($(this));
	});
	$('[data-tabs-nav] a.is-active').each(function() {
		setTab($(this));
	})
	$('[data-tabs-slider]').slick('setOption', 'speed', 500);
	$('[data-tabs-slider]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		var id = nextSlide+1;
		var links = $(this).parents('[data-tabs-container]').find('[data-tabs-nav]');
		links.find('a[href="'+id+'"]').addClass('is-active').siblings().removeClass('is-active');
	});
	
	$('.welcome-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 750,
		adaptiveHeight: true,
		fade: true,
		cssEase: 'ease',
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false
				}
			}
		]
	});
	
	function setMinCard() {
		if ( !isMobile ) {
			if ( !$('.panel').hasClass('is-hidden') ) {
				var min = $(window).height()-$('.panel').outerHeight()-$('.header').outerHeight();
			} else {
				var min = $(window).height()-$('.header').outerHeight();
			}
			if ( min < 800 ) {
				min = 800;
			}
		} else {
			var min = 0;
		}
		$('.card__row').css({
			'min-height': min+'px'
		});
		$('.card').addClass('is-visible');
	}
	
	function setWelcome() {
		var ratio = 498/1920;
		if ( !isMobile ) {
			var min = $('.welcome').outerWidth()*ratio;
		} else {
			var min = 0;
		}
		$('.welcome').css({
			'min-height': min+'px'
		});
		if ( !isMobile ) {
			var h = $('.welcome').outerHeight();
		} else {
			var h = 'auto'
		}
		$('.welcome-slider .slick-list, .welcome-slider__item').outerHeight(h).addClass('is-visible');
		$('.welcome-slider__item').addClass('is-visible');
	}

	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				
			} else {
				
			}
		}
		setRatio();
		if ( $('.welcome').length ) {
			setWelcome();
		}
		if ( $('.card').length ) {
			setMinCard();
		}
	}
	
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('input[type="checkbox"]').uniform();
	
	$(document).on('click', '[data-open]', function(e) {
		e.preventDefault();
		if ( $('.menu-drop').hasClass('is-opened') ) {
			menuClose();
		}
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		t.addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	function menuOpen() {
		$('.menu-open, header .nav').addClass('is-opened');
		$('body').addClass('is-locked');
	}
	function menuClose() {
		$('.menu-open, header .nav').removeClass('is-opened');
		$('body').removeClass('is-locked');
	}
	$('.menu-open').on('click', function(e) {
		if ( !$(this).hasClass('is-opened') ) {
			menuOpen();
		} else {
			menuClose();
		}
	});
	$('.menu-drop--close, .fade-bg').on('click', function(e) {
		menuClose();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.elem-quantity--minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('.elem-quantity--input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.elem-quantity--plus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('.elem-quantity--input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	
	function setWrapper(e) {
		if ( e == 0 ) {
			var panel = 0;
			$('header.header').addClass('is-top');
		} else {
			var panel = 54;
			$('header.header').removeClass('is-top');
		}
		$('.wrapper').css({
			'padding-top': $('header.header').outerHeight()+panel
		});
	}
	if ( !$('.panel').length || $('.panel').hasClass('is-hidden') ) {
		setWrapper(0);
	}
	$(window).on('scroll', function() {
		if ( $(document).scrollTop() > $('.panel').outerHeight() ) {
			$('header.header').addClass('is-fixed');
		} else {
			$('header.header').removeClass('is-fixed');
		}
	});
	function panelOpen() {
		$('.panel').removeClass('is-hidden');
		setWrapper(1);
		if ( $('.card').length ) {
			setMinCard();
		}
	}
	function panelClose() {
		$('.panel').addClass('is-hidden');
		setWrapper(0);
		if ( $('.card').length ) {
			setMinCard();
		}
	}
	$('.panel--close').on('click', function() {
		panelClose();
	});
	
	function setPriceBg(e) {
		var t = e.parents('.card__button');
		var buy = t.find('.button');
		e.css({
			left: buy.position().left,
			top: buy.position().top,
			width: buy.outerWidth(),
			height: buy.outerHeight()
		}).addClass('is-visible');
	}
	$('.card__button--bg').each(function() {
		setPriceBg($(this));
	});
	$('.card__button').on('mouseenter', function() {
		var bg = $(this).find('.card__button--bg');
		bg.css({
			left: 0,
			top: 0,
			width: 100+'%',
			height: 100+'%'
		});
	});
	$('.card__button, [data-add]').on('click', function() {
		if ( !$(this).hasClass('is-active') ) {
			$(this).addClass('is-active');
		} else {
			$(this).removeClass('is-active');
		}
	});
	$('.card__button').on('mouseleave', function() {
		if ( !$(this).hasClass('is-active') ) {
			setPriceBg($(this).find('.card__button--bg'));
		}
	});
	
	$(window).on('scroll', function() {
		if ( $('.card').length ) {
			var start = $('.card').offset().top+($('.card').outerHeight())-$(window).height();
			var end = $('.other').offset().top-$(window).height()+55;
			if ( $(document).scrollTop() > start && !isMobile )  {
				$('.card__controls').addClass('is-fixed');
				if ( $(document).scrollTop() > end ) {
					$('.card__controls').css({
						marginBottom: $(document).scrollTop()-end
					});
				}
			} else {
				$('.card__controls').removeClass('is-fixed');
			}
		}
	});
	$(window).trigger('scroll');
});