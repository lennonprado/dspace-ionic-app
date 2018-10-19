import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  item = [];

  title               = '';
  autores     : any[] = [];
  date                = '';
  description : any[] = [];
  format              = '';
  language            = '';
  publisher   : any[] = [];
  rights              = '';
  tags        : any[] = [];

  bitstreams = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService,
    public iab : InAppBrowser 
  ) {}

  ionViewDidLoad(){
    this.getItems(this.navParams.data.uuid);
    this.getBitstreams(this.navParams.data.uuid);
  }

  goBack() {
    this.navCtrl.pop();
 }

  getItems(id){
    this.beuService.getItem(id).subscribe(
      ( data : any )  => { 
          this.item = data;
          this.autores = this.getAutores(data);
          this.title = this.getTitle(data);
          this.description = this.getDescription(data);
          this.tags = this.getTags(data);
        },
      ( error ) => { console.error(error); } 
    ); 
  }

  getBitstreams(id){
    this.beuService.getBitstreams(id).subscribe(
      ( data : any[] )  =>  { this.bitstreams = data; console.log(data);
       },
      ( error ) =>  { console.error(error); }
    );
  }

  /** Variables para template */

  getItemMetadataEntry(key) : any[] {
    const result = this.item.filter(function(element){
        return element.key === key;
    },key);
    
    return result;
  }
  
  getAutores(data : any[]) : any[]{
    const result = this.item.filter(function(element){
      return element.key === 'dc.creator';
    });
    return result;
  }

  getDescription(data : any[]) : any[]{
    const result = this.item.filter(function(element){
      return element.key === 'dc.description';
    });
    return result;
  }

  getTags(data : any[]) : any[]{
    const result = this.item.filter(function(element){
      return element.key === 'dc.subject';
    });
    return result;
  }

  getTitle(data : any[]) : string{
    const result = this.item.find(function(element){
      return element.key === 'dc.title';
    });
    return result.value;
  }

  getFile(){
    const result = this.bitstreams.find(function(element){
      return element.bundleName === "ORIGINAL";

    });

    this.beuService.getBitstreamsRetrive(result.uuid).subscribe(
      ( data : any[] )  =>  { console.log(data);
       },
      ( error ) =>  { console.error(error); }
    );

    //return result.retrieveLink;
  }

  showOnBrowser(){
    const url = 'https://docs.google.com/viewer?url=http://beu.extension.unicen.edu.ar';   
    
    //this.iab.create( url + this.getFile() );
    
    this.getFile();


  }

}
