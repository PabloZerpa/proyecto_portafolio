
import axios from 'axios';
import authHeader from './header.service';

const baseUrl = "http://localhost:3001/api/";

class UserService {

    getUserData() {
        return axios.get(`${baseUrl}user`, { headers: authHeader() });
    }

    getAdminData() {
        return axios.get(`${baseUrl}`, { headers: authHeader() });
    }
}

export default new UserService();