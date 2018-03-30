import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { InvoicePage } from '../invoice/invoice';
import { OtherIncomePage } from '../other-income/other-income';

/**
 * Generated class for the OtherIncomesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-incomes',
  templateUrl: 'other-incomes.html',
})
export class OtherIncomesPage {
  otherIncomes = [];
  error: any;
  loader: any;
  page = 1;
  reActiveInfinite: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private invoiceService: InvoiceProvider, private loading: LoadingController) {
    this.get_other_incomes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherIncomesPage');
  }

  getOtherIncome(id) {
  	this.navCtrl.push(OtherIncomePage, {id: id});
  }

  get_other_incomes() {
    this.custom_loading(true);
    this.invoiceService.getOtherIncomes(this.page).subscribe(
      data => {
        console.log(data);
        this.custom_loading(false);
        this.otherIncomes = data;
      },
      err => {
        this.error = err;
        this.custom_loading(false);
      }
    );
  }

  doInfinite(infiniteScroll) {
    this.page += 1;
    this.reActiveInfinite = infiniteScroll;
    this.invoiceService.getOtherIncomes(this.page).subscribe(
      data => {
        if (data.length > 0) {
          for (let other_income of data) {
            this.otherIncomes.push(other_income);
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

  custom_loading(flag, message = 'Loading...') {
    if (flag) {
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
