import DB from "../DB";
import IDB from "../interfaces/IDB";

class CountryController {
  db: IDB;
  constructor() {
    this.db = DB;
  }
  async getAll() {
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
        languages: allLanguages.filter((l: any) => languageIds.includes(l.id)),
        continent: allContinents.find((c: any) => c.id === continentId)
      };
    });
    return allCountries;
  }
}

export default CountryController;
