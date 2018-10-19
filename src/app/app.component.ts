import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { CollectionsPage } from '../pages/collections/collections';

import { BeuService } from '../providers/beu-service/beu-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  aboutPage: any = AboutPage;
  comunidades = [];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public beuService: BeuService
  ){

    platform.ready().then(() => {
      this.initializeApp();
      statusBar.styleDefault();
      splashScreen.show(); // REMOVE THIS!
    });

  }

  initializeApp() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      //  this.splashScreen.hide();

      this.beuService.getComunidades()
      .subscribe(
        (data: any[]) => { // Success
          this.comunidades = data;
        },
        (error) =>{
          console.log('fallo aca en la home', error);
        }
      )

  }

  
  goToPage(item){
    this.nav.push(CollectionsPage,item);
  }
  
  goToIndex(){
    this.nav.setRoot(this.rootPage);
  }

  goToAbout(){
    this.nav.push(this.aboutPage);
  }


}
