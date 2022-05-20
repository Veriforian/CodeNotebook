import './text-editor.css';

import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string | undefined>('# Hello World!');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    //Logic to handle closing edit window on click outside
    const listener = (event: MouseEvent) => {
      //Check to make sure that we don't close editor if user clicks inside of it again
      if (
        containerRef.current &&
        event.target &&
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={containerRef}>
        <MDEditor value={input} onChange={(value) => setInput(value)} />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={input} />
      </div>
    </div>
  );
};

export default TextEditor;
