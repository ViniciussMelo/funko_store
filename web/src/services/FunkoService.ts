import { Service } from "./Service";
import axios from "axios";

const { REACT_APP_URL_API } = process.env;
class FunkoService extends Service {
  constructor() {
    super('/funko');
  }

  async updateFunkoAndImage<T> (id: number | string, data: T) {
    await axios({
      url: `${REACT_APP_URL_API}funko/${id}`,
      method: 'PUT',
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      data
    });
	}
}

export default new FunkoService();