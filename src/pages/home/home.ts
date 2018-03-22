import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  empresa:string;
  mydata:any;
  constructor(public navCtrl: NavController,private navParams: NavParams, private authService:AuthServiceProvider, private storage: Storage) {
    this.mydata=navParams.get('mydata');
    if(this.mydata){
      console.log('mis datoss',this.mydata);
      this.empresa=this.mydata.empresa;
    }else{
      storage.get('mydata').then((data)=>{
        console.log('data',data);
        this.mydata=JSON.parse(data);
        this.empresa=this.mydata.empresa;
      }).catch((err)=>{console.log(err)});         
    }
    storage.get('jwt').then((data)=>{
      console.log('data',data);
    });         

  }
  logout(){
    this.authService.logout();   
  }


}
