$(function() {

    var slideHeight = $(window).height();
    $('#header-carousel .carousel-inner .item').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#header-carousel .carousel-inner .item').css('height',slideHeight);
    });

    var wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false
    });
    wow.init();
});
