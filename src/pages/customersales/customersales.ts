import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { CustomersalesProviders } from  "../../providers/customersales-providers";

/*
  Generated class for the Customersales page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customersales',
  templateUrl: 'customersales.html'
})
export class CustomersalesPage {

days:Array<any> = [];
 public startDate: Date =new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-6); 
 public endDate: Date = new Date();
 productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();
 // public customerName:any;
    customerName:any;
        customerList: Array<any>;// 

  constructor(public navCtrl: NavController,
   public navView: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        
  public customerSalesProvider: CustomersalesProviders) {}
 ionViewDidEnter() 
 {
     //加载客户
   this.customerSalesProvider.loadDailyGetCategorySaleList().then((data:any[])=>{    
     if (data != undefined && data.length > 0)
       this.customerList=data;
       this.customerName=this.customerList[0].NAME;
    });
        this.loadProductList(this.startDate,this.endDate,this.customerName);
  }
     searchs(){   
      this.loadProductList(this.startDate,this.endDate,this.customerName);
    }

    public eventStart(data: Date): void {
    this.startDate = data;
  }
    public eventEnd(data: Date): void {
    this.endDate = data;
  }
  loadProductList(startDate,endDate,customerName) {
        this.customerSalesProvider.loadCustomerSaleList(this.startDate,this.endDate,this.customerName).then((data: any[]) => {
            this.productList=new Array<any>();
                    for(var i=0;i<data.length;i++){
                              var num =data[i].SALES_AMOUNT;
                              var name = (i+1)+" "+ data[i].CUSTOMER_NAME;
                              this.productList.push({CUSTOMER_NAME:name,SALES_AMOUNT:format(num),PROFIT:format(data[i].PROFIT),PROFITRATE:data[i].PROFITRATE});
                    }
        });
    }
}
function format (num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}