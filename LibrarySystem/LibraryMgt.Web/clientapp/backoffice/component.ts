import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ng-backoffice',
    templateUrl: './app/backoffice/component.html'
})
export class BackofficeComponent implements OnInit {
    public loggedUsername: string;
    public loggedUsertype: number;
    public loggedemail: string;

    constructor(
        private router: Router) {
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.displayname;
        this.loggedemail = loggedUser.email;
        this.loggedUsertype = loggedUser.usertype;
    }

    ngOnInit() {
        this.loadScripts();
    }

    public loadScripts() {
        const libScripts = [
            'assets/plugins/simplebar/js/simplebar.js',
            'assets/js/waves.js',
            'assets/js/sidebar-menu.js',
            'assets/js/app-script.js',
            'assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js',
            'assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js',
            'assets/plugins/sparkline-charts/jquery.sparkline.min.js',
            'assets/plugins/Chart.js/Chart.min.js',
            'assets/plugins/notifications/js/lobibox.min.js',
            'assets/plugins/notifications/js/notifications.min.js',
            'assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js'
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

    logout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/login']);
    }
}
