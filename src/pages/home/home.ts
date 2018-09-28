import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CollectionsPage } from '../collections/collections';
import { BeuService } from '../../providers/beu-service/beu-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 comunidades = [];

  constructor(
    public navCtrl: NavController, 
    public beuService: BeuService
  ) {}

  goToPage(item){
    
    this.navCtrl.push(CollectionsPage,item);

  }

  ionViewDidLoad(){
    this.beuService.getComunidades()
    .subscribe(
      (data: any[]) => { // Success
        this.comunidades = data;
        console.log(data);
        
      },
      (error) =>{
        console.log('fallo aca');
        console.log(error);
        console.error(error);
      }
    )
  }


}
