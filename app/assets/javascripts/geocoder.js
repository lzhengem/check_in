        function initGeo(){
             window.navigator = window.navigator || {};
             window.navigator.geolocation = window.navigator.geolocation ||
                                            undefined;
        }
        // calculate the distance between loc1 and loc2, which are both hashs
        function calcDistance (loc1, loc2) {
            // document.getElementById('testing').innerHTML = JSON.stringify(google.maps, null, 4);
                // alert(JSON.stringify(google.maps, null, 4));
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
        
        // this is called by the google maps reversegecoder once its loaded
        function initMap() {
            var geocoder = new google.maps.Geocoder;
            
            if (navigator.geolocation === undefined) {
            // document.getElementById('g-unsupported').classList.remove('hidden');
                    alert("Your geolocation is undefined");
            }
            else {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var latlng = {lat: latitude, lng: longitude};
                    // var otherlat = 37.721196;
                    // var otherlong = -122.436427;
                    // var otherloc = {lat: otherlat, lng:otherlong};
                    var otheraddress = "500+london+st,+San+Francisco,+CA";
                    // var otheraddress = "1+Market+St,+San+Francisco,+CA";
                    var address1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ otheraddress + "&key=AIzaSyCeUFPSExQp5oAW7inlirQEjZR5oI4ubSU";
                    var otherAddressResults =  getJson(address1).results[0]
                    var otheraddresslatlng= otherAddressResults.geometry.location;
                    
                    
                    // alert(JSON.stringify(otheraddresslatlng, null, 4));

                    
                    geocoder.geocode({'location': latlng}, function(results, status) {
                        if (status === 'OK') {
                            // results[0].formatted_address == address, 2 == cross street, 3 == neighboorhood, 4 = city, 5 == county, 6 = bay area?, 8 = CA, 9 = USA
                            var currentAddress = results[0].formatted_address;
                            var output = "You are currently located at " + currentAddress;
                            document.getElementById('location_text').innerHTML = output;
                            document.getElementById('location').value = currentAddress;
                            
                            var distance = calcDistance(latlng,otheraddresslatlng).toFixed(2);
                            
                            var distance_output = "You are " + distance + "m away from " + otherAddressResults.formatted_address;
                            document.getElementById('distance_text').innerHTML = distance_output;
                            document.getElementById('distance').value = distance;
                            if (distance > 300)
                                document.getElementById("check_in").disabled = true;
                        }
                        else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                });
            }
        }