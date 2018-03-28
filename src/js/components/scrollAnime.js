import $ from "jquery";
import jqueryInview from "jquery-inview";

$(function () {
    $('.l-works__item').on('inview', function (event, isInView) {
        if (isInView) {
            //表示領域に入った時
            $(this).addClass('fadeIn');
        }
    });
});