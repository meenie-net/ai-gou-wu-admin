import { MenuDivider, Icon, Collapse, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { IMenu } from "../../../config/menu";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../../hooks/useStore";

const CollapseMenu = (props: { key: string; item: IMenu }) => {
  const { item } = props;
  const { t } = useTranslation();
  const {
    setting: { menuOpen },
  } = useGlobalStore();
  const matches = useMatches();
  const [open, setOpen] = useState(
    matches.map((route) => route.pathname).includes(item.path)
  );
  const collapseActive = matches
    .map((route) => route.pathname)
    .includes(item.path);
  const navigate = useNavigate();
  const handleCollapse = () => {
    setOpen(!open);
  };
  const handleClick = (item: IMenu) => {
    if (item.meta.url) {
      window.open(item.meta.url, item.meta.target || "_self");
    } else {
      navigate(item.path);
    }
  };

  const ClassicClosedMenu = (props: { _item: IMenu }) => {
    const { _item } = props;
    return (
      <MenuItem2
        key={_item.path}
        icon={_item.meta.icon}
        active={matches.map((route) => route.pathname).includes(_item.path)}
        title={"" + t(`menu.${_item.meta.name}`)}
        onClick={() => handleClick(_item)}
        text={t(`menu.${_item.meta.name}`)}
      >
        {_item.children &&
          _item.children.map((sub) => (
            <ClassicClosedMenu key={sub.path} _item={sub} />
          ))}
      </MenuItem2>
    );
  };

  return (
    <div>
      <MenuDivider />
      {menuOpen ? (
        item.children ? (
          <MenuItem2
            text={menuOpen ? t(`menu.${item.meta.name}`) : ""}
            className="justify-center"
            icon={item.meta.icon}
            active={collapseActive}
            title={menuOpen ? "" : "" + t(`menu.${item.meta.name}`)}
            labelElement={
              menuOpen && <Icon icon={open ? "caret-up" : "caret-down"} />
            }
            onClick={handleCollapse}
          ></MenuItem2>
        ) : (
          <MenuItem2
            text={menuOpen ? t(`menu.${item.meta.name}`) : ""}
            className="justify-center"
            icon={item.meta.icon}
            active={collapseActive}
            title={menuOpen ? "" : "" + t(`menu.${item.meta.name}`)}
            onClick={() => handleClick(item)}
          ></MenuItem2>
        )
      ) : (
        <MenuItem2
          className="fix-menuicon-mr"
          textClassName="mr-0"
          icon={item.meta.icon}
          active={collapseActive}
          onClick={handleCollapse}
          selected
          popoverProps={{
            popoverClassName: "fix-popmenu-min-w",
          }}
        >
          {item.children &&
            item.children.map((sub) => (
              <ClassicClosedMenu key={sub.path} _item={sub} />
            ))}
        </MenuItem2>
      )}
      {menuOpen && item.children && (
        <Collapse isOpen={open}>
          <Menu large={false} className="min-w-[45px] bg-slate-100">
            {item.children &&
              item.children.map((sub) => (
                <CollapseMenu key={sub.path} item={sub} />
              ))}
          </Menu>
        </Collapse>
      )}
    </div>
  );
};

export default CollapseMenu;
