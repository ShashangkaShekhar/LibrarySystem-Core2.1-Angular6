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
var service_1 = require("../../../shared/service");
var ReturnComponent = /** @class */ (function () {
    function ReturnComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.bookreturned = [];
        this.bookreturnedlist = [];
        this._getUrl = '/api/circulation/getreturnall';
        this._getbyIdUrl = '/api/circulation/getreturnbyid';
        this._saveUrl = '/api/circulation/returnbook';
    }
    ReturnComponent.prototype.handleKeyboardEvent = function (event) {
        this.keypress = event.keyCode;
        if (this.keypress == 32) {
            this.resmessage = null;
            this.reset();
            this.focus();
        }
    };
    ReturnComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Return");
        this.loadScripts();
        this.createForm();
    };
    ReturnComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/js/datepicker-init.js'
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
    ReturnComponent.prototype.createForm = function () {
        this.returnForm = this.formBuilder.group({
            id: 0,
            memberSearch: new forms_1.FormControl(''),
            memberName: new forms_1.FormControl(''),
            dueDate: new forms_1.FormControl('')
        });
        this.focus();
    };
    //Search Member
    ReturnComponent.prototype.onChange = function (e, searchValue) {
        var _this = this;
        e.preventDefault();
        this._dataService.getbyid(searchValue, this._getbyIdUrl)
            .subscribe(function (response) {
            if (response != null) {
                _this.bookissue = response;
                _this.bookreturnedlist = response.books;
                _this.returnForm.setValue({
                    id: _this.bookissue.id,
                    memberName: _this.bookissue.membername,
                    dueDate: _this.bookissue.duedate,
                    memberSearch: null
                });
            }
            else {
                _this.reset();
            }
            _this.focus();
            _this.resmessage = null;
        }, function (error) {
            //console.log(error);
        });
    };
    //Create
    ReturnComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.returnForm.invalid) {
            return;
        }
        if (this.returnForm.value.id > 0) {
            this._dataService.save(this.returnForm.value, this._saveUrl)
                .subscribe(function (response) {
                _this.resmessage = response.message;
                _this.alertmessage = "alert-outline-info";
                _this.reset();
                _this.focus();
            }, function (error) {
                //console.log(error);
            });
        }
    };
    //Pop Modal
    ReturnComponent.prototype.returnedList = function () {
        var _this = this;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.bookreturned = response;
        }, function (error) {
            //console.log(error);
        });
    };
    //Close Modal
    ReturnComponent.prototype.returnedListclose = function () {
        this.focus();
    };
    //Reset Form
    ReturnComponent.prototype.reset = function () {
        this.returnForm.setValue({
            id: 0,
            memberSearch: null,
            memberName: null,
            dueDate: null
        });
        this.bookreturnedlist = [];
    };
    //Focus input
    ReturnComponent.prototype.focus = function () {
        $("#memberSearch").focus();
    };
    __decorate([
        core_1.HostListener('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ReturnComponent.prototype, "handleKeyboardEvent", null);
    ReturnComponent = __decorate([
        core_1.Component({
            selector: 'ng-return',
            templateUrl: './app/backoffice/circulation/return/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], ReturnComponent);
    return ReturnComponent;
}());
exports.ReturnComponent = ReturnComponent;
//# sourceMappingURL=component.js.map