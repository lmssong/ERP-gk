import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class SalesProfitRateMonthProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadSalesProfitRateMonthList(startDate, endDate, customerName, categoryName) {
    let execName = 'Proc_SalesProfitRateMonthTest';
    let param = {
      from:startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
      to:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate(),
      customer: customerName,
      category: categoryName
    };
    return this.g.Post(execName, param);
  }

  loadGetCustomerList() {
    let execName = 'Proc_GET_CUSTOMER';
    return this.g.PostNoParam(execName);

  }

  loadProductCategoryList() {
    //let execName = 'sp_executesql';
    //let param = {
    //sql:'select CODE ,NAME  from ERP_PRODUCT_CATEGORY where PARENT_ID IS NULL order by CODE'
    //}
    //return this.g.Post(execName,param);
    let execName = 'Proc_getCATEGORY';
    return this.g.PostNoParam(execName);
  }
}

