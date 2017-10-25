import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { ProductProfitProvider } from  "../../providers/productProfit-providers"
import { Global } from '../../providers/global-providers';

@Component({
  selector: 'page-productProfit',
  templateUrl: 'productProfit.html'
})
export class ProductProfit {

  days:Array<any> = [];
 public startDate: Date = new Date(new Date().setDate(new Date().getDate()-6));
 public endDate: Date =new Date(); //new Date(new Date().setDate(new Date().getDate()-1));
 productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
   public navView: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
  public productProfitProvider: ProductProfitProvider) {
  
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
        this.productProfitProvider.loadProductProfitList(this.startDate,this.endDate).then((data: any[]) => {
             this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              let num =Global.format(data[i].PROFIT);
                              let nums=Global.format(data[i].SUMAMOUNT);
                                var name = (i+1)+" "+ data[i].PRODUCT_NAME;
                              this.productList.push({PRODUCT_NAME:name,PROFIT:num,SUMAMOUNT:nums});
                    }
        }, (erroMessage) => {
            let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
            toast.present();
        });
    }
}
