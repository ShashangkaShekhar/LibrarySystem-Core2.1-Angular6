import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service';

@Component({
    selector: 'app-register',
    templateUrl: './app/account/register/component.html',
    providers: [DataService]
})

export class RegisterComponent implements OnInit {
    public userForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public _saveUrl: string = '/api/auth/regusers';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Register");
        this.createForm();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
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
            }, error => {
                //console.log(error);
            });
    }

    reset() {
        this.userForm.setValue({
            firstName: null,
            lastName: null,
            email: null,
            contact: null
        });

        this.resmessage = null;
    }
}
