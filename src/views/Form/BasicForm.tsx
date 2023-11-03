import {
  FormGroup,
  Switch,
  ControlGroup,
  Button,
  Card,
} from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EnhancedInput from "../../components/EnhancedForm/EnhancedInput";
import EnhancedSwitch from "../../components/EnhancedForm/EnhancedSwitch";
import EnhancedCheckBoxGroup from "../../components/EnhancedForm/EnhancedCheckBoxGroup";
import EnhancedRadioGroup from "../../components/EnhancedForm/EnhancedRadioGroup";
import EnhancedSlider from "../../components/EnhancedForm/EnhancedSlider";
import EnhancedFileInput from "../../components/EnhancedForm/EnhancedFileInput";
import EnhancedNumericInput from "../../components/EnhancedForm/EnhancedNumericInput";
import EnhancedTagInput from "../../components/EnhancedForm/EnhancedTagInput";
import EnhancedDatePicker from "../../components/EnhancedForm/EnhancedDatePicker";
import EnhancedDateRangeInput from "../../components/EnhancedForm/EnhancedDateRangeInput";
import EnhancedSelect from "../../components/EnhancedForm/EnhancedSelect";
import EnhancedHTMLSelect from "../../components/EnhancedForm/EnhancedHTMLSelect";

/**
 * 需要自定义或者定制化开发时
 * @returns
 */
const BasicForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [inline, setInline] = useState(true);
  const [vertical, setVertical] = useState(false);

  const handleBeforeUsernameChange = (value: string) => {
    console.log("value", value);
  };

  const { handleSubmit, control } = useForm({ mode: "all" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex h-full flex-col">
      <Card className="pb-0">
        <div>
          <FormGroup
            inline={inline}
            label={<div className="w-16">样式设置</div>}
          >
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
          <EnhancedInput
            controllerConfig={{
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
            }}
            formgroupProps={{
              helperText:
                "填写说明：用户名为用户登录时的账号，英文数字，不得以符号开头，长度5-10位",
              inline,
              label: <div className="w-16">姓名</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              placeholder: "请输入用户名",
              disabled,
            }}
            onBeforeChange={handleBeforeUsernameChange}
          />
          <EnhancedSwitch
            controllerConfig={{
              name: "admin",
              control,
              defaultValue: false,
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">身份设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              label: "管理员",
              disabled,
              inline,
            }}
          />
          <EnhancedCheckBoxGroup
            controllerConfig={{
              name: "permission",
              control,
              defaultValue: [],
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenList={[
              {
                disabled,
                inline,
                label: "add",
              },
              {
                disabled,
                inline,
                label: "delete",
              },
              {
                disabled,
                inline,
                label: "edit",
              },
            ]}
          />
          <EnhancedRadioGroup
            controllerConfig={{
              name: "gender",
              control,
              defaultValue: "none",
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              inline,
            }}
            childrenList={[
              {
                label: "男",
                value: "male",
                disabled,
              },
              {
                label: "女",
                value: "female",
                disabled,
              },
              {
                label: "不填",
                value: "none",
                disabled,
              },
            ]}
          />
          <EnhancedHTMLSelect
            controllerConfig={{
              name: "degree",
              control,
              defaultValue: "",
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              placeholder: "请选择学位",
              options: ["本科", "硕士", "高中"],
            }}
          />
          <EnhancedSlider
            controllerConfig={{
              name: "age",
              control,
              defaultValue: 0,
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              min: 0,
              max: 120,
              stepSize: 2,
              labelStepSize: 20,
              vertical: vertical,
              disabled,
              className: "min-w-[450px]",
              handleHtmlProps: { "aria-label": "example 1" },
            }}
          />
          <EnhancedFileInput
            controllerConfig={{
              name: "file",
              control,
              defaultValue: "",
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              text: "请选择要上传的文件",
              buttonText: "点击选择",
              small: true,
              disabled,
            }}
          />
          <EnhancedNumericInput
            controllerConfig={{
              name: "fileCount",
              control,
              defaultValue: 0,
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              placeholder: "请输入审批的份数",
              disabled,
            }}
          />
          <EnhancedTagInput
            controllerConfig={{
              name: "tag",
              control,
              defaultValue: "",
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              leftIcon: "user",
              placeholder: "请选择标签",
              rightElement: <Button disabled={false} icon={"cross"} minimal />,
              disabled,
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
            }}
          />
          <EnhancedDatePicker
            controllerConfig={{
              name: "date",
              control,
              defaultValue: "",
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              disabled,
            }}
          />
          <EnhancedDateRangeInput
            controllerConfig={{
              name: "range",
              control,
              defaultValue: {},
            }}
            formgroupProps={{
              helperText: "填写说明：",
              inline,
              label: <div className="w-16">权限设置</div>,
              labelInfo: <div className="w-16">(必填)</div>,
            }}
            childrenProps={{
              disabled,
            }}
          />
          <FormGroup inline={inline}>
            <ControlGroup>
              <Button icon="refresh" text="清空" />
              <Button
                icon="tick"
                text="提交"
                onClick={handleSubmit(onSubmit)}
              />
            </ControlGroup>
          </FormGroup>
        </div>
      </Card>
    </div>
  );
};

export default BasicForm;
