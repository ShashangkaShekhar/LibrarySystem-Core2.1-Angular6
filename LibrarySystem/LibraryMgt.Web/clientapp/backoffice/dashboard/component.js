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
var service_1 = require("../../shared/service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, titleService, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this._dataService = _dataService;
        this.totalBook = 0;
        this.totalMember = 0;
        this.totalIssued = 0;
        this.totalReturned = 0;
        this._getBUrl = '/api/report/getbookchart';
        this._getMUrl = '/api/report/getmemberchart';
        this._getSUrl = '/api/dashboard/getallsummary';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Library System | Dashboard");
        //this.loadScripts();
        this.getSummary();
        this.getBookChart();
        this.getMemberChart();
    };
    DashboardComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/js/index.js'
        ];
        for (var i = 0; i < libScripts.length; i++) {
            var node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    };
    //Get Summary 
    DashboardComponent.prototype.getSummary = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getSUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.summaryTotal = response;
            _this.totalBook = _this.summaryTotal.totalBook;
            _this.totalMember = _this.summaryTotal.totalMember;
            _this.totalIssued = _this.summaryTotal.totalIssued;
            _this.totalReturned = _this.summaryTotal.totalReturned;
        }, function (error) {
            //console.log(error);
        });
    };
    //Get BookChart 
    DashboardComponent.prototype.getBookChart = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getBUrl).subscribe(function (response) {
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
            _this.bkchart = new angular_highcharts_1.Chart({
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
    //Get MemberChart 
    DashboardComponent.prototype.getMemberChart = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getMUrl).subscribe(function (response) {
            _this.mchart = response;
            var chartData = [];
            for (var i = 0; i < _this.mchart.length; i++) {
                chartData.push({
                    "name": _this.mchart[i].mname,
                    "y": _this.mchart[i].ntrans,
                    sliced: true,
                    selected: true
                });
            }
            _this.mkchart = new angular_highcharts_1.Chart({
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
        }, function (error) {
            //console.log(error);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'ng-dashboard',
            templateUrl: './app/backoffice/dashboard/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            service_1.DataService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=component.js.map