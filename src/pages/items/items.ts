import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';
import { ItemPage } from '../item/item';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  comunidad;

  spinner = true;

  items = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService,
    public alertCtrl: AlertController 
 
  ) {
    this.comunidad = navParams.data;    
  }
 
  goToPage(item){
    this.navCtrl.push(ItemPage,item);
  }

  ionViewDidLoad(){
    this.beuService.getItems(this.comunidad.uuid)
    .subscribe(
      (data: any[]) => { // Success
        this.items = data;
        this.spinner = false;        
      },
      (error) =>{
       
        const alert = this.alertCtrl.create({
          title: 'Alerta',
          subTitle: 'Hubo un problema para cargar la lista de articulos de la colección.',
          buttons: ['OK']
        });
        alert.present();

      }
    )
  }

  goBack() {
    this.navCtrl.pop();
 }


}
