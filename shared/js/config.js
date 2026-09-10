// Конфигурация приложения Художка.ПРО
const CONFIG = {
    // Основные настройки
    APP_NAME: 'Художка.ПРО',
    SCHOOL_NAME: 'Художественная школа «Художка»',
    SCHOOL_ADDRESS: 'г. Белгород, ул. Архиерейская, 4, офис 40',
    SCHOOL_PHONE: '+7 915 562-22-02',
    
    // API endpoints
    API_URL: 'https://api.hudozhka.pro',
    SALUTE_JAZZ_API: 'https://api.salutejazz.com',
    
    // Telegram
    TELEGRAM_BOT: '@hudozhka_pro_bot',
    
    // Настройки
    CURRENCY: '₽',
    TIMEZONE: 'Europe/Moscow',
    DEFAULT_VIEW: 'calendar', // calendar | payment | video
    
    // Роли пользователей
    ROLES: {
        ADMIN: 'admin',
        TEACHER: 'teacher',
        PARENT: 'parent',
        STUDENT: 'student',
        PARTNER: 'partner'
    }
};

// Типы занятий
const LESSON_TYPES = {
    TRIAL: { name: 'Пробное занятие', duration: 60, price: 0 },
    REGULAR: { name: 'Регулярное занятие', duration: 90, price: 800 },
    MASTERCLASS: { name: 'Мастер-класс', duration: 120, price: 1500 },
    PLEIN_AIR: { name: 'Пленэр', duration: 180, price: 2000 }
};

// Статусы записей
const BOOKING_STATUS = {
    PENDING: { name: 'Ожидает', color: '#FFA500' },
    CONFIRMED: { name: 'Подтверждена', color: '#4CAF50' },
    PAID: { name: 'Оплачена', color: '#2196F3' },
    CANCELLED: { name: 'Отменена', color: '#F44336' },
    COMPLETED: { name: 'Завершена', color: '#9E9E9E' }
};

// Тарифы абонементов
const TARIFFS = {
    TRIAL: { name: 'Пробное занятие', price: 0, lessons: 1, description: 'Бесплатное пробное занятие' },
    SINGLE: { name: 'Разовое занятие', price: 800, lessons: 1, description: 'Одно занятие' },
    MONTHLY_4: { name: 'Абонемент на 4 занятия', price: 2800, lessons: 4, description: 'Выгодно для новичков' },
    MONTHLY_8: { name: 'Абонемент на 8 занятий', price: 5200, lessons: 8, description: 'Популярный выбор' },
    VIP: { name: 'VIP безлимит', price: 8900, lessons: 999, description: 'Максимум творчества' }
};

// Методы оплаты
const PAYMENT_METHODS = {
    TELEGRAM_STARS: { name: 'Telegram Stars', icon: '⭐' },
    YOOKASSA: { name: 'Банковская карта', icon: '💳' },
    SBP: { name: 'СБП', icon: '🏦' }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined') {
    module.exports = { CONFIG, LESSON_TYPES, BOOKING_STATUS, TARIFFS, PAYMENT_METHODS };
}
