
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var score = 0;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var GAMEOVER;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,355,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(400,360,900,05);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  monkey.setCollider("rectangle",0,0,monkey.width,
                     monkey.height);
  monkey.debug = false;
  
}


function draw() {
  
  background("lightyellow");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime,100,50);
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    bananas();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;}}
  
  else if (gameState === END) {
     
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();  
    }
    if (monkey.isTouching(obstacleGroup)){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      reset();  
    }
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
     
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
   }
  
  monkey.collide(invisibleGround);
  
  if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();  
    }
    if (monkey.isTouching(obstacleGroup)){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.velocity = 0;
      text("GAMEOVER",200,200);
      textSize(40);
      stroke("red");
      fill("white");
      reset(); 
      
    }
    
  
drawSprites();}

function reset(){
  
   gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("moving", monkey_running);
  score = 0;
  
  
}

function obstacles(){
  
  if (frameCount % 300 === 0){
  stone = createSprite(400,313,50,50);
    stone.y = Math.round(random(305,350));
  stone.velocityX = -(6 + score/100);
    stone.addImage(obstaceImage);
    stone.scale = 0.2
    stone.lifetime = 300;
    
     obstacleGroup.add(stone);

}}
function bananas(){
  
  if (frameCount % 80 === 0){
  var banana = createSprite(400,80,60,60);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    
    
    //add each cloud to the group
    FoodGroup.add(banana);  
}}



