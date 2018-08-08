import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item;

  bitstreams = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService 
  ) {

    this.item = navParams.data;

  }

  ionViewDidLoad(){
    this.beuService.getItem(this.item.uuid)
    .subscribe(
      (data: any[]) => { // Success
        this.bitstreams = data;
        console.log(this.item);
        
      },
      (error) =>{
        console.error(error);
      }
    )
  }

}
