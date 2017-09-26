import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class locationService {
  private BASE_URL = "https://hrs.diblii.com/api/location";

  constructor(public http: Http) { }

  postLocation(lat, long, statute) {
    const body = {
      "x": lat,
      "y": long,
      "statute": statute
    };

    return this.http.post(this.BASE_URL, body);
  }

  getLocations() {
    return this.http.get(this.BASE_URL);
  }

  getNearStatutes(currLat, currLong, locations) {
    let nearStatutes = []
    for (let i=0; i < locations.length; i++) {
      let lat = locations[i].x,
          long = locations[i].y,
          statute = locations[i].statute,
          distanceBetween = this.getDistanceBetweenInKm(currLat, currLong, lat, long)

      if (distanceBetween <= 1) {
        nearStatutes.push(statute);
      }
    }
  }

  public getDistanceBetweenInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg) {
    return deg * (Math.PI/180)
  }


}
