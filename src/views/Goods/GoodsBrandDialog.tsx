import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogProps,
  TreeNodeInfo,
} from "@blueprintjs/core";
import { memo } from "react";

const GoodsBrandDialog = (props: DialogProps) => {
  const INITIAL_STATE: TreeNodeInfo[] = [
    {
      id: 0,
      label: "总公司",
      icon: "delete",
      secondaryLabel: <Button icon="delete" small outlined />,
    },
    {
      id: 1,
      label: "上海分公司",
      childNodes: [
        {
          id: 10,
          label: "销售部",
        },
        {
          id: 11,
          label: "事业部",
        },
        {
          id: 12,
          label: "人事部",
        },
      ],
    },
    {
      id: 2,
      label: "广州分公司",
    },
  ];
  // const Brands = () => {
  //   INITIAL_STATE.reduce(() => {}, <></>);
  // };
  return (
    <Dialog {...props} title="商品品牌管理" className="w-fit">
      {/* <DialogBody className="h-[300px] w-fit">{Brands}</DialogBody> */}
      <DialogFooter
        actions={
          <Button intent="primary" text="Close" onClick={props.onClose} />
        }
      />
    </Dialog>
  );
};

export default memo(GoodsBrandDialog);
