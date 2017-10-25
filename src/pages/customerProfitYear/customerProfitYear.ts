import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { CustomerProfitYearProvider } from "../../providers/customerProfitYear-providers"


@Component({
      selector: 'page-CustomerProfitYear',
      templateUrl: 'CustomerProfitYear.html'
})
export class customerProfitYear {

      day: Array<any> = [];

      public startDate: Date = new Date();//new Date(new Date().getFullYear(), new Date().getMonth(),0);
      profit: any;
      productList: Array<any>;
      categoryList: Array<any>;// 
      categoryName: any;
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();
      public endDate: Date = new Date();//本周期
      public startDateLabel :Date=null; //labal 显示的开始时间
      public endDateLabel :Date=null;// labal 显示的开始的结束时间
      public LaststartDate: Date;//上周期 开始日期
      public LastEndDate: Date;//上周期 结束日期
      // public particularYear: number;//年份
      // public particularYearList: Array<number>;//年份集合
      constructor(public navCtrl: NavController,
            public navView: ViewController,
            public modalCtrl: ModalController,
            public toastCtrl: ToastController,
            public CustomerProfitYearProvider: CustomerProfitYearProvider
      ) {
            this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date((this.startDate.getFullYear() - 1), this.startDate.getMonth(), this.startDate.getDate());
            this.LastEndDate = new Date((this.endDate.getFullYear() - 1), this.endDate.getMonth(), this.endDate.getDate());
      }
     
      ionViewDidEnter() {
            this.loadProductList(this.startDate, this.endDate);//"PROFIT_GROWTHRATE"
      }
      searchs() {
           
            this.loadProductList(this.startDate, this.endDate);// "PROFIT_GROWTHRATE"
            this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date((this.startDate.getFullYear() - 1), this.startDate.getMonth(), this.startDate.getDate());
            this.LastEndDate = new Date((this.endDate.getFullYear() - 1), this.endDate.getMonth(), this.endDate.getDate());
      }

      public eventStart(data: Date): void {
            this.startDate = data;
      }
      public eventEnd(data: Date): void {
            this.endDate = data;
      }
      loadProductList(startDate, endDate) {
            this.CustomerProfitYearProvider.loadCustomerProfitYearList(this.startDate, this.endDate).then(
                  (data: any[]) => {
                        this.productList = new Array<any>();
                        for (var i = 0; i < data.length; i++) {
                              //var num = data[i].PROFIT_GROWTHRATE;
                              var name = (i + 1) + " " + data[i].STORE_NAME;
                              // num = num.toFixed(2);
                              this.productList.push({ STORE_NAME: name, PROFIT_GROWTHRATE: data[i].PROFIT_GROWTHRATE });
                        }
                  }
            )
      }
}