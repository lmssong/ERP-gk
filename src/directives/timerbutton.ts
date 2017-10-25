import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[my-auto-fit-layout]'
})
export class AutoFitLayout {
    constructor(public element: ElementRef, public renderer: Renderer) {
        //因为ionic的默认padding宽度是16
        //使用这个指令时，会获取当前窗口宽度，并设置指定div的宽度。将这个指令应用到图表的容器上：
        //<div id="main" style="width: 350px;height:300px;" my-auto-fit-layout></div>
        renderer.setElementStyle(element.nativeElement, 'width', `${(document.body.clientWidth - 32).toString()}px`);
    }
}