"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var BackofficeComponent = /** @class */ (function () {
    function BackofficeComponent(router) {
        this.router = router;
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.displayname;
        this.loggedemail = loggedUser.email;
        this.loggedUsertype = loggedUser.usertype;
    }
    BackofficeComponent.prototype.ngOnInit = function () {
        this.loadScripts();
    };
    BackofficeComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/plugins/simplebar/js/simplebar.js',
            'assets/js/waves.js',
            'assets/js/sidebar-menu.js',
            'assets/js/app-script.js',
            'assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js',
            'assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js',
            'assets/plugins/sparkline-charts/jquery.sparkline.min.js',
            'assets/plugins/Chart.js/Chart.min.js',
            'assets/plugins/notifications/js/lobibox.min.js',
            'assets/plugins/notifications/js/notifications.min.js',
            'assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js'
        ];
        for (var i = 0; i < libScripts.length; i++) {
            var node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    };
    BackofficeComponent.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/login']);
    };
    BackofficeComponent = __decorate([
        core_1.Component({
            selector: 'ng-backoffice',
            templateUrl: './app/backoffice/component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], BackofficeComponent);
    return BackofficeComponent;
}());
exports.BackofficeComponent = BackofficeComponent;
//# sourceMappingURL=component.js.map