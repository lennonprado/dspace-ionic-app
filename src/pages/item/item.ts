import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeuService } from '../../providers/beu-service/beu-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

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


  title               = '';
  date                = '';
  rights              = '';
  format              = '';
  language            = '';
  item        : any[] = [];
  autores     : any[] = [];
  description : any[] = [];
  publisher   : any[] = [];
  tags        : any[] = [];
  bitstreams  : any[] = [];
  spinner             = false;
  fileTransfer: FileTransferObject;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public beuService: BeuService,
    public iab : InAppBrowser,
    private transfer: FileTransfer, 
    private file: File,
    private fileOpener: FileOpener,
    public alertCtrl: AlertController 
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
      ( error ) => { 
        const alert = this.alertCtrl.create({
          title: 'Alerta',
          subTitle: 'Hubo un problema para encontrar el artículo.',
          buttons: ['OK']
        });
        alert.present();
       } 
    ); 
  }

  getBitstreams(id){
    this.beuService.getBitstreams(id).subscribe(
      ( data : any[] )  =>  { this.bitstreams = data;
       },
      ( error ) =>  { 
        
        const alert = this.alertCtrl.create({
          title: 'Alerta',
          subTitle: 'Hubo un problema para encontrar archivos asociados al artículo.',
          buttons: ['OK']
        });
        alert.present();

       }
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

  getDescription(data : any) : any{
    const result = this.item.find(function(element){
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
   return result.retrieveLink;
  }

  showOnBrowser(){
    this.spinner = true;
    const retrieveLink = 'http://beu.extension.unicen.edu.ar' + this.getFile();
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.download(retrieveLink, this.file.dataDirectory + this.navParams.data.uuid  +'.pdf').then((entry) => { 
      this.fileOpener.open(entry.toURL(), 'application/pdf')
      .then(() => { 
        this.spinner = false; 
      })
      .catch(e => {  
        const alert = this.alertCtrl.create({
          title: 'Alerta',
          subTitle: 'Hubo un problema para descargar el archivo.',
          buttons: ['OK']
        });
        alert.present();
      });
    }, (error) => {
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Hubo un problema para encontrar el archivo en el servidor.',
        buttons: ['OK']
      });
      alert.present();
    });

  }

}
