function zc() {
	var sql = "insert into user(birthday_year,birthday_month,birthday_day,height,sex,mobile,password,create_time) values(1988,12,5,'"
			+ $('#height').val()
			+ "','"
			+ $('input[name="sex"]:checked').val()
			+ "','"
			+ $('#mobile').val()
			+ "','"
			+ $('#password').val()
			+ "',now())";
	$.ajax({
		url : '/bp/sql',
		type : 'post',
		async : false,
		dataType : 'json',
		data : {
			sql : sql
		},
		success : function(msg) {
			alert("注册成功");
		},
		error : function(msg) {
			alert(msg);
		}
	});
}
function test() {
	$.ajax({
		url : '/bp/redis/set',
		type : 'post',
		async : false,
		dataType : 'json',
		data : {
			key : "aa",
			content : "wenyf",
			seconds : 100
		},
		success : function(msg) {
			alert("注册成功");
		},
		error : function(msg) {
			alert(msg);
		}
	});
}
function test2() {
	$.ajax({
		url : '/bp/redis/get',
		type : 'post',
		async : false,
		dataType : 'text',
		data : {
			key : "aa"
		},
		success : function(msg) {
			alert(msg);
		},
		error : function(msg) {
			alert(msg);
		}
	});
}
$(function() {
	var sql="select password from user";
	$.ajax({
		url : '/bp/sql',
		type : 'post',
		async : false,
		dataType : 'json',
		data : {
			sql : sql
		},
		success : function(msg) {
			$.each(msg, function(index, o) {
				$('#password').val(o.password);
			});
		},
		error : function(msg) {
			alert(msg);
		}
	});
});