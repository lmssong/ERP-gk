import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, ToastController } from 'ionic-angular';

import { DailyStoreSaleProviders } from "../../providers/dailyStoreSale-providers"

import echarts from 'echarts';
@Component({
  selector: 'page-dailyStoreSale',
  templateUrl: 'dailyStoreSale.html'
})

export class dailyStoreSale {
  dataXArry: Array<any>;
  dataYArry: Array<any>;
  days: Array<any> = [];
  public startDate: Date = new Date(new Date().setDate(new Date().getDate() - 6));
  public endDate: Date = new Date();
  productList: Array<any>;// 
  StoreList: Array<any>;// 
  storeName: any;
  CategoryList: Array<any>;// 
  categoryName: any;
  alterMag: String;//提示 没有数据信息
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date();

  constructor(public navCtrl: NavController,
    public navView: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public dailyStoreSaleProviders: DailyStoreSaleProviders) {
  }

  ionViewDidEnter() {
    this.dailyStoreSaleProviders.loadDailyGetStoreSaleList().then((data: any[]) => {
      if (data != undefined && data.length > 0)
        this.StoreList = data;
      this.storeName = this.StoreList[0].Store_name;
    });
    //加载类别
    this.dailyStoreSaleProviders.loadDailyGetCategorySaleList().then((data: any[]) => {
      if (data != undefined && data.length > 0)
        this.CategoryList = data;
      this.categoryName = this.CategoryList[0].NAME;

    });
    // this.loadProductList(this.startDate,this.endDate,this.StoreList[0].storeName,this.CategoryList[0].categoryName);
    this.searchs();
  }
  searchs() {
    this.loadProductList(this.startDate, this.endDate, this.storeName, this.categoryName);
  }

  public eventStart(data: Date): void {
    this.startDate = data;//new Date(data.getUTCFullYear(),data.getUTCMonth(),data.getUTCDate(),data.setUTCHours(data.getHours()+8));//new Date(data.getFullYear(),data.getMonth(),data.getDate(),data.setHours(data.getHours()+8));
  }
  public eventEnd(data: Date): void {
    this.endDate = data;//new Date(data.getUTCFullYear(),data.getUTCMonth(),data.getUTCDate(),data.setUTCHours(data.getHours()+8));
  }
  //loadProductList() {

  //this.dailyStoreSaleProviders.loadDailyStoreSaleList(this.startDate, this.endDate).then((data: any[]) => {
  //  this.productList = data;
  //});
  // } 

  loadProductList(startDate, endDate, storeName, stcategoryName) {
    this.alterMag = "";
    this.dailyStoreSaleProviders.loadDailyStoreSaleList(startDate, endDate, storeName, stcategoryName).then((data: any[]) => {
      this.dataXArry = new Array();
      this.dataYArry = new Array();
      this.productList = data;
      if (this.productList == null || this.productList.length <= 0) {
        this.alterMag = "没有数据";
      }
      for (var i = 0; i < data.length; i++) {
        this.dataXArry.push(data[i].DATE.toString().substring(5, 11));
        this.dataYArry.push(data[i].AMOUNT.toFixed(2));
        // let DATE=data[i].DATE.toString().substring(5,11);
        // let AMOUNT=data[i].AMOUNT.toFixed(2);
        // this.productList.push(DATE,AMOUNT);
      }
      this.initeChart();
    }, (erroMessage) => {
      let toast = this.toastCtrl.create({ message: erroMessage, position: 'bottom', duration: 1500 });
      toast.present();
    });
  }
  loadProductStoreList() {

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

        axisLabel: {
          interval: 'auto',
          rotate: 30,
          fontSize: '10',

        }

      },
      series: [
        {
          name: '销售额',
          type: 'line',
          data: this.dataYArry,
        },

      ]
    });

  }
}