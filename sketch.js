//var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg);
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1");
  scoreBoard = createElement("h1");
  
}

function draw() {
  background("#BDA297");
  
  //drawblueBubble();
  //drawredBubble();

  //display Score and number of life

  heading.html("life",+life);
  heading.style("color:green");
  heading.position(0,20);

  scoreBoard.html("Score",+score);
  scoreBoard.style("color:red");
  scoreBoard.position(width-200,20);




  if(gameState===1){
    gun.y=mouseY 

    if(frameCount % 80 === 0){
      drawblueBubble();
    }

    if(frameCount % 100 === 0){
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    } 

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }

    
    drawSprites();
  }
     
}
function shootBullet(){
  bullet = createSprite(200,width/2,30,30);
  bullet.y = gun.y -35;
  bullet.addImage("bullet",bulletImg);
  bullet.scale = 0.2
  bullet.velocityX = 5;
  //bullet.y = gun.y -35;
  //bullet.lifetime = 200;
  bulletGroup.add(bullet);
}

function drawblueBubble(){
  blueBubble = createSprite(800,random(20,780),20,20);
  blueBubble.velocityX = -8;
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);

}

function drawredBubble(){
  redBubble = createSprite(800,random(20,780),20,20);
  redBubble.velocityX = -8;
  redBubble.addImage(redBubbleImg);
  redBubble.scale = 0.1;
  redBubble.lifetime = 400;
  redBubbleGroup.add(redBubble);

}
function handleBubbleCollision(bubbleGroup){
  if(life > 0){
    score = score + 1;
  }
  blast = createSprite(bullet.x , bullet.y, 60,60);
  blast.addImage(blastImg);
  blast.scale = 0.5;
  blast.life = 20;

  bubbleGroup.destroyEach();
  bulletGroup.destroyEach();
}

function handleGameOver(bubbleGroup){
  life = life -1;
  bubbleGroup.destroyEach();
  //blueBubbleGroup.destroyEach();
  if(life === 0){
    gameState = 2;
    swal({
      title: 'Game Over',
      text: "Oops you lost the game .......!!!!!!!!",
      text: "your score is " + score,
      imageUrl: 
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSizw: "100*100",
      confirmButtonText: "Thanks For Playing"
    })
  }
}
