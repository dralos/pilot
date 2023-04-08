import axios from 'axios';

// set this global
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    async login(user) {
        const response = await axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    async logout() {
        localStorage.removeItem('user');
    }

    async register(user) {
        return await axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();