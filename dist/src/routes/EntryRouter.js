"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StatusMsg_1 = __importDefault(require("../utils/StatusMsg"));
const entryRouter = express_1.default.Router();
const entryService = require("../services/EntryService");
entryRouter
    .route("/getEntryData")
    .get((req, res) => {
    const knexInstance = req.app.get("db");
    entryService.getEntryData(knexInstance).then((skills) => {
        res.status(200).send((0, StatusMsg_1.default)(true, skills, null));
    }).catch((err) => {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    });
});
module.exports = entryRouter;
