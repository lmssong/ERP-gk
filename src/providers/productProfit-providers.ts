import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductProfitProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadProductProfitList(startDate,endDate) {
      let execName = 'Proc_Product_Profit';
      let param = {
        from: startDate,
        to:endDate,
        topN:50

      };
      return this.g.Post(execName,param);
  }
}

