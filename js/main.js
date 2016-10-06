
$(function () {
    var canvas=$('canvas');
    var color="#000000";
    var cuxi=1;
    var arr=[];
    var img;
    $(".xian").click(function () {
        canvas.off("mousedown");
         $(document).off("mouseup");
        createxian();
    });
    var num=1;
    $(".back").click(function () {
        num++;
        canvas.off("mousedown");
        $(document).off("mouseup");
        cobj.clearRect(0,0,1000,800);
        // jilu("back");
        if(arr.length>1){
            arr.pop();
            cobj.putImageData(arr[arr.length-1],0,0);
        }else{
            cobj.clearRect(0,0,1000,800);
            alert('mei');
        }

    });
 var arr=[];
var num=5;
    var cobj=canvas[0].getContext("2d");
    function  createxian(type) {
        canvas.off("mousedown").on("mousedown",function (e) {
            e.preventDefault();
            var x=e.offsetX;
            var y=e.offsetY;

            var x1;
            var y1;
            $(document).on("mousemove",function (e1) {
                e1.preventDefault();
                x1=e1.offsetX;
                y1=e1.offsetY;
                cobj.clearRect(0,0,1000,800);
              //   if(arr.length!=0){
              //       cobj.putImageData(arr[arr.length-1],0,0);
              //   }
              //   cobj.beginPath();
              //   var jiaodu=360/num*Math.PI/180;
              //   var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
              // for(var i=0;i<num;i++){
              //       cobj.lineTo(Math.cos(jiaodu*i)*r+x,Math.sin(jiaodu*i)*r+y);
              // }
              //   cobj.closePath();

                if(arr.length!=0){
                    cobj.putImageData(arr[arr.length-1],0,0);
                }
                cobj.beginPath();
                var jiaodu=360/(num*2)*Math.PI/180;
                var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
                var r2=((3-Math.sqrt(3))/3)*r;
                // var r2=r/3;
                for(var i=0;i<(num*2);i++){
                    if(i%2==0){
                         cobj.lineTo(Math.cos(jiaodu*i)*r+x,Math.sin(jiaodu*i)*r+y);
                    }else{
                         cobj.lineTo(Math.cos(jiaodu*i)*r2+x,Math.sin(jiaodu*i)*r2+y);
                    }
                }
                  cobj.closePath();
                  cobj.stroke();
            });
            $(document).off("mouseup").mouseup(function (e2) {
                e2.preventDefault();
                $(document).off("mousemove");
                $(document).off("mouseup");
                img=cobj.getImageData(0,0,1000,800);
                arr.push(img);
            })
        })
    }

    // if(localStorage.huaban){
    //     geteDate();
    //     jilu();
    // }
    // function  ceartcanvas(sx,sy,ex,ey,type) {
    //     var obj={img:type};
    //         cobj.clearRect(0,0,1000,800);
    //     if(type){
    //       arr.push(obj);
    //         saveDate(arr);
    //     }else{
    //         cobj.beginPath();
    //         cobj.moveTo(sx,sy);
    //         cobj.lineTo(ex,ey);
    //         cobj.strokeStyle=color;
    //         cobj.lineWidth=cuxi;
    //         cobj.stroke();
    //     }
    //     // if(qianbi){
    //     //     arr.push(obj);
    //     //     saveDate(arr);
    //     //     cobj.moveTo(sx,sy);
    //     //     cobj.lineTo(ex,ey);
    //     //     cobj.strokeStyle=color;
    //     //     cobj.lineWidth=cuxi;
    //     //     cobj.stroke();
    //     // }
    //     jilu();
    // }
    // function clearcanvas(sx,sy,ex,ey) {
    //     cobj.clearRect(sx,sy,ex,ey);
    //     arr=[];
    //     saveDate(arr);
    // }
    // function  ceartcanvasxzh(sx,sy,ex,ey,type,fill,xpcolor) {
    //     var colorju=xpcolor||color;
    //     if(fill){
    //        var obj={stx:sx,sty:sy,endx:ex,endy:ey,col:colorju,tp:"kuang",fill:"yes"};
    //     }else{
    //         var obj={stx:sx,sty:sy,endx:ex,endy:ey,col:color,cuxiz:cuxi,tp:"kuang",fill:"no"};
    //     }
    //     cobj.clearRect(0,0,1000,800);
    //     if(type){
    //         arr.push(obj);
    //         saveDate(arr);
    //     }else{
    //         cobj.beginPath();
    //         cobj.rect(sx,sy,ex,ey);
    //         if(fill){
    //             cobj.strokeStyle=colorju;
    //             cobj.fill();
    //         }else{
    //             cobj.fillStyle=color;
    //              cobj.lineWidth=cuxi;
    //             cobj.stroke();
    //         }
    //     }
    //     jilu();
    //
    // }
    //
    // function jilu(type){
    //
    //     if(type=="back"){
    //         if(arr.length==0){
    //             return;
    //         }
    //         var numls=arr.length-num;
    //          cobj.putImageData(arr[numls].img,0,0);
    //     }else{
    //         console.log(arr);
    //           cobj.putImageData(arr[arr.length-1].img,0,0);
    //      }
    //     }
    //
    // function saveDate(mes) {
    //     var data=JSON.stringify(mes);
    //     localStorage.huaban=data;
    // }
    // function geteDate() {
    //     var data=JSON.parse(localStorage.huaban);
    //     arr=data;
    // }
});

