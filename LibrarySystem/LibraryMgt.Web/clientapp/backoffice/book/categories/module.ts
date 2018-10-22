import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { CategoriesComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    }
];

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [CategoriesComponent]
})

export class CategoriesModule { }