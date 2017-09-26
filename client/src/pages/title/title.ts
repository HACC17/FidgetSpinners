import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ChapterPage } from '../chapter/chapter';

@Component({
  selector: 'page-title',
  templateUrl: 'title.html'
})
export class TitlePage {

  private division: any = null;


  constructor(public navCtrl: NavController,private navParams: NavParams) {
    this.division=this.navParams.get('division');

  }

  goBack(){
    this.navCtrl.pop();
  }
  openTitle(tle){
    this.navCtrl.push(ChapterPage,{division: this.division,title: tle});
  }
}
