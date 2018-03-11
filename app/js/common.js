
$(document).ready(function() {


	//фикс svg спрайта для ИЕ
	// svg4everybody();


	//Яндекс карта
    ymaps.ready(init);
    var myMap;
    function init(){     

        var myMap = new ymaps.Map('map', {
			center: [52.45209395, 30.96043722],
            zoom: 15,
			controls: []

		},
		{suppressMapOpenBlock: true})
    }



    //сворачивалка тарифы в меню
    $(".tariff__title").on("click", function() {
    	$(".tariff__list").toggle(200);
    	$(".tariff__title-arrow").toggleClass("is-bottom")
    });


    //свитчер карта/список водителей
    var butnMap = $(".js_icon-map");
    var butnDriversList = $(".js_icon-list");
    var mapBox = $(".map-wrap");
    var driversBox = $(".main-line__drivers-list");
    //.is-visible .is-hidden

    butnMap.on("click", function() {

    	mapBox.addClass("is-visible");
    	mapBox.removeClass("is-hidden");

    	driversBox.addClass("is-hidden");
    	driversBox.removeClass("is-visible");

    	//это костылы только для теста. скрывает слой с иконками машин на карте
    	$(".main-line__ui").addClass("is-visible");
    	$(".main-line__ui").removeClass("is-hidden");

    });

    butnDriversList.on("click", function() {

		mapBox.addClass("is-hidden");
		mapBox.removeClass("is-visible");

    	driversBox.addClass("is-visible");
    	driversBox.removeClass("is-hidden");

    	//это костылы только для теста. скрывает слой с иконками машин на карте
    	$(".main-line__ui").addClass("is-hidden");
    	$(".main-line__ui").removeClass("is-visible");

    });


});