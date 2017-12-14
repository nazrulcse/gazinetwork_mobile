import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InvoiceProvider} from '../../providers/invoice/invoice';
import {InvoicePage} from '../../pages/invoice/invoice';

/**
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  invoices: Array<any>;
  filter_invoices: Array<any>;
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private invoiceService: InvoiceProvider) {
  	invoiceService.all().subscribe(
        data => {
          this.invoices = data;
          this.filter_invoices = data;
        },
        err =>  { 
          this.error = err;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
  }

  getInvoice(invoice_id) {
    this.navCtrl.push(InvoicePage, {id: invoice_id});
  }

  initializeFilter() {
    this.invoices = this.filter_invoices;
  }

  searchInvoice(event) {
    this.initializeFilter();
    let value = event.target.value;
    console.log(this.invoices[0]);
    if (value && value.trim() != '') {
      this.invoices = this.invoices.filter((item) => {
        let name = item.name.toLowerCase(); 
        let mobile = item.mobile.toLowerCase();
        let customer = item.login_id.toLowerCase();
        let term = value.toLowerCase();
        return (name.indexOf(term) > -1 || mobile.indexOf(term) > -1 || customer.indexOf(term) > -1);
      });
    }
  }

}
