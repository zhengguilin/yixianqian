
/*
 * Note - jQuery plugin for register  
 *
 * Author: will
 *
 * Version: v2
 * Date: 16 July 2011
 *
 * For documentation visit http://www.jiayuan.com
 *
 */
(function () {
	var loc_url = location.href;
	var url_arr = loc_url.split("http://");
	var url_dom_arr = url_arr[1].split("/");
	var loc_domain = url_dom_arr[0];
	var loc_referrer = document.referrer;
	if (loc_referrer != "") {
		if (loc_referrer.indexOf(loc_domain) < 0) {
			loc_referrer = encodeURIComponent(loc_referrer);
			var loc_h = encodeURIComponent(location.href);
			var expires = new Date();
			expires.setTime(expires.getTime() + 60 * 60 * 1000);
			document.cookie = ("REG_URL_COOKIE=" + loc_referrer + ";expires=" + expires.toGMTString());
			document.cookie = ("in_time=" + RegConfig.systime + ";expires=" + expires.toGMTString());
			document.cookie = ("out_referer=" + loc_referrer + ";expires=" + expires.toGMTString());
			document.cookie = ("inner_host=" + loc_h + ";expires=" + expires.toGMTString());
		}
	}
})();
function validate_age() {
	var age = get_age();
	if (age < 18 || age > 99) {
		return false;
	} else {
		return true;
	}
}
function get_age() {
	var day = $("#input_Day").attr("will")+"";
	day = day.substr(2);
	var month = $("#input_Month").attr("will") - 10;
	var select_date = $("#input_Year").attr("will") + "-" + month + "-" + day;
	var exp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	var r = select_date.match(exp);
	var sys = RegConfig.sysdate.match(exp);
	if (r == null || sys == null) {
		return false;
	}
	var d = new Date(r[1], r[3] - 1, r[4]);
	if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
		var Y = new Date(sys[1], sys[3] - 1, sys[4]).getFullYear();
		var age = Y - r[1];
		//in firefox parseInt('09') = 0;
		if (parseInt(r[3]-0) > parseInt(sys[3]-0) || (parseInt(r[3]-0) == parseInt(sys[3]-0) && parseInt(r[4]-0) > parseInt(sys[4]-0))) {
			age = age - 1;
		}
		return age;
	}
	return 0;
}
function countWorkNums(id) {
	var nv = "";
	if (id == 1) {
		nv = document.getElementById("note").value;
	} else {
		nv = document.getElementById("noteHelp").value;
	}
	var re = /^\s+|\s+$/g;
	nv = nv.replace(re, "");
	document.getElementById("wordNums" + id).innerHTML = nv.length;
}
function openWin(oMain) {
	var oBg = document.getElementById("bg");
	var oMain = document.getElementById(oMain);
	var clientW = document.documentElement.clientWidth || document.body.clientWidth;
	var clientH = document.documentElement.clientHeight || document.body.clientHeight;
	var offsetW = document.documentElement.scrollWidth || document.body.scrollWidth;
	var offsetH = document.documentElement.scrollHeight || document.body.scrollHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	var bodyW = (offsetW > clientW) ? offsetW : clientW;
	var bodyH = (offsetH > clientH) ? offsetH : clientH;
	with (oBg.style) {
		display = "block";
		width = bodyW + "px";
		height = bodyH + "px";
	}
	with (oMain.style) {
		display = "block";
		left = (clientW - oMain.offsetWidth) / 2 + scrollLeft + "px";
		top = (clientH - oMain.offsetHeight) / 2 + scrollTop + "px";
	}
}
function reg_trace(id, method, cb, array) {
	if (cb.onError == "function") {
		error = cb.onError;
	}
	var paras = [];
	var p = {};
	p[id] = ($("#" + id).length > 0) ? $("#" + id).val() : "";
	if (id == "mobile_vali") {
		p["mobile"] = $("#mobile").val();
	}
	if (array || id == "validate_code" || id == "email" || (id == "mobile" && method != "processUserMobile") || id == "mobile_vali") {
		paras = ["<xjxquery><q>" + $.param(p) + "</q></xjxquery>", id];
	} else {
		paras = ["<xjxquery><q>" + $.param(p) + "</q></xjxquery>"];
	}
	$.ajaxSetup({"beforeSend":function (xhr, s) {
		xhr.setRequestHeader("sid", $("#sid").val());
	}});
	$.post(RegConfig.ajaxUrl + "libs/xajax/reguser.server.php?" + method, {xajax:method, xajaxargs:paras, xajaxr:new Date().getTime()}, function (data) {
		var type = $(data).find("cmd").eq(0).text();
		var s2 = $(data).find("cmd").eq(1).text();
		if (type == "show null") {
			if (typeof cb.onError == "function") {
				cb.onError(id, s2);
			}
		} else {
			if (typeof cb.onSuccess == "function") {
				cb.onSuccess(id, s2);
			}
		}
	});
}
function default_focus(objName) {
	if (objName != "") {
		if (objName == "mobile_vali" || objName == "mobile") {
		    changeTabdd();
		}
		var ff = eval("document.Form1." + objName);
		if (ff) {
			eval("document.Form1." + objName + ".focus();");
		}
	}
	window.setInterval(function () {
		countWorkNums(1);
		countWorkNums(2);
		var X = $("#validate_code").offset().top;
		var Y = $("#validate_code").offset().left;
		$("#yzm").css("top", X - 150);
		$("#yzm").css("left", Y - 212);
	}, 1000);
}
function changeTabdd(cc) {
	if (cc) {
		$("#email_reg_ui").show();
		$("#mobile_reg_ui").hide();
		$("#usuall_mobile").show();
		$("#tjphone").hide();
		$("#email").val("");
		$("#emailinfo").attr("class", "").html("");
		$("#checkcodebak").show();
		$("#checkname").show();
		$("#email").focus();
		if(RegConfig.initEmail)
		{
			$("#email").val(RegConfig.initEmail);
		}
	} else {
		$("#mobile_reg").attr("checked", "true");
		$("#mobile_reg_ui").show();
		$("#tjphone").show();
		$("#email_reg_ui").hide();
		$("#usuall_mobile").hide();
		$("#mobile").val("");
		$("#mobileinfo").attr("class", "").html("");
		$("#checkcodebak").hide();
		$("#checkname").hide();
	}
}
function stymar() {
	var age = get_age();
	if ($("#sexm").attr("checked") == 1) {
		if (age >= 18 && age <= 21) {
			$("#marriage1").attr("checked", true);
			$("#marriage2").attr("disabled", "true");
			$("#marriage3").attr("disabled", "true");
		} else {
			$("#marriage2").removeAttr("disabled");
			$("#marriage3").removeAttr("disabled");
		}
	}
	if ($("#sexf").attr("checked") == 1) {
		if (age >= 18 && age <= 19) {
			$("#marriage1").attr("checked", true);
			$("#marriage2").attr("disabled", "true");
			$("#marriage3").attr("disabled", "true");
		} else {
			$("#marriage2").removeAttr("disabled");
			$("#marriage3").removeAttr("disabled");
		}
	}
	if (age >= 18 && age <= 20) {
		$("#income option").each(function () {
			if ($(this).val() == "40") {
				$(this).remove();
			}
			if ($(this).val() == "50") {
				$(this).remove();
			}
		});
	} else {
		if ($("#income option[value='40']").val() != 40) {
			$("<option value='40'>10000-20000</option>").appendTo("#income");
		}
		if ($("#income option[value='50']").val() != 50) {
			$("<option value='50'>20000</option>").appendTo("#income");
		}
	}
}
//延迟出发事件
var DelayedTask = function (fn, scope, args) {
	var me = this, id, call = function () {
		clearInterval(id);
		id = null;
		fn.apply(scope, args || []);
	};
	me.delay = function (delay, newFn, newScope, newArgs) {
		me.cancel();
		fn = newFn || fn;
		scope = newScope || scope;
		args = newArgs || args;
		id = setInterval(call, delay);
	};
	/**
	 * Cancel the last queued timeout
	 */
	me.cancel = function () {
		if (id) {
			clearInterval(id);
			id = null;
		}
	};
};
function get_invite_info() {
	var uid = $("#get_uid").val();
	$(".inv_info").slideUp("slow");
	jQuery.post("invite.php", {"uid":uid}, function (data) {
	//alert(data);
		$(".inv_info").html(data);
		$(".inv_info").slideDown("slow");
	});
}
var taskSendMsg = new DelayedTask(function () {
});
function validator() {
	var is_validator_success = true;
	var _force_id_error = "";
	var _force_id_msg = "";
	var error_msg = "";
	
	 //add by will at 2011-10-12 s
	if (!$("#credibility").attr("checked")) {
		$("#credibilityinfo").attr("class", "error").attr("style", "margin:0; float:left;").html("<span>\u9700\u8981\u540c\u610f\u8bda\u610f\u5ba3\u8a00</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#credibility";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#credibilityinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u9700\u8981\u540c\u610f\u8bda\u610f\u5ba3\u8a00</span>";
		}
	}
     //add by will at 2011-10-12 e

     //性别验证
	if (!$("#sexm").attr("checked") && !$("#sexf").attr("checked")) {
		$("#sexinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u6027\u522b</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#sexm";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#sexinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u586b\u5199\u6027\u522b</span>";
		}
	}
	if (!$("#marriage1").attr("checked") && !$("#marriage2").attr("checked") && !$("#marriage3").attr("checked")) {
		$("#marriageinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u4f60\u7684\u5a5a\u53f2</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#marriage1";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#marriageinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u9009\u62e9\u4f60\u7684\u5a5a\u53f2</span>";
		}
	}
	if (/请选择/.test($("#input_Year").val()) || /请选择/.test($("#input_Month").val()) || /请选择/.test($("#input_Day").val())) {
		if (/请选择/.test($("#input_Year").val())) {
			if (_force_id_error == "") {
				_force_id_error = "#input_Year";
			}
		} else {
			if (/请选择/.test($("#input_Month").val())) {
				if (_force_id_error == "") {
					_force_id_error = "#input_Month";
				}
			} else {
				if (/请选择/.test($("#input_Day").val())) {
					if (_force_id_error == "") {
						_force_id_error = "#input_Day";
					}
				}
			}
		}
		$("#birthinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u751f\u65e5</span>");
		if (_force_id_msg == "") {
			_force_id_msg = "#birthinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u9009\u62e9\u751f\u65e5</span>";
		}
		is_validator_success = false;
	} else {
		if (!validate_age()) {
			_force_id_error = "#input_Year";
			$("#birthinfo").attr("class", "error").html("<span>\u672a\u6ee118\u5c81\u54e6\uff01</span>");
			if (_force_id_msg == "") {
				_force_id_msg = "#birthinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8bf7\u9009\u62e9\u751f\u65e5</span>";
			}
			is_validator_success = false;
		}
	}
	if (/请选择/.test($("#input_City").val()) || /请选择/.test($("#input_City2").val())) {
		$("#locationinfo").attr("class", "error").html("<span> \u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</span>");
		if (/请选择/.test($("#input_City").val())) {
			if (_force_id_error == "") {
				_force_id_error = "#input_City";
			}
		} else {
			if (/请选择/.test($("#input_City").val())) {
				if (_force_id_error == "") {
					_force_id_error = "#input_City2";
				}
			}
		}
		is_validator_success = false;
		if (_force_id_msg == "") {
			_force_id_msg = "#locationinfo";
		}
		if (error_msg == "") {
			error_msg = "<span> \u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</span>";
		}
	}
	 if($("#height").val() == 0){
		 $("#heightinfo").attr("class","error").html("<span>1请选择身高</span>");
		is_validator_success = false;
		 if(_force_id_error=="")
		_force_id_error="#height";
		if(_force_id_msg=="")
		_force_id_msg="#heightinfo";
		if(error_msg=="")
		error_msg = "<span>请选择身高</span>";

	 }
	if ($("#degree").val() == 0) {
		$("#degreeinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u5b66\u4f4d</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#degree";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#degreeinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u9009\u62e9\u5b66\u4f4d</span>";
		}
	}
	if ($("#income").val() == 0) {
		$("#incomeinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u6536\u5165</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#income";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#incomeinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u9009\u62e9\u6536\u5165</span>";
		}
	}
	if ($("#email_reg").attr("checked")) {
		 //邮箱注册
		if ($("#email").val() == "") {
			$("#emailinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u5e38\u7528\u90ae\u7bb1</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#email";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#emailinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8bf7\u586b\u5199\u5e38\u7528\u90ae\u7bb1</span>";
			}
		}
		var re = /^[_a-zA-Z0-9\-\.]+@([\-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
		if (!$("#email").val().trim().match(re)) {
			$("#emailinfo").attr("class", "error").html("<span>\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u586b\u5199</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#email";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#emailinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u586b\u5199</span>";
			}
		}
		if (/该邮箱已/.test($("#emailinfo").html())) {
			$("#emailinfo").attr("class", "error").html("<span>\u8be5\u90ae\u7bb1\u5df2\u88ab\u6ce8\u518c\uff0c\u91cd\u65b0\u586b\u5199\u6216\u767b\u5f55</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#email";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#emailinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8be5\u90ae\u7bb1\u5df2\u88ab\u6ce8\u518c\uff0c\u91cd\u65b0\u586b\u5199\u6216\u767b\u5f55</span>";
			}
		}
	} else {
	     //手机号注册
		if ($("#mobile").val() == "") {
			$("#mobileinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#mobile";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#mobileinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8bf7\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7</span>";
			}
		}
		if (!is_mobile($("#mobile").val())) {
			$("#mobileinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u6709\u6548\u7684\u624b\u673a\u53f7</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#mobile";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#mobileinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8bf7\u586b\u5199\u6709\u6548\u7684\u624b\u673a\u53f7</span>";
			}
		}
		 //验证码
		if ($("#mobile_vali").val() == "" || /短信验证码错误/.test($("#mobilecodeinfo").text())) {
			$("#mobilecodeinfo").attr("class", "error errorPos").html("<span>\u586b\u5199\u624b\u673a\u77ed\u4fe1\u6536\u5230\u7684\u9a8c\u8bc1\u7801</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#mobile_vali";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#mobilecodeinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u586b\u5199\u624b\u673a\u77ed\u4fe1\u6536\u5230\u7684\u9a8c\u8bc1\u7801</span>";
			}
		}
	}

	 //密码
	if ($("#password").val() == "" || $("#password").val().trim().ByteCount(true) < 6 || $("#password").val().trim().ByteCount(true) > 20) {
		$("#passwordinfo").attr("class", "error").html("<span>\u5bc6\u7801\u592a\u77ed\u4e86\uff0c\u81f3\u5c116\u4f4d</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#password";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#passwordinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u5bc6\u7801\u592a\u77ed\u4e86\uff0c\u81f3\u5c116\u4f4d</span>";
		}
	}
	if ($("#password").val() != $("#repassword").val()) {
		$("#repasswordinfo").attr("class", "error").html("<span>\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u540c</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#repassword";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#repasswordinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u540c</span>";
		}
	}
	if ($("#password").val() == "") {
		$("#passwordinfo").attr("class", "error").html("<span>\u8bf7\u8f93\u5165\u5bc6\u7801</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#repassword";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#passwordinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u8f93\u5165\u5bc6\u7801</span>";
		}
	}
	if ($("#repassword").val() == "") {
		$("#repasswordinfo").attr("class", "error").html("<span>\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#repassword";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#repasswordinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</span>";
		}
	}
	if ($("#nickname").val() == "" || $("#nickname").val().trim().ByteCount(true) < 2 || $("#nickname").val().trim().ByteCount(true) > 20) {
		$("#nicknameinfo").attr("class", "error").html("<span>\u6635\u79f0\u81f3\u5c11\u4e00\u4e2a\u6c49\u5b57\u6216\u4e24\u4e2a\u5b57\u6bcd\uff0c\u6700\u591a10\u4e2a\u4e2d\u658720\u4e2a\u5b57\u6bcd</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#nickname";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#nicknameinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u6635\u79f0\u81f3\u5c11\u4e00\u4e2a\u6c49\u5b57\u6216\u4e24\u4e2a\u5b57\u6bcd\uff0c\u6700\u591a10\u4e2a\u4e2d\u658720\u4e2a\u5b57\u6bcd</span>";
		}
	}
	//验证独白
	var p1 = $("#photo1").attr("class");
	var p2 = $("#photo2").attr("class");
	if (p2 != "btn2 cur" && p1 == "btn1 cur") {
		var note_new = $("#note").val();
		$("#noteinfo").show();
		$("#noteinfo").addClass("error");
		if (note_new == "" || /^您知道吗/.test(note_new)) {
			$("#noteinfo").html("<span>\u5bf9\u672a\u6765\u7684TA\u4e0d\u60f3\u8bf4\u70b9\u4ec0\u4e48\u5417\uff1f\u8bf7\u81f3\u5c11\u8f93\u5165\u4e00\u9879\u5427</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#note";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#noteinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u5bf9\u672a\u6765\u7684TA\u4e0d\u60f3\u8bf4\u70b9\u4ec0\u4e48\u5417\uff1f\u8bf7\u81f3\u5c11\u8f93\u5165\u4e00\u9879\u5427</span>";
			}
		}
		if ((note_new != "") && (note_new.trim().length < 5)) {
			$("#noteinfo").html("<span>\u60a8\u5199\u7684\u201c\u5185\u5fc3\u72ec\u767d\u201d\u592a\u5c11\u4e86\uff0c\u4e5f\u592a\u6ca1\u8bda\u610f\u4e86\u5427</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#note";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#noteinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u60a8\u5199\u7684\u201c\u5185\u5fc3\u72ec\u767d\u201d\u592a\u5c11\u4e86\uff0c\u4e5f\u592a\u6ca1\u8bda\u610f\u4e86\u5427</span>";
			}
		}
		if ((note_new != "") && countSize(note_new.trim()) > 1000) {
			$("#noteinfo").html("<span>\u60a8\u5199\u7684\u5185\u5fc3\u72ec\u767d\u592a\u591a\u4e86\uff0cTA\u4f3c\u4e4e\u6ca1\u6709\u8010\u5fc3\u770b\u54e6</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#note";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#noteinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u60a8\u5199\u7684\u5185\u5fc3\u72ec\u767d\u592a\u591a\u4e86\uff0cTA\u4f3c\u4e4e\u6ca1\u6709\u8010\u5fc3\u770b\u54e6</span>";
			}
		}
	} else {
		var v1 = $("#input1").val();
		var v2 = $("#input2").val();
		var v3 = $("#input3").val();
		var v4 = $("#input4").val();
		if (v1 == "" && v2 == "" && v3 == "" && v4 == "") {
			$("#noteinfo").show();
			document.getElementById("noteinfo").className = "error";
			$("#noteinfo").html("<span>\u5bf9\u672a\u6765\u7684TA\u4e0d\u60f3\u8bf4\u70b9\u4ec05\u4e48\u5417\uff1f\u8bf7\u81f3\u5c11\u8f93\u5165\u4e00\u9879\u5427</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#note";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#noteinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u5bf9\u672a\u6765\u7684TA\u4e0d\u60f3\u8bf4\u70b9\u4ec05\u4e48\u5417\uff1f\u8bf7\u81f3\u5c11\u8f93\u5165\u4e00\u9879\u5427</span>";
			}
		} else {
			var v5 = "";
			if (v1 != "") {
				v5 += "\u6211\u559c\u6b22" + v1 + "\u3002";
			}
			if (v2 != "") {
				v5 += "\u6211\u5728\u4e1a\u4f59\u65f6\u95f4\u6700\u5927\u7684\u6d88\u9063\u662f" + v2 + "\u3002";
			}
			if (v3 != "") {
				v5 += "\u6211\u61a7\u61ac\u7684\u751f\u6d3b\u662f" + v3 + "\u3002";
			}
			if (v4 != "") {
				v5 += "\u6211\u5e0c\u671b\u6211\u672a\u6765\u7684\u53e6\u4e00\u534a\u6700\u597d\u662f" + v4 + "\u3002";
			}
			v5 += "\u771f\u5fc3\u5e0c\u671b\u5728\u8fd9\u91cc\u80fd\u9047\u5230\u6211\u7684\u90a3\u4e2aTA!";
			$("#noteHelp").val(v5);
		}
	}

    //验证码
	if ($("#email_reg").attr("checked")) {//邮箱注册时验证
		if ($("#validate_code").val() == "") {
			$("#validatecodeinfo").attr("class", "error").html("<span>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#validate_code";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#validatecodeinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</span>";
			}
		}
		if (/验证码填/.test($("#validatecodeinfo").html())) {
			$("#validatecodeinfo").attr("class", "error").html("<span>\u9a8c\u8bc1\u7801\u586b\u5199\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</span>");
			is_validator_success = false;
			if (_force_id_error == "") {
				_force_id_error = "#validate_code";
			}
			if (_force_id_msg == "") {
				_force_id_msg = "#validatecodeinfo";
			}
			if (error_msg == "") {
				error_msg = "<span>\u9a8c\u8bc1\u7801\u586b\u5199\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</span>";
			}
		}
	}
	if (!$("#readme").attr("checked")) {
		$("#readmeinfo").attr("class", "error").html("<span>\u9700\u8981\u540c\u610f\u6761\u6b3e</span>");
		is_validator_success = false;
		if (_force_id_error == "") {
			_force_id_error = "#readme";
		}
		if (_force_id_msg == "") {
			_force_id_msg = "#validatecodeinfo";
		}
		if (error_msg == "") {
			error_msg = "<span>\u9700\u8981\u540c\u610f\u6761\u6b3e</span>";
		}
	}
	if (_force_id_error != "") {
		$("#hidvla").val("1");
		$(_force_id_error).focus();
	}
	return is_validator_success;
}

//延迟出发事件
(function ($) {
	$(document).ready(function () {
		var ip_loc = RegConfig.clientLocal;
		var localstr = RegConfig.configLocal;
		var locals = localstr.split("|");
	    //初始化
		if (in_array(locals, ip_loc)) {
		 //   build_select("province","city",LSK,LOK,ip_loc+"01");
		    changeTabdd();
		} else {
		}
		//CSK修改成LSK  COK修改成LOK
       
		//清空浏览器默认信息
        $("#repassword,#password").val("");

		//邮箱回填
		$("#email").val(RegConfig.initEmail);

        //数据提交
		function onform_submit() {
			if (validator() || RegConfig.from == "123") {
				//记录手机pv
				if ($("#mobile_bak").val() != "" && is_mobile($("#mobile_bak").val())) {
					send_jy_pv2("signup_reg_mobilebak_insert");
				}
				var p1 = $("#photo1").attr("class");
				var p2 = $("#photo1").attr("class");
				var note = "";
				if (p1 == "btn1 cur" && p2 != "btn2 cur") {
					note = $("#note").val();
				} else {
					note = $("#noteHelp").val();
				}
				$("#province").val($("#input_City").attr("will"));
				$("#city").val($("#input_City2").attr("will"));
				$("#year").val($("#input_Year").attr("will"));
				$("#month").val($("#input_Month").attr("will"));
				$("#day").val($("#input_Day").attr("will"));
				$("#note").val(note);
				openWin("popbox1");
			}
		}
		$("#popbox_close").bind("click", function () {
			$("#popbox_close").unbind("click");
			$("#Form1").submit();
		});
		$(".next_btn").bind("click", onform_submit);
		$("#email_reg,#mobile_reg").click(function () {
			if ($(this).val() == 0) {
				$("#email_reg_ui").show();
				$("#mobile_reg_ui").hide();
				$("#usuall_mobile").show();
				$("#tjphone").hide();
				$("#email").val("");
				$("#emailinfo").attr("class", "").html("");
				$("#checkcodebak").show();
				$("#checkname").show();
				$("#email").focus();
				if(RegConfig.initEmail)
				{
					$("#email").val(RegConfig.initEmail);
				}
			} else {
				$("#mobile_reg_ui").show();
				$("#tjphone").show();
				$("#email_reg_ui").hide();
				$("#usuall_mobile").hide();
				$("#mobile").val("");
				$("#mobileinfo").attr("class", "").html("");
				$("#checkcodebak").hide();
				$("#checkname").hide();
				$("#mobile").focus();
			}
		});
		$(".input_220").focus(function () {
			$(this).attr("class", "input_g_220");
		}).blur(function () {
			$(this).attr("class", "input_220");
		});
		$(".input_150").focus(function () {
			$(this).attr("class", "input_g_150");
		}).blur(function () {
			$(this).attr("class", "input_150");
		});
		$(".input_105").focus(function () {
			$(this).attr("class", "input_g_105");
		}).blur(function () {
			$(this).attr("class", "input_105");
		});
		$(".input_126").focus(function () {
			$(this).attr("class", "input_g_126");
		}).blur(function () {
			$(this).attr("class", "input_126");
		});
		$(".inp_66").focus(function () {
			$(this).parent(".input_66").attr("class", "input_g_66");
		}).blur(function () {
			$(this).parent(".input_g_66").attr("class", "input_66");
		});
		$("#email,#mobile,#mobile_vali").focus(function () {
			convertValue(document.getElementById($(this).attr("id")));
		}).blur(function () {
			$(this).val(DBC2SBC($(this).val()));
		});
		//邮箱验证
		$("#email").focus(function () {
			$("#emailinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u8f93\u5165\u5e38\u7528\u90ae\u7bb1\uff0c\u5982example@jiayuan.com,\u5b83\u5c06\u6210\u4e3a\u60a8\u672a\u6765\u7684\u767b\u5f55\u5e10\u53f7</div><span></span></div>");
		}).blur(function () {
			var email = $(this).val();
			if (email.trim() == "") {
				$("#emailinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u5e38\u7528\u90ae\u7bb1</span>");
				return false;
			}
	
		   //格式是否正确
			var re = /^[_a-zA-Z0-9\-\.]+@([\-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
			var email2 = email;
			if (!email2.trim().match(re)) {
				$("#emailinfo").attr("class", "error").html("<span>\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u586b\u5199</span>");
				return false;
			}
		   //长度验证
			if (email2.length > 30) {
				$("#emailinfo").attr("class", "error").html("<span>\u90ae\u7bb1\u957f\u5ea6\u8fc7\u957f\uff0c\u6700\u591a30\u4f4d</span>");
				return false;
			}
		   //
			$("#email").val(email2);
			reg_trace("email", "processTraceUser", {onError:function (id, data) {
				$("#emailinfo").attr("class", "error").html("<span>\u8be5\u90ae\u7bb1\u5df2\u88ab\u6ce8\u518c\uff0c\u91cd\u65b0\u586b\u5199\u6216<a  href='" + RegConfig.baseUrl + "/login/?channel=110&name=" + email2 + "'>\u767b\u5f55</a></span>");
			}, onSuccess:function () {
				$("#emailinfo").attr("class", "true").html("&nbsp;");
			}});
		});
		

		//手机验证
		$("#mobile").focus(function () {
			$("#mobileinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u586b\u5199\u60a8\u7684\u624b\u673a\u53f7</div><span></span></div>").next().remove();
			$("#resendvalid").html("");
			$("#sendmobilebtm").hide();
			$(".p_txt01").hide();
		}).bind("keyup", function () {
			if (is_mobile($(this).val())) {
				$("#mobileinfo").attr("class", "true").html("");
				auto_vali_mobile();
			}
		}).blur(function () {
			var mobile = $(this).val();
			if (mobile == "" || !is_mobile(mobile)) {
				$("#mobileinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u6709\u6548\u7684\u624b\u673a\u53f7</span>");
				$("#resendvalid").html("");
				$("#sendmobilebtm").hide();
				$(".p_txt01").hide();
				return false;
			}
			$("#mobileinfo").attr("class", "true").html("");
			auto_vali_mobile();
		});

		$("#bak_reg").click(function () {
			$("#email_reg_ui").show();
			$("#mobile_reg_ui").hide();
			$("#usuall_mobile").show();
			$("#tjphone").hide();
			$("#email").val("");
			$("#emailinfo").attr("class", "").html("");
			$("#checkcodebak").show();
			$("#checkname").show();
			$("#email_reg").attr("checked", "true");
			$("#email").focus();
		});
		$("#resendcode").click(function () {
				taskSendMsg.delay(1000, function () {
					reg_trace("mobile", "processSendOrUpdateMessage", {onError:function (id, data) {
						var d = $("<div>" + data + "</div>").find("a").remove().end().html();
						if (/5分钟/.test(d)) {
							d = "5\u5206\u949f\u672a\u6536\u5230\u77ed\u4fe1\u9a8c\u8bc1\u7801\uff0c\u8bf7\u91cd\u8bd5";
						}
						alert(d);
					}, onSuccess:function (id, data) {
						alert("\u53d1\u9001\u6210\u529f");
					}});
				});
			});
		$(".btn_YZM").bind("click", function () {

				$(this).addClass("btn_YZM_hv");
				$(this).unbind("click");
				$(".p_txt01").show();

				taskSendMsg.delay(1000, function () {
				
				reg_trace("mobile", "processSendOrUpdateMessage", {onError:function (id, data) {
					var d = $("<div>" + data + "</div>").find("a").remove().end().html();
					if (/5分钟/.test(d)) {
						d = "5\u5206\u949f\u672a\u6536\u5230\u77ed\u4fe1\u9a8c\u8bc1\u7801\uff0c\u8bf7\u91cd\u8bd5";
					}
					alert(d);
				}, onSuccess:function (id, data) {
					alert("\u53d1\u9001\u6210\u529f");
				}});
			});
		});
		function auto_vali_mobile() {
			var mobile = $("#mobile").val();
			reg_trace("mobile", "processUserMobile", {onError:function (id, data) {
				$("#sendmobilebtm").hide();
				$(".p_txt01").hide();
				$("#mobileinfo").attr("class", "error").html("<span>\u8be5\u624b\u673a\u5df2\u88ab\u6ce8\u518c\uff0c\u91cd\u65b0\u586b\u5199\u6216<a href='" + RegConfig.baseUrl + "/login/?channel=120&name=" + mobile + "'>\u767b\u5f55</a></span>");
			}, onSuccess:function () {
				$("#sendmobilebtm").show();
				if($(".btn_YZM_hv").length>0)
				{
					$(".p_txt01").show();
				}
			}});
		}
		//验证码
		$("#mobile_vali").bind("keyup", function () {
			if (/^\d{5}$/.test($(this).val())) {
				$("#mobilecodeinfo").attr("class", "true").html("");
				reg_trace("mobile_vali", "processValidatorMessage", {onError:function (id, data) {
					$("#mobilecodeinfo").attr("class", "error errorPos").html("<span  style='width:100px;'>\u77ed\u4fe1\u9a8c\u8bc1\u7801\u9519\u8bef</span>");
				}, onSuccess:function (id, data) {
					$("#mobilecodeinfo").attr("class", "true").html("&nbsp;");
				}});
			}
		}).focus(function () {
			$("#mobilecodeinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u586b\u5199\u624b\u673a\u77ed\u4fe1\u6536\u5230\u7684\u9a8c\u8bc1\u7801</div><span></span></div>");
		}).blur(function () {
			var code = $(this).val();
			if (!/^\d{1,5}$/.test(code)) {
				$("#mobilecodeinfo").attr("class", "error errorPos").html("<span  style='width:100px;'>\u77ed\u4fe1\u9a8c\u8bc1\u7801\u9519\u8bef</span>");
				return false;
			}
			reg_trace("mobile_vali", "processValidatorMessage", {onError:function (id, data) {
				$("#mobilecodeinfo").attr("class", "error errorPos").html("<span style='width:100px;'>\u77ed\u4fe1\u9a8c\u8bc1\u7801\u9519\u8bef</span>");
			}, onSuccess:function (id, data) {
				$("#mobilecodeinfo").attr("class", "true").html("&nbsp;");
			}});
		});
		//密码
		$("#repassword,#password").bind("keyup", function () {
			var id = $(this).attr("id");
			if (id == "password" && /^[a-zA-Z0-9]{6,20}$/.test($(this).val())) {
				$("#" + id + "info").attr("class", "true").html("");
			} else {
				if (id == "repassword") {
			    //确认密码学和密码相同
					if ($("#repassword").val() == $("#password").val() && /^[a-zA-Z0-9]{6,20}$/.test($(this).val())) {
						$("#" + id + "info").attr("class", "true").html("");
					} else {
					}
				}
			}
		}).focus(function () {
			var id = $(this).attr("id");
			if (id == "password") {
				$("#" + id + "info").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u8f93\u51656-20\u4f4d\u5bc6\u7801\uff0c\u53ef\u7531\u6570\u5b57\u3001\u5b57\u6bcd\u7ec4\u6210</div><span></span></div>");
			} else {
				$("#" + id + "info").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</div><span></span></div>");
			}
		}).blur(function () {
			var pass = $(this).val();
			var id = $(this).attr("id");
			if (pass.trim() == "") {
				$("#" + id + "info").attr("class", "error").html("<span>\u8bf7\u8f93\u5165\u5bc6\u7801</span>");
				return false;
			}
		   //过短
			if (pass.ByteCount(true) < 6) {
				$("#" + id + "info").attr("class", "error").html("<span>\u5bc6\u7801\u592a\u77ed\u4e86\uff0c\u81f3\u5c116\u4f4d</span>");
				return false;
			}
		   //过长
			if (pass.ByteCount(true) > 20) {
				$("#" + id + "info").attr("class", "error").html("<span>\u5bc6\u7801\u592a\u957f\u4e86\uff0c\u6700\u591a20\u4f4d</span>");
				return false;
			} 
		   //非法字符
			if (!/^[a-zA-Z0-9]{6,20}$/.test(pass)) {
				$("#" + id + "info").attr("class", "error").html("<span>\u8bf7\u4f7f\u7528\u5b57\u6bcd\u6216\u6570\u5b57\u4f5c\u4e3a\u5bc6\u7801</span>");
				return false;
			}
		   //是否相等
			if (id == "repassword") {
				if ($("#repassword").val() != $("#password").val()) {
					$("#repasswordinfo").attr("class", "error").html("<span>\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u540c</span>");
					return false;
				}
			}
			$("#" + id + "info").attr("class", "true").html("&nbsp;");
		});
		

		//昵称
		$("#nickname").focus(function () {
			convertValue(document.getElementById($(this).attr("id")));
		}).blur(function () {
			$(this).val(DBC2SBC($(this).val().trim()));
		});
         //昵称
		$("#nickname").focus(function () {
			$("#nicknameinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u957f\u5ea6\u4e0d\u8d85\u8fc710\u4e2a\u6c49\u5b57\uff0c\u621620\u4e2a\u5b57\u6bcd</div><span></span></div>");
			reg_trace("nicknamein", "processTraceUser", {}, true);
		}).blur(function () {
			var nickname = $(this).val();
			if (nickname.trim().ByteCount(true) < 2) {
				$("#nicknameinfo").attr("class", "error").html("<span>\u6635\u79f0\u592a\u77ed\u4e86\uff0c\u81f3\u5c111\u4e2a\u6c49\u5b57\u62162\u4e2a\u5b57\u6bcd</span>");
				return false;
			}
			if (nickname.trim().ByteCount(true) > 20) {
				$("#nicknameinfo").attr("class", "error").html("<span>\u6635\u79f0\u592a\u957f\u4e86\uff0c\u6700\u591a10\u6c49\u5b57\u621620\u4e2a\u5b57\u6bcd</span>");
				return false;
			}
		  //非法字符
			var filter = check_durty_words(nickname.trim());
			if (filter) {
				$("#nicknameinfo").attr("class", "error").html("<span>\u201c" + filter + "\u201d\u4e0d\u80fd\u5728\u6635\u79f0\u4e2d\u4f7f\u7528</span>");
				return false;
			}
			$("#nicknameinfo").attr("class", "true").html("&nbsp;");
			reg_trace("nickname", "processTraceUser", {}, true);
		});
		
		//身高
		 $("#height").focus(function(){
			 $("#heightinfo").attr("class","hint_box").html("<div class='tip_bg'><span>请选择身高</span></div>");
		 }).blur(function(){
			if($(this).val() == 0)
			{
			   $("#heightinfo").attr("class","error").html("<span>请选择身高</span>");
			   return false;
			}
			$("#heightinfo").attr("class","true").html("&nbsp;");
            reg_trace("height", "processTraceUser", {}, true);
		 }).change(function(){
		   if($(this).val() !=0)
		   {
			 $(this).blur();
			// $("#degree").focus();
		   }
		 });


		//学历
		$("#degree").focus(function () {
			$("#degreeinfo").attr("class", "hint_box").html("<div class='tip_bg'><span>\u8bf7\u9009\u62e9\u5b66\u5386</span></div>");
		}).blur(function () {
			if ($(this).val() == 0) {
				$("#degreeinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u5b66\u4f4d</span>");
				return false;
			}
			$("#degreeinfo").attr("class", "true").html("&nbsp;");
            reg_trace("degree", "processTraceUser", {}, true);
		}).change(function () {
			if ($(this).val() != 0) {
				$(this).blur();
			}
		});

		//月薪
		$("#income").focus(function () {
			$("#incomeinfo").attr("class", "hint_box").html("<div class='tip_bg'><span>\u8bf7\u9009\u62e9\u6536\u5165</span></div>");
		}).blur(function () {
			if ($(this).val() == 0) {
				$("#incomeinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u6536\u5165</span>");
				return false;
			}
			$("#incomeinfo").attr("class", "true").html("&nbsp;");
            reg_trace("income", "processTraceUser", {}, true);
		}).change(function () {
			if ($(this).val() != 0) {
				$("#incomeinfo").attr("class", "true").html("&nbsp;");
			}
		});
		
		//性别
		$("#sexm,#sexf").focus(function () {
		}).click(function () {
			$("#sexinfo").attr("class", "true").html("&nbsp;");
			// man 170 woman 160
			if ($("#sexf").attr("checked"))
			{
				$("#height").val("160");
			}else
			{
				$("#height").val("170");
			}
			$("#heightinfo").attr("class", "true").html("&nbsp;");
			//$("#input_Year").focus();

		}).blur(function () {
			if (!$("#sexf").attr("checked") && !$("#sexm").attr("checked")) {
				$("#sexinfo").attr("class", "error").html("<span>\u8bf7\u586b\u5199\u6027\u522b</span>");
				return false;
			}
			$("#sexinfo").attr("class", "true").html("&nbsp;");
			reg_trace("sex", "processTraceUser", {}, true);
		});
		 //婚史
		$("#marriage1,#marriage2,#marriage3").click(function () {
			$("#marriageinfo").attr("class", "true").html("&nbsp;");
		}).blur(function () {
			if ($("#marriage1").attr("checked") || $("#marriage2").attr("checked") || $("#marriage3").attr("checked")) {
				$("#marriageinfo").attr("class", "true").html("&nbsp;");
			}
            reg_trace("marriage", "processTraceUser", {}, true);
		});

		//所在地区
		$("#input_City,#input_City2").focus(function () {
			if ($("#hidvla").val() != 1) {
				$("#locationinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</div><span></span></div>");
			} else {
				$("#locationinfo").attr("class", "error").html("<span> \u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</span>");
			}
		}).blur(function () {
			$("#hidvla").val("0");
			if (/请选择/.test($("#input_City").val())|| /请选择/.test($("#input_City2").val())) {

				$("#locationinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</div><span></span></div>");
			
				if(/请选择/.test($("#input_City2").val()) && $(this).attr("id") == "input_City2")
				{
					$("#locationinfo").attr("class", "error").html("<span> \u8bf7\u9009\u62e9\u7701\u3001\u5e02\uff08\u533a\uff09</span>");
				}
				
				return false;
			}
			$("#locationinfo").attr("class", "true").html("&nbsp;");
			$("#province").val($("#input_City").attr("will"));
		    $("#city").val($("#input_City2").attr("will"));
			reg_trace("city", "processTraceUser", {}, true);
		});
	
        var year_blur = true;
		$("#input_Year,#input_Month,#input_Day").focus(function () {
			if ($("#hidvla").val() != 1) {
				$("#birthinfo").attr("class", "hint_box").html("<div class='tip_bg' id='passwordinfo'><span>\u8bf7\u9009\u62e9\u751f\u65e5</span></div>");
			} else {
				$("#birthinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u751f\u65e5</span>");
			}

            if($(this).attr("id") == "input_Year") {
                year_blur = true;
            }
		}).blur(function () {
			$("#hidvla").val("0");
			if (/\d/.test($("#input_Year").val()) && /\d/.test($("#input_Month").val()) && /\d/.test($("#input_Day").val())) {
				if (validate_age()) {
				//注册优化
					stymar();
					$("#birthinfo").attr("class", "true").html("&nbsp;");
					$("#year").val($("#input_Year").attr("will"));
					$("#month").val($("#input_Month").attr("will"));
					$("#day").val($("#input_Day").attr("will"));
					
				} else {
					$("#birthinfo").attr("class", "error").html("<span>\u672a\u6ee118\u5c81\u54e6\uff01</span>");
				}
			} else {
				if($(this).attr("id") == "input_Day")
				{
					$("#birthinfo").attr("class", "error").html("<span>\u8bf7\u9009\u62e9\u751f\u65e5</span>");
				}else{
					$("#birthinfo").attr("class", "hint_box").html("<div class='tip_bg' id='passwordinfo'><span>\u8bf7\u9009\u62e9\u751f\u65e5</span></div>");
				}
			}
            if($(this).attr("id") == "input_Year" && year_blur) {
                reg_trace("year", "processTraceUser", {}, true);
                year_blur = false;
            }
            
		});
		//验证码
		//注意,jQuery的unbind方法只能取消jquery bind()方法绑定的事件,
		$("#validate_code").focus(function () {
			$(".next_btn").unbind("click");
			$("#validatecodeinfo").attr("class", "hint_box").html("<div class='hint_h'><div class='hint'>\u8bf7\u8f93\u5165\u56fe\u7247\u4e2d\u7684\u8ba1\u7b97\u7ed3\u679c</div><span></span></div>");
		}).bind("keyup", function () {
			var code = $(this).val();
			code = $.trim(code);
			if (/[a-zA-Z0-9-]{4}/.test(code)) {
				reg_trace("validate_code", "processTraceUser", {onError:function (id, data) {
					$("#validatecodeinfo").attr("class", "error").html("<span>\u9a8c\u8bc1\u7801\u586b\u5199\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</span>");
				}, onSuccess:function (id, data) {
					$(".next_btn").unbind("click");
					$(".next_btn").bind("click", onform_submit);
					$("#validatecodeinfo").attr("class", "true").html("&nbsp;");
				}});
			} else {
				$(".next_btn").unbind("click");
			}
		}).blur(function () {
			$(this).val(DBC2SBC($(this).val()));
			var code = $(this).val();
			code = $.trim(code);
			if (code == "") {
				$("#validatecodeinfo").attr("class", "error").html("<span>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</span>");
				return false;
			}
			reg_trace("validate_code", "processTraceUser", {onError:function (id, data) {
				$("#validatecodeinfo").attr("class", "error").html("<span>\u9a8c\u8bc1\u7801\u586b\u5199\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</span>");
			}, onSuccess:function (id, data) {
				$(".next_btn").unbind("click");
				$(".next_btn").bind("click", onform_submit);
				$("#validatecodeinfo").attr("class", "true").html("&nbsp;");
			}});
		});
		//刷新验证码
		$("#refresh,#code_imge").click(function () {
			var img = $("#code_imge").attr("src") + "?d=" + Math.random();
			$("#code_imge").attr("src", img);
			$("#validate_code").val("").focus();
			return false;
		});
		$("#readme").click(function () {
			if ($(this).attr("checked")) {
				$("#readmeinfo").attr("class", "true").html("&nbsp;");
			} else {
				$("#readmeinfo").attr("class", "error").html("<span>\u9700\u8981\u540c\u610f\u6761\u6b3e</span>");
			}
		});
		//add by will at 2011-10-12 s
		$("#credibility").click(function () {
			if ($(this).attr("checked")) {
				$("#credibilityinfo").attr("class", "true").attr("style", "margin:0; float:left;").html("&nbsp;");
			} else {
				$("#credibilityinfo").attr("class", "error").attr("style", "margin:0; float:left;").html("<span>\u9700\u8981\u540c\u610f\u8bda\u610f\u5ba3\u8a00</span>");
			}
		});
		//add by will at 2011-10-12 e
		//邀请注册
		var uid = $("#get_uid").val();
		uid = parseInt(uid);
		if (uid > 0 ) {
			get_invite_info();
		} else {
			$(".inv_info").hide();
			$("#chang_1").attr("src", "http://images1.jyimg.com/w4/register/i/head_box.jpg");
			$("#chang_2").removeClass("inv_left_t");
			$("#chang_2").addClass("left_t");
			$("#chang_3").removeClass("inv_left_b");
			$("#chang_3").addClass("left_b");
			$("#chang_4").removeClass("inv_left_img1");
			$("#chang_4").addClass("left_img1");
			$("#chang_5").removeClass("inv_left_img2");
			$("#chang_5").addClass("left_img2");
			$(".left_img3").show();
			$("#chang_6").removeClass("inv_info");
			$("#chang_6").addClass("info");
		}
		//看看别人怎么写
		var user_note = "";
		var modify_note = 0;
		$(this).Note("see_other_note", {"src":RegConfig.sourcesUrl, "css":"nxdb_a", "top":544, "left":143, "onclick":function (data, tab, index) {
			$("#note").focus();
			if ($("#note").val() != "" && modify_note != 1) {
				user_note = $("#note").val() + "\r\n";
				modify_note = 1;
				$("#note").val(user_note + data);
			} else {
				$("#note").val(data);
			}
			try {
				send_jy_pv2("reg_see_other_note_" + tab + "_" + index);
			}
			catch (e) {
			}
            //显示tab
			try {
				photo(1);
			}
			catch (e) {
			}
		}, "onopen":function () {
			var sex = $("#sexm").attr("checked") == 1 ? "m" : "f";
			$(".nxdb_a").attr("sex", sex);
		}});
	});
})(jQuery);

