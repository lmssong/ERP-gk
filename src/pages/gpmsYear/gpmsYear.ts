import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { GpmsYearProviders } from "../../providers/gpmsYear-providers";

/*
  Generated class for the Customersales page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gpmsYear',
  templateUrl: 'gpmsYear.html'
})
export class GpmsYearPage {

  days: Array<any> = [];
  public startDate: Date = new Date()//new Date(new Date().getFullYear(), new Date().getMonth(),0);
  public LaststartDate: Date = null;//new Date(new Date().getFullYear()-1, new Date().getMonth(),0);
  //public startDate: Date =new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-6); 
  //public endDate: Date = new Date();
  productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();
  // public customerName:any;
  customerName: any;
  customerList: Array<any>;// 


  constructor(public navCtrl: NavController, public navView: ViewController, public modalCtrl: ModalController, public toastCtrl: ToastController, public gpmsYearProvider: GpmsYearProviders) {
    this.LaststartDate = this.GetUpperCycle(this.startDate, true);
  }

  //判断本月是否是最后一天，上周期也改为最后天
  public GetUpperCycle(endDate: Date, year: boolean) {
    var currentMonth = endDate.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    let monthLatDay = new Date(nextMonthFirstDay.getTime() - oneDay).getDate();
    var getDate: Date = null;

    if (monthLatDay == endDate.getDate()) {
      if (year) {
        getDate = new Date((endDate.getFullYear() - 1), (endDate.getMonth()+1), 0);
      } else {
        getDate = new Date((endDate.getFullYear()), endDate.getMonth(), 0);
      }
    } else {
      if (year) {
        getDate = new Date((endDate.getFullYear() - 1), endDate.getMonth(), endDate.getDate());
      } else {
        getDate = new Date((endDate.getFullYear()), (endDate.getMonth() - 1), endDate.getDate());
      }
    }
    return getDate;
  }
  ionViewDidEnter() {
    //加载客户
    this.gpmsYearProvider.loadGetCustomerList().then((data: any[]) => {
      if (data != undefined && data.length > 0)
        this.customerList = data;
      this.customerName = this.customerList[0].NAME;
    });
    this.loadProductList(this.startDate, this.customerName);
  }
  searchs() {
    this.loadProductList(this.startDate, this.customerName);
  }

  public eventStart(data: Date): void {
    this.startDate = data;
    this.LaststartDate = this.GetUpperCycle(this.startDate, true);
  }

  loadProductList(startDate, customerName) {
    this.gpmsYearProvider.loadGpmsYearList(this.startDate, this.customerName).then((data: any[]) => {
      this.productList = new Array<any>();
      for (var i = 0; i < data.length; i++) {
        var num1 = data[i].PRICE_RATE;
        var num2 = data[i].PROFIT_RATE;
        var num3 = data[i].RATE_RATE;
        var name = (i+1)+" "+ data[i].NAME;
        this.productList.push({
          NAME: name,
          PRICE_RATE: num1,
          PROFIT_RATE: num2,
          RATE_RATE: num3
        });
      }
    });
  }
}
//function format (num) {
    //return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
//}