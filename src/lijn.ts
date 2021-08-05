import { getCode, getSequence, getGrid, getHLines, getVLines } from './utils'

class Lijn {
  static charCodes: ICharCodes = { DEFAULT: '0' }
  static svgPreset: ISVGPropsFull = {
    boxWidth: 0,
    padding: 0,
    strokeWidth: 0,
    strokeCap: 'butt',
    fillColor: 'currentColor',
    strokeColor: 'currentColor',
  }

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

  SVG(svgprops: ISVGProps) {
    const SVGProps = Object.assign(Lijn.svgPreset, svgprops)
    console.log(SVGProps);
    
    const viewboxWidth =
      2 * SVGProps.padding + (this.boxes.length + 2) * SVGProps.boxWidth
    const viewboxHeight =
      2 * SVGProps.padding + this.boxes[0].length * SVGProps.boxWidth
    return `
      <svg
        width="${viewboxWidth}"
        height="${viewboxHeight}"
        viewBox="0 0 ${viewboxWidth} ${viewboxHeight}"
        xmlns="http://www.w3.org/2000/svg"
        fill="${SVGProps.fillColor}"
        stroke="${SVGProps.strokeColor}"
        stroke-linecap="${SVGProps.strokeCap}"
        stroke-width="${SVGProps.strokeWidth}"
      >
        <rect
          x="0"
          y="0"
          width="${viewboxWidth}"
          height="${viewboxHeight}"
          stroke="none"
        />
        <g transform="translate(${SVGProps.padding} ${SVGProps.padding})">
          <g>
            ${this.HLines.map((col, i) => {
              return col
                .map((line, j) => {
                  return line === 1
                    ? `<line
                        x1="${i * SVGProps.boxWidth}"
                        y1="${j * SVGProps.boxWidth}"
                        x2="${(i + 1) * SVGProps.boxWidth}"
                        y2="${j * SVGProps.boxWidth}"
                      />`
                    : ''
                })
                .join('\n')
            }).join('\n')}
          </g>
          <g>
            ${this.VLines.map((col, i) => {
              return col
                .map((line, j) => {
                  return line === 1
                    ? `<line
                        x1="${i * SVGProps.boxWidth}"
                        y1="${j * SVGProps.boxWidth}"
                        x2="${i * SVGProps.boxWidth}"
                        y2="${(j + 1) * SVGProps.boxWidth}"
                      />`
                    : ''
                })
                .join('\n')
            }).join('\n')}
          </g>
        </g>
      </svg>
    `
  }
}

export default Lijn
