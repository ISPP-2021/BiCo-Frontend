/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor() { }
  geocodeAddress(address,
  geocoder: google.maps.Geocoder
  ) {
   geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
        let position = results[0].geometry.location
        console.log(position)
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  })

  }
}*/
