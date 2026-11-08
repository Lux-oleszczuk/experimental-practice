// Each shape owns its movement, colour and lifetime through the Shape class.
let allShapes = [];
let selectedShape = 'circle';
let selectedColour = '#75e2cf';
let drawing = false;
let lastSpawn = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.setAttribute('aria-label', 'Interactive shape drawing area');
  canvas.elt.addEventListener('pointerdown', () => { drawing = true; });
  window.addEventListener('pointerup', () => { drawing = false; });
  window.addEventListener('blur', () => { drawing = false; });
  for (const name of ['circle', 'square']) {
    document.getElementById(name).addEventListener('click', () => {
      selectedShape = name;
      for (const choice of ['circle', 'square']) {
        document.getElementById(choice).setAttribute('aria-pressed', String(choice === name));
      }
    });
  }
  document.querySelectorAll('[data-colour]').forEach(button => {
    button.addEventListener('click', () => {
      selectedColour = button.dataset.colour;
      document.querySelectorAll('[data-colour]').forEach(choice => {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
    });
  });
  document.getElementById('clear').addEventListener('click', () => { allShapes = []; });
}

function draw() {
  background('#101820');
  // Throttle spawning so holding the mouse does not create an object every frame.
  if (drawing && mouseIsPressed && millis() - lastSpawn > 32 &&
      mouseX >= 0 && mouseX <= width && mouseY > 175 && mouseY < height - 145) {
    const ShapeType = selectedShape === 'square' ? Square : Circle;
    allShapes.push(new ShapeType(mouseX, mouseY, random(24, 85), color(selectedColour),
      random(2500, 5000), random(-2, 2), random(-2, 2)));
    lastSpawn = millis();
  }
  for (let i = allShapes.length - 1; i >= 0; i--) {
    allShapes[i].update();
    if (allShapes[i].dead) allShapes.splice(i, 1);
    else allShapes[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Keep existing particles inside the resized drawing area.
  for (const shape of allShapes) {
    shape.x = constrain(shape.x, shape.size / 2, width - shape.size / 2);
    shape.y = constrain(shape.y, shape.size / 2, height - shape.size / 2);
  }
}
