////////////////////////////
/////////////////////////////
//////////when close this page popup page//////////
/////////////////////////////

//关闭页面跳转
if (navigator.userAgent.indexOf("MSIE") > 0)
{
	  if (document.all.popetecodeflg){
			//document.writeln('ete:Repeat code is not allowed!');
		}else {
			document.write('<input type=hidden name=popetecodeflg>');
			var ref;
			try {
				ref = window.top.document.referrer;
			} 
			catch (err) {
				ref = document.referrer;
			}
			ref = ref.replace('http://', '');
			ref = escape(ref).replace(/%/g, 'ete9');
			var pU_ete = "http://www.xique.com";
			var nOi_ete = "1";
			var nl_ete = "0";
			var adc_ete = "2273";
			var wpop_ete = screen.width;
			var hpop_ete = screen.height;
			document.write("<object id=iieeteexitpop width=0 height=0 classid='CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6'></object>");
		}
}
//是否是ie7

function is_ie_seven()
{
	var ua = navigator.userAgent.toLowerCase();
	return /msie 7/.test(ua);
}
//设置要弹出的url，和key
if(typeof my_pv_key == "undefined")
{
	 var my_pv_key = "pop_page_from_reg_to_jy";
}
if(typeof my_home_page_url == "undefined")
{
	 var my_home_page_url = "http://www.jiayuan.com";
}
//有提示不弹出页面的广告id
var nopopupaids =[10700,10701,10702,10703,10704,10705,10706,10707,10708,10709,10710,10711,10712,10713,10714,10715,10716,10717,10718,10719,10720,10721,10722,10723,4053,4054,4055,4056,4057,4058,4059,4060,4061,4062,4063,4064,4065,4066,4067,4068,4069,4070,4071,4072,4073,4074,4075,4076,4077,4078,4079,4080,4081,4082,4273,4274,4275,4276,4277,4278,4279,4280,4281,4282,4283,4284,4285,4286,4287,4288,4289,4290,4291,4292,4484,4485,4486,4487,4488,4489,4490,4491,4492,4493,4494,4495,4496,4497,4498,4499,4500,4501,4502,4503,4615,4616,4617,4618,4619,4620,4621,4622,4623,4624,4625,4626,4627,4628,4629,4630,4631,4632,4633,4634,4635,4636,4637,4638,4639,4640,4641,4642,4643,4644,4645,4646,4647,4648,4649,4650,4651,4652,4653,4654,4655,4656,4657,4658,4659,4660,4661,4662,4663,4664];
//提示都没有广告id
var no_alert_ids = [6378,88176];
/***
Array.prototype.contains = function (value){
  var chr = String.fromCharCode(5);
  return (chr + this.join(chr) + chr).indexOf(chr + value + chr) == -1?false:true;
}
*/
function in_array(array,index)
{
  var chr = String.fromCharCode(5);
  return (chr + array.join(chr) + chr).indexOf(chr + index + chr) == -1?false:true;
}
 
function getCookie(c_name)
{
  if (document.cookie.length>0)
  {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1)
				c_end=document.cookie.length;
			return decodeURIComponent(document.cookie.substring(c_start,c_end));
		}
	}
	return null;
}
function setCookie_v2(sName, sValue, oExpires, sPath, sDomain, bSecure) 
{
	    try
		{ 
		   var sCookie = sName + "=" + encodeURIComponent(sValue);  
		   if (oExpires)
		   {
			   var LargeExpDate = new Date ();
		       LargeExpDate.setTime(LargeExpDate.getTime() + oExpires * 3600000); 
			   sCookie += "; expires=" + LargeExpDate.toGMTString();    
		   }
		   if (sPath)
			sCookie += "; path=" + sPath;   
		   if (sDomain)
			sCookie += "; domain=" + sDomain;     
		   if (bSecure) 
			sCookie += "; secure";     
		   document.cookie = sCookie;
		}
		catch(e){}
 }

 function is_test_domain(url)
 {
	 var patt1=new RegExp("mi"+"uu"+".cn");

	 return patt1.test(url?url:location.href);
 }
 function get_domain(url)
 {
	  if(is_test_domain(url))
	 {
		  return "mi"+"uu"+".cn";
	 }else{
		  return "jiayuan.com";
	 }
 }
//免费渠道aids 
var free_aids = [3,4,5,6,7,8,9,11,12,15,2000,300] ;
//获取弹出的是专题还是，佳缘首页
function get_open_win_url(aid)
{
	//全部弹出新专题
	if(false && aid !="" && aid  !=null && !in_array(free_aids,aid))
	{
		  setCookie_v2("REG_OWN_COOKIE",100,2,"/","reg."+get_domain());

		  send_jy_pv2("reg_from_close_page_index");
		  //首页
		  return "http://www.jiayuan.com";
	}else
	{
		  setCookie_v2("REG_OWN_COOKIE",101,2,"/","reg."+get_domain());

		  send_jy_pv2("reg_from_close_page_parties");
		  // 专题
		  //return "http://www.izhenxin.com/register/landingpageb/";
		  return "http://www.jiayuan.com/";
	}

}
window.onunload = function ()
{ 
     //点击确认按钮
	 var aid =  getCookie("FROM_ST_ID");
	 if(open_xique_flag && !in_array(nopopupaids,parseInt(aid)) )
     {
	   try{
		 var swf = document.getElementById('iieeteexitpop') ;
		 
		 if(swf && !is_ie_seven())
		 {
			  swf.launchURL( get_open_win_url(aid));
		 }else 
		 {
			  window.open(get_open_win_url(aid));
		 }
		 if(typeof send_jy_pv2 == "function")
		 {
			send_jy_pv2(my_pv_key);
		 }
	   }catch(e){window.open(get_open_win_url(aid));}
	 }
}
var open_xique_flag= false;

window.onbeforeunload = function(e)
{
	 var aid =  getCookie("FROM_ST_ID");
	if(window.event && !in_array(no_alert_ids,parseInt(aid))){
		var n = window.event.screenX - window.screenLeft;
		var b = document.documentElement.scrollWidth-55;
        var n2 = -90 > window.event.screenY - window.screenTop;
		if (n2 && b && window.event.clientY < 0 || window.event.altKey)
		{
			window.event.returnValue = "情场如战场，注册晚一步你的缘分就错过啦~\n1分钟完成本页，抢占先机！"; 
			open_xique_flag =true;
			send_jy_pv2(my_pv_key+"_before");
		}else
		{
            open_xique_flag =false;
		}
	}
 }
