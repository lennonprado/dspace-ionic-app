import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CollectionsPage } from '../collections/collections';
import { BeuService } from '../../providers/beu-service/beu-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  comunidades = [];

  spinner = false;

  constructor(
    public navCtrl: NavController, 
    public beuService: BeuService,
    public alertCtrl: AlertController
  ) {}

  goToPage(item){
    this.navCtrl.push(CollectionsPage,item);
  }

  ionViewDidLoad(){
    this.spinner = true;
    this.beuService.getComunidades()
    .subscribe(
      (data: any[]) => { // Success
        this.comunidades = data;
        this.spinner = false;        
      },
      (error) =>{
        const alert = this.alertCtrl.create({
          title: 'Alerta',
          subTitle: 'Hubo un problema para cargar los datos.',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }


}


