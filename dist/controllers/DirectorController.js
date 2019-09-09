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
const CountryController_1 = __importDefault(require("./CountryController"));
class DirectorController {
    constructor() {
        this.db = DB_1.default;
        this.countryController = new CountryController_1.default();
    }
    createDirector(name, birthday, countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const directorInserted = yield this.db.director.insert({
                    name,
                    birthday,
                    countryId
                });
                const country = yield this.countryController.getById(countryId);
                let director = yield this.db
                    .Knex("director")
                    .select()
                    .where("id", directorInserted[0])
                    .first();
                return Object.assign(Object.assign({}, director), { country });
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = DirectorController;
