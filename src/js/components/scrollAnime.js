import $ from "jquery";

$(function () {
    // $(window).ready(function () {
    //     var worksPosition = $(this).offset().top;
    //     var scroll = $(window).scrollTop();
    //     var windowHeight = $(window).height();
    //     $('.l-works__item').each(function () {
    //         if (worksPosition > windowHeight - windowHeight / 5) {
    //             $(this).css('opacity', '1.0');
    //         }
    //     })
    // })
    $(window).scroll(function () {
        var worksPosition = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        $('.l-works__item').each(function () {
            if (scroll > worksPosition - windowHeight + windowHeight / 5) {
                $(this).addClass("fadeIn")
            }
        });
    });
});