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
  async getById(id: string) {
    try {
      return await this.db.continent
        .select()
        .where("id", id)
        .first();
    } catch (err) {
      return err;
    }
  }
  async getByCountryId(countryId: string) {
    try {
      const { continentId } = await this.db.countrycontinent
        .select()
        .where("countryId", countryId)
        .first();
      const continent = await this.getById(continentId);
      return continent;
    } catch (err) {
      return err;
    }
  }
}
export default ContinentController;
