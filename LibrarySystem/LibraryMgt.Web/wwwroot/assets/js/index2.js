$(function() {
    "use strict";


// chart 1
 var ctx = document.getElementById('dashboard2-chart-1').getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [{
            label: 'Apple',
            data: [0, 30, 60, 25, 60, 25, 50, 0],
            pointBorderWidth: 4,
            pointHoverBackgroundColor: "#008cff",
            backgroundColor: "rgba(0, 140, 255, 0.6)",
            borderColor: "#008cff",
            borderWidth: 2
          }, {
            label: 'Samsung',
            data: [0, 60, 25, 80, 35, 75, 30, 0],
            pointBorderWidth: 4,
            pointHoverBackgroundColor: "#fd3550",
            backgroundColor: "rgba(253, 53, 80, 0.6)",
            borderColor: "#fd3550",
            borderWidth: 2
          }]
        },
        options: {

            tooltips: {
              mode: 'nearest',
              intersect: false,
              position: 'nearest',
              xPadding: 10,
              yPadding: 10,
              caretPadding: 10
            },

         }
      });


// chart 2

    var ctx = document.getElementById("dashboard2-chart-2").getContext('2d');
	
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [{
            label: 'Laptops',
            data: [40, 30, 60, 35, 60, 25, 50, 40],
            borderColor: "#ff9700",
            backgroundColor: "rgba(255, 151, 0, 0.6)",
            hoverBackgroundColor: "#ff9700",
            pointRadius: 0,
            fill: false,
            borderWidth: 2
          }, {
            label: 'Mobiles',
            data: [50, 60, 40, 70, 35, 75, 30, 20],
            borderColor: "#d500ef",
            backgroundColor: "rgba(213, 0, 239, 0.6)",
            hoverBackgroundColor: "#d500ef",
            pointRadius: 0,
            fill: false,
            borderWidth: 2
          }]
        }
      });

// worl map

jQuery('#dashboard-map').vectorMap(
{
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    zoomOnScroll: false,
    color: '#009efb',
    regionStyle : {
        initial : {
          fill : '#0dceec'
        }
      },
    markerStyle: {
      initial: {
                    r: 9,
                    'fill': '#fff',
                    'fill-opacity':1,
                    'stroke': '#000',
                    'stroke-width' : 5,
                    'stroke-opacity': 0.4
                },
                },
    enableZoom: true,
    hoverColor: '#009efb',
    markers : [{
        latLng : [21.00, 78.00],
        name : 'I Love My India'
      
      }],
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true,
    onRegionClick: function(element, code, region)
    {
        var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

        alert(message);
    }
});

// chart 3

$('#dashboard2-chart-3').sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,15,13,11,9,7], {
            type: 'bar',
            height: '40',
            barWidth: '2',
            resize: true,
            barSpacing: '4',
            barColor: '#0dceec'
        });

  
// chart 4     

     $("#dashboard2-chart-4").sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,2,3,4,5,4,3,2,3,4,5,6,5,4,3,2], {
        type: 'discrete',
        width: '120',
        height: '40',
        lineColor: '#ff9700',
        lineHeight: 22

     });

// chart 5     

  $("#dashboard2-chart-5").sparkline([3,5,3,7,5,10,3,6,5,7], {
            type: 'line',
            width: '120',
            height: '40',
            lineWidth: '2',
            lineColor: '#223035',
            fillColor: 'transparent',
            spotColor: '#223035',
    }); 



// chart 6

var ctx = document.getElementById("dashboard2-chart-6").getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Samsung", "Apple", "Nokia"],
          datasets: [{
            backgroundColor: [
              "#0dceec",
              "#ff9700",
              "#223035"
            ],

             hoverBackgroundColor: [
              "#0dceec",
              "#ff9700",
              "#223035"
            ],

            data: [50, 50, 50]
          }]
        },
        options: {
            legend: {
              display: false
            }
        }
      });


// chart 7

var ctx = document.getElementById("dashboard2-chart-7").getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ["Gross Profit", "Revenue", "Expense"],
          datasets: [{
            backgroundColor: [
              "#15ca20",
              "#008cff",
              "#fd3550"
            ],

             hoverBackgroundColor: [
              "#15ca20",
              "#008cff",
              "#fd3550"
            ],
            data: [5, 8, 7]
          }]
        },
        options: {
            legend: {
              display: false
            }
        }
      });


// chart 8

var ctx = document.getElementById("dashboard2-chart-8").getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Jeans", "T-Shirts", "Shoes"],
          datasets: [{
            backgroundColor: [
              "#fd3550",
              "#ff9700",
              "#75808a"
            ],
            hoverBackgroundColor: [
              "#fd3550",
              "#ff9700",
              "#75808a"
            ],
            data: [25, 25, 25]
          }]
        },
        options: {
            legend: {
              display: false
            }
        }
      });


});
      
	  
	  
	  
	  
// Index Notification
	 
	 function info_noti(){
		Lobibox.notify('info', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		size: 'mini',
		position: 'top right',
		icon: 'fa fa-info-circle',
		msg: 'This is White Version of Dashboard'
		});
	  }	  
	  
	  
	  
	  