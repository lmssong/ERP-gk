import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { SalesProfitRateMonthProvider } from "../../providers/salesprofitrateMonth-providers"


@Component({
      selector: 'page-salesprofitrateMonth',
      templateUrl: 'salesprofitrateMonth.html'
})
export class salesprofitrateMonth {

      day: Array<any> = [];

      public startDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1, new Date().getDate());
      public endDate: Date = new Date();//结束时间
      public startDateLabel :Date=null; //labal 显示的开始时间
      public endDateLabel :Date=null;// labal 显示的开始的结束时间
      public LaststartDate: Date = null; //上周期日期
      public LastendDate: Date = null;//上周期结束日期
      profit: any;
      productList: Array<any>;
      categoryList: Array<any>;// 
      categoryName: any;
      customerName: any;
      customerList: Array<any>;// 
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();

      constructor(public navCtrl: NavController, public navView: ViewController, public modalCtrl: ModalController, public toastCtrl: ToastController, public SalesProfitRateMonthProvider: SalesProfitRateMonthProvider) {
           // this.LaststartDate = this.GetUpperCycle(this.startDate, false);
            this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date(this.startDate.getFullYear(), (this.startDate.getMonth() - 1), this.startDate.getDate());
            this.LastendDate = new Date(this.endDateLabel.getFullYear(), (this.endDateLabel.getMonth() - 1), this.endDateLabel.getDate());
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
            this.SalesProfitRateMonthProvider.loadProductCategoryList().then((data: any[]) => {
                  if (data != undefined && data.length > 0)
                        this.categoryList = data;
                  this.categoryName = this.categoryList[0].NAME;
            });

            //加载客户
            //this.SalesProfitRateMonthProvider.loadGetCustomerList().then((data:any[])=>{    
            //if (data != undefined && data.length > 0)
            // this.customerList=data;
            //this.customerName=this.customerList[0].NAME;
            //});
            this.loadProductList(this.startDate, this.endDate, this.customerName, this.categoryName);
      }
      searchs() {
            this.loadProductList(this.startDate, this.endDate, this.customerName, this.categoryName);
            this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date(this.startDateLabel.getFullYear(), (this.startDateLabel.getMonth() - 1), this.startDateLabel.getDate());
            this.LastendDate = new Date(this.endDateLabel.getFullYear(), (this.endDateLabel.getMonth() - 1), this.endDateLabel.getDate());
      }

      public eventStart(data: Date): void {
            this.startDate = data;
           // this.LaststartDate = this.GetUpperCycle(this.startDate, false);
      }
      public eventEnd(data: Date): void {
            this.endDate = data;
            // this.LaststartDate = this.GetUpperCycle(this.startDate,false);
      }
      loadProductList(startDate, endDate, customerName, categoryName) {
            this.SalesProfitRateMonthProvider.loadSalesProfitRateMonthList(this.startDate, this.endDate, this.customerName, this.categoryName).then(
                  (data: any[]) => {
                        this.productList = new Array<any>();
                        for (var i = 0; i < data.length; i++) {
                              var num = data[i].PROFIT_GROWTHRATE;
                              // num =num.toFixed(2);
                              var price = data[i].PRICE_GROWTHRATE;
                              // price =price.toFixed(2);
                              var rate = data[i].RATE_GROWTHRATE;
                              // rate =rate.toFixed(2);
                              var name = (i + 1) + " " + data[i].STORE_NAME;
                              this.productList.push({ STORE_NAME: name, PROFIT_GROWTHRATE: num, PRICE_GROWTHRATE: price, RATE_GROWTHRATE: rate });
                        }
                  }
            )
      }
}