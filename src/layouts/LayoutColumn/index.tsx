import { Button, Icon } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { changeMenuOpen } from "../../stores/global";
import Content from "../components/Content";
import Setting from "../components/Setting";
import Tabs from "../components/Tabs";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import ColumnSider from "./components/ColumnSider";
import { useGlobalStore } from "../../hooks/useStore";

const LayoutColumn = () => {
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const dispatch = useDispatch();

  const handleMenuOpen = () => {
    dispatch(changeMenuOpen());
  };

  return (
    // ClassicLayoutContainer
    <div className="flex h-full w-full flex-row">
      {/* SiderMenu */}
      <div id="sider-menu-container">
        <ColumnSider />
      </div>
      {/* PageRight */}
      <div className="dark flex min-w-0 flex-auto flex-col content-between">
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

export default LayoutColumn;
