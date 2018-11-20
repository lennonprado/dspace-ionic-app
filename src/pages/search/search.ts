import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';
import { AlertController } from 'ionic-angular';
import { SearchType } from '../search/SearchType';
import { ItemPage } from '../item/item'

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  busqueda : any[] = [];

  query: string = '';

  field: string = 'dc.title';
  
  offset = 0;

  noMore = false;

  spinner = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {}
  
  goToItem(item){
    this.navCtrl.push(ItemPage,item);
  }

  onCancelSearch(event){
    this.offset=0;
    this.busqueda = [];
    this.query = '';
    this.noMore = false;
  }

  searchQuery(){
    



    this.offset=0;
    this.beuService.search(this.query,this.field,this.offset).subscribe( 
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

  searchMore(){
    if(!this.noMore){
      this.spinner = true;
      if(this.busqueda.length > 0){
        this.offset=this.offset + 10;
      }
      this.beuService.search(this.query,this.field,this.offset).subscribe( 
        (data : SearchType ) =>{ 
          this.busqueda = this.busqueda.concat(data.items);
          if(data.items.length < 10)
            this.noMore = true;
          this.spinner = false;
      });
    }
  }

}
