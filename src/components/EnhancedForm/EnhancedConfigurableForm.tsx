/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormGroup, ControlGroup, FormGroupProps } from "@blueprintjs/core";
import EnhancedCheckBoxGroup from "./EnhancedCheckBoxGroup";
import EnhancedDatePicker from "./EnhancedDatePicker";
import EnhancedDateRangeInput from "./EnhancedDateRangeInput";
import EnhancedFileInput from "./EnhancedFileInput";
import EnhancedInput from "./EnhancedInput";
import EnhancedNumericInput from "./EnhancedNumericInput";
import EnhancedRadioGroup from "./EnhancedRadioGroup";
import EnhancedSlider from "./EnhancedSlider";
import EnhancedSwitch from "./EnhancedSwitch";
import EnhancedTagInput from "./EnhancedTagInput";
import { FieldValues, UseControllerProps } from "react-hook-form";
import EnhancedSelect from "./EnhancedSelect";
export interface FormFieldOption {
  type:
    | "input"
    | "switch"
    | "checkbox"
    | "radioGroup"
    | "select"
    | "slider"
    | "fileInput"
    | "numericInput"
    | "tagInput"
    | "datePicker"
    | "dateRangeInput";
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: any;
  childrenList?: any[];
  onBeforeChange?: (value: any) => void;
}
export interface ConfigurableFormOption {
  form: {
    inline: boolean;
  };
  fields: FormFieldOption[];
  operator: React.ReactNode;
}
const EnhancedConfigurableForm = (props: {
  option: ConfigurableFormOption;
}) => {
  const {
    form: { inline },
    fields,
    operator,
  } = props.option;
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "input":
            return (
              <EnhancedInput key={field.controllerConfig.name} {...field} />
            );
          case "switch":
            return (
              <EnhancedSwitch key={field.controllerConfig.name} {...field} />
            );
          case "checkbox":
            return (
              <EnhancedCheckBoxGroup
                key={field.controllerConfig.name}
                {...field}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                childrenList={field.childrenList!}
              />
            );
          case "radioGroup":
            return (
              <EnhancedRadioGroup
                key={field.controllerConfig.name}
                {...field}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                childrenList={field.childrenList!}
              />
            );
          case "select":
            return (
              <EnhancedSelect key={field.controllerConfig.name} {...field} />
            );
          case "slider":
            return (
              <EnhancedSlider key={field.controllerConfig.name} {...field} />
            );
          case "fileInput":
            return (
              <EnhancedFileInput key={field.controllerConfig.name} {...field} />
            );
          case "numericInput":
            return (
              <EnhancedNumericInput
                key={field.controllerConfig.name}
                {...field}
              />
            );
          case "tagInput":
            return (
              <EnhancedTagInput key={field.controllerConfig.name} {...field} />
            );
          case "datePicker":
            return (
              <EnhancedDatePicker
                key={field.controllerConfig.name}
                {...field}
              />
            );
          case "dateRangeInput":
            return (
              <EnhancedDateRangeInput
                key={field.controllerConfig.name}
                {...field}
              />
            );
          default:
            null;
        }
      })}
      <FormGroup inline={inline}>
        <ControlGroup>{operator}</ControlGroup>
      </FormGroup>
    </>
  );
};

export default EnhancedConfigurableForm;
