let songs = [];  // array of song objects
let covers = [];
let boxes = [];

function preload() {
  covers.push(loadImage("assets/images/chief.jpg"));
  covers.push(loadImage("assets/images/black_kray.jpg"));
  covers.push(loadImage("assets/images/talking_heads.jpg"));
  covers.push(loadImage("assets/images/jaeychino.jpg"));
  covers.push(loadImage("assets/images/glokk.jpg"));
  covers.push(loadImage("assets/images/4am.jpg"));

  songs.push(loadSound("assets/sounds/chief.mp3"));
  songs.push(loadSound("assets/sounds/black_kray.mp3"));
  songs.push(loadSound("assets/sounds/talking_heads.mp3"));
  songs.push(loadSound("assets/sounds/jaeychino.mp3"));
  songs.push(loadSound("assets/sounds/glokk.mp3"));
  songs.push(loadSound("assets/sounds/4am.mp3"));
}

function setup() {
  // calculate rows based on number of covers (2 per row by default)
  let cols = 2;
  let rows = ceil(covers.length / cols);
  
  let paddingTop = 80; // space for header
  let boxH = 250;      // height for each box
  let canvasHeight = paddingTop + rows * boxH;
  createCanvas(900, canvasHeight); // canvas height adjusts automatically

  let boxW = width / cols;

  // create boxes dynamically
  for (let i = 0; i < covers.length; i++) {
    let x = (i % cols) * boxW;
    let y = paddingTop + floor(i / cols) * boxH;
    boxes[i] = new ScratchBox(x, y, boxW, boxH, covers[i], songs[i]);
  }
}

function draw() {
  background(220);

  // TOP CENTER TITLE
textAlign(CENTER);
textSize(20);
fill(0);
text("Welcome to my SoundCloud repost discovery game!!", width/2, 30);
text("Try not to merge songs or you will have to refresh. GOOD LUCK :D", width/2, 55);
text("Keep scratching! If you finish the first song and don't like it, I've added a variety in this code.", width/2, 80);


  // display all boxes
  for (let b of boxes) {
    b.show();
  }
}

function mouseDragged() {
  for (let b of boxes) {
    b.scratch(mouseX, mouseY);
  }
}

// unlock audio once
function mousePressed() {
  userStartAudio();
}

// ---------------------------
// ScratchBox class
// ---------------------------
class ScratchBox {
  constructor(x, y, w, h, img, sound) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.sound = sound;

    this.topLayer = createGraphics(w, h);
    this.topLayer.background(200);  // gray overlay
    this.played = false;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
    image(this.topLayer, this.x, this.y);
  }

  scratch(mx, my) {
    if (mx > this.x && mx < this.x + this.w &&
        my > this.y && my < this.y + this.h) {

      // start music once
      if (!this.played) {
        this.sound.play();
        this.played = true;
      }

      // scratch effect
      this.topLayer.erase();
      this.topLayer.ellipse(mx - this.x, my - this.y, 50, 50);
      this.topLayer.noErase();
    }
  }
}
