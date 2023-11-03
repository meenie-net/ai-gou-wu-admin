import { Button, Icon } from "@blueprintjs/core";
import ClassicSider from "./components/ClassicSider";
import Tabs from "../components/Tabs";
import Setting from "../components/Setting";
import Breadcrumb from "../components/Breadcrumb";
import Content from "../components/Content";
import "./style.scss";
import { useDispatch } from "react-redux";
import { changeMenuOpen } from "../../stores/global";
import Footer from "../components/Footer";
import { assetsUrl } from "../../utils";
import { useGlobalStore } from "../../hooks/useStore";

const LayoutClassic = () => {
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const dispatch = useDispatch();

  const handleMenuOpen = () => {
    dispatch(changeMenuOpen());
  };

  return (
    // ClassicLayoutContainer
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div
        className={`border-box dark-when-light custom-border-b flex w-full flex-shrink-0 items-center divide-x-2 ${
          assemblyLarge ? "h-[55px]" : "h-[45px]"
        }`}
      >
        {/* HeaderLeft */}
        <div
          className={`flex justify-evenly overflow-hidden text-center font-mono text-xl font-black transition-all ${
            assemblyLarge
              ? menuOpen
                ? "w-[160px] min-w-[160px]"
                : "w-[60px] min-w-[60px]"
              : menuOpen
              ? "w-[160px] min-w-[160px]"
              : "w-[50px] min-w-[50px]"
          }`}
        >
          <img
            src={assetsUrl("/assets/avatar.png")}
            alt=""
            className={`${
              assemblyLarge ? "h-8 w-8 rounded-full" : "h-7 w-7 rounded-full"
            }`}
          />
          {menuOpen && <span className="whitespace-nowrap">Mee Admin</span>}
        </div>
        {/* HeaderRight */}
        <div className="flex flex-auto items-center justify-between pl-4 pr-6">
          {/* OpenIcon & Breadcrumb */}
          <div className="flex items-center">
            {/* OpenIcon */}
            <Button id="open-icon" minimal onClick={handleMenuOpen}>
              <Icon
                icon={menuOpen ? "menu-closed" : "menu-open"}
                className="animate-appear_right"
                color="#f6f7f9"
                size={assemblyLarge ? 28 : 24}
              ></Icon>
            </Button>
            {/* Breadcrumb */}
            <div className="ml-4">
              <Breadcrumb mode="light" />
            </div>
          </div>
          {/* Setting */}
          <div>
            <Setting mode="light" />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex h-full min-h-0 flex-auto">
        {/* SiderMenu */}
        <div
          id="sider-menu-container"
          className={`custom-border-r dark h-full overflow-y-auto transition-all ${
            assemblyLarge
              ? menuOpen
                ? "w-[160px] min-w-[160px]"
                : "w-[60px] min-w-[60px]"
              : menuOpen
              ? "w-[160px] min-w-[160px]"
              : "w-[50px] min-w-[50px]"
          }`}
        >
          <ClassicSider />
        </div>
        {/* ContentContainer */}
        <div className="flex min-w-0 flex-auto flex-col content-between">
          {/* Tabs */}
          <Tabs />
          {/* Content */}
          <div
            id="content"
            className="dark flex min-h-0 flex-auto flex-col bg-slate-200 p-3"
          >
            <Content />
          </div>
          <Footer className="dark py-1 text-center" />
        </div>
      </div>
    </div>
  );
};

export default LayoutClassic;
