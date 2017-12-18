import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import { ProfilePage } from '../../pages/profile/profile';
import {NavbarComponent} from '../../components/navbar/navbar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerCredentials = { customer_id: '', password: '', remember: false };
  LOGIN_URL = 'http://www.gazinetwork.one/api/v1/login'
  contentHeader = new Headers({"Content-Type": "application/json"});
  @ViewChild('fcustomer_id') email: any;
  error: string;
  pages: Array<{title: string, component: any, icon: string}>;
  loader: any;

  constructor(public nav: NavController, private events: Events, private http: Http, private storage: Storage, private navbar: NavbarComponent, private loading: LoadingController) {
    navbar.pages = [{ title: 'Profile', component: ProfilePage }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  login(): void {
    this.loader = this.loading.create({
      content: "Loading..."
    }); 
    this.loader.present();
  	this.http.post(this.LOGIN_URL, JSON.stringify(this.registerCredentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader.dismiss();
        	this.authSuccess(data.success);
        },
        err =>  { 
        	this.error = err;
          this.loader.dismiss();
        }
      );
  }

  authSuccess(res) {
    let event = this.events;
    let auth = {token: res.token, type: res.type, login_id: res.login_id, id: res.id, name: res.name};
    this.storage.set('auth', auth);
    setTimeout(function() {
       event.publish('auth:changed', auth);
    }, 500);
  }

}
    