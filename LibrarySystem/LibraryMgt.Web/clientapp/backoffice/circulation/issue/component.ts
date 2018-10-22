import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-issue',
    templateUrl: './app/backoffice/circulation/issue/component.html',
    providers: [DataService]
})

export class IssueComponent implements OnInit {
    public issueForm: FormGroup;
    public keypress: number;
    public searchTerm: any;
    public bookissue: any;
    public booklist: any[] = [];
    public bookchoosed: any[] = [];
    public bookissueed: any[] = [];
    public bookissueedlist: any[] = [];
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/circulation/getissueall';
    public _getbyIdUrl: string = '/api/circulation/getissuebyid';
    public _saveUrl: string = '/api/circulation/issuebook';
    public _getbookUrl: string = '/api/circulation/getallbook';

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
        this.titleService.setTitle("Library System | issue");
        this.loadScripts();
        this.createForm();
        this.bookList();
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
        this.issueForm = this.formBuilder.group({
            id: 0,
            memberId: 0,
            memberSearch: new FormControl(''),
            memberName: new FormControl(''),
            email: new FormControl(''),
            dueDate: new FormControl(''),
            books: []
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
                    this.bookissueedlist = response.books;
                    this.issueForm.setValue({
                        id: 0,
                        memberId: this.bookissue.memberid,
                        memberName: this.bookissue.membername,
                        email: this.bookissue.email,
                        dueDate: this.bookissue.duedate,
                        memberSearch: null,
                        books: []
                    });

                }
                else {
                    this.reset();
                }
                //this.focus();
                this.resmessage = null;
            }, error => {
                //console.log(error);
            });
    }

    //Search
    onSearch(): void {
        let term = this.searchTerm;
        this.booklist = this.booklist.filter(function (tag) {
            return tag.bookname.indexOf(term) >= 0;
        });
    }

    //Get Choosed Book
    oncheckChange(e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.bookchoosed.push({
                id: i
            });
        }
    }

    //Create
    onSubmit() {
        this.issueForm.patchValue({
            books: this.bookchoosed
        });

        if (this.issueForm.invalid) {
            return;
        }

        if (this.issueForm.value.memberId > 0) {
            this._dataService.save(this.issueForm.value, this._saveUrl)
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

    //Booklist to choose
    bookList() {
        this._dataService.getall(this._getbookUrl)
            .subscribe(
                response => {
                    this.booklist = response;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Pop Modal
    issueedList() {
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.bookissueed = response;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Close Modal
    issueedListclose() {
        this.focus();
    }

    //Reset Form
    reset() {
        this.issueForm.setValue({
            id: 0,
            memberId: 0,
            memberSearch: null,
            memberName: null,
            email: null,
            dueDate: null,
            books: []
        });
        this.bookissueedlist = [];
        this.bookList();
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
