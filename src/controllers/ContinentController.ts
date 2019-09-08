import DB from "../DB";
import IDB from "../interfaces/IDB";

class ContinentController {
  db: IDB;
  constructor() {
    this.db = DB;
  }
  async getAll() {
    try {
      return await this.db.continent.select();
    } catch (err) {
      return err;
    }
  }
}
export default ContinentController;
