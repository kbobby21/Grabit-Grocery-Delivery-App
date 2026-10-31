import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/slices/authSlice";
import AppSnackbar from "./components/common/AppSnackbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <AppSnackbar />
    </>
  );
}

export default App;
