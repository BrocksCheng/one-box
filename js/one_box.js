'use strict';

(()=>{
const use=(()=>{
    if(window.localStorage !== undefined){
    const data={
        n:null,
        w:document.documentElement.clientWidth,
        h:document.documentElement.clientHeight,
        //html node
        clickButton:null,
        gameBox:null,
        me:null,
        ball:null,
        backBox:null,
        funcArray:[],
        sliderArray:[],
        notMe:[],
        angleBar:null,
        inAngleBar:null,
        _sp:null,
        canB:null,
        can:null,
        //interval
        intervalOfClock:null,
        intervalOfSlider:null,
        intervalOfMove:null,
        //timeout
        isLongPress:null,
        //flags
        requestOfOri:false,
        requestOfMove:false,
        request:false,
        canMove:false,
        isClickButtonC:false,
        four:false,
        isVertical:true,
        changeA:false,
        five:false,
        //other
        lastG:null,
        mes:[
        '测试0','测试1','测试2','关键字高亮','测试4','小游戏'
        ]
    };
    (()=>{
        //兼容横屏
        if(data.w>data.h){
            /*    此处逻辑较为简单,后续更新改进    */
            data.isVertical=false;
            [data.w,data.h]=[data.h,data.w];
        }
        data.k=data.w*0.48/60;
        data.n=0.17*data.w;
        data.g_d={
            //will change
            speed:2,
            hit:0,
            distanceX:0.26*data.w,
            distanceY:0.59*data.w,
            //not change
            borderX:0.52*data.w,
            borderY:0.61*data.w,
            keyY:0.59*data.w,
            len:0.04*data.w 
        };
        data.angle={
            x1:0.38*data.w,
            x2:0.94*data.w
        };
    })();
    /*    为内联样式添加transform属性    */
    function css(){
        //'use strict';
        if(arguments.length===2 || arguments.length>=3){
            let thisObj=arguments[0],type=arguments[1];
            if(thisObj!==null){
                /*thisObj is a html object???*/
                let textAll=thisObj.getAttribute('style');
                let hasTransform=/transform/g.test(textAll);
                if(textAll===null || !hasTransform){
                    textAll+='-webkit-transform:translateX(0px)translateY(0px)rotate(0deg)!important;';
                    thisObj.setAttribute('style',textAll);
                }
                if(arguments.length===2){
                    /*读操作*/
                    let array=textAll.match(/translateX\(\-?\d+(\.\d+)?px\)\s*?translateY\(\-?\d+(\.\d+)?px\)\s*?rotate\(\-?\d+(\.\d+)?deg\)/g)[0].match(/\-?\d+(\.\d+)?/g);
                    /*console.log('textAll: '+textAll,'length: '+array.length,'array: '+array);*/
                    switch(type){
                        case'X':return Number(array[0]);
                        case'Y':return Number(array[1]);
                        case'R':return Number(array[2]);
                        default:;
                    }
                }else{
                    /*写操作*/
                    let value=arguments[2];
                    switch(type){
                        case'X':
                        textAll=textAll.replace(/X\(\-?\d+(\.\d+)?px\)/,'X('+value+'px)');break;
                        case'Y':
                        textAll=textAll.replace(/Y\(\-?\d+(\.\d+)?px\)/,'Y('+value+'px)');break;
                        case'R':
                        textAll=textAll.replace(/rotate\(\-?\d+(\.\d+)?deg\)/,'rotate('+value+'deg)');break;
                        default:;
                    }
                    thisObj.setAttribute('style',textAll);
                    /*console.info(thisObj.getAttribute('style'));*/
                }
            }
        }
    }
    const func={
        getR:function(){
            return arguments.length===0?Math.floor(Math.random()*256):Math.random()*arguments[0];
        },
        //_______________________________________________
        Create:function(){
            this.div=document.createElement('div');
        },
        //_______________________________________________
        Attr:function(){
            if(arguments.length===2||arguments.length===3){
                let thisObj=arguments[0],attr=arguments[1];
                let _style=thisObj.getAttribute('style');
                //console.info(_style);
                if(arguments.length===2){
                    /*读取*/
                    switch(attr){
                        case 'width':{
                            return _style.match(/width:\s*?\-?\d+(\.\d+)?vmin/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'height':{
                            return _style.match(/height:\s*?\-?\d+(\.\d+)?vmin/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'display':{
                            return _style.match(/display:[^!]*/g)[0].match(/:.*/g)[0].replace(':','');
                        }
                        case 'zIndex':{
                            return _style.match(/z\-index:\s*?\-?\d+(\.\d+)?/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'borderRadius':{
                            return _style.match(/border[\-b-t]+radius:\s*?\-?\d+(\.\d+)?/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'lineHeight':{
                            return _style.match(/line\-height:\s*?\-?\d+(\.\d+)?/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'fontSize':{
                            return _style.match(/font\-size:\s*?\-?\d+(\.\d+)?/g)[0].match(/\-?\d+(\.\d+)?/g)[0];
                        }
                        case 'background':{
                            return _style.match(/background\-color:\s*?rgba?\([^\)]+/g)[0].match(/[^a-z\-\:\(\)]+/g)[0];
                        }
                        default:;
                    }
                }else{
                    /*写入*/
                    let value=arguments[2];
                    switch(attr){
                        case 'width':{
                            _style= _style.replace(
                            /width:\s*?\-?(\d+|\d+\.\d+)vmin/,
                            'width:'+value+'vmin'
                            );
                        }break;
                        case 'height':{
                            _style= _style.replace(
                            /height:\s*?\-?(\d+|\d+\.\d+)vmin/,
                            'height:'+value+'vmin'
                            );
                        }break;
                        case 'display':{
                            _style=_style.replace(
                            /display:[^!]*/,
                            'display:'+value
                            );
                        }break;
                        case 'zIndex':{
                            _style=_style.replace(
                            /z\-index:\s*?\-?\d+(\.\d+)?/,
                            'z-index:'+value
                            );
                        }break;
                        case 'borderRadius':{
                            _style=_style.replace(
                            /border[\-b-t]+radius:\s*?\-?\d+(\.\d+)?/g,
                            'border-radius:'+value
                            );
                        }break;
                        case 'lineHeight':{
                            _style=_style.replace(
                            /line\-height:\s*?\-?\d+(\.\d+)?/,
                            'line-height:'+value
                            );
                        }break;
                        case 'fontSize':{
                            _style=_style.replace(
                            /font\-size:\s*?\-?\d+(\.\d+)?/,
                            'font-size:'+value
                            );
                        }break;
                        case 'background':{
                            _style=_style.replace(
                            /background\-color:\s*?rgba?\([^\)]+/,
                            'background-color:rgba('+value
                            );
                        }break;
                        default:;
                    }
                    //console.info(_style);
                    thisObj.setAttribute('style',_style);
                }
            }
        },
         //_______________________________________________
        BuildClock:function(){},
        //_______________________________________________
        drawWhenFirst:function(can,ctx,canB,ctxB){
            let clock=new func.BuildClock();
            func.core(clock,can,ctx);
            clock.init();
            //console.log('canB.width canB.height',canB.width,canB.height);/*300 150*/
            clock.drawArc(canB,ctxB,'rgba(255,0,0,0.1)',canB.width/6,0,2);/*画中心*/
            clock.drawMessage(canB,ctxB,'#f00');/*画刻度*/
        },
        //_______________________________________________
        core:function(clock,can,ctx){
            //console.log('can.width can.height',can.width,can.height);
            ctx.clearRect(0,0,can.width,can.height);
            let date=new Date(),
            hour=date.getHours();//0~23
            hour=hour>12?hour-12:hour;
            clock.drawLine(can,ctx,'#00ff00',hour*30,-(can.width/9),8);/*画时针*/
            let minute=date.getMinutes();//0~59
            clock.drawLine(can,ctx,'#ff00ff',minute*6,-(can.width/7),5);/*画分针*/
            let second=date.getSeconds();//0~59
            clock.drawLine(can,ctx,'#00fefe',second*6,-(can.width/5),2);/*画秒针*/
            let k=second*(2/60);
            for(let i=can.width/4;i<=can.width/2;i+=5){
                //75 -> 150
                !(i%2)?clock.drawArc(can,ctx,'#0ff',i,-0.5,-0.5+k):clock.drawArc(can,ctx,'#0059a7',i,-0.5,-0.5+k);
            }//画外圈
            //clock.drawArc(can,ctx,'#0ff',can.width/2,0,2);
        },
        //_______________________________________________
        mainOfClock:function(can,ctx){
            let clock=new func.BuildClock();
            data.intervalOfClock=window.setInterval(function(){
                func.core(clock,can,ctx);
            },1000);
        },
        //_______________________________________________
        slider:function(){
            /*后续更新添加复杂效果*/
            let num=0.75*data.w/2*Math.PI;
            let half=0.13*data.w/2;
            let _border=0.75*data.w;
            //console.info(num,half,_border);
            let value=[0,0],y=[0,0];
            data.intervalOfSlider=window.setInterval(()=>{
                for(let i=0;i<data.sliderArray.length;i++){
                    y[i]<_border?y[i]++:y[i]=0;
                    value[i]=i%2?Math.round(half*Math.sin(num*y[i])+half):Math.round(-half*Math.sin(num*y[i])+half);
                    css(data.sliderArray[i].div,'X',value[i]);
                    css(data.sliderArray[i].div,'Y',y[i]);
                }
            },100);
        },
        //_______________________________________________
        buildCanvas:function(parent){
            data.can=document.createElement('canvas');
            data.canB=document.createElement('canvas');
            data.can.setAttribute('style','border:1vmin solid rgba(0,255,255,0.1)!important;left:0vmin!important;top:14vmin!important;width:68vmin!important;position:absolute!important;display:none!important;');
            data.canB.setAttribute('style','border:1vmin solid rgba(0,255,255,0.1)!important;left:0vmin!important;top:14vmin!important;width:68vmin!important;position:absolute!important;display:none!important;');
            parent.appendChild(data.canB);//先添加背景canvas
            parent.appendChild(data.can);
        },
        //_______________________________________________
        move:function(finalY){
            let clear=function(){
                window.clearInterval(data.intervalOfMove);
                data.intervalOfMove=0;
            };
            //let m=0;//39
            //console.clear();
            if(data.intervalOfMove){
                clear();
                //console.info('already has interval,just clear');
                return;
            }
            data.intervalOfMove=window.setInterval(function(){
                let now=Math.round(css(data.backBox.div,'Y'));
                let t=Math.round((finalY-now)/10);
                /*    t:
                 *    1-(-100)
                 *    -276.5-(100)
                 */
                /*data.clickButton.div.innerHTML=t;*/
                if(t===0){
                    clear();
                    css(data.backBox.div,'Y',finalY);
                    //console.log(m);
                }else{
                    now+=t;
                    //m++;
                    css(data.backBox.div,'Y',now);
                    //console.info(now);
                }
            },1000/60);
        },
        //_______________________________________________
        isClickButtonTouchEnd:function(){
            if(!data.changeA){
            if(!data.isClickButtonC){
                data.isClickButtonC=true;
                func.Attr(this,'width',70);
                func.Attr(this,'height',50);
                func.Attr(this,'borderRadius',0);
                //console.info(data.can,data.canB);//null null
                let context;
                if(!data.canB){
                    func.buildCanvas(this);
                    context=data.can.getContext('2d');
                    let contextB=data.canB.getContext('2d');
                    func.drawWhenFirst(data.can,context,data.canB,contextB);
                }
                context=data.can.getContext('2d');
                func.mainOfClock(data.can,context);
                func.Attr(data.canB,'display','block');
                func.Attr(data.can,'display','block');
                //------>
                func.slider();
                //<------
                func.move(1);
            }else{
                data.isClickButtonC=false;
                window.clearInterval(data.intervalOfClock);
                data.intervalOfClock=0;
                window.clearInterval(data.intervalOfSlider);
                data.intervalOfSlider=0;
                func.Attr(this,'width',17);
                func.Attr(this,'height',17);
                func.Attr(this,'borderRadius',50);
                func.Attr(data.canB,'display','none');
                func.Attr(data.can,'display','none');
                if(func.Attr(data.angleBar.div,'display')==='block'){
                    func.Attr(data.angleBar.div,'display','none');
                }
                func.move(-0.79*data.w);
            }
            }
        },
        //_______________________________________________
        isFuncArray_0_TouchEnd:function(){
            //console.info(0);
        },
        //_______________________________________________
        isFuncArray_1_TouchEnd:function(){
            //console.info(1);
        },
        //_______________________________________________
        isFuncArray_2_TouchEnd:function(){
            //console.info(2);
        },
        //_______________________________________________
        makeKeyWordLight:function(tag,keyWord){
            let j=0;
            let tags=document.getElementsByTagName(tag);
            let replace_html=new RegExp('\<.*?\>','gi');
            let reg_exp=new RegExp(keyWord,'gi');
            let replace_key='<span style=\'background:#fcbb00\'>'+keyWord+'</span>';
            
            console.info('tags.length:    '+tags.length);
            
            for(let i=0;i<tags.length;i++){
                let inner=tags[i].innerHTML,array;
                let isDo=inner.match(reg_exp);
                if(isDo!==null){
                    array=inner.match(replace_html);
                    inner=inner.replace(replace_html,'·_·');
                    inner=inner.replace(reg_exp,replace_key);
                    inner=inner.replace(/·_·/g,function(){
                        return array[j++];
                    });
                    tags[i].innerHTML=inner;
                }
            }
        },
        //_______________________________________________
        isFuncArray_3_TouchEnd:function(){
            let keyWord=window.prompt('请输入要查找的关键字');
            let array=[
                'p','a','h1','h2','h3','h4','h5','h6'
            ];
            if(keyWord !== null){
                for(let i=0;i<array.length;i++){
                    func.makeKeyWordLight(array[i],keyWord);
                }
            }
        },
        //_______________________________________________
        ballLoop:function(_d){
            //console.info(data.ball._v.x,data.ball._v.y);
            if(_d.distanceX>=_d.borderX || _d.distanceX<=0){
                data.ball._v.x*=-1;
            }
            if(_d.distanceY<=0){
                data.ball._v.y*=-1;
            }
            let meX=css(data.me.div,'X');
            if(_d.distanceY>_d.keyY){
                if(_d.distanceX>=meX-_d.len && _d.distanceX<=meX+2*_d.len){
                    //console.info(':-)');
                    //console.info(data.g_d.hit);
                    if(data.g_d.hit===data.notMe.length){
                        window.removeEventListener('deviceorientation',func.orientation,false);
                        window.setTimeout(()=>{
                            alert('你不错,赢了!');
                        },500);
                        return;
                    }
                    data.ball._v.y*=-1;
                }else{
                    /*console.info(':-(');*/
                    css(data.ball.div,'Y',_d.borderY);
                    window.removeEventListener('deviceorientation',func.orientation,false);
                    window.setTimeout(()=>{
                        alert('你不行,输了!');
                    },500);
                    return;
                }
            }
            func.isCollision(_d.len);//碰撞检测
            //更新ball位置
            _d.distanceX+=data.ball._v.x;
            _d.distanceY+=data.ball._v.y;
            css(data.ball.div,'X',_d.distanceX);
            css(data.ball.div,'Y',_d.distanceY);
        },
        //_______________________________________________
        meLoop:function(_e){
            //该作用域被高频调用
            let gamma;
            //兼容横屏
            if(data.isVertical){
                gamma=Math.floor(_e.gamma);/* -90~90 for y*/
            }else{
                gamma=Math.floor(_e.beta);/* for x */
            }
            gamma=gamma>30?30:gamma<-30?-30:gamma;
            if(data.lastG !== gamma){
                //该作用域不被高频调用
                /*data.funcArray[0].div.innerHTML=gamma+'\n!==\n'+data.lastG;*/
                let n=Math.round(data.k*(gamma+30));
                css(data.me.div,'X',n);
                //console.info('moving...');
                data.lastG=gamma;
                /*data.funcArray[1].div.innerHTML=data.lastG;*/
            }
        },
        //_______________________________________________
        orientation:function(_e){
            //该作用域被高频调用
            if(!data.requestOfOri){//节流操作
                data.requestOfOri=true;
                window.requestAnimationFrame(()=>{
                    func.meLoop(_e);
                    func.ballLoop(data.g_d);
                    data.requestOfOri=false;
                });
            }
        },
        //_______________________________________________
        isCollision:function(len){
            //该作用域被高频调用
            let bX,bY,nX,nY;
            bX=css(data.ball.div,'X');
            bY=css(data.ball.div,'Y');
            for(let i=0;i<data.notMe.length;i++){
                nX=css(data.notMe[i].div,'X');
                nY=css(data.notMe[i].div,'Y');
                if(!(nX+len<=bX || nY+len<=bY || nY>=bY+len || nX>=bX+len)){
                    /*碰撞到*/
                    if(func.Attr(data.notMe[i].div,'display')!=='none'){
                        data.g_d.hit++;
                        data.ball._v.x*=-1;
                        data.ball._v.y*=-1;
                        func.Attr(data.notMe[i].div,'display','none');
                    }
                }
            }
        },
        //_______________________________________________
        funcArray_5_:function(){
            if(arguments[0]){
                //->true
                data.funcArray[5].div.style.boxShadow='1px 1px 20px rgba('+func.getR()+','+func.getR()+','+func.getR()+',1)';
                func.Attr(data.gameBox.div,'background','0,0,0,0.8');
                func.Attr(data.me.div,'display','block');
                func.Attr(data.ball.div,'display','block');
                func.Attr(data.angleBar.div,'display','block');
                func.Attr(data.pointer.div,'display','block');
                for(let i=0;i<data.notMe.length;i++){
                    css(data.notMe[i].div,'Y',func.getR(0.3)*data.w);
                    func.Attr(data.notMe[i].div,'display','block');
                }
            }else{
                //->false
                window.removeEventListener('deviceorientation',func.orientation,false);
                data.funcArray[5].div.style.boxShadow='1px 1px 20px rgba(0,255,255,0.4)';
                func.Attr(data.gameBox.div,'background','20,150,97,0.1');
                func.Attr(data.me.div,'display','none');
                func.Attr(data.ball.div,'display','none');
                func.Attr(data.angleBar.div,'display','none');
                func.Attr(data.pointer.div,'display','none');
                data._sp.innerHTML='';
                if(data.four){
                    data.four=false;
                    data.funcArray[4].div.style.boxShadow='1px 1px 20px rgba(0,255,255,0.4)';
                }
                css(data.pointer.div,'R',0);
                //inAngleBar复位
                data.changeA=false;
                css(data.inAngleBar.div,'X',0);
                func.Attr(data.inAngleBar.div,'width',56);
                //ball复位
                css(data.ball.div,'X',0.26*data.w);
                css(data.ball.div,'Y',0.59*data.w);
                data.g_d.hit=0;
                data.g_d.distanceX=0.26*data.w;
                data.g_d.distanceY=0.59*data.w;
                //me复位
                css(data.me.div,'X',0.24*data.w);
                css(data.me.div,'Y',0.63*data.w);
                for(let i=0;i<data.notMe.length;i++){
                    if(func.Attr(data.notMe[i].div,'display')!=='none'){
                        func.Attr(data.notMe[i].div,'display','none');
                    }
                }
            }
        },
        //_______________________________________________
        isFuncArray_4_TouchEnd:function(){
            if(typeof window.DeviceOrientationEvent !== 'undefined'){
            if(!data.four && data.five && data.changeA){
                data.four=true;
                data.funcArray[4].div.style.boxShadow='1px 1px 20px rgba('+func.getR()+','+func.getR()+','+func.getR()+',1)';
                window.setTimeout(()=>{
                    func.Attr(data.pointer.div,'display','none');
                },1000);
                window.addEventListener('deviceorientation',func.orientation,false);
                //console.info(1);
            }
            }else{
                alert('遗憾,你的设备不支持重力方向事件!');
            }
        },
        //_______________________________________________
        isFuncArray_5_TouchEnd:function(){
            data.five=!data.five?true:false;
            func.funcArray_5_(data.five);
            //console.info(data.five);
        }
    };
    func.Create.prototype.set=function(){
        //html width height lineH fontS display radius x y
        let nObj=arguments[0];
        this.div.innerHTML=nObj.html;
        this.div.setAttribute('style','position:fixed!important;left:0px!important;top:0px!important;font-size:'+nObj.fontS+'vmin!important;width:'+nObj.width+'vmin!important;box-shadow:1px 1px 20px rgba(0,255,255,0.4)!important;color:#971000!important;display:'+nObj.display+'!important;outline:'+nObj.outline+'!important;height:'+nObj.height+'vmin!important;background-color:rgba(20,150,97,0.1)!important;line-height:'+nObj.lineH+'vmin!important;text-align:center!important;z-index:100000!important;border-radius:'+nObj.radius+'%!important;-webkit-user-select:none!important;');
        css(this.div,'X',nObj.x);
        css(this.div,'Y',nObj.y);
        nObj.parent.appendChild(this.div);
        //console.log(this.div);//html object
        //console.log(this);//object of new Create()
    };
    func.BuildClock.prototype.init=function(){
        this.array=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
    };
    func.BuildClock.prototype.drawMessage=function(can,ctx,fillStyle){
        let len=can.width/5,key=30*Math.PI/180,x,y;
        let correctionX=-6,correctionY=4;//适配当前设备位置修正变量
        for(let i=0;i<this.array.length;i++){//0~11
            ctx.fillStyle=fillStyle;
            ctx.font='3vmin microsoft-yahei';
            x=Math.round(can.width/2+len*Math.sin(i*key));
            y=Math.round(can.height/2-len*Math.cos(i*key));
            ctx.fillText(this.array[i],x+correctionX,y+correctionY);
        }
    };
    func.BuildClock.prototype.drawArc=function(can,ctx,_style,radius,k0,k1){
        ctx.beginPath();
        radius<can.width/5?ctx.fillStyle=_style:ctx.strokeStyle=_style;
        ctx.arc(can.width/2,can.height/2,radius,k0*Math.PI,k1*Math.PI);
        radius<can.width/5?ctx.fill():ctx.stroke();
    };
    func.BuildClock.prototype.drawLine=function(can,ctx,strokeStyle,n,len,lineWidth){
    ctx.save();
    ctx.beginPath();
    ctx.translate(can.width/2,can.height/2);
    ctx.rotate(n*Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,len);
    ctx.strokeStyle=strokeStyle;
    ctx.lineCap='round';
    ctx.lineWidth=lineWidth;
    ctx.stroke();
    ctx.restore();
    };
    return{
        css:css,
        data:data,
        func:func
    };
    }
})();

if(window.localStorage!==undefined){
console.clear();
//console.log(use.data.w,use.data.h);//395 592
if(typeof window.localStorage['^X@']==='undefined'){
    window.localStorage['^X@']=0.01*use.data.w;
}
if(typeof window.localStorage['^Y@']==='undefined'){
    window.localStorage['^Y@']=0.6*use.data.h;
}

/*clickButton*/
use.data.clickButton=new use.func.Create();
use.data.clickButton.set({
    outline:'1px solid #00fefe',
    parent:document.body,
    html:'<br/>:点击复原:<br/>:长按移动:',
    width:17,
    height:17,
    lineH:4,
    fontS:3,
    display:'block',
    radius:50,
    x:window.localStorage['^X@'],
    y:window.localStorage['^Y@']
});
use.func.Attr(use.data.clickButton.div,'zIndex',100001);
/*backBox*/
use.data.backBox=new use.func.Create();
use.data.backBox.set({
    outline:'1px solid #00fefe',
    parent:document.body,
    html:'',
    width:95,
    height:79,
    lineH:'',
    fontS:'',
    display:'block',
    radius:0,
    x:0.025*use.data.w,
    y:-0.79*use.data.w
});
use.func.Attr(use.data.backBox.div,'background','255,255,255,0');
/*angleBar*/
use.data.angleBar=new use.func.Create();
use.data.angleBar.set({
    outline:'',
    parent:use.data.backBox.div,
    html:'',
    width:56,
    height:11,
    lineH:'',
    fontS:3,
    display:'none',
    radius:0,
    x:0.38*use.data.w,
    y:0.67*use.data.w
});
/*inAngleBar*/
use.data.inAngleBar=new use.func.Create();
use.data.inAngleBar.set({
    outline:'',
    parent:use.data.angleBar.div,
    html:'',
    width:56,
    height:11,
    lineH:'',
    fontS:'',
    display:'block',
    radius:0,
    x:0,
    y:0
});
use.func.Attr(use.data.inAngleBar.div,'background','0,200,200,0.4');
(()=>{
    use.data._sp=document.createElement('span');
    use.data.angleBar.div.appendChild(use.data._sp);
})();
/*funcArray*/
for(let i=0,t=0.01;i<6;i++,t+=0.11){
    use.data.funcArray.push(new use.func.Create());
    use.data.funcArray[i].set({
        outline:'',
        parent:use.data.backBox.div,
        html:use.data.mes[i],
        width:20,
        height:10,
        lineH:10,
        fontS:3,
        display:'block',
        radius:5,
        x:0.17*use.data.w,
        y:t*use.data.w
    });
}
/*sliderArray*/
for(let i=0;i<2;i++){
    use.data.sliderArray.push(new use.func.Create());
    use.data.sliderArray[i].set({
        outline:'',
        parent:use.data.backBox.div,
        html:'-_-',
        width:4,
        height:4,
        lineH:3,
        fontS:3,
        display:'block',
        radius:50,
        x:0,
        y:0
    });
}
use.data.sliderArray[0].div.style.background='rgba(255,10,100,0.5)';
/*gameBox*/
use.data.gameBox=new use.func.Create();
use.data.gameBox.set({
    outline:'',
    parent:use.data.backBox.div,
    html:'',
    width:56,
    height:65,
    lineH:'',
    fontS:'',
    display:'block',
    radius:0,
    x:0.38*use.data.w,
    y:0.01*use.data.w
});
/*pointer*/
use.data.pointer=new use.func.Create();
use.data.pointer.set({
    outline:'',
    parent:use.data.gameBox.div,
    html:'',
    width:1,
    height:25,
    lineH:'',
    fontS:'',
    display:'none',
    radius:50,
    x:0.275*use.data.w,
    y:0.36*use.data.w
});
use.func.Attr(use.data.pointer.div,'background','0,200,200,1');
use.data.pointer.div.style.transformOrigin='center bottom';
/*me*/
use.data.me=new use.func.Create();
use.data.me.set({
    outline:'',
    parent:use.data.gameBox.div,
    html:'',
    width:8,
    height:2,
    lineH:'',
    fontS:'',
    display:'none',
    radius:8,
    x:0.24*use.data.w,
    y:0.63*use.data.w
});
use.func.Attr(use.data.me.div,'background','0,255,255,0.8');
/*ball*/
use.data.ball=new use.func.Create();
use.data.ball.set({
    outline:'',
    parent:use.data.gameBox.div,
    html:'',
    width:4,
    height:4,
    lineH:'',
    fontS:'',
    display:'none',
    radius:50,
    x:0.26*use.data.w,
    y:0.59*use.data.w
});
use.func.Attr(use.data.ball.div,'background','0,200,200,1');
/*notMe*/
for(let i=0,t=0;i<14;i++,t+=0.04){
    use.data.notMe.push(new use.func.Create());
    use.data.notMe[i].set({
        outline:'',
        parent:use.data.gameBox.div,
        html:'',
        width:4,
        height:4,
        lineH:'',
        fontS:'',
        display:'none',
        radius:0,
        x:t*use.data.w,
        y:0
    });
    use.func.Attr(use.data.notMe[i].div,'background','255,10,250,0.8');
}

//____________________________________________________
window.addEventListener('touchstart',function(_e){
    _e.preventDefault();
    switch(_e.target){
        case use.data.clickButton.div:{
            use.data.isLongPress=window.setTimeout(function(){
                //console.info('long press');
                use.func.Attr(_e.target,'background','0,0,0,0.5');
                /*长按两秒*/
                use.data.canMove=true;
            },2000);
        }break;
        case use.data._sp:;
        case use.data.inAngleBar.div:;
        case use.data.angleBar.div:{
            let getX=_e.targetTouches[0].clientX;
            let x=Math.round(getX-use.data.angle.x1);
            let w=Math.round(100*(use.data.angle.x2-getX)/use.data.w);
            //console.info(x,w,getX);
            use.css(use.data.inAngleBar.div,'X',x);
            use.func.Attr(use.data.inAngleBar.div,'width',w);
        }break;
        default:;
    }
},false);
//____________________________________________________
use.data.clickButton.div.addEventListener('touchmove',function(_e){
    _e.preventDefault();
    window.clearTimeout(use.data.isLongPress);
    use.data.isLongPress=0;
    
    if(use.data.canMove){
    if(!use.data.requestOfMove){
    use.data.requestOfMove=true;
    window.requestAnimationFrame(()=>{
        //console.log(this===use.data.clickButton.div,_e.target===use.data.clickButton.div);
        //触发一次事件打印一次true true
        let that=use.data.clickButton.div;
        let x=use.css(that,'X');
        let y=use.css(that,'Y');
        let n=Math.round(use.data.n/2);
        //console.info('n',n,use.data.n/2)
        let getX=_e.targetTouches[0].clientX-n;
        let getY=_e.targetTouches[0].clientY-n;
        //console.info(_e.targetTouches[0]===that);//false
        //console.info(_e.targetTouches[0].pageY===_e.pageY,_e.targetTouches[0].pageY===_e.targetTouches[0].screenY,_e.targetTouches[0].pageY,getY,_e.targetTouches[0].screenY);//true true
        if(getX>0 && getX<use.data.w-use.data.n && getY>0 && getY<use.data.h-use.data.n){
            //范围限制
            that.style.boxShadow='1px 1px 20px rgb('+use.func.getR()+','+use.func.getR()+','+use.func.getR()+')';
            if(x!==getX){
                use.css(that,'X',getX);
            }
            if(y!==getY){
                use.css(that,'Y',getY);
            }
        }
        use.data.requestOfMove=false;
        });
    }
    }//canMove
},false);
//____________________________________________________
use.data.angleBar.div.addEventListener('touchmove',function(_e){
    _e.preventDefault();
    if(!use.data.request){
        use.data.request=true;
        window.requestAnimationFrame(()=>{
            //console.info(_e.target===use.data.angleBar.div);//true
            //142.2 363.4
            let getX=_e.targetTouches[0].clientX;
            let x=Math.round(getX-use.data.angle.x1);
            let w=Math.round(100*(use.data.angle.x2-getX)/use.data.w);
            if(getX>=use.data.angle.x1 && getX<=use.data.angle.x2){
                use.data.angleBar.div.style.boxShadow='1px 1px 20px rgb('+use.func.getR()+','+use.func.getR()+','+use.func.getR()+')';
                //use.data.funcArray[2].div.innerHTML=x+'\n'+w+'\n'+getX;
                use.css(use.data.inAngleBar.div,'X',x);
                use.func.Attr(use.data.inAngleBar.div,'width',w);
            }
            use.data.request=false;
        });
    }
},false);
//____________________________________________________
window.addEventListener('touchend',function(ev){
    //ev.preventDefault();
    switch(ev.target){
        /*主键监听*/
        case use.data.clickButton.div:{
            
            window.clearTimeout(use.data.isLongPress);
            use.data.isLongPress=0;
            
            if(use.data.canMove){
                use.data.canMove=false;
                let that=use.data.clickButton.div;
                let x=use.css(that,'X');
                let y=use.css(that,'Y');
                if(x!==window.localStorage['^X@']){
                    window.localStorage['^X@']=x;
                }
                if(y!==window.localStorage['^Y@']){
                    window.localStorage['^Y@']=y;
                }
                use.func.Attr(that,'background','20,150,97,0.1');
                that.style.boxShadow='1px 1px 20px rgba(0,255,255,0.4)';
                //console.info('localX:'+window.localStorage['^X@'],'localY:'+window.localStorage['^Y@']);
            }else{
                use.func.isClickButtonTouchEnd.call(use.data.clickButton.div);
            }
        }break;
        /*funcArray数组监听*/
        case use.data.funcArray[0].div:{
            use.func.isFuncArray_0_TouchEnd();
        }break;
        case use.data.funcArray[1].div:{
            use.func.isFuncArray_1_TouchEnd();
        }break;
        case use.data.funcArray[2].div:{
            use.func.isFuncArray_2_TouchEnd();
        }break;
        case use.data.funcArray[3].div:{
            use.func.isFuncArray_3_TouchEnd();
        }break;
        case use.data.funcArray[4].div:{
            use.func.isFuncArray_4_TouchEnd();
        }break;
        case use.data.funcArray[5].div:{
            use.func.isFuncArray_5_TouchEnd();
        }break;
        case use.data._sp:;
        case use.data.inAngleBar.div:;
        case use.data.angleBar.div:{
            let getX=ev.changedTouches[0].clientX;
            let k=180/(use.data.angle.x1-use.data.angle.x2);
            use.data.angleBar.div.style.boxShadow='1px 1px 20px rgba(0,255,255,0.4)';
            if(getX>=use.data.angle.x1 && getX<=use.data.angle.x2){
                //角度转化为弧度(整数)
                //角度需要自定义,不可随机
                let angle=Math.floor(k*(getX-use.data.angle.x2));
                use.data._sp.innerHTML=`角度:${ angle}°`;
                if(use.func.Attr(use.data.pointer.div,'display')!=='none'){
                    use.css(use.data.pointer.div,'R',90-angle);
                }
                angle*=(Math.PI/180);
                use.data.ball._v={
                    x:Math.cos(angle)*use.data.g_d.speed,
                    y:Math.sin(angle)*use.data.g_d.speed
                };
                use.data.changeA=true;
            }
        }break;
        default:;
    }
},false);
//console.info(use);
//____________________________________________________
}else{
    alert('不支持window.localStorage......');
}


})();