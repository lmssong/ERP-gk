import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerSalesMonthProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadCustomerSalesMonthList(startDate,customerName,categoryName) {
      let execName = 'Proc_StoreSales_GrowthRateNew';
      let param = {
    to:startDate,
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

