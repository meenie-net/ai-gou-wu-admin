import { useSelector } from "react-redux";
import { RootState } from "../stores";

function useUserStore() {
  return useSelector((state: RootState) => state.user);
}
function useGlobalStore() {
  return useSelector((state: RootState) => state.global);
}
function usePermissionStore() {
  return useSelector((state: RootState) => state.permission);
}

export { useUserStore, useGlobalStore, usePermissionStore };
