import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionsPage } from '../collections/collections';
import { BeuService } from '../../providers/beu-service/beu-service';
/**
 * Generated class for the CommunitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-communities',
  templateUrl: 'communities.html',
})
export class CommunitiesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public beuService: BeuService
  ) {}

  comunidades = [];

  goToPage(item){

    console.log(item);
    
    this.navCtrl.setRoot(CollectionsPage,item);
  }

  ionViewDidLoad(){
    this.beuService.getComunidades()
    .subscribe(
      (data: any[]) => { // Success
        this.comunidades = data;
      },
      (error) =>{
        console.error(error);
      }
    )
  }


}
