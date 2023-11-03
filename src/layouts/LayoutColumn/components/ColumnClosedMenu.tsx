import { Menu } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { IMenu } from "../../../config/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useGlobalStore } from "../../../hooks/useStore";

const ColumnClosedMenu = (props: { subMenu: IMenu[] }) => {
  const { subMenu } = props;
  const {
    setting: { assemblyLarge },
  } = useGlobalStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: IMenu) => {
    if (item.meta.url) {
      window.open(item.meta.url, item.meta.target || "_self");
    } else {
      navigate(item.path);
    }
  };
  const MenuItem = (props: { _item: IMenu[] }) => {
    const { _item } = props;
    return (
      <>
        {_item.map((i) => (
          <MenuItem2
            key={i.path}
            text={t(`menu.${i.meta.name}`)}
            textClassName="mr-0"
            popoverProps={{
              popoverClassName: "fix-popmenu-min-w",
            }}
          >
            {i.children && <MenuItem _item={i.children} />}
          </MenuItem2>
        ))}
      </>
    );
  };
  return (
    <Menu
      large={assemblyLarge}
      className={assemblyLarge ? "min-w-[60px]" : "min-w-[50px]"}
    >
      {subMenu.map((item) =>
        item.children ? (
          <MenuItem2
            key={item.path}
            icon={item.meta.icon}
            className={`fix-menuicon-mr hover:cursor-pointer hover:bg-orange-600 hover:text-white ${
              location.pathname === item.path ? "bg-orange-800 text-white" : ""
            }`}
            textClassName="mr-0"
            popoverProps={{
              popoverClassName: "fix-popmenu-min-w",
            }}
          >
            <MenuItem _item={item.children} />
          </MenuItem2>
        ) : (
          <MenuItem2
            key={item.path}
            onClick={() => handleClick(item)}
            icon={item.meta.icon}
            className={`hover:cursor-pointer hover:bg-orange-600 hover:text-white ${
              location.pathname === item.path ? "bg-orange-800 text-white" : ""
            }`}
            textClassName="mr-0"
            popoverProps={{
              popoverClassName: "fix-popmenu-min-w",
            }}
          />
        )
      )}
    </Menu>
  );
};

export default ColumnClosedMenu;
