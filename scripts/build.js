import { rollup } from 'rollup'
import rimraf from 'rimraf'
import * as babel from '@babel/core'
import fs from 'fs'
import path from 'path'
import rollupOpts from './config/rollup'
import rollupMinOpts from './config/rollup.min'
import babelOpts from './config/babel'

const build = async () => {
  try {
    // Delete dist folder
    rimraf.sync('./dist')

    // Create main bundle
    const bundle = await rollup({ input: rollupOpts.input, plugins: rollupOpts.plugins })
    await bundle.generate({ ...rollupOpts.output[0] })
    await bundle.write({ ...rollupOpts.output[0] })

    // Create minified bundle with sourcemaps
    const bundleMin = await rollup({ input: rollupMinOpts.input, plugins: rollupMinOpts.plugins })
    await bundleMin.generate({ ...rollupMinOpts.output[0] })
    await bundleMin.write({ ...rollupMinOpts.output[0] })

    // Transform functions and copy them to dist
    const route = path.join(__dirname, '../src/methods')
    const methods = fs.readdirSync(route)

    for (let method of methods) {
      const file = route + '/' + method
      const fileDest = path.join(__dirname, '../dist', method)
      const code = fs.readFileSync(file, 'utf-8')
      const result = await babel.transformAsync(code, babelOpts)
      fs.writeFileSync(fileDest, result.code, 'utf-8')
    }

    // Entry point
    const file = path.join(__dirname, '../src/index.js')
    const fileDest = path.join(__dirname, '../dist/index.js')
    const code = fs.readFileSync(file, 'utf-8')
    const result = await babel.transformAsync(code, babelOpts)
    fs.writeFileSync(fileDest, result.code, 'utf-8')

    // Copy package.json README ...
    fs.writeFileSync(
      path.join(__dirname, '../dist/', 'package.json'),
      fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
      'utf-8'
    )
  } catch (err) {
    throw err
  }
}

build()
  .catch(err => {
    console.error(err)
    throw err
  })
