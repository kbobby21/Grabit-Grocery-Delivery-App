import axios from "./axios";

const couponApi = {
  getAvailableCoupons: async () => {
    const response = await axios.get("/coupons/available");

    return response.data;
  },
};

export default couponApi;
