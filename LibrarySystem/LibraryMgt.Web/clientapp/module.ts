import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import * as bootstrap from "bootstrap"

//Components
import { AppComponent } from './component';


const routes: Routes = [
    {
        path: '',
        loadChildren: './app/account/login/module#LoginModule'
    },
    {
        path: 'login',
        loadChildren: './app/account/login/module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: './app/account/register/module#RegisterModule'
    },
    {
        path: 'backoffice',
        loadChildren: './app/backoffice/module#BackofficeModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [Title, AuthGuard],
    exports: [RouterModule]
})

export class AppModule {

}