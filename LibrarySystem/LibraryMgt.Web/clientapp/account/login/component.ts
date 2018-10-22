import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service';

@Component({
    selector: 'app-login',
    templateUrl: './app/account/login/component.html',
    providers: [DataService]
})

export class LoginComponent implements OnInit {
    public userForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public _saveUrl: string = '/api/auth/loginusers';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        if (localStorage.getItem('isLoggedin')) {
            this.router.navigate(['/backoffice']);
        }
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Login");
        this.createForm();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            userName: new FormControl('', Validators.required),
            userPass: new FormControl('', Validators.required)
        });

        $("#userName").focus();
    }

    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(response => {
                //console.log(response);
                var loggeduser = response.loggeduser;
                if (loggeduser != null) {
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('loggedUser', JSON.stringify(loggeduser));
                    this.router.navigate(['/backoffice']);
                }
                else {
                    this.resmessage = "Login Faild";
                    this.alertmessage = "alert-outline-danger";
                }
            }, error => {
                //console.log(error);
            });
    }

    reset() {
        this.userForm.setValue({
            userName: null,
            userPass: null
        });

        this.resmessage = null;
    }
}
