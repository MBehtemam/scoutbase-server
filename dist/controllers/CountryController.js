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
        this.db = DB_1.default;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allCountries = yield this.db.country.select("*");
            const allLanguages = yield this.db.language.select("*");
            const countrylanguage = yield this.db.countrylanguage.select("*");
            const countrycontinent = yield this.db.countrycontinent.select("*");
            const allContinents = yield this.db.continent.select("*");
            allCountries = allCountries.map((country) => {
                const languageIds = countrylanguage
                    .filter((cl) => cl.countryId === country.id.toString())
                    .map((l) => parseInt(l.languageId));
                const continentId = countrycontinent.find((cc) => cc.countryId == country.id).continentId;
                return Object.assign(Object.assign({}, country), { languages: allLanguages.filter((l) => languageIds.includes(l.id)), continent: allContinents.find((c) => c.id === continentId) });
            });
            return allCountries;
        });
    }
}
exports.default = CountryController;
