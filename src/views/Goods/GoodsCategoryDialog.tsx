import {
  Button,
  Collapse,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogProps,
  InputGroup,
  Menu,
  Position,
} from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { useEffect, useState } from "react";
import { ResCodeEnum, api } from "../../api";
import { ICategoryResponse } from "./goods";
import useCategoryOperator from "./hooks/useCategoryOperator";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import { AppToaster } from "../../utils/Toaster";

const GoodsCategoryDialog = (props: DialogProps) => {
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    api.getAllCategory().then((res) => {
      const result: ICategoryResponse[] = [];

      const { data } = res;

      data.data.map((item: ICategoryResponse) => {
        if (item.parentId === "") {
          result.push(item);
        }
      });

      const findChildren = (parentId: string, items: ICategoryResponse[]) => {
        const children: ICategoryResponse[] = [];
        items.forEach((item) => {
          if (parentId === item.parentId) {
            item.children = findChildren(item.id, data.data);
            children.push(item);
          }
        });
        return children;
      };
      result.forEach((item) => {
        item.children = findChildren(item.id, data.data);
      });
      setCategories(result);
    });
  };
  const {
    handleAddCategory,
    handleInputCategory,
    handleAddCategoryConfirm,
    handleAddCategoryCancel,
    inputVisible,
  } = useCategoryOperator({
    init,
  });
  return (
    <Dialog {...props} title="商品分类管理">
      <DialogBody>
        {categories.length > 0 &&
          categories.map((category) => (
            <CollapseTree
              key={category.id}
              item={category}
              init={init}
              level={1}
            />
          ))}
        {inputVisible ? (
          <div className="flex">
            <InputGroup
              placeholder={`输入要添加的分类名`}
              fill
              onChange={handleInputCategory}
            />
            <Button
              icon="tick"
              intent="primary"
              minimal
              onClick={handleAddCategoryConfirm}
            />
            <Button
              icon="cross"
              intent="primary"
              minimal
              onClick={handleAddCategoryCancel}
            />
          </div>
        ) : (
          <Button
            icon="add"
            intent="primary"
            fill
            onClick={(e) => handleAddCategory(e, "")}
          >
            添加分类
          </Button>
        )}
      </DialogBody>
      <DialogFooter
        actions={
          <Button intent="primary" text="Close" onClick={props.onClose} />
        }
      />
    </Dialog>
  );
};

const CollapseTree = (props: {
  item: ICategoryResponse;
  level: number;
  init: () => void;
}) => {
  const { item, level, init } = props;
  const [open, setOpen] = useState(false);
  const handleCollapse = () => {
    setOpen(!open);
  };
  const UploadButton = asUploadButton((props: any) => (
    <button {...props}>
      <img
        src={item.logo}
        width={"30px"}
        height={"30px"}
        className="rounded-full outline-1 hover:outline-dashed"
        alt=""
      />
    </button>
  ));
  const FinishMethod = () => {
    useItemFinishListener(async (_item) => {
      if (_item.uploadStatus === 201) {
        const res = await api.updateCategory(item.id, {
          logo: _item.uploadResponse.data.data,
        });
        if (res.data.status === ResCodeEnum.SUCCESS) {
          AppToaster.show({ message: "Logo上传成功", intent: "success" });
        }
      } else {
        AppToaster.show({ message: "图片上传失败", intent: "danger" });
      }
    });
    return null;
  };
  return (
    <Menu className="flex min-w-[50px] flex-col content-center">
      <MenuItem2
        text={item.name}
        className="items-center justify-center"
        icon={
          <div className="flex items-center">
            {Array.from(Array(level)).fill("-").join("-")}
            <Uploady
              destination={{ url: "http://localhost:3000/file/imgUpload" }}
              inputFieldName="img"
            >
              <UploadButton />
              <FinishMethod />
            </Uploady>
          </div>
        }
        labelElement={
          <div className="flex items-center">
            <CategoryOperator
              category={item}
              init={init}
              handleCollapse={handleCollapse}
              open={open}
            />
          </div>
        }
      ></MenuItem2>
      {item.children.length > 0 && (
        <Collapse isOpen={open}>
          {item.children.map((category) => (
            <CollapseTree
              key={category.id}
              item={category}
              init={init}
              level={level + 1}
            />
          ))}
        </Collapse>
      )}
    </Menu>
  );
};

const CategoryOperator = (props: {
  category: ICategoryResponse;
  init: () => void;
  handleCollapse: () => void;
  open: boolean;
}) => {
  const { category, init, handleCollapse, open } = props;
  const {
    handleAddCategory,
    handleInputCategory,
    handleAddCategoryConfirm,
    handleAddCategoryCancel,
    handleDisableCategory,
    handleEnableCategory,
    handleDeleteCategory,
    inputVisible,
  } = useCategoryOperator({
    init,
    category,
  });
  return (
    <>
      {inputVisible ? (
        <>
          <InputGroup
            placeholder="输入要添加的子分类名"
            fill
            onChange={handleInputCategory}
          />
          <Button
            icon="tick"
            intent="primary"
            minimal
            onClick={handleAddCategoryConfirm}
          />
          <Button
            icon="cross"
            intent="primary"
            minimal
            onClick={handleAddCategoryCancel}
          />
        </>
      ) : (
        <>
          <Tooltip2
            content={`添加【${category.name}】子分类`}
            position={Position.TOP}
          >
            <Button
              icon="plus"
              intent="primary"
              minimal
              onClick={(e) => handleAddCategory(e, category.id)}
            />
          </Tooltip2>
          <Tooltip2
            content={`禁用【${category.name}】`}
            position={Position.TOP}
          >
            <Button
              icon="disable"
              intent="primary"
              minimal
              onClick={handleDisableCategory}
            />
            <Button
              icon="confirm"
              intent="primary"
              minimal
              onClick={handleEnableCategory}
            />
          </Tooltip2>
        </>
      )}
      {category.children.length !== 0 ? (
        <Button
          icon={open ? "caret-up" : "caret-down"}
          className="self-center"
          minimal
          onClick={handleCollapse}
        />
      ) : (
        <Button
          icon="trash"
          className="self-center"
          minimal
          onClick={handleDeleteCategory}
        />
      )}
    </>
  );
};

export default GoodsCategoryDialog;
