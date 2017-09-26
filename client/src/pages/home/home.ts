import {Component} from '@angular/core';
import {DivisionPage} from '../division/division';
import {TitlePage} from '../title/title';
import {ChapterPage} from '../chapter/chapter';
import {SectionPage} from '../section/section';
import {StatuePage} from '../statue/statue';
import {LocationPage} from '../location/location';
import {SearchPage} from '../search/search';
import { Geolocation } from '@ionic-native/geolocation'
import {Camera, CameraOptions} from '@ionic-native/camera';
import {cloudVisionService} from '../../services/cloudVisionService'
import {locationService} from '../../services/locationService'
import {AppServer} from '../../services/appserver'

import {
  NavController, 
  LoadingController, 
  AlertController
  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [[Camera], [Geolocation]]
})

export class HomePage {

  public searchQuery: string;
  splash = true;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private camera: Camera,
              private vision: cloudVisionService,
              private location: locationService,
              private server: AppServer,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 3000);
  }

  goToDivision(params) {
    if (!params) params = {};
    this.navCtrl.push(DivisionPage);
  }

  goToTitle(params) {
    if (!params) params = {};
    this.navCtrl.push(TitlePage);
  }

  goToChapter(params) {
    if (!params) params = {};
    this.navCtrl.push(ChapterPage);
  }

  goToSection(params) {
    if (!params) params = {};
    this.navCtrl.push(SectionPage);
  }

  goToStatue(params) {
    if (!params) params = {};
    this.navCtrl.push(StatuePage);
  }

  goToSearch(params) {
    if (!params) params = {};
    this.navCtrl.push(SearchPage, {
      query: this.searchQuery
    });
    this.searchQuery = "";
  }

  goToLocation(params) {
    if (!params) params = {};
    this.navCtrl.push(LocationPage);
  }

  goToCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.processImage(imageData);
    }, (err) => {
      console.log("Error trying to open camera.")
    });
  }

  processImage(imageData): void {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Processing image...',
    });

    let alert = this.alertCtrl.create({
      title: 'Error Processing Image.',
      message: 'Could not process image. Try taking a clearer picture.',
      buttons: ['Dismiss']
    });

    loading.present().then(() => {
      this.vision.getText(imageData).subscribe((result) => {
        var textAnnotations = result.json().responses[0].fullTextAnnotation;

        if (textAnnotations == undefined) {
          loading.dismiss();
          alert.present()
          
        } else {
          this.parseText(textAnnotations.text);
          loading.dismiss();
        }

      }, err => {
        loading.dismiss()
        alert.present()
      });
    });
  }

  parseText(text): void {
    let alert = this.alertCtrl.create({
      title: 'Error Processing Image.',
      message: 'Could not process image. Try taking a clearer picture.',
      buttons: ['Dismiss']
    });
    let matchedText = text.match(/(\d+(\-\d+))/g);
    let section = "";

    if (matchedText != null) {
      let chapterSection = matchedText[0].split('-');

      this.server.getSection(chapterSection[0], chapterSection[1])
        .map(response => response.json()).subscribe(result => {
        section = result;

        if (section[0] != undefined) {

          // Post the location of this found section to the REST API
          // for use with Near You functionality
          this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
            let lat = resp.coords.latitude,
                long = resp.coords.longitude,
                statute = section[0];

            this.location.postLocation(lat, long, statute).subscribe();

          }).catch((error) =>{
            console.log('error getting location', error);
          });

          // Open the found section
          this.navCtrl.push(StatuePage, {section: section[0]});
        } else {
          // Statute does not exist on the server
          alert.present()
        }
      }, err => {
        // Error retrieving from the REST API
        alert.present()
      });
    } else {
      // No statute was found in the text
      alert.present()
    }
  }


}
