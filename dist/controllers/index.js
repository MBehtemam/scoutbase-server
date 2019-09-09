"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActorController_1 = __importDefault(require("./ActorController"));
const ContinentController_1 = __importDefault(require("./ContinentController"));
const CountryController_1 = __importDefault(require("./CountryController"));
const LanguageController_1 = __importDefault(require("./LanguageController"));
const UserController_1 = __importDefault(require("./UserController"));
const controllers = {
    actor: new ActorController_1.default(),
    continent: new ContinentController_1.default(),
    country: new CountryController_1.default(),
    language: new LanguageController_1.default(),
    user: new UserController_1.default()
};
exports.default = controllers;
