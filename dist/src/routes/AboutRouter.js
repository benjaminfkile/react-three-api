"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const express_1 = __importDefault(require("express"));
const StatusMsg_1 = __importDefault(require("../utils/StatusMsg"));
const aboutRouter = express_1.default.Router();
const aboutService = require("../services/AboutService");
aboutRouter
    .route("/getAbout")
    .get((req, res) => {
    const knexInstance = req.app.get("db");
    aboutService.getAbout(knexInstance).then((about) => {
        res.status(200).send((0, StatusMsg_1.default)(true, about, null));
    }).catch((err) => {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    });
});
// aboutRouter
//     .route("/postAbout")
//     .post((req: Request, res: Response) => {
//         try {
//             const knexInstance = req.app.get("db")
//             const { text } = req.body
//             const created = dayjs().format()
//             const about = { text, created }
//             aboutService.postAbout(knexInstance, about).then((newAbout: AboutTypes) => {
//                 if (newAbout) {
//                     res.send(newAbout)
//                 } else {
//                     res.status(400).send("bad request")
//                 }
//             })
//         } catch {
//             res.status(400).send("bad request")
//         }
//     })
aboutRouter
    .route("/updateAbout")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { id, text } = req.body;
        const modified = (0, dayjs_1.default)().format();
        const about = { id, text, modified };
        aboutService.updateAbout(knexInstance, about).then((updatedAbout) => {
            res.status(200).send((0, StatusMsg_1.default)(true, updatedAbout, null));
        }).catch((err) => {
            res.status(200).send((0, StatusMsg_1.default)(false, null, err));
        });
    }
    catch (err) {
        res.status(200).send((0, StatusMsg_1.default)(false, null, err));
    }
});
module.exports = aboutRouter;
