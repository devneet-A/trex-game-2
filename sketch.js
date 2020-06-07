var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var obstacleGroup,obs1,obs2,obs3,obs4,obs5,obs6;

var cloudGroup,cloudImage;       

var score=0;

var PLAY=1,END=0;

var gameState = PLAY;

var gameover,restart,imgG,imgR;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
 cloudImage = loadImage("cloud.png");
 obs1 = loadImage("obstacle1.png");
 obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  imgG = loadImage("gameOver.png");
  imgR = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);
  
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;

  gameover = createSprite(300,200);
  gameover.addImage(imgG);
  gameover.scale = 0.8;
 gameover.visible = false;
  
  restart = createSprite(300,250)
  restart.addImage(imgR);
  restart.scale = 0.5;
  restart.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
 
}

function draw() {
  background(150);
  text(score,400,50);
  
   if (gameState===PLAY){
     score =  Math.round(frameCount/4);
  
     if(keyDown("space") && trex.y>360){
    trex.velocityY = -10;
  }
   
      trex.velocityY = trex.velocityY + 0.8
   
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
 
trex.collide(invisibleGround);
     
     spawnClouds();
   
     spawnObstacles();
  
   if(obstacleGroup.isTouching(trex)){
      gameState = END;
   }
   }
  else if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
  
  trex.velocityY=0;
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trex_collided);
   obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
     reset(); 
    }
  }
  
  
  
  
  
  
  
 
  
 
  drawSprites();
}

function spawnClouds(){
 if (frameCount % 100 === 0){
  var cloud = createSprite(600,200); 
   cloud.addImage(cloudImage);
    cloud.velocityX = -4;
   cloud.scale = 0.8;
  cloud.lifetime = 155;
 cloudGroup.add(cloud);
 }
 }

function spawnObstacles(){
 if (frameCount % 90 === 0){ 
 var obstacle = createSprite(600,370);
 var rand = Math.round(random(1,6));
switch(rand){
case 1:obstacle.addImage(obs1);   
      break; 
case 2:obstacle.addImage(obs2);   
      break; 
case 3:obstacle.addImage(obs3);   
      break; 
case 4:obstacle.addImage(obs4);       
      break; 
case 5:obstacle.addImage(obs5);   
      break; 
case 6:obstacle.addImage(obs6);   
      break; 
default:break; 
}   
obstacle.scale = 0.5;
obstacle.velocityX = -6;
obstacle.lifetime = 155;
 obstacleGroup.add(obstacle);
 }
}  
  function reset(){
 gameState=PLAY;   
 gameover.visible = false;
    restart.visible = false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;
    
  }
  
  
