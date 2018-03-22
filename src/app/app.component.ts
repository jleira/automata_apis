import { Component, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage} from '../pages/login/login';
import { MaterialPage} from '../pages/material/material';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Storage} from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  datospersonales:any;
  rootPage: any = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    private storage: Storage,
  ) {
  this.pages = [
    { title: 'Home', component: HomePage },
    { title: 'List', component: ListPage }
  ];


    this.authService.authUser.subscribe(jwt => {
      if (jwt) {
        this.storage.get('mydata').then((mydata)=>{
          mydata=JSON.parse(mydata);
          let perfiles=mydata.perfiles.split(",").map(Number);
          mydata.perfiles=perfiles;
          this.datospersonales=mydata;    
          if(perfiles.indexOf(6)>-1 || perfiles.indexOf(7)>-1 || perfiles.indexOf(8)>-1){
            let newpage={title: 'Materiales', component: MaterialPage}
            this.pages = [
              { title: 'Home', component: HomePage },
              { title: 'List', component: ListPage },
              newpage
            ];

          }else{
            this.pages = [
              { title: 'Home', component: HomePage },
              { title: 'List', component: ListPage }
            ];
          
          }
          this.rootPage = HomePage;     
        })
       }
      else {
        this.rootPage = LoginPage;
      }
    });
    authService.checkLogin();
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    console.log(this.datospersonales);
    this.nav.setRoot(page.component,{'mydata':this.datospersonales});
  }
}
