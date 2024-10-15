import { CREATE_SOCKET } from "../components/constants/actionTypes";

const initialState = { socket: null }; // Khởi tạo state ban đầu

const reducer = (state = initialState, action) => {
  console.log("Action in socket reducer:", action); // Log để kiểm tra hành động
  switch (action.type) {
    case CREATE_SOCKET:
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

export default reducer;
