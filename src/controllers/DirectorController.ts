import DB from "../DB";
import IDB from "../interfaces/IDB";
import CountryController from "./CountryController";

class DirectorController {
  db: IDB;
  countryController: any;
  constructor() {
    this.db = DB;
    this.countryController = new CountryController();
  }
  async createDirector(name: string, birthday: string, countryId: string) {
    try {
      const directorInserted = await this.db.director.insert({
        name,
        birthday,
        countryId
      });
      const country = await this.countryController.getById(countryId);
      let director = await this.db
        .Knex("director")
        .select()
        .where("id", directorInserted[0])
        .first();
      return {
        ...director,
        country
      };
    } catch (err) {
      return err;
    }
  }
}

export default DirectorController;
