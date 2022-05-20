import { useState, useEffect } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
  serviceRef: any;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell, serviceRef }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    //Debounced function to submit code for bundling, formatting, and executing everytime the user types
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content, serviceRef);
      setCode(output.code);
      setErr(output.err);
    }, 800);

    return () => {
      //Clearing current timeout if user is still editing
      clearTimeout(timer);
    };
  }, [cell.content, serviceRef]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingFailed={err} />
      </div>
    </Resizable>
  );
};
export default CodeCell;
