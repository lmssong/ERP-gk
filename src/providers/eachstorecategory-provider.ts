
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

/*
  Generated class for the EachstorecategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EachstorecategoryProvider {
  data: any;
  DataList: Array<any>;
  constructor(private http: Http, public g: Global) {
    this.data = null;
    this.DataList = null;
  }

  loadDailyStoreSaleList(startDate, endDate, storeName) {
    let execName = 'Proc_GetEach_Store_IS_Sold_By_Category';
    let param = {
      from: startDate,
      to: endDate,
      store: storeName
    };
    return this.g.Post(execName, param);
  }

  loadDailyGetStoreSaleList() {
    let execName = 'Proc_getStore';
    return this.g.PostNoParam(execName);
  }

}
