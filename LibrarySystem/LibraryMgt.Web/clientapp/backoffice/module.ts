import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular-highcharts';
import { AccessPermission } from '../shared/guard/access.guard';

//Components
import { BackofficeComponent } from './component';
import { DashboardComponent } from './dashboard/component';
import { BooksComponent } from './book/books/component';
import { AuthorsComponent } from './book/authors/component';
import { IssueComponent } from './circulation/issue/component';
import { ReturnComponent } from './circulation/return/component';
import { CategoriesComponent } from './book/categories/component';
import { UsersComponent } from './system/users/component';
import { BookReportsComponent } from './reports/book/component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },

            { path: 'book/books', component: BooksComponent },
            { path: 'book/authors', component: AuthorsComponent },
            { path: 'book/categories', component: CategoriesComponent },

            { path: 'circulation/issue', component: IssueComponent },
            { path: 'circulation/return', component: ReturnComponent },

            { path: 'system/users', component: UsersComponent, canActivate: [AccessPermission] },

            { path: 'reports/book', component: BookReportsComponent }
        ]
    }
];

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), ChartModule],
    declarations: [
        BackofficeComponent,
        DashboardComponent,
        BooksComponent,
        AuthorsComponent,
        IssueComponent,
        ReturnComponent,
        CategoriesComponent,
        UsersComponent,
        BookReportsComponent
    ],
    providers: [AccessPermission],
    bootstrap: [BackofficeComponent]
})

export class BackofficeModule { }