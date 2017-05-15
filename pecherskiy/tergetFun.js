function screenSize() {
	var width = Math.floor(parseFloat(window.innerWidth));
	var height = window.innerHeight;
	var widthMainPage = mainPage.offsetWidth;
	ball.style.left = ((mainPage.offsetWidth)/2 - 5) + 'px';
	ball.style.top = '258px';

	var blok = brick.getBoundingClientRect();
	var brickClass = document.getElementsByClassName('brick');
	for(var i = 0; i < brickClass.length;  i++){
		brickClass[i].style.width = (blok.width - 20) + 'px';
	}

	if (width < 400) {
		mainPage.style.left = (width/-2) + 'px';
	}

}

function movePaddle(){
	var widthScreen = window.innerWidth;
	var widthMainPage = mainPage.offsetWidth;
	var wightPadle = widthMainPage/4;
	var leftPad = ((widthScreen - widthMainPage)/2) + (wightPadle/2)
	var RightPad =  widthMainPage- wightPadle;
	var obj = {
		"lf": leftPad,
		"rg": RightPad,
		"len": wightPadle
	}
	return obj
}

function moveBall(){
	var bl = ball.getBoundingClientRect();
	var sp = gameSpace.getBoundingClientRect();
	var blk = brick.getBoundingClientRect();
	gameZone = {
		"bolLeft": bl.left,
		"bolRigt": bl.right,
		"bolTop": bl.top,
		"boldBottom": bl.bottom,
		"spaceWidth": sp.width-10,
		"spaceHeight": sp.height-10,
		"blockWidth": blk.width,
		"blockHeight": blk.height
	}
	return gameZone;
}

function startPosition(){
		  ball.style.left = ((mainPage.offsetWidth)/2 - 5) + 'px';
		  ball.style.top = '258px';
		  var leftP = (mainPage.offsetWidth - (mainPage.offsetWidth/4))/2;
		  paddle.style.left = leftP + 'px';
}

function backBlock(){
	var brickClass = document.getElementsByClassName('brick');
	for(var i = 0; i < brickClass.length;  i++){
		brickClass[i].classList.remove('removed');
		brickClass[i].classList.remove('dbl-touch');

	}
		  for (var i = 0; i < model.objParam.level-1; i++) {
		  	dblTouchBlock() 
		  }
}

function innerParam(){
	++model.objParam.scoreLevel
	++model.objParam.score
	if(model.objParam.score > model.obj){
		model.obj = model.objParam.score;
		scoreTotal.innerHTML = model.objParam.score;
		model.saveChange();
	}

	scoreNode.innerHTML = model.objParam.score
	level.innerHTML = model.objParam.level
}

function dblTouchBlock(){
	var rn = randomNum();
	var brickClass = document.getElementsByClassName('brick');
	for (var i = 0; i < brickClass.length; i++) {
		if(!brickClass[rn].classList.contains('dbl-touch')){
			brickClass[rn].classList.add('dbl-touch');
			return;
		}
		else{
			++rn
			if(rn > 9){
				rn = 0;
			}
		}
	}
}


var model = {
	obj: 0,
	platForm: '',
	objParam: {
  		"scoreLevel": 0,
  		"score": 0,
  		"lifes": 3,
  		"level": 1,
  		"TopScore": 0
	},
	//выгружаем данные из локльного хронилища
	load: function(){
			//очищаем объект
			this.obj = '';
			//парсим данные
			var data = JSON.parse(localStorage.getItem('MyApp_pecherskiyD'));
			//если localStorage отсутствует
			if(data === null){
				this.obj = [];
			    return false;
			}
			else{
				model.obj = data;
				scoreTotal.innerHTML =model.obj;
			}
	},
	//сохраняем изменения в localStorage
	saveChange: function(){
		localStorage.setItem('MyApp_pecherskiyD', JSON.stringify(this.obj));
	},
}


function getDecimal(num) {
  return num - Math.floor(num);
}

function randomNum(){
	var random = 0 + Math.floor(Math.random() * (9 + 1 - 0));
	return random;
}
