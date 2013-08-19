/*
 * 焦点图js
 */
(function(){ //{{{

var isIE = (document.all) ? true : false;
var $$ = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};
var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}
var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}
var Each = function(list, fun){
	for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
};
//切换按钮设置
var accPanel = Class.create();
accPanel.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.arrNum = [];
		this.rvt = rvt;
		Each(this.rvt.List, function(v){
			this.Add(v);
		});
	},
	Add: function(v) {
		var i = this.arrNum.length;
		var li = document.createElement("div");
		var lli = document.createElement("div");
		var a = document.createElement("a");
		//var lit = document.createElement("div");
		//lit.innerHTML = v['text'];
		//lit.style.position = "relative";
		//li.appendChild(lit);
		li.appendChild(lli).appendChild(a);
		a.href = "###";
		a.innerHTML = v['text'];
		this.arrNum[i] = li;
		var rvt = this.rvt;
		li.onclick = function(){ rvt.StopOn(i) };
		li.onmouseout = function(){ rvt.Start() };
		this.obj.appendChild(li);
	},
	Show: function() {
		//按钮式
		var self = this;
		Each(this.arrNum, function(o){ 
			o.parentNode.removeChild(o);
		}); 
		Each(this.arrNum, function(o, i){ 
			if(i < self.rvt.Index) {
				self.obj.insertBefore(o, self.rvt.mainobj);
				o.className = "off"; 
			} else if(i > self.rvt.Index) {
				self.obj.appendChild(o);
				o.className = "off"; 
			} else {
				self.rvt.mainobj.appendChild(o);
				o.className = "on"; 
			}
		}); 
	}
};
// 缩略图列表
var accPic = Class.create();
accPic.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.arrPic = [];
		this.rvt = rvt;
		Each(this.rvt.List, function(v){
			this.Add(v);
		});
	},
	Add: function(v) {
		var i = this.arrPic.length;
		var img = document.createElement("img");
		img.src = v["img"]; img.alt = v["text"];
		this.arrPic[i] = img;
		var rvt = this.rvt;
		img.onmouseover = function(){ rvt.StopOn(i) };
		img.onmouseout = function(){ rvt.Start() };
		this.obj.appendChild(img);
	},
	Show: function() {
		//按钮式
		Each(this.arrPic, function(o){ o.className = "off"; }); this.arrPic[this.rvt.Index].className = "on";
	}
};
// 选择列表
var accSel = Class.create();
accSel.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.arrNum = [];
		this.rvt = rvt;
		Each(this.rvt.List, function(v){
			this.Add(v);
		});
	},
	Add: function(v) {
		if(this.arrNum.length < this.rvt.List.length/this.rvt.Number) {
			var li = document.createElement("li");
			var i = this.arrNum.length;
			this.arrNum[i] = li;
			i *= this.rvt.Number;
			var rvt = this.rvt;
			li.onmouseover = function(){ rvt.StopOn(i) };
			li.onmouseout = function(){ rvt.Start() };
			this.obj.appendChild(li);
		}
	},
	Show: function() {
		//按钮式
		Each(this.arrNum, function(o){ o.className = "off"; }); this.arrNum[this.rvt.Index/this.rvt.Number].className = "on";
	}
};
// 数字列表
var accNum = Class.create();
accNum.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.arrNum = [];
		this.rvt = rvt;
		Each(this.rvt.List, function(v){
			this.Add(v);
		});
	},
	Add: function(v) {
		var i = this.arrNum.length;
		var li = document.createElement("li");
		var a = document.createElement("a");
		li.appendChild(a);
		a.href = "###";
		a.innerHTML = i + 1;
		this.arrNum[i] = li;
		var rvt = this.rvt;
		li.onclick = function(){ rvt.StopOn(i) };
		li.onmouseout = function(){ rvt.Start() };
		this.obj.appendChild(li);
	},
	Show: function() {
		//按钮式
		Each(this.arrNum, function(o){ o.className = "off"; }); this.arrNum[this.rvt.Index].className = "on";
	}
};
// 文本列表
var accTextList = Class.create();
accTextList.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.arrPic = [];
		this.rvt = rvt;
		this.obj = this.obj.appendChild(document.createElement("ul"));
		Each(this.rvt.List, function(v){
			this.Add(v);
		});
	},
	Add: function(v) {
		var i = this.arrPic.length;
		var li = document.createElement("li");
		var a = document.createElement("a");
		li.appendChild(a);
		a.innerHTML = v["text"];
		a.href = "###";
		this.arrPic[i] = a;
		var rvt = this.rvt;
		a.hideFocus = "true";
		a.onmouseover = function() { rvt.StopOn(i) };
		li.onmouseout = function(){ rvt.Start() };
		this.obj.appendChild(li);
	},
	Show: function() {
		//按钮式
		Each(this.arrPic, function(o){ o.className = "off"; }); this.arrPic[this.rvt.Index].className = "on";
	}
};
// 单文本
var accText = Class.create();
accText.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		var a = document.createElement("a");
		a.target = "_blank";
		this.obj = this.obj.appendChild(a);
		this.rvt = rvt;
	},
	Add: function(v) {
	},
	Show: function() {
		this.obj.innerHTML = this.rvt.List[this.rvt.Index].text;
		if(this.rvt.List[this.rvt.Index].url)
			this.obj.href = this.rvt.List[this.rvt.Index].url;
		else
			this.obj.removeAttribute("href");
	}
};
// 单描述
var accDesc = Class.create();
accDesc.prototype = {
	initialize: function(id, rvt) {
		this.obj = $$(id);
		this.rvt = rvt;
	},
	Add: function(v) {
	},
	Show: function() {
		this.obj.innerHTML = this.rvt.List[this.rvt.Index].desc;
	}
};
// 左右按钮
var accSide = Class.create();
accSide.prototype = {
	initialize: function(id, rvt, type) {
		this.obj = $$(id);
		this.rvt = rvt;
		this.type = (type == 0) ? 0 : 1;
		var self = this;
		this.obj.onclick = function(){ 
			if(self.type == 0) {
				self.rvt.Index--;
				if(self.rvt.Index < 0) self.rvt.Index = 0;
			} else {
				self.rvt.Index++;
				if(self.rvt.Index + self.rvt.Number >= self.rvt.List.length) self.rvt.Index = self.rvt.List.length - self.rvt.Number;
				if(self.rvt.Index < 0) self.rvt.Index = 0;
			}
			rvt.Start();
		};
	},
	Add: function(v) {
	},
	Show: function() {
		if(this.type == 0) {
			this.obj.className = this.rvt.Index <= 0 ? "off" : "on";
		} else {
			this.obj.className = (this.rvt.Index + this.rvt.Number) >= this.rvt.List.length  ? "off" : "on";
		}
	}
};

//ie only
	//Accessory: accessory,
var RevealTrans = Class.create();
RevealTrans.prototype = {
  initialize: function(container, options, acc) {
	this.mainobj = $$(container);
	this.SetOptions(options);

	
	this._timer = null;//计时器
	this.Index = 0;//显示索引
	this._onIndex = -1;//当前索引
	
	
	this.Auto = !!this.options.Auto;
	this.runtimeAuto = this.Auto;
	this.Pause = Math.abs(this.options.Pause);
	this.Duration = Math.abs(this.options.Duration);
	this.Transition = parseInt(this.options.Transition);
	this.List = this.options.List;
	this.onShow = this.options.onShow;
	this.Number = this.options.Number;

	this._cache = {};
	this._img = [];
	this._a = [];
	this._t = [];
	for(var i = 0; i < this.Number; i++) {
		this._img.push(document.createElement("img"));
		this._a.push(document.createElement("a"));
		this._t.push(document.createTextNode(""));
	}
	// 初始化附件
	this.accList = [];
	if(acc) this.initAcc(acc);
	
	//初始化显示区域
	for(var i = 0; i < this.Number; i++) {
		this._img[i].style.visibility = "hidden";//第一次变换时不显示红x图
		//this._img[i].style.width = this._img[i].style.height = "100%"; this._img[i].style.border = 0;
		isIE && this.Transition > 0 && (this.mainobj.style.filter = "revealTrans()");
		
		this._a[i].target = "_blank";
		
		if(this.Number > 1) {
			var tmp = document.createElement("li");
			this._a[i].appendChild(this._img[i]);
			this._a[i].appendChild(document.createElement("br"));
			this._a[i].appendChild(this._t[i]);
			this.mainobj.appendChild(tmp).appendChild(this._a[i]);
		} else {
			this.mainobj.appendChild(this._a[i]).appendChild(this._img[i]);
		}
	}
	this.hiddenobj = document.createElement("div");
	this.hiddenobj.style.display = "none";
	this.mainobj.appendChild(this.hiddenobj);
  },
  cacheImg: function(img, list) {
  },
  initAcc: function(options) {
	  for(id in options) {
		  var o = null;
		  switch(options[id]) {
			  case 1: // 数字列表
			  o = new accNum(id, this);
			  break;
			  case 2: // 单文本
			  o = new accText(id, this);
			  break;
			  case 3: // 图片列表
			  o = new accPic(id, this);
			  break;
			  case 4: // 单描述
			  o = new accDesc(id, this);
			  break;
			  case 5: // 面板列表
			  o = new accPanel(id, this);
			  break;
			  case 6: // 文本列表
			  o = new accTextList(id, this);
			  break;
			  case 7: // 减按钮
			  o = new accSide(id, this, 0);
			  break;
			  case 8: // 加按钮
			  o = new accSide(id, this, 1);
			  break;
			  case 9: // 选择列表
			  o = new accSel(id, this);
			  break;
		  }
		  if(o) this.accList.push(o);
	  }
  },
  //设置默认属性
  SetOptions: function(options) {
	this.options = {//默认值
		Number:		1,//主图为几个
		Auto:		true,//是否自动切换
		Pause:		3000,//停顿时间(微妙)
		Duration:	1,//变换持续时间(秒)
		Transition:	23,//变换效果(23为随机), -1 为不使用
		List:		[],//数据集合,如果这里不设置可以用Add方法添加
		onShow:		function(){}//变换时执行
	};
	Extend(this.options, options || {});
  },
  Start: function(isTimer) {
	clearTimeout(this._timer);
	//如果没有数据就返回
	if(!this.List.length) return;
	//修正Index
	if(this.Index < 0 || this.Index >= this.List.length){ this.Index = 0; }
	//如果当前索引不是显示索引就设置显示
	if(this._onIndex != this.Index){ 
		this._onIndex = this.Index; 
		var show = true;
		if(isTimer && typeof jQuery != 'undefined') {
			var threshold = 0;
			var j_m = jQuery(this.mainobj), j_w = jQuery(window);
			var top = j_m.offset().top, 
			h = j_m.outerHeight(), 
			wh = j_w.height(), 
			scrollTop = j_w.scrollTop();
			show = (top + h + threshold > scrollTop && scrollTop + threshold + wh > top);
		}
		if(show) this.Show(); 
	}
	//如果要自动切换
	if(this.Auto && this.runtimeAuto) {
		this._timer = setTimeout(Bind(this, function(){ this.Index++; this.Start(true); }), this.Duration * 1000 + this.Pause);
	}
  },
  //显示
  Show: function() {
	if(isIE && this.Transition > 0){
		//设置变换参数
		for(var i = 0; i < this.Number; i++) {
			try{
				with(this.mainobj.filters.revealTrans){
					Transition = this.Transition; Duration = this.Duration; apply(); play();
				}
			} catch(e) {}
		}
	}
	for(var i = 0; i < this.Number; i++) {
		var thisindex = this.Index + i;
		if(thisindex < this.List.length) {
			var list = this.List[thisindex];
			//设置图片属性
			var url = list.img;
			if(typeof this._cache[list.img] == "undefined") {
				var img = this._img[i].cloneNode(true);
				img.src = list.img;
				img.alt = list.text;
				img.onmouseover = Bind(this, this.Stop);
				img.onmouseout = Bind(this, this.Start);
				this._cache[list.img] = img;
			}
			//TODO node not exist
			var node = this._a[i].firstChild;
			if(node == this._img[i]) {
				this._a[i].replaceChild(this._cache[list.img], this._img[i]);
			} else {
				this._a[i].insertBefore(this._cache[list.img], node);
			}
			this._img[i] = this._cache[list.img];
			//this.hiddenobj.appendChild(this._cache[url]);
			this._img[i].style.visibility = "";
			//设置链接
			!!list["url"] ? (this._a[i].href = list["url"]) : this._a[i].removeAttribute("href");
			//@by ljf 增加焦点图统计
			this._a[i].setAttribute("onmousedown", "javascript:send_jy_pv2('"+list["total"]+"');");	//获取点击统计
			this._a[i].clickid = thisindex;
			this._t[i].data = list.text;
		} else {
			this._img[i].style.visibility = "hidden";
			this._a[i].removeAttribute("href");
		}
	}
	// 附件显示
	Each(this.accList, function(o){ o.Show(); });
	//附加函数
	this.onShow();
  },
  //添加变换对象
  Add: function(sIimg, sUrl, sText, sTotal, sDesc) {
	this.List.push({ img: sIimg, text: sText, url: sUrl, total: sTotal, desc: sDesc });
	// 附件添加
	Each(this.accList, function(o){ o.Add({ img: sIimg, text: sText, url: sUrl, total: sTotal, desc: sDesc  }); });
  },
  //停止
  Stop: function() {
	clearTimeout(this._timer);
  },
  StopOn: function(i) {
	  this.runtimeAuto = false;
	  this.Index = i;
	  this.Start();
	  this.runtimeAuto = true;
  }
};
window.RevealTrans = RevealTrans;
})();//}}}
