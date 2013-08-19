/**
 * function.js 0.7.8 (http://http://images1.jyimg.com/w4/register/j/)
 * Copyright (c) 2007-2011 will liu (http://www.jiayuan.com)
 * 
 *
 * Id: $Id:  -function.js 177 2011-02-18 11:46:36Z tom $
 */
 
 /**
 * @fileOverview global method  in JavaScript.
 * @name function.js
 * @author will liu
 * @date $Date: 2011-02-18 11:46:36Z $
 */

function DBC2SBC (str) {
        var i;
        var result='';
        for(i=0; i < str.length; i++)
        {
                code = str.charCodeAt(i);

                if (code == 12290)
                {
                        result += String.fromCharCode(46);
                }
                else if (code == 183)
                {
                        result += String.fromCharCode(64);
                }
                else if(code >= 65281 && code<65373)
                {
                        result += String.fromCharCode(str.charCodeAt(i)-65248);
                }
                else
                {
                        result += str.charAt(i);
                }
        }
        return result;
}

function build_select(first_id,second_id,first_array,second_array,def_value)
{
    if(def_value == "" || def_value == "0")
    {
        for( key in first_array )       {
            var sOption = new Option(first_array[key],key);
            document.getElementById(first_id).options.add(sOption);
        }
    }
    else
    {
        pro_key = def_value.substr(0,2);
        for( key in first_array )
        {
            var sOption =  new Option(first_array[key],key);
            if(pro_key == key)
            {
                sOption.id = "sele_pro"+first_id;
            }
            document.getElementById(first_id).options.add(sOption);
        }
        document.getElementById("sele_pro"+first_id).selected = true;
        for( key in second_array[pro_key] )     
		{
            var sOption = new Option(second_array[pro_key][key],key);
            if(def_value == key)
            {
                sOption.id = "sele_city"+second_id;
            }
            document.getElementById(second_id).options.add(sOption);
        }
        document.getElementById("sele_city"+second_id).selected = true;
    }
}


function build_second(first_value,second_id,second_array)
{
    document.getElementById(second_id).innerHTML = "";
    for( key in second_array[first_value])
	{
        var sOption = new Option(second_array[first_value][key],key);
        document.getElementById(second_id).options.add(sOption);
    }
}


function readSelectData(id,select_array,N)
{
	var k=1;
    for( key in select_array)
    {
		if (key == 0 && N == 1)
		{
			continue;
		}
        var sOption   = document.createElement("OPTION");
        sOption.text  = select_array[key];
        sOption.value = key;
        document.getElementById(id).options.add(sOption,k);
		k++;
    }
}
	//去空格
	String.prototype.trim = function()
	{
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}

	//Count string byte number, return integer
	String.prototype.ByteCount = function(html)
	{
	    if(typeof html =="undefined" || html == false)
		{
			txt = this.replace(/(<.*?>)/ig,"");
			txt = txt.replace(/([\u0391-\uFFE5])/ig, "11");
		}else
		{
			txt = this.replace(/([\u0391-\uFFE5])/ig, "11");
		}
		
		var count = txt.length;
		return count;
	}
 // 手机号码验证，验证13系列和150-159(154除外)、180、185、186、187、188、189几种号码，长度11位 
 function is_mobile(value)   
 {   
	 if(value.match(/^1[3-5]\d{9}$/g)|| value.match(/^18[0-9]\d{8}$/g)|| value.match(/^147\d{8}$/g)){       
		return true;   
	 }else{   
		return false;   
	 }   
  }
  //全角半角字符转换
  function convertValue(input) {
	var isIE = (document.uniqueID)?1:0;
	if(isIE) {
		try{
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
		}catch(e){}
		tbRange.select();
	} else {
		var originValue = input.value;
		input.value = DBC2SBC(originValue);
	}
}
//取url中的参数值
function get_query_string(url,name) 
{ 
	var reg = new RegExp("(^|&|)"+ name +"=([^&]*)(&|$)"); 
	var r = url.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return false; 
} 
//关键字过滤
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