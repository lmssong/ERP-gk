import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { ExceptionListProvider } from  "../../providers/exceptionList-providers"

@Component({
  selector: 'page-exceptionList',
  templateUrl: 'exceptionList.html'
})
export class exceptionList {

  days:Array<any> = [];
 public startDate: Date =new Date(new Date().setDate(new Date().getDate() -6));
 public endDate: Date = new Date();
 productList: Array<any>;// 
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
   public navView: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
  public exceptionListProvider: ExceptionListProvider) {
  
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
        this.exceptionListProvider.loadExceptionList(this.startDate,this.endDate).then((data: any[]) => {
            this.productList = new Array<any>();
                     for (var i = 0; i < data.length; i++) {                          
                           var num = data[i].PROFIT;
                           var name  =(i+1)+" "+ data[i].STORE_NAME
                          this.productList.push({STORE_NAME:name,PROFIT:num});

                     }
        }, (erroMessage) => {
            let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
            toast.present();
        });
    }
}
