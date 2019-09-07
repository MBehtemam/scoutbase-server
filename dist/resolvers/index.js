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
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        movies: () => [],
        continents: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.db.continentDB.select("*");
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        languages: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.db.languageDB.select("*");
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        countries: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let allCountries = yield ctx.db.countryDB.select("*");
                const allLanguages = yield ctx.db.languageDB.select("*");
                const countrylanguage = yield ctx.db.countrylanguageDB.select("*");
                const countrycontinent = yield ctx.db.countrycontinentDB.select("*");
                const allContinents = yield ctx.db.continentDB.select("*");
                allCountries = allCountries.map((country) => {
                    const languageIds = countrylanguage
                        .filter((cl) => cl.countryId === country.id.toString())
                        .map((l) => parseInt(l.languageId));
                    const continentId = countrycontinent.find((cc) => cc.countryId == country.id).continentId;
                    return Object.assign(Object.assign({}, country), { languages: allLanguages.filter((l) => languageIds.includes(l.id)), continent: allContinents.find((c) => c.id === continentId) });
                });
                return allCountries;
            }
            catch (err) {
                throw new Error(err);
            }
        })
    }
};
exports.default = resolvers;
