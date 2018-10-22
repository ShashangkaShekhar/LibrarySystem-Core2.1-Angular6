
$(function () {
    "use strict";
    
Morris.Area({
        element: 'morris-chart-1',
        data: [{
            period: '2010',
            iphone: 50,
            ipad: 80,
            itouch: 20
        }, {
            period: '2011',
            iphone: 130,
            ipad: 100,
            itouch: 80
        }, {
            period: '2012',
            iphone: 80,
            ipad: 60,
            itouch: 70
        }, {
            period: '2013',
            iphone: 70,
            ipad: 200,
            itouch: 140
        }, {
            period: '2014',
            iphone: 180,
            ipad: 150,
            itouch: 140
        }, {
            period: '2015',
            iphone: 105,
            ipad: 100,
            itouch: 80
        },
         {
            period: '2016',
            iphone: 250,
            ipad: 150,
            itouch: 200
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors:['#008cff', '#15ca20', '#fd3550'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 3,
        hideHover: 'auto',
        lineColors: ['#008cff', '#15ca20', '#fd3550'],
        resize: true
        
    });
 // Morris donut chart
        
    Morris.Donut({
        element: 'morris-chart-2',
        data: [{
            label: "Download Sales",
            value: 15,

        }, {
            label: "In Store Sales",
            value: 30
        }, {
            label: "Mail Order Sales",
            value: 20
        }],
        resize: true,
        colors:['#008cff', '#15ca20', '#fd3550']
    });

// Morris bar chart
    Morris.Bar({
        element: 'morris-chart-3',
        data: [{
            y: '2006',
            a: 100,
            b: 90,
            c: 60
        }, {
            y: '2007',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2008',
            a: 50,
            b: 40,
            c: 30
        }, {
            y: '2009',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2010',
            a: 50,
            b: 40,
            c: 30
        }, {
            y: '2011',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2012',
            a: 100,
            b: 90,
            c: 40
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['A', 'B', 'C'],
        barColors:['#008cff', '#15ca20', '#75808a'],
        hideHover: 'auto',
        gridLineColor: '#eef0f2',
        resize: true
    });
    
// Extra chart
 Morris.Area({
        element: 'morris-chart-4',
        data: [{
                    period: '2010',
                    iphone: 0,
                    ipad: 0,
                    itouch: 0
                }, {
                    period: '2011',
                    iphone: 100,
                    ipad: 15,
                    itouch: 5
                }, {
                    period: '2012',
                    iphone: 20,
                    ipad: 150,
                    itouch: 65
                }, {
                    period: '2013',
                    iphone: 120,
                    ipad: 12,
                    itouch: 7
                }, {
                    period: '2014',
                    iphone: 30,
                    ipad: 20,
                    itouch: 120
                }, {
                    period: '2015',
                    iphone: 25,
                    ipad: 80,
                    itouch: 40
                }, {
                    period: '2016',
                    iphone: 10,
                    ipad: 10,
                    itouch: 10
                }


                ],
                lineColors: ['#008cff', '#15ca20', '#fd3550'],
                xkey: 'period',
                ykeys: ['iphone', 'ipad', 'itouch'],
                labels: ['Site A', 'Site B', 'Site C'],
                pointSize: 0,
                lineWidth: 0,
                resize:true,
                fillOpacity: 0.7,
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                hideHover: 'auto'
        
    });
 });    