/**
  * 页面中存的js方法都移到文件中
  * 注册首页面js
  * author:liuwei
  * date:2010-11-26  mobile_register_js_function
  * date:2010-12-23  手机号注册 
  * data:2011-03-11  修改路径 at 2011-03-22 list modify update by will at 2011-03-23
  */
function in_array(array,index)
{
  var chr = String.fromCharCode(5);
  return (chr + array.join(chr) + chr).indexOf(chr + index + chr) == -1?false:true;
}
//是否是ie7

function is_ie_seven()
{
	var ua = navigator.userAgent.toLowerCase();
	return /msie 7/.test(ua);
}
//是否是ie
function is_ie()
{
	var ua = navigator.userAgent.toLowerCase();
	return /msie/.test(ua);
}
function LoadScript( url )
{
	document.write( '<scr' + 'ipt type="text/javascript" src="' + url + '"><\/scr' + 'ipt>' ) ;
}


//算长度中文算两个字符，
function countSize(txt)
{
	txt = txt.replace(/([\u0391-\uFFE5])/ig, "11");
	var count = txt.length;
	return count;
}
//去空格
String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

//Count string byte number, return integer
String.prototype.ByteCount = function()
{
	txt = this.replace(/(<.*?>)/ig,"");
	txt = txt.replace(/([\u0391-\uFFE5])/ig, "11");
	var count = txt.length;
	return count;
}
      
//filter keywords
function check_durty_words(thisinput)
{
	var durty_words = new Array("系统","管理","佳缘","master","版主","斑竹","龙女","客服","root","颁奖","活动","提示","兑奖","通知","百合","珍爱");
	for(i=0;i<durty_words.length;i++)
	{
		if (thisinput.indexOf(durty_words[i])	>=	0)
		{
			return durty_words[i];
		}
	}
	//add by liuwei 特殊字符的验证
	//var req =/\!|\#|\^|\||\*|\&|\;|\$|\%|\@|\'|\"|\\\'|\\\"|\/|\\|\<.*\>|\<|\>|\(|\)|\+|\,|\r|\t|\f|\n|\s/gi;
	//var req2 =/\！|\#|\……|\：|\￥|\%|\@|\‘|\”|\、|\?|\\|\<.*\>|\《|\》|\（|\）|\+|\,/gi;//中文半角
	//var req3 =/\！|\＃|\……|\：|\×|\￥|\％|\＠|\‘|\“|\＼|\？|\＼|\《|\》|\（|\）|\+|\,/gi;//中文全角


	var req3 =/\<|\>/g;
	//if(null!=thisinput.match(req)){
	//  return thisinput.match(req).join(",");
	//}
	//if(null!=thisinput.match(req2)){
	//  return thisinput.match(req2).join(",");
	//}
	if(null!=thisinput.match(req3)){
	  return thisinput.match(req3)[0];
	}
	//end add 
	return false;
}
function convertValue(input) {
	var isIE = (document.uniqueID)?1:0;
	if(isIE) {
		var cuRange=document.selection.createRange();
		var tbRange=input.createTextRange();
		tbRange.collapse(true);
		tbRange.select();
		var headRange=document.selection.createRange();
		headRange.setEndPoint("EndToEnd",cuRange);
		var position=headRange.text.length;
		cuRange.select();
		
		var originValue = input.value;
		input.value = DBC2SBC(originValue);
		
		//var r = input.createTextRange();
		tbRange.moveStart("character",position); 
		if(position == originValue.length) {
			tbRange.collapse(false);	    
		} else {
			tbRange.collapse(true);	    
		}
		
		tbRange.select();
	} else {
		var originValue = input.value;
		input.value = DBC2SBC(originValue);
	}
}


//mouse onclick the note textarea
//mouse onclick the note textarea
function click_note_input(thisinput)
{
	/*document.getElementById('regnoteinfo').className="show exactness";
	document.getElementById('regnoteinfo').innerHTML="限20字到1000字之间";*/
	//xajax_processTraceUser(xajax.getFormValues("Form1"),'notein');
}

//change sex so age also 
function onSexChange(sex) {
	if(sex == '1') {
		document.getElementById('height').value = 170;
	} else {
		document.getElementById('height').value = 160;
	}
	
	document.getElementById('sexinfo').style.display = "";
    document.getElementById('sexinfo').innerHTML ="";
	document.getElementById('sexinfo').className = "true";
	 //$("#year").focus();
}

//mouse lost the note textarea
function check_note_input(thisinput)
{
	if( thisinput.value.trim().length == 0 )
	{
	    document.getElementById('noteinfo').style.display = "";
		document.getElementById('noteinfo').className="error";
		document.getElementById('noteinfo').innerHTML="<span>您没有写“内心独白”哦，对未来的TA不想说点什么吗？</span>";
	}
	else if((thisinput.value != "") && (thisinput.value.trim().length < 5 || countSize(thisinput.value.trim()) >1000))
	{
	    document.getElementById('noteinfo').style.display = "";
		document.getElementById('noteinfo').className="error";
		if(countSize(thisinput.value.trim()) >1000){
		   document.getElementById('noteinfo').innerHTML ="<span>您写的内心独白太多了，TA似乎没有耐心看哦</span>";
		}else{
		   document.getElementById('noteinfo').innerHTML ="<span>您写的“内心独白”太少了，也太没诚意了吧</span>";
		}
	}
	else
	{
	    document.getElementById('noteinfo').style.display = "";
	    document.getElementById('noteinfo').innerHTML ="";
		document.getElementById('noteinfo').className = "true";
		//document.getElementById('regnoteinfo').innerHTML = "内容符合规范，可以使用";
	}
	//xajax_processTraceUser(xajax.getFormValues("Form1"),'note');
}



/**
  * 页面中存的js方法都移到文件中
  * 注册首页面 独白助手js
  * author:liuwei
  * date:2010-07-30  update by will at 2011-03-23
  */
function photo(id){  
		var divtype ="photo";
		   for(var i=1;i<=2;i++){ 
		   if(i.toString()==id){
		   
		   document.getElementById(divtype+i).className='btn'+i; /*被选中*/        
		   document.getElementById(divtype+"photo"+i).style.display='';		 
		   }else{
		   document.getElementById(divtype+i).className='btn'+i+"_"+i;/*没选中*/   
		   document.getElementById(divtype+"photo"+i).style.display='none';   		  
		   } 
		 }
		 noteObject.index = id ;
		 if(id == 1){
		   document.getElementById("note").focus();
		   document.getElementById("photo1").className="btn1 cur";

		 }
		 //增加from textarea to template
		 if(id== 2){
		  document.getElementById("input1").focus();
		  document.getElementById("photo2").className="btn2 cur";
		  //文本向模板中写
		   texttoTemplate();
		   //计算高度
		   if(document.getElementById('centerLay'))
		   {
			   document.getElementById('centerLay').className ="login_center2";
			   document.getElementById('rightLay').className ="right2";
		   }
		 }else{
		   if(document.getElementById('centerLay'))
		   {
			   document.getElementById('centerLay').className ="login_center";
			   document.getElementById('rightLay').className ="right";
		   }
		 }
		  noteObject.clearTimeOut();
		  document.getElementById("noteinfo").style.display ='none'; 
		  document.getElementById("helpNote").style.display ='none';
		  noteObject.createNote = false;
		 sendData(id);
}
 //add by liuwei at 2010-04-21
 function createHelpText (){
   noteObject.clearTimeOut();
   var v1 = document.getElementById("input1").value;	
   var v2 = document.getElementById("input2").value;	
   var v3 = document.getElementById("input3").value;	
   var v4 = document.getElementById("input4").value;
   v1 = v1.replace(/^\s+|\s+$/g,"");
   v2 = v2.replace(/^\s+|\s+$/g,"");
   v3 = v3.replace(/^\s+|\s+$/g,"");
   v4 = v4.replace(/^\s+|\s+$/g,"");
   if(v1.length<=0 && v2.length<=0 && v3.length<=0 && v4.length<=0){
  //if(v1=="" && v2 == "" && v3=="" && v4==""){
	document.getElementById("noteinfo").style.display =''; 
	document.getElementById('noteinfo').className="error";
	document.getElementById("noteinfo").innerHTML="<span>对未来的TA不想说点什么吗？请至少输入一项吧!</span>";
	 return ;    
  }
   var v5 ="";
  if(v1 !=""){
   v5 +="我喜欢"+v1+"。";
  }
  if(v2 !=""){
  v5  +="我在业余时间最大的消遣是"+v2+"。";
  }
  if(v3 !=""){
   v5 +="我憧憬的生活是"+v3+"。";
  }
  if(v4 !=""){
   v5 +="我希望我未来的另一半最好是"+v4+"。" ;
  }
   v5 +="真心希望在这里能遇到我的那个TA!" ; 
   
   document.getElementById("noteHelp").value = v5;
   
   document.getElementById("helpNote").style.display ='';	
   document.getElementById("photophoto2").style.display ='none';
 
   var re = /^\s+|\s+$/g;
	v5 = v5.replace(re,"");
  
   document.getElementById("noteinfo").style.display =''; 
   document.getElementById("noteinfo").innerHTML ="";
   document.getElementById('noteinfo').className = "show exactness";	
   //document.getElementById("wordNums2").innerHTML =v5.length; 	
   noteObject.createNote = true;
   sendData('3');
 }
 var noteObject={
	
	dom :function (id){ return document.getElementById(id);},
	changeTab:function(){},
	index:1 ,
	
	createNote:false,
	onFocus:false,
	timeout:null,
	clearTimeOut:function(){
	 if(noteObject.timeout !=null){
	  clearTimeout(noteObject.timeout);
	 }
	},
	focus:function(arg){
	 //alert(22);
	 noteObject.onFocus = true;
	},
	
	blur:function(arg){
	if(noteObject.timeout !=null){
		//document.getElementById("wordNums2").innerHTML =v5.length; 	
		$("#wordNums2").html($("#wordNums2").val().trim().length);   
		clearTimeout(noteObject.timeout);
	}
	noteObject.onFocus = false;
	
	noteObject.timeout = window.setTimeout(function(){
	 if(noteObject.onFocus == false){
		   var v1 = document.getElementById("input1").value;	
		   var v2 = document.getElementById("input2").value;	
		   var v3 = document.getElementById("input3").value;	
		   var v4 = document.getElementById("input4").value;
           v1 = v1.replace(/^\s+|\s+$/g,"");
           v2 = v2.replace(/^\s+|\s+$/g,"");
           v3 = v3.replace(/^\s+|\s+$/g,"");
           v4 = v4.replace(/^\s+|\s+$/g,"");
           if(v1.length<=0 && v2.length<=0 && v3.length<=0 && v4.length<=0){
			 document.getElementById("noteinfo").style.display =''; 
			 document.getElementById('noteinfo').className="error";
			 document.getElementById("noteinfo").innerHTML="<span>对未来的TA不想说点什么吗？请至少输入一项吧!</span>";
		  }else{
				document.getElementById('noteinfo').style.display = "";
				document.getElementById('noteinfo').innerHTML ="";
				document.getElementById('noteinfo').className = "true";
			 
		  }
	 }
	 noteObject.onFocus = false;
	 },500);
	}
  
 };
   function  sendData(a){
	
	   //ajax.get("notecount.class.php",{data:a,method:'addCache'},function(){});
	   if(typeof send_jy_pv2 == 'function')
	   {
		  send_jy_pv2("reg_note_tab_button_click_"+a);
	   }
	}
  function clearText(obj){
		var a =obj.value;
		var req =/^您知道吗？/;
		if(req.test(a)){
		 obj.value ="";
		}
	}

function texttoTemplate(){
  
	var n = noteObject.dom("noteHelp").value ;
	//我喜欢|平时无聊的时候，我经常|我憧憬的生活是|我希望我未来的另一半最好是
	if(n!=""){
	  var arrs = noteO.transfarms(n);
	  //if(arrs[0] !=""){
	  noteObject.dom("input1").value=arrs[0];
	  //}
	  //if(arrs[1] !=""){
	  noteObject.dom("input2").value=arrs[1];
	  //}
	 // if(arrs[2] !=""){
	  noteObject.dom("input3").value=arrs[2];
	 // }
	 // if(arrs[3] !=""){
	  noteObject.dom("input4").value=arrs[3];
	 // }
	  
	}

}

 function countWorkNums(id){
  var nv = "";
	if(id == 1){
	  nv = document.getElementById("note").value ;
	}else{
	  nv = document.getElementById("noteHelp").value ;
	}
	var re = /^\s+|\s+$/g;
	nv = nv.replace(re,"");
	document.getElementById("wordNums"+id).innerHTML =nv.length;
 }
 var noteO = (function () {
	var titles = ["\u6211\u559c\u6b22", "我在业余时间最大的消遣是", "\u6211\u61a7\u61ac\u7684\u751f\u6d3b\u662f", "\u6211\u5e0c\u671b\u6211\u672a\u6765\u7684\u53e6\u4e00\u534a\u6700\u597d\u662f"];
	var req = [false, false, false, false];
	var values = ["", "", "", ""];
	function doInit(s) {
	   for(var i = 0 ;i<titles.length;i++){
		  if(s.indexOf(titles[i]) >-1){
			 req[i] = true;
		  }
		}
		
		for( var i =0 ;i<req.length;i++){
		 if(req[i]){
		   var vo =  getValues(s,i);
		   values[i] = vo;
		 }
		} 
		return values ;
		}
		function getValues(o,m){
		   var cs = titles[m];
		   var nv = subIndex(m);
		   if(typeof nv =="undefined"){
			 nv = cs;
		   };
		   if(nv ==""){
			 nv ="。";
		   }
		   var start = o.indexOf(cs) + cs.length;
		   var newValue = o.substr(start);
		   
		   var end = newValue.indexOf(nv);
		 
		   var v = newValue.substr(0,end) ;
		 
		   if(v.indexOf("。") >-1){
			 v = v.substr(0,v.indexOf("。"));
		   }
		   return  filter(v);
	
		}
		function subIndex(m){
	
		  for(var i = m +1 ;i<titles.length;i++){
				if(req[i] !=false){
				  var c = titles[i];
				  return c;
				}
		  }
		  return "";
		}
	function filter(v) {
		var req = /我喜欢|我在业余时间最大的消遣是|我憧憬的生活是|我希望我未来的另一半最好是|我经常/g;
		return v.replace(req, "");
	}
	function slen(s) {
		return s.replace(/[^x00-xff]/g, "**").length;
	}
	return {transfarms:function (s) {
		return doInit(s);
	}};
})();
//end

//end at 2010-10-25 with will 
