import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ProductProfit } from '../pages/productProfit/productProfit';
import { ProductProfitCategory } from '../pages/productProfitCategory/productProfitCategory';
// import { SellDetailTopten} from '../pages/sellDetailTopten/sellDetailTopten';
import { storeProfitRate } from '../pages/storeProfitRate/storeProfitRate';
import { dailyStoreSale } from '../pages/dailyStoreSale/dailyStoreSale';
import { everageCount } from '../pages/everageCount/everageCount';
import { exceptionList } from '../pages/exceptionList/exceptionList';
import {EachstorecategoryPage} from '../pages/eachstorecategory/eachstorecategory';
// import { SaleCostProfit } from '../pages/saleCostProfit/saleCostProfit';
import { storeBsGrowthRate } from '../pages/storeBsGrowthRate/storeBsGrowthRate';
// import { storeYYZS} from '../pages/storeYYZS/storeYYZS';
import { storeProfit } from '../pages/storeProfit/storeProfit';
import { sale } from '../pages/sale/sale';
import { storeProfitGrowthRate } from '../pages/storeProfitGrowthRate/storeProfitGrowthRate';
import { storeSalesGrowthRate } from '../pages/storeSalesGrowthRate/storeSalesGrowthRate';
import { customerSalesYear } from '../pages/customerSalesYear/customerSalesYear';
//import { customerSalesMonth} from '../pages/customerSalesMonth/customerSalesMonth';
import { customerProfitYear } from '../pages/customerProfitYear/customerProfitYear';
//import { customerProfitMonth} from '../pages/customerProfitMonth/customerProfitMonth';
//import { customerProfitRateYear} from '../pages/customerProfitRateYear/customerProfitRateYear';
//import { customerProfitRateMonth} from '../pages/customerProfitRateMonth/customerProfitRateMonth';
import { salesprofitrateMonth } from '../pages/salesprofitrateMonth/salesprofitrateMonth';
import { salesprofitrateYear } from '../pages/salesprofitrateYear/salesprofitrateYear';
import { CustomersalesPage } from '../pages/customersales/customersales';
import { Dailysalesreport } from '../pages/dailysalesreport/dailysalesreport';
// import {CustomersalesgrossprofitgrossprofitmarginmomPage} from '../pages/customersalesgrossprofitgrossprofitmarginmom/customersalesgrossprofitgrossprofitmarginmom';
import{ GpmsMonthPage} from '../pages/gpmsMonth/gpmsMonth';
import{ GpmsYearPage} from '../pages/gpmsYear/gpmsYear';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ProductProfit;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: '商品毛利额前五十', component: ProductProfit },
      { title: '商品类别毛利额前十', component: ProductProfitCategory },
      // { title: '门店销售额前十', component: SellDetailTopten },
      { title: '门店毛利率排行榜', component: storeProfitRate },
      { title: '门店每日销售额', component: dailyStoreSale },
      { title: '每间门店按商品品类销售', component: EachstorecategoryPage },
      { title: '门店日均客流量排行榜', component: everageCount },
      { title: '盘点差异及报损占比排行', component: exceptionList },
      //  { title: '门店每日销售成本利润统计', component: SaleCostProfit },
      { title: '报损额月度增长率环比排行榜', component: storeBsGrowthRate },
      //  { title: '门店营业指数', component:  storeYYZS},
      { title: '门店毛利额排行榜', component: storeProfit },
      { title: '门店销售额排行榜', component: sale },
      { title: '毛利额月度增长率环比排行榜', component: storeProfitGrowthRate },
      { title: '销售额月度增长率环比排行榜', component: storeSalesGrowthRate },
      { title: '销售额年度增长率同比排行榜', component: customerSalesYear },
      // {title:'分客户分品类销售额月度环比', component:customerSalesMonth},
      { title: '毛利额年度增长率同比排行榜', component: customerProfitYear },
      //{title:'分客户分品类毛利额月度环比',component:customerProfitMonth},
      //{title:'分客户分品类毛利率年度同比',component:customerProfitRateYear},
      //{title:'分客户分品类毛利率月度环比',component:customerProfitRateMonth},
      { title: '门店销售额、毛利额、毛利率月度环比', component: salesprofitrateMonth },
      { title: '门店销售额、毛利额、毛利率年度同比', component: salesprofitrateYear },
      { title: '(团餐)分客户销售额', component: CustomersalesPage },
      { title: '(团餐)分配类每日销售额、毛利额排行榜', component: Dailysalesreport },
      { title: '(团餐)分客户、分品类销售额、毛利额、毛利率月度环比', component: GpmsMonthPage },
      { title: '(团餐)分客户、分品类销售额、毛利额、毛利率年度同比', component: GpmsYearPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
