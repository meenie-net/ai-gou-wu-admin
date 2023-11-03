import { useRouteHandle } from "./useRouteHandle";
import { usePermissionStore } from "./useStore";

export const useButtonPermission = (props?: { name?: string }) => {
  const name = props?.name || useRouteHandle().name;
  const { buttonPermission, ready } = usePermissionStore();
  const buttons = buttonPermission[name] || [];
  const BUTTONS = (() => {
    const currentPageButtonPermisson: { [key: string]: boolean } = {};
    buttons.forEach((item: string) => {
      currentPageButtonPermisson[item] = true;
    });
    return currentPageButtonPermisson;
  })();
  return { BUTTONS, ready };
};
