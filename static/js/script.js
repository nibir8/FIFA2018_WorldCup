
    jQuery(function($) {
        // Asynchronously Load the map API
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZib4Lvp0g1L8eskVBFJ0SEbnENB6cJ-g&callback=initialize";
        document.body.appendChild(script);
    });

    function toggleTable1(id) {
      var x = document.getElementById("table1");
      if (x.style.display === "none") {
		  table2.style.display = "none";
		  table3.style.display = "none";
		  table4.style.display = "none";
		  table5.style.display = "none";
		  table6.style.display = "none";
          x.style.display = "block";
      } else {
          x.style.display = "none";
      }
    }

function toggleTable2(table2) {
  var x = document.getElementById("table2");
  if (x.style.display === "none") {
	  table1.style.display = "none";
		  table3.style.display = "none";
		  table4.style.display = "none";
		  table5.style.display = "none";
		  table6.style.display = "none";
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
function toggleTable3(table3) {
  var x = document.getElementById("table3");
  if (x.style.display === "none") {
 table1.style.display = "none";
		  table2.style.display = "none";
		  table4.style.display = "none";
		  table5.style.display = "none";
		  table6.style.display = "none";     
		  x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
function toggleTable4(table4) {
  var x = document.getElementById("table4");
  if (x.style.display === "none") {
 table1.style.display = "none";
		  table2.style.display = "none";
		  table3.style.display = "none";
		  table5.style.display = "none";
		  table6.style.display = "none"; 
  x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

function toggleTable5(table5) {
  var x = document.getElementById("table5");
  if (x.style.display === "none") {
	   table1.style.display = "none";
		  table2.style.display = "none";
		  table3.style.display = "none";
		  table4.style.display = "none";
		  table6.style.display = "none"; 
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
function toggleTable6(table6) {
  var x = document.getElementById("table6");
  if (x.style.display === "none") {
 table1.style.display = "none";
		  table2.style.display = "none";
		  table3.style.display = "none";
		  table4.style.display = "none";
		  table5.style.display = "none"; 
  x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

    function initialize() {
        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };

        // Display a map on the page
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        map.setTilt(45);

        // Multiple Markers
        var markers = [
            ['Moscow, Russia', 55.751244, 37.618423],
            ['Saint Petersburg,Russia', 59.9343, 30.3351],
            ['Sochi, Russia', 43.6028, 39.7342],
            ['Volgograd, Russia', 48.7080, 44.5133],
            ['Kazan, Russia', 55.8304, 49.0661],
            ['Samara, Russia', 53.2415, 50.2212]
        ];

        // Info Window Content
        var infoWindowContent =
          [  ['<div class="info_content">' +
                '<h3 class="info_location_name">Moscow</h3>' +

                '<p class="info_location_text">Stadium name: Luzhniki Stadium</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable1(table1);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                  '<a href="https://en.wikipedia.org/wiki/Luzhniki_Stadium" class="btn-link">View additional info</a>' +
                '</div>'
            ],
            ['<div class="info_content">' +
                '<h3 class="info_location_name">Saint Petersburg</h3>' +
                '<p class="info_location_text">Krestovsky Stadium</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable2(table2);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                '<a href="https://en.wikipedia.org/wiki/Piter_Arena" class="btn-link">View info</a>' +
                '</div>'
            ],
            ['<div class="info_content">' +
                '<h3 class="info_location_name">Sochi</h3>' +
                '<p class="info_location_text">Fisht Olympic Stadium</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable3(table3);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                '<a href="https://en.wikipedia.org/wiki/Fisht_Olympic_Stadium" class="btn-link">View info</a>' +
                '</div>'
            ],
            ['<div class="info_content">' +
                '<h3 class="info_location_name">Volgograd</h3>' +
                '<p class="info_location_text">Volgograd Arena</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable4(table4);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                '<a href="https://en.wikipedia.org/wiki/Volgograd_Arena" class="btn-link">View info</a>' +
                '</div>'
            ],
            ['<div class="info_content">' +
                '<h3 class="info_location_name">Kazan</h3>' +
                '<p class="info_location_text">Kazan Arena</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable5(table5);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                '<a href="https://en.wikipedia.org/wiki/Kazan_Arena" class="btn-link">View info</a>' +
                '</div>'
            ],
            ['<div class="info_content">' +
                '<h3 class="info_location_name">Samara</h3>' +
                '<p class="info_location_text">Cosmos Arena</p>' +
                '<a href="#"  class="btn-link" onclick="toggleTable6(table6);">details</a>' +
                '<p class="info_location_text">                 </p>' +
                '<a href="https://en.wikipedia.org/wiki/Cosmos_Arena" class="btn-link">View info</a>' +
                '</div>'
            ]
        ];
        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow({ maxWidth: 280 }),
            marker, i;

        // Loop through our array of markers & place each one on the map
        for (i = 0; i < markers.length; i++) {
            var position = new google.maps.LatLng(markers[i][1],
                markers[i][2], markers[i][3], markers[i][4]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });

            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var  tilesloadedListener = google.maps.event.addListener((map),  'tilesloaded', function(event) {
            this.setZoom(5);
            google.maps.event.removeListener(tilesloadedListener);
        });

    }
