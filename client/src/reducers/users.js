// src/reducers/index.js
import { combineReducers } from 'redux';

// Ví dụ một reducer đơn giản
const exampleReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Kết hợp các reducer lại nếu có nhiều reducer
const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
