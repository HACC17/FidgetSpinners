import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SectionPage } from '../section/section';

@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html'
})
export class ChapterPage {

  private division: any = null;
  private title: any = null;

  constructor(public navCtrl: NavController,private navParams: NavParams) {
    this.division=this.navParams.get('division');
    this.title=this.navParams.get('title');
  }

  goBack(){
    this.navCtrl.pop();
  }
  
  openChapter(chp){
    this.navCtrl.push(SectionPage,{chapter: chp});
  }
}
