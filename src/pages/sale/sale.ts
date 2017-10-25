import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { SaleProvider } from  "../../providers/sale-providers"

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html'
})
export class sale {

  days:Array<any> = [];
 public startDate: Date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-6);
 public endDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
 productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
   public navView: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
  public saleProvider: SaleProvider) {
  
  }

   ionViewDidEnter() {
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
  loadProductList() {
        this.saleProvider.loadSaleList(this.startDate,this.endDate).then((data: any[]) => {
            //this.productList = data;
            this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              var num =data[i].AMOUNT;
                              var name = (i+1)+" "+ data[i].STORE_NAME;
                              this.productList.push({STORE_NAME:name,AMOUNT:format(num)});
                    }
        });
    }
}
function format (num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}