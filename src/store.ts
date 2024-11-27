import { configureStore, Action } from '@reduxjs/toolkit';

const LOADER = 'LOADER';

export type State = {
  isLoading: boolean;
};

type Loader = { type: string; loading: boolean };

interface CustomAction extends Action {
  loading: boolean;
}

// Actions
export const setLoader = (loading: boolean): Loader => {
  return {
    type: LOADER,
    loading,
  };
};

// Reducer
const initialState = {
  isLoading: false,
};

const actionReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: CustomAction,
): State => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        isLoading: action.loading,
      };
    default:
      return state;
  }
};

// Store
const store = configureStore({
  reducer: actionReducer,
});

export default store;
