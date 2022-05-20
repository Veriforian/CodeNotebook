import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    //With immer, we can mutate state directly, and immer will return a new state object instead
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;

        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order.filter((id) => id !== action.payload);

        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1)
          return state;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.INSERT_CELL_BEFORE:
        //Create new Cell
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId()
        };

        //Create new Object for cell in data
        state.data[cell.id] = cell;

        //Inserting id into correct spot in order array
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        //Either places order at the very end, or before a specific id
        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
