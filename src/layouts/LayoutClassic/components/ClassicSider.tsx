import { Menu, Icon } from "@blueprintjs/core";
import menu, { IMenu } from "../../../config/menu";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseMenu from "./CollapseMenu";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../../hooks/useStore";

const ClassicSider = () => {
  const {
    setting: { assemblyLarge, menuOpen },
  } = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const handleClick = (item: IMenu) => {
    if (item.meta.url) {
      window.open(item.meta.url, item.meta.target || "_self");
    } else {
      navigate(item.path);
    }
  };
  return (
    <>
      <Menu
        large={assemblyLarge}
        className="flex min-w-[50px] flex-col content-center"
      >
        {menu.map((item) => {
          if (item.children && item.children.length > 0) {
            return <CollapseMenu key={item.path} item={item} />;
          } else {
            return (
              <MenuItem2
                key={item.path}
                icon={item.meta.icon}
                title={menuOpen ? "" : "" + t(`menu.${item.meta.name}`)}
                text={menuOpen ? t(`menu.${item.meta.name}`) : ""}
                onClick={() => handleClick(item)}
                active={location.pathname === item.path}
                className="self-center"
                labelElement={
                  menuOpen && <Icon icon="star-empty" className="invisible" />
                }
              />
            );
          }
        })}
      </Menu>
    </>
  );
};

export default ClassicSider;
