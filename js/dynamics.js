//new game点击事件的实现
function newGame() {
    var n=document.getElementById("new_game_button");
    n.onclick=function(){
        return cdCss()?false:true;
    }
}
//固定每个格子，第二层
window.onload=function cdCss(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            div1.setAttribute("style","left:"+(i*120+20)+"px;top:"+(j*120+20)+"px");//此处不可为setAttribute("left","110px")
        }
    }
    generate1();
    generate1();//一次生成两个
    scoreCalculate();//score的计算
}
//在格子中随机生成2和4，2的概率大于4
function generate1(){
    var row=parseInt(Math.random()*(3-0+1)+0);//随机生成[0,3]且几率相同的数
    var col=parseInt(Math.random()*(3-0+1)+0);
    var div1=document.getElementById("cd_"+row+"_"+col);
    if(!div1.firstChild){
        var node=document.createElement("div");
        var num=(Math.random()<0.75)?2:4;//生成2或4,2的概率大于4
        node.innerText=num;
        node.setAttribute("class","n"+num);
        div1.appendChild(node);
    }else{
     generate1();
    }
}
//score分数的计算
function scoreCalculate() {
    var sum=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            var a=parseInt(div1.innerText);
            if(!isNaN(a)){
                sum+=a;
            }
        }
    }
    document.getElementById("score").innerText=sum;
}

//改变CSS
function changeCss(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            if(div1.firstChild){
                var child=div1.firstChild;
                var num=parseInt(child.innerText);
                child.setAttribute("class","n"+num);
            }
        }
    }
}
//按键控制
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];//兼容各个浏览器的点击事件
    /*上*/
    if(e&&e.keyCode==38){
        upKey();
    }
    /*左*/
    if(e&&e.keyCode==37){
        leftKey();
    }
    /*右*/
    if(e&&e.keyCode==39){
        rightKey();
    }
    /*下*/
    if(e&&e.keyCode==40){
        downKey();
    }
}

//上键控制
function upKey() {
    var sum=0;//记录是否生成数字
    for(var i=0;i<4;i++){
        var arr1=new Array();//记录有子节点的div
        var arr2=new Array();//记录节点的innertext
        var num=0;//记录一列有多少个数
        for(var j=0;j<4;j++){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            if(div1.firstChild){
                arr1[num]=div1.firstChild;
                arr2[num]=parseInt(div1.innerText);
                num++;
            }
        }
        switch (num) {
            case 0:
                break;
            case 1:
                document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                break;
            case 2:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+i+"_"+a).appendChild(arr1[a]);
                    }
                }
                break;
            case 3:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    document.getElementById("cd_"+i+"_"+1).appendChild(arr1[2]);
                }else if(arr2[1]==arr2[2]&&arr2[0]!=arr2[1]){
                    document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                    var n=arr2[1]+arr2[2];
                    arr1[1].innerText=n;
                    document.getElementById("cd_"+i+"_"+1).appendChild(arr1[1]);
                    arr1[2].parentNode.removeChild(arr1[2]);
                }else{
                   for(var a=0;a<num;a++){
                       document.getElementById("cd_"+i+"_"+a).appendChild(arr1[a]);
                   }
                }
                break;
            case 4:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    if(arr2[2]==arr2[3]){
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+i+"_"+1).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else{
                        for(var a=2;a<num;a++){
                            document.getElementById("cd_"+i+"_"+(a-1)).appendChild(arr1[a]);
                        }
                    }
                }else if(arr2[0]!=arr2[1]){
                    if(arr2[1]==arr2[2]){
                        document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                        var n=arr2[1]+arr2[2];
                        arr1[1].innerText=n;
                        document.getElementById("cd_"+i+"_"+1).appendChild(arr1[1]);
                        arr1[2].parentNode.removeChild(arr1[2]);
                        document.getElementById("cd_"+i+"_"+2).appendChild(arr1[3]);
                    }else if(arr2[2]==arr2[3]){
                        document.getElementById("cd_"+i+"_"+0).appendChild(arr1[0]);
                        document.getElementById("cd_"+i+"_"+1).appendChild(arr1[1]);
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+i+"_"+2).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else if(arr2[1]!=arr2[2]&&arr2[2]!=arr2[3]){
                        sum++;
                    }
                }
                break;
        }
    }
    changeCss();
    if(sum!=4){
        generate1();
    }//生成
    scoreCalculate();//score的计算
}
//下键控制
function downKey() {
    var sum=0;//记录是否生成数字
    for(var i=0;i<4;i++){
        var arr1=new Array();//记录有子节点的div
        var arr2=new Array();//记录节点的innertext
        var num=0;//记录一列有多少个数
        for(var j=3;j>=0;j--){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            if(div1.firstChild){
                arr1[num]=div1.firstChild;
                arr2[num]=parseInt(div1.innerText);
                num++;
            }
        }
        switch (num) {
            case 0:
                break;
            case 1:
                document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                break;
            case 2:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+i+"_"+(3-a)).appendChild(arr1[a]);
                    }
                }
                break;
            case 3:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    document.getElementById("cd_"+i+"_"+2).appendChild(arr1[2]);
                }else if(arr2[1]==arr2[2]&&arr2[0]!=arr2[1]){
                    document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                    var n=arr2[1]+arr2[2];
                    arr1[1].innerText=n;
                    document.getElementById("cd_"+i+"_"+2).appendChild(arr1[1]);
                    arr1[2].parentNode.removeChild(arr1[2]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+i+"_"+(3-a)).appendChild(arr1[a]);
                    }
                }
                break;
            case 4:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    if(arr2[2]==arr2[3]){
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+i+"_"+2).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else{
                        for(var a=2;a<num;a++){
                            document.getElementById("cd_"+i+"_"+(4-a)).appendChild(arr1[a]);
                        }
                    }
                }else if(arr2[0]!=arr2[1]){
                    if(arr2[1]==arr2[2]){
                        document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                        var n=arr2[1]+arr2[2];
                        arr1[1].innerText=n;
                        document.getElementById("cd_"+i+"_"+2).appendChild(arr1[1]);
                        arr1[2].parentNode.removeChild(arr1[2]);
                        document.getElementById("cd_"+i+"_"+1).appendChild(arr1[3]);
                    }else if(arr2[2]==arr2[3]){
                        document.getElementById("cd_"+i+"_"+3).appendChild(arr1[0]);
                        document.getElementById("cd_"+i+"_"+2).appendChild(arr1[1]);
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+i+"_"+1).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }
                }
                break;
        }
    }
    changeCss();
    if(sum!=4){
        generate1();
    }//生成
    scoreCalculate();//score的计算
}

//左键控制
function leftKey() {
    var sum=0;//记录是否生成数字
    for(var j=0;j<4;j++){
        var arr1=new Array();//记录有子节点的div
        var arr2=new Array();//记录节点的innertext
        var num=0;//记录一列有多少个数
        for(var i=0;i<4;i++){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            if(div1.firstChild){
                arr1[num]=div1.firstChild;
                arr2[num]=parseInt(div1.innerText);
                num++;
            }
        }
        switch (num) {
            case 0:
                break;
            case 1:
                document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                break;
            case 2:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+a+"_"+j).appendChild(arr1[a]);
                    }
                }
                break;
            case 3:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    document.getElementById("cd_"+1+"_"+j).appendChild(arr1[2]);
                }else if(arr2[1]==arr2[2]&&arr2[0]!=arr2[1]){
                    document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                    var n=arr2[1]+arr2[2];
                    arr1[1].innerText=n;
                    document.getElementById("cd_"+1+"_"+j).appendChild(arr1[1]);
                    arr1[2].parentNode.removeChild(arr1[2]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+a+"_"+j).appendChild(arr1[a]);
                    }
                }
                break;
            case 4:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    if(arr2[2]==arr2[3]){
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+1+"_"+j).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else{
                        for(var a=2;a<num;a++){
                            document.getElementById("cd_"+(a-1)+"_"+j).appendChild(arr1[a]);
                        }
                    }
                }else if(arr2[0]!=arr2[1]){
                    if(arr2[1]==arr2[2]){
                        document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                        var n=arr2[1]+arr2[2];
                        arr1[1].innerText=n;
                        document.getElementById("cd_"+1+"_"+j).appendChild(arr1[1]);
                        arr1[2].parentNode.removeChild(arr1[2]);
                        document.getElementById("cd_"+2+"_"+j).appendChild(arr1[3]);
                    }else if(arr2[2]==arr2[3]){
                        document.getElementById("cd_"+0+"_"+j).appendChild(arr1[0]);
                        document.getElementById("cd_"+1+"_"+j).appendChild(arr1[1]);
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+2+"_"+j).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else if(arr2[1]!=arr2[2]&&arr2[2]!=arr2[3]){
                        sum++;
                    }
                }
                break;
        }
    }
    changeCss();
    if(sum!=4){
        generate1();
    }//生成
    scoreCalculate();//score的计算
}
//右键控制
function rightKey() {
    var sum=0;//记录是否生成数字
    for(var j=0;j<4;j++){
        var arr1=new Array();//记录有子节点的div
        var arr2=new Array();//记录节点的innertext
        var num=0;//记录一列有多少个数
        for(var i=3;i>=0;i--){
            var div1=document.getElementById("cd_"+i+"_"+j);//分别获取id
            if(div1.firstChild){
                arr1[num]=div1.firstChild;
                arr2[num]=parseInt(div1.innerText);
                num++;
            }
        }
        switch (num) {
            case 0:
                break;
            case 1:
                document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                break;
            case 2:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+(3-a)+"_"+j).appendChild(arr1[a]);
                    }
                }
                break;
            case 3:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    document.getElementById("cd_"+2+"_"+j).appendChild(arr1[2]);
                }else if(arr2[1]==arr2[2]&&arr2[0]!=arr2[1]){
                    document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                    var n=arr2[1]+arr2[2];
                    arr1[1].innerText=n;
                    document.getElementById("cd_"+2+"_"+j).appendChild(arr1[1]);
                    arr1[2].parentNode.removeChild(arr1[2]);
                }else{
                    for(var a=0;a<num;a++){
                        document.getElementById("cd_"+(3-a)+"_"+j).appendChild(arr1[a]);
                    }
                }
                break;
            case 4:
                if(arr2[0]==arr2[1]){
                    var n=arr2[0]+arr2[1];
                    arr1[0].innerText=n;
                    document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                    arr1[1].parentNode.removeChild(arr1[1]);
                    if(arr2[2]==arr2[3]){
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+2+"_"+j).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else{
                        for(var a=2;a<num;a++){
                            document.getElementById("cd_"+(4-a)+"_"+j).appendChild(arr1[a]);
                        }
                    }
                }else if(arr2[0]!=arr2[1]){
                    if(arr2[1]==arr2[2]){
                        document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                        var n=arr2[1]+arr2[2];
                        arr1[1].innerText=n;
                        document.getElementById("cd_"+2+"_"+j).appendChild(arr1[1]);
                        arr1[2].parentNode.removeChild(arr1[2]);
                        document.getElementById("cd_"+1+"_"+j).appendChild(arr1[3]);
                    }else if(arr2[2]==arr2[3]){
                        document.getElementById("cd_"+3+"_"+j).appendChild(arr1[0]);
                        document.getElementById("cd_"+2+"_"+j).appendChild(arr1[1]);
                        n=arr2[2]+arr2[3];
                        arr1[2].innerText=n;
                        document.getElementById("cd_"+1+"_"+j).appendChild(arr1[2]);
                        arr1[3].parentNode.removeChild(arr1[3]);
                    }else if(arr2[1]!=arr2[2]&&arr2[2]!=arr2[3]){
                        sum++;
                    }
                }
                break;
        }
    }
    changeCss();
    if(sum!=4){
        generate1();
    }//生成
    scoreCalculate();//score的计算
}