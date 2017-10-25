import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { EachstorecategoryProvider } from "../../providers/eachstorecategory-provider"
/*
  Generated class for the Eachstorecategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eachstorecategory',
  templateUrl: 'eachstorecategory.html'
})
export class EachstorecategoryPage {
  public StoreList: Array<any>;
  public storeName: any;
  public startDate: Date = new Date(new Date().setDate(new Date().getDate() - 6));
  public endDate: Date = new Date();
  productList: Array<any>;
  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public eachstorecategoryProvider: EachstorecategoryProvider) {
  }

  ionViewDidLoad() {
    this.eachstorecategoryProvider.loadDailyGetStoreSaleList().then((data: any[]) => {
      if (data != undefined && data.length > 0)
        this.StoreList = data;
      this.storeName = this.StoreList[0].Store_name;
      this.loadProductList(this.startDate, this.endDate, this.storeName);
    });
  }
  searchs() {
    this.loadProductList(this.startDate, this.endDate, this.storeName);
  }

  public eventStart(data: Date): void {
    this.startDate = data;
  }
  public eventEnd(data: Date): void {
    this.endDate = data;
  }

  loadProductList(startDate, endDate, storeName) {
    this.eachstorecategoryProvider.loadDailyStoreSaleList(startDate, endDate, storeName).then((data: any[]) => {
      this.productList = new Array<any>();
      for (var i = 0; i < data.length; i++) {
        var num = data[i].PROFIT;
        var amount =data[i].AMOUNT;
        var name = (i + 1) + " " + data[i].CategoryName
        this.productList.push({ CategoryName: name,AMOUNT:amount, PROFIT: num });
      }
    }, (erroMessage) => {
      let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
      toast.present();
    });
  }

}
