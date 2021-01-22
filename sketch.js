var pos;
var backgroundI;
var hotairballoon,hotairballoonImg;

function preload(){
  backgroundI=loadImage("t1.png");
  hotairballoonImg=loadAnimation("t2.png","t3.png","t4.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(displayWidth,displayHeight);

  hotairballoon = createSprite(300,600);
  hotairballoon.addAnimation("back",hotairballoonImg)
  hotairballoon.scale=0.7

  var hotairballoonPosition = database.ref('balloon/position');
  hotairballoonPosition.on("value", readPosition, showError);

}

function draw() {

  background(backgroundI);  

  textSize(30);
  text("Use Arrow Keys To Move The Hot-Air-Balloon",30,50)
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    hotairballoon.scale= hotairballoon.scale-0.005

  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    hotairballoon.scale= hotairballoon.scale+0.005
  }
  drawSprites();

}

function writePosition(x,y){
database.ref('balloon/position').set({
  'x': position.x + x ,
  'y': position.y + y
})
}

function readPosition(data){
position = data.val();
console.log(position.x);
hotairballoon.x = position.x;
hotairballoon.y = position.y;
}

function showError(){
console.log("Error in writing to the database");
}

