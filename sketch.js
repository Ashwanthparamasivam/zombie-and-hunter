
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground;
var zombieGroup,zombieImg;
var bgImg;
var canH;
var canW;
var hunter,hunter_img;

var isGameOver = false;
var button;

function preload(){

 bgImg = loadImage('background.jpeg');
hunter_img = loadImage('shooter.png')
zombieImg = loadImage('zombie.gif');

}

function setup() {
var isMoble = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if(isMoble){
  canW = displayWidth;
  canH = displayHeight;
  createCanvas(displayWidth+20,displayHeight);
}
else{
  canW = windowWidth;
  canH = windowHeight;
  createCanvas(windowWidth,windowHeight);
}
frameRate(80);

  engine = Engine.create();
  world = engine.world;
  

 
  hunter = createSprite(200,canH-100,200,10);
  hunter.addImage(hunter_img);
  hunter.scale = 0.5;
  
  button = createImg('button.png');
  button.position(200,canH-300);
  button.size(80,80);
  button.mouseClicked(mousePressed);

  ground = new Ground(600,canH,10000,10);
 

  zombieGroup = new Group();

rectMode(CENTER);
ellipseMode(RADIUS);
textSize(50)
}


function draw() 
{
  background(51);

  text(mouseX+","+mouseY,mouseX,mouseY);
   image(bgImg, 0, 0,width,height);
 
 
  Engine.update(engine);
  ground.show();
  

  spawnzombie();

  
  if(zombieGroup.isTouching(hunter)){
  
    isGameOver = true;
    gameOver();
  }
  zombieGroup.setVelocityXEach(-2);
  drawSprites();  
  }


  function mousePressed() {
    
    zombie.lifetime = 0;
    }

function spawnzombie() {
  
  if (frameCount % 500 === 10) {
    zombie = createSprite(2000,200);
    zombie.y = Math.round((200,510));
    zombie.addImage(zombieImg);
    zombie.scale = 0.5;
    zombie.velocityX = -2;
    
    zombie.lifetime = 2000;

    zombie.depth = hunter.depth;
    hunter.depth = hunter.depth + 1;
    
    zombieGroup.add(zombie);
   
  }
  
}

       
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/zombie and hunter/main/hunter.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
