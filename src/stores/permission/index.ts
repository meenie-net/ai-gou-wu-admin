import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResCodeEnum, api } from "../../api";

export interface IPermissionStore {
  ready: boolean;
  permission: string;
  buttonPermission: { [key: string]: string[] };
}

const initialState: IPermissionStore = {
  ready: false,
  permission: "",
  buttonPermission: {},
};
const permissionStore = createSlice({
  name: "permission-store",
  initialState,
  reducers: {
    setPermission: (state, { payload }) => {
      state.permission = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPermisson.pending, (state) => {
        state.ready = false;
      })
      .addCase(fetchPermisson.fulfilled, (state, { payload }) => {
        state.permission = payload.type;
        state.buttonPermission = payload.data;
        state.ready = true;
      })
      .addCase(fetchPermisson.rejected, (state) => {
        state.ready = false;
      });
  },
});

export const fetchPermisson: any = createAsyncThunk(
  "permission",
  async (type: "admin" | "guest") => {
    const data = await api.getPermission(type);
    if (data.status === ResCodeEnum.SUCCESS) {
      return { data: data.data, type };
    }
  }
);

export const { setPermission } = permissionStore.actions;
export default permissionStore;
