/* global describe, it */
import { expect } from 'chai'
import str from '../src'

import slugify from '../src/methods/slugify'
import trim from '../src/methods/trim'
import lower from '../src/methods/lower'
import count from '../src/methods/count'
import upper from '../src/methods/upper'
import startsWith from '../src/methods/startsWith'
import endsWith from '../src/methods/endsWith'
import capitalize from '../src/methods/capitalize'

describe('str individual methods test suite', () => {
  it('should capitalize a string', () =>
    expect(capitalize('test ')).to.equal('Test')
  )

  it('should check if a string ends with a substring', () =>
    expect(endsWith('test', 'st')).to.equal(true)
  )

  it('should check if a string ends with a substring in certain position', () =>
    expect(endsWith('testing', 'test', 4)).to.equal(true)
  )

  it('should check if a string starts with a substring', () =>
    expect(startsWith('test', 'te')).to.equal(true)
  )

  it('should check if a string starts with a substring in certain position', () =>
    expect(startsWith('testing', 'st', 2)).to.equal(true)
  )

  it('should transform a string to uppercase', () =>
    expect(upper('test')).to.equal('TEST'))

  it('should count characters in a string', () =>
    expect(count('test')).to.equal(4))

  it('should slugify a string', () => {
    const text = 'EstO És 1N ÈjemPlo'
    const result = 'esto-es-1n-ejemplo'
    expect(slugify(text)).to.equal(result)
  })

  it('should slugify a string with custom delimiter', () => {
    const text = 'EstO És 1N ÈjemPlo'
    const result = 'esto:es:1n:ejemplo'
    expect(slugify(text, ':')).to.equal(result)
  })

  it('should trim a string left and right', () => {
    const text = ' Ejemplo '
    const result = 'Ejemplo'
    expect(trim(text)).to.equal(result)
  })

  it('should lower case a string', () => {
    const text = 'EJEMPLO'
    const result = 'ejemplo'
    expect(lower(text)).to.equal(result)
  })
})

describe('str class test suite', () => {
  it('should capitalize a string', () =>
    expect(str('test ').capitalize().value).to.equal('Test')
  )

  it('should check if a string ends with a substring', () =>
    expect(str('test').endsWith('st')).to.equal(true)
  )

  it('should check if a string starts with a substring', () =>
    expect(str('test').startsWith('te')).to.equal(true)
  )

  it('should transform a string to uppercase', () =>
    expect(str('test').upper().value).to.equal('TEST')
  )

  it('should count characters in a string', () =>
    expect(str('test').length).to.equal(4)
  )

  it('should count characters in a string using the function', () =>
    expect(str('test').count()).to.equal(4)
  )

  it('should slugify a string', () => {
    const text = 'EstO És 1N ÈjemPlo'
    const result = 'esto-es-1n-ejemplo'
    expect(str(text).slugify().value).to.equal(result)
  })

  it('should slugify a string with custom delimiter', () => {
    const text = 'EstO És 1N ÈjemPlo'
    const result = 'esto:es:1n:ejemplo'
    expect(str(text).slugify(':').value).to.equal(result)
  })

  it('should trim a string left and right', () => {
    const text = ' Ejemplo '
    const result = 'Ejemplo'
    expect(str(text).trim().value).to.equal(result)
  })

  it('should lower case a string', () => {
    const text = 'EJEMPLO'
    const result = 'ejemplo'
    expect(str(text).lower().value).to.equal(result)
  })
})
