// 游戏初始化参数
// 一步的长度
var xOneStep = 102,
	// 一步的高度
	yOneStep = 83,
	// 游戏中的敌人数
	enemies = 5,
	// 游戏中的最小速度
	minSpeed = 80,
	// 游戏中的最大速度
	maxSpeed = 150;

var showScore = function(score) {
	document.getElementById("my-score").innerHTML = score;
}
var rocks = [
        {sprite: 'images/Gem Blue.png', kind: 'gift', score: 10},
        {sprite: 'images/Gem Green.png', kind: 'gift', score: 20},
        {sprite: 'images/Gem Orange.png', kind: 'gift', score: 30},
        {sprite: 'images/Heart.png', kind: 'gift', score: 40},
        {sprite: 'images/Key.png', kind: 'gift', score: 50},
        {sprite: 'images/Rock.png', kind: 'stone', score: 0}
];


// 游戏实体父类
var Entity = function(sprite, x, y) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
}

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Entity.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 此为游戏必须的函数,更新数据用
Entity.prototype.update = function() {
	
}
var aRandomNum = function(min, max) {
	var range = max - min;
	var rand = Math.random();
	return min + Math.round(rand * range);
};

// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
	// 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
	this.sprite = 'images/enemy-bug.png';
	this.x = -aRandomNum(0, 8) * xOneStep - xOneStep;
	this.yStep = aRandomNum(0, 2);
	this.y = this.yStep * yOneStep + yOneStep / 1.3;
	this.speed = aRandomNum(minSpeed, maxSpeed);
	// 要应用到每个敌人的实例的变量写在这里
	// 我们已经提供了一个来帮助你实现更多
	Entity.call(this, this.sprite, this.x, this.y);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// 敌人初始化，随机设置敌人的泳道和移动速度
Enemy.prototype.init = function() {
	// x轴副坐标可以产生随机进入的效果
	this.x = -aRandomNum(0, 3) * xOneStep - xOneStep;
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
	if(this.x > ctx.canvas.width) {
		this.init();
		return;
	}
	if (this.checkCollisions()) {
		player.lose();
	}
};

Enemy.prototype.checkCollisions = function() {
	return ((Math.abs(player.x - this.x) < 60) && (Math.abs(player.y - this.y) < 60));
}

// 障碍物
var Rock =  function(rock, x, y) {
	Entity.call(this, rock.sprite, x * xOneStep, y * yOneStep-20);
	debugger
	this.kind = rock.kind;
	this.score = rock.score;
}
Rock.prototype = Object.create(Entity.prototype);
Rock.prototype.constructor = Rock;

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(sprite) {
	Entity.call(this, sprite, 2 * xOneStep, 5 * yOneStep - 10)
	this.lives = 5;
	this.score = 0;
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// 玩家初始化
Player.prototype.init = function() {
	this.x = 2 * xOneStep;
	this.y = 5 * yOneStep - 10;
}

// 玩家对碰测试
Player.prototype.checkCollisions = function() {
	var rock = null;
	for (let i = 0, len = allRocks.length; i < len; i++) {
		if ((Math.abs(allRocks[i].x - this.x) < 40) && (Math.abs(allRocks[i].y - this.y) < 40)) {
			rock = allRocks[i];
			if (rock.kind == 'gift') {
				allRocks.splice(i,1);
			}
			return rock;
		}
	}
}	

// 重新玩游戏
Player.prototype.restart = function() {
	this.init();
	this.lives = 5;
	this.score = 0;
}
// 游戏赢
Player.prototype.win = function() {
	this.score += 50;
	window.alert('you win!! score is ' + this.score);
	this.init();
}

Player.prototype.lose = function() {
	this.lives--;
	if(this.lives > 0) {
		//window.alert("you lose! " + this.lives + " lives left")
		this.init();

	} else {
		window.alert('ooh!! game over!!');
		this.restart();
	}

}

Player.prototype.handleInput = function(key) {
	var xStep = 0, yStep = 0;
	switch(key) {
		case 'left':
			xStep = -xOneStep;
			player.x -= xOneStep;
			break;
		case 'right':
			xStep = xOneStep;
			player.x += xOneStep;
			break;
		case 'up':
			yStep = -yOneStep;
			player.y -= yOneStep;
			break;
		case 'down':
			yStep = yOneStep;
			player.y += yOneStep;
			break;
	}
	var rock = this.checkCollisions();
	// 如果有障碍物，石头不能前进，礼品得分并消失
	if (rock) {
		// 是石头
		debugger;
		if (rock.kind == 'stone') {
			player.x -= xStep;
			player.y -= yStep;
		} else if (rock.kind == 'gift') {
			player.score += rock.score;
			showScore(this.score);
		}
	}
	if(player.x > 4 * xOneStep) {
		player.x = 4 * xOneStep;
	}
	if(player.x < 0) {
		player.x = 0;
	}
	if(player.y > 5 * yOneStep - 10) {
		player.y = 5 * yOneStep - 10;
	}
	if(player.y < yOneStep - 10) {
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
var allRocks = [
	new Rock(rocks[0], 2, 4), 
	new Rock(rocks[5], 4, 5), 
	new Rock(rocks[5], 1, 4), 
	new Rock(rocks[4], 0, 2),
	new Rock(rocks[1], 2, 1),
	new Rock(rocks[5], 1, 3),
	new Rock(rocks[5], 4, 2),
	new Rock(rocks[3], 2, 3)
];
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