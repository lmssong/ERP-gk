import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

@Injectable()
export class EverageCountProvider {
  data: any;

  constructor(private http: Http, public g: Global) {
    this.data = null;
  }

  loadEverageCountList(startDate,endDate) {
      let execName = 'Proc_GetEverageCount';
      let param = {
        from: startDate,
        to:endDate

      };
      return this.g.Post(execName,param);
  }
}

