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
var AuthorsComponent = /** @class */ (function () {
    function AuthorsComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this._getUrl = '/api/author/getall';
        this._getbyIdUrl = '/api/author/getbyid';
        this._saveUrl = '/api/author/save';
        this._deleteUrl = '/api/author/deletebyid';
    }
    AuthorsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Authors");
        this.createForm();
        this.getAll();
    };
    AuthorsComponent.prototype.createForm = function () {
        this.authorForm = this.formBuilder.group({
            id: 0,
            authorName: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    //Pop Modal
    AuthorsComponent.prototype.addNew = function () {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#authorName').focus();
        });
        this.reset();
    };
    //Get All 
    AuthorsComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            //console.log(response)
            _this.authors = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    AuthorsComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.author = response;
            _this.authorForm.setValue({
                id: _this.author.id,
                authorName: _this.author.authorname
            });
            $('#defaultsizemodal').modal('show');
            $("#defaultsizemodal").on('shown.bs.modal', function () {
                $(this).find('#authorName').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    //Create
    AuthorsComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.authorForm.invalid) {
            return;
        }
        //debugger
        this._dataService.save(this.authorForm.value, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    AuthorsComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.authorname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                //console.log(response)
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
    };
    AuthorsComponent.prototype.reset = function () {
        this.authorForm.setValue({
            id: 0,
            authorName: null
        });
        this.resmessage = null;
        $('#authorName').focus();
    };
    AuthorsComponent = __decorate([
        core_1.Component({
            selector: 'ng-authors',
            templateUrl: './app/backoffice/book/authors/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], AuthorsComponent);
    return AuthorsComponent;
}());
exports.AuthorsComponent = AuthorsComponent;
//# sourceMappingURL=component.js.map