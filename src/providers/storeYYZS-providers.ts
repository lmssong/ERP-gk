import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreYYZSProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadStoreYYZSList(startDate) {
      let execName = 'Proc_GetStore_YYZS';
      let param = {
    from:startDate            
      };
      return this.g.Post(execName,param);
  }
}

