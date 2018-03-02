var forSlider = {
    windowWidth: window.innerWidth,
    selector: '.slider-wrap',
    responsive: 1023,
    mobileSettings: {
    	controls: false,
        minSlides: 1,
        maxSlides: 1,
        adaptiveHeight: true,
        infiniteLoop: true
    }
};

if (forSlider.windowWidth > forSlider.responsive) {
    forSlider.identify = 0;
} else {
    forSlider.identify = 1;
}

$(document).ready(function() {


	//фикс svg спрайта для ИЕ
	// svg4everybody();


	$('.toform').click(function() {
		$("html, body").animate({
			scrollTop: $("#order_form").offset().top - 10
		}, {
			duration: 1000,
			easing: "swing"
		});
		return false;
	});





	//Анимации
	//Animate.scss + WayPoints JS plugin with settings in sass
	$.fn.animated = function(animName) {
		$(this).each(function() {
			var ths = $(this);
			$(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
				ths.addClass(animName);
			}, {
				offset: '85%'
			});

		});
	};

	//Init animation
	// .item - target item
	// animation-name - class from _animation.sass

	// $(".section_3 li").animated("s3_list--anim");
	// $(".section_3 .butn-wrap").animated("s3_butn--anim");



















	//SLIDER
	forSlider.sliderClone = $(forSlider.selector).html();


});



$(window).load(function() {
    if (forSlider.identify) {
        forSlider.slider = $('.slider').bxSlider(forSlider.mobileSettings);
    }
});

$(window).resize(function() {
    forSlider.windowWidth = window.innerWidth;
    if (forSlider.windowWidth > forSlider.responsive && forSlider.identify) {
        forSlider.slider.destroySlider();
        $(forSlider.selector).html(forSlider.sliderClone);
        forSlider.identify = 0;
    } else if (forSlider.windowWidth <= forSlider.responsive && !forSlider.identify) {
        forSlider.slider = $('.slider').bxSlider(forSlider.mobileSettings);
        forSlider.identify = 1;
    }
});
