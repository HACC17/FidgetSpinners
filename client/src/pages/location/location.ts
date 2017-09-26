import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StatuePage} from '../statue/statue';
import {Geolocation} from '@ionic-native/geolocation';
import {AppServer} from '../../services/appserver';
import {locationService} from '../../services/locationService';
import {Response} from '@angular/http';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
  providers: [[Geolocation]]
})
export class LocationPage {

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private server: AppServer,
              public locationServer: locationService) {
    this.loadSections();
  }

  private allSections: any[] = null;
  private sections: any[] = [];
  private loadingSections: boolean = true;
  private isEmpty: boolean = false;
  private jsonResLength: number;
  private lat: number;
  private lon: number;
  private distances: number[];
  private distance: string;
  private buffer: any[]= [];

  goToStatue(params) {
    if (!params) params = {};
    this.navCtrl.push(StatuePage);
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lat = data.coords.latitude
      this.lon = data.coords.longitude
    });
  }

  loadMore(infiniteScroll) {
    if (this.sections.length + 10 < this.jsonResLength) {
      let oldSectionsLength = this.sections.length;
      for (var i = 0; i < 10; i++) {
        this.sections[oldSectionsLength + i] = this.allSections[oldSectionsLength + i]
      }
    }
    infiniteScroll.complete();
  }

  openSection(sec) {
    var self = this;
    /*
     (self.server).getStatute(id)
     .map(response => response.json()).subscribe(result => {
     self.section = result
     */
    setTimeout(function () {
      self.navCtrl.push(StatuePage, {section: sec});
    }, 200);

  }

  sectionsSuccess(res: Response) {
    console.log('sectionssuccess');
    this.distances = [];
    this.allSections = [];
    this.buffer = [];
    this.sections = [];


    this.geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 5000}).then((resp) => {

      console.log("getting position");
    try {
      let jsonRes = res.json();
      this.jsonResLength = jsonRes.length;

      for (var a = 0; a < this.jsonResLength; a++) {
        let js = jsonRes[a];
        js.bookmarked = this.server.isInBookmark(js);
        this.allSections.push(js);

        if (a < 15) {
          this.buffer[a] = this.allSections[a];

          try {
              this.lat = resp.coords.latitude
              this.lon = resp.coords.longitude

              this.buffer[a].distance = this.locationServer.getDistanceBetweenInKm(this.lat, this.lon,
              this.buffer[a].x, this.buffer[a].y);

              this.distance = this.buffer[a].distance.toString();
              this.distance = this.distance.substring(0,4);
              this.buffer[a].distance = parseFloat(this.distance);


          }catch(e) {
            this.buffer[a].distance = this.locationServer.getDistanceBetweenInKm(21.2952, -157.8136,
            this.buffer[a].x, this.buffer[a].y);
            this.loadingSections = false;

          }

         if(this.buffer[a].distance <= 1) {
            this.sections.push(this.buffer[a]);
         }

        }
      }

      this.loadingSections = false;
      if (this.sections.length == 0) {
        this.isEmpty = true;
      }

    } catch (e) {
      this.loadingSections = false;
      alert("Exception: " + e.message);
    } this.loadingSections = false;
    }).catch((error) => {
      this.loadingSections = false;
      this.isEmpty = true;
    });

  }

  sectionsFailure(error: any) {
    this.loadingSections = false;
    alert('Error: ' + JSON.stringify(error));
  }

  loadSections() {
    this.loadingSections = true;
    (this.locationServer).getLocations().subscribe(
      res => this.sectionsSuccess(res), err => this.sectionsFailure(err)
    );
  }

}
