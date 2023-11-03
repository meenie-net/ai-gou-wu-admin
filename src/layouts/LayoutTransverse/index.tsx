import { Button, Icon } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { changeMenuOpen } from "../../stores/global";
import Content from "../components/Content";
import Setting from "../components/Setting";
import Breadcrumb from "../components/Breadcrumb";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import ClassicSider from "../LayoutClassic/components/ClassicSider";
import { assetsUrl } from "../../utils";
import { useGlobalStore } from "../../hooks/useStore";

const LayoutTransverse = () => {
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const dispatch = useDispatch();

  const handleMenuOpen = () => {
    dispatch(changeMenuOpen());
  };

  return (
    // ClassicLayoutContainer
    <div className="dark flex h-full w-full flex-row">
      {/* SiderMenu */}
      <div id="sider-menu-container" className="custom-border-r flex flex-col">
        {/* Logo */}
        <div
          className={`flex items-center justify-evenly overflow-hidden text-center font-mono text-xl font-black transition-all ${
            assemblyLarge
              ? menuOpen
                ? "h-[55px] w-[160px] min-w-[160px]"
                : "h-[55px] w-[60px] min-w-[60px]"
              : menuOpen
              ? "h-[45px] w-[160px] min-w-[160px]"
              : "h-[45px] w-[50px] min-w-[50px]"
          }`}
        >
          <img
            src={assetsUrl("/assets/avatar.png")}
            alt=""
            className={
              assemblyLarge ? "h-8 w-8 rounded-full" : "h-7 w-7 rounded-full"
            }
          />
          {menuOpen && <span className="whitespace-nowrap">Mee Admin</span>}
        </div>
        {/* Menu */}
        <div className="h-full flex-auto overflow-y-auto">
          <ClassicSider />
        </div>
      </div>
      {/* PageRight */}
      <div className="flex min-w-0 flex-auto flex-col content-between">
        {/* Header */}
        <div
          className={`custom-border-b border-box flex w-full flex-shrink-0 items-center divide-x-2 ${
            assemblyLarge ? "h-[55px]" : "h-[45px]"
          }`}
        >
          {/* HeaderRight */}
          <div className="flex flex-auto items-center justify-between pl-4 pr-6">
            {/* OpenIcon & Breadcrumb */}
            <div className="flex items-center">
              {/* OpenIcon */}
              <Button id="open-icon" minimal onClick={handleMenuOpen}>
                <Icon
                  icon={menuOpen ? "menu-closed" : "menu-open"}
                  className="animate-appear_right"
                  size={assemblyLarge ? 28 : 24}
                ></Icon>
              </Button>
              {/* Breadcrumb */}
              <div className="ml-4">
                <Breadcrumb mode="dark" />
              </div>
            </div>
            {/* Setting */}
            <div>
              <Setting mode="dark" />
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="flex min-h-0 flex-auto">
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
    </div>
  );
};

export default LayoutTransverse;
