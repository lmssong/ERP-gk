import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { CustomerSalesYearProvider } from "../../providers/customerSalesYear-provider"


@Component({
      selector: 'page-customerSalesYear',
      templateUrl: 'customerSalesYear.html'
})
export class customerSalesYear {

      day: Array<any> = [];

      public startDate: Date = new Date(new Date().getFullYear(), (new Date().getMonth()-1), new Date().getDate());
      public customerName: any;
      profit: any;
      productList: Array<any>;
      categoryList: Array<any>;// 
      categoryName: any;
      customerList: Array<any>;// 
      //customerName:any;
      public endDate: Date = new Date();
      public startDateLabel :Date=null; //labal 显示的开始时间
      public endDateLabel :Date=null;// labal 显示的开始的结束时间
      public LaststartDate: Date;//上周期开始日期 
      public LastEndDate: Date;//上周期开始日期 
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();
      constructor(public navCtrl: NavController,
            public navView: ViewController,
            public modalCtrl: ModalController,
            public toastCtrl: ToastController,
            public CustomerSalesYearProvider: CustomerSalesYearProvider
      ) {
            this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date((this.startDate.getFullYear()-1), this.startDate.getMonth(), this.startDate.getDate());
            this.LastEndDate = new Date((this.endDate.getFullYear()-1),this.endDate.getMonth(), this.endDate.getDate());
      }

      //判断本月是否是最后一天，上周期也改为最后天
      // public GetUpperCycle(endDate: Date, year: boolean) {
      //       var currentMonth = endDate.getMonth();
      //       var nextMonth = ++currentMonth;
      //       var nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
      //       var oneDay = 1000 * 60 * 60 * 24;
      //       let monthLatDay = new Date(nextMonthFirstDay.getTime() - oneDay).getDate();
      //       var getDate: Date = null;

      //       if (monthLatDay == endDate.getDate()) {
      //             if (year) {
      //                   getDate = new Date((endDate.getFullYear() - 1), endDate.getMonth(), endDate.getDate());
      //             } else {
      //                   getDate = new Date((endDate.getFullYear()), endDate.getMonth(), 0);
      //             }
      //       } else {
      //             if (year) {
      //                   getDate = new Date((endDate.getFullYear() - 1), endDate.getMonth(), endDate.getDate());
      //             } else {
      //                   getDate = new Date((endDate.getFullYear()), (endDate.getMonth() - 1), endDate.getDate());
      //             }
      //       }
      //       return getDate;
      // }

      ionViewDidEnter() {
            // this.CustomerSalesYearProvider.loadProductCategoryList().then
            //       ((data: any[]) => {
            //             if (data != undefined && data.length > 0)
            //                   this.categoryList = data;
            //             this.categoryName = this.categoryList[0].NAME;

            //       });
            this.loadProductList(this.startDate, this.endDate);
      }
      searchs() {
            this.loadProductList(this.startDate, this.endDate);
             this.startDateLabel=this.startDate;
            this.endDateLabel=this.endDate;
            this.LaststartDate = new Date( (this.startDate.getFullYear()- 1),this.startDate.getMonth() , this.startDate.getDate());
            this.LastEndDate = new Date((this.endDate.getFullYear()- 1), this.endDate.getMonth() , this.endDate.getDate());
      }

      public eventStart(data: Date): void {
            this.startDate = data;
      }
      public eventEnd(data: Date): void {
            this.endDate = data;
      }
      loadProductList(startDate, endDate) {
            this.CustomerSalesYearProvider.loadCustomerSalesYearList(this.startDate, this.endDate
            ).then(
                  (data: any[]) => {
                        this.productList = new Array<any>();
                        for (var i = 0; i < data.length; i++) {
                              var num = data[i].GROWHTRATE;
                              num = num.toFixed(2);
                              var name = (i + 1) + " " + data[i].STORE_NAME;
                              this.productList.push({ STORE_NAME: name, GROWHTRATE: num });
                        }
                  }
                  )
      }
}