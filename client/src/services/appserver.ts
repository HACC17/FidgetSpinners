/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
//import {Observable} from 'rxjs/Rx';
//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppServer {

  //private BASE_URL="http://192.168.8.107:9100/optdin/api/";
  private BASE_URL = "https://hrs.diblii.com/api/";
  //https://hrs.diblii.com/api/chapter/1/section/

  // Resolve HTTP using the constructor
  constructor(private http: Http) {
  }

  getLocalJsonTree() {
    let url = "assets/hrstree.txt";
    return this.http.get(url);
  }

  getSectionsForChapter(chapNum) {
    let url = this.BASE_URL + "chapter/" + chapNum + "/section/";
    return this.http.get(url);
  }

  getStatute(id) {
    let url = this.BASE_URL + "id?val=" + id;
    return this.http.get(url);
  }

  getSection(chapNum, secNum): any {
    let url = this.BASE_URL + "chapter/" + chapNum + "/section/" + secNum;
    return this.http.get(url);
  }

  getSearchQuery(query, length) {
    let url = this.BASE_URL + "statutes/search?input=" + query + "&size=" + length;
    return this.http.get(url);
  }

  isInBookmark(sect) {
    let js = (<any>window).localStorage.hrsSectionBookmark;
    if (!js) {
      js = [];
    } else {
      js = JSON.parse(js);
    }
    for (var a = 0; a < js.length; a++) {
      if (js[a].section == sect.section && js[a].chapter == sect.chapter) {
        return true;
      }
    }
    return false;
  }

  addToBookmark(sect) {
    let js = (<any>window).localStorage.hrsSectionBookmark;
    if (!js) {
      js = [];
    } else {
      js = JSON.parse(js);
    }
    js.push(sect);
    (<any>window).localStorage.hrsSectionBookmark = JSON.stringify(js);
  }

  removeFromBookmark(sect) {
    let js = (<any>window).localStorage.hrsSectionBookmark;
    if (!js) {
      js = [];
    } else {
      js = JSON.parse(js);
    }
    for (var a = 0; a < js.length; a++) {
      if (js[a].section == sect.section && js[a].chapter == sect.chapter) {
        js.splice(a, 1);
      }
    }
    (<any>window).localStorage.hrsSectionBookmark = JSON.stringify(js);
  }

  getAllBookmarks() {
    let js = (<any>window).localStorage.hrsSectionBookmark;
    if (!js) {
      js = [];
    } else {
      js = JSON.parse(js);
    }
    return js;
  }
}
