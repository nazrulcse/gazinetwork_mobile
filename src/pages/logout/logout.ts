import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {Storage} from "@ionic/storage";
import {App} from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public nav: NavController, public navParams: NavParams, private loading: LoadingController, private storage: Storage, private app: App) {
   
  }

  ionViewDidLoad() {
    window.localStorage.clear();
    this.storage.clear();
    window.location.reload();
    this.loading.create({
      content: 'Loading...'
    });
    this.nav.setRoot(LoginPage);
  }
}
