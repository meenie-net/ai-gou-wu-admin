import { createSlice } from "@reduxjs/toolkit";

export interface IUserStore {
  user: object;
}

const initialState: IUserStore = {
  user: {},
};
const userStore = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, removeUser } = userStore.actions;
export default userStore;
