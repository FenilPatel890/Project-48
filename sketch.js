const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var BackgroundImg;
var canvas;
var groceryShop,foodShop,dailyNeedShop,meatShop,storeImg;
var road,roadImg;
var player, playerImg;
var customer1 ,customer2 ,customer3,customerGroup, customer;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var money = 0
var invisibleGround


function preload() {

BackgroundImg = loadImage("Images/Background.png");
roadImg = loadImage("Images/Road.png");
playerImg = loadImage("Images/player.png")
customer1 = loadImage("Images/Customer1.png")
customer2 = loadImage("Images/Customer2.png")
customer3 = loadImage("Images/Customer3.png")
}
 
function setup() {
    canvas = createCanvas(2000,900);

    engine = Engine.create();
    world = engine.world;

    playerStore = new Store(175,225,400,400);

    road = createSprite(1175,450,50,50);

    customerGroup = new Group()
    player = createSprite(500,600,50,50);
    invisibleGround = createSprite(1160,600,1200,100);

    

}
  
function draw() {
background(BackgroundImg);

Engine.update(engine);

invisibleGround.display = false

road.addImage("static", roadImg);
road.scale = 1;

    player.addImage("standing", playerImg);
    player.scale = 0.40

    road.display();

    if (gameState === PLAY){

      spawnCustomer();
    
    if(customerGroup.collide(playerStore)){

        customerGroup.destoyEach()
        money = money + 20;
    }
    
}
else if(gameState === END){

  
}

playerStore.display();



drawSprites();

textSize(20);
stroke(3);
fill("black")
text("Money: "+ money, camera.position.x,50)
}




function spawnCustomer() {
 
    if (frameCount % 150 === 0) {
  
      var customer = createSprite(camera.position.x+500,450,40,10);
  
      customer.velocityX = (-10);
      customer.scale =0.5;
  
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: customer.addImage(customer1);
                break;
        case 2: customer.addImage(customer2);
                break;
        case 3: customer.addImage(customer3);
                break;
        default: break;
      }
         
      customer.scale = 0.5;
      customer.lifetime = 500;
      
      customer.setCollider("rectangle",0,0,customer.width/2,customer.height/2);
      customerGroup.add(customer);
      
    }
}