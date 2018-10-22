$(function() {
    "use strict";


// chart 1
 var ctx = document.getElementById('dashboard-chart-1').getContext('2d');

      var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke1.addColorStop(0, 'rgba(23, 234, 217, 0.8)');
      gradientStroke1.addColorStop(1, 'rgba(96, 120, 234, 0.7)');

      var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke2.addColorStop(0, 'rgba(188, 78, 156, 0.8)');
      gradientStroke2.addColorStop(1, 'rgba(248, 7, 89, 0.7)');

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [{
            label: 'Apple',
            data: [0, 30, 60, 25, 60, 25, 50, 0],
            pointBorderWidth: 4,
            pointHoverBackgroundColor: gradientStroke1,
            backgroundColor: gradientStroke1,
            borderColor: gradientStroke1,
            borderWidth: 2
          }, {
            label: 'Samsung',
            data: [0, 60, 25, 80, 35, 75, 30, 0],
            pointBorderWidth: 4,
            pointHoverBackgroundColor: gradientStroke2,
            backgroundColor: gradientStroke2,
            borderColor: gradientStroke2,
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

    var ctx = document.getElementById("dashboard-chart-2").getContext('2d');
   
      var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke3.addColorStop(0, 'rgba(255, 223, 64, 0.8)');
      gradientStroke3.addColorStop(1, 'rgba(255, 131, 89, 0.7)');

      var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke4.addColorStop(0, 'rgba(255, 5 ,124, 0.8)');
      gradientStroke4.addColorStop(0.5, 'rgba(141, 11 ,147, 0.7)');

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [{
            label: 'Laptops',
            data: [40, 30, 60, 35, 60, 25, 50, 40],
            borderColor: gradientStroke3,
            backgroundColor: gradientStroke3,
            hoverBackgroundColor: gradientStroke3,
            pointRadius: 0,
            fill: false,
            borderWidth: 1
          }, {
            label: 'Mobiles',
            data: [50, 60, 40, 70, 35, 75, 30, 20],
            borderColor: gradientStroke4,
            backgroundColor: gradientStroke4,
            hoverBackgroundColor: gradientStroke4,
            pointRadius: 0,
            fill: false,
            borderWidth: 1
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

$('#dashboard-chart-3').sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,15,13,11,9,7], {
            type: 'bar',
            height: '40',
            barWidth: '2',
            resize: true,
            barSpacing: '4',
            barColor: '#008cff'
        });

  
// chart 4     

     $("#dashboard-chart-4").sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,2,3,4,5,4,3,2,3,4,5,6,5,4,3,2], {
        type: 'discrete',
        width: '120',
        height: '40',
        lineColor: '#fd3550',
        lineHeight: 22

     });

// chart 5     

  $("#dashboard-chart-5").sparkline([3,5,3,7,5,10,3,6,5,7], {
            type: 'line',
            width: '120',
            height: '40',
            lineWidth: '2',
            lineColor: '#15ca20',
            fillColor: 'transparent',
            spotColor: '#15ca20',
    }); 



// chart 6

var ctx = document.getElementById("dashboard-chart-6").getContext('2d');

    var gradientStroke5 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke5.addColorStop(0, '#7f00ff');
      gradientStroke5.addColorStop(1, '#e100ff');

      var gradientStroke6 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke6.addColorStop(0, '#fc4a1a');
      gradientStroke6.addColorStop(1, '#f7b733');


      var gradientStroke7 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke7.addColorStop(0, '#283c86');
      gradientStroke7.addColorStop(1, '#45a247');

      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Samsung", "Apple", "Nokia"],
          datasets: [{
            backgroundColor: [
              gradientStroke5,
              gradientStroke6,
              gradientStroke7
            ],

             hoverBackgroundColor: [
              gradientStroke5,
              gradientStroke6,
              gradientStroke7
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

var ctx = document.getElementById("dashboard-chart-7").getContext('2d');

  var gradientStroke8 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke8.addColorStop(0, '#42e695');
      gradientStroke8.addColorStop(1, '#3bb2b8');

      var gradientStroke9 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke9.addColorStop(0, '#4776e6');
      gradientStroke9.addColorStop(1, '#8e54e9');


      var gradientStroke10 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke10.addColorStop(0, '#ee0979');
      gradientStroke10.addColorStop(1, '#ff6a00');

      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ["Gross Profit", "Revenue", "Expense"],
          datasets: [{
            backgroundColor: [
              gradientStroke8,
              gradientStroke9,
              gradientStroke10
            ],

             hoverBackgroundColor: [
              gradientStroke8,
              gradientStroke9,
              gradientStroke10
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

var ctx = document.getElementById("dashboard-chart-8").getContext('2d');

    var gradientStroke11 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke11.addColorStop(0, '#ba8b02');
      gradientStroke11.addColorStop(1, '#181818');

      var gradientStroke12 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke12.addColorStop(0, '#2c3e50');
      gradientStroke12.addColorStop(1, '#fd746c');


      var gradientStroke13 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke13.addColorStop(0, '#ff0099');
      gradientStroke13.addColorStop(1, '#493240');

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Jeans", "T-Shirts", "Shoes"],
          datasets: [{
            backgroundColor: [
              gradientStroke11,
              gradientStroke12,
              gradientStroke13
            ],
            hoverBackgroundColor: [
              gradientStroke11,
              gradientStroke12,
              gradientStroke13
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
   
	  