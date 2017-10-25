
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 @ViewChild('map')  mapElement: ElementRef;
  constructor(public navCtrl: NavController,
    private platform: Platform,) {
    

  }
 ionViewWillEnter() {
   var map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
   var point = new BMap.Point(117.214675, 36.679352);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    //创建小狐狸
    var pt = new BMap.Point(117.214675, 36.679352);
    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
    var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
    var labelgps = new BMap.Label("我是GPS标注哦",{offset:new BMap.Size(20,-10)});
    marker2.setLabel(labelgps); //添加GPS标注

    

 }
}
