import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreProfitProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadStoreProfitList(startDate,endDate,profit) {
      let execName = 'Proc_Store_Profit';
      let param = {
    from:startDate,
    to:endDate,
    type:profit
      };
      return this.g.Post(execName,param);
  }
   loadGetStoreSaleList() {
      let execName = 'Proc_getStore';
      return this.g.PostNoParam(execName);
  }
}

