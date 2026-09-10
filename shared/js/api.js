// API модуль для работы с сервером и SaluteJazz

class HudozhkaAPI {
    constructor() {
        this.baseUrl = CONFIG.API_URL;
        this.token = localStorage.getItem('auth_token');
    }
    
    // Авторизация
    async login(telegramId, role) {
        const response = await fetch(`${this.baseUrl}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telegram_id: telegramId, role })
        });
        const data = await response.json();
        this.token = data.token;
        localStorage.setItem('auth_token', data.token);
        return data;
    }
    
    // Получить расписание
    async getSchedule(date) {
        const response = await fetch(`${this.baseUrl}/schedule?date=${date}`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return await response.json();
    }
    
    // Создать запись
    async createBooking(bookingData) {
        const response = await fetch(`${this.baseUrl}/bookings`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        return await response.json();
    }
    
    // Оплатить
    async createPayment(bookingId, method) {
        const response = await fetch(`${this.baseUrl}/payments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ booking_id: bookingId, method })
        });
        return await response.json();
    }
}

// SaluteJazz API для видеонаблюдения
class SaluteJazzAPI {
    constructor() {
        this.token = CONFIG.SALUTE_JAZZ_TOKEN;
        this.baseUrl = CONFIG.SALUTE_JAZZ_API;
    }
    
    // Создать комнату для трансляции
    async createRoom(lessonId, lessonName) {
        const response = await fetch(`${this.baseUrl}/rooms`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `Занятие #${lessonId} - ${lessonName}`,
                type: 'broadcast',
                settings: {
                    recording: true,
                    chat: false,
                    participants_limit: 100,
                    quality: 'hd'
                }
            })
        });
        return await response.json();
    }
    
    // Получить ссылку для просмотра
    async getStreamUrl(roomId, userId) {
        return `${this.baseUrl}/stream/${roomId}?viewer=${userId}`;
    }
    
    // Завершить трансляцию
    async endStream(roomId) {
        const response = await fetch(`${this.baseUrl}/rooms/${roomId}/end`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return await response.json();
    }
    
    // Получить запись занятия
    async getRecording(roomId) {
        const response = await fetch(`${this.baseUrl}/recordings/${roomId}`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return await response.json();
    }
}

// Инициализация API
const api = new HudozhkaAPI();
const jazzAPI = new SaluteJazzAPI();

// Экспорт
if (typeof module !== 'undefined') {
    module.exports = { HudozhkaAPI, SaluteJazzAPI, api, jazzAPI };
}
