import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';
import { DataService } from '../../shared/service';

@Component({
    selector: 'ng-dashboard',
    templateUrl: './app/backoffice/dashboard/component.html',
    providers: [DataService]
})
export class DashboardComponent implements OnInit {
    public bkchart: Chart;
    public mkchart: Chart;

    public bchart: any[];
    public mchart: any[];
    public summaryTotal: any;
    public totalBook: number = 0;
    public totalMember: number = 0;
    public totalIssued: number = 0;
    public totalReturned: number = 0;

    private _getBUrl: string = '/api/report/getbookchart';
    private _getMUrl: string = '/api/report/getmemberchart';
    private _getSUrl: string = '/api/dashboard/getallsummary';

    constructor(
        private router: Router,
        private titleService: Title,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Dashboard");
        //this.loadScripts();
        this.getSummary();
        this.getBookChart();
        this.getMemberChart();
    }

    public loadScripts() {
        const libScripts = [
            'assets/js/index.js'
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

    //Get Summary 
    getSummary() {
        //debugger
        this._dataService.getall(this._getSUrl)
            .subscribe(
                response => {
                    //console.log(response);
                    this.summaryTotal = response;
                    this.totalBook = this.summaryTotal.totalBook;
                    this.totalMember = this.summaryTotal.totalMember;
                    this.totalIssued = this.summaryTotal.totalIssued;
                    this.totalReturned = this.summaryTotal.totalReturned;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Get BookChart 
    getBookChart() {

        //debugger
        this._dataService.getall(this._getBUrl).subscribe(
            response => {
                this.bchart = response;
                let chartData = [];
                for (var i = 0; i < this.bchart.length; i++) {
                    chartData.push({
                        "name": this.bchart[i].bname,
                        "y": this.bchart[i].nissue,
                        sliced: true,
                        selected: true
                    })
                }

                this.bkchart = new Chart({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: null,
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Book Issued',
                    },
                    subtitle: {
                        text: 'Issued Pie-Chart!'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Total Issued',
                        data: chartData
                    }]
                });

            }, error => {
                //console.log(error);
            }
        );
    }

    //Get MemberChart 
    getMemberChart() {

        //debugger
        this._dataService.getall(this._getMUrl).subscribe(
            response => {
                this.mchart = response;
                let chartData = [];
                for (var i = 0; i < this.mchart.length; i++) {
                    chartData.push({
                        "name": this.mchart[i].mname,
                        "y": this.mchart[i].ntrans,
                        sliced: true,
                        selected: true
                    })
                }

                this.mkchart = new Chart({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: null,
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Member Performance',
                    },
                    subtitle: {
                        text: 'Reading Pie-Chart!'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Total Reading',
                        data: chartData
                    }]
                });

            }, error => {
                //console.log(error);
            }
        );
    }
}
