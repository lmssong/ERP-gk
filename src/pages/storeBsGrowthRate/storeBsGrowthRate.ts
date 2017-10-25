import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { StoreBsGrowthRateProvider } from "../../providers/storeBsGrowthRate-providers"


@Component({
  selector: 'page-storeBsGrowthRate',
  templateUrl: 'storeBsGrowthRate.html'
})
export class storeBsGrowthRate {

  day: Array<any> = [];
  public endDate: Date = new Date();
  productList: Array<any>;
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();
  public statrDateLable :Date=null;
  public LaststartDate: Date = null; //上周期日期
  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public storeBsGrowthRateProvider: StoreBsGrowthRateProvider
  ) {
    this.statrDateLable=this.endDate;
    this.LaststartDate = this.GetUpperCycle(this.endDate, false);
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
        getDate = new Date((endDate.getFullYear() - 1), endDate.getMonth(), 0);
      } else {
        getDate = new Date((endDate.getFullYear()),endDate.getMonth(),0);
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
    this.loadProductList();
  }
  searchs() {
    this.loadProductList();
    this.statrDateLable=this.endDate;
    this.LaststartDate = this.GetUpperCycle(this.endDate, false);
  }

  public eventEnd(data: Date): void {
    this.endDate = data;
  }
  loadProductList() {
    this.storeBsGrowthRateProvider.loadStoreBsGrowthRateList(this.endDate).then((data: any[]) => {
      this.productList = new Array<any>();
      for (var i = 0; i < data.length; i++) {
        var num = data[i].GROWHTRATE;
        var name = (i+1)+" "+data[i].STORE_NAME;
        //  num = num.toFixed(2); 
        this.productList.push({ STORE_NAME: name, GROWHTRATE: num });

      }
    })
  }
}