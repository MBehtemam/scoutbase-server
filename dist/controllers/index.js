"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContinentController_1 = __importDefault(require("./ContinentController"));
const UserController_1 = __importDefault(require("./UserController"));
const controllers = {
    continent: new ContinentController_1.default(),
    user: new UserController_1.default()
};
exports.default = controllers;
