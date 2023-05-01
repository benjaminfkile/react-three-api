"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const skillRouter = express_1.default.Router();
const skillService = require("../services/SkillService");
skillRouter
    .route("/getSkills")
    .get((req, res) => {
    const knexInstance = req.app.get("db");
    skillService.getSkills(knexInstance).then((skills) => {
        res.send(skills);
    });
});
skillRouter
    .route("/postSkill")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { icon_source, title, text, order } = req.body;
        const created = (0, dayjs_1.default)().format();
        const skill = { created, icon_source, title, text, order };
        skillService.postSkill(knexInstance, skill).then((newSkill) => {
            if (newSkill) {
                res.send(newSkill);
            }
            else {
                res.status(400).send("bad request");
            }
        });
    }
    catch (_a) {
        res.status(400).send("bad request");
    }
});
skillRouter
    .route("/updateSkill")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { id, deleted, icon_source, title, text } = req.body;
        const modified = (0, dayjs_1.default)().format();
        const skill = { id, deleted, modified, icon_source, title, text };
        skillService.updateSkill(knexInstance, skill).then((updatedSkill) => {
            if (updatedSkill) {
                res.send(updatedSkill);
            }
            else {
                res.status(400).send("bad request");
            }
        });
    }
    catch (_a) {
        res.status(400).send("bad request");
    }
});
module.exports = skillRouter;
