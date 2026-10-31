import * as authApi from "../api/auth.api";

export const sendOtp = async (phone) => {
  const { data } = await authApi.sendOtp(phone);
  return data;
};

export const verifyOtp = async (phone, otp) => {
  const { data } = await authApi.verifyOtp(phone, otp);
  return data;
};

export const getProfile = async () => {
  const { data } = await authApi.getProfile();
  return data;
};

export const updateProfile = async (body) => {
  const { data } = await authApi.updateProfile(body);
  return data;
};
