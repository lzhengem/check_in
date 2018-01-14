        function initGeo(){
             window.navigator = window.navigator || {};
             window.navigator.geolocation = window.navigator.geolocation ||
                                            undefined;
        }
        // calculate the distance between loc1 and loc2, which are both hashs
        function calcDistance (loc1, loc2) {
              return google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(loc1['lat'], loc1['lng']), new google.maps.LatLng(loc2['lat'],loc2['lng']));
           }
           
        // get request to url, returns the json from the url
        function getJson(url) {
         return JSON.parse($.ajax({ type: 'GET', url: url, dataType: 'json', global: false, async:false, success: function(data) {
                 return data;
             }
         }).responseText);
        }
        
        function disable(id){
            document.getElementById(id).disabled = true;
        }
            
        // this is called by the google maps reversegecoder once its loaded
        function initMap() {
            var destination = document.getElementById('address').innerText;
            var geocoder = new google.maps.Geocoder;
            destination_no_space = destination.replace(/\s+/g, "+");
            
            
            // if the use did not allow for geolocation, then alert them that it is undefined
            if (navigator.geolocation){ 
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var latlng = {lat: latitude, lng: longitude};
                    
                    // alert(JSON.stringify(latlng, null, 4));
                    // var otherlat = 37.721196;
                    // var otherlong = -122.436427;
                    // var otherloc = {lat: otherlat, lng:otherlong};
                    // var otheraddress = "500+london+st,+San+Francisco,+CA";
                    // var otheraddress = "1+Market+St,+San+Francisco,+CA";
                    var address1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ destination_no_space + "&key=AIzaSyCeUFPSExQp5oAW7inlirQEjZR5oI4ubSU";
                    
                    var otherAddressResults =  getJson(address1).results[0]
                    
                    var otheraddresslatlng= otherAddressResults.geometry.location;
                    
                    var output = "You are currently located at " + position.coords.latitude + ", " + position.coords.longitude;
                    var currentAddress = position.coords.latitude + ", " + position.coords.longitude;
                    // calculate the distance between the current location and the destination
                    var distance = calcDistance(latlng,otheraddresslatlng).toFixed(2);
                    var distance_output;
                    
                    
                    
                    // alert(JSON.stringify(otheraddresslatlng, null, 4));
                    
                    // reverse geocode user's long and lat into physical address
                    geocoder.geocode({'location': latlng}, function(results, status) {
                        if (status === 'OK') {
                            
                            // results[0].formatted_address == address, 2 == cross street, 3 == neighboorhood, 4 = city, 5 == county, 6 = bay area?, 8 = CA, 9 = USA
                            currentAddress = results[0].formatted_address;
                            
                            output = "You are currently located at " + currentAddress;
                            
                        }
                        // else {
                        //     // if unable to find their location, then alert them
                        //     window.alert('Geocoder failed due to: ' + status);
                        // }
                        // if the user is more than 300m away from the destination, disable the check_in_button
                        if(distance <= 300){
                            
                            // list how far away user is
                            distance_output = "You are within 300m of " + destination;
                        }
                        else{
                            // if user is more than 300m away from the destination, then disable to check_in_button
                            disable("check_in_button");
                            distance_output = "You are "+ distance + "m away from " + destination + ". You need to be within 300m.";
                        }
                        
                        // if geocoder fails to reverse geocode address, then display long and lat, if it successfully reverse geocoded, then display the physical address
                        document.getElementById('location_text').innerHTML = output;
                        // document.getElementById('distance').value = distance;
                        document.getElementById('distance_text').innerHTML = distance_output;
                        document.getElementById('check_in_location').value = currentAddress;
                        document.getElementById('check_in_longitude').value = longitude;
                        document.getElementById('check_in_latitude').value = latitude;
                        // document.getElementById('check_in_destination_id').value = destination;
                    });

                },function error(msg){alert('Please enable your GPS position feature.');  

              }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
            
            }else {
                alert("Geolocation API is not supported in your browser.");
            }
            
        }
        
        // display the map to show user where they are and the destination as well
        function showMap(){
            var destination = document.getElementById('address').innerText;
            var geocoder = new google.maps.Geocoder;
            var destination_no_space = destination.replace(/\s+/g, "+");
            var address1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ destination_no_space + "&key=AIzaSyCeUFPSExQp5oAW7inlirQEjZR5oI4ubSU";
            var otherAddressResults =  getJson(address1).results[0]
            var otheraddresslatlng= otherAddressResults.geometry.location;
            
            if (navigator.geolocation){ 
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var latlng = {lat: latitude, lng: longitude};
                    var bounds = new google.maps.LatLngBounds();
                    bounds.extend(latlng);
                    bounds.extend(otheraddresslatlng);

                        
            //  var currentLocation = {lat: -25.363, lng: 131.044};
                    var map = new google.maps.Map(document.getElementById('map'), {
                    //   zoom: 18,
                      center: latlng
                    });
                    var marker = new google.maps.Marker({
                      position: latlng,
                      map: map,
                      title: "Your location"
                    });
                    var destinationMarker = new google.maps.Marker({
                      position: otheraddresslatlng,
                      map: map,
                      title: destination
                    });
                    map.fitBounds(bounds);
                },function error(msg){alert('Please enable your GPS position feature.');  

              }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
            }else {
                alert("Geolocation API is not supported in your browser.");
            } 
        }
        
       function setupAutocomplete() {
        // set up the map to be in san francisco
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.773972, lng:  -122.431297},
          zoom: 11
        });

        // set up the id address for the autocomplete
        var input = document.getElementById('address');
        var autocomplete = new google.maps.places.Autocomplete(input);
        // set the autocomplete bind to the map
        autocomplete.bindTo('bounds', map);
        
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        
        // set up a marker
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });
        
        // when the input address chanages, change the map
        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });
        
      }
    //   putting these 3 functions together for new_check_in creation so google maps api only has one callback
      function initGeo_initMap_showMap(){
        initGeo();
        initMap();
        showMap();
      }