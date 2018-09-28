import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BeuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeuService {

  apiUrl = 'http://beu.extension.unicen.edu.ar/rest/';

  constructor(public http: HttpClient) {}

  getComunidades() {    
    return this.http.get( this.apiUrl + 'communities/');
  }

  getColecciones(id) {
    return this.http.get( this.apiUrl + 'communities/' + id + '/collections');
  }

  getItems(id) {
    return this.http.get( this.apiUrl + 'collections/' + id + '/items/');
  }

  getItem(id) {
    return this.http.get( this.apiUrl + 'items/' + id + '/metadata');
  }
  
  getBitstreams(id) {
    return this.http.get( this.apiUrl + 'items/' + id + '/bitstreams');
  }

  search(query) {
    const myparam =  {
                      "key": "dc.title",
                      "value": query
                    }

    return this.http.post( this.apiUrl + 'items/find-by-metadata-field', myparam);
  }
  
  
  


}
