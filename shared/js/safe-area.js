// ========== SAFE AREA ДЛЯ TELEGRAM FULLSCREEN ==========
(function() {
    let currentTopInset = 0;
    
    function applySafeArea(topInset) {
        if (Math.abs(topInset - currentTopInset) < 5) return;
        currentTopInset = topInset;
        
        document.querySelectorAll('style[data-safe-area]').forEach(function(s) { s.remove(); });
        
        const style = document.createElement('style');
        style.setAttribute('data-safe-area', 'true');
        style.textContent = 
            'body { padding-top: ' + topInset + 'px !important; }' +
            '.top-bar { padding-top: calc(12px + ' + Math.max(0, topInset - 15) + 'px) !important; }' +
            '.app-header, .fun-header, .dashboard-header, .admin-header, ' +
            '.teacher-header, .partner-header, .profile-header { ' +
            '  padding-top: calc(16px + ' + Math.max(0, topInset - 15) + 'px) !important; }';
        document.head.appendChild(style);
        console.log('📐 Safe area applied:', topInset + 'px');
    }
    
    const tg = window.Telegram && window.Telegram.WebApp;
    
    if (tg) {
        tg.ready();
        tg.expand();
        
        const getTopInset = function() {
            const innerH = window.innerHeight;
            const stableH = tg.viewportStableHeight || innerH;
            const diff = innerH - stableH;
            return diff > 10 ? diff : 20;
        };
        
        applySafeArea(getTopInset());
        
        if (tg.onEvent) {
            tg.onEvent('viewportChanged', function() {
                applySafeArea(getTopInset());
            });
        }
        
        setTimeout(function() { applySafeArea(getTopInset()); }, 100);
        setTimeout(function() { applySafeArea(getTopInset()); }, 300);
        setTimeout(function() { applySafeArea(getTopInset()); }, 800);
        setTimeout(function() { applySafeArea(getTopInset()); }, 1500);
    } else {
        applySafeArea(20);
    }
    
    if (window.visualViewport) {
        const updatePadding = function() {
            const topInset = window.visualViewport.offsetTop || 0;
            if (topInset > 0) applySafeArea(topInset);
        };
        window.visualViewport.addEventListener('resize', updatePadding);
        window.visualViewport.addEventListener('scroll', updatePadding);
    }
})();
