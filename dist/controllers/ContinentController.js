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
class ContinentController {
    constructor() {
        this.db = new DB_1.default();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.continent.select();
            }
            catch (err) {
                return err;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.continent
                    .select()
                    .where("id", id)
                    .first();
            }
            catch (err) {
                return err;
            }
        });
    }
    getByCountryId(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { continentId } = yield this.db.countrycontinent
                    .select()
                    .where("countryId", countryId)
                    .first();
                const continent = yield this.getById(continentId);
                return continent;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = ContinentController;
