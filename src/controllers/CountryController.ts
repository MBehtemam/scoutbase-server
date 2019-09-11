import DB from "../DB";
import IDB from "../interfaces/IDB";

class CountryController {
  db: IDB;
  constructor() {
    this.db = DB;
  }
  async getAll() {
    try {
      let allCountries = await this.db.country.select("*");
      const allLanguages = await this.db.language.select("*");
      const countrylanguage = await this.db.countrylanguage.select("*");
      const countrycontinent = await this.db.countrycontinent.select("*");
      const allContinents = await this.db.continent.select("*");
      allCountries = allCountries.map((country: any) => {
        const languageIds: string[] = countrylanguage
          .filter((cl: any) => cl.countryId === country.id.toString())
          .map((l: any) => parseInt(l.languageId));
        const continentId = countrycontinent.find(
          (cc: any) => cc.countryId == country.id
        ).continentId;
        return {
          ...country,
          languages: allLanguages.filter((l: any) =>
            languageIds.includes(l.id)
          ),
          continent: allContinents.find((c: any) => c.id === continentId)
        };
      });
      return allCountries;
    } catch (err) {
      return err;
    }
  }
  async getById(id: string) {
    try {
      const country = await this.db.country
        .select()
        .where("id", id)
        .first();
      const continentObject = await this.db.countrycontinent
        .select()
        .where("countryId", id)
        .first();
      const continent = await this.db.continent
        .select()
        .where("id", continentObject.continentId)
        .first();
      return {
        ...country,
        continent
      };
    } catch (err) {
      return err;
    }
  }
  async getByCountryCode(code: string) {
    try {
      const country = await this.db.country
        .select()
        .where("code", code.toUpperCase())
        .first();
      if (!country) {
        throw new Error("Country not exists");
      }
      const continentObject = await this.db.countrycontinent
        .select()
        .where("countryId", country.id)
        .first();
      const continent = await this.db.continent
        .select()
        .where("id", continentObject.continentId)
        .first();
      return {
        ...country,
        continent
      };
    } catch (err) {
      return err;
    }
  }
}

export default CountryController;
