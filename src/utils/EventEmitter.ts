import Emittery from "emittery";

// Emittery.isDebugEnabled = true;
const emitter = new Emittery({ debug: { name: "myEmitter1" } });
export default emitter;
export const enum EmitEventEnum {
  OpenGlobalAlert = "OpenGlobalAlert",
  GlobalAlertConfirm = "GlobalAlertConfirm",
  CloseGlobalAlert = "CloseGlobalAlert",
  GlobalAlertCancel = "GlobalAlertCancel",
  LanguageChange = "LanguageChange",
  RefreshRoute = "RefreshRoute",
}
