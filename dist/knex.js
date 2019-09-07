"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexModule = knex_1.default({
    client: "sqlite3",
    connection: {
        filename: "./mydb.sqlite"
    }
});
exports.default = knexModule;
