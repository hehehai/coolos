import { expect, test } from 'vitest'
import { generateColor } from './util'
import { Color } from './color'
import names from './data/names.json'

test('color rgb to cmyk', () => {
  expect(generateColor('rgb(0, 0, 0)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 100,
      "m": 0,
      "y": 0,
    }
  `)
  expect(generateColor('rgb(255, 255, 255)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 0,
      "y": 0,
    }
  `)
  expect(generateColor('rgb(255, 0, 0)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 100,
      "y": 100,
    }
  `)
  expect(generateColor('rgb(0, 255, 0)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 0,
      "y": 100,
    }
  `)
  expect(generateColor('rgb(0, 0, 255)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 100,
      "y": 0,
    }
  `)
  expect(generateColor('rgb(255, 255, 0)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 0,
      "y": 100,
    }
  `)
  expect(generateColor('rgb(0, 255, 255)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 0,
      "y": 0,
    }
  `)
  expect(generateColor('rgb(255, 0, 255)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 100,
      "y": 0,
    }
  `)
  expect(generateColor('rgb(175, 63, 75)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 31,
      "m": 64,
      "y": 57,
    }
  `)
  expect(generateColor('rgb(176, 63, 76)').toCmyk()).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 31,
      "m": 64,
      "y": 57,
    }
  `)
})

test('color cmyk to rgb', () => {
  expect(Color.cmykToRgb({ "c": 0, "k": 100, "m": 0, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 0,
      "r": 0,
    }
  `)

  expect(Color.cmykToRgb({ "c": 0, "k": 100, "m": 0, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 0,
      "r": 0,
    }
  `)
  expect(Color.cmykToRgb({ "c": 0, "k": 0, "m": 0, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 255,
      "r": 255,
    }
  `)
  expect(Color.cmykToRgb({ "c": 0, "k": 0, "m": 100, "y": 100, })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 0,
      "r": 255,
    }
  `)
  expect(Color.cmykToRgb({ "c": 100, "k": 0, "m": 0, "y": 100, })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 255,
      "r": 0,
    }
  `)
  expect(Color.cmykToRgb({ "c": 100, "k": 0, "m": 100, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 0,
      "r": 0,
    }
  `)
  expect(Color.cmykToRgb({ "c": 0, "k": 0, "m": 100, "y": 100, })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 0,
      "r": 255,
    }
  `)
  expect(Color.cmykToRgb({ "c": 100, "k": 0, "m": 0, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 255,
      "r": 0,
    }
  `)
  expect(Color.cmykToRgb({ "c": 0, "k": 0, "m": 100, "y": 0, })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 0,
      "r": 255,
    }
  `)
  expect(Color.cmykToRgb({ "c": 0, "k": 31, "m": 64, "y": 57, })).toMatchInlineSnapshot(`
    {
      "b": 75.6585,
      "g": 63.34199999999999,
      "r": 175.95,
    }
  `)
})

test('colot rgb to lab', () => {
  expect(generateColor('rgb(0, 0, 0)').toLab()).toMatchInlineSnapshot(`
    {
      "a": 0,
      "b": 0,
      "l": 0,
    }
  `)
  expect(generateColor('rgb(255, 255, 255)').toLab()).toMatchInlineSnapshot(`
    {
      "a": -0.000011729228754919774,
      "b": 0.000005144762482700571,
      "l": 100,
    }
  `)
  expect(generateColor('rgb(255, 0, 0)').toLab()).toMatchInlineSnapshot(`
    {
      "a": 80.81243175889557,
      "b": 69.8850744848609,
      "l": 54.29173546502365,
    }
  `)
  expect(generateColor('rgb(0, 0, 255)').toLab()).toMatchInlineSnapshot(`
    {
      "a": 68.29859917400464,
      "b": -112.02941005918544,
      "l": 29.567582570569506,
    }
  `)
  expect(generateColor('rgb(0, 255, 0)').toLab()).toMatchInlineSnapshot(`
    {
      "a": -79.2872863932051,
      "b": 80.99026038511582,
      "l": 87.81813005327668,
    }
  `)
  expect(generateColor('rgb(150, 54, 142)').toLab()).toMatchInlineSnapshot(`
    {
      "a": 48.77142053308855,
      "b": -28.87396637415157,
      "l": 39.69863259244521,
    }
  `)
})

test('color lab to rgb', () => {
  expect(Color.labToRgb({ a: 0, b: 0, l: 100 })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 255,
      "r": 254.99999515386895,
    }
  `)
  expect(Color.labToRgb({ a: 80, b: 67, l: 53 })).toMatchInlineSnapshot(`
    {
      "b": 6.529024668107394,
      "g": 0,
      "r": 249.56251194271138,
    }
  `)
  expect(Color.labToRgb({ a: 79, b: -108, l: 32 })).toMatchInlineSnapshot(`
    {
      "b": 255,
      "g": 0,
      "r": 88.63496750097957,
    }
  `)
  expect(Color.labToRgb({ a: -86, b: 83, l: 88 })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 255,
      "r": 0,
    }
  `)
  expect(Color.labToRgb({ a: 40, b: -24, l: 63 })).toMatchInlineSnapshot(`
    {
      "b": 196.35877769959149,
      "g": 124.54252434633868,
      "r": 205.38548651896227,
    }
  `)
  expect(Color.labToRgb({ a: -128, b: 127, l: 50 })).toMatchInlineSnapshot(`
    {
      "b": 0,
      "g": 154.02844246809096,
      "r": 0,
    }
  `)
})

test.only('find closest color', () => {
  const colors = [
    ['rgb(205, 92, 92)', 'IndianRed'],
    ['rgb(203, 91, 91)', 'IndianRed'],
    ['rgb(220, 20, 60)', 'Crimson'],
    ['rgb(245, 245, 3)', 'Yellow'],
  ]

  colors.forEach(([val, name]) => {
    expect(generateColor(val).findClosestColor(names as any)).toBe(name)
  })

  const colors2 = [
    ['rgb(255, 0, 255)', 'Orchid'],
    ['rgb(252, 2, 250)', 'Orchid'],
    ['rgb(0, 128, 0)', 'DarkGreen'],
    ['rgb(176, 224, 230)', 'LightBlue'],
  ]

  colors2.forEach(([val, name]) => {
    expect(generateColor(val).findClosestColor(names as any)).not.toBe(name)
  })
})

test('find closest color same get first', () => {
  const colors = [
    ['rgb(0, 255, 255)', 'Aqua'],
    ['rgb(255, 0, 255)', 'Fuchsia'],
  ]

  colors.forEach(([val, name]) => {
    expect(generateColor(val).findClosestColor(names as any)).toBe(name)
  })
})
