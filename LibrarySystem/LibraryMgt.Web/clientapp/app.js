"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var module_1 = require("./module");
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
core_1.enableProdMode();
platform.bootstrapModule(module_1.AppModule);
//# sourceMappingURL=app.js.map