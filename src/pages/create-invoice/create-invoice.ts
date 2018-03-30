import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { InvoicePage } from '../../pages/invoice/invoice';
import { OtherIncomesPage } from '../other-incomes/other-incomes';

/**
 * Generated class for the CreateInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-invoice',
  templateUrl: 'create-invoice.html',
})
export class CreateInvoicePage {
  invoice_form = { other_invoice_title: '', invoice_amount: '', invoice_date: '' }
  localDate = new Date();
  loader: any;
  error: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private invoiceService: InvoiceProvider, public loading: LoadingController) {
    console.log(this.localDate);
    console.log(this.localDate.toISOString());
    this.invoice_form.invoice_date = this.format_date(this.localDate);//.toISOString().slice(0, 10);
    console.log(this.invoice_form);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInvoicePage');
  }

  setDate($event) {
    this.invoice_form.invoice_date = this.format_date($event);
  }

  format_date(date) {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  }

  invoice_submit() {
    console.log(this.invoice_form);
     let nav = this.navCtrl;
     this.loader = this.loading.create({
       content: "Creating Invoice..."
     }); 
     this.loader.present();
     this.invoiceService.createInvoice(this.invoice_form).subscribe(
         data => {
           this.loader.dismiss();
           console.log(data);
           let response = data.response;
           if(data.meta.status == 200) {
             this.success = data.response.message;
             this.error = '';
             setTimeout(function() {
               console.log('success');
               nav.setRoot(OtherIncomesPage, {id: response.invoice_id});
             }, 1000);
           }
           else {
             this.success = '';
             this.error = data.response.message;
           }
         },
         err =>  { 
           this.error = err;
           this.success = '';
           this.loader.dismiss();
       }
     );
  }

}
