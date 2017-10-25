import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerProfitYearProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadCustomerProfitYearList(startDate,endDate) {//profit
    //   let execName = 'sp_executesql'; //Proc_StoreProfit_GrowthRateYear
    //   let param = {
    //     sql:"SELECT STORE_NAME,GROWHTRATE AS PROFIT_GROWTHRATE FROM ERP_GET_STORE_GROWTH_RATE_GROWTH_RATE_YEAR WHERE [YEAR] ='"+startDate+"'"
    // // type:profit
    //   };
    //   return this.g.Post(execName,param);
    let execName ='Proc_StoreProfit_GrowthRateYear';
    let param = {
      from:startDate,
      to:endDate
    };
    return this.g.Post(execName,param);
  }
  //  loadProductCategoryList() {
  //     let execName = 'sp_executesql';
  //     let param = {
  //       sql:'select CODE ,NAME  from ERP_PRODUCT_CATEGORY where PARENT_ID IS NULL order by CODE'
  //     }
  //     return this.g.Post(execName,param);
  // }
}

