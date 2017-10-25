import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class SellDetailToptenProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadSellDetailToptenList(startDate,endDate) {
      let execName = 'Proc_GetSellStoreAmount';
      let param = {
        from: startDate,
        to:endDate,
        topN:10

      };
      return this.g.Post(execName,param);
  }
}

