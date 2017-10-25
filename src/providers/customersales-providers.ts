import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomersalesProviders provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomersalesProviders 
{

    data: any;

  constructor(private http: Http, public g: Global) 
  {
    this.data = null;
  }

   loadCustomerSaleList(startDate,endDate,customerName) 
   {
      let execName = 'Proc_Customer_Sales';
      let param = {
        start: startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
        end:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate(),
        categoryNames:customerName
      };
      return this.g.Post(execName,param);
  }
  //  loadGetCustomerList() {
  //     let execName = 'Proc_GET_CUSTOMER';
  //     return this.g.PostNoParam(execName);
  // }
   loadDailyGetCategorySaleList() {
      let execName = 'sp_executesql';
      let param={
        sql:"SELECT '全部' AS NAME UNION ALL SELECT NAME FROM GPMS_PRODUCT_CATEGORY WHERE PARENT_ID IS NULL"
      }
      return this.g.Post(execName,param);
  }
}
