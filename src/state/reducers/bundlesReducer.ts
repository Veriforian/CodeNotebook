import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
  initialized: boolean;
}

const initialState = {
  initialized: false
};

const reducer = (
  state: BundleState = initialState,
  action: Action
): BundleState => {
  switch (action.type) {
    //@ts-ignore
    case ActionType.INITIALIZE_SERVICE:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export default reducer;
