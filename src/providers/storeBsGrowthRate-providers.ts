import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreBsGrowthRateProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadStoreBsGrowthRateList(endDate) {
      let execName = 'Proc_StoreBS_GrowthRate';
      let param = {
        to:endDate            
      };
      return this.g.Post(execName,param);
  }
}

