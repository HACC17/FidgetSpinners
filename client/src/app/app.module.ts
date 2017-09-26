import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { DivisionPage } from '../pages/division/division';
import { TitlePage } from '../pages/title/title';
import { ChapterPage } from '../pages/chapter/chapter';
import { SectionPage } from '../pages/section/section';
import { StatuePage } from '../pages/statue/statue';
import { LinkStatuePage } from '../pages/link-statue/link-statue';
import { ListPage } from '../pages/list/list';
import { LocationPage } from '../pages/location/location';

import { AppServer } from '../services/appserver';
import { cloudVisionService} from '../services/cloudVisionService'
import { locationService } from '../services/locationService'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WebIntent } from '@ionic-native/web-intent';
import { SettingsProvider } from '../providers/settings/settings';
import { BrowseProvider } from '../providers/browse/browse';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BookmarksPage,
    HelpPage,
    SettingsPage,
    SearchPage,
    DivisionPage,
    TitlePage,
    ChapterPage,
    SectionPage,
    StatuePage,
    LinkStatuePage,
    LocationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookmarksPage,
    HelpPage,
    SettingsPage,
    SearchPage,
    DivisionPage,
    TitlePage,
    ChapterPage,
    SectionPage,
    StatuePage,
    LinkStatuePage,
    LocationPage
  ],
  providers: [
    AppServer,
    cloudVisionService,
    locationService,
    WebIntent,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    BrowseProvider
  ]
})
export class AppModule {}
