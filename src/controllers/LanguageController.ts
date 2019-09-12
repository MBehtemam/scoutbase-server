import DB from "../DB";
import IDB from "../interfaces/IDB";

class LanguageController {
  db: IDB;
  constructor() {
    this.db = new DB();
  }
  async getAll() {
    try {
      return await this.db.language.select();
    } catch (err) {
      return err;
    }
  }
}
export default LanguageController;
