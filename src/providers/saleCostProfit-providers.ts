import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';



@Injectable()
export class SaleCostProfitProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadSaleCostProfitList(startDate,endDate,storeName) {
      let execName = 'Proc_GetSale_Cost_ProfitByDay';
      let param = {
        from: startDate,
        to:endDate,
        store:storeName
      };
      return this.g.Post(execName,param);
  }
  loadStoreList() {
      let execName = 'Proc_getStore';     
      return this.g.PostNoParam(execName);
  }

}
