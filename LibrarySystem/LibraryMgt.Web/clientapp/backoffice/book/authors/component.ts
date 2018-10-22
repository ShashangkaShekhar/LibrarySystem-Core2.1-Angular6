import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-authors',
    templateUrl: './app/backoffice/book/authors/component.html',
    providers: [DataService]
})

export class AuthorsComponent implements OnInit {
    public authors: any[];
    public author: any;
    public authorForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/author/getall';
    public _getbyIdUrl: string = '/api/author/getbyid';
    public _saveUrl: string = '/api/author/save';
    public _deleteUrl: string = '/api/author/deletebyid';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Authors");
        this.createForm();
        this.getAll();
    }

    createForm() {
        this.authorForm = this.formBuilder.group({
            id: 0,
            authorName: new FormControl('', Validators.required)
        });
    }

    //Pop Modal
    addNew() {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#authorName').focus();
        });

        this.reset();
    }

    //Get All 
    getAll() {
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.authors = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                //console.log(response);
                this.author = response;
                this.authorForm.setValue({
                    id: this.author.id,
                    authorName: this.author.authorname
                });

                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#authorName').focus();
                });
            }, error => {
                console.log(error);
            });
    }

    //Create
    onSubmit() {

        if (this.authorForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.authorForm.value, this._saveUrl)
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
        var IsConf = confirm('You are about to delete ' + m.authorname + '. Are you sure?');
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

    reset() {
        this.authorForm.setValue({
            id: 0,
            authorName: null
        });

        this.resmessage = null;
        $('#authorName').focus();
    }
}
