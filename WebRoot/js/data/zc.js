function zc() {
	var sql = "insert into user(mobile,password,create_time) values('"
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