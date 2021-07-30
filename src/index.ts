import Lijn from './lijn.js'
import * as charCodes from './charcodes'
import * as svgPresets from './svgpresets'

Lijn.charCodes = charCodes._default
Lijn.svgPreset = svgPresets._default

export { Lijn as generator }
export * as charCodes from './charcodes'
export * as svgPresets from './svgpresets'