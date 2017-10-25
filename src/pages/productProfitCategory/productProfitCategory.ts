import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { ProductProfitCategoryProvider } from "../../providers/productProfitCategory-providers"
import { Global } from '../../providers/global-providers';

@Component({
  selector: 'page-productProfitCategory',
  templateUrl: 'productProfitCategory.html'
})
export class ProductProfitCategory {

  days: Array<any> = [];
  public startDate: Date = new Date(new Date().setDate(new Date().getDate() - 6));//开始时间
  public endDate: Date = new Date();//结束时间
  ProductProfitCategoryList: Array<any>;
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));//最大日期
  public min: Date = new Date();//最小日期

  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,


    public productProfitCategoryProvider: ProductProfitCategoryProvider) {

  }

  ionViewDidEnter() {
    this.loadProductProfitCategoryList();

  }
  searchs() {
    this.loadProductProfitCategoryList();
  }
  public eventStart(data: Date): void {
    this.startDate = data;
  }
  public eventEnd(data: Date): void {
    this.endDate = data;
  }

  loadProductProfitCategoryList() {
    this.productProfitCategoryProvider.loadProductProfitCategoryList(this.startDate, this.endDate).then((data: any[]) => {

      this.ProductProfitCategoryList = new Array<any>();
      for (var i = 0; i < data.length; i++) {
        let num = Global.format(data[i].PROFIT);
        var name = (i + 1) + " " + data[i].CATEGORY;
        this.ProductProfitCategoryList.push({ CATEGORY: name, PROFIT: num });
      }
      this.ProductProfitCategoryList = this.ProductProfitCategoryList.sort((a: any, b: any) => b);
    });

  }
}
