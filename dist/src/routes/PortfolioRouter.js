"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const StatusMsg_1 = __importDefault(require("../utils/StatusMsg"));
const portfolioRouter = express_1.default.Router();
const portfolioService = require("../services/portfolioService");
portfolioRouter
    .route("/getPortfolioItems")
    .get((req, res) => {
    const knexInstance = req.app.get("db");
    portfolioService.getPortfolioItems(knexInstance).then((portfolioItems) => {
        res.status(200).send((0, StatusMsg_1.default)(true, portfolioItems, null));
    }).catch((err) => {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    });
});
portfolioRouter
    .route("/updatePortfolioItem")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { id, deleted, img_url, title, text, order } = req.body;
        const modified = (0, dayjs_1.default)().format();
        const portfolioItem = { id, deleted, modified, img_url, title, text, order };
        portfolioService.updatePortfolioItem(knexInstance, portfolioItem).then((updatedPortfolioItem) => {
            res.status(200).send((0, StatusMsg_1.default)(true, updatedPortfolioItem, null));
        }).catch((err) => {
            res.status(200).send((0, StatusMsg_1.default)(false, null, err));
        });
    }
    catch (err) {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    }
});
portfolioRouter
    .route("/postPortfolioItem")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { img_url, title, text, order } = req.body;
        const created = (0, dayjs_1.default)().format();
        const deleted = null;
        const modified = null;
        const portfolioItem = { created, deleted, modified, img_url, title, text, order };
        portfolioService.postPortfolioItem(knexInstance, portfolioItem).then((newPortfolioItem) => {
            res.status(200).send((0, StatusMsg_1.default)(true, newPortfolioItem, null));
        }).catch((err) => {
            res.status(200).send((0, StatusMsg_1.default)(false, null, err));
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    }
});
module.exports = portfolioRouter;
