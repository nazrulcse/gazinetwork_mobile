import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
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

  constructor(public nav: NavController, public appCtrl: App, private loading: LoadingController, private storage: Storage, private events: Events) {
   
  }

  ionViewDidLoad() {
    this.storage.set('auth', false);
    this.events.publish('auth:changed', false);
  }
}
