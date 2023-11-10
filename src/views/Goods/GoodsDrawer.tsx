import {
  Button,
  ControlGroup,
  Drawer,
  DrawerProps,
  FormGroup,
  TreeNodeInfo,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EnhancedInput from "../../components/EnhancedForm/EnhancedInput";
import EnhancedRadioGroup from "../../components/EnhancedForm/EnhancedRadioGroup";
import EnhancedTextArea from "../../components/EnhancedForm/EnhancedTextArea";
import EnhancedHTMLSelect from "../../components/EnhancedForm/EnhancedHTMLSelect";
import GoodsBrandDialog from "./GoodsBrandDialog";
import GoodsCategoryDialog from "./GoodsCategoryDialog";
import useOverlay, { IUseOverlay } from "../../hooks/useOverlay";
import EnhancedTreeSelect from "../../components/EnhancedForm/EnhancedTreeSelect";
import { ResCodeEnum, api } from "../../api";
import { ICategoryResponse } from "./goods";

const GoodsDrawer = (props: { drawProps: DrawerProps; payload: any }) => {
  const {
    drawProps,
    payload: { state, goods },
  } = props;
  const [inline] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesTree, setCategoriesTree] = useState<TreeNodeInfo[]>([]);
  const { handleSubmit, control } = useForm({ mode: "all" });
  const { props: brandDialogProps, rest: brandDialogRest }: IUseOverlay =
    useOverlay({});
  const { props: categoryDialogProps, rest: categoryDialogRest }: IUseOverlay =
    useOverlay({});
  const initCategory = async () => {
    const { data: categoryData } = await api.getAllCategory();
    if (categoryData.status === ResCodeEnum.SUCCESS) {
      setCategories(categoryData.data);
    }
    const result: TreeNodeInfo[] = [];
    categories.map((item: ICategoryResponse) => {
      if (item.parentId === "") {
        result.push({
          id: item.id,
          label: item.name,
        });
      }
    });
    const findChildren = (
      parentId: string,
      items: ICategoryResponse[]
    ): TreeNodeInfo[] => {
      const childNodes: TreeNodeInfo[] = [];
      items.forEach((item) => {
        if (parentId === item.parentId) {
          if (findChildren(item.id, categories).length === 0) {
            childNodes.push({
              id: item.id,
              label: item.name,
            });
          } else {
            childNodes.push({
              id: item.id,
              label: item.name,
              childNodes: findChildren(item.id, categories),
            });
          }
        }
      });
      return childNodes;
    };
    result.forEach((item) => {
      if (findChildren(item.id.toString(), categories).length != 0) {
        item.childNodes = findChildren(item.id.toString(), categories);
      }
    });
    setCategoriesTree(result);
  };
  const initBrand = async () => {
    const { data: brandsData } = await api.getAllBrand();
    if (brandsData.status === ResCodeEnum.SUCCESS) setBrands(brandsData);
  };

  useEffect(() => {
    initCategory();
    initBrand();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleBeforeUsernameChange = (value: string) => {
    console.log("value", value);
  };

  const handleManageBrand = () => {
    brandDialogRest.onOpen();
  };
  const handleManageCategory = () => {
    categoryDialogRest.onOpen();
  };

  const onBrandDialogClosed = () => {
    initCategory();
  };
  const onCategoryDialogClosed = () => {
    initCategory();
  };
  return (
    // todo
    <Drawer
      {...drawProps}
      size={"auto"}
      icon="info-sign"
      title={
        state === "add"
          ? "新增商品"
          : state === "update"
          ? "编辑商品信息"
          : "查看商品信息"
      }
    >
      <div className="overflow-y-auto p-5">
        {/* 名称 */}
        <EnhancedInput
          controllerConfig={{
            name: "name",
            control,
            defaultValue: goods.name,
            rules: {
              required: true,
              minLength: {
                value: 2,
                message: "最小长度为2",
              },
              maxLength: {
                value: 10,
                message: "最大长度为10",
              },
            },
          }}
          formgroupProps={{
            helperText:
              state != "view" && "填写说明：商品名不得以符号开头，长度2-10位",
            inline,
            label: <div className="w-16">商品名</div>,
            labelInfo: <div className="w-16">(必填)</div>,
          }}
          childrenProps={{
            placeholder: "请输入商品名",
            disabled: state === "view",
          }}
          onBeforeChange={handleBeforeUsernameChange}
        />
        {/* 品牌 */}
        <EnhancedHTMLSelect
          controllerConfig={{
            name: "brandId",
            control,
            defaultValue: "",
            rules: {
              required: true,
            },
          }}
          formgroupProps={{
            helperText: state != "view" && "",
            inline,
            label: <div className="w-16">品牌</div>,
            labelInfo: <div className="w-16">(必填)</div>,
          }}
          childrenProps={{
            placeholder: "请选择品牌",
            options: ["飞科", "华硕", "奥迪"],
            disabled: state === "view",
          }}
          restChildren={
            state != "view" && (
              <Button className="ml-2" icon="cog" onClick={handleManageBrand} />
            )
          }
        />
        {/* 分类 */}
        <EnhancedTreeSelect
          controllerConfig={{
            name: "categoryId",
            control,
            defaultValue: "",
          }}
          formgroupProps={{
            helperText: state != "view" && "填写说明：",
            inline,
            label: <div className="w-16">分类</div>,
            labelInfo: <div className="w-16">(必填)</div>,
          }}
          childrenProps={{
            treeFilterProps: {
              options: categoriesTree,
            },
            selectButtonProps: {
              className: "w-[200px]",
            },
          }}
          restChildren={
            state != "view" && (
              <Button
                className="ml-2"
                icon="cog"
                onClick={handleManageCategory}
              />
            )
          }
        />
        {/* 渠道 */}
        <EnhancedRadioGroup
          controllerConfig={{
            name: "channel",
            control,
            defaultValue: "0",
          }}
          formgroupProps={{
            helperText: state != "view" && "",
            inline,
            disabled: state === "view",
            label: <div className="w-16">渠道</div>,
          }}
          childrenProps={{
            inline,
            disabled: state === "view",
          }}
          childrenList={[
            {
              label: "自营",
              value: "0",
            },
            {
              label: "第三方",
              value: "1",
            },
            {
              label: "海外",
              value: "2",
            },
          ]}
        />
        {/* 描述 */}
        <EnhancedTextArea
          controllerConfig={{
            name: "desc",
            control,
            defaultValue: "",
          }}
          formgroupProps={{
            helperText: state != "view" && "填写说明：商品描述，100字左右",
            inline,
            disabled: state === "view",
            label: <div className="w-16">描述</div>,
          }}
          childrenProps={{
            placeholder: "请输入商品描述",
            disabled: state === "view",
          }}
        />
        {state != "view" && (
          <FormGroup inline={inline}>
            <ControlGroup>
              <Button intent="danger" icon="refresh" text="清空" />
              <Button
                intent="primary"
                icon="tick"
                text="提交"
                onClick={handleSubmit(onSubmit)}
              />
            </ControlGroup>
          </FormGroup>
        )}
      </div>
      {brandDialogRest.isDisplay && (
        <GoodsBrandDialog
          {...brandDialogProps}
          onClosed={onBrandDialogClosed}
          brands={brands}
        />
      )}

      {categoryDialogRest.isDisplay && (
        <GoodsCategoryDialog
          {...categoryDialogProps}
          onClosed={onCategoryDialogClosed}
        />
      )}
    </Drawer>
  );
};

export default GoodsDrawer;
