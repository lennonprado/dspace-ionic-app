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

  busqueda = [];

  query: string = '';
  
  offset = 0;

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

  searchMore(){
    this.spinner = true;
    if(this.query.length == 0){
      this.offset=this.offset+10;
    }
    this.beuService.search(this.query,this.offset).subscribe( 
      (data : any[] ) =>{ 
        this.busqueda = this.busqueda.concat(data.items);        
        this.spinner = false;
    });
  }
  onCancelSearch(event){
    this.offset=0;
    this.busqueda = [];
    this.query = '';
  }
  searchQuery(event){
    
    this.query = event.target.value;

    if(this.query.length == 0){
      this.offset=0;
    }
    
    this.beuService.search(this.query,this.offset).subscribe( 
      (data : any[] ) =>{ 
      this.busqueda = data.items;
      console.log(this.busqueda);
            
    });

  }

}
