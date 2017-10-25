import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerSalesYearProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadCustomerSalesYearList(startDate, endDate
  ) {
    // let execName = 'sp_executesql';
    // let param = {
    //   sql:"SELECT STORE_NAME,GROWHTRATE FROM ERP_GET_SALE_GROWTH_RATE_YEAR WHERE [YEAR] ='"+startDate+"'"
    // };
    // let result =  this.g.Post(execName,param);
    // return result;

    let execName = 'Proc_StoreSales_GrowthRateYear';
    let param = {
      from:startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
      to:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate()
    };
    return this.g.Post(execName, param);
  }
  // loadProductCategoryList() {
  //   let execName = 'sp_executesql';
  //   let param = {
  //     sql: 'select CODE ,NAME  from ERP_PRODUCT_CATEGORY where PARENT_ID IS NULL order by CODE'
  //   }
  //   return this.g.Post(execName, param);
  // }

}




