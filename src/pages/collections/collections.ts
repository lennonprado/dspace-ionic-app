import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsPage } from '../items/items';
import { BeuService } from '../../providers/beu-service/beu-service';
/**
 * Generated class for the CollectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html',
})
export class CollectionsPage {

  comunidad;
  colecciones = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public beuService: BeuService
  ) {

    this.comunidad = navParams.data;
   
  }

  goToPage(coleccion){
    this.navCtrl.push(ItemsPage,coleccion);
  }

  ionViewDidLoad(){
    this.beuService.getColecciones(this.comunidad.uuid)
    .subscribe(
      (data: any[]) => { // Success
        this.colecciones = data;
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  goBack() {
    this.navCtrl.pop();
 }

}
