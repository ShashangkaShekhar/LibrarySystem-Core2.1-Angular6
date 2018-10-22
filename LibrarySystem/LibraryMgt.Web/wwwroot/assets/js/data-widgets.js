$(function() {
    "use strict";

    $('#widget-chart1').sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,15,13,11,9,7], {
            type: 'bar',
            height: '40',
            barWidth: '2',
            resize: true,
            barSpacing: '4',
            barColor: '#008cff'
        });

     
     $("#widget-chart2").sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,2,3,4,5,4,3,2,3,4,5,6,5,4,3,2], {
        type: 'discrete',
        width: '120',
        height: '40',
        lineColor: '#15ca20',
        lineHeight: 22

     });
    

    $("#widget-chart3").sparkline([
            [9, 11],
            [13, 9],
            [10, 15],
            [9, 12],
            [11, 12],
            [7, 9],
            [9, 15],
            [10, 11],
            [12, 12],
            [13, 15],
            [9, 13],
            [10, 13],
            [10, 15]
        ], {
            type: "bar",
            width: "100%",
            height: "35px",
            barWidth: 4,
            barSpacing: 6,
            stackedBarColor: ["#223035","#fd3550"]
        })


    $("#widget-chart4").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1, 0, -1, 1, -1], {
            type: "tristate",
            height: "35",
            posBarColor: "#15ca20",
            negBarColor: "#fd3550",
            barWidth: 4,
            barSpacing: 5,
            zeroAxis: !1
        }),

     

   $("#widget-chart5").sparkline([3,5,3,7,5,10,3,6,5,7], {
            type: 'line',
            width: '120',
            height: '40',
            lineWidth: '2',
            lineColor: '#0dceec',
            fillColor: 'transparent',
            spotColor: '#fff',
    }); 

   $('#widget-chart6').sparkline([20, 20, 20], {
            type: 'pie',
            width: '60',
            height: '60',
            resize: true,
            sliceColors: ['#008cff', '#15ca20', '#fd3550']
        });   


   $("#widget-chart7").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#008cff",
            fillColor: "#008cff",
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart8").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#15ca20",
            fillColor: "#15ca20",
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart9").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#ff9700",
            fillColor: "#ff9700",
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

        //peity pie

            $("span.pie").peity("pie",{
                width: 65,
                height: 65 
            });

         //peity donut

          $("span.donut").peity("donut",{
                width: 65,
                height: 65 
            }); 


$('#widget-chart10').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#008cff',
            lineWidth: 3,
            animate: 1000,
            size:80,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }
        }); 



        $('#widget-chart11').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#15ca20',
            lineWidth: 3,
            animate: 1000,
            size:80,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }
        }); 



        $('#widget-chart12').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#fd3550',
            lineWidth: 3,
            animate: 1000,
            size:80,
            scaleColor: false,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }

        }); 


        $('#widget-chart13').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#ff9700',
            lineWidth: 3,
            animate: 1000,
            size:80,
            scaleColor: false,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }

        }); 



/*color data widgets*/

$('#widget-chart14').sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,15,13,11,9,7], {
            type: 'bar',
            height: '40',
            barWidth: '2',
            resize: true,
            barSpacing: '4',
            barColor: '#fff'
        });

     
     $("#widget-chart15").sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,2,3,4,5,4,3,2,3,4,5,6,5,4,3,2], {
        type: 'discrete',
        width: '120',
        height: '40',
        lineColor: '#fff',
        lineHeight: 22

     });
    

    $("#widget-chart16").sparkline([
            [9, 11],
            [13, 9],
            [10, 15],
            [9, 12],
            [11, 12],
            [7, 9],
            [9, 15],
            [10, 11],
            [12, 12],
            [13, 15],
            [9, 13],
            [10, 13],
            [10, 15]
        ], {
            type: "bar",
            width: "100%",
            height: "35px",
            barWidth: 4,
            barSpacing: 6,
            stackedBarColor: ["#343a40", "#fff"]
        })


    $("#widget-chart17").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1, 0, -1, 1, -1], {
            type: "tristate",
            height: "35",
            posBarColor: "#1ad445",
            negBarColor: "#fd293d",
            barWidth: 4,
            barSpacing: 5,
            zeroAxis: !1
        }),

     

   $("#widget-chart18").sparkline([3,5,3,7,5,10,3,6,5,7], {
            type: 'line',
            width: '120',
            height: '40',
            lineWidth: '2',
            lineColor: '#fff',
            fillColor: 'transparent',
            spotColor: '#fff',
    }); 

   $('#widget-chart19').sparkline([20, 20, 20], {
            type: 'pie',
            width: '60',
            height: '60',
            resize: true,
            sliceColors: ['#008cff', '#15ca20', '#fd3550']
        });   


   $("#widget-chart20").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#007be0",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart21").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#0cad16",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart22").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#ff7f00",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        });


      $('#widget-chart23').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#0eb318',
            lineWidth: 3,
            animate: 1000,
            size:80,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }
        }); 


        $('#widget-chart24').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#d4051a',
            lineWidth: 3,
            animate: 1000,
            size:80,
            scaleColor: false,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }

        });


/*gradient color data widgets*/

$('#widget-chart25').sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,15,13,11,9,7], {
            type: 'bar',
            height: '40',
            barWidth: '2',
            resize: true,
            barSpacing: '4',
            barColor: '#fff'
        });

     
     $("#widget-chart26").sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,2,3,4,5,4,3,2,3,4,5,6,5,4,3,2], {
        type: 'discrete',
        width: '120',
        height: '40',
        lineColor: '#fff',
        lineHeight: 22

     });
    

    $("#widget-chart27").sparkline([
            [9, 11],
            [13, 9],
            [10, 15],
            [9, 12],
            [11, 12],
            [7, 9],
            [9, 15],
            [10, 11],
            [12, 12],
            [13, 15],
            [9, 13],
            [10, 13],
            [10, 15]
        ], {
            type: "bar",
            width: "100%",
            height: "35px",
            barWidth: 4,
            barSpacing: 6,
            stackedBarColor: ["#343a40", "#fff"]
        })


    $("#widget-chart28").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1, 0, -1, 1, -1], {
            type: "tristate",
            height: "35",
            posBarColor: "#1ad445",
            negBarColor: "#fd293d",
            barWidth: 4,
            barSpacing: 5,
            zeroAxis: !1
        }),

     

   $("#widget-chart29").sparkline([3,5,3,7,5,10,3,6,5,7], {
            type: 'line',
            width: '120',
            height: '40',
            lineWidth: '2',
            lineColor: '#fff',
            fillColor: 'transparent',
            spotColor: '#fff',
    }); 

   $('#widget-chart30').sparkline([20, 20, 20], {
            type: 'pie',
            width: '60',
            height: '60',
            resize: true,
            sliceColors: ['#008cff', '#15ca20', '#fd3550']
        });   


   $("#widget-chart31").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#ff446a",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart32").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#2bacf7",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        })

   $("#widget-chart33").sparkline([15, 13, 5, 10, 4, 7, 12, 11, 12, 10, 15, 12, 17, 21, 16], {
            type: "line",
            width: "100%",
            height: "100px",
            lineColor: "#fff",
            fillColor: "#fb8e06",
            lineWidth: '2',
            spotColor: "",
            minSpotColor: "",
            maxSpotColor: "",
            highlightSpotColor: "",
            highlightLineColor: "",
            chartRangeMin: 0,
            chartRangeMax: 20
        });


      $('#widget-chart34').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#19d243',
            lineWidth: 3,
            animate: 1000,
            size:80,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }
        }); 


        $('#widget-chart35').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#ff717f',
            lineWidth: 3,
            animate: 1000,
            size:80,
            scaleColor: false,
            lineCap: 'square',
            trackColor: '#e5e5e5',
            onStep: function(from, to, percent) {
                $(this.el).find('.w_percent').text(Math.round(percent));
            }

        });





	});