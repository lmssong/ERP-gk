import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class SalesProfitRateYearProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadSalesProfitRateYearList(startDate,customerName,categoryName) {
      let execName = 'sp_executesql ';//Proc_SalesProfitRateYearTest
      var sql="SELECT STORE_NAME,PROFIT_GROWTHRATE,PRICE_GROWTHRATE, RATE_GROWTHRATE FROM ERP_GET_STORE_SALES_PROFITMARGINS_RATE_YEAR WHERE [YEAR]='"+startDate+"'";
      if(categoryName=='全部'){
        sql+=" AND NAME IS NULL";
      }else{
        sql+=" AND NAME='"+categoryName+"'";
      }
    //   let param = {
    // startYear:startDate,
    // customer:customerName,
    // category:categoryName
    //   };
     let param = {
        sql:sql       
     }
      return this.g.Post(execName,param);
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

