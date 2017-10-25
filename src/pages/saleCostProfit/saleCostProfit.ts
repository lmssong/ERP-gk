import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';
import { SaleCostProfitProvider } from "../../providers/saleCostProfit-providers"

 import echarts from 'echarts';
@Component({
  selector: 'page-saleCostProfit',
  templateUrl: 'saleCostProfit.html'
})

export class SaleCostProfit {
 dataXArry: Array<any>;
 dataYArry: Array<any>;
  dataYArry1: Array<any>;
   dataYArry2: Array<any>;
  days: Array<any> = [];
  public startDate: Date = new Date(new Date().setDate(new Date().getDate()- 8));
  public endDate: Date = new Date(new Date().setDate(new Date().getDate()- 1));
  productList: Array<any>;// 
   StoreList: Array<any>;// 
   storeName:any;
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public saleCostProfitProvider: SaleCostProfitProvider) {

  }

  ionViewDidEnter() {
    this.saleCostProfitProvider.loadStoreList().then((data:any[])=>{    
     if (data != undefined && data.length > 0)
       this.StoreList=data;
       this.storeName=this.StoreList[0].Store_name;
        this.loadProductList(this.startDate,this.endDate,this.StoreList[0].Store_name);
    });
   
  
  }
  searchs() {
    this.loadProductList(this.startDate,this.endDate,this.storeName);
  }

  public eventStart(data: Date): void {
    this.startDate = data;
  }
  public eventEnd(data: Date): void {
    this.endDate = data;
  }
  

  loadProductList(startDate, endDate,storeName) {
    this.saleCostProfitProvider.loadSaleCostProfitList(startDate, endDate,storeName).then((data: any[]) => {
      this.dataXArry = new Array();
      this.dataYArry = new Array();
       this.dataYArry1 = new Array();
         this.dataYArry2 = new Array();
      for (var i = 0; i < data.length; i++) {
        this.dataXArry.push(data[i].DATE.toString().substring(5,11));
        this.dataYArry.push(data[i].AMOUNT);
        
        this.dataYArry1.push(data[i].COST);
         this.dataYArry2.push(data[i].PROFIT);
      }
      this.initeChart();
    }, (erroMessage) => {
      let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
      toast.present();
    });
  }
loadProductStoreList()
{
  
}

  // 折线图初始化
  initeChart() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
    // 绘制图表
    myChart.setOption({
      color: ['#33cd5f'],
      title: {
        show: false,

        text: '门店销售额前十折线图'
      },
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        alwaysShowContent: true,
        formatter: '{b0}: {c0}',
        animation: false
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '2%',
        width: '100%',
        height: '100%',
        containLabel: true
      },
      yAxis: {
        type: 'value',

      },
      xAxis: {
        type: 'category',
        data: this.dataXArry,
        axisTick: { show: false },
       
         axisLabel:{  
                                      interval:0 , 
                                       rotate:30,
                                    fontSize: '10',
                                    
                                  }  
       
      },
      series: [
        {
          name: '销售额',
          type: 'line',
          data: this.dataYArry,
          lineStyle:{
            normal:{               
                color: "#387ef5"  //连线颜色
            }
        },
          
          // data: [11, 13, 14, 16, 25, 16, 25]
        },
         {
          name: '成本',
          type: 'line',
          data: this.dataYArry1,          
        },
         {
          name: '利润',
          type: 'line',
          data: this.dataYArry2, 
           lineStyle:{
            normal:{               
                color: "#f53d3d"  //连线颜色
            }
        },       
        }
      ]
    });

  }
}