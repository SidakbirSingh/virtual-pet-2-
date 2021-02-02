//Create variables here
var dog,dogImage,happyDog;
var database;
var foodS,foodStock;
var feedPet,addFood;
var lastFed,foodObj;
var fedTime;
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1500,500);
  database = firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);


  dog=createSprite(850,200,20,20)
  dog.addImage(dogImage)
  dog.scale=0.3

  feedPet=createButton("Feed Pet")
  feedPet.position(1200,100 )
  feedPet.mousePressed(feedDog)
  addFood=createButton("Add Food")
  addFood.position(1500,100)
  addFood.mousePressed(addFoods)

  foodObj=new Food()
}


function draw() {  
background(46,139,87)

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254)
textSize(25)
if(lastFed>=12){
  text("Last Fed :"+lastFed%12+"PM",350,100)
}else if(lastFed===0){
  text("Last Fed : 12 AM",350,100)
}else{
  text("Last Fed :" + lastFed+"AM",350,100)
}


drawSprites()

foodObj.display()
  //add styles here
 /* textSize(25)
  stroke("green")
  strokeWeight(5)
  fill("lightGreen")
text("Note: Press Up Arrow Key To Feed Drago Milk!",200,100)*/
textSize(25)
//text("Food: "+foodS,200,270)
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
x=x-1;
  }
}

function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref("/").update({
   Food:foodS
  })
}