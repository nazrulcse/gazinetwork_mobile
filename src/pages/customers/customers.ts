import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {CustomerProvider} from '../../providers/customer/customer';
import {CustomerPage} from '../../pages/customer/customer';

/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  customers = [];
  error: any;
  loader: any;
  query_param = '';
  page = 1;
  reActiveInfinite: any;
  constructor(public navCtrl: NavController, public loading: LoadingController, public navParams: NavParams, private customerService: CustomerProvider) {
    this.get_customers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  getcustomer(id) {
  	this.navCtrl.push(CustomerPage, {id: id});
  }

  doInfinite(infiniteScroll) {
    this.page += 1;
    this.reActiveInfinite = infiniteScroll;
    this.customerService.all(this.page, this.query_param).subscribe(
      data => {
        if (data.length > 0) {
          for (let customer of data) {
            this.customers.push(customer);
          }
          infiniteScroll.complete();
        }
        else {
          infiniteScroll.enable(false);
        }
      },
      err => {
        this.error = err;
        this.page -= 1;
      }
    );
  }

  searchCustomer() {
    this.page = 1;
    this.get_customers();
    if(this.reActiveInfinite) {
      this.reActiveInfinite.enable(true);
    }
  }

  search_cancel(event) {
    console.log('cancelling');
    this.page = 1;
    this.query_param = '';
    this.get_customers();
    if(this.reActiveInfinite) {
      this.reActiveInfinite.enable(true);
    }
  }

  get_customers() {
    this.custom_loading(true);
  	this.customerService.all(this.page, this.query_param).subscribe(
        data => {
          this.customers = data;
          this.custom_loading(false);
        },
        err =>  { 
          this.error = err;
          this.custom_loading(false);
        }
      );
  }

  custom_loading(flag, message = 'Loading...') {
    if(flag) {
      this.loader = this.loading.create({
         content: message
      });
      this.loader.present();
    }
    else {
      this.loader.dismiss();
    }
 }
}
