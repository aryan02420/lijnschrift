export function getCharCode(char: string, codes: ICharCodes): string {
  return codes[char] || codes.DEFAULT
}

export function getCode(str: string, codes: ICharCodes): string {
  return str
    .toUpperCase()
    .split('')
    .reduce((acc, val) => {
      return acc + getCharCode(val, codes)
    }, '')
}

export function getSequence(code: string): number[] {
  let seq: number[] = []
  code
  .split('')
  .map((x) => +x)
  .forEach((c) => {
    let temp = new Array(c)
    temp.fill(0)
    temp[temp.length - 1] = 1
    seq.push(...temp)
  })
  return seq
}

export function getGrid(sequence: number[], width: number = 6): number[][] {
  let colCounter: number = 0
  let row: number[] = []
  let grid: number[][] = []
  for (let i = 0; i < sequence.length; i++) {
    if (row.length >= width) {
      grid.push([...row])
      row.length = 0
      ++colCounter
    }
    if ((colCounter & 1) === 0) {
      row.push(sequence[i], 0)
    } else {
      row.push(0, sequence[i])
    }
  }
  while (row.length < width) {
    row.push(0,0)
  }
  grid.push([...row])
  return grid
}

export function getVLines(grid: number[][]): number[][] {
  let lines: number[] = []
  let vlines: number[][] = []
  const width: number = grid[0].length

  lines.length = 0
  for (let i = 0; i < width; i++) {
    lines.push(i & 1)
  }
  vlines.push([...lines])

  lines.length = 0
  for (let i = 0; i < width; i++) {
    lines.push(Number(grid[0][i] === 1))
  }
  vlines.push([...lines])

  grid.forEach((row, index) => {
    if (index === grid.length - 1) return
    lines.length = 0
    for (let i = 0; i < width; i++) {
      lines.push(Number(row[i] === 1 || grid[index + 1][i] === 1))
    }
    vlines.push([...lines])
  })

  lines.length = 0
  for (let i = 0; i < width; i++) {
    lines.push(Number(grid[grid.length - 1][i] === 1))
  }
  vlines.push([...lines])

  lines.length = 0
  for (let i = 0; i < width; i++) {
    lines.push(1 - (i & 1))
  }
  vlines.push([...lines])

  return vlines
}

export function getHLines(grid: number[][]): number[][] {
  let lines: number[] = []
  let hlines: number[][] = []
  const width: number = grid[0].length
  hlines.push(new Array(width + 1).fill(1))
  grid.forEach((row) => {
    lines.length = 0
    lines.push(Number(row[0] === 0))
    for (let i = 1; i < width; i++) {
      lines.push(Number(row[i] === 0 && row[i - 1] === 0))
    }
    lines.push(Number(row[width - 1] === 0))
    hlines.push([...lines])
  })
  hlines.push(new Array(width + 1).fill(1))
  return hlines
}

class Lijn {
  static charCodes: ICharCodes = { DEFAULT: '0' }

  text: string
  width: number
  sequence: number[]
  boxes: number[][]
  HLines: number[][]
  VLines: number[][]
  constructor(text: string, width: number = 6) {
    this.text = text
    this.width = width
    this.sequence = getSequence(getCode(this.text, Lijn.charCodes))
    this.boxes = getGrid(this.sequence, this.width)
    this.VLines = getVLines(this.boxes)
    this.HLines = getHLines(this.boxes)
  }
}

export default Lijn
