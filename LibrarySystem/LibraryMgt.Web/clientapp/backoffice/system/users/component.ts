import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-users',
    templateUrl: './app/backoffice/system/users/component.html',
    providers: [DataService]
})
export class UsersComponent implements OnInit {
    public userForm: FormGroup;
    public users: any[];
    public user: any;
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/users/getall';
    public _getbyIdUrl: string = '/api/users/getbyid';
    public _saveUrl: string = '/api/users/save';
    public _deleteUrl: string = '/api/users/deletebyid';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Users");
        this.createForm();
        this.getAll();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            id: 0,
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            contact: new FormControl('', Validators.required)
        });

        $("#firstName").focus();
    }

    //Pop Modal
    addNew() {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#firstName').focus();
        });

        this.reset();
    }

    //Get All User
    getAll() {
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.users = response;
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
                this.user = response;
                this.userForm.setValue({
                    id: this.user.id,
                    firstName: this.user.firstname,
                    lastName: this.user.lastname,
                    email: this.user.email,
                    contact: this.user.contact
                });

                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#firstName').focus();
                });
            }, error => {
                //console.log(error);
            });
    }

    //Create
    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(response => {
                //console.log(response);
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
            }, error => {
                //console.log(error);
            });
    }

    //Delete
    delete(e, m) {
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(response => {
                    //console.log(response)
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    //console.log(error);
                });
        }
    }

    reset() {
        this.userForm.setValue({
            id: 0,
            firstName: null,
            lastName: null,
            email: null,
            contact: null
        });

        this.resmessage = null;

        $('#firstName').focus();
    }
}
