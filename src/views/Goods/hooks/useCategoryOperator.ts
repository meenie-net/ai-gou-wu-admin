import { useState } from "react";
import { api, ResCodeEnum } from "../../../api";
import { handleStringChange } from "../../../utils";
import { ICategory, ICategoryResponse } from "../goods";
import { AppToaster } from "../../../utils/Toaster";
import { useHandleConfirm } from "../../../hooks/useHandleConfirm";

function useCategoryOperator(props: {
  category?: ICategoryResponse;
  init: any;
}) {
  const { category, init } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [newCategory, setNewCategory] = useState<ICategory>({
    name: "",
    logo: "",
    parentId: "",
  });
  const handleAddCategory = (
    e: React.MouseEvent<HTMLElement>,
    parentId: string
  ) => {
    e.stopPropagation();
    setNewCategory({
      ...newCategory,
      parentId,
    });
    setInputVisible(true);
  };
  const handleInputCategory = handleStringChange((name: string) => {
    setNewCategory({
      ...newCategory,
      name,
    });
  });
  const handleAddCategoryConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const res = await api.addCategory(newCategory);
    if (res.data.status === ResCodeEnum.SUCCESS) {
      init();
      setNewCategory({
        name: "",
        logo: "",
        parentId: "",
      });
      setInputVisible(false);
    }
  };
  const handleAddCategoryCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setNewCategory({
      name: "",
      logo: "",
      parentId: "",
    });
    setInputVisible(false);
  };
  const handleDisableCategory = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!category) return;
    const res = await api.disableCategory(category.id);
    if (res.data.status === ResCodeEnum.SUCCESS) {
      init();
      AppToaster.show({ message: "禁用成功", intent: "success" });
    }
  };
  const handleEnableCategory = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!category) return;
    const res = await api.enableCategory(category.id);
    if (res.data.status === ResCodeEnum.SUCCESS) {
      init();
      AppToaster.show({ message: "启用成功", intent: "success" });
    }
  };
  const handleDeleteCategory = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!category) return;
    const result = await useHandleConfirm({
      handler: api.deleteCategory,
      args: category.id,
      message: `确认删除${category.name}吗？`,
      icon: "trash",
      intent: "danger",
    });
    if (result) init();
  };
  return {
    handleAddCategory,
    handleInputCategory,
    handleAddCategoryConfirm,
    handleAddCategoryCancel,
    handleDisableCategory,
    handleEnableCategory,
    handleDeleteCategory,
    inputVisible,
  };
}

export default useCategoryOperator;
