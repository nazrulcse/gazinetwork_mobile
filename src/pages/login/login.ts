import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  registerCredentials = { email: '', password: '', remember: false };
  // LOGIN_URL = 'http://gazinetwork.one/api/v1/login'
  LOGIN_URL = 'http://9ccdb0a5.ngrok.io/api/v1/login'
  contentHeader = new Headers({"Content-Type": "application/json"});
  @ViewChild('email') email: any;
  error: string;
  pages: Array<{title: string, component: any}>;

  constructor(public nav: NavController, private http: Http, private storage: Storage, private navbar: NavbarComponent) {
    navbar.pages = [{ title: 'Profile', component: ProfilePage }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  login(): void {
  	this.http.post(this.LOGIN_URL, JSON.stringify(this.registerCredentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
        	this.authSuccess(data.success);
          window.location.reload();
        },
        err =>  { 
        	this.error = err;
        }
      );
  }

  authSuccess(res) {
    let auth = {token: res.token, type: res.type, id: res.id};
    this.storage.set('auth', auth);
  }

}
    