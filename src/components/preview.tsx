import './preview.css';

import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    //Posting the code we transpile as a message to be caught by the Iframe HtmlDOC (for safety)
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='Preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
