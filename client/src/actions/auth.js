import * as api from "../api";
import { AUTH } from "../components/constants/actionTypes";

// Action for login
export const login = (formData, history) => async (dispatch) => {
  try {
    // Gửi request đăng nhập và nhận dữ liệu từ server
    const { data } = await api.login(formData);

    // Dispatch action với dữ liệu từ API
    dispatch({ type: AUTH, data });

    // Chuyển hướng đến trang chính
    history.push("/");
  } catch (error) {
    console.log('Login error:', error);
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
  }
};

// Action for register
export const register = (formData, history) => async (dispatch) => {
  try {
    // Gửi request đăng ký và nhận dữ liệu từ server
    const { data } = await api.register(formData);

    // Dispatch action với dữ liệu từ API
    dispatch({ type: AUTH, data });

    // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    history.push("/login");
  } catch (error) {
    console.log('Register error:', error);
    alert('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
  }
};
