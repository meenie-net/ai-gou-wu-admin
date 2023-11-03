import {
  Button,
  ButtonGroup,
  Divider,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import { ResCodeEnum, api } from "../../api";
import { useDispatch } from "react-redux";
import { fetchPermisson } from "../../stores/permission";
import { setUser } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import emitter, { EmitEventEnum } from "../../utils/EventEmitter";
import GlobalAlert from "../../components/GlobalAlert";
import { useUserStore } from "../../hooks/useStore";
import { handleStringChange } from "../../utils";

const Login = () => {
  const { user } = useUserStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  enum AuthType {
    LOGIN,
    REGISTER,
  }
  const [type, setType] = useState<AuthType>(AuthType.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    setIsLoading(false);
    if (JSON.stringify(user) !== "{}") {
      navigate("/");
    }
  }, []);

  const handleLoginConfirm = async () => {
    setIsLoading(true);
    const data = await api.login({ username, password });
    console.log("data", data);
    if (data.status === ResCodeEnum.SUCCESS) {
      dispatch(setUser(data.data));
      dispatch(fetchPermisson(data.data.permission));
      navigate("/");
      setIsLoading(false);
    }
  };

  const handleRegisterConfirm = async () => {
    setIsLoading(true);
    const data = await api.register({ username, password });
    if (data.status === ResCodeEnum.SUCCESS) {
      setIsLoading(false);
      emitter.emit(EmitEventEnum.OpenGlobalAlert, {
        message: "注册成功，去登录",
        icon: "tick",
        intent: "success",
      });
    }
    const cb = () => {
      setType(AuthType.LOGIN);
      emitter.off(EmitEventEnum.GlobalAlertConfirm, cb);
      emitter.emit(EmitEventEnum.CloseGlobalAlert);
    };
    emitter.on(EmitEventEnum.GlobalAlertConfirm, cb);
    emitter.on(EmitEventEnum.GlobalAlertCancel, () => {
      emitter.off(EmitEventEnum.GlobalAlertConfirm, cb);
    });
  };
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative h-full w-full">
        <div className="absolute h-full w-full bg-gradient-to-br from-purple-100 to-indigo-100"></div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full text-center">
        <div className="mt-[80px] text-[100px] font-extrabold">
          <span>Mee Admin</span>
        </div>

        <div className="mx-auto mt-32 w-fit rounded-md bg-gradient-to-br from-indigo-300 to-purple-300 px-8 py-5 drop-shadow-lg">
          <FormGroup
            label={<div className="w-16 text-left text-white">登录名</div>}
            labelFor="text-input"
            inline
          >
            <InputGroup
              onChange={handleStringChange((value) => setUsername(value))}
              placeholder="请输入登录名"
            />
          </FormGroup>
          <FormGroup
            label={<div className="w-16 text-left text-white">密码</div>}
            labelFor="text-input"
            inline
          >
            <InputGroup
              onChange={handleStringChange((value) => setPassword(value))}
              type="password"
              placeholder="请输入密码"
            />
          </FormGroup>
          {type === AuthType.REGISTER && (
            <FormGroup
              helperText={password === password2 ? "" : "两次输入的密码不一致"}
              label={<div className="w-16 text-left text-white">确认密码</div>}
              labelFor="text-input"
              inline
            >
              <InputGroup
                onChange={handleStringChange((value) => setPassword2(value))}
                type="password"
                placeholder="请输入密码"
              />
            </FormGroup>
          )}
          <div className="flex justify-end">
            <ButtonGroup>
              {type === AuthType.LOGIN ? (
                <Button
                  onClick={() => setType(AuthType.REGISTER)}
                  text="去注册"
                />
              ) : (
                <Button onClick={() => setType(AuthType.LOGIN)} text="去登录" />
              )}
              <Divider />
              {type === AuthType.LOGIN ? (
                <Button
                  onClick={handleLoginConfirm}
                  text="登录"
                  loading={isLoading}
                />
              ) : (
                <Button
                  onClick={handleRegisterConfirm}
                  text="确认注册"
                  loading={isLoading}
                />
              )}
            </ButtonGroup>
          </div>
        </div>
        <GlobalAlert isOpen={false} />
      </div>
    </div>
  );
};

export default Login;
