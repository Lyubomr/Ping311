$(document).on('ready page:load', function() {

  var userCords;
  var pos;
  var infoWindow = null;
  var customIcon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"

//Start geolocation

  if (navigator.geolocation) {
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function success(pos){
      userCords = pos.coords;
          // return userCords;
    }

      // Get the user's current position
    navigator.geolocation.getCurrentPosition(success, error);
      // console.log(pos.latitude + " " + pos.longitude);
    }

  else {
    alert('Geolocation is not supported in your browser');
  }
//End Geo location

  //map options
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(43.7184038, -79.47),
    panControl: false,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: false

  };

  //Adding infowindow option
  infowindow = new google.maps.InfoWindow({
    content: "Your current position"
  });

  //Fire up Google maps and place inside the map div
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $('#nearby-search').on("click", function() {
    var marker;
    var current_coordinates = { lat: userCords.latitude, lng: userCords.longitude};

    map.setCenter(current_coordinates);
    map.setZoom(17);
    // Create a marker after hitting current_loction button
    function createMarker(coords, map) {
      marker = new google.maps.Marker({
        position: coords,
        map: map
      });
    }

    createMarker(current_coordinates, map);

    // Creates markers but only after loading the show page of a map.
    if (window.nearbys) {
      nearbys.forEach(function(coord) {
        new google.maps.Marker({
          position: { lat: parseFloat(coord.lat), lng: parseFloat(coord.lng) },
          map: map,
          title: "Nearby_potholes",
          icon: customIcon
        });
      });
    }
});
    // var marker = new google.maps.Marker({
    //    position: (userCords.latitude, userCords.longitude),
    //    map: map,
    //    title: 'Current_pothole'
    //   });

      // Try W3C Geolocation (Preferred)
      // var initialLocation;
      // var browserSupportFlag =  new Boolean();
      // if(navigator.geolocation) {
      //   browserSupportFlag = true;
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      //     map.setCenter(initialLocation);
      //     map.setZoom(14);
      //   },
      //
      //   function() {
      //     handleNoGeolocation(browserSupportFlag);
      //   });
      // }
      // // Browser doesn't support Geolocation
      // else {
      //   browserSupportFlag = false;
      //   handleNoGeolocation(browserSupportFlag);
      // }
      // // Error msg if geoloction isn't supported
      // function handleNoGeolocation(errorFlag) {
      //   if (errorFlag == true) {
      //     alert("Geolocation service failed.");
      //     initialLocation = newyork;
      //   } else {
      //     alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      //     initialLocation = siberia;
      //   }
      // }
});




// $('#Postal_Code_Submit').submit(function() { // bind function to submit event of form
//
//   //define and set variables
//   var userPostalCode = $('#Postal_Code').val();
//   //console.log("This-> " + userCords.latitude);
//   if (userPostalCode) {
//
//   }
//   return false;
// });
