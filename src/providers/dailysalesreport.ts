import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

/*
  Generated class for the Dailysalesreport provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DailysalesreportProvider {
data: any;
  DataList:Array<any>;
   constructor(private http: Http, public g: Global) {
    this.data = null;
    this.DataList=null;
  }

  loadDailyStoreSaleReportList(startDate,endDate,stcategoryName) {
      let execName = 'Proc_GetCategory_Daily_Sales_Report';
      let param = {
        from: startDate,
        to: endDate,
        category:stcategoryName
      };
      return this.g.Post(execName,param);
  }

    loadDailyGetCategorySaleList() {
      let execName = 'Proc_GET_CUSTOMER';
      // let param={
      //   sql:"SELECT '全部' AS NAME UNION ALL SELECT NAME FROM GPMS_PRODUCT_CATEGORY WHERE PARENT_ID IS NULL"
      // }
       return this.g.PostNoParam(execName);
  }
}
