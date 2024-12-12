// 雪碧图位置数据

// 0: drawImage(atlas,990,118,28,40,cvsW/2-14,cvsH/8,28,40)
// 1: drawImage(atlas,267,908,26,40,cvsW/2-13,cvsH/8,26,40)
// 2: drawImage(atlas,582,318,28,40,cvsW/2-14,cvsH/8,28,40)
// 3: drawImage(atlas,610,318,28,40,cvsW/2-14,cvsH/8,28,40)
// 4: drawImage(atlas,638,318,28,40,cvsW/2-14,cvsH/8,28,40)
// 5: drawImage(atlas,766,318,28,40,cvsW/2-14,cvsH/8,28,40)
// 6: drawImage(atlas,582,366,28,40,cvsW/2-14,cvsH/8,28,40)
// 7: drawImage(atlas,610,366,28,40,cvsW/2-14,cvsH/8,28,40)
// 8: drawImage(atlas,638,366,28,40,cvsW/2-14,cvsH/8,28,40)
// 9: drawImage(atlas,766,366,28,40,cvsW/2-14,cvsH/8,28,40)

// Flappy Bird : drawImage(atlas,697,178,186,54,(cvsW-186)/2,cvsH/4,186,54);
// get ready :　drawImage(atlas,582,115,200,50,(cvsW-200)/2,cvsH/4,200,50); 
// bg_day :　drawImage(atlas,0,0,288,512,0,0,288,512);
// Land : drawImage(atlas,584,0,336,112,0,cvsH-112,336,112);
// gameOver : drawImage(atlas,783,115,205,50,(cvsW-205)/2,cvsH/4,205,50);
// Pause&Podium : drawImage(atlas,702,233,237,66,(cvsW-237)/2,cvsH/4+50+10+125+10,237,66);
// scoreBoard : drawImage(atlas,5,515,228,125,(cvsW-228)/2,cvsH/4+50+10,228,125);
// tap : drawImage(atlas,580,177,120,104,(cvsW-120)/2,cvsH/4+50+20,120,104);

// (0): drawImage(atlas,275,646,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (1): drawImage(atlas,275,664,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (2): drawImage(atlas,275,698,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (3): drawImage(atlas,275,716,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (4): drawImage(atlas,275,750,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (5): drawImage(atlas,275,768,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (6): drawImage(atlas,275,802,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (7): drawImage(atlas,275,820,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (8): drawImage(atlas,275,854,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);
// (9): drawImage(atlas,275,872,14,14,(cvsW-228)/2+170,cvsH/4+50+10+38,14,14);

function digits(s){
  var d = 0;
  while(s / 10 >= 1) {
   s = s / 10;
   d ++;
  }
  return d + 1;
}