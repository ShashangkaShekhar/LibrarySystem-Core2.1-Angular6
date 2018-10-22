import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-return',
    templateUrl: './app/backoffice/circulation/return/component.html',
    providers: [DataService]
})

export class ReturnComponent implements OnInit {
    public returnForm: FormGroup;
    public keypress: number;
    public bookissue: any;
    public bookreturned: any[] = [];
    public bookreturnedlist: any[] = [];
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/circulation/getreturnall';
    public _getbyIdUrl: string = '/api/circulation/getreturnbyid';
    public _saveUrl: string = '/api/circulation/returnbook';

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.keypress = event.keyCode;
        if (this.keypress == 32) {
            this.resmessage = null;
            this.reset();
            this.focus();
        }
    }

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Return");
        this.loadScripts();
        this.createForm();
    }

    public loadScripts() {
        const libScripts = [
            'assets/js/datepicker-init.js'
        ];
        for (let i = 0; i < libScripts.length; i++) {
            const node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    }

    createForm() {
        this.returnForm = this.formBuilder.group({
            id: 0,
            memberSearch: new FormControl(''),
            memberName: new FormControl(''),
            dueDate: new FormControl('')
        });
        this.focus();
    }

    //Search Member
    onChange(e, searchValue) {
        e.preventDefault();
        this._dataService.getbyid(searchValue, this._getbyIdUrl)
            .subscribe(response => {
                if (response != null) {
                    this.bookissue = response;
                    this.bookreturnedlist = response.books;
                    this.returnForm.setValue({
                        id: this.bookissue.id,
                        memberName: this.bookissue.membername,
                        dueDate: this.bookissue.duedate,
                        memberSearch: null
                    });

                }
                else {
                    this.reset();
                }
                this.focus();
                this.resmessage = null;
            }, error => {
                //console.log(error);
            });
    }

    //Create
    onSubmit() {
        if (this.returnForm.invalid) {
            return;
        }

        if (this.returnForm.value.id > 0) {
            this._dataService.save(this.returnForm.value, this._saveUrl)
                .subscribe(response => {
                    this.resmessage = response.message;
                    this.alertmessage = "alert-outline-info";
                    this.reset();
                    this.focus();
                }, error => {
                    //console.log(error);
                });
        }
    }

    //Pop Modal
    returnedList() {
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.bookreturned = response;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Close Modal
    returnedListclose() {
        this.focus();
    }

    //Reset Form
    reset() {
        this.returnForm.setValue({
            id: 0,
            memberSearch: null,
            memberName: null,
            dueDate: null
        });
        this.bookreturnedlist = [];
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
