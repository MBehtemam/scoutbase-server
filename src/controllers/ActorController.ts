import DB from "../DB";
import IDB from "../interfaces/IDB";
import CountryController from "./CountryController";

class ActorController {
  db: IDB;
  countryController: any;
  constructor() {
    this.db = new DB();
    this.countryController = new CountryController();
  }
  async createActor(name: string, birthday: string, countryId: string) {
    try {
      const actorInserted = await this.db.actor.insert({
        name,
        birthday,
        countryId
      });
      const country = await this.countryController.getById(countryId);
      let actor = await this.db
        .Knex("actor")
        .select()
        .where("id", actorInserted[0])
        .first();
      return {
        ...actor,
        country
      };
    } catch (err) {
      return err;
    }
  }
}

export default ActorController;
