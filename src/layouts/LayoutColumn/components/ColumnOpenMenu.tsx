import { Icon } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { IMenu } from "../../../config/menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalStore } from "../../../hooks/useStore";

const ColumnOpenMenu = (props: { subMenu: IMenu[] }) => {
  const { subMenu } = props;
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClick = (item: IMenu) => {
    if (!item.children) {
      if (item.meta.url) {
        window.open(item.meta.url, item.meta.target || "_self");
      } else {
        navigate(item.path);
      }
    } else {
      setOpen(!open);
    }
  };
  return (
    <>
      {subMenu.map((item) => (
        <div key={item.path}>
          <div
            onClick={() => handleClick(item)}
            className={`flex h-10 items-center justify-between pr-2 hover:cursor-pointer hover:bg-orange-600 hover:text-white ${
              location.pathname === item.path ? "bg-orange-800 text-white" : ""
            }`}
          >
            <div
              style={{
                paddingLeft: `${(item.path.split("/").length - 2) * 0.45}rem`,
              }}
            >
              <Icon icon={item.meta.icon} size={assemblyLarge ? 20 : 13} />
              {menuOpen && (
                <span className="ml-2 whitespace-nowrap">
                  {t(`menu.${item.meta.name}`)}
                </span>
              )}
            </div>
            {item.children ? (
              <Icon
                icon={open ? "caret-up" : "caret-down"}
                size={assemblyLarge ? 20 : 13}
              />
            ) : (
              <Icon
                icon="star-empty"
                className="invisible"
                size={assemblyLarge ? 20 : 13}
              />
            )}
          </div>
          <div
            className={`overflow-hidden transition-all ${
              open ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            {item.children && <ColumnOpenMenu subMenu={item.children} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default ColumnOpenMenu;
