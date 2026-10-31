import axios from "./axios";

export const adminLogin = async (identifier, password) => {
  const response = await axios.post("/admin/auth/login", {
    identifier,
    password,
  });

  return response.data;
};
