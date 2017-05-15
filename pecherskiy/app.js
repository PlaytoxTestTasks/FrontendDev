document.addEventListener('DOMContentLoaded', ready, false); 
function ready(){
  screenSize();
  model.load();
  var desk = device.desktop();
  var dev = device.tablet();
  var mob = device.mobile();

  if (desk == true){
    model.platForm = 'mousemove';
  }
  else{
    model.platForm = 'touchmove'
  }
  startGm.onclick = startGame;
  startPosition();
}


function startGame(){
  var opt = moveBall()
  gamePlay(opt);
}

function gamePlay(opt){
  var moveX = -1;
  var moveY = -1;
  var stepWihgt = opt.blockWidth;
  var stepHeigh = opt.blockHeight;
  var pddlPso = (mainPage.offsetWidth - (mainPage.offsetWidth/4))/2;;
  var pddlLen = mainPage.offsetWidth/4;
  var colBlock = document.getElementsByClassName('brick');
  //придаем объем шару
  var cycle = setInterval(function () {

    bx = Math.floor(parseFloat(ball.style.left = parseFloat(ball.style.left) + moveX + 'px'));
    by = Math.floor(parseFloat(ball.style.top = parseFloat(ball.style.top) + moveY + 'px'));

    // отражения от углов экрана
    if(bx <= 5){
      moveX = moveX*(-1);
    }
    if(by <= 0){
      moveY = moveY*(-1);
    }
    if(bx >= (opt.spaceWidth-5)){
      moveX = moveX*(-1);
    }
    // отражения от ракетки
    if (by >= 259){
      if(by  >= 265) {
        if(by  >= 365){
          if (model.objParam.lifes <= 0) {
            startPosition(); 
             model.objParam = {
              "scoreLevel": -1,
              "score": -1,
              "lifes": 3,
              "level": 1
            }
            lifesNode.innerHTML = model.objParam.lifes
            innerParam();
            backBlock();
            model.saveChange();
            alert('game over');
          }
          else{
            --model.objParam.lifes;
            startPosition(); 
            lifesNode.innerHTML = model.objParam.lifes
          }
          document.removeEventListener(model.platForm, moveMous, false);
          clearInterval(cycle);
        }
      }
      else if(bx < (pddlPso-10) || bx > pddlPso+pddlLen){
      }
      else{
        if((bx-pddlPso) < 10 && moveX > 0){
          moveX = -2
        }
        else if((pddlPso+pddlLen - bx) < 10 && moveX < 0 ){
          moveX = 2
        }
        else{
          (moveX > 0) ? moveX = 1 :moveX = -1;
        }
        moveY = moveY*(-1);
      }
    }

    var targetWihgt = Math.floor((bx)/stepWihgt);
    var targetHeight =Math.floor((by)/stepHeigh);
    var tB = (targetWihgt + targetHeight*5)-5;

    if(colBlock[tB] && !colBlock[tB].classList.contains('removed')){
      if(colBlock[tB].classList.contains('dbl-touch')){
        colBlock[tB].classList.remove('dbl-touch');
      }
      else{
        colBlock[tB].classList.add('removed');
        innerParam();
        
      }
      var shot = getDecimal(by/stepHeigh);
     
      if(shot <= 0.96 && shot != 0){
        moveX = moveX*(-1);
      }
      else{
        moveY = moveY*(-1);
      }
      
      if(model.objParam.scoreLevel == 10){
        model.objParam.scoreLevel = 0;
        ++model.objParam.level
        level.innerHTML = model.objParam.level
        document.removeEventListener(model.platForm, moveMous, false);
        clearInterval(cycle);
        setTimeout(backBlock, 500);
        startPosition()
      }
    }
  }, 10 / 5);

  document.addEventListener(model.platForm, moveMous, false);

    function moveMous(e) {
    var obj = movePaddle();
    if(model.platForm == 'mousemove'){
      px = e.pageX;
    }
    else{
      px = e.touches[0].pageX;
    }
    var pos = px - obj.lf
    if(pos > 0 ){
      paddle.style.left = (px - obj.lf) + 'px';
    }
    else{
      paddle.style.left = '0px';
    }
    if(pos > obj.rg){
        paddle.style.left = obj.rg + 'px';
    }
    pddlPso = parseFloat(paddle.style.left);
    pddlLen = obj.len
  };

}