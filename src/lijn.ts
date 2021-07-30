import { getCode, getSequence, getGrid, getHLines, getVLines } from './utils'

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
