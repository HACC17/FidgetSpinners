import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StatuePage} from '../statue/statue';
import {AppServer} from '../../services/appserver';
import {Response} from '@angular/http';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private query: string;
  private allSections: any[] = null;
  private sections: any[] = null;
  private loadingSections: boolean = false;
  private section: any = null;
  private jsonResLength: number;

  constructor(public navCtrl: NavController, private navParams: NavParams, private server: AppServer) {
    this.query = navParams.get("query");
    this.loadSections();
  }

  goToSearch() {
    this.loadingSections = true;
    (this.server).getSearchQuery(this.query, 100).subscribe(
      res => this.sectionsSuccess(res), err => this.sectionsFailure(err)
    );
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

  openSection(sec, id) {
    var self = this;
    (self.server).getStatute(id)
      .map(response => response.json()).subscribe(result => {
      self.section = result

      setTimeout(function () {
        this.section = self.section[0];
        self.navCtrl.push(StatuePage, {section: this.section});
      }, 200);
    });
  }

  sectionsSuccess(res: Response) {
    this.allSections = [];
    this.sections = [];
    this.loadingSections = false;
    try {
      let jsonRes = res.json();
      this.jsonResLength = jsonRes.length;
      for (var a = 0; a < this.jsonResLength; a++) {
        let js=jsonRes[a];
        js.bookmarked=this.server.isInBookmark(js);
        this.allSections.push(js);
        if (a < 15) {
          this.sections[a] = this.allSections[a];
        }
      }
    } catch (e) {
      alert("Exception: " + e.message);
    }
  }

  sectionsFailure(error: any) {
    this.loadingSections = false;
    alert('Error: ' + JSON.stringify(error));
  }

  loadSections() {
    this.loadingSections = true;
    (this.server).getSearchQuery(this.query, 100).subscribe(
      res => this.sectionsSuccess(res), err => this.sectionsFailure(err)
    );
  }

}
