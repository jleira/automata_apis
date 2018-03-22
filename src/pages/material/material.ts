import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevacategoriaPage } from './nuevacategoria';

/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material',
  templateUrl: 'material.html',
})
export class MaterialPage {

  creacionhabilitada=false;
  habilitarcategoria=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let mydata=this.navParams.get('mydata');
    console.log(mydata);
     if(mydata.perfiles.indexOf(6)>-1){
      this.habilitarcategoria=true;
    }
    if(mydata.perfiles.indexOf(6)>-1 || mydata.perfiles.indexOf(7)>-1 || mydata.perfiles.indexOf(8)>-1){
      this.creacionhabilitada=true;
    }
  }

  agregarategoria(){
      this.navCtrl.push(NuevacategoriaPage,{'caso':1});
    }
    categorias(){
      this.navCtrl.push(NuevacategoriaPage,{'caso':2});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
  }

}
