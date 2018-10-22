import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-books',
    templateUrl: './app/backoffice/book/books/component.html',
    providers: [DataService]
})
export class BooksComponent implements OnInit {
    public loading: boolean = false;
    public books: any[];
    public book: any;
    public authors: any[];
    public categories: any[];
    public bookForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public imageUrl: any;

    public _getUrl: string = '/api/book/getall';
    public _getbyIdUrl: string = '/api/book/getbyid';
    public _saveUrl: string = '/api/book/save';
    public _deleteUrl: string = '/api/book/deletebyid';

    public _getauthorUrl: string = '/api/dropdown/getallauthor';
    public _getcategoryUrl: string = '/api/dropdown/getallcategory';

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private _http: Http,
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Books");
        this.createForm();
        this.getAll();
    }

    createForm() {
        this.bookForm = this.formBuilder.group({
            id: 0,
            bookName: new FormControl('', Validators.required),
            authorId: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            description: new FormControl(''),
            fileupload: null
        });
    }

    //Pop Modal
    addNew() {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#bookName').focus();
        });

        this.reset();
        this.getauthor();
        this.getcategory();
    }

    //Get Book 
    getAll() {
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.books = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this.getauthor();
        this.getcategory();

        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                //console.log(response);
                this.book = response;
                this.bookForm.setValue({
                    id: this.book.id,
                    bookName: this.book.bookname,
                    authorId: this.book.authorid,
                    category: this.book.category,
                    description: this.book.description,
                    fileupload: this.book.coverimage
                });

                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#bookName').focus();
                });
            }, error => {
                console.log(error);
            });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.bookForm.get('fileupload').setValue(file);
        }
    }

    //Create
    onSubmit() {

        if (this.bookForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.bookForm.value.id);
        formModel.append('bookName', this.bookForm.value.bookName);
        formModel.append('authorId', this.bookForm.value.authorId);
        formModel.append('category', this.bookForm.value.category);
        formModel.append('description', this.bookForm.value.description);
        formModel.append('fileupload', this.bookForm.value.fileupload);

        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
            .subscribe(response => {
                //console.log(response);
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
            }, error => {
                console.log(error);
            });
    }


    //Delete
    delete(e, m) {
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.bookname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(response => {
                    //console.log(response)
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    console.log(error);
                });
        }
    }

    //Get Author 
    getauthor() {
        //debugger
        this._dataService.getall(this._getauthorUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.authors = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get Category 
    getcategory() {
        //debugger
        this._dataService.getall(this._getcategoryUrl)
            .subscribe(
                response => {
                    console.log(response)
                    this.categories = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    reset() {
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
    }

    //clearFile() {
    //    this.bookForm.get('fileupload').setValue(null);
    //    this.fileInput.nativeElement.value = '';
    //}
}
