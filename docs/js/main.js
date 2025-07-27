// メインビジュアル画像の自動切り替え（クロスディゾルブ）
const initMainVisual = () => {
    const mainVisualContainer = document.querySelector('.l-home__hero-image');
    const mainVisualImg = document.getElementById('main-visual');
    if (!mainVisualImg || !mainVisualContainer) return;
    
    const images = [
        './images/mv1.jpg',
        './images/mv2.jpg',
        './images/mv3.jpg',
        './images/mv4.jpg',
        './images/mv5.jpg'
    ];
    
    let currentIndex = Math.floor(Math.random() * images.length);
    
    // 初期画像を設定
    mainVisualImg.src = images[currentIndex];
    
    // プリロード他の画像（パフォーマンス向上のため）
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // 5秒ごとに画像を切り替え（クロスディゾルブ）
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        
        // 新しい画像要素を作成
        const newImg = document.createElement('img');
        newImg.src = images[currentIndex];
        newImg.alt = mainVisualImg.alt;
        newImg.loading = 'eager';
        newImg.style.position = 'absolute';
        newImg.style.top = '0';
        newImg.style.left = '0';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.objectFit = 'cover';
        newImg.style.objectPosition = 'center';
        newImg.style.borderRadius = '16px';
        newImg.style.opacity = '0';
        newImg.style.transition = 'opacity 1s ease-in-out';
        
        // コンテナにrelative positionを設定
        mainVisualContainer.style.position = 'relative';
        
        // 新しい画像をコンテナに追加
        mainVisualContainer.appendChild(newImg);
        
        // 少し遅れてフェードイン開始
        setTimeout(() => {
            newImg.style.opacity = '1';
        }, 50);
        
        // 1秒後に古い画像を削除し、新しい画像をメイン画像に設定
        setTimeout(() => {
            mainVisualImg.src = images[currentIndex];
            if (newImg.parentNode) {
                newImg.parentNode.removeChild(newImg);
            }
        }, 1000);
    }, 5000);
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