// 这是我们的玩家要躲避的敌人 

var Enemy = function() {
	// 要应用到每个敌人的实例的变量写在这里
	// 我们已经提供了一个来帮助你实现更多

	// 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
	this.sprite = 'images/enemy-bug.png';
	this.x = -101;
	this.y = 63;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
	// 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
	// 都是以同样的速度运行的
	this.x = 101 * dt + this.x;
	if(this.x > 5 * 101) { //大于最大边距的时候重新添加对象，
		this.x = -101;
	}
	this.checkCollisions();
	// this.y = this.y * dt + this.y;（只需要移动x坐标，不需要移动y坐标，因为是水平移动的）
	//ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	//  this.render();
	//去判断是否碰撞到小人
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//检查碰撞，如果当前对象和小人处于碰撞状态，
Enemy.prototype.checkCollisions = function() {
	//	var x = player.x ,y = player.y;
	//	if(((Math.abs(player.x  - this.x) <= 40) ||(Math.abs(player.x  - this.x) <= 40) && player.x <=this.x) && this.y == (player.y - 20)){
	//碰撞了，需要对应的内容进行选择其中一个
	if((Math.abs(player.x - this.x) < 40) && (Math.abs(player.y - this.y) < 40)) {
//	console.log("碰撞位置：this.x=" + this.x + ",this.y=" + this.y + ",x=" + x + ",y=" + y);
	setTimeout(function() {
		player.x = Math.ceil(Math.random() * 4) * 101;
		player.y = 5 * 83;
	},15);
//	console.log("后面:" + player.x + "," + player.y);
	/*confirm("哎呀碰到汽车了?",function(){
		player.render();
	})*/

}

}

// 现在实现你自己的玩家类
var Player = function() {
	//图片内容
	this.sprite = 'images/char-boy.png';
	//初始化位置
	this.x = 3 * 101;
	this.y = 5 * 83;

}

// 这个类需要一个 update() 函数， 
Player.prototype.update = function() {
	//判断这里面是否被敌人碰到了，如果被敌人碰到了以后就要重新开始
	/*var length = allEnemies.length,
		enmy,//敌人对象
		x, //敌人的坐标x
		y;//敌人的坐标y
	if( length > 0 ) {
		//判断是否存在敌人，以及敌人当前的位置是否和自己的位置冲突，如果冲突则表示已经死亡了，需要重新开始
		for(var i=0;i < length ;i++){
			enmy = allEnemies[i] || null;
			if( enmy !== null ) {
				x = enmy.x || 0;
				y = enmy.y || 0;
				
				//console.log("敌人的位置：x=" +  x + ",y=" + y + ",this.x=" + x + ",this.y=" + this.y);
				if(((x + 55 > this.x  && x<= this.x)) && y == (this.y -20)) { //由于绘制坐标减去了20，因此这里面添加上20
					//重新绘制一遍，然后再重新绘制第二遍
					console.log("位置：x=" + x + ",y=" + y + ",this.x=" + this.x + "，this.y=" + this.y);
					this.render();
					//ctx.drawImage( Resources.get( this.sprite ), this.x, this.y-20 );
					//重新设置坐标
					this.x = Math.ceil( Math.random()*4) * 101;
					this.y = 5* 83 ;
				//	this.render();//重新绘制
					break;
				}
			}
		}
	}*/

//	this.render();

}
//render() 函数和
Player.prototype.render = function() {
	//
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
}
//一个 handleInput()函数
Player.prototype.handleInput = function(keyCode) {
	//移动之前先判断是否撞到虫子，如果没有撞到，则会重新绘制图形
	//this.update();
	var x = 0,
		y = 0,
		max_x = 4 * 101,
		min_x = 0,
		max_y = 5 * 83
	min_y = 1 * 83;
	if(keyCode == 'left') { //向左走
		//重新绘制图片
		x = this.x - 101;
		y = this.y;
	} else if(keyCode == 'right') { //向右
		x = this.x + 101;
		y = this.y;
	} else if(keyCode == 'up') { //上
		x = this.x;
		y = this.y - 83;
	} else if(keyCode == 'down') { //向下
		x = this.x;
		y = this.y + 83;
	}
	x = x >= max_x ? max_x : (x <= min_x ? min_x : x);
	//出现了x=0重绘
	var temp = y;
	if(y <= 0) {
		//重新设置绘制的坐标(由于x,y坐标被修改，因此需要重新给x,y指定坐标位置)；
		x = Math.ceil(Math.random() * 4) * 101;
		y = 5 * 83;
		//this.render();
		//return;
	} else {
		y = y >= max_y ? max_y : y;
	}
	this.x = x;
	this.y = y;
	console.log("移动位置:" + keyCode + ",坐标：x=" + x + ",temp=" + temp + ", y=" + y + ",this.y=" + this.y);
	//ctx.drawImage(Resources.get( this.sprite ), x, y -20);
	this.render();

}

//玩家
var player = new Player();
//敌人
var allEnemies = [];
//
for(var i = 0; i < 5; i++) {
	var enmy = new Enemy();
	allEnemies.push(enmy);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
//每隔一定时间创建一个敌人，创建1-3个敌人
/*setInterval(function(){
	var length =  Math.ceil( Math.random()*4);
	for(var i=0;i < length ; i++){
		var enmy = new enmy();
		enmy.x = 
		enmy.y = 
	}
},1000);*/

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});