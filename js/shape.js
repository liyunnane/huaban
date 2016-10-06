function shape(canvas,cobj,zhezhao){
    this.zhezhao=zhezhao;
    this.obj=canvas;
    this.cobj=cobj;
    this.type="line";
    this.strokewidth=1;
    this.fillStyle="#000000";
    this.strokeStyle="#000000";
    this.style="stroke";
    this.history=[this.cobj.getImageData(0,0,this.obj.width,this.obj.height)];
    this.biannum=5;
    this.jiandu=3;
    this.xu=4;
    this.opacity=1;
    this.jilunum=1;
    this.xpsize=10;
    this.draw();
    
    this.width=this.obj.width;
    this.height=this.obj.height;

}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.strokewidth;
        this.cobj.fillStyle="rgba("+this.fillStyle.colorRgb()+","+this.opacity+")";
        this.cobj.strokeStyle="rgba("+this.strokeStyle.colorRgb()+","+this.opacity+")";
        this.history.splice((this.history.length-this.jilunum+1));
        this.jilunum=1;
    },
    draw:function () {
        var that=this;
        that.init();
        that.zhezhao.onmousedown=function (e) {
           var startx=e.offsetX;
           var starty=e.offsetY;
            if(that.type=="qianbi"){
                that.cobj.beginPath();
                that.cobj.moveTo(startx,starty);
            }
            document.onmousemove=function (e){
              var endx=e.offsetX;
              var endy=e.offsetY;
                if(that.type=="qianbi"){
                        that.qianbi(endx,endy);
                }else{
                  that.cobj.clearRect(0,0,that.obj.width,that.obj.height);
                    if(that.history.length!=0){
                        that.cobj.putImageData(that.history[that.history.length-1],0,0);
                    }
                  that[that.type](startx,starty,endx,endy);
                }
            } ;
               document.onmouseup=function (){
               document.onmousemove=null;
               document.onmouseup=null;
               that.history.push(that.cobj.getImageData(0,0,that.obj.width,that.obj.height));

            }
        }
    },
    back:function () {

            this.cobj.putImageData(this.history[this.history.length-this.jilunum],0,0);
       

        // this.history.push(this.cobj.getImageData(0,0,this.obj.width,this.obj.height));
    },
    go:function () {
        this.cobj.putImageData(this.history[this.history.length-this.jilunum],0,0);
        // this.history.push(this.cobj.getImageData(0,0,this.obj.width,this.obj.height));
    },
    line:function (sx,sy,ex,ey) {
        this.cobj.beginPath();
        this.cobj.moveTo(sx,sy);
        this.cobj.lineTo(ex,ey);
        this.cobj.stroke();
    },
    xuline:function (sx,sy,ex,ey) {
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        var num=Math.ceil(r/this.xu);
        var fx=(ex-sx)/(ey-sy);
        var xuxian=0;
        var arr=[];
        for(var i=0;i<num;i++){
            if(ey>sy){
                var diany=ey-Math.sqrt(xuxian*xuxian/(fx*fx+1));
            }else{
                var diany=ey+Math.sqrt(xuxian*xuxian/(fx*fx+1));
            }
            var dianx=ex+(diany-ey)*fx;
            var obj={x:dianx,y:diany};
            arr.push(obj);
            if(i%2!=0){
                this.cobj.beginPath();
                this.cobj.moveTo(arr[i-1].x,arr[i-1].y);
                this.cobj.lineTo(arr[i].x,arr[i].y);
            }
                this.cobj.stroke();
            xuxian+=parseFloat(this.xu);
        }
    },
    rect:function (sx,sy,ex,ey) {
        this.cobj.beginPath();
        this.cobj.rect(sx,sy,ex-sx,ey-sy);
        this.cobj[this.style]();
    },
    bian:function (sx,sy,ex,ey) {
        this.cobj.beginPath();
        var jiaodu=360/this.biannum*Math.PI/180;
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(Math.cos(jiaodu*i)*r+sx,Math.sin(jiaodu*i)*r+sy);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function (sx,sy,ex,ey) {
        this.cobj.beginPath();
        var jiaodu=(360/(this.biannum*2)*Math.PI)/180;
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        var r2=r/this.jiandu;
        for(var i=0;i<this.biannum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(Math.cos(jiaodu*i)*r+sx,Math.sin(jiaodu*i)*r+sy);
            }else{
                this.cobj.lineTo(Math.cos(jiaodu*i)*r2+sx,Math.sin(jiaodu*i)*r2+sy);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    yuan:function (sx,sy,ex,ey) {
        this.cobj.beginPath();
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        this.cobj.arc(sx,sy,r,0,Math.PI*2);
        this.cobj[this.style]();
    },
    qianbi:function (ex,ey) {
        this.cobj.lineTo(ex,ey);
        this.cobj[this.style]();
    },
    xiangpi:function (xp) {
        var that=this;
        that.zhezhao.onmousemove=function (e) {
            xp.show();
            var movex=e.offsetX;
            var movey=e.offsetY;
            that.xiangpimove(movex,movey,xp);
            that.zhezhao.onmousedown=function (e) {
                var startx=e.offsetX;
                var starty=e.offsetY;

                that.zhezhao.onmousemove=function (e){
                    var movex=e.offsetX;
                    var movey=e.offsetY;
                    that.xiangpimove(movex,movey,xp);
                        that.cobj.clearRect(movex-(that.xpsize)/2,movey-(that.xpsize)/2,that.xpsize,that.xpsize);
                } ;
                document.onmouseup=function (){
                    that.zhezhao.onmousemove=null;
                    document.onmouseup=null;
                    that.history.push(that.cobj.getImageData(0,0,that.obj.width,that.obj.height));
                    that.xiangpi(xp);
                }
            }
        }


    },
    xiangpimove:function(movex,movey,xp){
        var that=this;
        var leftz=movex-(that.xpsize)/2;
        var topz=movey-(that.xpsize)/2;
        if(leftz<0){
            leftz=0;
        }
        if(leftz>that.width-that.xpsize){
            leftz=that.width-that.xpsize;
        }
        if(topz<0){
            topz=0;
        }
        if(top>that.height-that.xpsize){
            topz=that.height-that.xpsize;
        }
        xp.css({left:leftz ,top:topz,width:that.xpsize,height:that.xpsize});
    },
    save:function () {
        location.href=this.obj.toDataURL().replace("data:image/png","data:stream/octet");
    },
    check:function (box,save) {
        var that=this;
        var wid;
        var hei;
        var startx;
        var starty;
        that.zhezhao.onmousedown=function (e) {
            startx=e.offsetX;
            starty=e.offsetY;
            if(save){
                that.zhezhao.flag=false;
                that.history.push(that.cobj.getImageData(0,0,that.obj.width,that.obj.height));
            }
            that.zhezhao.onmousemove=function (e){
                var endx=e.offsetX;
                var endy=e.offsetY;
                wid=endx-startx;
                hei=endy-starty;
                box.show().css({top:starty,left:startx,width:wid,height:hei});
            } ;
            that.zhezhao.onmouseup=function (){
                that.zhezhao.onmousemove=null;
                that.zhezhao.onmouseup=null;
                that.zhezhao.onmousedown=null;
                that.checkyidong(box,startx,starty,wid,hei);
            }
        }

    },
    checkyidong:function (box,startx,starty,wid,hei,img,imgyuan) {
        var that=this;
        var img=img||null;
        var imgyuan=imgyuan||null;
        that.zhezhao.onmousemove=function (e) {
            var jianchax=e.offsetX;
            var jianchay=e.offsetY;

            if(jianchax<startx||jianchax>startx+wid||jianchay<starty||jianchay>starty+hei){

                $(that.zhezhao).css({cursor:" crosshair"});
                that.check(box,true);
            }else{
                $(that.zhezhao).css({cursor:"move"});
                    that.zhezhao.onmousedown=function (e) {
                        var sx=e.offsetX;
                        var sy=e.offsetY;
                        if(!that.zhezhao.flag){
                            that.zhezhao.flag=true;
                           img=that.cobj.getImageData(startx,starty,wid,hei);
                            that.cobj.clearRect(startx,starty,wid,hei);
                           imgyuan=that.cobj.getImageData(0,0,that.obj.width,that.obj.height);
                        }
                        that.zhezhao.onmousemove=function (e) {
                        var movex=e.offsetX;
                        var movey=e.offsetY;
                        that.checkmove(movex,movey,box,wid,hei);
                            that.cobj.putImageData(imgyuan,0,0);
                            that.cobj.putImageData(img,movex-wid/2,movey-hei/2);
                            startx=movex-wid/2;
                            starty=movey-hei/2;
                    }
                    that.zhezhao.onmouseup=function (e){
                        that.zhezhao.onmousemove=null;
                        that.zhezhao.onmouseup=null;
                        that.checkyidong(box,startx,starty,wid,hei,img,imgyuan);
                    }
                }

            }
            // that.history.push(that.cobj.getImageData(0,0,that.obj.width,that.obj.height));
        };
    },
    checkmove:function(movex,movey,xp,w,h){
        var that=this;
        var leftz=movex-w/2;
        var topz=movey-h/2;
        if(leftz<0){
            leftz=0;
        }
        if(leftz>that.width-w){
            leftz=that.width-w;
        }
        if(topz<0){
            topz=0;
        }
        if(top>that.height-h){
            topz=that.height-h;
        }
        xp.css({left:leftz ,top:topz});
    }

};
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
    var that = this;
    if(/^(rgb|RGB)/.test(that)){
        var aColor = that.replace(/(?:||rgb|RGB)*/g,"").split(",");
        var strHex = "#";
        for(var i=0; i<aColor.length; i++){
            var hex = Number(aColor[i]).toString(16);
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = that;
        }
        return strHex;
    }else if(reg.test(that)){
        var aNum = that.replace(/#/,"").split("");
        if(aNum.length === 6){
            return that;
        }else if(aNum.length === 3){
            var numHex = "#";
            for(var i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "" + sColorChange.join(",") + "";
    }else{
        var sColor=sColor.slice(0,-1).slice(5);
        var scolorarr=sColor.split(",");
        scolorarr.pop();
        sColor= scolorarr.join(",");
        return sColor;
    }
};

//
//
// function () {
//     caves.toDataURL();
//     data:stream/octet;
// }