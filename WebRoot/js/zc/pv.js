function send_jy_pv(log){
var f_url_arr = ['59.151.18.14','59.151.12.228'];
var k = Math.floor(Math.random() * f_url_arr.length)
var f_url = "http://"+f_url_arr[k]+"/any/";
var Arr = ["a","b","c","d","e","f","g","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
    var n = Math.floor(Math.random() * Arr.length + 1)-1;   
    var url = f_url +Arr[n]+".gif?|"+log+"|"+new Date().getTime()+"|";
	var sender = new Image();
	sender.onload = function(){clear(this);};
	sender.onerror = function(){clear(this);};
	sender.onabort = function(){clear(this);};
	sender.src = url;
	function clear(obj){
		obj.onerror = null;
		obj.onload = null;
		obj.onabort = null;
		obj = null;
	}
}

function send_jy_pv2(log) {
var f_url_arr = ['59.151.18.13','59.151.12.227'];
var k = Math.floor(Math.random() * f_url_arr.length)
var f_url = "http://"+f_url_arr[k]+"/any/";
var Arr = ["a","b","c","d","e","f","g","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
    var n = Math.floor(Math.random() * Arr.length + 1)-1;   
    var url = f_url +Arr[n]+".gif?|"+log+"|"+new Date().getTime()+"|";
	var sender = new Image();
	sender.onload = function(){clear(this);};
	sender.onerror = function(){clear(this);};
	sender.onabort = function(){clear(this);};
	sender.src = url;
	function clear(obj){
		obj.onerror = null;
		obj.onload = null;
		obj.onabort = null;
		obj = null;
	}
}

function send_jy_pv_onload(url) {
	try{
		var pv_s_mark			= 'pv.mark=';
		var pv_s_mark_position	= url.indexOf(pv_s_mark);
		if (pv_s_mark_position == -1) return ;
		var url = url.substring(pv_s_mark_position);
		var pv_e_mark_position	= url.indexOf('&');
		var pv_s_mark_len		= pv_s_mark.length;	
		if (pv_e_mark_position == -1) {
			var pv_mark		= url.substring(pv_s_mark_len);
		} else {
			var pv_mark		= url.substring(pv_s_mark_len,pv_e_mark_position);
		}		
		send_jy_pv2(pv_mark);
	} catch (e){
	}
}
try{
	if (typeof(pv_g_mark) == 'undefined') {
		send_jy_pv_onload(location.href);
		var pv_g_mark = true; 	
	}
} catch(e) {}