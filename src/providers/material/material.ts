import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { ReplaySubject, Observable } from "rxjs";
import { AuthHttp } from "angular2-jwt";
import { SERVER_URL } from "../../config";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the MaterialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterialProvider {

  constructor(private tokenhttp: AuthHttp) {
    console.log('Hello MaterialProvider Provider');
  }

  guardarcategoria(valores){
     return this.tokenhttp.post(`${SERVER_URL}api-material-guardarcategoria`, valores).map((ok)=>{
       return ok;
    },err=>{
      return err;
    })
   }
   editarcategoria(valores){
    return this.tokenhttp.post(`${SERVER_URL}api-material-editarcategoria`, valores).map((ok)=>{
      return ok;
   },err=>{
     return err;
   })
  }
   categorias(cantidad){
    return this.tokenhttp.get(`${SERVER_URL}api-material-categorias?cantidadinicial=${cantidad}`).map((ok)=>{
      return ok;
   },err=>{
     return err;
   })
    
   }


}
