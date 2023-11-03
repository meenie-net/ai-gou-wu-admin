import { useRouteHandle } from "../../hooks/useRouteHandle";

const NestedMenu = () => {
  const routeHandle = useRouteHandle();
  return (
    <div>
      这是嵌套菜单{routeHandle.name}
      <input placeholder="input" type="text" />
    </div>
  );
};

export default NestedMenu;
