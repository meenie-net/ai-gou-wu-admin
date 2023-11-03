import { Card } from "@blueprintjs/core";
import { usePermissionStore } from "../../hooks/useStore";

const MenuPermission = () => {
  const { ready, permission } = usePermissionStore();

  return (
    <Card className="h-full">
      <pre>{`登录不同账号，观察左侧菜单`}</pre>
      <pre>{`ADMIN：账号：admin   密码：admin`}</pre>
      <pre>{`GUEST：账号：guest   密码：guest`}</pre>
      <pre>{`当前用户权限: ${ready ? permission : "……"}`}</pre>
    </Card>
  );
};

export default MenuPermission;
