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
	
	function setMinCard() {
		if ( !isMobile ) {
			var min = $(window).height()-$('.card').offset().top;
			if ( min < 800 ) {
				min = 800;
			}
		} else {
			var min = 0;
		}
		$('.card__row').css({
			'min-height': min+'px'
		});
	}

	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				
			} else {
				
			}
		}
		setRatio();
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
	
	
	function panelOpen() {
		$('.panel').stop().slideDown(300);
	}
	function panelClose() {
		$('.panel').stop().slideUp(300);
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
	$('.card__button').on('mouseleave', function() {
		setPriceBg($(this).find('.card__button--bg'));
	});
	
	$(document).on('scroll', function() {
		var start = $('.card').offset().top+($('.card').outerHeight())-$(window).height();
		var end = $('footer').offset().top-$(window).height();
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
	});
});