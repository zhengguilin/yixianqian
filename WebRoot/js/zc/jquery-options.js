
/*
 * Note - jQuery plugin for pop select options  
 *
 * Author: will
 *
 * Version: v2
 * Date: 16 July 2011
 *
 * For documentation visit http://www.jiayuan.com
 *
 */
(function ($) {
$(document).ready(function () {
	/**
	if(typeof RegConfig == "undefined")
	{
		var mydate = new Date();
		var RegConfig = {sysdate:mydate.getFullYear()+"-"+(mydate.getMonth() +1)+"-"+mydate.getDate()};
	}
	*/
	var locationArray = [[["11", "\u5317\u4eac"], ["31", "\u4e0a\u6d77"], ["12", "\u5929\u6d25"], ["50", "\u91cd\u5e86"]], [["44", "\u5e7f\u4e1c"], ["34", "\u5b89\u5fbd"], ["35", "\u798f\u5efa"], ["62", "\u7518\u8083"], ["45", "\u5e7f\u897f"], ["52", "\u8d35\u5dde"], ["46", "\u6d77\u5357"], ["13", "\u6cb3\u5317"], ["41", "\u6cb3\u5357"]], [["23", "\u9ed1\u9f99\u6c5f"], ["42", "\u6e56\u5317"], ["43", "\u6e56\u5357"], ["22", "\u5409\u6797"], ["32", "\u6c5f\u82cf"], ["36", "\u6c5f\u897f"], ["21", "\u8fbd\u5b81"], ["15", "\u5185\u8499\u53e4"], ["64", "\u5b81\u590f"]], [["63", "\u9752\u6d77"], ["37", "\u5c71\u4e1c"], ["14", "\u5c71\u897f"], ["61", "\u9655\u897f"], ["51", "\u56db\u5ddd"], ["54", "\u897f\u85cf"], ["65", "\u65b0\u7586"], ["53", "\u4e91\u5357"], ["33", "\u6d59\u6c5f"]], [["82", "\u6fb3\u95e8"], ["81", "\u9999\u6e2f"], ["71", "\u53f0\u6e7e"], ["99", "\u56fd\u5916"], ["83", "\u9493\u9c7c\u5c9b"]]];
		
	var sysy = RegConfig.sysdate.split(/\-|\//)[0];
	var sysm = RegConfig.sysdate.split(/\-|\//)[1];
	var sysd = RegConfig.sysdate.split(/\-|\//)[2];
	var province=RegConfig.province || RegConfig.clientLocal || "";
	var city=RegConfig.city || province+"01";

	var byear  = RegConfig.byear || "";
	var bmonth = RegConfig.bmonth || "";
	var bday   = RegConfig.bday || "";
	
	function initBirthInnerHTML(id) {
		     //birth year
	
		var birth_year_content = $("<div class=\"select_Year\"><input id=\"input_Year\"  class=\"input_Year\" value=\"\u8bf7\u9009\u62e9\"/><label> \u5e74 </label></div>");
		var birth_year = $("<div id=\"year_List\" class=\"year_List clear\"><iframe frameborder=\"no\" class=\"year_Iframe\"></iframe><h2>\u9009\u62e9\u5e74</h2></div>");
		for (var i = 9; i > 2; i--) {
			var dt = $("<dl><dt>" + i + "0\u540e\uff1a</dt></dl>");
			for (var s = 0; s < 10; s++) {
				var sv = 1900 + i * 10 + s;
				if(sysy-sv<18 || sysy-sv>99){continue;}
				if(sv == byear)
				{

					$(dt).append("<dd><a class=\"cur\" will=\""+sv+"\" href=\"###\">" + sv + "</a></dd>");
					
				}else
				{
					$(dt).append("<dd><a will=\""+sv+"\" href=\"###\">" + sv + "</a></dd>");
				}
			}
			$(birth_year).append(dt);
		}
		$(birth_year_content).append(birth_year);
			
			 //birth  month
		var birth_month_content = $("<div class=\"select_Month\"><input id=\"input_Month\" class=\"input_Month\" value=\"\u8bf7\u9009\u62e9\" /><label> \u6708 </label></div>");
		var birth_month = $("<div id=\"month_List\" class=\"month_List cleart\"><h2>\u9009\u62e9\u6708</h2></div>");
		var month_p = $("<p></p>");
		for (var i = 1; i < 13; i++) {
			if((i+10) == bmonth)
			{
				$(month_p).append("<a class=\"cur\" will=\""+(i+10)+"\" href=\"###\">" + i + "</a>");
				
			}else{
				$(month_p).append("<a will=\""+(i+10)+"\" href=\"###\">" + i + "</a>");
			}
		}
		$(birth_month).append(month_p);
		$(birth_month_content).append(birth_month);

			 // birth day 
		var birth_day_content = $("<div class=\"select_Day\"><input id=\"input_Day\" class=\"input_Day\" value=\"\u8bf7\u9009\u62e9\"/><label> \u65e5 </label></div>");
		var birth_day = $("<div id=\"day_List\" class=\"day_List clear\"><h2>\u9009\u62e9\u65e5</h2></div>");
		var day_p = $("<p></p>");
		
		for (var i = 1; i < 32; i++) {
			if(i== (bday-bmonth*100))
			{
				$(day_p).append("<a class=\"cur\" href=\"###\">" + i + "</a>");

			}else{
				$(day_p).append("<a href=\"###\">" + i + "</a>");
			}
		}
		$(birth_day).append(day_p);
		$(birth_day_content).append(birth_day);
		$(id).prepend(birth_day_content);
		$(id).prepend(birth_month_content);
		$(id).prepend(birth_year_content);
	}
	function initHeightInnerHTML(id) {
			 //height html
		var height_content = $("<div id=\"select_Height\"  class=\"select_Height\"><input id=\"input_Height\" class=\"input_Height\" value=\"\u8bf7\u9009\u62e9\"/><label>&nbsp;</label></div>");
		var height = $("<div id=\"height_List\" class=\"height_List clear\"><iframe frameborder=\"no\" class=\"height_Iframe\"></iframe><h2>\u9009\u62e9\u8eab\u9ad8</h2></div>");
		for (var i = 220; i > 120; i = i - 10) {
			var dt = $("<dl><dt><a href=\"###\">" + i + "</a></dt></dl>");
			for (var s = 1; s < 10; s++) {
				var sv = i + s;
				if(sv == bheight)
				{
					$(dt).append("<dd><a class=\"cur\" href=\"###\">" + sv + "</a></dd>");
				}else
				{
					$(dt).append("<dd><a href=\"###\">" + sv + "</a></dd>");
				}
			}
			$(height).append(dt);
		}
		$(height_content).append(height);
		$(id).append(height_content);
	}
	function initLocationInnerHTML(id) {
			  //location select_DQ
		var local_content = $("<div id=\"select_City\" class=\"select_City\"><input id=\"input_City\" class=\"input_City\" value=\"\u8bf7\u9009\u62e9\" /><label> \u7701 </label></div>");
		var local = $("<div id=\"city_List\" class=\"city_List clear\"><iframe frameborder=\"no\" class=\"city_Iframe\"></iframe><h2>选择省份</h2></div>");
		for (var i = 0; i < locationArray.length; i++) {
			var lp =null;
			if(i%3==0)
			{
				lp = $("<p class=\"line_xx\"></p>");
			}else
			{
				lp = $("<p></p>");
			}
			var locals = locationArray[i];
			for (var s = 0; s < locals.length; s++) {
				var ln = locals[s];
				if(ln[0] == province)
				{
					$(lp).append($($("<a class=\"cur\"></a>").text(ln[1])).attr("will", ln[0]));
				}else{
					$(lp).append($($("<a></a>").text(ln[1])).attr("will", ln[0]));
				}
			}
			$(local).append(lp);
		}
		$(local_content).append(local);
		$(id).append(local_content);
			  //location city
		var city_content = $("<div id=\"select_City2\" class=\"select_City2\"><input id=\"input_City2\" class=\"input_City2\" value=\"\u8bf7\u9009\u62e9\" /><label> 市（区） </label></div>");
		var city = $("<div id=\"city_List2\" class=\"city_List2 clear\"><iframe frameborder=\"no\" class=\"city2_Iframe clear\"></iframe><h2>选择市（区）</h2></div>");
		$(city_content).append(city);
		$(id).append(city_content);
	}
	function initLocalCity(will,w) {
		$("#city_List2 p").remove();
		$("#input_City2").val("\u8bf7\u9009\u62e9");
		var lp = $("<p></p>");
		var index = 0;
		for (var i in LOK[will]) {
			if (/00$/.test(i)) {
				continue;
			}
			index++;
			if(i == w)
			{
				$(lp).append($($("<a class=\"cur\" href=\"###\"></a>").text(LOK[will][i])).attr("will", i));
			}else{
				$(lp).append($($("<a href=\"###\"></a>").text(LOK[will][i])).attr("will", i));
			}
			$("#city_List2").append(lp);
		}
		$("#city_List2 a").click(function () {
			var thisVal = $(this).html();
			$("#input_City2").val(thisVal);
			$("#city_List2").hide();
			$("#city_List2 a").removeClass("cur");
			$(this).addClass("cur");
			$("#input_City2").attr("will", $(this).attr("will"));
			if ($("#input_City").val() == "\u8bf7\u9009\u62e9") {
				cityFocus();
			}
			$("#input_City2").blur();
		});
		$(".city2_Iframe").css("height",$(".city2_Iframe").parent().height()+25);
		$(".city2_Iframe").css("width",$(".city2_Iframe").parent().width());
	}
	if($(".select_SR").length > 0)
	{
		initBirthInnerHTML(".select_SR");
		if(byear>0)
		{
			$("#input_Year").val(byear);
			$("#input_Year").attr("will",byear);
		}
	    if(bmonth>0)
		{
			$("#input_Month").val(bmonth-10);
			$("#input_Month").attr("will",bmonth);
		}
		if(bday>0)
		{
			$("#input_Day").val(bday-bmonth*100);
			$("#input_Day").attr("will",bday);
		}
	}
	if($(".select_SG").length > 0)
	{
		initHeightInnerHTML(".select_SG");
	}
	if($(".select_DQ").length > 0)
	{
		initLocationInnerHTML(".select_DQ");

		if(province)
		{
			 initLocalCity(province,city);
			 $("#input_City").val(LSK[province]);
			 $("#input_City").attr("will",province);
			 $("#input_City2").val(LOK[province][city]);
			 $("#input_City2").attr("will",city);
		}
	}
	$("#input_Year").focus(yearFocus);
	$("#input_Month").focus(monthFocus);
	$("#input_Day").focus(dayFocus);
	$("#input_Height").focus(heightFocus);
	$("#input_City").focus(cityFocus);
	$("#input_City2").focus(city2Focus);
	
	$('#year_List h2,#month_List h2,#day_List h2,#height_List h2,#city_List h2,#city_List2 h2').click(function(){
		$('#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2').hide();
	});

	
	 var iscanclose =false;
	 $('#year_List,#input_Year,#month_List,#input_Month,#day_List,#input_Day,#height_List,#input_Height,#city_List,#input_City,#city_List2,#input_City2').hover(function(){
		iscanclose = false;
	 },function(){
		 iscanclose=true;
	 });
	 initEventAclick();
	 $(document).click(function(){
		if(iscanclose)
		{
			$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		}
	});

	function yearFocus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		$("#year_List").show();
	}
	function monthFocus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		$("#month_List").show();
		//检查年龄
		if(/\d{4}/.test($("#input_Year").val()))
		{
			if(sysy - $("#input_Year").val() ==18)
			{
				$("#month_List a").each(function(){
				       if($(this).text() > sysm-0)
					   {
						   $(this).hide();
					   }
				});
			}else
			{
				//补填月分
				if($("#month_List a:visible").length<12)
				{
					$("#month_List a").each(function(){
				           $(this).show();
					});
				}
			}
		}
	}
	function dayFocus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		var m = $("#input_Month").attr("will");
		var y = $("#input_Year").val();
		//var d = new Date(y+"/"+parseInt(m-9)+"/"+"0");
		var d = new Date(y, parseInt(m-10), 0);
		var index=1;
		$("#day_List a").each(function(){
			if(m>0)
			{
				$(this).attr("will",parseInt(m)*100+parseInt($(this).text()));
				if(sysy - y ==18 && (sysm-0) == $("#input_Month").val())
				{
					if($(this).text() > sysd-0)
					{
					   $(this).hide();
					}
				}else
				{
				   $(this).show();
				}
				if(index>d.getDate())
				{
				   $(this).hide();
				}
				index++;
			}else
			{
				$(this).hide();
			}
		});
		
		$("#day_List").show();
	}
	function heightFocus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		$("#height_List").show();
	}
	function cityFocus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		$("#city_List").show();
	}
	function city2Focus() {
		$("#year_List,#month_List,#day_List,#height_List,#city_List,#city_List2").hide();
		$("#city_List2").show();
	}
	function initEventAclick() {
		$("#year_List a").click(function () {
			var thisVal = $(this).html();
			$("#input_Year").val(thisVal);
			$("#year_List a").removeClass("cur");
			$(this).addClass("cur");
			$("#input_Year").attr("will",$(this).attr("will"));
			$("#year_List").hide();
			if ($("#input_Month").val() == "\u8bf7\u9009\u62e9") {
				monthFocus();
			} else {
				if ($("#input_Day").val() == "\u8bf7\u9009\u62e9") {
					dayFocus();
				}
			}
			$("#input_Year").blur();
		});
		$("#month_List a").click(function () {
			var thisVal = $(this).html();
			$("#input_Month").val(thisVal);
			$("#input_Month").attr("will",$(this).attr("will"));
			$("#month_List").hide();
			$("#month_List a").removeClass("cur");
			$(this).addClass("cur");
			if ($("#input_Year").val() == "\u8bf7\u9009\u62e9") {
				yearFocus();
			} else {
				if ($("#input_Day").val() == "\u8bf7\u9009\u62e9") {
					dayFocus();
				}else
				{
					//重置day
					var oldday = $("#input_Day").attr("will")+"";
					var newday = oldday.replace(/^\d{2}/,$(this).attr("will"));
					$("#input_Day").attr("will",newday);
				}
			}
			$("#input_Month").blur();
		});
		$("#day_List a").click(function () {
			var thisVal = $(this).html();
			$("#input_Day").val(thisVal);
			$("#input_Day").attr("will",$(this).attr("will"));
			$("#day_List").hide();
			$("#day_List a").removeClass("cur");
			$(this).addClass("cur");
			if ($("#input_Year").val() == "\u8bf7\u9009\u62e9") {
				yearFocus();
			} else {
				if ($("#input_Month").val() == "\u8bf7\u9009\u62e9") {
					monthFocus();
				}
			}
			$("#input_Day").blur();
		});
		$("#height_List a").click(function () {
			var thisVal = $(this).html();
			$("#input_Height").val(thisVal);
			$("#height_List").hide();
			$("#input_Height").blur();
			$("#height_List a").removeClass("cur");
			$(this).addClass("cur");
		});
		$("#city_List a").click(function () {
			var thisVal = $(this).html();
			$("#input_City").val(thisVal);
			$("#city_List").hide();
			var localId = $(this).attr("will");
			$("#city_List a").removeClass("cur");
			$(this).addClass("cur");
			$("#input_City").attr("will",localId);
			initLocalCity(localId,0);
			city2Focus();
			$("#input_City").blur();
		});
	}
});

})(jQuery);