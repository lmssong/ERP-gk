import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { SalesProfitRateYearProvider } from "../../providers/salesprofitrateYear-providers"


@Component({
      selector: 'page-salesprofitrateYear',
      templateUrl: 'salesprofitrateYear.html'
})
export class salesprofitrateYear {

      day: Array<any> = [];

      public startDate: Date = new Date();//new Date(new Date().getFullYear(), new Date().getMonth(),0);
      public LaststartDate: Date = null;
      public startDateLable: Date = null;
      profit: any;
      productList: Array<any>;
      categoryList: Array<any>;// 
      categoryName: any;
      customerName: any;
      customerList: Array<any>;// 
      public particularYear: number;//年份
      public particularYearList: Array<number>;//年份集合
      //public customerName:any;
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();

      constructor(public navCtrl: NavController,
            public navView: ViewController,
            public modalCtrl: ModalController,
            public toastCtrl: ToastController,
            public SalesProfitRateYearProvider: SalesProfitRateYearProvider
      ) {
            //添加默认年份（当前年份-5）
            this.particularYearList = new Array<number>();
            var year = new Date().getFullYear();
            for (let i = year; i >= year - 5; i--) {
                  this.particularYearList.push(i);
            }
            this.particularYear = this.particularYearList[0];
            this.startDateLable=this.startDate;
            this.LaststartDate = this.GetUpperCycle(this.startDate, true);//new Date(this.startDate.getFullYear(),(this.startDate.getMonth()-1),0);
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
                              getDate = new Date((endDate.getFullYear() - 1), (endDate.getMonth() + 1), 0);
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
            this.SalesProfitRateYearProvider.loadProductCategoryList().then((data: any[]) => {
                  if (data != undefined && data.length > 0)
                        this.categoryList = data;
                  this.categoryName = this.categoryList[0].NAME;
                  this.loadProductList(this.particularYear, this.customerName, this.categoryName);
            });
            //加载客户
            // this.SalesProfitRateYearProvider.loadGetCustomerList().then((data:any[])=>{    
            //if (data != undefined && data.length > 0)
            // this.customerList=data;
            //  this.customerName=this.customerList[0].NAME;
            //});

      }
      searchs() {
            this.loadProductList(this.particularYear, this.customerName, this.categoryName);
            //判断选择是否是当前年份
             if (this.particularYear == new Date().getFullYear()) {
                    this.startDateLable=this.startDate;
                  this.LaststartDate=new Date( this.startDate.getFullYear()-1,new Date().getMonth(),new Date().getDate());
             }else{
                   this.startDateLable=new Date(this.particularYear,11,31);
                 this.LaststartDate=new Date((this.particularYear-1),11,31);  
             }
      }

      public eventStart(data: Date): void {
            this.startDate = data;
            //this.LaststartDate=new Date(data.getFullYear()-1,new Date().getMonth(),0);
            this.LaststartDate = this.GetUpperCycle(this.startDate, true);
      }
      loadProductList(startDate, customerName, categoryName) {
            this.SalesProfitRateYearProvider.loadSalesProfitRateYearList(this.particularYear, this.customerName, this.categoryName).then(
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