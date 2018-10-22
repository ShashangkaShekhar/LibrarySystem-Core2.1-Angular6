"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./shared/guard/auth.guard");
//Components
var component_1 = require("./component");
var routes = [
    {
        path: '',
        loadChildren: './app/account/login/module#LoginModule'
    },
    {
        path: 'login',
        loadChildren: './app/account/login/module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: './app/account/register/module#RegisterModule'
    },
    {
        path: 'backoffice',
        loadChildren: './app/backoffice/module#BackofficeModule',
        canActivate: [auth_guard_1.AuthGuard]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(routes)],
            declarations: [component_1.AppComponent],
            bootstrap: [component_1.AppComponent],
            providers: [platform_browser_1.Title, auth_guard_1.AuthGuard],
            exports: [router_1.RouterModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=module.js.map