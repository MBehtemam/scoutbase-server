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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKeys_1 = __importDefault(require("../config/secretKeys"));
const DB_1 = __importDefault(require("../DB"));
class UserController {
    constructor() {
        this.db = new DB_1.default();
    }
    hasUserByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const has = yield this.db.user
                    .select()
                    .where("username", username)
                    .first();
                if (has) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                return err;
            }
        });
    }
    hasUserByUserNameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const has = yield this.db.user
                    .select()
                    .where({ username, password })
                    .first();
                if (has) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                return err;
            }
        });
    }
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const has = yield this.hasUserByUserName(username);
                if (has) {
                    throw new Error("user already exist");
                }
                else {
                    const userId = yield this.db.user.insert({
                        username,
                        password,
                        name: ""
                    });
                    const user = yield this.getUserById(userId[0]);
                    return this.addTokenToUser(user);
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const has = yield this.hasUserByUserNameAndPassword(username, password);
                if (has) {
                    const userWithouttoken = yield this.getUserByUserName(username);
                    return this.addTokenToUser(userWithouttoken);
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db
                    .Knex("user")
                    .select()
                    .where("id", id);
                return user[0];
            }
            catch (err) {
                return err;
            }
        });
    }
    getUserByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.user
                    .select()
                    .where("username", username)
                    .first();
            }
            catch (err) {
                return err;
            }
        });
    }
    addTokenToUser(user) {
        const { id, name } = user;
        const token = jsonwebtoken_1.default.sign({ id, name }, secretKeys_1.default.USER_TOKEN);
        return {
            user,
            token
        };
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = token.split(" ")[1];
                if (userToken) {
                    const verifiedUser = jsonwebtoken_1.default.verify(userToken, secretKeys_1.default.USER_TOKEN);
                    if (verifiedUser) {
                        const user = yield this.getUserById(verifiedUser.id);
                        if (user) {
                            return this.addTokenToUser(user);
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    return undefined;
                }
            }
            catch (err) {
                return undefined;
            }
        });
    }
}
exports.default = UserController;
