import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class Splash {
 
  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen) {
    this.ionViewDidEnter();
  }
 

  ionViewDidEnter() {
 
    this.splashScreen.show();
    console.log('entro');
    
    setTimeout(() => {
      this.viewCtrl.dismiss();
      console.log('salio');
    }, 8000);
 
  }
 
}
