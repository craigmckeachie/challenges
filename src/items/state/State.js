import { itemAPI } from '../itemAPI';

// action types
const LOAD_ITEMS_REQUEST = 'LOAD_ITEMS_REQUEST';
const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
const LOAD_ITEMS_FAILURE = 'LOAD_ITEMS_FAILURE';

const SAVE_ITEMS_REQUEST = 'SAVE_ITEMS_REQUEST';
const SAVE_ITEMS_SUCCESS = 'SAVE_ITEMS_SUCCESS';
const SAVE_ITEMS_FAILURE = 'SAVE_ITEMS_FAILURE';

const DELETE_ITEMS_REQUEST = 'DELETE_ITEMS_REQUEST';
const DELETE_ITEMS_SUCCESS = 'DELETE_ITEMS_SUCCESS';
const DELETE_ITEMS_FAILURE = 'DELETE_ITEMS_FAILURE';

//action creators and thunks
export function loadItems() {
  return function thunk(dispatch) {
    dispatch(() => {
      type: LOAD_ITEMS_REQUEST;
    });
    return itemAPI
      .getAll(1)
      .then((items) => dispatch({ type: LOAD_ITEMS_SUCCESS, payload: items }))
      .catch((error) => dispatch({ type: LOAD_ITEMS_FAILURE, payload: error }));
  };
}

//initial state
const initialItemState = {
  items: [],
  error: undefined,
  loading: false,
};

//reducer
function itemsReducer(state = initialItemState, action) {
  switch (action.type) {
    case LOAD_ITEMS_REQUEST:
      return { ...state, loading: true, error: undefined };
    case LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: undefined,
      };
    case LOAD_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    default:
      return state;
  }
}

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  itemState: itemsReducer,
});

export default function configureStore(preloadedState) {
  const middlewares = [ReduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  //Thunk is middleware
  //DevTools is an enhancer (actually changes Redux)
  //applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  //to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export const initialAppState = {
  itemState: initialItemState,
};

export const store = configureStore(initialAppState);
