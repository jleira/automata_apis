import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { MaterialProvider } from '../../providers/material/material';


@Component({
  selector: 'page-nuevacategoria',
  templateUrl: 'nuevacategoria.html',
})
export class NuevacategoriaPage {
  caso: number;
  categoriaid;
  items;
  Nombre;
  Referencia;
  Descripcion;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private materialservice: MaterialProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.caso = navParams.get('caso');
    if (this.caso > 2) {
      let item = navParams.get('item');
      if (item) {
        this.categoriaid = item.id_categoria;
        this.Nombre = item.nombre;
        this.Referencia = item.referencia;
        this.Descripcion = item.descripcion;
        console.log('nombre', this.Nombre);
      }
      console.log('items', item);
    }

    if (this.caso == 2) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: `Cargando informacion`
      });
      loading.present();

      this.materialservice.categorias(0).subscribe((items) => {
        console.log('ok', items.json());
        if (items.json()) {
          this.items = items.json();
          console.log('lleno', items.json());
        } else {
          console.log('vacio', items.json());
        }
        loading.dismiss();
      }, err => {
        console.log('err', err);
        loading.dismiss();

      });
    }
  }

  agregarategoria() {
    console.log('material agregar');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad nuevacategoria');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  guardarcategoria(valores) {
    if (this.categoriaid) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: `Editando Categoria ${this.Nombre}`
      });
      loading.present();
      valores.id = this.categoriaid;
      this.materialservice.editarcategoria(valores).finally(() => {
        loading.dismiss();
      }).subscribe((ok) => {
        console.log(ok);
        this.toastmsj(ok['_body']);
      }, err => {
        console.log('err', err);
        console.log(err.json());
        if (err.status == 422) {
          this.toastmsj(`Ha ocurrido un error, ${err.json().nombre[0]}`);
        } else {
          this.toastmsj(`Ha ocurrido un error, estado http ${err.status}, contactese con el administrador del servicio`);
        }
      });

    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: `Guardando Categoria ${valores.nombre}`
      });
      loading.present();

      this.materialservice.guardarcategoria(valores).finally(() => {
        loading.dismiss();
      }).subscribe((ok) => {
        console.log(ok);
        this.toastmsj(ok['_body']);
        this.dismiss();
      }, err => {
        console.log('err', err);
        console.log(err.json());
        if (err.status == 422) {
          this.toastmsj(`Ha ocurrido un error, ${err.json().nombre[0]}`);
        } else {
          this.toastmsj(`Ha ocurrido un error, estado http ${err.status}, contactese con el administrador del servicio`);
        }
      });

    }
  }
  toastmsj(msj: string) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 10000,
      position: 'bottom'
    });
    toast.present();
  }
  doRefresh(refresher) {
    let cantidad=0;
    if(this.items){
      cantidad=this.items[this.items.length-1]['id_categoria'];
    }
    console.log(cantidad);
    this.materialservice.categorias(cantidad).subscribe((newitems) => {
      if(newitems.json()){
        newitems.json().forEach(element => {
          this.items.unshift(element);       
        });
      }
      console.log(this.items);
      refresher.complete();
    }, err => {
      refresher.complete();
    })
  }
  editarcategoria(item) {
    this.navCtrl.push(NuevacategoriaPage, { 'caso': 3, 'item': item });
  }
  abrirdetalles(item) {
    this.navCtrl.push(NuevacategoriaPage, { 'caso': 4, 'item': item });
  }
}
