import { useForm } from "react-hook-form";
import EnhancedConfigurableForm, {
  ConfigurableFormOption,
} from "../../components/EnhancedForm/EnhancedConfigurableForm";
import { Button, Card, FormGroup, Switch } from "@blueprintjs/core";
import { useState } from "react";

/**
 * 简单开发时
 * @returns
 */
const ConfigurableForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [inline, setInline] = useState(true);
  const [vertical, setVertical] = useState(false);
  const { handleSubmit, control, reset } = useForm({ mode: "all" });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const option: ConfigurableFormOption = {
    form: {
      inline: true,
    },
    fields: [
      // username
      {
        type: "input",
        controllerConfig: {
          name: "username",
          control,
          defaultValue: "",
          rules: {
            required: true,
            minLength: {
              value: 5,
              message: "最小长度为5",
            },
            maxLength: {
              value: 10,
              message: "最大长度为10",
            },
          },
        },
        formgroupProps: {
          helperText:
            "填写说明：用户名为用户登录时的账号，英文数字，不得以符号开头，长度5-10位",
          label: <div className="w-16">姓名</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          placeholder: "请输入用户名",
        },
        onBeforeChange: (value: string) => {
          console.log("value", value);
        },
      },
      // admin
      {
        type: "switch",
        controllerConfig: {
          name: "admin",
          control,
          defaultValue: false,
        },
        formgroupProps: {
          helperText: "填写说明",
          label: <div className="w-16">身份</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          label: "管理员",
        },
      },
      // permission
      {
        type: "checkbox",
        controllerConfig: {
          name: "permission",
          control,
          defaultValue: [],
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">权限</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          placeholder: "请输入用户名",
        },
        childrenList: [
          {
            inline,
            label: "add",
          },
          {
            inline,
            label: "delete",
          },
          {
            inline,
            label: "edit",
          },
        ],
      }, // gender
      {
        type: "radioGroup",
        controllerConfig: {
          name: "gender",
          control,
          defaultValue: "none",
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">性别</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          inline: true,
        },
        childrenList: [
          {
            label: "男",
            value: "male",
          },
          {
            label: "女",
            value: "female",
          },
          {
            label: "不填",
            value: "none",
          },
        ],
      }, // degree
      {
        type: "select",
        controllerConfig: {
          name: "degree",
          control,
          defaultValue: "",
        },
        formgroupProps: {
          helperText: "填写说明",
          label: <div className="w-16">学历</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          placeholder: "请选择学位",
          options: ["本科", "硕士", "高中"],
        },
      },
      // age
      {
        type: "slider",
        controllerConfig: {
          name: "age",
          control,
          defaultValue: 0,
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">年龄</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          min: 0,
          max: 120,
          stepSize: 2,
          labelStepSize: 20,
          vertical: false,
          className: "min-w-[450px]",
          handleHtmlProps: { "aria-label": "example 1" },
        },
        onBeforeChange: (value: string) => {
          console.log("value", value);
        },
      },
      // file
      {
        type: "fileInput",
        controllerConfig: {
          name: "file",
          control,
          defaultValue: "",
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">文件</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          text: "请选择要上传的文件",
          buttonText: "点击选择",
          small: true,
        },
      },
      // fileCount
      {
        type: "numericInput",
        controllerConfig: {
          name: "fileCount",
          control,
          defaultValue: 0,
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">数量</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          placeholder: "请输入审批的份数",
        },
      },
      // tag
      {
        type: "tagInput",
        controllerConfig: {
          name: "tag",
          control,
          defaultValue: "",
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">标签</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {
          leftIcon: "user",
          placeholder: "请选择标签",
          rightElement: <Button disabled={false} icon={"cross"} />,
          tagProps: {
            large: false,
            minimal: true,
          },
          values: [
            // supports single JSX elements
            <strong key="al">急件</strong>,
            // supports JSX "fragments" (don't forget `key` on elements in arrays!)
            [<em key="thol">未</em>, "审批"],
            // and supports simple strings
            "待审核",
            // falsy values are not rendered and ignored by the keyboard
            undefined,
          ],
        },
      },
      // date
      {
        type: "datePicker",
        controllerConfig: {
          name: "date",
          control,
          defaultValue: "",
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">日期</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {},
      },
      // range
      {
        type: "dateRangeInput",
        controllerConfig: {
          name: "range",
          control,
          defaultValue: {},
        },
        formgroupProps: {
          helperText: "填写说明：",
          label: <div className="w-16">有效期</div>,
          labelInfo: <div className="w-16">(必填)</div>,
          inline,
        },
        childrenProps: {},
      },
    ],
    operator: (
      <>
        <Button icon="refresh" text="清空" />
        <Button icon="tick" text="提交" onClick={handleSubmit(onSubmit)} />
      </>
    ),
  };
  return (
    <div className="flex h-full flex-col">
      <Card className="pb-0">
        <div>
          <FormGroup inline label={<div className="w-16">样式设置</div>}>
            <Switch
              inline
              label="disabled"
              checked={disabled}
              onChange={() => setDisabled(!disabled)}
            />
            <Switch
              inline
              label="inline"
              checked={inline}
              onChange={() => setInline(!inline)}
            />
            <Switch
              inline
              label="vertical"
              checked={vertical}
              onChange={() => setVertical(!vertical)}
            />
          </FormGroup>
        </div>
      </Card>
      <Card className="mt-3 overflow-y-auto">
        <div className="border border-indigo-500 p-5">
          <EnhancedConfigurableForm option={option} />
        </div>
      </Card>
    </div>
  );
};

export default ConfigurableForm;
