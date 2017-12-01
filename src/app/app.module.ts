import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';
import { ContactPage } from '../pages/contact/contact';
import { ComplainPage } from '../pages/complain/complain';
import { PaymentPage } from '../pages/payments/payment';
import { CustomersPage } from '../pages/customers/customers';
import { CustomerPage } from '../pages/customer/customer';
import { InvoicesPage } from '../pages/invoices/invoices';
import { InvoicePage } from '../pages/invoice/invoice';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {NavbarComponent} from '../components/navbar/navbar';
import { CustomerProvider } from '../providers/customer/customer';
import { InvoiceProvider } from '../providers/invoice/invoice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    LogoutPage,
    NavbarComponent,
    ContactPage,
    ComplainPage,
    PaymentPage,
    CustomersPage,
    CustomerPage,
    InvoicesPage,
    InvoicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    LogoutPage,
    NavbarComponent,
    ContactPage,
    ComplainPage,
    PaymentPage,
    CustomersPage,
    CustomerPage,
    InvoicesPage,
    InvoicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    NavbarComponent,
    CustomerProvider,
    HttpClient,
    InvoiceProvider
  ]
})
export class AppModule {}
