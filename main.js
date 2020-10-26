/// <reference path="./node_modules/@types/p5/global.d.ts" />
// https://p5js.org/get-started/

const BLOCK_SIZE = 32;

var game_field = [];

function setup() {
  createCanvas(800, 800);
  setupGameField();
  // frameRate(30);
}

// insert update function, update every X seconds (tetris lvl/ dynamic update delay)
function draw() {
  clear();
  drawGameField();
  drawFramerate();
}

function setupGameField() {
  for (let i = 0; i < 20; i++) {
    var row = [];
    for (let j = 0; j < 10; j++) {
      row.push(debugColorGen());
    }
    game_field.push(row);
  }
}

function drawGameField() {
  for (let i = 0; i < game_field[0].length; i++) {
    for (let j = 0; j < game_field.length; j++) {
      let item = game_field[j][i];
      drawCell(i * BLOCK_SIZE, j * BLOCK_SIZE, item);
    }
  }
}

function drawCell(x, y, color) {
  fill(color);
  stroke(64);
  rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
}

function debugColorGen() {
  if ( random(0, 100) < 10)
    return color(random(0, 255), random(0, 255), random(0, 255));
  else
    return color(0,0,0);
}

function drawFramerate() {
  text(`FPS: ${Math.round(frameRate())}`, BLOCK_SIZE * 10 + 20, 20);
}

class Block {

  constructor(type, position) {
    this.position = createVector(0, 0);
    this.color = BLOCK_TYPES.type
  }

  fastDrop() {

  }

  moveDown() {
    this.position.sub(0, 1);
  }

  moveLeft() {
    this.position.sub(1, 0);
  }

  moveRight() {
    this.position.add(1, 0);
  }

  rotateLeft() {

  }

  rotateRight() {
    
  }

}

const BLOCK_TYPES = {
  'I': {
    color: '#00f0f0',
    blocks: [[0, 0], [-1, 0], createVector(1, 0), createVector(2, 0)]
  },
  'J': {
    color: '#0000f0',
    blocks: [createVector(0, 0), createVector(-1, 0), createVector(-1, 1), createVector(1, 0)]
  },
  'L': {
    color: '#f0a000',
    blocks: [createVector(0, 0), createVector(-1, 0), createVector(1, 0), createVector(1, 1)]
  },
  'O': {
    color: '#f0f000',
    blocks: [createVector(0, 0), createVector(0, 1), createVector(1, 0), createVector(1, 1)]
  },
  'S': {
    color: '#00f000',
    blocks: [createVector(0, 0), createVector(-1, 0), createVector(0, 1), createVector(1, 1)]
  },
  'T': {
    color: '#a000f0',
    blocks: [createVector(0, 0), createVector(-1, 0), createVector(0, 1), createVector(1, 0)]
  }, 
  'Z': {
    color: '#f00000',
    blocks: [createVector(0, 0), createVector(-1, 1), createVector(0, 1), createVector(1, 1)]
  }
};