# Flappy Bird
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—— with native JavaScript

 前几年大火的 Flappy Bird 游戏，自己试着用canvas写了下，诸多不足，望海涵。

 * 玩法说明：
    * 小鸟撞到"柱子"或"地面"都会 Game Over <br/>
    * PC端用 “空格” 键控制小鸟飞行
    * 移动端“点击屏幕”控制小鸟飞行
    
 * 核心步骤：
    * 管子高度随机变化，可通过间隔高度不变
    * 小鸟撞击管子的判定
    * 小鸟坠落受物理重力效果
    * 每层画面的绘制顺序 <br/>
    
   （网友详细思路推荐 [点击这里](http://www.cnblogs.com/syg1/p/5801816.html)）
   
 * 缺点：
   * 小鸟上升下降时没有"抬头"，“低头”
   * 引导步骤，点击屏幕 或者 按下空格键后 管子的高度重新生成不是延续引导中的画面
   * 画面流畅度欠佳
   * 手机端音效播放有延迟
   * 代码书写规范需要加强
   
   （在网上看到一个完成度很好的 “压扁Flappy Bird” 实现效果 [点击这里](http://www.17sucai.com/pins/demoshow/4352)）
  
  * 实现效果：<br/>
    ![image](https://github.com/Kuro-P/Flappy-Bird/blob/master/snap/GameGuide.jpg "游戏截图")
    
  * 预览地址：<br/>
    https://kuro-p.github.io/Flappy-Bird/main.html
