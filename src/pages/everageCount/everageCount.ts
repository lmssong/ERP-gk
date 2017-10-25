import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { EverageCountProvider } from "../../providers/everageCount-providers"

@Component({
  selector: 'page-everageCount',
  templateUrl: 'everageCount.html'
})
export class everageCount {

  days: Array<any> = [];
  public startDate: Date = new Date(new Date().setDate(new Date().getDate() - 6));
  public endDate: Date = new Date();//new Date(new Date().setDate(new Date().getDate()));
  productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public everageCountProvider: EverageCountProvider) {

  }

  ionViewDidEnter() {
    this.loadProductList();

  }
  searchs() {
    this.loadProductList();
  }

  public eventStart(data: Date): void {
    this.startDate = data;
  }
  public eventEnd(data: Date): void {
    this.endDate = data;
  }
  loadProductList() {
    this.everageCountProvider.loadEverageCountList(this.startDate, this.endDate).then((data: any[]) => {
      this.productList = new Array<any>();
      for (var i = 0; i < data.length; i++) {
        // this.productList = data;
        var name=(i+1)+" "+data[i].STORE_NAME;
        var everagecount=data[i].EVERAGECOUNT;
        this.productList.push({STORE_NAME:name,EVERAGECOUNT:everagecount});
      }

    }, (erroMessage) => {
      let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
      toast.present();
    });
  }
}
