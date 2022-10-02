"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
const email = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(401).json({
            message: 'pon tu correo pe causita, colabora...',
        });
    }
    try {
        const sender = new sendEmail_1.default();
        await sender.sendEmailInstance(email);
        res.status(200).json({
            message: `Un correito ha sido enviado a: ${email}`,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};
const simpleWelcome = (req, res) => {
    res.send('<h1>Hello BROOO</h1>');
};
app.get('/', simpleWelcome);
app.post('/email', email);
exports.default = app;
