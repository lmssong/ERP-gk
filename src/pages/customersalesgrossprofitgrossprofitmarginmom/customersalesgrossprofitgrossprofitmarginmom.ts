import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';
import { CustomersalesgrossprofitgrossprofitmarginmomPovider } from '../../providers/customersalesgrossprofitgrossprofitmarginmom-povider'

@Component({
  selector: 'page-customersalesgrossprofitgrossprofitmarginmom',
  templateUrl: 'customersalesgrossprofitgrossprofitmarginmom.html'
})
export class CustomersalesgrossprofitgrossprofitmarginmomPage {

  day: Array<any> = [];

  public startDate: Date = new Date();
  public LaststartDate: Date = null;
  profit: any;
  productList: Array<any>;
  categoryList: Array<any>;// 
  categoryName: any;
  customerName: any;
  customerList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController, public navView: ViewController, public modalCtrl: ModalController, public toastCtrl: ToastController, public SalesProfitRateMonthProvider: CustomersalesgrossprofitgrossprofitmarginmomPovider) {
    this.LaststartDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
  }

  ionViewDidEnter() {
    //加载客户
    this.SalesProfitRateMonthProvider.loadGetCustomerList().then((data: any[]) => {
      if (data != undefined && data.length > 0)
        this.customerList = data;
      this.customerName = this.customerList[0].NAME;
    });
    this.loadProductList(this.startDate, this.customerName, this.categoryName);
  }
  searchs() {
    this.loadProductList(this.startDate, this.customerName, this.categoryName);
  }

  public eventStart(data: Date): void {
    this.startDate = data;
    this.LaststartDate = new Date(data.getFullYear(), (data.getMonth() - 1), data.getDate());
  }
  loadProductList(startDate, customerName, categoryName) {
    this.SalesProfitRateMonthProvider.loadSalesProfitRateMonthList(this.startDate, this.customerName).then(
      (data: any[]) => {
        this.productList = new Array<any>();
        for (var i = 0; i < data.length; i++) {
          var num = data[i].PROFIT_GROWTHRATE;
          var price = data[i].PRICE_GROWTHRATE;
          var rate = data[i].RATE_GROWTHRATE;
          this.productList.push({ STORE_NAME: data[i].STORE_NAME, PROFIT_GROWTHRATE: num, PRICE_GROWTHRATE: price, RATE_GROWTHRATE: rate });
        }
      }
    )
  }
}