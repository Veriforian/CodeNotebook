import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

interface CellListProps {
  serviceRef: any;
}

const CellList: React.FC<CellListProps> = ({ serviceRef }) => {
  const cellsArr = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  const renderedCells = cellsArr?.map((cell) => (
    <CellListItem key={cell.id} cell={cell} serviceRef={serviceRef} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
