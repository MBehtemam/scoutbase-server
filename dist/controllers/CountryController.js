"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../DB"));
class CountryController {
    constructor() {
        this.db = new DB_1.default();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allCountries = yield this.db.country.select("*");
                if (!allCountries) {
                    allCountries = yield this.db.Knex("country").select("*");
                }
                const allLanguages = yield this.db.language.select("*");
                const countrylanguage = yield this.db.countrylanguage.select("*");
                const countrycontinent = yield this.db.countrycontinent.select("*");
                const allContinents = yield this.db.continent.select("*");
                allCountries = allCountries.map((country) => {
                    const languageIds = countrylanguage
                        .filter((cl) => cl.countryId === country.id.toString())
                        .map((l) => parseInt(l.languageId));
                    const continentId = countrycontinent.find((cc) => cc.countryId === country.id).continentId;
                    return Object.assign(Object.assign({}, country), { languages: allLanguages.filter((l) => languageIds.includes(l.id)), continent: allContinents.find((c) => c.id === continentId) });
                });
                return allCountries;
            }
            catch (err) {
                return err;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const country = yield this.db.country
                    .select("*")
                    .where("id", id)
                    .first();
                const continentObject = yield this.db.countrycontinent
                    .select("*")
                    .where("countryId", id)
                    .first();
                const continent = yield this.db.continent
                    .select("*")
                    .where("id", continentObject.continentId)
                    .first();
                return Object.assign(Object.assign({}, country), { continent });
            }
            catch (err) {
                return err;
            }
        });
    }
    getByCountryCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(code.toUpperCase());
                let country = yield this.db.country
                    .select("*")
                    .where("code", code.toUpperCase())
                    .first();
                if (!country) {
                    country = yield this.db
                        .Knex("country")
                        .select("*")
                        .where("code", code.toUpperCase())
                        .first();
                }
                if (!country) {
                    throw new Error("Country not exists");
                }
                let continentObject = yield this.db.countrycontinent
                    .select("*")
                    .where("countryId", country.id)
                    .first();
                if (!continentObject) {
                    continentObject = yield this.db
                        .Knex("countrycontinent")
                        .select("*")
                        .where("countryId", country.id)
                        .first();
                }
                const continent = yield this.db.continent
                    .select("*")
                    .where("id", continentObject.continentId)
                    .first();
                return Object.assign(Object.assign({}, country), { continent });
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = CountryController;
