"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        this.app.listen(config_1.config.port, function () {
            console.log("App listening on the port ".concat(config_1.config.port));
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map