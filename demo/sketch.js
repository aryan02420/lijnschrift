const LijnGen = Lijn.generator
LijnGen.charCodes = Lijn.charCodes.small

const STROKEWIDTH = 12
const BOXWIDTH = 24
const STROKECOLOR = 'white'
const FILLCOLOR = '#FD4400'
const PADDING = 24

const CONTENT = 'neography'
const SCRIPTWIDTH = 6

const L = new LijnGen(CONTENT, SCRIPTWIDTH)

function setup() {
  createCanvas(
    2 * PADDING + (L.boxes.length + 2) * BOXWIDTH,
    2 * PADDING + L.boxes[0].length * BOXWIDTH
  )
  background(FILLCOLOR)
  strokeCap(PROJECT)
  strokeWeight(STROKEWIDTH)
  stroke(STROKECOLOR)
  rectMode(CORNER)
  ellipseMode(CENTER)
  push()
  translate(PADDING, PADDING)
  drawHL(L.HLines)
  drawVL(L.VLines)
  drawBoxes(L.boxes)
  pop()
}

function drawHL(hlines) {
  for (let i = 0; i < hlines.length; i++) {
    for (let j = 0; j < hlines[i].length; j++) {
      hlines[i][j] &&
        line(i * BOXWIDTH, j * BOXWIDTH, (i + 1) * BOXWIDTH, j * BOXWIDTH)
    }
  }
}

function drawVL(vlines) {
  for (let i = 0; i < vlines.length; i++) {
    for (let j = 0; j < vlines[i].length; j++) {
      vlines[i][j] &&
        line(i * BOXWIDTH, j * BOXWIDTH, i * BOXWIDTH, (j + 1) * BOXWIDTH)
    }
  }
}

function drawBoxes(boxes) {
  push()
  translate(1.5 * BOXWIDTH, 0.5 * BOXWIDTH)
  noStroke()
  fill(STROKECOLOR)
  let SIZE = BOXWIDTH / 6
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      boxes[i][j] && ellipse(i * BOXWIDTH, j * BOXWIDTH, SIZE)
    }
  }
  pop()
}
