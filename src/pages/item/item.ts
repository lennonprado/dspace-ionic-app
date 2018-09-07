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
    this.getItems(this.item.uuid);
    this.getBitstreams(this.item.uuid);
  }

  goBack() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
 }

  getItems(id){
    this.beuService.getItem(id).subscribe(
      ( data : any )  => { this.item = data; console.log(data) },
      ( error ) => { console.error(error); } 
    ); 
  }

  getBitstreams(id){
    this.beuService.getBitstreams(id).subscribe(
      ( data : any[] )  =>  { this.bitstreams = data; console.log(data); },
      ( error ) =>  { console.error(error); }
    );
  }

  /** Variables para template */

  getItemMetadataEntry(key) : string{
    let link = this.bitstreams.find(function(element){
        return element.key === key;
    },key);
    return link.value;
  }
  


}
