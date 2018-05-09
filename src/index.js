'use strict';

function keepTD(num){
	var res = parseFloat(num);
	if(isNaN(res))return false;
	res = Math.round(num*100)/100;
	return res;
}

var Server = require('home').Server;
var server = new Server();

server.use('/', Server.static('static'));

server.get('/', function() {
    return;
});

//前进
server.get('/up', function() {
	$('#hg7881').turnUp();
	console.log('up');
	return {
		sn: process.ruff.sn,
		status: 'success',
		direction: 'up',
	};
});

//后退
server.get('/down', function() {
	$('#hg7881').turnDown();
	console.log('down');
	return {
		sn: process.ruff.sn,
		status: 'success',
		direction: 'down',
	};
});

//左转
server.get('/left', function() {
	$('#hg7881').turnLeft();
	console.log('left');
	return {
		sn: process.ruff.sn,
		status: 'success',
		direction: 'left',
	};
});

//右转
server.get('/right', function() {
	$('#hg7881').turnRight();
	console.log('right');
	return {
		sn: process.ruff.sn,
		status: 'success',
		direction: 'right',
	};
});

//停止
server.get('/stop', function() {
	$('#hg7881').turnStop();
	console.log('stop');
	return {
		sn: process.ruff.sn,
		status: 'success',
		direction: 'stop',
	};
});

//获取温湿度
server.get('/temp', function() {
	$('#temp').getTemperature(function(e,temp){
		if(e){
			//console.error(e);
			//return;
			global.ti = '未知';
		}else{
			global.ti = temp > 50 ? keepTD(temp/25) : temp;
		}
// 		console.log(ti);
	});
	$('#temp').getRelativeHumidity(function(e,hum){
		if(e){
			//console.error(e);
			//return;
			global.h = '未知';
		}else{
			global.h = hum > 50 ? keepTD(hum/14) : hum;
		}
// 		console.log(h);
	});
	$('#gz').getIlluminance(function (e, lux) {
	    if (e) {
// 	        console.error(e);
// 	        return;
			global.lx = '未知';
	    }else{
			global.lx = lux;
		}
		if(lux < 30){
			$('#led-r').turnOn();
		}else{
			$('#led-r').turnOff();
		}
	});
	
	$('#us-100').getDistance(function (e, distance) {
		if (e) {
// 	        console.error(e);
// 	        return;
			global.d = '未知';
	    }else{
			global.d = distance;
		}
	});
	
	return {
		sn: process.ruff.sn,
		status: 'success',
		temp: ti,
		hum: h,
		lux: lx,
		dis: d,
	}
});

//监听
server.listen(8008);


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
    
/*
    $("#distance").getDistance(function (error, distance) {
		console.log('distance: ' + distance);
	});
*/

});

$.end(function () {
    $('#led-r').turnOff();
});
