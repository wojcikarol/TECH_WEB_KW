"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var index_controller_1 = __importDefault(require("./controllers/index.controller"));
var data_controller_1 = __importDefault(require("./controllers/data.controller"));
var app = new app_1.default([
    new index_controller_1.default(), new data_controller_1.default()
]);
app.listen();
//# sourceMappingURL=index.js.map