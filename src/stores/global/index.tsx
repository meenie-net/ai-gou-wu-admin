import { createSlice } from "@reduxjs/toolkit";
import menu, { IMenu } from "../../config/menu";
import { flapMenu } from "../../utils";
import { TLayout } from "../../layouts";
import { IconName, MaybeElement } from "@blueprintjs/core";
export interface ITab {
  path: string;
  meta: {
    name: string;
    title: string;
    icon: IconName | MaybeElement;
  };
}
export interface IGlobalStore {
  layoutType: TLayout;
  tabList: ITab[];
  flapedMenu: IMenu[];
  setting: {
    darkTheme: boolean;
    menuOpen: boolean;
    assemblyLarge: boolean;
    showBreadcrumbs: boolean;
    showBreadcrumbsIcon: boolean;
    showTab: boolean;
    showTabIcon: boolean;
    showFooter: boolean;
  };
}

const initialState: IGlobalStore = {
  layoutType: "CLASSIC",
  tabList: [
    {
      path: "/",
      meta: {
        name: "home",
        title: "首页",
        icon: "home",
      },
    },
  ],
  flapedMenu: flapMenu(menu),
  setting: {
    darkTheme: false,
    menuOpen: true,
    assemblyLarge: false,
    showBreadcrumbs: true,
    showBreadcrumbsIcon: true,
    showTab: true,
    showTabIcon: true,
    showFooter: true,
  },
};

const globalStore = createSlice({
  name: "global-store",
  initialState,
  reducers: {
    setLayoutType: (state, { payload }) => {
      state.layoutType = payload;
    },
    setTab: (state, { payload }) => {
      // console.log(
      //   "state.flapedMenu",
      //   JSON.parse(JSON.stringify(state.flapedMenu))
      // );
      if (state.tabList.every((tab) => tab.path !== payload)) {
        state.flapedMenu.forEach((item) => {
          if (item.path === payload) {
            state.tabList.push({
              path: payload,
              meta: {
                name: item.meta.name,
                title: item.meta.title,
                icon: item.meta.icon,
              },
            });
          }
        });
      }
    },
    removeTab: (state, { payload }) => {
      state.tabList = [...state.tabList.filter((tab) => tab.path !== payload)];
    },
    removeAllTab: (state) => {
      state.tabList = [];
    },
    changeAssemblySize: (state) => {
      state.setting.assemblyLarge = !state.setting.assemblyLarge;
    },
    changeMenuOpen: (state) => {
      state.setting.menuOpen = !state.setting.menuOpen;
    },
    changeDarkTheme: (state) => {
      state.setting.darkTheme = !state.setting.darkTheme;
    },
    changeShowBreadcrumbs: (state) => {
      state.setting.showBreadcrumbs = !state.setting.showBreadcrumbs;
    },
    changeShowBreadcrumbsIcon: (state) => {
      state.setting.showBreadcrumbsIcon = !state.setting.showBreadcrumbsIcon;
    },
    changeShowTab: (state) => {
      state.setting.showTab = !state.setting.showTab;
    },
    changeShowTabIcon: (state) => {
      state.setting.showTabIcon = !state.setting.showTabIcon;
    },
    changeShowFooter: (state) => {
      state.setting.showFooter = !state.setting.showFooter;
    },
  },
});

export const {
  setLayoutType,
  setTab,
  removeTab,
  removeAllTab,
  changeAssemblySize,
  changeMenuOpen,
  changeDarkTheme,
  changeShowBreadcrumbs,
  changeShowBreadcrumbsIcon,
  changeShowTab,
  changeShowTabIcon,
  changeShowFooter,
} = globalStore.actions;
export default globalStore;
