import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import {LoginPage} from '../../pages/login/login';
import {ProfilePage} from '../../pages/profile/profile';

// @IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contact: any;
  CONTACT_URL = 'http://www.gazinetwork.one/api/v1/contacts/store'
  error: any;
  success: any;
  loader: any;

  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private loading: LoadingController) {
    this.contact = {subject: '', category: '', message: '', customer_id: ''}
    this.loader = this.loading.create({
      content: "Sending Contact..."
    }); 
  }

  contact_submit()
  {
    this.storage.get('auth').then((auth) => {
      if(auth) {
      	this.loader.present();
        this.sendContact(auth);
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    })
  }

  sendContact(auth) {
  	let contentHeader = new Headers({"Content-Type": "application/json"});
  	let nav = this.navCtrl;
  	this.contact.customer_id = auth.id;
    this.http.post(this.CONTACT_URL, JSON.stringify(this.contact), { headers: contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader.dismiss();
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
