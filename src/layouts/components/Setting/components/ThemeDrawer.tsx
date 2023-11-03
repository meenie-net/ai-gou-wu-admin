import { Drawer, DrawerProps, Switch } from "@blueprintjs/core";
import Divider from "../../../../components/Divider";
import { useDispatch } from "react-redux";
import {
  changeAssemblySize,
  changeDarkTheme,
  changeShowBreadcrumbs,
  changeShowBreadcrumbsIcon,
  changeShowFooter,
  changeShowTab,
  changeShowTabIcon,
  setLayoutType,
} from "../../../../stores/global";
import { changeMenuOpen } from "../../../../stores/global";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { TLayout } from "../../..";
import { useTranslation } from "react-i18next";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useGlobalStore } from "../../../../hooks/useStore";

const ThemeDrawer = (props: DrawerProps) => {
  const {
    layoutType,
    setting: {
      darkTheme,
      menuOpen,
      assemblyLarge,
      showBreadcrumbs,
      showBreadcrumbsIcon,
      showTab,
      showTabIcon,
      showFooter,
    },
  } = useGlobalStore();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleLayout = (layout: TLayout) => {
    dispatch(setLayoutType(layout));
  };
  type TSettingMethod =
    | "menu"
    | "theme"
    | "assemblyLarge"
    | "breadcrumbs"
    | "breadcrumbs-icon"
    | "tab"
    | "tab-icon"
    | "footer";
  const settingMethods: Record<TSettingMethod, ActionCreatorWithoutPayload> = {
    menu: changeMenuOpen,
    theme: changeDarkTheme,
    assemblyLarge: changeAssemblySize,
    breadcrumbs: changeShowBreadcrumbs,
    "breadcrumbs-icon": changeShowBreadcrumbsIcon,
    tab: changeShowTab,
    "tab-icon": changeShowTabIcon,
    footer: changeShowFooter,
  };
  const handleClick = (target: TSettingMethod) => {
    dispatch(settingMethods[target]());
  };
  return (
    <Drawer
      {...props}
      size={"240px"}
      icon="contrast"
      title={t("appearanceSetting.self")}
    >
      <div className="px-4">
        <div>
          <Divider content={t("appearanceSetting.layoutSetting")} />
          <div className="text-center">
            <div className="mx-auto grid w-[170px] grid-cols-2 place-content-center place-items-center gap-2">
              {/* CLASSIC */}
              <Tooltip2
                className="block"
                content={"" + t("appearanceSetting.layout.classic")}
                intent="success"
                placement="top"
              >
                <div
                  className={`h-20 w-20 cursor-pointer rounded-lg transition-opacity ${
                    layoutType === "CLASSIC" ? "bg-red-200" : "bg-slate-200"
                  }`}
                  onClick={() => handleLayout("CLASSIC")}
                >
                  <div className="grid h-full grid-flow-col grid-rows-4 gap-1.5 p-2">
                    {/* menu */}
                    <div className="col-span-4 row-span-1 rounded bg-blue-800"></div>
                    {/* header */}
                    <div className="col-span-1 row-span-3 rounded bg-blue-600"></div>
                    {/* content */}
                    <div className="border-1 col-span-3 row-span-3 rounded border border-dashed border-blue-600 bg-blue-200"></div>
                  </div>
                </div>
              </Tooltip2>
              {/* COLUMN */}
              <Tooltip2
                className="block"
                content={"" + t("appearanceSetting.layout.column")}
                intent="success"
                placement="top"
              >
                <div
                  className={`h-20 w-20 cursor-pointer rounded-lg transition-opacity ${
                    layoutType === "COLUMN" ? "bg-red-200" : "bg-slate-200"
                  }`}
                  onClick={() => handleLayout("COLUMN")}
                >
                  <div className="grid h-full grid-flow-col grid-rows-4 gap-x-1.5 p-2">
                    {/* menu */}
                    <div className="col-span-1 row-span-4 rounded bg-blue-800"></div>
                    {/* submenu */}
                    <div className="col-span-1 row-span-4 rounded bg-blue-600"></div>
                    {/* content */}
                    <div className="border-1 col-span-2 row-span-4 rounded border border-dashed border-blue-600 bg-blue-200"></div>
                  </div>
                </div>
              </Tooltip2>
              {/* VERTICAL */}
              <Tooltip2
                className="block"
                content={"" + t("appearanceSetting.layout.vertical")}
                intent="success"
                placement="top"
              >
                <div
                  className={`h-20 w-20 cursor-pointer rounded-lg transition-opacity ${
                    layoutType === "VERTICAL" ? "bg-red-200" : "bg-slate-200"
                  }`}
                  onClick={() => handleLayout("VERTICAL")}
                >
                  <div className="grid h-full grid-flow-col grid-rows-4 gap-1.5 p-2">
                    {/* header */}
                    <div className="col-span-4 row-span-1 rounded bg-blue-800"></div>
                    {/* content */}
                    <div className="border-1 col-span-4 row-span-3 rounded border border-dashed border-blue-600 bg-blue-200"></div>
                  </div>
                </div>
              </Tooltip2>
              {/* TRANSVERSE */}
              <Tooltip2
                className="block"
                content={"" + t("appearanceSetting.layout.transverse")}
                intent="success"
                placement="top"
              >
                <div
                  className={`h-20 w-20 cursor-pointer rounded-lg transition-opacity ${
                    layoutType === "TRANSVERSE" ? "bg-red-200" : "bg-slate-200"
                  }`}
                  onClick={() => handleLayout("TRANSVERSE")}
                >
                  <div className="grid h-full grid-flow-col grid-rows-4 gap-1.5 p-2">
                    {/* menu */}
                    <div className="col-span-1 row-span-4 rounded bg-blue-600"></div>
                    {/* header */}
                    <div className="col-span-3 row-span-1 rounded bg-blue-800"></div>
                    {/* content */}
                    <div className="border-1 col-span-3 row-span-3 rounded border border-dashed border-blue-600 bg-blue-200"></div>
                  </div>
                </div>
              </Tooltip2>
            </div>
          </div>
        </div>
        <div>
          <Divider content={t("appearanceSetting.themeSetting")} />
          <div>
            <div>
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.darkTheme")}</span>}
                defaultChecked={darkTheme}
                innerLabelChecked="☽"
                innerLabel="☀"
                onChange={() => handleClick("theme")}
              />
            </div>
          </div>
        </div>
        <div>
          <Divider content={t("appearanceSetting.interfaceSetting")} />
          <div>
            <div>
              <Switch
                alignIndicator="right"
                labelElement={
                  <span>{t("appearanceSetting.menuCollapse")}</span>
                }
                defaultChecked={menuOpen}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("menu")}
              />
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.globalSize")}</span>}
                defaultChecked={assemblyLarge}
                innerLabelChecked="large"
                innerLabel="normal"
                onChange={() => handleClick("assemblyLarge")}
              />
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.breadcrumb")}</span>}
                defaultChecked={showBreadcrumbs}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("breadcrumbs")}
              />
              <Switch
                alignIndicator="right"
                labelElement={
                  <span>{t("appearanceSetting.breadcrumbIcon")}</span>
                }
                defaultChecked={showBreadcrumbsIcon}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("breadcrumbs-icon")}
              />
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.tab")}</span>}
                defaultChecked={showTab}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("tab")}
              />
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.tabIcon")}</span>}
                defaultChecked={showTabIcon}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("tab-icon")}
              />
              <Switch
                alignIndicator="right"
                labelElement={<span>{t("appearanceSetting.footer")}</span>}
                defaultChecked={showFooter}
                innerLabelChecked="on"
                innerLabel="off"
                onChange={() => handleClick("footer")}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
