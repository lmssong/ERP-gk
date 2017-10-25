import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreSalesGrowthRateProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadStoreSalesGrowthRateList(startDate,endDate) {
      let execName = 'Proc_StoreSales_GrowthRate';
      let param = {
        from:startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
        to:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate()
      };
      return this.g.Post(execName,param);
  }
}

