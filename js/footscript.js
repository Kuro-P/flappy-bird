
    var cvs  = document.getElementById("canvas"),
        contxt = cvs.getContext("2d");
    var cvsW = cvs.width,
        cvsH = cvs.height;
    var state = true; //use to distinguish the bird had hit the boundary or not   
    var score = 0, // the player score
        bestScore = 0,
        hasAdd = false, // use to control that every pipe can only add one point
        hasVoice = false; // use to control the hit voice
    var guide = true; // use to distinguish the guide has done or not
    var cvsB = cvs.getBoundingClientRect();
    var n = 0; // use to change bird.png
    var atlas = new Image();
    atlas.src = "imgs/atlas.png";
    var bird = {
        initial : { x:40,y:200,vy:5},
        x : 40,
        y : 200,
        vx : 0,
        vy : 5,
        w : 46,
        h : 46,
        g : 1
    };
    /*The bird.x and bird.y might be changed,so don't put the calculte variable into bird obj*/
    var birdHead = bird.x + 46 - 6,
        birdButt = bird.x + 6,
        birdTop = bird.y + 16,
        birdBottom = bird.y + 58 - 18,
        birdH = 58 - 16 - 18;
    var pipe = {
        h: 320,
        x : 150,
        w : 52,
        passH: 130,
        downmax : -280,
        space : 180,
        vx : -4,
    };

    var pipe_1 = { x:cvsW/2 , y:0 ,guideY:0},
        pipe_2 = { x:0 , y:0 ,guideY:0};

    var voice = {
        die : document.getElementById("die_voice"),
        hit : document.getElementById("hit_voice"),
        point : document.getElementById("point_voice"),
        swooshing : document.getElementById("swooshing_voice")
    };
    var lastTime = 0, curTime = 0,timer;   
    // The landVx value should be canvas.width divide exactly, or the animation will have an space.
    var landVx = -6;
    var land1X = 0 , land2X = cvsW;
    var bg1X = 0 ,bg2X = cvsW;

    function Initial(){
        pipe_1.y = calPipeY();
        pipe_2.y = calPipeY();
        pipe_1.x = pipe.x;
        pipe_2.x = cvsW;
        bird.x = bird["initial"].x;
        bird.y = bird["initial"].y;
        bird.vy = bird["initial"].vy;
        state = true;
        score = 0;
        birdHead = bird.x + bird.w - 9;
        birdButt = bird.x + 6;
        birdTop = bird.y + 13;
        birdBottom = bird.y + bird.h - 11;
        hasVoice = false;
    }
    function drawBg(){
        if(state == true){
            bg1X += landVx;
            bg2X += landVx;
            if( bg1X<= -cvsW ) bg1X = cvsW;
            if( bg2X<= -cvsW ) bg2X = cvsW;
        }
        contxt.drawImage(atlas,0,0,288,512,bg1X,0,cvsW,cvsH);
        contxt.drawImage(atlas,0,0,288,512,bg2X,0,cvsW,cvsH);
    }
    function drawBird(){          
        var lastTime = 0 ,curTime = 0;
            curTime = new Date().getTime();
            //the bird change wings.png per 100ms.
            if(curTime - lastTime >100 && state == true){
                n = (n >= 2 )?0:(n+1);                                     
                //birdImg.src = "imgs/bird0_"+n+".png";
            }
            contxt.drawImage(atlas,56*n,966,46,58,bird.x, bird.y ,46,58);
            if(state == true){
                bird.y += bird.vy;
                bird.vy += bird.g; 
                birdHead = bird.x + bird.w - 9;
                birdButt = bird.x + 6;
                birdTop = bird.y + 13;
                birdBottom = bird.y + bird.h - 11;
            }
                lastTime = curTime;                                                      
    }
    function calPipeY(){
        var pipeY = Math.round( Math.min(pipe.downmax*Math.random(),-90) ); 
        return pipeY;
    }
    function drawPipe(){
        //pipeDown.y = Math.round(-280*Math.random());
        //pipeUp.y = pipe.h + pipe.Down.y + pipe.passHeight;         
        contxt.drawImage(atlas,111,645,53,320, pipe_1.x, pipe_1.y, 53, 320);
        contxt.drawImage(atlas,168,645,52,320, pipe_1.x, pipe.h + pipe_1.y + pipe.passH, 52,320);
        contxt.drawImage(atlas,111,645,53,320, pipe_2.x, pipe_2.y, 53, 320);
        contxt.drawImage(atlas,168,645,52,320, pipe_2.x, pipe.h + pipe_2.y + pipe.passH, 52,320);
        if(state == true){
            if( -pipe.w < pipe_1.x && pipe_1.x < cvsW) pipe_1.x += pipe.vx;
            if( -pipe.w < pipe_2.x && pipe_2.x < cvsW) pipe_2.x += pipe.vx; 
    
            if(pipe_2.x - pipe_1.x >pipe.space && (pipe_2.x == cvsW)){
                pipe_2.x += pipe.vx;
                pipe_2.y = calPipeY();
            }
            if(pipe_1.x - pipe_2.x >pipe.space && (pipe_1.x == cvsW)){
                pipe_1.x += pipe.vx;
                pipe_1.y = calPipeY();
            }   
            if(pipe_1.x <=-pipe.w){
                pipe_1.x = cvsW;
            }
            if(pipe_2.x <=-pipe.w){
                pipe_2.x = cvsW;
            }
        }
    }
    function drawLand(){
        if(state == true){
            land1X += landVx;
            land2X += landVx;
            if( land1X<= -cvsW ) land1X = cvsW;
            if( land2X<= -cvsW ) land2X = cvsW;
        }
        contxt.drawImage(atlas,584,0,336,112,land1X,cvsH-112,336,112);
        contxt.drawImage(atlas,584,0,336,112,land2X,cvsH-112,336,112);
    }
    function judgeState(pip){
        if( birdHead - pip.x >=0 ){
            if(birdButt - pip.x <= pipe.w){
                if(birdBottom - (pipe.h + pip.y) <= pipe.passH && birdTop - (pipe.h + pip.y) >=0 ){
                    state = true;
                    if(birdHead - pip.x >= pipe.x/2-10 && hasAdd == false){
                        score++;
                        voice.point.currentTime = 0;
                        voice.point.play();
                        hasAdd = true;
                    }
                }else{
                    state = false;
                }
            }else{
                state = true;
                hasAdd = false;
            }
        }
       if(birdBottom - (cvsH - 112) >= 0){
           state = false;
        }
    }
    function drawScore(size,num,numX,numY){
        if(size == "big" && state == true){
            switch(num){
                case 0: contxt.drawImage(atlas,990,118,28,40,numX,cvsH/8,28,40);break;
                case 1: contxt.drawImage(atlas,267,908,26,40,numX,cvsH/8,26,40);break;
                case 2: contxt.drawImage(atlas,582,318,28,40,numX,cvsH/8,28,40);break;
                case 3: contxt.drawImage(atlas,610,318,28,40,numX,cvsH/8,28,40);break;
                case 4: contxt.drawImage(atlas,638,318,28,40,numX,cvsH/8,28,40);break;
                case 5: contxt.drawImage(atlas,666,318,28,40,numX,cvsH/8,28,40);break;
                case 6: contxt.drawImage(atlas,582,366,28,40,numX,cvsH/8,28,40);break;
                case 7: contxt.drawImage(atlas,610,366,28,40,numX,cvsH/8,28,40);break;
                case 8: contxt.drawImage(atlas,638,366,28,40,numX,cvsH/8,28,40);break;
                case 9: contxt.drawImage(atlas,666,366,28,40,numX,cvsH/8,28,40);break;
                default: contxt.drawImage(atlas,990,118,28,40,numX,cvsH/8,28,40);break;
            }
        }else if(size == "small" && state == false){
            switch(num){
               case 0: contxt.drawImage(atlas,275,646,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 1: contxt.drawImage(atlas,275,664,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 2: contxt.drawImage(atlas,275,698,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 3: contxt.drawImage(atlas,275,716,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 4: contxt.drawImage(atlas,275,750,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 5: contxt.drawImage(atlas,275,768,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 6: contxt.drawImage(atlas,275,802,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 7: contxt.drawImage(atlas,275,820,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 8: contxt.drawImage(atlas,275,854,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
               case 9: contxt.drawImage(atlas,275,872,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
                default : contxt.drawImage(atlas,275,646,14,14,(cvsW-228)/2+190+numX,cvsH/4+50+10+38+numY,14,14);break;
            }
        }
    }
    function drawMedal(s){
        if(state == false){
            if(s<10){
                contxt.drawImage(atlas,223,953,46,46,(cvsW-228)/2+26,cvsH/4+50+10+44,46,46);
            }else if(s<20){
                contxt.drawImage(atlas,223,905,46,46,(cvsW-228)/2+26,cvsH/4+50+10+44,46,46);
            }else if(s<35){
                contxt.drawImage(atlas,241,515,46,46,(cvsW-228)/2+26,cvsH/4+50+10+44,46,46);
            }else if(s>=35){
                contxt.drawImage(atlas,241,563,46,46,(cvsW-228)/2+26,cvsH/4+50+10+44,46,46);
            }
        }
    }
    function handleScore(s,ny){
        var digits = s.toString().length;
        var num ,nx;
        if(state == true){ // big number
            for(var i =1 ; i<=digits ; i++){
                num = parseInt(( s/Math.pow(10,i-1) ) % 10);
                nx = (cvsW - digits*28)/2 + (digits-i)*28;
                drawScore("big",num,nx,ny);
            }
        }else if(state == false && hasVoice == true){ //small number
            for(var i =1 ; i<=digits ; i++){
                num = parseInt(( s/Math.pow(10,i-1) ) % 10);
                nx = -14*(i-1);
                drawScore("small",num,nx,ny);
            }
        }       
    }
    function showLogo(){
        contxt.drawImage(atlas,0,0,288,512,0,0,288,512);// sky
        contxt.drawImage(atlas,697,178,186,54,(cvsW-186)/2,cvsH/4,186,54); //flappy bird
        contxt.drawImage(atlas,702,233,237,66,(cvsW-237)/2,cvsH/4+50+10+125+10,237,66); //pause       
        contxt.drawImage(atlas,584,0,336,112,0,cvsH-112,336,112); //land
        contxt.drawImage(atlas,881,181,128,17,(cvsW-128)/2,cvsH-30,128,17); // copy right
    }
    function getReady(){
        contxt.drawImage(atlas,582,115,200,50,(cvsW-200)/2,cvsH/4,200,50); //get Ready
        contxt.drawImage(atlas,580,177,120,104,(cvsW-120)/2,cvsH/4+50+20,120,104); //tap
    }
    function gameStart(){
        timer = window.requestAnimationFrame(function(){
            curTime = new Date().getTime();
            if(curTime - lastTime > 50){
                contxt.clearRect(0,0,cvsW,cvsH);
                drawBg();
                drawPipe();
                judgeState(pipe_1);
                judgeState(pipe_2);
                drawBird();
                /*The judge fn() should after the drawBird(),because that drawBird() will change birdBottom,otherwise it will have a bug when the bird drop on the land.Or put part of birdXXX code into initial().*/ 
                drawLand(); 
                handleScore(score,0); //draw big number
                gameOver();
                           
                lastTime = curTime;
            }
            gameStart();
        });
    }
    function gameOver(){
        if(state == false){
            if(hasVoice == false){
                voice.hit.currentTime = 0;
                voice.hit.play();
                hasVoice = true;
            }else{
                bestScore = Math.max(bestScore,score);
                contxt.drawImage(atlas,783,115,205,50,(cvsW-205)/2,cvsH/4,205,50); //Game over
                contxt.drawImage(atlas,5,515,228,125,(cvsW-228)/2,cvsH/4+50+10,228,125); //score board
                contxt.drawImage(atlas,702,233,237,66,(cvsW-237)/2,cvsH/4+50+10+125+10,237,66); //pause
                
                drawMedal(score); //draw small number
                handleScore(score,0);
                handleScore(bestScore,44); 
            }

        }
    }

    cvs.addEventListener('click',function(e){
        var clickP = e.pageX - cvsB.left - (cvsW-237)/2;
        if(state ==false){
            if(guide == true){
                if(clickP>=0 && clickP<=110){
                    showLogo();
                    drawBg();
                    drawBird();
                    drawPipe();
                    drawLand();
                    getReady();
                    guide = false;
                }else if(guide == false){
                    state = true;
                    hasVoice == true;
                    gameStart();
                }
            }else if(clickP>=0 && clickP<=110){               
                Initial();
                gameStart();
            }
        }else{  
              bird.vy = -10;
              voice.swooshing.currentTime = 0;
              voice.swooshing.play();
        }
    },false);
  
    cvs.addEventListener('touchstart',function(e){
        var clickP = e.pageX - cvsB.left - (cvsW-237)/2;
        if(state ==false){
            if(guide == true){
                if(clickP>=0 && clickP<=110){
                    showLogo();
                    drawBg();
                    drawBird();
                    drawPipe();
                    drawLand();
                    getReady();
                    guide = false;
                }else if(guide == false){
                    state = true;
                    hasVoice = false;
                    gameStart();
                }
            }else if(clickP>=0 && clickP<=110){               
                Initial();
                gameStart();
            }
        }else{  
              bird.vy = -10;
              voice.swooshing.currentTime = 0;
              voice.swooshing.play();
        }
    },false);
    window.addEventListener('keydown',function(e){
        e.preventDefault();
        if((e.which || e.keyCode) == 32 && state == true){
            bird.vy = -10;
            voice.swooshing.currentTime = 0;
            voice.swooshing.play();
        }
    });
//---------------- running code ----------------------

    contxt.font = "20px sans-serif";
    contxt.fillStyle = "Teal";  
    contxt.fillText("loading...",(cvsW-100)/2,cvsH/2-10); 
    window.onload = function(){
        Initial();
        state = false;
        showLogo();
    };
  
    /*Player click or tap the screen to start game.*/
  
