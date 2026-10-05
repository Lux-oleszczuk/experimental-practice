// use to store all shapes
let allShapes = [];
let buttons = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
  let offset=((width-(SoundButton.Width*6))/2);
  for(let i=0;i<6;i++){
    let button = new SoundButton(i,i*SoundButton.Width,height-SoundButton.Height,color(random(255),random(255),random(255)));
    buttons.push(button);
  }
  _renderer.canvas.addEventListener("soundButtonPressed",placeShape)
  
}
function placeShape(event){
  let buttonCircle = new Circle(event.detail.x,event.detail.y, random(20,100), event.detail.colour,random(2000,5000),random(-2,2),random(-2,2))
  allShapes.push(buttonCircle)
}

function draw() {
  //process interaction
  if (mouseIsPressed) {
    let myShape = new Circle(mouseX, mouseY, random(10, 100), color(random(255), random(255), random(255)), random(2000, 4000), random(-5,5), random(-5,5))
    allShapes.push(myShape)
  }
  // process updated
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update()
    if(allShapes[i].dead){
      allShapes.splice(i,1);
      i--;
    }
  }
  //update buttons
  for(let i=0;i<buttons.length;i++){
    buttons[i].update();
  }
  //render (draw)
  background(220);
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw()
  }
  // loop through and draw all buttons
  for(let i=0;i<buttons.length;i++){
    buttons[i].draw()
  }
}
