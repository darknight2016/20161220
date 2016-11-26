window.onload = function(){
	// 飘雪功能
	// 变量声明
	var div = document.getElementById('div');
	var oSnows = [];
	// var oBody = document.getElementsByTagName('body')[0];
	var WIDTH = document.documentElement.clientWidth;
	// console.log(WIDTH);
	var HEIGHT = document.documentElement.clientHeight;
	console.log(HEIGHT);



	// 函数声明
	// 雪花构造函数
	var Snow = function(){
		var snow = document.createElement('div');
		snow.className = 'snow';
		document.getElementsByTagName('body')[0].appendChild(snow);
		this.node = snow;
		this.x = random(0,WIDTH);
		this.y = 0;
		this.r = random(0,20);
		this.vx = random(-2,2);
		this.vy = random(3,10);
		// this.vr = 0.1;
	};

	// 添加雪花函数
	var addSnow = function(){
		var _snow = new Snow();
		oSnows.push(_snow);
	};

	// 随机函数
	var random = function(a,b){
		return a + Math.random() * (b - a);
	};

	// 渲染雪花函数
	var renderSnow = function(obj){
		var node = obj.node;
		with(node.style){
			position = 'absolute';
			left = obj.x + 'px';
			top = obj.y + 'px';
			width = obj.r + 'px';
			height = obj.r + 'px';
		}
		// console.log(node);
	}

	// 更新雪花函数
	var upDateSnow = function(){
		var n = 0;
		for(var j = 0;j < oSnows.length;j++){
			if(oSnows[j].y < HEIGHT){
				oSnows[n] = oSnows[j];
				oSnows[n].x += oSnows[n].vx;
				oSnows[n].y += oSnows[n].vy;
				oSnows[n].r += 0.1;
				n++;
			}
		}
		console.log(n);
		oSnows.length = n;
	};


	console.log(random(1,10));
	var t = setInterval(function(){
		addSnow();
		for(var i = 0;i < oSnows.length;i++){
			renderSnow(oSnows[i]);
		}
		
		upDateSnow();
	},100);



	// 按钮控制
	var oCount = document.getElementById('count');
	var aSpan = oCount.getElementsByTagName('span');
	var oldDate = new Date(2014,7,9,18,0,0,0);
	// var newDate = new Date();
	// console.log(newDate - oldDate);
	var writeTime = function(){
		var _now,
		_ms,
		_rest,
		_time = [];

		_now = new Date();
		_ms = _now - oldDate;
		_time.push(Math.floor(_ms / (1000 * 60 * 60 * 24)));
		_rest = _ms % (1000 * 60 * 60 * 24);
		_time.push(Math.floor(_rest / (1000 * 60 * 60)));
		_rest = _rest % (1000 * 60 * 60);
		_time.push(Math.floor(_rest / (1000 * 60)));
		_rest = _rest % (1000 * 60);
		_time.push(Math.floor(_rest / 1000));
		
		for(var i = 0;i < aSpan.length;i++){
			aSpan[i].innerHTML = _time[i];
		}
	};
	var t = setInterval(writeTime,1000);

	var slideIn = function(obj,callback,obj2){
		obj.style.left = '-1000px';
		var t = setInterval(function(){
			if(parseInt(obj.style.left) != 0){
				obj.style.left = parseInt(obj.style.left) + 100 + 'px';
				console.log(parseInt(obj.style.left));
			}else{
				clearInterval(t);
				callback && callback(obj2);
			}
		},30);
	}

	var slideOut = function(obj,callback,obj2){
		obj.style.left = '0px';
		console.log(obj.offsetLeft);
		var t = setInterval(function(){
			if(parseInt(obj.style.left) != 1000){
				obj.style.left = parseInt(obj.style.left) + 100 + 'px';
				console.log(parseInt(obj.style.left));
			}else{
				clearInterval(t);
				callback && callback(obj2);
			}
		},30);

	};
	// slideIn(document.getElementById('promise'),slideOut,document.getElementById('promise'));

	var oPromise = document.getElementById('promise');
	var oMemery = document.getElementById('memery');
	var oBless = document.getElementById('bless');
	var objs = [oPromise,oMemery,oBless];
	var aBtn = document.getElementById('menu').getElementsByTagName('li');
	var nowObj = null;

	slideOut(oMemery,slideIn,oPromise);
	nowObj = oPromise;

	for(var i = 0;i < aBtn.length;i++){
		aBtn[i].index = i;
		aBtn[i].onclick = function(){
			var _i = this.index == (aBtn.length - 1) ? 0 : this.index + 1;
			if(nowObj != objs[this.index]){
				slideOut(nowObj,slideIn,objs[this.index]);
				nowObj = objs[this.index];
			}
		}
		console.log(aBtn.length);
	}


	// 这招控制
	var oMask = document.getElementById('mask');
	oMask.onclick = function(){
		var that = this;
		// var t = setInterval(function(){
		// 	if(parseInt(that.style.padding) < WIDTH/2){
		// 		that.style.padding = parseInt(that.style.padding) + 10 + 'px';
		// 	}else{
		// 		clearInterval(t);
		// 		that.style.display = 'none';
		// 	}
		// },1000);
		this.style.display = 'none';
	};
};