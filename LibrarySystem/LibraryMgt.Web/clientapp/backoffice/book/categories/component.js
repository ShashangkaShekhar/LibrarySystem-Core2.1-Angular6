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
var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this._getUrl = '/api/category/getall';
        this._getbyIdUrl = '/api/category/getbyid';
        this._saveUrl = '/api/category/save';
        this._deleteUrl = '/api/category/deletebyid';
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Categories");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    CategoriesComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/plugins/bootstrap-datatable/js/jquery.dataTables.min.js',
            'assets/plugins/bootstrap-datatable/js/dataTables.bootstrap4.min.js',
            'assets/plugins/bootstrap-datatable/js/dataTables.buttons.min.js',
            'assets/plugins/bootstrap-datatable/js/buttons.bootstrap4.min.js',
            'assets/plugins/bootstrap-datatable/js/jszip.min.js',
            'assets/plugins/bootstrap-datatable/js/pdfmake.min.js',
            'assets/plugins/bootstrap-datatable/js/vfs_fonts.js',
            'assets/plugins/bootstrap-datatable/js/buttons.html5.min.js',
            'assets/plugins/bootstrap-datatable/js/buttons.print.min.js',
            'assets/plugins/bootstrap-datatable/js/buttons.colVis.min.js'
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
    CategoriesComponent.prototype.createForm = function () {
        this.categForm = this.formBuilder.group({
            id: 0,
            categoryName: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    //Pop Modal
    CategoriesComponent.prototype.addNew = function () {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#categoryName').focus();
        });
        this.reset();
    };
    //Get All 
    CategoriesComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            //console.log(response)
            _this.categories = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    CategoriesComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.category = response;
            _this.categForm.setValue({
                id: _this.category.id,
                categoryName: _this.category.categoryname
            });
            $('#defaultsizemodal').modal('show');
            $("#defaultsizemodal").on('shown.bs.modal', function () {
                $(this).find('#categoryName').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    //Create
    CategoriesComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.categForm.invalid) {
            return;
        }
        //debugger
        this._dataService.save(this.categForm.value, this._saveUrl)
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
    CategoriesComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.categoryname + '. Are you sure?');
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
    CategoriesComponent.prototype.reset = function () {
        this.categForm.setValue({
            id: 0,
            categoryName: null
        });
        this.resmessage = null;
        $('#categoryName').focus();
    };
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'ng-categories',
            templateUrl: './app/backoffice/book/categories/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
//# sourceMappingURL=component.js.map