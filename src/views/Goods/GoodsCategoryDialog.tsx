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
import { api } from "../../api";
import { ICategoryResponse } from "./goods";
import useCategoryOperator from "./useCategoryOperator";

const GoodsCategoryDialog = (props: DialogProps) => {
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    api.getAllCategory().then((res) => {
      setCategories(res.data.data);
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
        {categories.length &&
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
  const handleDelete = (item: ICategoryResponse) => {
    console.log("item", item);
  };

  return (
    <Menu className="flex min-w-[50px] flex-col content-center">
      {item.children ? (
        <>
          <MenuItem2
            text={item.name}
            className="items-center justify-center"
            icon={
              <div>
                {Array.from(Array(level)).fill("-").join("-")}
                <Button small>
                  <img
                    src="../../../public/assets/avatar.png"
                    className=""
                    width={"20px"}
                    height={"20px"}
                    alt=""
                  />
                </Button>
              </div>
            }
            labelElement={
              <div className="flex">
                <CategoryOperator category={item} init={init} />
                <Button
                  icon={open ? "caret-up" : "caret-down"}
                  className="self-center"
                  minimal
                  onClick={handleCollapse}
                />
              </div>
            }
          ></MenuItem2>
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
        </>
      ) : (
        <MenuItem2
          text={item.name}
          className="items-center justify-center"
          icon={
            <div className="flex items-center">
              <span>{Array.from(Array(level)).fill("-").join("-")}</span>
              <img
                src="../../../public/assets/avatar.png"
                width={"30px"}
                height={"30px"}
                className="rounded-full outline-1 hover:outline-dashed"
                alt=""
              />
            </div>
          }
          labelElement={
            <div className="flex">
              <CategoryOperator category={item} init={init} />
              <Button icon="trash" minimal onClick={() => handleDelete(item)} />
            </div>
          }
        ></MenuItem2>
      )}
    </Menu>
  );
};

const CategoryOperator = (props: {
  category: ICategoryResponse;
  init: () => void;
}) => {
  const { category, init } = props;
  const {
    handleAddCategory,
    handleInputCategory,
    handleAddCategoryConfirm,
    handleAddCategoryCancel,
    handleDisableCategory,
    handleEnableCategory,
    inputVisible,
  } = useCategoryOperator({
    init,
  });
  return inputVisible ? (
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
      <Tooltip2 content={`禁用【${category.name}】`} position={Position.TOP}>
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
  );
};

export default GoodsCategoryDialog;
