"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var tensai_1 = require("../lib/tensai");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/chat", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, model, reply, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, message = _a.message, model = _a.model;
                if (!message) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Message is required",
                        })];
                }
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Model is required",
                        })];
                }
                console.log("CHAT REQUEST:", {
                    model: model,
                    time: new Date().toISOString(),
                });
                return [4 /*yield*/, (0, tensai_1.callAI)({
                        message: message,
                        model: model,
                    })];
            case 1:
                reply = _b.sent();
                res.json({ reply: reply });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("SERVER ERROR:", error_1);
                res.status(500).json({
                    error: "AI service temporarily unavailable",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/models", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var models, groqKey, groqRes, text, groqData, groqModels, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                models = [];
                groqKey = process.env.GROQ_API_KEY;
                if (!groqKey) {
                    return [2 /*return*/, res.status(500).json({
                            error: "GROQ_API_KEY not found",
                        })];
                }
                return [4 /*yield*/, fetch("https://api.groq.com/openai/v1/models", {
                        headers: {
                            Authorization: "Bearer ".concat(groqKey),
                        },
                    })];
            case 1:
                groqRes = _a.sent();
                if (!!groqRes.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, groqRes.text()];
            case 2:
                text = _a.sent();
                throw new Error(text);
            case 3: return [4 /*yield*/, groqRes.json()];
            case 4:
                groqData = _a.sent();
                if (Array.isArray(groqData.data)) {
                    groqModels = groqData.data
                        .filter(function (m) { return m.active; })
                        .map(function (m) { return ({
                        label: m.id,
                        model: m.id,
                    }); });
                    models.push.apply(models, groqModels);
                }
                res.json(models);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error("MODELS ERROR:", error_2);
                res.status(500).json({
                    error: "Failed to fetch models",
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
var distPath = path_1.default.resolve(process.cwd(), "dist");
app.use(express_1.default.static(distPath));
app.use(function (req, res) {
    res.sendFile(path_1.default.join(distPath, "index.html"));
});
app.listen(PORT, "0.0.0.0", function () {
    console.log("Server running at http://0.0.0.0:".concat(PORT));
});
