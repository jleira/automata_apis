import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { SERVER_URL } from "../../config";


let apiUrl = SERVER_URL;

@Injectable()
export class AuthServiceProvider {

  authUser = new ReplaySubject<any>(1);
  constructor(
    public http: HttpClient,
    private storage: Storage
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }
  checkLogin() {
    this.storage.get('jwt').then(token => {
      this.authUser.next(token);
    });
  }
  login(values: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/auth/login
    `, values).map((resp) => {
        console.log(resp);
        this.storage.set('mydata',
        `{"empresa":"${resp['user']['empresa']}","perfiles":"${resp['user']['perfiles']}","name":"${resp['user']['name']}","email":"${resp['user']['email']}","nick":"${resp['user']['NICK']}"}`).then(() => {
           this.storage.set('jwt', resp['token']).then(() => {
             return this.authUser.next(resp['token']);
          })
        })
    
/*

 */      }, err => {
        if (err.status !== 401) {
          console.log(err);
        }
      })
  }
  logout() {
    this.storage.remove('jwt').then(() => {
      this.authUser.next(null);
    });
  }


}
