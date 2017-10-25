
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';



@Injectable()
export class DailyStoreSaleProviders {
  data: any;
  DataList:Array<any>;

  constructor(private http: Http, public g: Global) {
    this.data = null;
    this.DataList=null;
  }

  loadDailyStoreSaleList(startDate,endDate,storeName,stcategoryName) {
      let execName = 'Proc_GetSellhead_detail_View';
      let param = {
        from: startDate,
        to: endDate,
        store:storeName,
        category:stcategoryName
      };
      return this.g.Post(execName,param);
  }
  loadDailyGetStoreSaleList() {
      let execName = 'Proc_getStore';
      return this.g.PostNoParam(execName);

  }
    loadDailyGetCategorySaleList() {
      let execName = 'Proc_getCATEGORY';
      return this.g.PostNoParam(execName);
  }
}
