import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { StoreProfitProvider } from "../../providers/storeProfit-providers"
import { Global } from '../../providers/global-providers';


@Component({
      selector: 'page-storeProfit',
      templateUrl: 'storeProfit.html'
})
export class storeProfit {

      day: Array<any> = [];
      public endDate: Date = new Date();
      public startDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 6);
      profit: any;
      productList: Array<any>;
      public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
      public min: Date = new Date();

      constructor(public navCtrl: NavController,
            public navView: ViewController,
            public modalCtrl: ModalController,
            public toastCtrl: ToastController,
            public storeProfitProvider: StoreProfitProvider
      ) { }

      ionViewDidEnter() {

            this.loadProductList(this.startDate, this.endDate, "profit");

      }
      searchs() {
            this.loadProductList(this.startDate, this.endDate, "profit");
      }
      public eventEnd(data: Date): void {
            this.endDate = data;
      }
      public eventStart(data: Date): void {
            this.startDate = data;
      }
      loadProductList(startDate, endDate, profit) {
            this.storeProfitProvider.loadStoreProfitList(this.startDate, this.endDate, profit).then(
                  (data: any[]) => {
                        this.productList = new Array<any>();
                        for (var i = 0; i < data.length; i++) {
                              let num = Global.format(data[i].PROFIT);
                              var name = (i + 1) + " " + data[i].STORE_NAME;
                              this.productList.push({ STORE_NAME: name, PROFIT: num });
                        }
                  }
            )
      }
}