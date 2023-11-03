import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogProps,
} from "@blueprintjs/core";

const GoodsCategoryDialog = (props: DialogProps) => {
  return (
    <Dialog {...props} title="商品分类管理">
      <DialogBody>111</DialogBody>
      <DialogFooter
        actions={
          <Button intent="primary" text="Close" onClick={props.onClose} />
        }
      />
    </Dialog>
  );
};

export default GoodsCategoryDialog;
