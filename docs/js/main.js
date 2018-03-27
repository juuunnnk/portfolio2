//ロゴアニメ
const animData = {
    container: document.getElementById('logo'),
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: true,
    path: './json/data.json'
};
const anim = lottie.loadAnimation(animData);

// vue
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter);

// import routes from './routes'
// const router = new VueRouter({
//   routes: routes
// });

// const app = new Vue({
//   el: '#app',
//   router
// });