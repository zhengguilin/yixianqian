function head_login_save_me(B) {
	if (B.checked == true) {
		var A = false;
		A = confirm("\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u4e0d\u8981\u5728\u7f51\u5427\u7b49\u516c\u7528\u7535\u8111\u4e0a\u4f7f\u7528\u6b64\u529f\u80fd\uff01\n\u624b\u52a8\u9000\u51fa\u540e\uff0c\u6b64\u529f\u80fd\u81ea\u52a8\u5931\u6548\u3002");
		if (A) {
			B.checked = true;
		} else {
			B.checked = false;

		}
		return false;
	}
}

if (typeof window.JY != "object") {
	window.JY = {};
}

if (typeof window.JY.DEFINED == "undefined") {
	(function() {
		var A = window.JY;
		A.$ = function(B) {
			return "string" == typeof B ? document.getElementById(B) : B;
		};
		A.wr = function() {
			var B = [], D = arguments.length;
			for ( var C = 0; C < D; C++) {
				B.push(arguments[C]);
			}
			if (D) {
				document.write(B.join(""));
			}
		};
		A.importJs = function() {
		};
		A.DEFINED = 1;
	}());
}
if (typeof window.JY != "object") {
	window.JY = {};
}
if (typeof window.JY.tool != "object") {
	window.JY.tool = {};
}
if (typeof window.JY.tool.cookie != "object"
		|| typeof window.JY.tool.cookie.DEFINED == "undefined") {
	window.JY.tool.cookie = {
		set : function(C, E, A, F, D) {
			if (typeof A != "undefined" && !isNaN(parseInt(A))) {
				var B = new Date(new Date().getTime() + 60 * 1000 * parseInt(A));
			}
			document.cookie = C + "=" + escape(E)
					+ ((B) ? "; expires=" + B.toGMTString() : "")
					+ ((F) ? "; path=" + F : "; path=/")
					+ ((D) ? ";domain=" + D : "");
		},
		get : function(B) {
			var A = document.cookie.match(new RegExp("(^| )" + B
					+ "=([^;]*)(;|$)"));
			if (A != null) {
				return unescape(A[2]);
			}
			return null;
		},
		clear : function(A, C, B) {
			if (this.get(A)) {
				document.cookie = A + "=" + ((C) ? "; path=" + C : "; path=/")
						+ ((B) ? "; domain=" + B : "")
						+ ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}
		},
		unCharCode : function(C) {
			if (typeof C != "string" || C.length < 6) {
				return C;
			}
			if (!/&#\d{3,3};/.test(C)) {
				return C;
			}
			var A, B = [];
			for (A = 5; A < C.length; A++) {
				if (C.charAt(A) == ";" && C.charAt(A - 5) == "&"
						&& C.charAt(A - 4) == "#") {
					B.push([ C.substr(A - 5, 6),
							String.fromCharCode(C.substr(A - 3, 3)) ]);
				}
			}
			for ( var A in B) {
				C = C.replace(B[A][0], B[A][1]);
			}
			return C;
		}
	};
	JY.tool.cookie.DEFINED = 1;
}
if (typeof window.JY != "object") {
	window.JY = {};
}
if (typeof window.JY.url != "object"
		|| typeof window.JY.url.DEFINED == "undefined") {
	(function() {
		window.JY.url = {};
		var _this = window.JY.url;
		var testDH = String.fromCharCode(109, 105, 117, 117), testDF = String
				.fromCharCode(99, 110);
		_this.parse = function(href) {
			href = typeof href == "string" ? href : location.href;
			_this.href = href;
			var hrefArr = _this.href.match(/http[s]?:\/\/([^\/]+)/);
			if (!hrefArr) {
				var eMsg = "url:\u9875\u9762\u5730\u5740\u4fe1\u606f\u4e0d\u6b63\u786e";
				if (typeof JY_JSLIB_DEBUG == "number" && JY_JSLIB_DEBUG) {
					alert(eMsg);
				}
				if (typeof JY_JSLIB_MSG == "string") {
					JY_JSLIB_MSG += eMsg + "\n";
				}
			}
			_this.host = hrefArr[1] ? hrefArr[1] : location.hostname;
			_this.path = _this.href.replace(hrefArr[0], "");
			_this.domain = _this.host;
		};
		_this.parse(location.href);
		_this.getSiteInfo = function() {
			eval("var siteMap={'msn.':[1,'msn'], 'sina.':[7,'sina'], '"
					+ testDH + ".':[100,'test'], 'jiayuan.com':[0,'www']}");
			var siteNum, siteName, siteDomain, topDomain;
			for ( var i in siteMap) {
				if (_this.host.indexOf(i) >= 0) {
					siteNum = siteMap[i][0];
					siteName = siteMap[i][1];
					break;
				}
			}
			if (typeof siteNum != "number") {
				siteNum = -1;
				siteName = "unknown";
			}
			if (siteNum == 0) {
				siteDomain = "www.jiayuan.com";
				topDomain = "jiayuan.com"
			} else {
				if (siteNum == 100) {
					siteDomain = "www." + testDH + "." + testDF;
					topDomain = testDH + "." + testDF
				} else {
					siteDomain = topDomain = _this.domain;
				}
			}
			return {
				num : siteNum,
				name : siteName,
				domain : siteDomain,
				topDomain : topDomain
			};
		};
		_this.getSiteHome = function() {
			var siteInfo = _this.getSiteInfo();
			return "http://" + siteInfo.domain + "/";
		};
		_this.getQueryValue = function(name) {
			if (_this.href.indexOf("?") == -1
					|| _this.href.indexOf(name + "=") == -1) {
				return "";
			}
			var queryString = _this.href.substring(_this.href.indexOf("?") + 1);
			var parameters = queryString.split("&");
			var pos, paraName, paraValue;
			for ( var i = 0; i < parameters.length; i++) {
				pos = parameters[i].indexOf("=");
				if (pos == -1) {
					continue;
				}
				paraName = parameters[i].substring(0, pos);
				paraValue = parameters[i].substring(pos + 1);
				if (paraName == name) {
					return unescape(paraValue.replace(/\+/g, " "));
				}
			}
			return "";
		};
		_this.getChannelList = function() {
			return [ "index", "usercp", "search", "online", "party", "article",
					"story", "newmember", "paper", "master", "profile",
					"topics", "vip", "photo", "news", "notices", "about",
					"guard", "brightlist", "tv" ];
		};
		_this.getDomainChannelMap = function() {
			return {
				search : "search",
				usercp : "usercp",
				online : "online",
				party : "party",
				diary : "article",
				love : "story",
				my : "profile",
				profile : "profile",
				photo : "photo"
			};
		};
		_this.getDirChannelMap = function() {
			return {
				usercp : "usercp",
				msg : "usercp",
				search : "search",
				newmember : "newmember",
				online : "online",
				party : "party",
				article : "article",
				story : "story",
				paper : "paper",
				ques : "paper",
				yiyuntest : "paper",
				master : "master",
				news : "news",
				gonggao : "notices",
				profile : "profile",
				parties : "topics",
				vip : "vip",
				bottom : "about",
				guard : "guard"
			};
		};
		_this.getPathChannelMap = function() {
			return {
				"brightlist_new.php" : "brightlist",
				"parties/2010/all_videos" : "tv"
			};
		};
		_this.getChannel = function() {
			var domainChannelMap = _this.getDomainChannelMap(), dirChannelMap = _this
					.getDirChannelMap(), pathChannelMap = _this
					.getPathChannelMap();
			var channel = "";
			var queryChal = _this.getQueryValue("channel");
			if (queryChal) {
				var channelLt = _this.getChannelList();
				for (chal in channelLt) {
					if (queryChal == chal) {
						return chal;
					}
				}
			}
			var siteInfo = _this.getSiteInfo();
			if (siteInfo.num == 0 || siteInfo.num == 100) {
				for (k in domainChannelMap) {
					if (_this.host.indexOf(k) >= 0) {
						channel = domainChannelMap[k];
						break;
					}
				}
			} else {
				if (siteInfo.num == -1) {
					return "unknown";
				}
			}
			if (!channel && _this.path) {
				for (k in pathChannelMap) {
					if (_this.path.indexOf(k) >= 0) {
						channel = pathChannelMap[k];
						break;
					}
				}
			}
			if (!channel && _this.path) {
				var dirs = _this.path.split("/");
				var firstDir = dirs[0] ? dirs[0] : dirs[1];
				for (k in dirChannelMap) {
					if (firstDir.indexOf(k) == 0) {
						channel = dirChannelMap[k];
						break;
					}
				}
				if (!channel) {
					var pos, pos1 = firstDir.indexOf("?");
					pos2 = firstDir.indexOf("#");
					if (pos1 < 0 && pos2 < 0) {
						pos = -1;
					} else {
						if (pos1 >= 0 && pos2 >= 0) {
							pos = pos1 < pos2 ? pos1 : pos2;
						} else {
							pos = pos1 > 0 ? pos1 : pos2;
						}
					}
					if (pos == 0) {
						return "index";
					}
					if (pos > 0 && /^\d{6,9}$/.test(firstDir.substr(0, pos))) {
						return "profile";
					}
					if (pos < 0 && /^\d{6,9}$/.test(firstDir)) {
						return "profile";
					}
				}
			}
			return channel ? channel : "index";
		};
		_this.getChannelUrl = function(chanl) {
			var siteInfo = _this.getSiteInfo(), siteHome = _this.getSiteHome(), domainMap = _this
					.getDomainChannelMap();
			if (chanl == "index") {
				return siteHome;
			}
			if (siteInfo.num == 0 || siteInfo.num == 100) {
				for (k in domainMap) {
					if (domainMap[k] == chanl) {
						return "http://" + k + "." + siteInfo.topDomain + "/";
					}
				}
			}
			var pathMap = _this.getPathChannelMap(), path;
			for (k in pathMap) {
				if (pathMap[k] == chanl) {
					path = k;
					break;
				}
			}
			if (typeof path == "string") {
				return siteHome + path;
			}
			var dirMap = _this.getDirChannelMap(), dir;
			for (k in dirMap) {
				if (dirMap[k] == chanl) {
					dir = k;
					break;
				}
			}
			if (typeof dir == "string") {
				return siteHome + dir + "/";
			}
			return siteHome;
		};
		_this.getImgBaseUrl = function() {
			var root, bUrl = {}, siteInfo = _this.getSiteInfo();
			if (siteInfo.num == 100) {
				root = "http://images." + siteInfo.topDomain + "/";
			} else {
				root = "http://images1.jyimg.com/";
			}
			bUrl.www = root + "w4/";
			bUrl.sina = root + "s4/";
			bUrl.msn = root + "m4/";
			bUrl.test = "http://images1." + testDH + "." + testDF + "/w4/";
			bUrl.unknown = root + "w4/";
			bUrl[0] = bUrl[siteInfo.name];
			return bUrl;
		};
		_this.getCssBaseUrl = function() {
			return _this.getImgBaseUrl();
		};
		_this.getJsBaseUrl = function() {
			return _this.getImgBaseUrl();
		};
		_this.DEFINED = 1;
	}());
}
if (typeof window.JY != "object") {
	window.JY = {};
}
if (typeof window.JY.login != "object"
		|| typeof window.JY.login.DEFINED == "undefined") {
	if (!JY.DEFINED) {
		var eMsg = "JY.login:\u4f9d\u8d56\u4e8eJY\u5bf9\u8c61\uff0c\u4f46JY\u672a\u5b9a\u4e49";
		if (typeof JY_JSLIB_DEBUG == "number" && JY_JSLIB_DEBUG) {
			alert(eMsg);
		}
		if (typeof JY_JSLIB_MSG == "string") {
			JY_JSLIB_MSG += eMsg + "\n";
		}
	}
	if (typeof JY.url != "object" || !JY.url.DEFINED) {
		var eMsg = "JY.login:\u4f9d\u8d56\u4e8eJY.url\u5bf9\u8c61\uff0c\u4f46JY.url\u672a\u5b9a\u4e49";
		if (typeof JY_JSLIB_DEBUG == "number" && JY_JSLIB_DEBUG) {
			alert(eMsg);
		}
		if (typeof JY_JSLIB_MSG == "string") {
			JY_JSLIB_MSG += eMsg + "\n";
		}
	}
	if (typeof JY.tool.cookie != "object" || !JY.tool.cookie.DEFINED) {
		var eMsg = "JY.login:\u4f9d\u8d56\u4e8eJY.tool.cookie\u5bf9\u8c61\uff0c\u4f46JY.tool.cookie\u672a\u5b9a\u4e49";
		if (typeof JY_JSLIB_DEBUG == "number" && JY_JSLIB_DEBUG) {
			alert(eMsg);
		}
		if (typeof JY_JSLIB_MSG == "string") {
			JY_JSLIB_MSG += eMsg + "\n";
		}
	}
	(function() {
		window.JY.login = {};
		var _this = window.JY.login;
		_this.user = {
			uid : 0
		};
		_this.lastAliveTime = 0;
		_this.hiddenFrameId = "hder_hid_login_win";
		_this.formId;
		_this.frameStatus = 1;
		_this._submitCallback;
		_this._popCallback;
		_this._logoutCallback;
		_this._aliveCallback;
		_this.loginWin = null;
		_this.tryTimes = 0;
		var channel = JY.url.getChannel();
		if (/msn|miuu|xique|51liehun/.test(location.host)) {
			_this.loginUrl = "/login/dologin.php?new_header=1&host="
					+ location.host + "&channel=" + channel;
		} else {
			_this.loginUrl = "http://passport.jiayuan.com/dologin.php?host="
					+ location.host + "&new_header=1&channel=" + channel;
		}
		_this.popUrl = "/login/popup_v2.php?method=popup_v2&channel=" + channel;
		_this.logoutUrl = "/login/logout.php?new_header=1&channel=" + channel;
		_this.aliveUrl = "/login/user_status.php?channel=" + channel;
		_this.tips = {
			inputNull : "\u8bf7\u8f93\u5165\u767b\u5f55\u5e10\u53f7\u548c\u5bc6\u7801",
			inputIdErr : "\u767b\u5f55\u5e10\u53f7\u8f93\u5165\u9519\u8bef\uff01\n\n\u767b\u5f55\u5e10\u53f7\u53ef\u4ee5\u4e3a\u6ce8\u518c\u90ae\u7bb1\u3001\u5df2\u901a\u8fc7\u9a8c\u8bc1\u7684\u624b\u673a\u53f7\u6216\u60a8\u7684\u4f73\u7f18ID",
			inputPwNull : "\u8bf7\u586b\u5199\u60a8\u7684\u767b\u5f55\u5bc6\u7801"
		};
		if (typeof JY.login.autoLogin != "function") {
			JY.login.autoLogin = function() {
				var u = JY.login.getUser();
				if (typeof u != "undefined" && typeof u.uid != "undefined"
						&& /\d{7,9}/.test(u.uid)) {
					return false;
				}
				var upt = JY.tool.cookie.get("upt");
				var name = JY.tool.cookie.get("save_jy_login_name");
				if (null != upt && null != name) {
					var form = JY.$("hder_login_form");
					form.name.value = name;
					form.password.value = upt;
					JY.login.loginUrl_bak = JY.login.loginUrl;
					JY.login.loginUrl += "&upt=" + upt;
					JY.login.submit(form, function(user) {
						JY.login.loginUrl = JY.login.loginUrl_bak;
						form.password.value = "";
						if (typeof user == "object") {
							if (user.errno == -5) {
								location.href = user.url;
								return false;
							}
							if (user.type == 20) {
								location.href = user.url;
								return true;
							}
							location.href = "/usercp/?from=autologin";
						}
					});
				}
			};
			window.setTimeout(function() {
				JY.login.autoLogin();
			}, 2000);
		}
		if (typeof JY.login.setCookieToReg != "function") {
			JY.login.setCookieToReg = function() {
				var u = JY.login.getUser();
				if (typeof u != "undefined" && typeof u.uid != "undefined"
						&& /\d{7,9}/.test(u.uid)) {
					return false;
				}
				var r = /((^https?\:\/\/)?(jiayuan|love21cn)\.(msn|jiayuan)\.(com|cn|com\.cn))|((^\w.+)\.((jiayuan|miuu)\.(com|cn)))/;
				//var rr = /^(https?:\/\/)?([\da-zA-Z-]+)\.([\da-zA-Z-\.]+)([\/\w \.-\?]*)*\/?$/;
				var rrr = /^https?\:\/\/([\da-zA-Z-]+)\.miuu\.cn/;
				var refer = document.referrer;
				var inhref = location.href;
				var domain = "";
				if (rrr.test(inhref)) {
					domain = "miuu.cn";
				} else {
					domain = "jiayuan.com";
				}
				if (refer != "" && !r.test(refer)) {
					var url = "http://reg." + domain
							+ "/regsetcookie.php?out_referer=" + refer
							+ "&inner_host=" + inhref;
					JY.login.acrossCookie({
						acrossurl : url
					});
				}
			};
			window.setTimeout(function() {
				JY.login.setCookieToReg();
			}, 1000);
		}
		_this.acrossCookie = function(data) {
			if (typeof data.acrossurl != "undefined") {
				var urls = data.acrossurl;
				if (typeof urls == "string") {
					urls = [ urls ];
				}
				for ( var i = 0; i < urls.length; i++) {
					_this.scriptTag({
						url : _this.filterUrl(urls[i])
					});
				}
			}
		};
		_this.scriptTag = function(s) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset) {
				script.charset = s.scriptCharset;
			}
			var done = false;
			script.onload = script.onreadystatechange = function() {
				if (!done
						&& (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					done = true;
					head.removeChild(script);
				}
			};
			head.appendChild(script);
		};
		_this.checkForm = function(name, pw) {
			var mobileRe = /^1[358]\d{9}$/gi, uidRe = /^\d{7,9}$/gi;
			if (!name) {
				alert(_this.tips.inputNull);
				return false;
			}
			if ((!/^\d+$/.test(name) && !(name.indexOf("@") > -1 && name
					.indexOf(".") > -1))
					|| (/^\d+$/.test(name) && !mobileRe.test(name) && !uidRe
							.test(name))) {
				alert(_this.tips.inputIdErr);
				return false;
			}
			if (pw.length == 0) {
				alert(_this.tips.inputPwNull);
				return false;
			}
			return true;
		};
		_this.frameLoadCallback = function(json) {
			var logWin = JY.$(JY.login.hiddenFrameId), response = "";
			if (json) {
				response = json;
			} else {
				try {
					response = logWin.contentWindow.document.body.innerHTML;
				} catch (e) {
					location.reload();
				}
			}
			if (response != "" && response.length < 6000) {
				pos1 = response.indexOf("{");
				pos2 = response.lastIndexOf("}");
				if (pos1 >= 0 && pos2 > 0) {
					response = response.substring(pos1, pos2 + 1);
				} else {
					response = "{}";
				}
				var result = {}, param = {};
				response = response.replace(/\r/g, "").replace(/\n/g, "");
				try {
					eval("result=" + response);
				} catch (e) {
				}
				if (_this.frameStatus == 1) {
					var user = result;
					if (user.uid < 1) {
						param.uid = 0;
						if (++_this.tryTimes > 3) {
							location.href = JY.url.getSiteHome()
									+ "login/index.php?pre_url=" + JY.url.href;
							return false;
						}
					} else {
						param.uid = user.uid;
						param.sex = user.sex;
						param.nickname = JY.tool.cookie
								.unCharCode(decodeURIComponent(user.nickname));
						param.age = user.age;
						param.work_location = user.work_location;
						param.work_sublocation = user.work_sublocation;
						try {
							_this.acrossCookie(user);
						} catch (e) {
						}
						_this.user = param;
					}
					param.type = user.type ? user.type : 0;
					param.errno = user.err_type ? user.err_type : 0;
					param.url = _this.filterUrl(user.url);
					_this.lastAliveTime = (new Date).getTime();
					window.setTimeout(function() {
						_this._submitCallback(param);
					}, 1000);
				} else {
					if (_this.frameStatus == 2) {
						var popInfo = result;
						if (decodeURIComponent(popInfo.title).indexOf(
								"\u4f73\u7f18\u684c\u9762") >= 0) {
							if (!GetPcClient()) {
								document
										.getElementById("header_login_pop_mask").style.display = "block";
								document.getElementById("layerTable").style.display = "block";
							} else {
								hidelayerTable(0);
							}
						} else {
							if (popInfo.title) {
								param.title = JY.tool.cookie
										.unCharCode(decodeURIComponent(popInfo.title));
								param.content = JY.tool.cookie
										.unCharCode(decodeURIComponent(popInfo.content));
								param.detailUrl = _this
										.filterUrl(popInfo.btnurl);
								param.buttonName = JY.tool.cookie
										.unCharCode(decodeURIComponent(popInfo.btnname));
								param.jumpUrl = _this
										.filterUrl(popInfo.close_url);
								param.pvImg = _this.filterUrl(popInfo.simg);
							} else {
								param = {
									title : "",
									content : "",
									jumpUrl : ""
								};
							}
							_this._popCallback(param);
						}
					} else {
						if (_this.frameStatus == 3) {
							_this.user = {
								uid : 0
							};
							_this._logoutCallback(true);
						} else {
							if (_this.frameStatus == 4) {
								var aliveInfo = result;
								if (aliveInfo.uid < 1) {
									_this.user = {
										uid : 0
									};
								} else {
									if (_this.user.uid < 1) {
										_this.user.uid = aliveInfo.uid;
										_this.user.sex = aliveInfo.sex;
										_this.user.nickname = aliveInfo.nickname;
										_this.user.age = aliveInfo.age;
										_this.user.work_location = aliveInfo.work_location;
										_this.user.work_sublocation = aliveInfo.work_sublocation;
									}
								}
								_this.lastAliveTime = (new Date).getTime();
								if (typeof _this._aliveCallback == "function") {
									_this._aliveCallback(_this.user);
								}
							} else {
								return false;
							}
						}
					}
				}
			}
		};
		_this.getHiddenFrame = function() {
			if (_this.loginWin == null) {
				_this.loginWin = JY.$(_this.hiddenFrameId);
			}
			if (_this.loginWin == null) {
				var div = document.createElement("div");
				div.id = "JY_login_frame_container";
				div.style.display = "none";
				document.body.appendChild(div);
				var frameHtml = '<iframe name="' + _this.hiddenFrameId
						+ '" id="' + _this.hiddenFrameId + '" ';
				frameHtml += 'width=0 height=0 style="display:none;" onload="JY.login.frameLoadCallback()"></iframe>';
				div.innerHTML = frameHtml;
				_this.loginWin = JY.$(_this.hiddenFrameId);
			}
			return _this.loginWin;
		};
		_this.submit = function(formObj, callback) {
			if (typeof formObj != "object" || formObj.tagName != "FORM") {
				alert("\u8bf7\u4f20\u9012\u8868\u5355\u5bf9\u8c61");
				return false;
			}
			if (typeof callback == "function") {
				_this._submitCallback = callback;
			} else {
				alert("\u8bf7\u63d0\u4f9b\u767b\u5f55\u8fd4\u56de\u540e\u7684\u8c03\u7528\u51fd\u6570");
				return false;
			}
			var name = formObj.name.value, pw = formObj.password.value;
			if (!_this.checkForm(name, pw)) {
				return false;
			}
			_this.formId = formObj.id;
			if (_this.getHiddenFrame() == null) {
				alert("\u521b\u5efa\u767b\u5f55FRAME\u5931\u8d25");
				return false;
			}
			_this.frameStatus = 1;
			formObj.target = _this.hiddenFrameId;
			formObj.action = _this.loginUrl;
			formObj.method = "post";
			formObj.submit();
			return true;
		};
		_this.getPopInfo = function(callback) {
			if (typeof callback == "function") {
				_this._popCallback = callback;
			} else {
				alert("\u8bf7\u63d0\u4f9b\u5f39\u51fa\u4fe1\u606f\u56de\u8c03\u51fd\u6570");
				return false;
			}
			var logWin = _this.getHiddenFrame();
			if (logWin == null) {
				alert("\u521b\u5efa\u767b\u5f55FRAME\u5931\u8d25");
				return false;
			}
			_this.frameStatus = 2;
			if (logWin.addEventListener) {
				logWin.addEventListener("load", function() {
					JY.login.frameLoadCallback();
				}, false);
			} else {
				if (logWin.attachEvent) {
					logWin.attachEvent("onload", function() {
						JY.login.frameLoadCallback();
					});
				} else {
					logWin.onload = function() {
						JY.login.frameLoadCallback();
					};
				}
			}
			logWin.src = _this.popUrl;
			return true;
		};
		_this.logout = function(callback) {
			if (typeof callback == "function") {
				_this._logoutCallback = callback;
			} else {
				alert("\u8bf7\u63d0\u4f9b\u767b\u51fa\u56de\u8c03\u51fd\u6570");
				return false;
			}
			var logWin = _this.getHiddenFrame();
			if (logWin == null) {
				alert("\u521b\u5efa\u767b\u5f55FRAME\u5931\u8d25");
				return false;
			}
			_this.frameStatus = 3;
			logWin.src = _this.logoutUrl;
			return true;
		};
		_this.alive = function(callback) {
			if (typeof callback == "function") {
				_this._aliveCallback = callback;
			}
			var logWin = _this.getHiddenFrame();
			if (logWin == null) {
				alert("\u521b\u5efa\u767b\u5f55FRAME\u5931\u8d25");
				return false;
			}
			_this.frameStatus = 4;
			logWin.src = _this.aliveUrl;
			return true;
		};
		_this.getUser = function() {
			var profile = JY.tool.cookie.get("PROFILE");
			if (profile && profile.length > 10) {
				var arr = profile.split(":");
				if (/^\d{7,10}$/.test(arr[0])) {
					_this.user.uid = arr[0];
				}
				_this.user.nickname = JY.tool.cookie
						.unCharCode(decodeURIComponent(arr[1]));
				_this.user.sex = arr[2];
				_this.user.avatar = (arr[5] == 1) ? "http://" + arr[3]
						+ "/avatar.jpg" : arr[7];
				_this.user.certify = arr[5];
				var loc = JY.tool.cookie.get("myloc");
				if (loc && loc.length > 3) {
					loc = loc.split("|");
					_this.user.work_location = loc[0];
					_this.user.work_sublocation = loc[1];
				}
			}
			if (_this.user.uid > 0) {
				var time = JY.tool.cookie.get("last_login_time");
				if (time > 0) {
					_this.lastAliveTime = time * 1000;
				}
				if ((new Date).getTime() - _this.lastAliveTime > 3600000) {
				}
			}
			return _this.user;
		};
		_this.filterUrl = function(url) {
			if (!url) {
				return "";
			}
			url = decodeURIComponent(url);
			return url.replace(/&amp;/g, "&");
		};
		function GetPcClient() {
			try {
				//var obj = new ActiveXObject("Jyclient.msgr");
				return true;
			} catch (e) {
			}
			if (!navigator.mimeTypes) {
				return false;
			}
			var i;
			for (i = 0; i < navigator.mimeTypes.length; i++) {
				if (navigator.mimeTypes[i].type == "application/x-jymsgr") {
					return true;
				}
			}
			return false;
		}
		document
				.write('<!--\u4f73\u7f18\u684c\u9762\u5f39\u5c42\u5f00\u59cb--><link href="http://images1.jyimg.com/w4/nm/c/layer.css" rel="stylesheet" type="text/css" />');
		document
				.write('<script src="http://images1.jyimg.com/w4/webim/client/clickonce/js/clickonce.js" type="text/javascript"><\/script>');
		document
				.write('<div class="layerTable" id="layerTable" style="display:none;"><div class="layerTableTop"><a href="javascript:hidelayerTable(0)" class="layerTableClose"></a></div><div class="layerTableBody"><table border="0" cellspacing="0" cellpadding="0"><tr><td><a href="javascript:hidelayerTable(2)" class="layerTableButton"></a></td><td><a href="javascript:hidelayerTable(1)" class="layerTableLink">\u67e5\u770b\u8be6\u60c5</a></td><td><a href="javascript:hidelayerTable(0)" class="layerTableLink">\u4ee5\u540e\u518d\u8bf4</a></td></tr></table></div></div><script type="text/javascript">function hidelayerTable(butt){document.getElementById("layerTable").style.display="none";document.getElementById("header_login_pop_mask").style.display="none";location.href=JY.url.getChannelUrl("usercp");if(butt==1){window.open("http://webim.jiayuan.com/client/download.php");}if(butt==2){NavigateTo("jiayuan.com");}}<\/script><!--\u4f73\u7f18\u684c\u9762\u5f39\u5c42\u7ed3\u675f-->');
		_this.DEFINED = 1;
	}());
};