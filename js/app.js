// 游戏初始化参数
// 一步的长度
var xOneStep = 102;
// 一步的高度
var yOneStep = 83;

// 游戏画布的宽度
var gameCanvasLength = 505;

// 游戏中的敌人数
var enemies = 5;

// 游戏中的最小速度
var minSpeed = 80;

// 游戏中的最大速度
var maxSpeed = 150;

var aRandomNum = function(min, max) {
	var range = max - min;
	var rand = Math.random();
	return min + Math.round(rand * range);
};

// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
	// 要应用到每个敌人的实例的变量写在这里
	// 我们已经提供了一个来帮助你实现更多
	this.init();
	// 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
	this.sprite = 'images/enemy-bug.png';
};

// 敌人初始化，随机设置敌人的泳道和移动速度
Enemy.prototype.init = function() {
	this.x = -aRandomNum(0, 8) * xOneStep - xOneStep;
	this.yStep = aRandomNum(0, 2);
	this.y = this.yStep * yOneStep + yOneStep / 1.3;
	this.speed = aRandomNum(minSpeed, maxSpeed);
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
	// 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
	// 都是以同样的速度运行的
	this.x += this.speed * dt;
	if(this.x > gameCanvasLength) {
		this.init();
	}
	this.xStep = Math.floor((this.x + xOneStep * .8) / xOneStep);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	// 玩家如果与敌人在同一个格子中表示失败，没有命后游戏结束
	if((this.xStep == player.xStep) && (this.yStep + 1 == player.yStep)) {
		player.lose();
	}
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(sprite) {
	this.sprite = sprite;
	this.init();
	this.lives = 5;
	this.score = 0;
};

// 玩家初始化
Player.prototype.init = function() {
	this.xStep = 2;
	this.yStep = 5;
}

// 重新玩游戏
Player.prototype.restart = function() {
	this.init();
	this.lives = 5;
	this.score = 0;
}

// 更新玩家的位置
Player.prototype.update = function() {
	this.x = this.xStep * xOneStep;
	this.y = this.yStep * yOneStep - 10;
};

// 在屏幕上绘制玩家
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 游戏赢
Player.prototype.win = function() {
	this.score += 50;
	window.alert('you win!! score is ' + this.score);
	this.init();
}

Player.prototype.lose = function() {
	this.lives--;
	if(this.lives > 0) {
		window.alert("you lose! " + this.lives + " lives left")
		this.init();
	} else {
		window.alert('ooh!! game over!!');
		this.restart();
	}

}

Player.prototype.handleInput = function(key) {
	switch(key) {
		case 'left':
			player.xStep--;
			break;
		case 'right':
			player.xStep++;
			break;
		case 'up':
			player.yStep--;
			break;
		case 'down':
			player.yStep++;
			break;
	}
	if(player.xStep > 4) {
		player.xStep = 4;
	}
	if(player.xStep < 0) {
		player.xStep = 0;
	}
	if(player.yStep > 5) {
		player.yStep = 5;
	}
	if(player.yStep == 0) {
		player.win();
	}
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for(let i = 0; i < enemies; i++) {
	allEnemies.push(new Enemy());
}
var player = new Player('images/char-boy.png');
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