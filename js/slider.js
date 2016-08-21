/**
 * Vocomfest Slider
 * LinkenSky Team
 */
var Slider = (function() {

    var $slideshow = document.getElementById('slider'),
        $items = $slideshow.querySelectorAll('li'),
        itemsCount = $items.length,
        current = 0,
        slideshowtime,
        interval = 5000;

    function init(config) {


        for (var i = 0; i < $items.length; ++i) {
            $items[i].style.background = 'url(' + $items[i].childNodes[0].getAttribute('src') + ') no-repeat center center';
            $items[i].style.backgroundSize = 'cover';
        }

        $items[0].style.opacity = 1;
        // start the slideshow
        startSlideshow();

    }


    function navigate(direction) {

        // current item
        var $oldItem = $items[current];

        if (direction === 'next') {
            current = current < itemsCount - 1 ? ++current : 0;
        } else if (direction === 'prev') {
            current = current > 0 ? --current : itemsCount - 1;
        }

        // new item
        var $newItem = $items[current];
        // show / hide items
        $oldItem.style.opacity = 0;
        $newItem.style.opacity = 1;

    }

    function startSlideshow() {

        clearTimeout(slideshowtime);
        slideshowtime = setTimeout(function() {
            navigate('next');
            startSlideshow();
        }, interval);

    }

    return {
        init: init
    };

})();
