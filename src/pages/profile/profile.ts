import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {NavbarComponent} from '../../components/navbar/navbar';
import {HomePage} from '../../pages/home/home';
import {ContactPage} from '../../pages/contact/contact';
import {ComplainPage} from '../../pages/complain/complain';
import {LoginPage} from '../../pages/login/login';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;
  PROFILE_URL = 'http://1a88a2f8.ngrok.io/api/v1/profile'
  error: any;
  loader: any;
  customer_invoices = [];
  is_customer = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private navbar: NavbarComponent, private http: Http, private storage: Storage, private loading: LoadingController) {
    this.profile = {name: 'Md Nazrul Islam'};
    this.loader = this.loading.create({
      content: "Loading..."
    }); 
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.is_customer = (auth.type == 'customer')
      }
    });
    this.loader.present();
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.userProfile(auth);
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  ionViewDidLoad() {
    this.profile = {name: 'Md Nazrul Islam'};
  }

  userProfile(auth) {
    let contentHeader = new Headers({"Content-Type": "application/json",  'Authorization': 'Bearer ' + auth.token,});
    this.http.post(this.PROFILE_URL, JSON.stringify({token: auth.token}), { headers: contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.profile = data.success;
          this.customer_invoices = data.invoices;
          this.loader.dismiss();
        },
        err =>  { 
          this.error = err;
          this.loader.dismiss();
        }
      );
  }

  openContact() {
    this.navCtrl.push(ContactPage);
  }

  openComplain() {
    this.navCtrl.push(ComplainPage);
  }

}
