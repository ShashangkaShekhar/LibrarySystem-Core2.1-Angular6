"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var angular_highcharts_1 = require("angular-highcharts");
var service_1 = require("../../../shared/service");
var BookReportsComponent = /** @class */ (function () {
    function BookReportsComponent(router, titleService, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this._dataService = _dataService;
        this.bookreturned = [];
        this.bookissued = [];
        this._getUrl = '/api/report/getbookchart';
        this._getRUrl = '/api/circulation/getreturnall';
        this._getIUrl = '/api/circulation/getissueall';
    }
    BookReportsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Book Reports");
        this.getChart();
        this.returnedList();
    };
    //Get Chart 
    BookReportsComponent.prototype.getChart = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getUrl).subscribe(function (response) {
            _this.bchart = response;
            var chartData = [];
            for (var i = 0; i < _this.bchart.length; i++) {
                chartData.push({
                    "name": _this.bchart[i].bname,
                    "y": _this.bchart[i].nissue,
                    sliced: true,
                    selected: true
                });
            }
            _this.chart = new angular_highcharts_1.Chart({
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
        }, function (error) {
            //console.log(error);
        });
    };
    //Issue/Return
    BookReportsComponent.prototype.returnedList = function () {
        var _this = this;
        this._dataService.getall(this._getRUrl)
            .subscribe(function (response) {
            _this.bookreturned = response;
        }, function (error) {
            //console.log(error);
        });
        this._dataService.getall(this._getIUrl)
            .subscribe(function (response) {
            _this.bookissued = response;
        }, function (error) {
            //console.log(error);
        });
    };
    BookReportsComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './app/backoffice/reports/book/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            service_1.DataService])
    ], BookReportsComponent);
    return BookReportsComponent;
}());
exports.BookReportsComponent = BookReportsComponent;
//# sourceMappingURL=component.js.map