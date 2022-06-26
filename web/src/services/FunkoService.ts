import { Service } from "./Service";
import axios from "axios";

const { REACT_APP_URL_API } = process.env;
class FunkoService extends Service {
  constructor() {
    super('/funko');
  }

  async updateImage<T> (id: number | string, data: T) {
    await axios({
      url: `${REACT_APP_URL_API}funko/updateImage`,
      method: 'POST',
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      data
    });
	}
}

export default new FunkoService();