import $ from "jquery";


$(function () {
    $(window).on('load scroll', function () {
        setAnimationClass();
    })
    var animationClass = 'effect'; // アニメーション対象のclass名
    var animationFinClass = 'fadeIn'; // アニメーションが実行時に付与するclass名
    var animationStartPosition = 0.75; // アニメーションが実行されるスクロール位置

    // アニメーションが完了しているかどうかを管理する配列
    var animationFlagArr = [];
    for (var i = 0; i < $('.' + animationClass).length; i++) {
        animationFlagArr[i] = false;
    }

    function setAnimationClass() {
        // アニメーションの実行前に、アニメーション完了済の要素を確認しておく
        for (var i = 0; i < $('.' + animationClass).length; i++) {
            if ($('.' + animationClass).eq(i).hasClass(animationFinClass)) {
                animationFlagArr[i] = true;
            }
        }

        // スクロール位置と画面高さを取得
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        // アニメーション対象要素が開始位置までスクロールしている場合、classを付与する
        for (var i = 0; i < animationFlagArr.length; i++) {
            if (animationFlagArr[i] == false) {
                var thisElement = $('.' + animationClass).eq(i);
                var thisTop = thisElement.offset().top;
                if (scrollTop + (windowHeight * animationStartPosition) > thisTop) {
                    thisElement.addClass(animationFinClass);
                }
            }
        }
    }
})