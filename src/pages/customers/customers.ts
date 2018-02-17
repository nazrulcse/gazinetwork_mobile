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
  filter_customers = [];
  error: any;
  loader: any;
  constructor(public navCtrl: NavController, public loading: LoadingController, public navParams: NavParams, customerService: CustomerProvider) {
    this.loader = loading.create({
      content: 'Loading Customer...'
    })
    this.loader.present();
  	customerService.all().subscribe(
        data => {
          this.customers = data;
          this.filter_customers = data;
          this.loader.dismiss();
        },
        err =>  { 
          this.error = err;
          this.loader.dismiss();
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  getcustomer(id) {
  	this.navCtrl.push(CustomerPage, {id: id});
  }

  initializeFilter() {
    this.customers = this.filter_customers;
  }

  searchCustomer(event) {
    this.initializeFilter();
    let value = event.target.value;
    if (value && value.trim() != '') {
      this.customers = this.customers.filter((item) => {
        let name = item.name.toLowerCase(); 
        let mobile = item.mobile.toLowerCase();
        let customer = item.customer_id.toLowerCase();
        let term = value.toLowerCase();
        return (name.indexOf(term) > -1 || mobile.indexOf(term) > -1 || customer.indexOf(term) > -1);
      });
    }
  }
}
