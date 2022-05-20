import React from 'react';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
  serviceRef: any;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell, serviceRef }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell} serviceRef={serviceRef} />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
