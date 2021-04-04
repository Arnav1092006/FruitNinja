//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruit,fruitImg1,fruitImg2,fruitImg3,fruitImg4;
var alien,alienImg1,alienImg2;
var gameOverImg;
var fruitGroup,alienGroup;
var gameOverSound,knifeSound;


function preload(){
  
   knifeImage = loadAnimation("knife.png");
   fruitImg1 = loadImage("fruit1.png");
   fruitImg2 = loadImage("fruit2.png");
   fruitImg3 = loadImage("fruit3.png");
   fruitImg4 = loadImage("fruit4.png");
   alienImg1 = loadImage("alien1.png");
   alienImg2 = loadImage("alien2.png");
   gameOverImg = loadAnimation("gameover.png");
   knifeSound = loadSound("knifeSwoosh.mp3");
   gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addAnimation("knifes",knifeImage);
   knife.scale=0.7;
  
  //gameOver = createSprite(300,300,20,20);
  //gameOver.addAnimation(gameOverImg);
  
  fruitGroup = createGroup();
  alienGroup = createGroup();
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  
}

function draw() {
  background("lightblue");
  
  
  
  
  if(gameState===PLAY){
    
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    Fruits();
    Aliens();
    
    if(fruitGroup.isTouching(knife))
    {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score+2;
    }
    //gameOver.visible = true;
  
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  }
  
  if(alienGroup.isTouching(knife))
    {
       alienGroup.destroyEach();
       gameOverSound.play();
       gameState = END;
       //gameOver.visible = true;
       knife.addAnimation("knifes",gameOverImg)
    }
  
  else if(gameState===END)
    {
      fruitGroup.setVelocityXEach (0);
      alienGroup.setVelocityXEach (0) ;
      
      fruitGroup.setLifetimeEach(-1);
      alienGroup.setLifetimeEach(-1);
    }

  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function Fruits()
{
  if(frameCount%80 ===0)
    {
      fruit = createSprite(400,200,20,20);
      fruit.y = Math.round(random(50,340));
      //fruit.debug = true;
      
      var rand = Math.round(random(1,4));
      switch(rand)
        {
            case 1:fruit.addImage(fruitImg1)
                  break;
            case 2:fruit.addImage(fruitImg2)
                  break;
            case 3:fruit.addImage(fruitImg3)
                  break;
            case 4:fruit.addImage(fruitImg4)
                  break;
                  default:break;    
        }
      fruit.scale = 0.3;
      fruit.velocityX = -7;
      fruit.Lifetime = 100;
      fruit.velocityX =  -(8+(5*score/10));
      
      fruitGroup.add(fruit);
    }
  
}

function Aliens()
 {
   if(frameCount% 60 ===0)
     {
       alien = createSprite(300,200,20,20);
       alien.y = Math.round(random(50,340));
       //alien.debug = true;
       //console.log(alien.y)
       
       var rand = Math.round(random(1,2));
      switch(rand)
        {
            case 1:alien.addImage(alienImg1)
                  break;
            case 2:alien.addImage(alienImg2)
                  break;
                  default:break;    
        }
       
        alien.velocityX = -2;
       alien.Lifetime = 100;
       alien.velocityX =  -(8+(3*score/10));
       alienGroup.add(alien);
     }
 }
