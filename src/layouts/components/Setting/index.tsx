import { ButtonGroup, Button, Icon, Menu, Divider } from "@blueprintjs/core";
import emitter, { EmitEventEnum } from "../../../utils/EventEmitter";
import { MenuItem2, Popover2 } from "@blueprintjs/popover2";
import Notification from "./components/Notification";
import { Icon as Iconify } from "@iconify/react";
import i18n, { lngs, type TLngsKey } from "../../../i18n";
import { assetsUrl } from "../../../utils";
import { useGlobalStore } from "../../../hooks/useStore";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../stores/user";
import { useNavigate } from "react-router-dom";
import { useHandleConfirm } from "../../../hooks/useHandleConfirm";
import ThemeDrawer from "./components/ThemeDrawer";
import useOverlay, { IUseOverlay } from "../../../hooks/useOverlay";

const Setting = (props: { mode: "dark" | "light" }) => {
  const { mode } = props;
  const {
    setting: { assemblyLarge },
  } = useGlobalStore();
  const { props: themeDrawerProps, rest: themeDrawerRest }: IUseOverlay =
    useOverlay({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLanguageClick = (lng: TLngsKey) => {
    i18n.changeLanguage(lng);
    emitter.emit(EmitEventEnum.LanguageChange);
  };
  const handleLogout = async () => {
    await useHandleConfirm({
      handler: () => {
        return new Promise(() => {
          dispatch(removeUser());
          navigate("/login");
        });
      },
      param: {},
      icon: <Iconify icon="ph:question" height="1.5em" />,
      message: `确认退出吗？`,
      intent: "warning",
    });
  };
  const LanguageMenu = (
    <Menu className="min-w-[60px]">
      {Object.keys(lngs).map((lng) => (
        <MenuItem2
          className={
            i18n.resolvedLanguage === lng ? "font-bold" : "font-normal"
          }
          key={lng}
          text={lngs[lng as TLngsKey].nativeName}
          onClick={() => handleLanguageClick(lng as TLngsKey)}
        />
      ))}
    </Menu>
  );
  const AccountMenu = (
    <Menu className="min-w-[60px]" large={assemblyLarge}>
      <MenuItem2 text="个人中心" />
      <MenuItem2 text="修改密码" />
      <Divider />
      <MenuItem2 text="退出登录" onClick={handleLogout} />
    </Menu>
  );
  return (
    <>
      <ButtonGroup minimal large={assemblyLarge}>
        <Button id="global-search">
          <Icon
            icon="search"
            color={mode === "dark" ? undefined : "#ffffff"}
            size={assemblyLarge ? 24 : 18}
          />
        </Button>
        <Popover2 content={LanguageMenu} fill placement="bottom">
          <Button id="i18n">
            <Icon
              icon="translate"
              color={mode === "dark" ? undefined : "#ffffff"}
              size={assemblyLarge ? 24 : 18}
            />
          </Button>
        </Popover2>
        <Button id="full-screen">
          <Icon
            icon="zoom-to-fit"
            color={mode === "dark" ? undefined : "#ffffff"}
            size={assemblyLarge ? 24 : 18}
          />
        </Button>
        <Button id="theme" onClick={themeDrawerRest.onOpen}>
          <Icon
            icon="contrast"
            color={mode === "dark" ? undefined : "#ffffff"}
            size={assemblyLarge ? 24 : 18}
          />
        </Button>
        <Popover2 content={<Notification />} placement="bottom">
          <Button id="message" className="relative" title="消息">
            <Icon
              icon="notifications"
              color={mode === "dark" ? undefined : "#ffffff"}
              size={assemblyLarge ? 24 : 18}
              className="mx-[-7px]"
            />
            <span className="right-2px border-1 absolute top-0 rounded-full border-solid border-white bg-[#B83211] px-1 text-xs font-bold text-dark-text">
              2222
            </span>
          </Button>
        </Popover2>
        <span className="flex items-center ml-3 font-semibold">Meenie</span>
        <Popover2 content={AccountMenu} placement="bottom">
          <Button>
            <img
              src={assetsUrl("/assets/avatar.png")}
              className={`border border-gray-500 ${
                assemblyLarge ? "h-8 w-8 rounded-full" : "h-6 w-6 rounded-full"
              }`}
              alt=""
            />
          </Button>
        </Popover2>
      </ButtonGroup>

      {themeDrawerRest.isDisplay && <ThemeDrawer {...themeDrawerProps} />}
    </>
  );
};

export default Setting;
