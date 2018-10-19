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

  busqueda = [];

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
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  searchQuery(event){

    this.beuService.search(event.target.value).subscribe( 
      (data : any[] ) =>{ 
      this.busqueda = data;
      console.log(this.busqueda);
            
    });

  }

}
