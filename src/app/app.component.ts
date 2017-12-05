import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { ComplainPage } from '../pages/complain/complain';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';
import { PaymentPage } from '../pages/payments/payment';
import {Storage} from "@ionic/storage";
import {NavbarComponent} from '../components/navbar/navbar';
import { CustomersPage } from '../pages/customers/customers';
import { InvoicesPage } from '../pages/invoices/invoices';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  customer_pages = [
    { title: 'Profile', component: ProfilePage, icon: 'contact' },
    { title: 'Payment', component: PaymentPage, icon: 'cash' },
    { title: 'Contact', component: ContactPage, icon: 'call' },
    { title: 'Complain', component: ComplainPage, icon: 'alert' },
  ]
  agent_pages = [
    { title: 'Profile', component: ProfilePage, icon: 'contact' },
    { title: 'Customers', component: CustomersPage, icon: 'people' },
    { title: 'Billings', component: InvoicesPage, icon: 'logo-usd' },
    { title: 'Payment', component: PaymentPage, icon: 'cash' },
  ]
  loader: any;
  user = {name: 'Anonomys', id: 'Anonomys', type: ''};
  constructor(public platform: Platform, private loading: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.loader = this.loading.create({
      content: "Loading..."
    });  
    this.loader.present();

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' }
    ];
  }

  initializeApp() {
    this.storage.get('auth').then((auth) => {
      if(auth) {
        this.user.name = auth.name;
        this.user.id = auth.login_id;
        this.user.type = auth.type;
        if(auth.type == 'customer') {
          this.pages = this.pages.concat(this.customer_pages);
          this.rootPage = ProfilePage;
        }
        else {
          this.pages = this.pages.concat(this.customer_pages);
          this.rootPage = CustomersPage;
        }
        this.pages.push({ title: 'Logout', component: LogoutPage, icon: 'log-out' });
      }
      else {
        this.pages.push({ title: 'Login', component: LoginPage, icon: 'log-in' });
        this.rootPage = LoginPage;
      }
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loader.dismiss();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
