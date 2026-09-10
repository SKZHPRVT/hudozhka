(function() {
    const style = document.createElement('style');
    style.textContent = `
        body { padding-top: env(safe-area-inset-top, 0px) !important; }
        .top-bar { padding-top: calc(12px + env(safe-area-inset-top, 0px)) !important; }
        .app-header, .fun-header, .dashboard-header, .admin-header, .teacher-header, .partner-header, .profile-header {
            padding-top: calc(16px + env(safe-area-inset-top, 0px)) !important;
        }
        @supports (padding: max(0px)) {
            body { padding-top: max(env(safe-area-inset-top), 0px) !important; }
        }
    `;
    document.head.appendChild(style);
    
    const tg = window.Telegram?.WebApp;
    if (tg) {
        tg.expand();
        const safeTop = tg.viewportStableHeight ? (window.innerHeight - tg.viewportStableHeight) : 0;
        if (safeTop > 0) document.body.style.paddingTop = safeTop + 'px';
    }
    
    if (window.visualViewport) {
        const updatePadding = () => {
            const offsetTop = window.visualViewport.offsetTop || 0;
            if (offsetTop > 0) document.body.style.paddingTop = offsetTop + 'px';
        };
        window.visualViewport.addEventListener('resize', updatePadding);
        window.visualViewport.addEventListener('scroll', updatePadding);
        updatePadding();
    }
})();
