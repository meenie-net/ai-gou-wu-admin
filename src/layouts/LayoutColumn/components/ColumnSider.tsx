import { Icon } from "@blueprintjs/core";
import menu, { IMenu } from "../../../config/menu";
import { useMatches, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { assetsUrl } from "../../../utils";
import { useState } from "react";
import ColumnOpenMenu from "./ColumnOpenMenu";
import ColumnClosedMenu from "./ColumnClosedMenu";
import { useGlobalStore } from "../../../hooks/useStore";

const ColumnSider = () => {
  const [subMenu, setSubMenu] = useState<IMenu[]>([]);
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const navigate = useNavigate();
  const matches = useMatches();
  const { t } = useTranslation();

  const handleClick = (item: IMenu) => {
    if (!item.children) {
      setSubMenu([]);
      if (item.meta.url) {
        window.open(item.meta.url, item.meta.target || "_self");
      } else {
        navigate(item.path);
      }
    } else {
      setSubMenu(item.children);
    }
  };

  return (
    <div className="flex h-full">
      {/* 一级菜单 */}
      <div className="min-h-full w-[84px] overflow-y-auto bg-slate-700 text-white">
        <div className="custom-border-b flex h-[84px] items-center justify-center">
          <img
            src={assetsUrl("/assets/avatar.png")}
            alt=""
            className={`rounded-full ${assemblyLarge ? "h-8 w-8" : "h-7 w-7"}`}
          />
        </div>
        {menu.map((item) => (
          <div
            key={item.path}
            onClick={() => handleClick(item)}
            className={`flex h-[64px] flex-col items-center justify-center transition-all hover:cursor-pointer hover:bg-slate-600 ${
              matches[1].pathname === item.path ? "bg-slate-800" : ""
            }`}
          >
            <Icon icon={item.meta.icon} size={assemblyLarge ? 24 : 24} />
            {t(`menu.${item.meta.name}`)}
          </div>
        ))}
      </div>
      {/* 二级菜单 */}
      <div
        className={`custom-border-r dark overflow-hidden transition-all ${
          subMenu.length === 0
            ? "w-0"
            : assemblyLarge
            ? menuOpen
              ? "w-[160px]"
              : "w-[60px]"
            : menuOpen
            ? "w-[140px]"
            : "w-[50px]"
        }`}
      >
        <div className="custom-border-b flex h-[45px] items-center justify-center">
          <span className="whitespace-nowrap">
            {menuOpen ? "Mee Admin" : "M"}
          </span>
        </div>
        {subMenu.length !== 0 && menuOpen ? (
          <ColumnOpenMenu subMenu={subMenu} />
        ) : (
          <ColumnClosedMenu subMenu={subMenu} />
        )}
      </div>
    </div>
  );
};

export default ColumnSider;
