import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppServer } from '../../services/appserver';
import { StatuePage } from '../statue/statue';

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html'
})
export class BookmarksPage {

  private sections: any[] = null;

  constructor(public navCtrl: NavController,public server: AppServer) {
    this.sections=[];
    let secs=this.server.getAllBookmarks();
    for (var a=0;a<secs.length;a++){
      secs[a].bookmarked=true;
      this.sections.push(secs[a]);
    }
  }

  openSection(sec,idx){
    this.navCtrl.push(StatuePage,{section: sec,sectionsList: this.sections,sectionIndex: idx});
  }

}
