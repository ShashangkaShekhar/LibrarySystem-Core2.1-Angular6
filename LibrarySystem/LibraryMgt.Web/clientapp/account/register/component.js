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
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this._saveUrl = '/api/auth/regusers';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Register");
        this.createForm();
    };
    RegisterComponent.prototype.createForm = function () {
        this.userForm = this.formBuilder.group({
            firstName: new forms_1.FormControl('', forms_1.Validators.required),
            lastName: new forms_1.FormControl('', forms_1.Validators.required),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            contact: new forms_1.FormControl('', forms_1.Validators.required)
        });
        $("#firstName").focus();
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.userForm.invalid) {
            return;
        }
        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
        }, function (error) {
            //console.log(error);
        });
    };
    RegisterComponent.prototype.reset = function () {
        this.userForm.setValue({
            firstName: null,
            lastName: null,
            email: null,
            contact: null
        });
        this.resmessage = null;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './app/account/register/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=component.js.map