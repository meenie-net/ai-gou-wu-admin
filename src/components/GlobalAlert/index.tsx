import {
  Alert,
  AlertProps,
  IconName,
  Intent,
  MaybeElement,
} from "@blueprintjs/core";
import emitter, { EmitEventEnum } from "../../utils/EventEmitter";
import { useState } from "react";
import { useGlobalStore } from "../../hooks/useStore";
const GlobalAlert = (props: AlertProps) => {
  const {
    setting: { darkTheme },
  } = useGlobalStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState<IconName | MaybeElement>("lightbulb");
  const [intent, setIntent] = useState<Intent | undefined>("none");
  const [message, setMessage] = useState("");
  const init = (payload: {
    message: string;
    icon: IconName | MaybeElement;
    intent: Intent | undefined;
  }) => {
    setMessage(payload.message);
    payload.icon && setIcon(payload.icon);
    setIntent(payload.intent);
    setOpen(true);
  };
  const handleConfirm = () => {
    setLoading(true);
    emitter.emit(EmitEventEnum.GlobalAlertConfirm);
  };
  const close = () => {
    setMessage("");
    setIcon("lightbulb");
    setIntent("none");
    setLoading(false);
    setOpen(false);
  };
  const handleCancel = () => {
    emitter.off(EmitEventEnum.OpenGlobalAlert, init);
    emitter.off(EmitEventEnum.CloseGlobalAlert, close);
    emitter.emit(EmitEventEnum.GlobalAlertCancel);
    close();
  };
  emitter.on(EmitEventEnum.OpenGlobalAlert, init);
  emitter.on(EmitEventEnum.CloseGlobalAlert, close);
  return (
    <Alert
      {...props}
      className={darkTheme ? "bp4-dark" : ""}
      cancelButtonText="取消"
      confirmButtonText="确认"
      icon={icon}
      isOpen={open}
      loading={loading}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      intent={intent}
    >
      <p>{message}</p>
    </Alert>
  );
};

export default GlobalAlert;
