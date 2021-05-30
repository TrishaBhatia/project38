var database;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_img, cloudsGroup;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOver, gameOver_img, restart, restart_img;
var PLAY, END, gameState;
var bg
var hiScore;
var lives;
  PLAY = 1;
  END = 0;
  gameState = PLAY;

function preload(){
  trex_running = loadAnimation("sprites/trex1.png","sprites/trex3.png","sprites/trex4.png");
  trex_collided = loadAnimation("sprites/trex_collided.png");
  
  groundImage = loadImage("sprites/ground2.png")
  
  cloud_img = loadImage("sprites/cloud.png");

  bg=loadImage("sprites/download.png");
  
  obstacle1 = loadImage("sprites/obstacle1.png");
  obstacle2 = loadImage("sprites/obstacle2.png");
  obstacle3 = loadImage("sprites/obstacle3.png");
  obstacle4 = loadImage("sprites/obstacle4.png");
  obstacle5 = loadImage("sprites/obstacle5.png");
  obstacle6 = loadImage("sprites/obstacle6.png");
  
  gameOver_img = loadImage("sprites/gameOver.png");
  restart_img = loadImage("sprites/restart.png");
  
}

function setup(){
  createCanvas(600, 200);
  database = firebase.database();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
 
  trex.setCollider("circle");
  
  ground = createSprite(1188,180,1188,20);
  ground.addImage("ground",groundImage);
 
  invisibleGround = createSprite(200,190,1000000,10);
  invisibleGround.visible = false;
  invisibleGround.x = invisibleGround.width/2;

  gameOver = createSprite(camera.position.x, 50, 100, 50);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;
  
  restart = createSprite(camera.position.x, 90, 10, 10);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  lives = 5;
}


function draw(){
  background("white");
  console.log(ground.width);
  
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
if(score>80)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("white");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>120)
{
  background("white");
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("black");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>220)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("white");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>520)
{
  background("white");
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("black");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>920)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>1200)
{
  background("white");
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("black");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>1500)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>2000)
{
  background("white");
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("black");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>2500)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>3000)
{
  background("white");
  fill("black");
  text("Score: " + score, camera.position.x + 200, 30);
  fill("black");
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}
if(score>3500)
{
  background(bg);
  fill("white");
  text("Score: " + score, camera.position.x + 200, 30);
  text("LIVES LEFT: " + lives,camera.position.x +100,30);
  camera.position.x = trex.x + 250;
}

  if (gameState === PLAY){

    camera.position.x = trex.x + 250;
    score = score + Math.round(getFrameRate()/60);
    
    trex.velocityX = (7+(3*score/100));
    
    trex.velocityY = trex.velocityY + 0.8
    
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -10;
    }    

    if (trex.x > ground.x){
      ground.x = trex.x + 300;
    }

    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    
    if (obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
    
    spawnClouds();
    spawnObstacles();
  
    
  } else if (gameState === END){
    trex.changeAnimation("collided", trex_collided);
    trex.velocityY = 0;
    trex.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    gameOver.x = camera.position.x;
    restart.visible = true;
    restart.x = camera.position.x;
    
    if (mousePressedOver(restart) && lives > 0) {
      reset();
    } else if (lives === 0){
      restart.visible = false;
      text("YOU HAVE USED ALL YOUR CHANCES!!", camera.position.x - 120, 100);
      text("To play again, please refresh your page", camera.position.x - 115, 130);
    }
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if (frameCount%60 === 0){
    var cloud = createSprite(camera.position.x + 300, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -(7+(3*score/100));
    cloud.lifetime = 300;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    gameOver.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    
  }

}

function spawnObstacles(){
  if (frameCount%80 === 0){
    var obstacle = createSprite(camera.position.x + 300, 165, 10, 40);
    obstacle.velocityX = -(7+(3*score/100));
    obstacle.scale = 0.5;
    var rand = Math.round(random(1, 6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }

}

function reset() {
  gameState = PLAY;
  trex.velocityX = (7+(3*score/100));
  trex.x = 50;
  ground.x = 1188;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running);
  lives=lives-1;
}