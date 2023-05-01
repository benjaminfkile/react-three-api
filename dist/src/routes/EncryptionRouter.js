"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const encryptionRouter = express_1.default.Router();
const encryptionService = require("../services/EncryptionService");
const jsonParser = express_1.default.json();
encryptionRouter
    .route("/generateHash")
    .post(jsonParser, (req, res) => {
    try {
        const { str } = req.body;
        encryptionService.generateHash(str).then((hash) => {
            res.send(hash);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
});
module.exports = encryptionRouter;
