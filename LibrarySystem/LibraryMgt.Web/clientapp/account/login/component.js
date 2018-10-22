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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../shared/service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this._saveUrl = '/api/auth/loginusers';
        if (localStorage.getItem('isLoggedin')) {
            this.router.navigate(['/backoffice']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Login");
        this.createForm();
    };
    LoginComponent.prototype.createForm = function () {
        this.userForm = this.formBuilder.group({
            userName: new forms_1.FormControl('', forms_1.Validators.required),
            userPass: new forms_1.FormControl('', forms_1.Validators.required)
        });
        $("#userName").focus();
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.userForm.invalid) {
            return;
        }
        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            var loggeduser = response.loggeduser;
            if (loggeduser != null) {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('loggedUser', JSON.stringify(loggeduser));
                _this.router.navigate(['/backoffice']);
            }
            else {
                _this.resmessage = "Login Faild";
                _this.alertmessage = "alert-outline-danger";
            }
        }, function (error) {
            //console.log(error);
        });
    };
    LoginComponent.prototype.reset = function () {
        this.userForm.setValue({
            userName: null,
            userPass: null
        });
        this.resmessage = null;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './app/account/login/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=component.js.map