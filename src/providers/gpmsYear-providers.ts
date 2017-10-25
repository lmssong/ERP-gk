import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global-providers';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomersalesProviders provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GpmsYearProviders 
{

    data: any;

  constructor(private http: Http, public g: Global) 
  {
    this.data = null;
  }

   loadGpmsYearList(startDate,customerName) 
   {
      let execName = 'Proc_GpmsYearTest';
      let param = {
        to: startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
        customer:customerName
      };
      return this.g.Post(execName,param);
  }
   loadGetCustomerList() {
      let execName = 'Proc_GET_CUSTOMER';
      return this.g.PostNoParam(execName);

  }
}
