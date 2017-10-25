import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { ProductSaleProvider } from  "../../providers/productSale-providers"


@Component({
  selector: 'page-productSale',
  templateUrl: 'productSale.html'
})
export class productSale {

        day:Array<any>=[];
        public startDate :Date=new Date();
        public endDate:Date=new Date();
        productList:Array<any>;
        public maxDate:Date =new Date(new Date().setDate(new Date().getDate()+30));
        public min:Date=new Date();

        constructor(public navCtrl:NavController,
        public navView:ViewController,
        public modalCtrl:ModalController,
        public toastCtrl:ToastController,
        public productSaleProvider:ProductSaleProvider
        ){}
        ionViewDidEnter(){
            this.loadProductList();
        }
        searchs(){
            this.loadProductList();
        }
        public eventStart(data: Date): void {
        this.startDate = data;
  }
        public eventEnd(data: Date): void {
        this.endDate = data;
  }
        loadProductList(){
        this.productSaleProvider.loadProductSaleList(this.startDate,this.endDate).then((data:any[])=>{this.productList=data;}
      
      
      )
        }

}