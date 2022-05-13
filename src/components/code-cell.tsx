import { useState, MutableRefObject } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

interface CodeCellProps {
  serviceRef: MutableRefObject<any>;
}

//Simple Code Display Example for learning ESBUILDwasm in browser
const CodeCell: React.FC<CodeCellProps> = ({ serviceRef }) => {
  const [input, setInput] = useState<string | undefined>('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input, serviceRef);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          initialValue='const a = 1;'
          onChange={(value): void => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
export default CodeCell;
