import { defineConfig } from 'vite'
import path from 'path'
import { commonPlugin } from './plugin'
const baseUrl = {
  development: './',
  release: './',
}
// https://vitejs.dev/config/
export default ({ mode, commen }) => {
  return defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'root-entry-name': 'variable',
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: [commonPlugin(commen)],
    base: baseUrl[mode],
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: /^@\//, replacement: path.resolve(__dirname) + '/src/' },
      ],
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // build: {
    //   rollupOptions: {
    //     external: ['react', 'react-dom'],
    //     // context: 'window',
    //     output: {
    //       globals: {
    //         react: 'React',
    //         'react-dom': 'ReactDOM',
    //       },
    //     },
    //   },
    // },
    build: {},
  })
}
