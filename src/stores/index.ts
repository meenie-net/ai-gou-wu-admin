import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userStore from "./user";
import permissionStore from "./permission";
import globalStore from "./global";

const persistConfig = {
  key: "ai-gou-wu",
  storage,
  version: 1,
};

const reducers = combineReducers({
  global: globalStore.reducer,
  user: userStore.reducer,
  permission: permissionStore.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
