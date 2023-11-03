import Content from "../components/Content";
import Setting from "../components/Setting";
import Tabs from "../components/Tabs";
import VerticalMenu from "./components/VerticalMenu";
import Footer from "../components/Footer";
import { assetsUrl } from "../../utils";
import { useGlobalStore } from "../../hooks/useStore";

const LayoutVertical = () => {
  const {
    setting: { assemblyLarge },
  } = useGlobalStore();

  return (
    // ClassicLayoutContainer
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div
        className={`border-box custom-border-b flex w-full flex-shrink-0 items-center justify-between bg-dark-bg text-dark-text ${
          assemblyLarge ? "h-[65px]" : "h-[55px]"
        }`}
      >
        {/* HeaderLeft */}
        <div
          className={`flex justify-evenly overflow-hidden text-center font-mono text-xl font-black transition-all ${
            assemblyLarge ? "w-[160px]" : "w-[150px]"
          }`}
        >
          <img
            src={assetsUrl("/assets/avatar.png")}
            alt=""
            className={`${
              assemblyLarge ? "h-8 w-8 rounded-full" : "h-7 w-7 rounded-full"
            }`}
          />
          <span className="whitespace-nowrap">Mee Admin</span>
        </div>
        {/* Menu */}
        <div id="sider-menu-container">
          <VerticalMenu />
        </div>
        {/* HeaderRight */}
        <div className="flex items-center justify-between pl-4 pr-6">
          {/* Setting */}
          <div>
            <Setting mode="light" />
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
  );
};

export default LayoutVertical;
