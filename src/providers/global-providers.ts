import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
/*
  全局变量
*/
@Injectable()
export class Global {

  private static apiUrl = '219.135.137.83:8003';//'192.168.102.36:8004/api/do';//219.135.137.83
  

  private static loginUser: any;

  private static UserCode: any;


  constructor(public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, ) {
  }

  static getApiUrl(params) {
    let paramsStr = '';
    for (var param in params) {
      paramsStr += param + '=' + params[param] + '&';
    }

    return this.apiUrl + paramsStr.substring(0, paramsStr.length - 1);
  }

 

  static GetUser() {
    return this.loginUser;
  }
  static GetUserCode() {
    // this.UserCode='gll';
    // this.UserCode='zxx';    
    return this.UserCode;
  }

  
  static IsNumber(string) {
    console.log(string);
    let rep = /^[0-9]+(\.[0-9]+)?$/;
    if (rep.test(string)) {
      return 1;
    } else {
      return 0
    }
  }


  static getPostUrl() {
    return 'http://219.135.137.83:8004/api/do';//'http://192.168.102.36:8004/api/do';


  }

  static getPostParam(ExecName, param) {
    return {
      DB: 'ERP',
      C: ExecName,
      P: param
    };
  }
   static getPost(ExecName) {
    return {
      DB: 'ERP',
      C: ExecName
    };
  }

  private static LoadDataNum: number = 0;
  private static LoadDataLoading: any = null;

  public Post(execName, param, loadingMsg?) {
    //加载提示框
    let Loading = this.loadingCtrl.create({
      content: loadingMsg == undefined ? '加载中...' : loadingMsg
    });
    Global.ShowLoadDataLoading(Loading);

    return new Promise((resolve) => {
      this.http.post(Global.getPostUrl(), Global.getPostParam(execName, param))
        .map(res => res.json())
        .subscribe(data => {
          let result = JSON.parse(data);
          if (result.IsSuccess) {
            resolve(JSON.parse(result.Json).Table);
          } else {
            // 错误信息
            let toast = this.toastCtrl.create({ message: result.ErroMessage, position: 'bottom', duration: 1500 });
            toast.present();
            // reject(result.ErroMessage);
          }

          //关闭Loading
          Global.CloseLoadDataLoading();
        });
    });

  }
   public PostNoParam(execName) {
    //加载提示框
   
    return new Promise((resolve) => {
      this.http.post(Global.getPostUrl(), Global.getPost(execName))
        .map(res => res.json())
        .subscribe(data => {
          let result = JSON.parse(data);
          if (result.IsSuccess) {
            resolve(JSON.parse(result.Json).Table);
          } else {
            // 错误信息
            let toast = this.toastCtrl.create({ message: result.ErroMessage, position: 'bottom', duration: 1500 });
            toast.present();
          }

          //关闭Loading
          Global.CloseLoadDataLoading();
        });
    });

  }
  public static ShowLoadDataLoading(loading) {
    if (Global.LoadDataNum == 0 && this.LoadDataLoading == null) {
      this.LoadDataLoading = loading;
      this.LoadDataLoading.present();
      // console.log('G弹出Loading');
    }
    this.LoadDataNum = this.LoadDataNum + 1;
  }

  public static CloseLoadDataLoading() {
    if (Global.LoadDataNum == 1 && this.LoadDataLoading != null) {
      this.LoadDataLoading.dismiss();
      this.LoadDataLoading = null;
      // console.log('G关闭Loading');
    }
    this.LoadDataNum = this.LoadDataNum - 1;
  }

 public static format (num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

}

