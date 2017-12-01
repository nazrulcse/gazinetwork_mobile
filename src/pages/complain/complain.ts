import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import {LoginPage} from '../../pages/login/login';
import {ProfilePage} from '../../pages/profile/profile';

// @IonicPage()
@Component({
  selector: 'page-complain',
  templateUrl: 'complain.html'
})
export class ComplainPage {
  complain: any;
  COMPLAIN_URL = 'http://b900ee0b.ngrok.io/api/v1/complain/store'
  error: any;
  success: any;
  loader: any;
  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private loading: LoadingController) {
    this.complain = {subject: '', category: '', message: '', customer_id: ''}
    this.loader = this.loading.create({
      content: "Loading..."
    }); 
  }

  complain_submit()
  {
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.loader.present();
        this.sendComplain(auth);
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    })
  }

  sendComplain(auth) {
    let contentHeader = new Headers({"Content-Type": "application/json"});
    let nav = this.navCtrl;
    this.complain.customer_id = auth.id;
    this.http.post(this.COMPLAIN_URL, JSON.stringify(this.complain), { headers: contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader.dismiss();
          console.log(data);
          let response = data.response;
          if(data.status == 200) {
            this.success = response.message;
            setTimeout(function() {
              nav.push(ProfilePage)
            }, 5000);
          }
          else {
            this.error = response.message;
          }
        },
        err =>  { 
          this.error = err;
          this.loader.dismiss();
        }
      );  
  }
}
