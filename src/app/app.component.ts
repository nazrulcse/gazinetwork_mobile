import { Component, ViewChild, Input  } from '@angular/core';
import { Nav, Platform, LoadingController, Events, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Headers, Http} from "@angular/http";

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
import { ExpensePage } from '../pages/expense/expense';
import { CreateCustomerPage } from '../pages/create-customer/create-customer';
import { CreateInvoicePage } from '../pages/create-invoice/create-invoice';
import { OtherIncomesPage } from '../pages/other-incomes/other-incomes';
import { CreateExpensePage } from '../pages/create-expense/create-expense';
import { ExpensesPage } from '../pages/expenses/expenses';

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
    { title: 'Expenses', component: ExpensesPage, icon: 'pricetag' },
    { title: 'Create Expense', component: CreateExpensePage, icon: 'pricetag' },
    { title: 'Create Customer', component: CreateCustomerPage, icon: 'people'},
    { title: 'Other Income Invoices', component: OtherIncomesPage, icon: 'logo-usd'},
    { title: 'Create Other Income', component: CreateInvoicePage, icon: 'logo-usd'}
  ]
  loader: any;
  user = {name: 'Anonomys', id: 'Anonomys', type: ''};
  announcements: Array<any>;
  constructor(public platform: Platform, 
    public events: Events, 
    private loading: LoadingController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private storage: Storage,
    private http: Http,
    private toastCtrl: ToastController) {
    this.loader = this.loading.create({
      content: "Loading..."
    });  
    this.loader.present();
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' }
    ];
    this.initializeApp();

    this.events.subscribe('auth:changed', auth => {
         this.updateMenu(auth);
    });

    this.loadAnnouncement();
  }

  updateMenu(auth) {
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' }
    ];
    if(auth) {
        this.user.name = auth.name;
        this.user.id = auth.login_id;
        this.user.type = auth.type;
        if(auth.type == 'customer') {
          this.pages = this.pages.concat(this.customer_pages);
          this.rootPage = HomePage;
        }
        else {
          this.pages = this.pages.concat(this.agent_pages);
          this.rootPage = HomePage;
        }
        this.pages.push({ title: 'Logout', component: LogoutPage, icon: 'log-out' });
      }
    else {
        this.pages.push({ title: 'Login', component: LoginPage, icon: 'log-in' });
        this.user = {name: 'Anonomys', id: 'Anonomys', type: ''}
        this.rootPage = LoginPage;
      }
  }

  initializeApp() {
    this.storage.get('auth').then((auth) => {
      this.updateMenu(auth);
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loader.dismiss();
    });
  }

  loadAnnouncement() {
    this.http.get('http://www.gazinetwork.one/api/v1/announcements').map(res => res.json().response).subscribe(
        data => {
          this.announcements = data;
          for(let announcement of this.announcements) {
            this.toastCtrl.create({
               message: announcement.text,
               showCloseButton: true,
               position: 'top'
            }).present();
          }
        },
        err => {
           console.log(err);
        });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
