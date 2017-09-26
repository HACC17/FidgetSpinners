import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { StatuePage } from '../statue/statue';
import { AppServer } from '../../services/appserver';
import { Response } from '@angular/http';

@Component({
  selector: 'page-section',
  templateUrl: 'section.html'
})
export class SectionPage {

  private chapter: any = null;
  private sections: any[] = null;
  private loadingSections: boolean = false;
  private hasSections = true;

  constructor(public navCtrl: NavController,private navParams: NavParams,private server: AppServer) {
    this.chapter=this.navParams.get('chapter');
    this.sections=[];
    this.loadSections();
  }

  openSection(sec,idx){
    this.navCtrl.push(StatuePage,{section: sec,sectionsList: this.sections, sectionIndex: idx});
  }

  goBack(){
    this.navCtrl.pop();
  }

  sortSections(){
    for (var a=0;a<this.sections.length;a++){
      for (var b=a+1;b<this.sections.length;b++){
        let seca=this.sections[a];
        let secb=this.sections[b];
        if (parseFloat(seca.section)>parseFloat(secb.section)){
          this.sections[a]=secb;
          this.sections[b]=seca;
        }
      }
    }
  }

  sectionsSuccess(res: Response){
    this.hasSections=true;
    try{
      let jsonRes=res.json();
      if (jsonRes.length == 0) this.hasSections = false;
      for (var a=0;a<jsonRes.length;a++){
        let js=jsonRes[a];
        js.bookmarked=this.server.isInBookmark(js);
        this.sections.push(js);

      }
      this.sortSections();
      this.loadingSections=false;
    }catch(e){
      alert("Exception: "+e.message);
    }
  }

  sectionsFailure(error: any){
    this.loadingSections=false;
    alert('Error: Couldnt load sections');
  }

  loadSections(){
    let that=this;
    this.loadingSections=true;
    this.server.getSectionsForChapter(this.chapter.number).subscribe(
      res=>that.sectionsSuccess(res),err=>that.sectionsFailure(err)
    );
  }
}
