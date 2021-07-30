import * as Utils from './utils'
import * as Codes from './charcodes'

describe('Lijnschrift', () => {
  describe('getCharCode', () => {
    it('returns correct code if character exists', () => {
      expect(Utils.getCharCode('A', Codes._default)).toBe('111')
    })
    it('returns default code if character doesnot exist', () => {
      expect(Utils.getCharCode('a', Codes._default)).toBe('333')
    })
  })
  describe('getCode', () => {
    it('converts to uppercase', () => {
      expect(Utils.getCode('Ab1', Codes._default)).toBe('111112333')
    })
  })
  describe('getSequence', () => {
    it('converts code to sequence of 0 1', () => {
      expect(Utils.getSequence('123')).toStrictEqual([1, 0, 1, 0, 0, 1])
    })
  })
  describe('getGrid', () => {
    it('even width', () => {
      expect(Utils.getGrid([1, 1, 1], 4)).toStrictEqual([
        [1, 0, 1, 0],
        [0, 1, 0, 0],
      ])
    })
    it('odd width (rounded up)', () => {
      expect(Utils.getGrid([1, 1, 1, 1], 3)).toStrictEqual([
        [1, 0, 1, 0],
        [0, 1, 0, 1],
      ])
    })
  })
  describe('getVLines', () => {
    it('getVLines', () => {
      expect(
        Utils.getVLines([
          [1, 0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 0],
        ])
      ).toStrictEqual([
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0],
      ])
    })
  })
  describe('getHLines', () => {
    it('getHLines', () => {
      expect(
        Utils.getHLines([
          [1, 0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 0],
        ])
      ).toStrictEqual([
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ])
    })
  })
})
