import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerProfitRateYearProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadCustomerProfitRateYearList(startDate,profit) {
      let execName = 'Proc_StoreProfit_GrowthRate';
      let param = {
    to:startDate,
    type:profit
      };
      return this.g.Post(execName,param);
  }
   loadProductCategoryList() {
      let execName = 'sp_executesql';
      let param = {
        sql:'select CODE ,NAME  from ERP_PRODUCT_CATEGORY where PARENT_ID IS NULL order by CODE'
      }
      return this.g.Post(execName,param);
  }
}

