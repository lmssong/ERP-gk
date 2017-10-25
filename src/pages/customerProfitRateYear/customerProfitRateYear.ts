import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { CustomerProfitRateYearProvider } from  "../../providers/customerProfitRateYear-providers"


@Component({
  selector: 'page-CustomerProfitRateYear',
  templateUrl: 'CustomerProfitRateYear.html'
})
export class customerProfitRateYear {

        day:Array<any>=[];
     
        public startDate:Date=new Date(new Date().getFullYear(), new Date().getMonth(),0);
        profit:any;
        productList:Array<any>;
        categoryList: Array<any>;// 
        categoryName:any;
        public maxDate:Date =new Date(new Date().setDate(new Date().getDate()+30));
        public min:Date=new Date();

        constructor(public navCtrl:NavController,
        public navView:ViewController,
        public modalCtrl:ModalController,
        public toastCtrl:ToastController,
        public CustomerProfitRateYearProvider:CustomerProfitRateYearProvider
        ){}
        
   ionViewDidEnter() {
         this.CustomerProfitRateYearProvider.loadProductCategoryList().then((data:any[])=>{ 
        if (data != undefined && data.length > 0)
            this.categoryList=data;
            this.categoryName=this.categoryList[0].NAME;
 
        this.loadProductList(this.startDate,"PROFIT_GROWTHRATE");
         });
  }
        searchs(){
            this.loadProductList(this.startDate,"PROFIT_GROWTHRATE");
        }
      
   public eventStart(data: Date): void {
        this.startDate = data;
  }
        loadProductList(startDate,profit){
        this.CustomerProfitRateYearProvider.loadCustomerProfitRateYearList(this.startDate,profit).then(
              (data:any[])=>{
                    this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              var num =data[i].PROFIT_GROWTHRATE;
                              num =num.toFixed(2);
                              this.productList.push({STORE_NAME:data[i].STORE_NAME,PROFIT_GROWTHRATE:num});
                    }
              }
      )
   }
}