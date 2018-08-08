import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { CommunitiesPage } from '../pages/communities/communities'
import { CollectionsPage } from '../pages/collections/collections'
import { ItemsPage } from '../pages/items/items';
import { ItemPage } from '../pages/item/item';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BeuService } from '../providers/beu-service/beu-service'



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    CommunitiesPage,
    CollectionsPage,
    ItemsPage,
    ItemPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    CommunitiesPage,
    CollectionsPage,
    ItemsPage,
    ItemPage
  ],
  providers: [
    BeuService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
