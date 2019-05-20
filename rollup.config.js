import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default [
  {
    file: 'lib/index.js',
    format: 'cjs',
  },
  {
    file: 'lib/m.js',
    format: 'esm',
  },
  {
    file: 'lib/umd.js',
    format: 'umd',
    name: 'Lib',
  },
].map(output => ({
  input: 'src/index.js',
  output,
  plugins: [
    babel({
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env', '@babel/preset-flow'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }),
    json(),
  ],
}));
