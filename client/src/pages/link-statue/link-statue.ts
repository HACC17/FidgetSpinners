import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AppServer} from '../../services/appserver';
import {DomSanitizer} from '@angular/platform-browser';
import {WebIntent} from '@ionic-native/web-intent';


@Component({
  selector: 'page-statue',
  templateUrl: 'link-statue.html'
})
export class LinkStatuePage {

  private section: any = null;

  constructor(private wIntent: WebIntent, private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, public server: AppServer) {
    this.section = this.navParams.get('section');
    this.section.allTexts = [];
    this.createHyperlinksOfSection();
  }

  loadChapterSection(chap, sec) {
    let self = this;
    (self.server).getSection(chap, sec).subscribe(result => {
      let jsonRes = result.json();
      self.navCtrl.push(LinkStatuePage, {section: jsonRes[0]});
    });
  }

  shoutMe(chp) {
    let vals = chp.split("-");
    if (vals.length > 1) {
      let chap = vals[0].substring(1);
      let sec = vals[1];
      this.loadChapterSection(chap, sec);
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

  shareStatue(){
    (<any>window).shareText(this.section.url);
  }

  createHyperlinksOfSection() {
    let self = this;
    let regEx = /§\d+-\d+(\.\d+)*/;
    this.section.allTexts = [];
    for (var a = 0; a < this.section.text.length; a++) {
      let txt = this.section.text[a];
      txt = txt.replace(regEx, "<a class='link-statue' chapter-hyper=\"$&\" onclick=\"callFromLink('$&');\">$&</a>");
      this.section.allTexts.push(txt);
    }
  }

  addToBookmark() {
    this.server.addToBookmark(this.section);
    this.section.bookmarked = true;
  }

  removeFromBookmark() {
    this.server.removeFromBookmark(this.section);
    this.section.bookmarked = false;
  }
}
