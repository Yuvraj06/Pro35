var balloon, balloonA, bg, database, position;

function preload(){
bg = loadImage("images/city.png");
balloonA = loadAnimation("images/1.png","images/2.png","images/3.png") 
}

function setup() {
  database = firebase.database();  
  
  createCanvas(800,800);

  database.ref('balloon/position').set({
    'x':250,
    'y':650
  })

  balloon = createSprite(250,650);
  balloon.addAnimation("balloonI",balloonA);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
  
}

function draw() {
  background(bg); 
  
  if(keyDown(UP_ARROW)){
    writePosition(0,-10);    
  }else if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
  }else if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }

  if(keyDown(UP_ARROW)){
    balloon.scale+=0.01;    
  }else if(keyDown(DOWN_ARROW)){
    balloon.scale-=0.01;
  }
  drawSprites();
}

function readPosition(data){

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y; 

}

function showError(){
  console.log("error");
}

function writePosition(x,y){

  database.ref('balloon/position').set({

    'x': position.x+x,
    'y': position.y+y

  })

}