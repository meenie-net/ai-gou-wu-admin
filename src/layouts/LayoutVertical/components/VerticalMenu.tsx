import { Icon, Menu } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useMatches } from "react-router-dom";
import menu, { IMenu } from "../../../config/menu";
import { MenuItem2, Popover2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { useGlobalStore } from "../../../hooks/useStore";

const VerticalMenu = () => {
  const {
    setting: { assemblyLarge },
  } = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();
  const { t } = useTranslation();

  const [activeMenu, setActiveMenu] = useState("");

  const handleClick = (item: IMenu) => {
    if (item.meta.url) {
      window.open(item.meta.url, item.meta.target || "_self");
    } else {
      navigate(item.path);
    }
  };

  const generateMenu = (menu: IMenu) => {
    return (
      <div
        className={`flex items-center justify-center p-2 transition-all hover:cursor-pointer hover:bg-slate-600 ${
          matches[1].pathname === menu.path ? "bg-slate-800" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Icon icon={menu.meta.icon} size={assemblyLarge ? 20 : 18} />
          <span className="text-xs">{t(`menu.${menu.meta.name}`)}</span>
        </div>
        {menu.children && (
          <Icon
            icon={activeMenu === menu.path ? "caret-up" : "caret-down"}
            size={assemblyLarge ? 16 : 14}
          />
        )}
      </div>
    );
  };

  const MenuItem = (props: { _item: IMenu[] }) => {
    const { _item } = props;
    return (
      <>
        {_item.length !== 0 &&
          _item.map((i) =>
            i.children ? (
              <MenuItem2
                key={i.path}
                className={`flex h-10 items-center justify-center hover:cursor-pointer hover:bg-orange-600 hover:text-white
                 ${
                   location.pathname === i.path
                     ? "bg-orange-800 text-white"
                     : ""
                 }`}
                icon={i.meta.icon}
                text={t(`menu.${i.meta.name}`)}
              >
                <MenuItem _item={i.children} />
              </MenuItem2>
            ) : (
              <MenuItem2
                key={i.path}
                onClick={() => handleClick(i)}
                className={`flex h-10 items-center justify-center hover:cursor-pointer hover:bg-orange-600 hover:text-white
                 ${
                   location.pathname === i.path
                     ? "bg-orange-800 text-white"
                     : ""
                 }`}
                icon={i.meta.icon}
                text={t(`menu.${i.meta.name}`)}
              />
            )
          )}
      </>
    );
  };

  const generateSubMenu = (subMenu: IMenu[]) => {
    return (
      // 二级菜单
      <Menu
        className={`dark overflow-hidden transition-all ${
          assemblyLarge ? "w-[120px]" : "w-[100px]"
        }`}
      >
        <MenuItem _item={subMenu} />
      </Menu>
    );
  };
  return (
    <div className="flex">
      {/* 一级菜单 */}
      {/* todo optimize UI */}
      <div className="flex h-full text-white">
        {menu.map((item) =>
          item.children ? (
            <Popover2
              key={item.path}
              minimal
              interactionKind="hover"
              content={item.children && generateSubMenu(item.children)}
              placement="bottom"
              popoverClassName="mt-1"
              onOpened={() => {
                // todo Optimize implementation logic
                setActiveMenu(item.path);
              }}
              onOpening={() => {
                setActiveMenu("");
              }}
              onClose={() => {
                setActiveMenu("");
              }}
            >
              {generateMenu(item)}
            </Popover2>
          ) : (
            <div key={item.path} onClick={() => navigate(item.path)}>
              {generateMenu(item)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VerticalMenu;
