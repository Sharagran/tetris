/// <reference path="./node_modules/@types/p5/global.d.ts" />
// https://p5js.org/get-started/

const BLOCK_SIZE = 32;
var game_field = [];
var current_block;


function setup() {
  createCanvas(800, 800);
  setupGameField();
  angleMode(DEGREES);
  current_block = new Tetromino('T', createVector(5, 10));
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
  stroke(64);
  for (let i = 0; i < game_field[0].length; i++) {
    for (let j = 0; j < game_field.length; j++) {
      let item = game_field[j][i];
      drawCell(i, j, item);
    }
  }
}

function drawCell(x, y, color) {
  fill(color);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function blockPlaced() {
  checkLines();
  current_block = new Tetromino('O', createVector(5, 10));
}

function checkLines() {
  var fullLines = 0;
  for (let i = 0; i < game_field.length; i++) {
    const row = game_field[i];
    var fullLine = true;
    for (let j = 0; j < row.length; j++) {
      const element = row[j];
      if(element == 0) {
        fullLine = false;
        break;
      }
    }

    if(fullLine) {
      fullLines++;
      // clear line and move everything above 1 down
      game_field.splice(i, 1);
      game_field.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
  }

  // TODO: calculate SCORE with FULLLINES here
}

function drawFramerate() {
  fill(0);
  stroke(0);
  text(`FPS: ${Math.round(frameRate())}`, BLOCK_SIZE * 10 + 20, 20);
}


// ===== Controls =====
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      current_block.moveLeft();
      return false;
    case RIGHT_ARROW:
      current_block.moveRight();
      return false;
    case DOWN_ARROW:
      current_block.softDrop();
      return false;
    case UP_ARROW:
      current_block.rotateRight();
      return false;
    case 90:  // Z
    current_block.rotateLeft();
    return false;
    case 32:  //SPACEBAR
      current_block.hardDrop();
      return false;
    case 67:  // C
      //TODO: insert hold function
      return false;
  }
  return true; // prevent default
}

class Tetromino {

  constructor(type, position) {
    type = TETROMINOS_TYPES[type];
    this.position = position;
    this.rotation = 0;

    this.color = color(TETROMINOS[type].color);
    this.blocks = [];

    TETROMINOS[type].blocks.forEach(coordinate => {
      this.blocks.push(createVector(this.position.x, this.position.y).add(coordinate[0], coordinate[1])); // X, Y
    });
  }

  render() {
    this.blocks.forEach(block => {
      drawCell(block.x, block.y, this.color);
    });
  }

  hardDrop() {
    this.place();
  }

  softDrop() {
    if (this.collisionCheck(0, 1) == false)
      this.moveBlocks(0, 1);
  }

  moveLeft() {
    if (this.collisionCheck(-1, 0) == false)
      this.moveBlocks(-1, 0);
  }

  moveRight() {
    if (this.collisionCheck(1, 0) == false)
      this.moveBlocks(1, 0);
  }

  moveBlocks(vectorX, vectorY) {
    this.position.add(vectorX, vectorY);
    this.blocks.forEach(vector => {
      vector.add(vectorX, vectorY);
    });
  }

  collisionCheck(vectorX, vectorY) {
    var checkResult = false;
    if (vectorX != 0) {
      this.blocks.forEach(block => {
        var newX = block.x + vectorX;
        if (newX < 0 || newX >= 10 || game_field[block.y][newX] != 0) {
          checkResult = true;
          return;
        }
      });
    } else if (vectorY != 0) {
      this.blocks.forEach(block => {
        var newY = block.y + vectorY;
        if (newY >= 20 || game_field[newY][block.x] != 0) {
          checkResult = true;
          return;
        }
      });
    }

    return checkResult;
  }

  rotateLeft() {
    this.rotation -= 90;
    translate(this.position);
    rotate(this.rotation);
  }

  rotateRight() {
    console.log("rotate right");
    this.rotation += 90;
    translate(this.position);
    rotate(this.rotation);
  }

  place() {
    this.blocks.forEach(block => {
      game_field[block.y][block.x] = this.color;
      blockPlaced();
    });
  }

}

const TETROMINOS_TYPES = {
  I: 0,
  J: 1,
  L: 2,
  O: 3,
  S: 4,
  T: 5,
  Z: 6,
};
const TETROMINOS = [
  {
    type: 'I-Block',
    color: '#00f0f0',
    blocks: [[0, 0], [-1, 0], [1, 0], [2, 0]]
  },
  {
    type: 'J-Block',
    color: '#0000f0',
    blocks: [[0, 0], [-1, 0], [-1, -1], [1, 0]]
  },
  {
    type: 'L-Block',
    color: '#f0a000',
    blocks: [[0, 0], [-1, 0], [1, 0], [1, -1]]
  },
  {
    type: 'O-Block',
    color: '#f0f000',
    blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
  },
  {
    type: 'S-Block',
    color: '#00f000',
    blocks: [[0, 0], [-1, 1], [0, 1], [1, 0]]
  },
  {
    type: 'T-Block',
    color: '#a000f0',
    blocks: [[0, 0], [-1, 0], [0, 1], [1, 0]]
  },
  {
    type: 'Z-Block',
    color: '#f00000',
    blocks: [[0, 0], [-1, 0], [0, 1], [1, 1]]
  }
];