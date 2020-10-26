/// <reference path="./node_modules/@types/p5/global.d.ts" />
// https://p5js.org/get-started/

const BLOCK_SIZE = 32;
var game_field = [];
var current_block;


function setup() {
  createCanvas(800, 800);
  setupGameField();
  current_block = new Block('L', createVector(5, 10));
  // frameRate(30);
}

// TODO: insert update function, update every X seconds (tetris lvl/ dynamic update delay)
function draw() {
  clear();
  drawGameField();
  current_block.render();

  drawFramerate();
}

function setupGameField() {
  for (let i = 0; i < 20; i++) {
    var row = [];
    for (let j = 0; j < 10; j++) {
      row.push(0);
      // row.push(debugColorGen());
    }
    game_field.push(row);
  }
}

function drawGameField() {
  for (let i = 0; i < game_field[0].length; i++) {
    for (let j = 0; j < game_field.length; j++) {
      let item = game_field[j][i];
      stroke(64);
      drawCell(i * BLOCK_SIZE, j * BLOCK_SIZE, item);
    }
  }
}

function drawCell(x, y, color) {
  fill(color);
  rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
}

function debugColorGen() {
  if ( random(0, 100) < 10)
    return color(random(0, 255), random(0, 255), random(0, 255));
  else
    return color(0,0,0);
}

function drawFramerate() {
  fill(0);
  stroke(0);
  text(`FPS: ${Math.round(frameRate())}`, BLOCK_SIZE * 10 + 20, 20);
}

class Block {

  constructor(type, position) {
    type = BLOCK_TYPES[type];
    this.position = position;

    this.color = color(BLOCKS[type].color);
    this.blocks = [];

    BLOCKS[type].blocks.forEach(coordinate => {
      this.blocks.push(createVector(this.position.x, this.position.y).add(coordinate[0], coordinate[1])); // X, Y
    });
  }

  render() {
    this.blocks.forEach(block => {
      stroke(this.color);
      drawCell(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, this.color);
    });
  }

  fastDrop() {

  }

  moveDown() {
    this.moveBlocks(0, -1);
  }

  moveLeft() {
    this.moveBlocks(-1, 0);
  }

  moveRight() {
    this.moveBlocks(1, 0);
  }

  moveBlocks(vectorX, vectorY) {
    this.position.add(vectorX, vectorY);
    this.blocks.forEach(vector => {
      vector.add(vectorX, vectorY);
    });
  }

  rotateLeft() {

  }

  rotateRight() {
    
  }

}

const BLOCK_TYPES = {
  I: 0,
  J: 1,
  L: 2,
  O: 3,
  S: 4,
  T: 5,
  Z: 6,
};
const BLOCKS = [
  {
    type: 'I-Block',
    color: '#00f0f0',
    blocks: [[0, 0], [-1, 0], [1, 0], [2, 0]]
  },
  {
    type: 'J-Block',
    color: '#0000f0',
    blocks: [[0, 0], [-1, 0], [-1, 1], [1, 0]]
  },
  {
    type: 'L-Block',
    color: '#f0a000',
    blocks: [[0, 0], [-1, 0], [1, 0], [1, 1]]
  },
  {
    type: 'O-Block',
    color: '#f0f000',
    blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
  },
  {
    type: 'S-Block',
    color: '#00f000',
    blocks: [[0, 0], [-1, 0], [0, 1], [1, 1]]
  },
  {
    type: 'T-Block',
    color: '#a000f0',
    blocks: [[0, 0], [-1, 0], [0, 1], [1, 0]]
  }, 
  {
    type: 'Z-Block',
    color: '#f00000',
    blocks: [[0, 0], [-1, 1], [0, 1], [1, 1]]
  }
];