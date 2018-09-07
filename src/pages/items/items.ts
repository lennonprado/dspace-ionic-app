import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';
import { ItemPage } from '../item/item';

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

  items = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService 
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
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  goBack() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
 }


}
