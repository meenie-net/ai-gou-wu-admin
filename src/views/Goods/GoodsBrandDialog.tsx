import {
  Button,
  Collapse,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogProps,
  Icon,
  Menu,
  TreeNodeInfo,
} from "@blueprintjs/core";
import { useState } from "react";
import { MenuItem2 } from "@blueprintjs/popover2";

const GoodsBrandDialog = (props: DialogProps) => {
  const brands = [
    {
      id: 0,
      label: "华硕",
      icon: "delete",
      secondaryLabel: <Button icon="delete" small outlined />,
    },
    {
      id: 1,
      label: "神舟",
    },
    {
      id: 3,
      label: "宏碁",
    },
    {
      id: 2,
      label: "阿迪达斯",
    },
  ];
  return (
    <Dialog {...props} title="商品品牌管理" className="w-fit">
      <DialogBody className="h-[600px] w-[300px]">
        <CollapseTree items={brands} />
      </DialogBody>
      <DialogFooter
        actions={
          <Button intent="primary" text="Close" onClick={props.onClose} />
        }
      />
    </Dialog>
  );
};

const CollapseTree = (props: { items: any }) => {
  const { items } = props;
  const handleDelete = (item: TreeNodeInfo) => {
    console.log("item", item);
  };

  const generateChildNode = (items: any) => {
    return items.map((item: any) => {
      const [open, setOpen] = useState(false);
      const handleCollapse = () => {
        setOpen(!open);
      };
      return item.childNodes ? (
        <>
          <MenuItem2
            text={item.label.toString()}
            className="justify-center"
            icon={<>{item.id.toString()}</>}
            active={true}
            labelElement={<Icon icon={open ? "caret-up" : "caret-down"} />}
            onClick={handleCollapse}
          ></MenuItem2>
          <Collapse isOpen={open}>
            <Menu>
              {generateChildNode(item.childNodes)}
              <Button icon="add" intent="primary" fill>
                添加{`${item.label}`}子分类
              </Button>
            </Menu>
          </Collapse>
        </>
      ) : (
        <MenuItem2
          text={item.label.toString()}
          className="justify-center"
          icon={<>{item.id.toString()}</>}
          labelElement={
            <Icon icon="trash" onClick={() => handleDelete(item)} />
          }
        ></MenuItem2>
      );
    });
  };

  return (
    <Menu className="flex min-w-[50px] flex-col content-center">
      {generateChildNode(items)}
      <Button icon="add" intent="primary" fill>
        添加品牌
      </Button>
    </Menu>
  );
};

export default GoodsBrandDialog;
