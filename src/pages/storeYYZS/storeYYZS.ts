import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { StoreYYZSProvider } from  "../../providers/storeYYZS-providers"


@Component({
  selector: 'page-storeYYZS',
  templateUrl: 'storeYYZS.html'
})
export class storeYYZS {

        day:Array<any>=[];
        public startDate:Date=new Date();
        productList:Array<any>;
        public maxDate:Date =new Date(new Date().setDate(new Date().getDate()+30));
        public min:Date=new Date();

        constructor(public navCtrl:NavController,
        public navView:ViewController,
        public modalCtrl:ModalController,
        public toastCtrl:ToastController,
        public storeYYZSProvider:StoreYYZSProvider
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
        loadProductList(){
        this.storeYYZSProvider.loadStoreYYZSList(this.startDate).then((data:any[])=>{
           this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              var num =data[i].KPI;
                              num =num.toFixed(2);
                              this.productList.push({STORE_NAME:data[i].STORE_NAME,KPI:num});
                    }
        }
      )
   }

}