const Lijn = require('../dist/lijn').generator

console.log(Lijn.getGrid(new Lijn('toothpick').sequence))
console.log(new Lijn('toothpick').boxes)
