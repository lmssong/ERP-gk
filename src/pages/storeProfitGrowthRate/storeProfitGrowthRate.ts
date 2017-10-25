import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { StoreProfitGrowthRateProvider } from "../../providers/storeProfitGrowthRate-providers"


@Component({
      selector: 'page-storeProfitGrowthRate',
      templateUrl: 'storeProfitGrowthRate.html'
})
export class storeProfitGrowthRate {

      day: Array<any> = [];

      public startDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1, new Date().getDate());//new Date(new Date().getFullYear(), new Date().getMonth(),0);
      public endDate: Date = new Date();//结束时间
      profit: any;
      productList: Array<any>;
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();
       public startDateLabel :Date=null; //labal 显示的开始时间
      public endDateLabel :Date=null;// labal 显示的开始的结束时间
      public LaststartDate: Date = null; //上周期日期
      public LastendDate: Date = null;//上周期结束日期
      constructor(public navCtrl: NavController,
            public navView: ViewController,
            public modalCtrl: ModalController,
            public toastCtrl: ToastController,
            public storeProfitGrowthRateProvider: StoreProfitGrowthRateProvider
      ) {
            //this.LaststartDate = this.GetUpperCycle(this.startDate,false);
             this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date(this.startDate.getFullYear(), (this.startDate.getMonth() - 1), this.startDate.getDate());
            this.LastendDate = new Date(this.endDate.getFullYear(), (this.endDate.getMonth() - 1), this.endDate.getDate());
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

            this.loadProductList(this.startDate, this.endDate, "PROFIT_GROWTHRATE");

      }
      searchs() {
            this.loadProductList(this.startDate, this.endDate, "PROFIT_GROWTHRATE");
             this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date(this.startDate.getFullYear(), (this.startDate.getMonth() - 1), this.startDate.getDate());
            this.LastendDate = new Date(this.endDate.getFullYear(), (this.endDate.getMonth() - 1), this.endDate.getDate());
      }

      public eventStart(data: Date): void {
            this.startDate = data;
            // this.LaststartDate = this.GetUpperCycle(this.startDate,false);
      }
      public eventEnd(data: Date): void {
            this.endDate = data;
            // this.LaststartDate = this.GetUpperCycle(this.startDate,false);
      }
      loadProductList(startDate, endDate, profit) {
            this.storeProfitGrowthRateProvider.loadStoreProfitGrowthRateList(this.startDate, this.endDate, profit).then(
                  (data: any[]) => {
                        this.productList = new Array<any>();
                        for (var i = 0; i < data.length; i++) {
                              var num = data[i].PROFIT_GROWTHRATE;
                              var name = (i + 1) + " " + data[i].STORE_NAME;
                              // num =num.toFixed(2);
                              this.productList.push({ STORE_NAME: name, PROFIT_GROWTHRATE: num });
                        }
                  }
            )
      }
}