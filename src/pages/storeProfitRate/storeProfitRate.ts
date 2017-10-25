import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { StoreProfitRateProvider } from  "../../providers/storeProfitRate-providers"


@Component({
  selector: 'page-storeProfitRate',
  templateUrl: 'storeProfitRate.html'
})
export class storeProfitRate {

        day:Array<any>=[];
        public endDate:Date=new Date();
        public startDate:Date=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-6);
        profit:any;
        productList:Array<any>;
        public maxDate:Date =new Date(new Date().setDate(new Date().getDate()+30));
        public min:Date=new Date();

        constructor(public navCtrl:NavController,
        public navView:ViewController,
        public modalCtrl:ModalController,
        public toastCtrl:ToastController,
        public storeProfitRateProvider:StoreProfitRateProvider
        ){}
        
   ionViewDidEnter() {
 
        this.loadProductList(this.startDate,this.endDate,"RATE");
   
  }
        searchs(){
            this.loadProductList(this.startDate,this.endDate,"RATE");
        }
        public eventEnd(data: Date): void {
        this.endDate = data;
  }
   public eventStart(data: Date): void {
        this.startDate = data;
  }
        loadProductList(startDate,endDate,rate){
        this.storeProfitRateProvider.loadStoreProfitRateList(this.startDate,this.endDate,rate).then(
              (data:any[])=>{
                   // this.productList=data;
                   this.productList = new Array<any>();
                     for (var i = 0; i < data.length; i++) {                          
                           var name =(i+1)+" "+ data[i].STORE_NAME;
                          
                          this.productList.push({STORE_NAME:name,PROFITRATE:data[i].PROFITRATE});

                     }
                  }
      )
   }
}

// function format (num) {
//     return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
// }