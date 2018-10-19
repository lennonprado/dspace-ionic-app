import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { CollectionsPage } from '../pages/collections/collections'
import { ItemsPage } from '../pages/items/items';
import { ItemPage } from '../pages/item/item';
import { Splash } from '../pages/splash/splash';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BeuService } from '../providers/beu-service/beu-service'



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    CollectionsPage,
    ItemsPage,
    ItemPage,
    Splash
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
     
    }
  ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    CollectionsPage,
    ItemsPage,
    ItemPage,
    Splash
  ],
  providers: [
    BeuService,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
