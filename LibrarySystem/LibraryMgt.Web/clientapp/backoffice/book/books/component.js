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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../../shared/service");
var BooksComponent = /** @class */ (function () {
    function BooksComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/book/getall';
        this._getbyIdUrl = '/api/book/getbyid';
        this._saveUrl = '/api/book/save';
        this._deleteUrl = '/api/book/deletebyid';
        this._getauthorUrl = '/api/dropdown/getallauthor';
        this._getcategoryUrl = '/api/dropdown/getallcategory';
    }
    BooksComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Books");
        this.createForm();
        this.getAll();
    };
    BooksComponent.prototype.createForm = function () {
        this.bookForm = this.formBuilder.group({
            id: 0,
            bookName: new forms_1.FormControl('', forms_1.Validators.required),
            authorId: new forms_1.FormControl('', forms_1.Validators.required),
            category: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl(''),
            fileupload: null
        });
    };
    //Pop Modal
    BooksComponent.prototype.addNew = function () {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#bookName').focus();
        });
        this.reset();
        this.getauthor();
        this.getcategory();
    };
    //Get Book 
    BooksComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            //console.log(response)
            _this.books = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    BooksComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        this.getauthor();
        this.getcategory();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.book = response;
            _this.bookForm.setValue({
                id: _this.book.id,
                bookName: _this.book.bookname,
                authorId: _this.book.authorid,
                category: _this.book.category,
                description: _this.book.description,
                fileupload: _this.book.coverimage
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#bookName').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    BooksComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            this.bookForm.get('fileupload').setValue(file);
        }
    };
    //Create
    BooksComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.bookForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.bookForm.value.id);
        formModel.append('bookName', this.bookForm.value.bookName);
        formModel.append('authorId', this.bookForm.value.authorId);
        formModel.append('category', this.bookForm.value.category);
        formModel.append('description', this.bookForm.value.description);
        formModel.append('fileupload', this.bookForm.value.fileupload);
        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
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
    BooksComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.bookname + '. Are you sure?');
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
    //Get Author 
    BooksComponent.prototype.getauthor = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getauthorUrl)
            .subscribe(function (response) {
            //console.log(response)
            _this.authors = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get Category 
    BooksComponent.prototype.getcategory = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getcategoryUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.categories = response;
        }, function (error) {
            console.log(error);
        });
    };
    BooksComponent.prototype.reset = function () {
        this.bookForm.setValue({
            id: 0,
            bookName: null,
            authorId: '',
            category: '',
            description: null,
            fileupload: null
        });
        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#bookName').focus();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], BooksComponent.prototype, "fileInput", void 0);
    BooksComponent = __decorate([
        core_1.Component({
            selector: 'ng-books',
            templateUrl: './app/backoffice/book/books/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], BooksComponent);
    return BooksComponent;
}());
exports.BooksComponent = BooksComponent;
//# sourceMappingURL=component.js.map