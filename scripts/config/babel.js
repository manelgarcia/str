export default {
  'presets': [
    ['@babel/preset-env',
      { 'modules': false
      }
    ]
  ],
  'plugins': [
    ['@babel/plugin-transform-modules-commonjs'
    ],
    'add-module-exports'
  ]
}