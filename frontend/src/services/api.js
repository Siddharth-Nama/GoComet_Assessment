import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/leaderboard';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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
