import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'abort', // 这里指定了模块名称为 MyLibrary
    },
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' }), terser()],
}
