"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_highcharts_1 = require("angular-highcharts");
var access_guard_1 = require("../shared/guard/access.guard");
//Components
var component_1 = require("./component");
var component_2 = require("./dashboard/component");
var component_3 = require("./book/books/component");
var component_4 = require("./book/authors/component");
var component_5 = require("./circulation/issue/component");
var component_6 = require("./circulation/return/component");
var component_7 = require("./book/categories/component");
var component_8 = require("./system/users/component");
var component_9 = require("./reports/book/component");
var routes = [
    {
        path: '',
        component: component_1.BackofficeComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: component_2.DashboardComponent },
            { path: 'book/books', component: component_3.BooksComponent },
            { path: 'book/authors', component: component_4.AuthorsComponent },
            { path: 'book/categories', component: component_7.CategoriesComponent },
            { path: 'circulation/issue', component: component_5.IssueComponent },
            { path: 'circulation/return', component: component_6.ReturnComponent },
            { path: 'system/users', component: component_8.UsersComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'reports/book', component: component_9.BookReportsComponent }
        ]
    }
];
var BackofficeModule = /** @class */ (function () {
    function BackofficeModule() {
    }
    BackofficeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule.forChild(routes), angular_highcharts_1.ChartModule],
            declarations: [
                component_1.BackofficeComponent,
                component_2.DashboardComponent,
                component_3.BooksComponent,
                component_4.AuthorsComponent,
                component_5.IssueComponent,
                component_6.ReturnComponent,
                component_7.CategoriesComponent,
                component_8.UsersComponent,
                component_9.BookReportsComponent
            ],
            providers: [access_guard_1.AccessPermission],
            bootstrap: [component_1.BackofficeComponent]
        })
    ], BackofficeModule);
    return BackofficeModule;
}());
exports.BackofficeModule = BackofficeModule;
//# sourceMappingURL=module.js.map