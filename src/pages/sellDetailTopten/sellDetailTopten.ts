import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { SellDetailToptenProvider } from  "../../providers/sellDetailTopten-providers" 

 import echarts from 'echarts';

@Component({
  selector: 'page-sellDetailTopten',
  templateUrl: 'sellDetailTopten.html'
})
export class SellDetailTopten {
  productList: Array<any>;// 
  days:Array<any> = [];
    public endDate:Date=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1);
     public startDate:Date=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-8);
 dataXArry: Array<any>;
 dataYArry: Array<any>;
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
   public navView: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController, 
  public sellDetailToptenProvider: SellDetailToptenProvider
  ) {
  
   

  
  }

 
   ionViewDidEnter() {
        this.loadSellDetailTopten(this.startDate,this.endDate); 
       
    }
    searchs(){   
      this.loadSellDetailTopten(this.startDate,this.endDate);
    }


    public eventStart(data: Date): void {
    this.startDate = data;
  }
    public eventEnd(data: Date): void {
    this.endDate = data;
  }
  loadSellDetailTopten(startDate,endDate) {
        this.sellDetailToptenProvider.loadSellDetailToptenList(startDate,endDate).then((data: any[]) => {
          
            this.dataXArry = new Array();
            this.dataYArry = new Array();
             for (var i = 0; i < data.length; i++) {

                this.dataXArry.push(data[i].AMOUNT);
                this.dataYArry.push(data[i].STORE_NAME);

                // 初始化折线图
               
            }
             this.initeChart();

        }, (erroMessage) => {
            let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
            toast.present();
        });
    }
    

 // 折线图初始化
    initeChart() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            color:['#33cd5f'],
            title: {
                show: false,
               
                text: '门店销售额前十柱状图'
            },
           tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                alwaysShowContent: true,
                formatter: '{b0}: {c0}',
                animation: false
            },
            grid: {
                 left: '3%',
        right: '1%',
        bottom: '3%',
        width: '98%',
        height: '100%',
                containLabel: true
            },
            yAxis: {
              type : 'value' , 
              
             },
            xAxis: {
                type:'category',
                 data: this.dataYArry,
                  axisTick: {show: false},
                 barCategoryGap:'20%',
                 axisLabel:{  
                                      interval:0 , 
                                    
                                      formatter:function(val){  
                                        return val.split("").join("\n");  
                                      }  
                                  }  
            },
            series: [
                {
                    name: '销售额',
                    type:'bar',
                   barMinHeight:'10px',
                      itemStyle: {
                        normal: {
                        label: {
                           textStyle: {
										fontSize: '12',
										fontFamily: '微软雅黑',
										fontWeight: 'bold'
									}
                        }
                    }
                      },
                     data:this.dataXArry,
                 
                    
                    // data: [11, 13, 14, 16, 25, 16, 25]
                }
            ]
        });

    }

   

}
