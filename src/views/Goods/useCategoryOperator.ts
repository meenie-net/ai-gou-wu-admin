import { useState } from "react";
import { api, ResCodeEnum } from "../../api";
import { handleStringChange } from "../../utils";
import { ICategory } from "./goods";

function useCategoryOperator(props: { init: any }) {
  const { init } = props;
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
      setNewCategory({
        name: "",
        logo: "",
        parentId: "",
      });
      setInputVisible(false);
      init();
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
  const handleDisableCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const handleEnableCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return {
    handleAddCategory,
    handleInputCategory,
    handleAddCategoryConfirm,
    handleAddCategoryCancel,
    handleDisableCategory,
    handleEnableCategory,
    inputVisible,
  };
}

export default useCategoryOperator;
