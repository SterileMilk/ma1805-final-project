let topImages = [];
let bottomImages = [];
let currentIndex = 0;
let maskGraphics;

function preload() {
  // images (will add more when i figure out how to properly scratch)
  topImages[0] = loadImage('assets/images/black_kray.jpg');
  bottomImages[0] = loadImage('assets/images/jaeychino.jpg');

  topImages[1]= loadImage('assets/images/jaeychino.jpg');
  bottomImages[1]= loadImage('assets/images/talking_heads.jpg');

  topImages[2] =   loadImage('assets/images/talking_heads.jpg');
  bottomImages[2] = loadImage('assets/images/chief.jpg');

  topImages[3] =   loadImage('assets/images/chief.jpg');
  bottomImages[3]= loadImage('assets/images/black_kray.jpg'); // doesnt loop back :()
}

//will make canvas bigger 
function setup() {
  createCanvas(600, 400);
  maskGraphics = createGraphics(width, height);
  maskGraphics.background(255);
}

function draw() {
  let topImg = topImages[currentIndex];
  let bottomImg = bottomImages[currentIndex];

  let masked = topImg.get();
  masked.mask(maskGraphics);

  image(bottomImg, 0, 0, width, height);
  image(masked, 0, 0, width, height);
}


function mouseDragged() {
  //maskGraphics.noStroke();
  //maskGraphics.fill(0);
  //maskGraphics.ellipse(mouseX, mouseY, 50, 50);
  image(bottomImages[3], 0, 0, width, height);
  fill(255,0,0);
  ellipse(50, 50, 50)
}

//this works but i want it to to automatically move on to the next image when scratching is complete
function mousePressed() {
  //maskGraphics.background(255);  
  currentIndex++; // nopt sure what this is
  topImages[3] =   loadImage('assets/images/chief.jpg');
  console.log(currentIndex);
  if(currentIndex==topImages.length){
    currentIndex = 0;
  }

}