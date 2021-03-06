import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerProfitRateMonthProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadCustomerProfitRateMonthList(startDate,rate,customerName,categoryName) {
      let execName = 'Proc_StoreProfit_GrowthRateNew';
      let param = {
    to:startDate,
    type:rate,
    customer:customerName,
    category:categoryName
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

