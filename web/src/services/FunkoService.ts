import { Service } from "./Service";

class FunkoService extends Service {
  constructor() {
    super('/funko');
  }
}

export default new FunkoService();