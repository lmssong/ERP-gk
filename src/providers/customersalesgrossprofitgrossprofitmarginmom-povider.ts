import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Global } from './global-providers';

@Injectable()
export class CustomersalesgrossprofitgrossprofitmarginmomPovider {
  data: any;
  constructor(private http: Http, public g: Global) {
    this.data = null;
  }
  loadSalesProfitRateMonthList(startDate, customerName) {
    let execName = 'Proc_SalesProfitRateMonthTest';
    let param = {
      to: startDate,
      customer: customerName
    };
    return this.g.Post(execName, param);
  }

  loadGetCustomerList() {
    let execName = 'Proc_GET_CUSTOMER';
    return this.g.PostNoParam(execName);

  }
}
