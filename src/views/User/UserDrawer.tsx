import { Drawer } from "@blueprintjs/core";
import emitter, { EmitEventEnum } from "../../utils/EventEmitter";
import { useEffect, useState } from "react";
import { IUser } from "./user";

const UserDrawer = () => {
  const [user, setUser] = useState<IUser>({
    id: "",
    nick: "",
    tel: 0,
    permission: [],
  });
  const [state, setState] = useState("add");
  const [open, setOpen] = useState(false);
  const init = (payload: { state: "add" | "edit"; user?: IUser }) => {
    if (payload.state === "edit" && payload.user) setUser(payload.user);
    setState(payload.state);
    setOpen(true);
  };
  const handleClose = () => {
    emitter.off(EmitEventEnum.OpenUserDrawer, init);
    setOpen(false);
  };
  useEffect(() => {
    emitter.on(EmitEventEnum.OpenUserDrawer, init);
    return () => {
      emitter.off(EmitEventEnum.OpenUserDrawer, init);
    };
  });

  return (
    // todo
    <Drawer
      isOpen={open}
      className=""
      icon="info-sign"
      title={state === "add" ? "新增用户" : "编辑用户信息"}
      canOutsideClickClose
      onClose={handleClose}
    >
      {user.id}
    </Drawer>
  );
};

export default UserDrawer;
