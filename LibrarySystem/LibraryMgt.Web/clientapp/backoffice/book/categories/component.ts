import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-categories',
    templateUrl: './app/backoffice/book/categories/component.html',
    providers: [DataService]
})
export class CategoriesComponent implements OnInit {
    public categories: any[];
    public category: any;
    public categForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/category/getall';
    public _getbyIdUrl: string = '/api/category/getbyid';
    public _saveUrl: string = '/api/category/save';
    public _deleteUrl: string = '/api/category/deletebyid';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Categories");
        this.loadScripts();
        this.createForm();
        this.getAll();
    }

    public loadScripts() {
        const libScripts = [
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
        this.categForm = this.formBuilder.group({
            id: 0,
            categoryName: new FormControl('', Validators.required)
        });
    }

    //Pop Modal
    addNew() {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#categoryName').focus();
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
                    this.categories = response;
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
                this.category = response;
                this.categForm.setValue({
                    id: this.category.id,
                    categoryName: this.category.categoryname
                });

                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#categoryName').focus();
                });
            }, error => {
                console.log(error);
            });
    }

    //Create
    onSubmit() {

        if (this.categForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.categForm.value, this._saveUrl)
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
        var IsConf = confirm('You are about to delete ' + m.categoryname + '. Are you sure?');
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
        this.categForm.setValue({
            id: 0,
            categoryName: null
        });

        this.resmessage = null;

        $('#categoryName').focus();
    }
}
