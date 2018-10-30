import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CollectionsPage } from '../collections/collections';
import { BeuService } from '../../providers/beu-service/beu-service';
import { AlertController } from 'ionic-angular';
import { SearchType } from './SearchType';
import { ItemPage } from '../item/item'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  comunidades = [];

  busqueda : any[] = [];

  query: string = '';
  
  offset = 0;

  spinner = false;

  noMore = false;

  constructor(
    public navCtrl: NavController, 
    public beuService: BeuService,
    public alertCtrl: AlertController
  ) {}

  goToPage(item){
    this.navCtrl.push(CollectionsPage,item);
  }

  goToItem(item){
    this.navCtrl.push(ItemPage,item);
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

  searchMore(){
    if(!this.noMore){
      this.spinner = true;
      if(this.busqueda.length > 0){
        this.offset=this.offset + 10;
      }
      this.beuService.search(this.query,this.offset).subscribe( 
        (data : SearchType ) =>{ 
          this.busqueda = this.busqueda.concat(data.items);
          if(data.items.length < 10)
            this.noMore = true;
          this.spinner = false;
      });
    }
  }

  onCancelSearch(event){
    this.offset=0;
    this.busqueda = [];
    this.query = '';
    this.noMore = false;
  }

  searchQuery(event){
    this.query = event.target.value;
    this.offset=0;
    this.beuService.search(this.query,this.offset).subscribe( 
      (data : SearchType ) =>{ 
      this.busqueda = data.items;
      if(data.items.length === 10){
          this.noMore = false;      
      }      
      else{
        this.noMore = true;      
      }
    });
  }
}


