import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { SERVER_URL } from "../../config";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as Bcryptjs from "bcryptjs";

let apiUrl = SERVER_URL;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  empresas: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
  }

  login(values: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Validando datos...'

    });
    loading.present();
    Bcryptjs.hash(values.password, 10).then((pass) => {
      //      values.password=pass;
      //console.log(pass);
      this.authService.login(values).finally(() => {
        loading.dismiss();
      }).subscribe(() => {

      }, error => {
        let message: string;
        if (error.status && error.status === 401) {
          message = 'Usuario y/o contraseña incorrecto';
        }
        else {
          message = `Unexpected error: ${error.statusText}`;
        }
        this.toastmsj(message);
        console.log(error);
      });
    }, err => {
      console.log(err);
      loading.dismiss();
    })
  }

  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 10000,
      position: 'bottom'
    });
    toast.present();
  }
}