// ========== ЖЁСТКИЙ SAFE AREA ДЛЯ TELEGRAM ==========
(function() {
    const tg = window.Telegram && window.Telegram.WebApp;
    
    if (tg) {
        tg.ready();
        tg.expand();
    }
    
    // Жёсткий отступ: 60px для мобильных, 20px для десктопа
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const topInset = isMobile ? 60 : 20;
    
    document.querySelectorAll('style[data-safe-area]').forEach(function(s) { s.remove(); });
    
    const style = document.createElement('style');
    style.setAttribute('data-safe-area', 'true');
    style.textContent = 
        'body { padding-top: ' + topInset + 'px !important; }' +
        '.top-bar { padding-top: calc(12px + ' + (topInset - 20) + 'px) !important; }' +
        '.fun-header { padding-top: ' + (topInset + 20) + 'px !important; }' +
        '.dashboard-header { padding-top: ' + topInset + 'px !important; }' +
        '.app-header { padding-top: ' + topInset + 'px !important; }' +
        '.admin-header { padding-top: ' + topInset + 'px !important; }' +
        '.teacher-header { padding-top: ' + topInset + 'px !important; }' +
        '.partner-header { padding-top: ' + topInset + 'px !important; }' +
        '.profile-header { padding-top: ' + topInset + 'px !important; }';
    document.head.appendChild(style);
    
    console.log('📐 Hardcoded safe area:', topInset + 'px');
})();
