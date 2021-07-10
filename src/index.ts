import Lijn from './lijn'
import { huff3 } from './charcodes'
Lijn.charCodes = huff3
let text = 't !oothpick'
console.log(text)
let code = Lijn.getCode(text)
console.log(code)
let seq = new Lijn(text).sequence
console.log(seq)
let grid = Lijn.getGrid(seq, 6)
console.log(grid.map((row) => row.join('')).join('\n'))
let hl = Lijn.getHLines(grid)
console.log(hl);
let vl = Lijn.getVLines(grid)
console.log(vl);

