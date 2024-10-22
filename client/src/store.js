// src/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';  // Cập nhật từ {thunk} thành thunk
import rootReducer from './reducers';  // Import rootReducer từ reducers/index.js

// Cấu hình store với Redux DevTools (nếu có) và middleware (redux-thunk)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,  // Sử dụng rootReducer đã được kết hợp
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
