import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyOtp, logout } from "../redux/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return {
    ...auth,

    login: (phone) => dispatch(loginUser(phone)).unwrap(),

    verifyOtp: (phone, otp) =>
      dispatch(
        verifyOtp({
          phone,
          otp,
        }),
      ).unwrap(),

    logout: () => dispatch(logout()),
  };
}
