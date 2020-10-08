//Create variables heres
var dogImg, happyDogImg, foodS, foodStock;
var database;

//sprites here
var dogSprite;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}


function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dogSprite = createSprite(300,200);
  dogSprite.addImage(dogImg);
  dogSprite.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46,139,87); 

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  fill(255);
  textSize(25);
  stroke(255);
  text("Stock: " + foodS,250,100);
  text("Press the up arrow to feed the dog", 290,150);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if (x<=0){
    x = 0;
  }else {
    x=x-1;
  }

  database.ref('/').update({ 
    'food': x
  })
}
