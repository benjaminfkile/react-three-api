"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NODE_ENV = process.env.NODE_ENV;
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
const entryRouter = require("./routes/EntryRouter");
const aboutRouter = require("./routes/AboutRouter");
const timelineRouter = require("./routes/TimelineRouter");
const skillRouter = require("./routes/SkillRouter");
const portfolioRouter = require("./routes/PortfolioRouter");
const authRouter = require("./routes/AuthRouter");
const encryptionRouter = require("./routes/EncryptionRouter");
const morganOption = (NODE_ENV === "production")
    ? "tiny"
    : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
    res.send("portfolio api");
});
app.use("/api/entry", entryRouter);
app.use("/api/about", aboutRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/skills", skillRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/auth", authRouter);
app.use("/api/encryption", encryptionRouter);
process.on('uncaughtException', (err) => {
    console.error(err);
    console.log("Node NOT Exiting...");
});
module.exports = app;
