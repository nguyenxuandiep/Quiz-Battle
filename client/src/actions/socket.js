import { CREATE_SOCKET } from "../components/constants/actionTypes";

export const createSocket = (data) => async (dispatch) => {
  try {
    console.log("Dispatching CREATE_SOCKET with data:", data); // Log dữ liệu socket
    dispatch({ type: CREATE_SOCKET, payload: data });
  } catch (error) {
    console.log(error);
  }
};
