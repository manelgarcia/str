import pkg from './package.json'
import fs from 'fs'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve"

const getAllMethods = () => fs.readdirSync('./src/methods', 'utf8')
    .map(path => `./src/methods/${path}/${path}.ts`)

export default {
  input: ['./src/index.ts', ...getAllMethods()],
  output: [
    {
      dir: './dist/cjs',
      entryFileNames: '[name].js',
      format: 'cjs'
    },
    {
      dir: './dist/es',
      entryFileNames: '[name].mjs',
      format: 'es'
    },
    // {
    //   file: pkg.browser,
    //   format: 'iife',
    //   name: 'str'
    // }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    // resolve({ jsnext: true }),
    commonjs(),
    typescript({
      // rollupCommonJSResolveHack: true,
      clean: true,
      // useTsconfigDeclarationDir: false
    }),
    // terser()
  ]
}

