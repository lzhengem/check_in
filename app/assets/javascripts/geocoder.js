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
        function initMap(destination) {
            var geocoder = new google.maps.Geocoder;
            destination = destination.replace(/\s+/g, "+");
            
            
            // if the use did not allow for geolocation, then alert them that it is undefined
            if (navigator.geolocation === undefined) {
                    alert("Your geolocation is undefined, please turn on geoloation");
            }
            else {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var latlng = {lat: latitude, lng: longitude};
                    document.getElementById('long_lat').innerHTML = JSON.stringify(latlng, null, 4);
                    // alert(JSON.stringify(latlng, null, 4));
                    // var otherlat = 37.721196;
                    // var otherlong = -122.436427;
                    // var otherloc = {lat: otherlat, lng:otherlong};
                    // var otheraddress = "500+london+st,+San+Francisco,+CA";
                    // var otheraddress = "1+Market+St,+San+Francisco,+CA";
                    var address1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ destination + "&key=AIzaSyCeUFPSExQp5oAW7inlirQEjZR5oI4ubSU";
                    
                    var otherAddressResults =  getJson(address1).results[0]
                    
                    var otheraddresslatlng= otherAddressResults.geometry.location;
                    
                    var output = "You are currently located at " + position.coords.latitude + ", " + position.coords.longitude;
                    var currentAddress = position.coords.latitude + ", " + position.coords.longitude;
                    // calculate the distance between the current location and the destination
                    var distance = calcDistance(latlng,otheraddresslatlng).toFixed(2);
                    
                    
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
                        
                        // if geocoder fails to reverse geocode address, then display long and lat, if it successfully reverse geocoded, then display the physical address
                        document.getElementById('location_text').innerHTML = output;
                        document.getElementById('location').value = currentAddress;
                        
                        // list how far away user is
                        var distance_output = "You are " + distance + "m away from " + otherAddressResults.formatted_address;
                        
                        document.getElementById('distance_text').innerHTML = distance_output;
                        document.getElementById('distance').value = distance;
                        
                        
                        // if the user is more than 300m away from the destination, disable the check_in_button
                        if (distance > 300)
                            disable("check_in_button");
                    });

                }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
            }
        }