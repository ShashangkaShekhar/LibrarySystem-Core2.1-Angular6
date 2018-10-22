import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'chart',
    templateUrl: './app/backoffice/reports/book/component.html',
    providers: [DataService]
})
export class BookReportsComponent implements OnInit {
    public chart: Chart;
    public bchart: any[];
    public bookreturned: any[] = [];
    public bookissued: any[] = [];

    public _getUrl: string = '/api/report/getbookchart';
    public _getRUrl: string = '/api/circulation/getreturnall';
    public _getIUrl: string = '/api/circulation/getissueall';

    constructor(
        private router: Router,
        private titleService: Title,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Library System | Book Reports");
        this.getChart();
        this.returnedList();
    }

    //Get Chart 
    getChart() {

        //debugger
        this._dataService.getall(this._getUrl).subscribe(
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

                this.chart = new Chart({
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

    //Issue/Return
    returnedList() {
        this._dataService.getall(this._getRUrl)
            .subscribe(
                response => {
                    this.bookreturned = response;
                }, error => {
                    //console.log(error);
                }
            );

        this._dataService.getall(this._getIUrl)
            .subscribe(
                response => {
                    this.bookissued = response;
                }, error => {
                    //console.log(error);
                }
            );
    }

}
