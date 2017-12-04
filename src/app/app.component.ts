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
  pages: Array<{title: string, component: any}>;
  customer_pages = [
    { title: 'Profile', component: ProfilePage },
    { title: 'Payment', component: PaymentPage },
    { title: 'Contact', component: ContactPage },
    { title: 'Complain', component: ComplainPage },
  ]
  agent_pages = [
    { title: 'Profile', component: ProfilePage },
    { title: 'Customers', component: CustomersPage },
    { title: 'Billings', component: InvoicesPage },
    { title: 'Payment', component: PaymentPage },
  ]
  loader: any;
  
  constructor(public platform: Platform, private loading: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.loader = this.loading.create({
      content: "Loading..."
    });  
    this.loader.present();

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  initializeApp() {
    this.storage.get('auth').then((auth) => {
      if(auth) {
        if(auth.type == 'customer') {
          this.pages = this.pages.concat(this.agent_pages);
          this.rootPage = ProfilePage;
        }
        else {
          this.pages = this.pages.concat(this.agent_pages);
          this.rootPage = CustomersPage;
        }
        this.pages.push({ title: 'Logout', component: LogoutPage });
      }
      else {
        this.pages.push({ title: 'Login', component: LoginPage });
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
