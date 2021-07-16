//all the variables which are needed
var bird, bird_image;
var bg, bg_image;
var fg,fg_image;
var pipe1,pipeNorth_image;
var pipe2,pipeSouth_image;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r;

function preload(){
bird_image=loadImage("images/bird.png");
bg_image=loadImage("images/bg.png");
fg_image=loadImage("images/fg.png");
pipeNorth_image=loadImage("images/pipeNorth.png");
pipeSouth_image=loadImage("images/pipeSouth.png");
r=loadImage("images/unnamed.png");
}

function setup() {
createCanvas(282,512);

//background
bg = createSprite(144,256,10,10);
bg.addImage(bg_image);

//foot ground
fg=createSprite(144,470,288,112);
fg.addImage(fg_image);

//bird
bird = createSprite(25,256,10,10)
bird.addImage(bird_image);

//pipe group
pipe1Group = new Group();
pipe2Group = new Group();

//scoring
score = 0;

//restarting the game
restart = createSprite(144,256,10,10);
restart.addImage(r);
restart.visible=false;
restart.scale = 0.4;
}

function draw() {
  background(0,151,157);
  
  if(gameState === PLAY){
  pipe_move();

  //bird movement
if (keyDown("space")){
  bird.y = bird.y - 15;
  }
  else{
  bird.velocityY = 5;
  }
 
  //foot ground movement
fg.velocityX = -1;

//repositioning foot ground
if(fg.x < 137){
  fg.x = fg.width/2;
  }

  //game end
  if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = END;
  }
  if(bird.isTouching(fg)){
    gameState = END;
  }
  
if(frameCount % 75 === 0){
score++;
}
}
else if(gameState === END)  {
fg.velocityX = 0;
bird.visible = false;
bird.x=25;
bird.y=256;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible=true;
}
  
if(mousePressedOver(restart)){
  reset();
}

drawSprites();

textSize(30);
textFont("Georgia");
text("Score:" + score,175,500);
}

function pipe_move(){
if (frameCount % 75 === 0 ){
  pipe1 = createSprite(144,0,10,100);
  pipe1.addImage(pipeNorth_image);
  pipe1.y = random(0,50);
  pipe1.velocityX = -2;
  pipe1Group.add(pipe1);
  pipe1Group.setLifetimeEach(144);
 
  pipe2 = createSprite(144,512,10,100);
  pipe2.addImage(pipeSouth_image);
  pipe2.y = random(462,512);
  pipe2.velocityX = -2;
  pipe2Group.add(pipe2);
  pipe2Group.setLifetimeEach(144);

}

}

function reset(){
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.visible=true;
  restart.visible=false
}