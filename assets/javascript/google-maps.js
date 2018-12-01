var map
var marker
var infowindow;
var lat = 39.994118;
var lng = -105.633991;

function showMap (lat, lng) {
    //these are unnecessary here
    // var lat = lat;
    // var lng = lng;

    var place = {lat: lat, lng: lng}

    var mapOptions = {
      center: place,
    zoom: 10
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    marker = new google.maps.Marker({position: place, map: map});

  }

  function findTrails() {
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {lat: lat, lng: lng},
      radius: 10000,
      name: ['hiking trail']
    }, callback);

    function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
      var info = place.name
      infowindow.setContent(info);
      infowindow.open(map, this);
    });
  }
}

$(document).ready(function() {
    $("#genMap").on("click", showMap)
    // this line was causing an error, so I diabled for now JCMH
  //  .then($("#find").on("click", findTrails))


  })

  //ADDED by JCMH
$(".collapsible-header").click(function(){
  //we need to get the lat and long as parameters
  //to do this we will take the accordian div id#
  var i = $("#ID");
  console.log("click! " +i);

  var newLat = recAreas[i].FacilityLatitude;
  var newLng = recAreas[i].FacilityLongitude;
  showMap(newLat, newLng);
})