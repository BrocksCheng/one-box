# 简述
**使用原生 JavaScript 语法为iPhone平台 alook 浏览器开发的一个浏览器插件。**

![image](https://github.com/isCagedBird/one-box/blob/master/photo/1.PNG)

![image](https://github.com/isCagedBird/one-box/blob/master/photo/2.PNG)

![image](https://github.com/isCagedBird/one-box/blob/master/photo/3.PNG)

# 功能
#### 关键字高亮
![image](https://github.com/isCagedBird/one-box/blob/master/photo/light.gif)
*对页面文档进行关键字查询并且高亮显示，如此例中，查询document文档中的汉字 “人”。*
#### 小游戏
![image](https://github.com/isCagedBird/one-box/blob/master/photo/game.gif)
*利用移动端 DeviceOrientationEvent api 写重力感应弹撞球小游戏*
#### 测试0（待实现）
#### 测试1（待实现）
#### 测试2（待实现）
#### 测试4（待实现）
# 结构
*在一个匿名立即执行函数中写一个闭包，将过程中用到的函数，变量作私密性封装起来，如下形式：*
```
const use = (()=>{
  if(window.localStorage !== undefined){
  
    const data ={
      /*  后续要用到的数据  */
    };
    
    (()=>{
      /*  另一些特定用处的数据  */
    })();
    
    function css(){
    }
    
    const func ={
      getR : function(){},
      Create : function(){},
      Attr : function(){},
      BuildClock : function(){},
      drawWhenFirst : function(){},
      core : function(){},
      mainOfClock : function(){},
      slider : function(){},
      buildCanvas : function(){},
      move : function(){},
      isClickButtonTouchEnd : function(){},
      isFuncArray_0_TouchEnd : function(){},
      isFuncArray_1_TouchEnd : function(){},
      isFuncArray_2_TouchEnd : function(){},
      makeKeyWordLight : function(){},
      isFuncArray_3_TouchEnd : function(){},
      ballLoop : function(){},
      meLoop : function(){},
      orientation : function(){},
      isCollision : function(){},
      funcArray_5_ : function(){},
      isFuncArray_4_TouchEnd : function(){},
      isFuncArray_5_TouchEnd : function(){}
    };
    
    func.Create.prototype.set=function(){
    };
    
    func.BuildClock.prototype.init=function(){
    };
    
    func.BuildClock.prototype.drawMessage=function(){
    };
    
    func.BuildClock.prototype.drawArc=function(){
    };
    
    func.BuildClock.prototype.drawLine=function(){
    };
    
    retuen {
      css : css,
      data : data,
      func : func
    };
    
  }
})();
```
*接着仍然在原匿名立即执行函数里开始写主程序*
```
if(window.localStorage!==undefined){
  /*  主程序代码 */
}else{
  alert('不支持window.localStorage......');
}
```
