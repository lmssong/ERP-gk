import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreProfitGrowthRateProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadStoreProfitGrowthRateList(startDate, endDate, profit) {
    let execName = 'Proc_StoreProfit_GrowthRate';
    let param = {
      from: startDate,
      to: endDate,
      type: profit
    };
    return this.g.Post(execName, param);
  }
}

