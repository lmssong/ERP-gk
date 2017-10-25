import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { ProductProfit } from '../pages/productProfit/productProfit';
import { ProductProfitCategory } from '../pages/productProfitCategory/productProfitCategory';
import { SellDetailTopten } from '../pages/sellDetailTopten/sellDetailTopten';
import { dailyStoreSale } from '../pages/dailyStoreSale/dailyStoreSale';
import { everageCount} from '../pages/everageCount/everageCount';
import { exceptionList} from '../pages/exceptionList/exceptionList';
import { SaleCostProfit } from '../pages/saleCostProfit/saleCostProfit';
import { storeBsGrowthRate} from '../pages/storeBsGrowthRate/storeBsGrowthRate';
import { storeYYZS} from '../pages/storeYYZS/storeYYZS';
import { storeProfit} from '../pages/storeProfit/storeProfit';
import { sale} from '../pages/sale/sale';
import { storeProfitGrowthRate} from '../pages/storeProfitGrowthRate/storeProfitGrowthRate';
import { storeSalesGrowthRate} from '../pages/storeSalesGrowthRate/storeSalesGrowthRate';
import { storeProfitRate} from '../pages/storeProfitRate/storeProfitRate';
import {customerSalesYear} from '../pages/customerSalesYear/customerSalesYear';
//import {customerSalesMonth} from '../pages/customerSalesMonth/customerSalesMonth';
import {customerProfitYear} from '../pages/customerProfitYear/customerProfitYear';
//import {customerProfitMonth} from '../pages/customerProfitMonth/customerProfitMonth';
//import {customerProfitRateYear} from '../pages/customerProfitRateYear/customerProfitRateYear';
//import {customerProfitRateMonth} from '../pages/customerProfitRateMonth/customerProfitRateMonth';
import {salesprofitrateMonth} from '../pages/salesprofitrateMonth/salesprofitrateMonth';
import {salesprofitrateYear} from '../pages/salesprofitrateYear/salesprofitrateYear';
import { CustomersalesPage } from '../pages/customersales/customersales';
import { GpmsMonthPage } from '../pages/gpmsMonth/gpmsMonth';
import { GpmsYearPage } from '../pages/gpmsYear/gpmsYear';
import {Dailysalesreport} from '../pages/dailysalesreport/dailysalesreport';
import {EachstorecategoryPage} from '../pages/eachstorecategory/eachstorecategory';


import { ProductProfitProvider } from  "../providers/productProfit-providers";
import { ProductProfitCategoryProvider } from  "../providers/productProfitCategory-providers";
import { SellDetailToptenProvider } from  "../providers/sellDetailTopten-providers";
import { DailyStoreSaleProviders } from  "../providers/dailyStoreSale-providers";
import { EverageCountProvider } from  "../providers/everageCount-providers";
import { ExceptionListProvider } from  "../providers/exceptionList-providers";
import { SaleCostProfitProvider } from  "../providers/saleCostProfit-providers";
import { StoreBsGrowthRateProvider } from  "../providers/storeBsGrowthRate-providers";
import { StoreYYZSProvider } from  "../providers/storeYYZS-providers";
import { StoreProfitProvider } from  "../providers/storeProfit-providers";
import { SaleProvider } from  "../providers/sale-providers";
import { StoreProfitGrowthRateProvider } from  "../providers/storeProfitGrowthRate-providers";
import { StoreSalesGrowthRateProvider } from  "../providers/storeSalesGrowthRate-providers";
import { StoreProfitRateProvider } from  "../providers/storeProfitRate-providers";
import { CustomerSalesYearProvider } from  "../providers/customerSalesYear-provider";
//import { CustomerSalesMonthProvider } from  "../providers/customerSalesMonth-providers";
import { CustomerProfitYearProvider} from "../providers/customerProfitYear-providers";
//import { CustomerProfitMonthProvider} from "../providers/customerProfitMonth-providers";
//import { CustomerProfitRateYearProvider} from "../providers/customerProfitRateYear-providers";
//import { CustomerProfitRateMonthProvider} from "../providers/customerProfitRateMonth-providers";
import { SalesProfitRateMonthProvider} from "../providers/salesprofitrateMonth-providers";
import { SalesProfitRateYearProvider} from "../providers/salesprofitrateYear-providers";
import { CustomersalesProviders} from "../providers/customersales-providers";
import { GpmsMonthProviders} from "../providers/gpmsMonth-providers";
import { GpmsYearProviders} from "../providers/gpmsYear-providers";
import { Global } from '../providers/global-providers'; 
 import { DatePickerModule } from 'datepicker-ionic2';
import {DailysalesreportProvider} from '../providers/dailysalesreport';
import {EachstorecategoryProvider} from '../providers/eachstorecategory-provider'

@NgModule({
  declarations: [
    MyApp,
    ProductProfit,
    ProductProfitCategory,
    SellDetailTopten,
    dailyStoreSale,
    EachstorecategoryPage,
    everageCount,
    exceptionList,
    SaleCostProfit ,
    storeBsGrowthRate,
    storeYYZS,
    storeProfit,
    sale,
    storeProfitGrowthRate,
    storeSalesGrowthRate,
    customerSalesYear,
    //customerSalesMonth,
    customerProfitYear,
    //customerProfitMonth,
    //customerProfitRateYear,
    //customerProfitRateMonth,
    salesprofitrateMonth,
    salesprofitrateYear,
    CustomersalesPage,
    GpmsMonthPage,
    GpmsYearPage,
    storeProfitRate,
    Dailysalesreport
  ],
  imports: [
    IonicModule.forRoot(MyApp) ,
     DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductProfit,
    ProductProfitCategory,
    SellDetailTopten,
    dailyStoreSale,
    EachstorecategoryPage,
    everageCount,
    exceptionList,
    SaleCostProfit ,
    storeBsGrowthRate,
    customerSalesYear,
    //customerSalesMonth,
    customerProfitYear,
     //customerProfitMonth,
       //customerProfitRateYear,
      //customerProfitRateMonth,
      salesprofitrateMonth,
      salesprofitrateYear,
      CustomersalesPage,
      GpmsMonthPage,
      GpmsYearPage,
  storeYYZS,
  storeProfit,
  sale,
  storeProfitGrowthRate,
  storeSalesGrowthRate,storeProfitRate,Dailysalesreport
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  ProductProfitProvider,Global,ProductProfitCategoryProvider,
  SellDetailToptenProvider,DailyStoreSaleProviders,EachstorecategoryProvider,
  EverageCountProvider,ExceptionListProvider,SaleCostProfitProvider,
  StoreBsGrowthRateProvider,StoreYYZSProvider,StoreProfitProvider,SaleProvider,StoreProfitGrowthRateProvider,StoreSalesGrowthRateProvider,
  CustomerSalesYearProvider,
  //CustomerSalesMonthProvider,
  CustomerProfitYearProvider,
   //CustomerProfitMonthProvider,
   //CustomerProfitRateYearProvider,
    //CustomerProfitRateMonthProvider,
    SalesProfitRateMonthProvider,
    SalesProfitRateYearProvider,
    CustomersalesProviders,
    GpmsMonthProviders,
    GpmsYearProviders,
  StoreProfitRateProvider,
  DailysalesreportProvider
  ]
})
export class AppModule {}
