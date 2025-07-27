// メインビジュアル画像のランダム表示
const initMainVisual = () => {
    const mainVisualImg = document.getElementById('main-visual');
    if (!mainVisualImg) return;
    
    const images = [
        './images/mv1.jpg',
        './images/mv2.jpg',
        './images/mv3.jpg',
        './images/mv4.jpg',
        './images/mv5.jpg'
    ];
    
    // ランダムな画像を選択
    const randomImage = images[Math.floor(Math.random() * images.length)];
    mainVisualImg.src = randomImage;
    
    // プリロード他の画像（パフォーマンス向上のため）
    images.forEach(src => {
        if (src !== randomImage) {
            const img = new Image();
            img.src = src;
        }
    });
};


// スクロール連動アニメーション用のIntersection Observer
const createScrollObserver = () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // プロフィールとリンクセクションを監視
    document.querySelectorAll('.l-home__profile, .l-home__links').forEach(el => {
        observer.observe(el);
    });
};

// 年数を自動更新
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// パフォーマンス監視とエラーハンドリング
window.addEventListener('error', (error) => {
    console.error('JavaScript Error:', error.message, 'at', error.filename, ':', error.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ページロード時間を監視
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigationTiming')[0] || performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    // メインビジュアル画像をランダム設定
    initMainVisual();
    
    // スクロール連動アニメーションを初期化
    if ('IntersectionObserver' in window) {
        createScrollObserver();
    }
    
    // Reduced motion対応
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // アニメーションを無効化する場合の処理
        document.querySelectorAll('.l-home__profile, .l-home__links').forEach(el => {
            el.classList.add('in-view');
        });
    }
});

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