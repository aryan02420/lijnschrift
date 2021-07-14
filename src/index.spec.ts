import * as LijnUtils from './lijn'
import * as LijnCodes from './charcodes'

describe('Lijnschrift', () => {
  describe('getCharCode', () => {
    it('returns correct code if character exists', () => {
      expect(LijnUtils.getCharCode('A', LijnCodes._default)).toBe('111')
    })
    it('returns default code if character doesnot exist', () => {
      expect(LijnUtils.getCharCode('a', LijnCodes._default)).toBe('333')
    })
  })
  describe('getCode', () => {
    it('converts to uppercase', () => {
      expect(LijnUtils.getCode('Ab1', LijnCodes._default)).toBe('111112333')
    })
  })
  describe('getSequence', () => {
    it('converts code to sequence of 0 1', () => {
      expect(LijnUtils.getSequence('123')).toStrictEqual([1, 0, 1, 0, 0, 1])
    })
  })
  describe('getGrid', () => {
    it('even width', () => {
      expect(LijnUtils.getGrid([1, 1, 1], 4)).toStrictEqual([
        [1, 0, 1, 0],
        [0, 1, 0, 0],
      ])
    })
    it('odd width (rounded up)', () => {
      expect(LijnUtils.getGrid([1, 1, 1, 1], 3)).toStrictEqual([
        [1, 0, 1, 0],
        [0, 1, 0, 1],
      ])
    })
  })
  describe('getVLines', () => {
    it('getVLines', () => {
      expect(
        LijnUtils.getVLines([
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
        LijnUtils.getHLines([
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
