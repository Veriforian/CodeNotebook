import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

import CodeEditor from './components/code-editor';

//Simple Code Display Example for learning ESBUILDwasm in browser
const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState<string | undefined>('');

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    //EsBuild webAss file is hosted on unpkg, instead of hosting it in browser, better to work with
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm'
    });
    ref.current = true;
  };

  const onClick = async () => {
    //Handles unloaded break error
    if (!ref.current) return;

    //Reset iFrame before bundling new code, to prevent repeat execution
    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    // setCode(result.outputFiles[0].text);

    //Posting the code we transpile as a message to be caught by the Iframe HtmlDOC (for safety)
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  //Creating an HTML doc to execute code we transpile in Browser, passing it as text into iframe
  const html = `
    <html>
      <head></head>
      <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch(err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err  + '</div>'
            throw err;
          }
        }, false)
      </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue='const a = 1;'
        onChange={(value): void => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title='Preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      ></iframe>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
