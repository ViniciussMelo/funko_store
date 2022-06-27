import { Service } from "./Service";
import axios from "axios";

const { REACT_APP_URL_API } = process.env;


interface ParamsInterface {
	sortName: string;
	sortDirection: string;
}
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

  async getFunkoOnSale(params?: ParamsInterface) {
    await axios({
      url: `${REACT_APP_URL_API}funko/onSale`,
      method: 'GET',
      params
    })
  }
}

export default new FunkoService();