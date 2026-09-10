// ========== SAFE AREA ДЛЯ TELEGRAM — ФИНАЛЬНАЯ ВЕРСИЯ ==========
(function() {
    let applied = false;
    let lastInset = 0;
    
    function applySafeArea(topInset) {
        // Не применяем если отступ не изменился
        if (applied && Math.abs(topInset - lastInset) < 3) return;
        
        applied = true;
        lastInset = topInset;
        
        // Удаляем старые
        document.querySelectorAll('style[data-safe-area]').forEach(function(s) { s.remove(); });
        
        // Создаём новый
        const style = document.createElement('style');
        style.setAttribute('data-safe-area', 'true');
        style.textContent = 
            'body { padding-top: ' + topInset + 'px !important; }' +
            '.top-bar { padding-top: calc(12px + ' + Math.max(0, topInset - 15) + 'px) !important; }' +
            '.fun-header { padding-top: ' + (topInset + 20) + 'px !important; }' +
            '.dashboard-header { padding-top: ' + topInset + 'px !important; }' +
            '.app-header, .admin-header, .teacher-header, .partner-header, .profile-header { ' +
            '  padding-top: ' + topInset + 'px !important; }';
        document.head.appendChild(style);
        
        console.log('📐 Safe area:', topInset + 'px');
    }
    
    function calculateInset() {
        const tg = window.Telegram && window.Telegram.WebApp;
        
        if (!tg) {
            // Браузер без Telegram — минимальный отступ
            return 20;
        }
        
        // Приоритет 1: разница между реальной и стабильной высотой
        const innerH = window.innerHeight;
        const stableH = tg.viewportStableHeight || innerH;
        const diff = innerH - stableH;
        
        if (diff > 10) {
            return diff;
        }
        
        // Приоритет 2: проверяем платформу
        const platform = tg.platform || 'unknown';
        if (platform === 'ios') return 60;
        if (platform === 'android') return 40;
        if (platform === 'web') return 20;
        
        // Приоритет 3: fallback по userAgent
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return 60;
        if (/Android/i.test(navigator.userAgent)) return 40;
        
        return 20;
    }
    
    function initSafeArea() {
        const tg = window.Telegram && window.Telegram.WebApp;
        
        if (tg) {
            // 1. Обязательная инициализация
            tg.ready();
            
            // 2. Ждём полной загрузки DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                        tg.expand();
                        applySafeArea(calculateInset());
                    }, 50);
                });
            } else {
                tg.expand();
                applySafeArea(calculateInset());
            }
            
            // 3. Слушаем событие изменения viewport — САМОЕ ВАЖНОЕ
            if (tg.onEvent) {
                tg.onEvent('viewportChanged', function() {
                    applySafeArea(calculateInset());
                });
                
                tg.onEvent('themeChanged', function() {
                    applySafeArea(calculateInset());
                });
            }
            
            // 4. Дополнительные проверки через интервалы
            // (для случаев когда viewportChanged не срабатывает)
            setTimeout(function() { applySafeArea(calculateInset()); }, 100);
            setTimeout(function() { applySafeArea(calculateInset()); }, 300);
            setTimeout(function() { applySafeArea(calculateInset()); }, 600);
            setTimeout(function() { applySafeArea(calculateInset()); }, 1000);
            setTimeout(function() { applySafeArea(calculateInset()); }, 2000);
            
        } else {
            // Не в Telegram — минимальный отступ
            applySafeArea(20);
        }
    }
    
    // Запускаем инициализацию сразу
    initSafeArea();
    
    // Также слушаем изменение размера окна (для поворота экрана)
    window.addEventListener('resize', function() {
        setTimeout(function() {
            applySafeArea(calculateInset());
        }, 100);
    });
    
    // Слушаем визуальный viewport (для iOS Safari)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', function() {
            const offsetTop = window.visualViewport.offsetTop || 0;
            if (offsetTop > 0) applySafeArea(offsetTop);
        });
    }
})();
