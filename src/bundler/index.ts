import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const bundle = async (rawCode: string | undefined, ref: any) => {
  if (!ref.current) {
    //EsBuild webAss file is hosted on unpkg, instead of hosting it in browser, better to work with
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm'
    });
    ref.current = true;
  }

  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  });

  return result.outputFiles[0].text;
};

export default bundle;
