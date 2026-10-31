import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 1,
    name: "Bobby Kumar",
    email: "bobby@gmail.com",
    phone: "9876543210",
    gender: "Male",
    dob: "15 Aug 2001",

    image: "https://i.pravatar.cc/300?img=12",

    wallet: 320,
    rewardPoints: 120,
    memberSince: "2026",
  },
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    updateProfile(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    updateProfileImage(state, action) {
      state.user.image = action.payload;
    },

    addWalletMoney(state, action) {
      state.user.wallet += Number(action.payload);
    },

    addRewardPoints(state, action) {
      state.user.rewardPoints += Number(action.payload);
    },
  },
});

export const {
  updateProfile,
  updateProfileImage,
  addWalletMoney,
  addRewardPoints,
} = profileSlice.actions;

export default profileSlice.reducer;
