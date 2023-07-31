import { expect, test } from 'vitest'
import { generateColor } from './util'
import { Color } from './color'

test('color rgb to cmyk', () => {
  expect(Color.rgbToCmyk(generateColor('rgb(0, 0, 0)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 100,
      "m": 0,
      "y": 0,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(255, 255, 255)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 0,
      "y": 0,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(255, 0, 0)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 100,
      "y": 100,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(0, 255, 0)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 0,
      "y": 100,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(0, 0, 255)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 100,
      "y": 0,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(255, 255, 0)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 0,
      "y": 100,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(0, 255, 255)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 100,
      "k": 0,
      "m": 0,
      "y": 0,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(255, 0, 255)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 0,
      "m": 100,
      "y": 0,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(175, 63, 75)').toRgb())).toMatchInlineSnapshot(`
    {
      "c": 0,
      "k": 31,
      "m": 64,
      "y": 57,
    }
  `)
  expect(Color.rgbToCmyk(generateColor('rgb(176, 63, 76)').toRgb())).toMatchInlineSnapshot(`
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
      "b": 76,
      "g": 63,
      "r": 176,
    }
  `)
})
