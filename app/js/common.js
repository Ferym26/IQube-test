
$(document).ready(function() {


	//фикс svg спрайта для ИЕ
	// svg4everybody();

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



});