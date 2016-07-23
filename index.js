
var sub=document.querySelector(".btn")
var search=document.querySelector(".search")
var del=document.querySelector(".del")
var now=document.querySelector(".now ul")
var nownum=document.querySelector(".now p")
var success=document.querySelector(".success ul")
var successnum=document.querySelector(".success p")
var shan=document.querySelectorAll(".shan")

sub.onclick=function(){
    if(search.innerHTML==""){
        return;
    }
    var data=getData();
    data.push({content:search.innerHTML,done:false})
    search.innerHTML="";
    saveData(data);
    rewrite();
}
/*获取*/
function getData(){
    var data=JSON.parse(localStorage.getItem("todo"))
    return data||[];
    rewrite();
}
function saveData(data){
    localStorage.setItem("todo",JSON.stringify(data))
}

function changeData(index,content){
    var data=getData();
    console.log(content)
    data[index].content=content;
    saveData(data);
    rewrite();
}
function delData(index){
    var data=getData();
    data.splice(index,1)
    saveData(data);
    rewrite();
}
function  changeState(index) {
    var data=getData();
    if(data[index].done){
        data[index].done=false
    }else{
        data[index].done=true
    }
    saveData(data);
    rewrite();
}

function rewrite(){
    var data=getData();
    var str1="";
    var str2="";
    var num1=0;
    var num2=0;
    data.forEach(function(value,index){
        if(value.done==false){
            str1+="<li contenteditable='true' class='neirong' onblur=changeData("+index+",this.innerHTML)><input type='checkbox' class='state' onblur=changeState("+index+")>"+value.content+"</li><li></li><li class='shan' onclick=delData("+index+")>删除</li>";
            num1++;
        }else{
            str2+="<li class='neirong' style='text-decoration:line-through'><input checked type='checkbox' class='state'  onblur=changeState("+index+")>"+value.content+"</li><li style='float: left'></li><li class='shan' onclick=delData("+index+")>删除</li>";
            num2++;
        }
    })
    now.innerHTML=str1;
    nownum.innerHTML=num1;
    success.innerHTML=str2;
    successnum.innerHTML=num2;
}
del.onclick=function(){
    var data="";
    saveData(data);
    rewrite();
}
window.onload=rewrite;



