import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { CustomerSalesMonthProvider } from  "../../providers/customerSalesMonth-providers"


@Component({
  selector: 'page-customerSalesMonth',
  templateUrl: 'customerSalesMonth.html'
})
export class customerSalesMonth {

        day:Array<any>=[];
     
        public startDate:Date=new Date(new Date().getFullYear(),new Date().getMonth(),0, new Date().getDate());
        profit:any;
        productList:Array<any>;
        categoryList: Array<any>;// 
        categoryName:any;
        public customerName:any;
        public maxDate:Date =new Date(new Date().setDate(new Date().getDate()+30));
        public min:Date=new Date();

        constructor(public navCtrl:NavController,
        public navView:ViewController,
        public modalCtrl:ModalController,
        public toastCtrl:ToastController,
        public CustomerSalesMonthProvider:CustomerSalesMonthProvider
        ){}
        
   ionViewDidEnter() { this.CustomerSalesMonthProvider.loadProductCategoryList().then((data:any[])=>{ 
        if (data != undefined && data.length > 0)
            this.categoryList=data;
            this.categoryName=this.categoryList[0].NAME;
 
        this.loadProductList(this.startDate,this.customerName,this.categoryName);
        });
   
  }
        searchs(){
            this.loadProductList(this.startDate,this.customerName,this.categoryName);
        }
      
   public eventStart(data: Date): void {
        this.startDate = data;
  }
        loadProductList(startDate,customerName,categoryName){
     /*  this.storeSalesGrowthRateProvider.loadStoreSalesGrowthRateList(this.startDate).then(
              (data:any[])=>{
                    this.productList=data;
                  }
      )*/
      this.CustomerSalesMonthProvider.loadCustomerSalesMonthList(this.startDate,this.customerName,this.categoryName).then(
              (data:any[])=>{
                    
                    this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              var num =data[i].GROWHTRATE;
                              num =num.toFixed(2);
                              this.productList.push({STORE_NAME:data[i].STORE_NAME,GROWHTRATE:num});
                    }
                  }
                )
   }
}