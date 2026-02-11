import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/leaderboard';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getCsrfToken = () => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
};

api.interceptors.request.use(config => {
    const token = getCsrfToken();
    if (token) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});

export const submitScore = async (userId, score) => {
    try {
        const response = await api.post('/submit', { user_id: userId, score });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getTopScores = async () => {
    try {
        const response = await api.get('/top');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getPlayerRank = async (userId) => {
    try {
        const response = await api.get(`/rank/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default api;
