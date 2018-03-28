//import lottie from "../library/lottie.js";

//ロゴアニメ
const animData = {
    container: document.getElementById('logo'),
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: true,
    path: '../json/data.json'
};

const anim = lottie.loadAnimation(animData);