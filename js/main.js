var animData = {
    container: document.getElementById('logo'),
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: true,
    path: './json/data.json'
};
var anim = lottie.loadAnimation(animData);

var animData = {
    container: document.getElementsByClassName('juuunnnkAnime'),
    renderer: 'svg',
    loop: true,
    prerender: true,
    autoplay: true,
    path: './json/data.json'
};
var anim = lottie.loadAnimation(animData);