import { api } from '../api/api';

interface LoginInterface {
  username: string;
  password: string;
}

class LoginService {
  private url: string;

  constructor() {
    this.url = '/login';
  }

  verify (payload: LoginInterface) {
    return api.post(this.url, payload);
  }
}

export default new LoginService();