"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const StatusMsg_1 = __importDefault(require("../utils/StatusMsg"));
const timelineRouter = express_1.default.Router();
const timelineService = require("../services/timelineService");
timelineRouter
    .route("/getTimelineItems")
    .get((req, res) => {
    const knexInstance = req.app.get("db");
    timelineService.getTimelineItems(knexInstance).then((timelineItems) => {
        res.status(200).send((0, StatusMsg_1.default)(true, timelineItems, null));
    }).catch((err) => {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    });
});
timelineRouter
    .route("/updateTimelineItem")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { id, deleted, icon_source, title, text, date } = req.body;
        const modified = (0, dayjs_1.default)().format();
        const timelineItem = { id, deleted, modified, icon_source, title, text, date };
        timelineService.updateTimelineItem(knexInstance, timelineItem).then((updateTimelineItem) => {
            res.status(200).send((0, StatusMsg_1.default)(true, updateTimelineItem, null));
        }).catch((err) => {
            res.status(200).send((0, StatusMsg_1.default)(false, null, err));
        });
    }
    catch (err) {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    }
});
timelineRouter
    .route("/postTimelineItem")
    .post((req, res, next) => {
    try {
        const knexInstance = req.app.get("db");
        const { icon_source, title, text, date, order } = req.body;
        const created = (0, dayjs_1.default)().format();
        const deleted = null;
        const modified = null;
        const timelineItem = { created, deleted, modified, icon_source, title, text, date, order };
        timelineService.postTimelineItem(knexInstance, timelineItem).then((newTimelineItem) => {
            res.status(200).send((0, StatusMsg_1.default)(true, newTimelineItem, null));
        }).catch((err) => {
            res.status(200).send((0, StatusMsg_1.default)(false, null, err));
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    }
});
module.exports = timelineRouter;
