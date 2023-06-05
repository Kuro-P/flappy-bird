# flappy-bird
 前几年大火的 flappy bird 游戏，用 canvas 试着实现了下。

## 玩法说明
- 小鸟撞到"柱子"或"地面"都会 Game Over
- “点击屏幕”控制小鸟飞行
    
## 核心模块
- 管子高度随机变化，管间距离与管内可通过距离不变
- 小鸟撞击管子的判定
- 小鸟坠落受物理重力效果
- 每层画面（背景层、管道层、小鸟层）的绘制顺序

这里参考了一些其他人的思路（[原文](http://www.cnblogs.com/syg1/p/5801816.html)）

## 待优化的部分
- 小鸟上升下降时没有"抬头"，“低头”
- 引导步骤，点击屏幕 或者 按下空格键后 管子的高度重新生成不是延续引导中的画面
- 画面流畅度欠佳
- iOS 端 Safari 游玩时中偶尔闪屏
- PC 端音效播放有延迟
- 代码书写规范需要加强
- 碰撞检测需要改进

又看到别人实现了一个完成度很高的 “压扁 flappy bird”（[地址](http://www.17sucai.com/pins/demoshow/4352)）
  
## changelog
* 2017.12.25
  * 该用库时就用库
  * 代码书写注意命名和整洁度，方便后期维护，不是只实现功能就行了
* 2018.4.14
  * 之前为了消除移动端 300ms 点击延迟，引入了 zepto 库，使用其 tap 方法监听，感觉有些大材小用了；现采用 `touch-action: manipulation;` 解决移动端点击延迟问题，该属性支持到 IE10+。[参考文章](https://www.cnblogs.com/vanstrict/p/5700957.html)
  * 修复 Safafi/微信内置浏览器 点击可点击元素的时候，出现一个半透明的灰色背景的问题
  * 不支持 QQ 浏览器

## 预览
预览地址：https://kuro-p.github.io/Flappy-Bird/main.html

![image](https://github.com/Kuro-P/Flappy-Bird/blob/master/snap/GameGuide.jpg "游戏截图")
    
