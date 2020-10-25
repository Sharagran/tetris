/// <reference path="./node_modules/@types/p5/global.d.ts" />
// https://p5js.org/get-started/

const BLOCK_SIZE = 32;

var game_field = [];

function setup() {
  createCanvas(800, 800);
  setupGameField();
}

// insert update function, update every X seconds (tetris lvl/ dynamic update delay)
function draw() {
  // clear();
  drawGameField();
  drawBlocks();
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

class Block {
  anchor = 0;
  color = color();

  fastDrop() {

  }
  moveDown() {

  }
  rotateLeft() {

  }
  rotateRight() {
    
  }
}